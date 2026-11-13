/* 设计研究 · 全景总览：上墙数字 + 按语言悬挂的墙，自身尝试更轻地落在同一空间。 */
(function (global) {
  "use strict";

  const LIGHTUP_SRC = "data/vfx/lightup.js";
  const LIGHTUP_PREFIX = "lightup:";

  const STATUS_LABEL = {
    present: "点亮",
    attempted: "做了但不够",
    near_benchmark: "接近标杆",
    none: "未见"
  };

  function loadLightup() {
    if (global.VFX_LIGHTUP) return Promise.resolve(global.VFX_LIGHTUP);
    const already = [...document.scripts].find(
      (s) => s.getAttribute("data-shell-src") === LIGHTUP_SRC || s.getAttribute("src") === LIGHTUP_SRC
    );
    if (already) {
      return new Promise((resolve) => {
        if (global.VFX_LIGHTUP) {
          resolve(global.VFX_LIGHTUP);
          return;
        }
        already.addEventListener("load", () => resolve(global.VFX_LIGHTUP || null), { once: true });
        already.addEventListener("error", () => resolve(null), { once: true });
      });
    }
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = LIGHTUP_SRC;
      s.setAttribute("data-shell-src", LIGHTUP_SRC);
      s.onload = () => resolve(global.VFX_LIGHTUP || null);
      s.onerror = () => resolve(null);
      document.head.appendChild(s);
    });
  }

  function rowRecord(lightup, name) {
    const rows = (lightup && lightup.rows) || [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].name === name) return rows[i];
    }
    return { name: name, pages: [] };
  }

  function rollup(rec) {
    const pages = (rec && rec.pages) || [];
    let present = 0;
    let attempted = 0;
    let near = 0;
    for (let i = 0; i < pages.length; i++) {
      const p = pages[i].presence;
      if (p === "present") present++;
      else if (p === "attempted") attempted++;
      else if (p === "near_benchmark") near++;
    }
    return {
      pages: pages,
      hint: (rec && rec.hint) || "",
      present: present,
      attempted: attempted,
      near: near,
      none: present + attempted + near === 0
    };
  }

  function markBits(roll, opts) {
    const o = opts || {};
    const bits = [];
    if (roll.present) bits.push({ key: "present", label: STATUS_LABEL.present });
    /* 行首：已点亮就不再叠「做了但不够」。条带上若同时有两种页，两种都标一次。 */
    if (roll.attempted && (o.allStatuses || !roll.present)) {
      bits.push({ key: "attempted", label: STATUS_LABEL.attempted });
    }
    if (roll.near) bits.push({ key: "near_benchmark", label: STATUS_LABEL.near_benchmark });
    return bits;
  }

  function marksHtml(U, roll, className, opts) {
    const bits = markBits(roll, opts);
    if (!bits.length) return "";
    return `<div class="${className}">${bits
      .map((b) => `<span class="vfx-mark is-${U.esc(b.key)}">${U.esc(b.label)}</span>`)
      .join("")}</div>`;
  }

  function coverageMarkText(roll) {
    if (roll.none) return STATUS_LABEL.none;
    const parts = [];
    if (roll.present) parts.push(STATUS_LABEL.present + " " + roll.present);
    if (roll.attempted && !roll.present) parts.push(STATUS_LABEL.attempted + " " + roll.attempted);
    if (roll.attempted && roll.present) parts.push(STATUS_LABEL.attempted + " " + roll.attempted);
    if (roll.near) parts.push(STATUS_LABEL.near_benchmark + " " + roll.near);
    return parts.join(" · ");
  }

  function coverageKind(roll) {
    if (roll.present) return "present";
    if (roll.near && !roll.attempted) return "near_benchmark";
    if (roll.attempted) return "attempted";
    return "none";
  }


  function init() {
    const U = global.VfxUtil;
    const D = global.VFX_MAP_DATA;
    const root = document.querySelector("[data-vfx-root='overview']");
    if (!root || !U) return;
    if (!D || !D.cases) {
      root.innerHTML = '<p class="vfx-empty-page">没有载入到地图数据。请用本地静态服务器打开，并确认 data/vfx/map-cases.js 与 thumbs/vfx/ 都在。</p>';
      return;
    }

    let scene = "全部";
    let scenesOpen = false;
    let lightup = global.VFX_LIGHTUP || null;
    const byId = new Map(D.cases.map((c) => [c.id, c]));

    function count(name) {
      if (name === "全部") return D.cases.length;
      return D.cases.filter((c) => (c.scenes || []).includes(name)).length;
    }

    function listForScene() {
      if (scene === "全部") return D.cases;
      return D.cases.filter((c) => (c.scenes || []).includes(scene));
    }

    function floatData(c) {
      const scenes = (c.scenes || []).map((s) =>
        s === "落地页" && c.bend ? "落地页（含 B 端产品介绍）" : s
      );
      const meta = [];
      if (c.studio) meta.push(c.studio);
      if (scenes.length) meta.push(scenes.join("、"));
      if (c.scale) meta.push(c.scale);
      if (c.kind === "视觉参考") meta.push("视觉参考");
      return {
        id: c.id,
        name: c.name,
        url: c.url,
        image: U.thumbSrc(c, true),
        meta
      };
    }

    function parseOwnId(id) {
      if (!id || id.indexOf(LIGHTUP_PREFIX) !== 0) return null;
      const rest = id.slice(LIGHTUP_PREFIX.length);
      const at = rest.indexOf("::");
      if (at < 0) return null;
      return { task: rest.slice(0, at), row: rest.slice(at + 2) };
    }

    function ownFloatData(id) {
      const parsed = parseOwnId(id);
      if (!parsed || !lightup) return null;
      const page = (lightup.pages || {})[parsed.task];
      if (!page) return null;
      const rec = rowRecord(lightup, parsed.row);
      let presence = "attempted";
      let note = rec.hint || "";
      for (let i = 0; i < (rec.pages || []).length; i++) {
        if (rec.pages[i].id === parsed.task) {
          presence = rec.pages[i].presence;
          if (rec.pages[i].note) note = rec.pages[i].note;
          break;
        }
      }
      const meta = [lightup.source || "设计 query 随机采样 · 现状", STATUS_LABEL[presence] || presence];
      const extra = note ? `<div class="why">${U.esc(note)}</div>` : "";
      return {
        id: id,
        name: page.title || parsed.task,
        url: "",
        image: page.thumb || "",
        meta: meta,
        extraHtml: extra
      };
    }

    function countsOf(key, rolls) {
      const fromMeta = lightup.counts && lightup.counts[key];
      if (fromMeta != null) return fromMeta;
      const field = key === "near_benchmark" ? "near" : key;
      return rolls.reduce((n, r) => n + (r[field] || 0), 0);
    }

    function statHtml(n, label, cls) {
      const extra = cls ? " " + cls : "";
      return `<div class="vfx-stat${extra}"><b>${U.esc(String(n))}</b><span>${U.esc(label)}</span></div>`;
    }

    function langMarks(roll) {
      const bits = [];
      if (roll.present) bits.push(`<span class="vfx-mark is-present">${roll.present}</span>`);
      if (roll.near) bits.push(`<span class="vfx-mark is-near_benchmark">${roll.near}</span>`);
      if (roll.attempted) bits.push(`<span class="vfx-mark is-attempted">${roll.attempted}</span>`);
      return bits.join("");
    }

    function renderCoverage() {
      const host = root.querySelector("[data-vfx-coverage]");
      if (!host) return;
      const wall = (D.cases || []).length;
      host.innerHTML = `<div class="vfx-cov-hero">${statHtml(wall, "上墙")}</div>`;
      host.hidden = false;
    }

    function renderTabs() {
      const host = root.querySelector("[data-vfx-tabs]");
      const extras = (D.scenes || []).filter((t) => t.name !== "落地页" && count(t.name) > 0);
      const showExtra = scenesOpen || (scene !== "全部" && scene !== "落地页");
      const chips = [];
      function chip(t) {
        const on = scene === t.name ? " is-on" : "";
        const sub = t.kind === "supplement" ? " is-sub" : "";
        const label = t.kind === "supplement" ? t.name + "（补充）" : t.name;
        const n = count(t.name);
        if (t.name !== "全部" && n === 0) return;
        chips.push(`<button type="button" class="vfx-tab press${on}${sub}" data-scene="${U.esc(t.name)}" aria-pressed="${scene === t.name ? "true" : "false"}">${U.esc(label)}<span class="n">${n}</span></button>`);
      }
      chip({ name: "全部", kind: "all" });
      chip({ name: "落地页", kind: "official" });
      if (extras.length) {
        chips.push(`<button type="button" class="vfx-tab press is-more${scenesOpen ? " is-open" : ""}" data-scenes-more="1" aria-expanded="${scenesOpen ? "true" : "false"}">场景</button>`);
      }
      if (showExtra) {
        extras.forEach((t) => {
          if (!scenesOpen && t.name !== scene) return;
          chip(t);
        });
      }
      host.innerHTML = chips.join("");
    }

    function ownThumbs(r) {
      if (!lightup) return [];
      const rec = rowRecord(lightup, r.name);
      const roll = rollup(rec);
      if (roll.none) return [];
      const pages = lightup.pages || {};
      return roll.pages
        .map((item) => {
          const page = pages[item.id];
          if (!page) return "";
          return U.thumbButton(
            {
              id: LIGHTUP_PREFIX + item.id + "::" + r.name,
              name: page.title || item.id,
              thumb: page.thumb
            },
            { className: "is-own" }
          );
        })
        .filter(Boolean);
    }

    function renderGrid() {
      const host = root.querySelector("[data-vfx-grid]");
      const list = listForScene();
      const langs = (D.rows || [])
        .map((r, i) => {
          const pages = list.filter((c) => c.row === r.name && c.scale === "整页");
          const comps = list.filter((c) => c.row === r.name && c.scale === "组件");
          const own = ownThumbs(r);
          const hang = [
            ...pages.map((c) => U.thumbButton(c, { className: "is-page" })),
            ...comps.map((c) => U.thumbButton(c, { className: "is-component" })),
            ...own
          ].join("");
          const inhabited = own.length > 0;
          const desc = r.desc || "";
          return `<section class="vfx-map-lang${inhabited ? " has-own" : " is-uninhabited"}" style="--lang-i:${i}">
            <h3 class="vfx-map-lang-name"${desc ? ` title="${U.esc(desc)}"` : ""}>${U.esc(r.name)}</h3>
            <div class="vfx-hang">${hang}</div>
          </section>`;
        })
        .join("");
      host.innerHTML = `<div class="vfx-map">${langs}</div>`;
      host.querySelectorAll(".vfx-thumb img").forEach((img) => {
        img.addEventListener("error", () => {
          const btn = img.closest(".vfx-thumb");
          if (!btn) return;
          btn.classList.add("is-missing");
          img.remove();
          const miss = document.createElement("span");
          miss.className = "vfx-thumb-miss";
          miss.textContent = "暂无截图";
          btn.appendChild(miss);
        });
      });
    }

    const tabs = root.querySelector("[data-vfx-tabs]");
    tabs.addEventListener("click", (e) => {
      const more = e.target.closest("[data-scenes-more]");
      if (more) {
        scenesOpen = !scenesOpen;
        renderTabs();
        return;
      }
      const b = e.target.closest("[data-scene]");
      if (!b) return;
      scene = b.getAttribute("data-scene");
      renderTabs();
      renderGrid();
    });

    const gridHost = root.querySelector("[data-vfx-grid]");

    gridHost.addEventListener("pointerover", (e) => {
      const thumb = e.target.closest(".vfx-thumb");
      if (!thumb || !gridHost.contains(thumb)) return;
      const lang = thumb.closest(".vfx-map-lang");
      if (!lang) return;
      const lifted = gridHost.querySelector(".vfx-thumb.is-lift");
      if (lifted && lifted !== thumb) lifted.classList.remove("is-lift");
      gridHost.querySelectorAll(".vfx-map-lang.is-dim").forEach((el) => {
        if (el !== lang) el.classList.remove("is-dim");
      });
      lang.classList.add("is-dim");
      thumb.classList.add("is-lift");
    });
    gridHost.addEventListener("pointerout", (e) => {
      const thumb = e.target.closest(".vfx-thumb");
      if (!thumb) return;
      const next = e.relatedTarget;
      if (next && thumb.contains(next)) return;
      const lang = thumb.closest(".vfx-map-lang");
      if (next && lang && lang.contains(next) && next.closest && next.closest(".vfx-thumb")) {
        return;
      }
      thumb.classList.remove("is-lift");
      if (lang && !(next && lang.contains(next))) lang.classList.remove("is-dim");
    });

    U.Hover.bind(gridHost, (card) => {
      const id = card.getAttribute("data-vfx-id");
      if (id && id.indexOf(LIGHTUP_PREFIX) === 0) return ownFloatData(id);
      const c = byId.get(id);
      return c ? floatData(c) : null;
    });

    function paint() {
      if (!root.isConnected) return;
      renderCoverage();
      renderTabs();
      renderGrid();
    }

    renderCoverage();
    renderTabs();
    if (lightup) {
      renderGrid();
    } else {
      loadLightup().then((L) => {
        if (!root.isConnected) return;
        lightup = L;
        renderCoverage();
        renderGrid();
      });
    }
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/overview"] = init;
})(window);
