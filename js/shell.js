/* 设计研究 · 壳逻辑
 * 目录展开、hash 路由、当前项、内容装载。
 * 清单总览的 iframe 在首次进入后保持挂载，以免筛选与滚动被重置。
 * 不读写 design-atlas-review-v1 / design-atlas-ui-v1。
 */
(() => {
  "use strict";

  const NAV = window.PLATFORM_NAV;
  const UI_KEY = "design-research-ui-v1";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const els = {
    side: $("#side"),
    tree: $("#tree"),
    scrim: $("#scrim"),
    doc: $("#doc"),
    frameWrap: $("#inventoryWrap"),
    frame: $("#inventoryFrame"),
    title: $("#pageTitle")
  };

  const routes = new Map();
  const groups = new Map();

  function indexTree(nodes, parent = null) {
    for (const node of nodes) {
      node.parent = parent;
      if (node.type === "group") groups.set(node.id, node);
      else routes.set(node.id, node);
      if (node.children) indexTree(node.children, node);
    }
  }
  indexTree(NAV.tree);

  function loadUI() {
    try {
      return JSON.parse(localStorage.getItem(UI_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function saveUI(patch) {
    try {
      localStorage.setItem(UI_KEY, JSON.stringify({ ...loadUI(), ...patch }));
    } catch {
      /* ignore quota / private mode */
    }
  }

  function defaultOpen() {
    const open = {};
    for (const [id] of groups) open[id] = true;
    return open;
  }

  function isOpen(id) {
    const stored = loadUI().open;
    const open = stored && typeof stored === "object" ? stored : defaultOpen();
    return open[id] !== false;
  }

  function toggleGroup(id) {
    const open = { ...defaultOpen(), ...(loadUI().open || {}) };
    open[id] = !isOpen(id);
    saveUI({ open });
    const li = els.tree.querySelector(`[data-group="${CSS.escape(id)}"]`);
    if (!li) return;
    li.classList.toggle("is-open", open[id]);
    const btn = li.querySelector(":scope > .tree-toggle");
    if (btn) btn.setAttribute("aria-expanded", open[id] ? "true" : "false");
  }

  function ancestors(node) {
    const ids = [];
    let p = node && node.parent;
    while (p) {
      ids.push(p.id);
      p = p.parent;
    }
    return ids;
  }

  function currentRoute() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (raw && routes.has(raw)) {
      const node = routes.get(raw);
      return node.type === "alias" ? node.to : node.id;
    }
    return NAV.defaultRoute;
  }

  function renderNode(node, route, isRoot) {
    if (node.children && node.children.length) {
      const open = isOpen(node.id);
      return `<li class="tree-group${isRoot ? " is-root" : ""}${open ? " is-open" : ""}" data-group="${esc(node.id)}">
        <button type="button" class="tree-toggle press" aria-expanded="${open ? "true" : "false"}" data-toggle="${esc(node.id)}">
          <span class="caret" aria-hidden="true"></span>
          <span>${esc(node.label)}</span>
        </button>
        <ul class="tree-list">${node.children.map((c) => renderNode(c, route, false)).join("")}</ul>
      </li>`;
    }
    const target = node.type === "alias" ? node.to : node.id;
    const current = node.type !== "alias" && node.id === route;
    const jump = node.jump ? `<span class="jump">${esc(node.jump)}</span>` : "";
    return `<li>
      <a class="tree-link press" href="#/${esc(target)}"${current ? ' aria-current="page"' : ""} data-route="${esc(node.id)}">
        <span class="label">${esc(node.label)}</span>${jump}
      </a>
    </li>`;
  }

  function renderTree() {
    const route = currentRoute();
    els.tree.innerHTML = `<ul class="tree-list">${NAV.tree.map((n) => renderNode(n, route, true)).join("")}</ul>`;
  }

  function updateActive(route) {
    $$(".tree-link", els.tree).forEach((a) => {
      const id = a.getAttribute("data-route");
      if (id === route) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    const node = routes.get(route);
    ancestors(node).forEach((id) => {
      if (!isOpen(id)) toggleGroup(id);
    });
  }

  let inventoryLoaded = false;
  let lastDocSrc = "";
  const scriptCache = new Set();

  function loadScript(src) {
    if (scriptCache.has(src)) return Promise.resolve();
    if ([...document.scripts].some((s) => s.getAttribute("data-shell-src") === src)) {
      scriptCache.add(src);
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const el = document.createElement("script");
      el.src = src;
      el.async = false;
      el.setAttribute("data-shell-src", src);
      el.onload = () => {
        scriptCache.add(src);
        resolve();
      };
      el.onerror = () => reject(new Error(src));
      document.body.appendChild(el);
    });
  }

  async function loadScripts(list) {
    for (const src of list || []) {
      await loadScript(src);
    }
  }

  async function show(route) {
    const node = routes.get(route) || routes.get(NAV.defaultRoute);
    const resolved = node.type === "alias" ? routes.get(node.to) : node;
    document.title = `${resolved.label} · ${NAV.title}`;
    if (els.title) els.title.textContent = NAV.title;
    updateActive(resolved.id);
    closeNav();

    const isWide = !!resolved.wide;
    els.doc.classList.toggle("is-wide", isWide && resolved.type !== "inventory");

    if (resolved.type === "inventory") {
      els.doc.hidden = true;
      els.doc.innerHTML = "";
      els.doc.classList.remove("is-wide");
      lastDocSrc = "";
      els.frameWrap.hidden = false;
      if (!inventoryLoaded) {
        els.frame.src = resolved.src;
        inventoryLoaded = true;
      } else {
        try { els.frame.contentWindow.dispatchEvent(new Event("resize")); } catch (e) {}
      }
      return;
    }

    els.frameWrap.hidden = true;
    els.doc.hidden = false;
    if (lastDocSrc === resolved.src && els.doc.innerHTML) return;
    if (typeof window.teardownVfxPage === "function") {
      try { window.teardownVfxPage(); } catch (e) {}
    }
    lastDocSrc = resolved.src;
    const html = await loadSection(resolved.src);
    els.doc.innerHTML = "";
    const wrap = document.createElement("div");
    wrap.className = "doc-inner is-enter" + (isWide ? " is-wide" : "");
    wrap.innerHTML = html;
    els.doc.appendChild(wrap);
    els.doc.scrollTop = 0;
    try {
      await loadScripts(resolved.scripts);
      if (typeof window.initVfxPage === "function") {
        window.initVfxPage(resolved.id);
      }
    } catch (err) {
      const note = document.createElement("p");
      note.className = "pnote";
      note.textContent = "页面脚本未能装载。请用本地静态服务器打开本平台（见 README）。";
      wrap.prepend(note);
    }
  }

  async function loadSection(src) {
    try {
      const res = await fetch(src, { cache: "no-cache" });
      if (!res.ok) throw new Error(String(res.status));
      const text = await res.text();
      return extractBody(text);
    } catch {
      return `<div class="empty">
        <h2>无法装载此页</h2>
        <p>请用本地静态服务器打开本平台（见 README），或检查 ${esc(src)} 是否存在。</p>
      </div>`;
    }
  }

  function extractBody(text) {
    const doc = new DOMParser().parseFromString(text, "text/html");
    const part = doc.querySelector("[data-page]") || doc.body;
    return part ? part.innerHTML : text;
  }

  function menuButtons() {
    return $$(".menu-btn");
  }

  function openNav() {
    els.side.classList.add("is-open");
    els.scrim.classList.add("on");
    menuButtons().forEach((b) => b.setAttribute("aria-expanded", "true"));
  }
  function closeNav() {
    els.side.classList.remove("is-open");
    els.scrim.classList.remove("on");
    menuButtons().forEach((b) => b.setAttribute("aria-expanded", "false"));
  }
  function toggleNav() {
    if (els.side.classList.contains("is-open")) closeNav();
    else openNav();
  }

  function ensureHash() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (!raw) {
      history.replaceState(null, "", `#/${NAV.defaultRoute}`);
      return;
    }
    if (routes.has(raw) && routes.get(raw).type === "alias") {
      history.replaceState(null, "", `#/${routes.get(raw).to}`);
    }
  }

  function onHash() {
    ensureHash();
    show(currentRoute());
  }

  function init() {
    renderTree();
    els.tree.addEventListener("click", (e) => {
      const toggle = e.target.closest("[data-toggle]");
      if (toggle && els.tree.contains(toggle)) {
        e.preventDefault();
        toggleGroup(toggle.getAttribute("data-toggle"));
      }
    });
    menuButtons().forEach((btn) => btn.addEventListener("click", toggleNav));
    els.scrim.addEventListener("click", closeNav);
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeNav();
    });
    addEventListener("hashchange", onHash);
    ensureHash();
    show(currentRoute());
  }

  init();
})();
