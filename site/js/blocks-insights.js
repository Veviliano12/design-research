/* 设计研究 · Blocks 对照与洞察
 * 从 window.BLOCKS_VIZ 渲染。脚本可能被壳缓存，故把初始化挂到 VfxPages，
 * 并在 initVfxPage 尚不存在时自己提供一个只服务本页的入口。
 */
(function (global) {
  "use strict";

  const ROUTE = "blocks/insights";
  const GRAIN_LAYERS = [
    { id: "primitive", label: "原语", en: "primitive" },
    { id: "region", label: "区域", en: "region" },
    { id: "page", label: "整页", en: "page" },
    { id: "template", label: "模板", en: "template" },
    { id: "runtime-composed", label: "运行时组合", en: "runtime-composed" }
  ];
  const RESPONSE_STEPS = [
    { id: "catalog-select", label: "目录挑选" },
    { id: "compose-regions", label: "区域组合" },
    { id: "runtime-generate", label: "运行时生成" },
    { id: "prompt-to-code", label: "提示生成代码" }
  ];
  const KIND_LABEL = {
    baseline: "基线",
    "official-standard": "官方标准",
    catalog: "目录型",
    "catalog-community": "社区目录",
    "generative-ui": "生成式 UI",
    "optional-contrast": "对照"
  };
  const FILTERS = [
    { id: "all", label: "全部", kinds: null },
    { id: "standard", label: "基线与标准", kinds: ["baseline", "official-standard"] },
    { id: "catalog", label: "目录型", kinds: ["catalog", "catalog-community"] },
    { id: "generative", label: "生成式 UI", kinds: ["generative-ui", "optional-contrast"] }
  ];
  const CONTRACT_LABEL = {
    mixed: "混合接口",
    "baked-demo": "源码复制 / 烘焙示例",
    "runtime-props": "运行时 props"
  };

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  function formatNumber(n) {
    if (n == null || n === "") return "";
    const abs = Math.abs(Number(n));
    const sign = Number(n) < 0 ? "-" : "";
    const [int, dec] = String(abs).split(".");
    const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return sign + grouped + (dec != null ? "." + dec : "");
  }

  function countDisplay(c) {
    if (c && c.display != null && String(c.display).trim() !== "") return String(c.display);
    if (c && c.value != null) return formatNumber(c.value);
    return "—";
  }

  function isHttp(url) {
    return /^https?:\/\//i.test(url || "");
  }

  function linkLabel(url) {
    try {
      if (isHttp(url)) {
        const u = new URL(url);
        const path = u.pathname.length > 1 ? u.pathname.replace(/\/$/, "") : "";
        return u.hostname.replace(/^www\./, "") + path;
      }
    } catch (e) { /* fall through */ }
    const s = String(url || "");
    if (s.includes("/evidence/") || s.startsWith("evidence/")) {
      return "证据包索引 · " + s.split("/").pop();
    }
    if (s.includes("/HOS7/") || s.includes("repos/")) {
      return "本地仓 · " + s.split("/").slice(-2).join("/");
    }
    return s.replace(/^\/workspace\//, "");
  }

  function evidenceItem(ptr) {
    const s = String(ptr || "");
    if (isHttp(s)) {
      return `<a href="${esc(s)}" target="_blank" rel="noopener noreferrer">${esc(linkLabel(s))}</a>`;
    }
    return `<span title="${esc(s)}">${esc(linkLabel(s))}</span>`;
  }

  function nameOf(slug, sources) {
    const s = sources.find((x) => x.slug === slug);
    return s ? s.name : slug;
  }

  function kindOf(slug, sources) {
    const s = sources.find((x) => x.slug === slug);
    return s ? s.kind : "";
  }

  let state = {
    filter: "all",
    drawerSlug: null,
    observer: null,
    onKey: null,
    root: null
  };

  function teardown() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
    if (state.onKey) {
      removeEventListener("keydown", state.onKey);
      state.onKey = null;
    }
    closeDrawer(true);
    document.querySelectorAll(".bk-drawer, .bk-scrim").forEach((el) => el.remove());
    state.root = null;
    state.drawerSlug = null;
  }

  function isScrollable(el) {
    if (!el) return false;
    const oy = getComputedStyle(el).overflowY;
    if (oy !== "auto" && oy !== "scroll" && oy !== "overlay") return false;
    return el.scrollHeight > el.clientHeight + 1;
  }

  function scrollRoot() {
    const candidates = [
      document.querySelector("article.doc"),
      document.querySelector(".doc"),
    ];
    for (const el of candidates) {
      if (isScrollable(el)) return el;
    }
    return document.scrollingElement || document.documentElement;
  }

  function init() {
    const root = document.querySelector("[data-blocks-root]");
    if (!root) return;
    if (root.dataset.bkReady === "1") return;
    teardown();
    root.dataset.bkReady = "1";
    state.root = root;
    state.filter = "all";

    const data = global.BLOCKS_VIZ;
    if (!data || !Array.isArray(data.sources)) {
      root.insertAdjacentHTML(
        "afterbegin",
        '<p class="bk-warn">没有载入到对照数据。请用本地静态服务器打开本平台，并确认 data/blocks/viz-data.js 已装载。</p>'
      );
      return;
    }

    renderGrain(root, data);
    renderFilters(root, data);
    renderCards(root, data);
    renderResponse(root, data);
    renderScenes(root, data);
    renderFamilies(root, data);
    renderHos7(root, data);
    renderInsights(root, data);
    renderHyps(root, data);
    renderUnverified(root, data);
    bindNav(root);
    bindFilters(root, data);
    bindCards(root, data);
    ensureDrawer();
  }

  function renderGrain(root, data) {
    const host = root.querySelector("[data-bk-grain]");
    const rows = GRAIN_LAYERS.map((layer) => {
      const members = data.sources.filter((s) => (s.grain || []).includes(layer.id));
      const pills = members.length
        ? members
            .map(
              (s) =>
                `<button type="button" class="bk-pill press" data-kind="${esc(s.kind)}" data-open-source="${esc(s.slug)}">${esc(s.name)}</button>`
            )
            .join("")
        : `<span class="bk-grain-empty">本轮没有源落在这一层</span>`;
      return `<div class="bk-grain-row">
        <div class="bk-grain-label"><b>${esc(layer.label)}</b><span>${esc(layer.en)}</span></div>
        <div class="bk-pills">${pills}</div>
      </div>`;
    }).join("");
    host.innerHTML = `<div class="bk-grain">${rows}</div>`;
  }

  function sourcesForFilter(data) {
    const f = FILTERS.find((x) => x.id === state.filter) || FILTERS[0];
    if (!f.kinds) return data.sources;
    return data.sources.filter((s) => f.kinds.includes(s.kind));
  }

  function renderFilters(root, data) {
    const host = root.querySelector("[data-bk-filters]");
    host.innerHTML = FILTERS.map((f) => {
      const n = f.kinds ? data.sources.filter((s) => f.kinds.includes(s.kind)).length : data.sources.length;
      const on = state.filter === f.id ? " is-on" : "";
      return `<button type="button" class="bk-chip press${on}" data-filter="${esc(f.id)}" aria-pressed="${state.filter === f.id ? "true" : "false"}">${esc(f.label)}<span class="n">${n}</span></button>`;
    }).join("");
  }

  function primaryCounts(s) {
    const counts = s.official_counts || [];
    if (!s.has_traditional_block_catalog) return { main: counts, rest: [] };
    // Keep official block-related counts together; components/templates/patterns sit as secondary.
    const secondaryUnit = /component|example|template|pattern|blueprint|pages|page(?!s?-type)/i;
    const main = [];
    const rest = [];
    counts.forEach((c, i) => {
      const unit = String(c.unit || "");
      const grain = String(c.grain || "");
      const isBlockish =
        /block/i.test(unit) ||
        (i === 0 && !secondaryUnit.test(unit) && !/not a block|NOT a blocks|not blocks|NOT blocks/i.test(unit));
      const isExplicitNonBlock = /not a block|NOT a blocks|not blocks|NOT blocks|example, not block|patterns/i.test(unit + " " + (c.notes || "") + " " + grain);
      if (isExplicitNonBlock) rest.push(c);
      else if (isBlockish) main.push(c);
      else rest.push(c);
    });
    if (!main.length) return { main: counts, rest: [] };
    return { main, rest };
  }

  function countBlock(c, secondary) {
    const num = countDisplay(c);
    const unit = c.unit ? esc(c.unit) : "";
    const grain = c.grain ? esc(c.grain) : "";
    const verified = c.verified === true;
    const unverified = c.verified === false;
    const flag = unverified
      ? '<span class="bk-flag is-no">未核实</span>'
      : verified
        ? '<span class="bk-flag is-yes">本轮核实</span>'
        : "";
    const mode = secondary === true ? "secondary" : secondary || "";
    const cls = "bk-count" + (mode === "secondary" ? " is-secondary" : mode === "layer" ? " is-layer" : "");
    return `<div class="${cls}">
      <div class="bk-num">${esc(num)}</div>
      <span class="bk-unit">${unit}${unit && grain ? " · " : ""}${grain}</span>
      <div class="bk-count-meta">${flag}</div>
    </div>`;
  }

  function renderCards(root, data) {
    const host = root.querySelector("[data-bk-cards]");
    const list = sourcesForFilter(data);
    host.innerHTML = list
      .map((s) => {
        const { main, rest } = primaryCounts(s);
        const noCat = !s.has_traditional_block_catalog;
        const shown = noCat ? [] : main;
        const restShown = noCat ? main.concat(rest) : rest;
        const countsHtml = shown.map((c, i) => countBlock(c, i > 0 ? "layer" : "")).join("");
        const extra = restShown.length ? restShown.map((c) => countBlock(c, "secondary")).join("") : "";
        const nocatLine = noCat ? '<div class="bk-nocat">无传统 block 目录</div>' : "";
        const models = (s.response_model || []).map((m) => {
          const step = RESPONSE_STEPS.find((x) => x.id === m);
          return step ? step.label : m;
        });
        const noCatalog = s.has_traditional_block_catalog
          ? ""
          : `<span>无传统 block 目录</span>`;
        const grain = (s.grain || []).join(" / ");
        return `<button type="button" class="bk-card press" data-open-source="${esc(s.slug)}" data-kind="${esc(s.kind)}">
          <div class="bk-card-top">
            <span class="bk-card-name">${esc(s.name)}</span>
            <span class="bk-card-kind">${esc(KIND_LABEL[s.kind] || s.kind)}</span>
          </div>
          ${nocatLine}<div class="bk-counts">${countsHtml}${extra}</div>
          <p class="bk-card-reading">${esc(s.coverage_claim || s.grain_notes || "")}</p>
          <div class="bk-card-tags">
            ${noCatalog}
            <span>${esc(grain)}</span>
            ${models.map((m) => `<span>${esc(m)}</span>`).join("")}
            <span>${esc(CONTRACT_LABEL[s.interface_contract] || s.interface_contract || "")}</span>
          </div>
        </button>`;
      })
      .join("");

    const warn = root.querySelector("[data-bk-69-warn]");
    if (warn) {
      const slugs = new Set(list.map((s) => s.slug));
      warn.hidden = !(slugs.has("hos7") && slugs.has("copilotkit"));
    }
  }

  function renderResponse(root, data) {
    const host = root.querySelector("[data-bk-response]");
    const cols = RESPONSE_STEPS.map((step) => {
      const members = data.sources.filter((s) => (s.response_model || []).includes(step.id));
      const pills = members
        .map(
          (s) =>
            `<button type="button" class="bk-pill press" data-kind="${esc(s.kind)}" data-open-source="${esc(s.slug)}">${esc(s.name)}</button>`
        )
        .join("");
      return `<div class="bk-flow-col">
        <div class="bk-flow-k">${esc(step.label)}</div>
        <div class="bk-pills">${pills || '<span class="bk-grain-empty">—</span>'}</div>
      </div>`;
    }).join("");
    host.innerHTML = `<div class="bk-flow">
      <div class="bk-flow-end"><b>Query</b></div>
      ${cols}
      <div class="bk-flow-end"><b>UI</b></div>
    </div>`;
  }

  function renderScenes(root, data) {
    const host = root.querySelector("[data-bk-scenes]");
    host.innerHTML = (data.scene_clusters || [])
      .map((c) => {
        const members = (c.members || [])
          .map((m) => {
            const name = nameOf(m.slug, data.sources);
            return `<div><dt>${esc(name)}</dt><dd>${esc(m.note || "")}</dd></div>`;
          })
          .join("");
        const out = c.non_members_note ? `<p class="out">${esc(c.non_members_note)}</p>` : "";
        return `<article class="bk-scene">
          <h4>${esc(c.label_zh)}</h4>
          <p class="read">${esc(c.reading_zh || "")}</p>
          <dl>${members}</dl>
          ${out}
        </article>`;
      })
      .join("");
  }

  function renderFamilies(root, data) {
    const host = root.querySelector("[data-bk-families]");
    const rows = (data.component_families_crosswalk || [])
      .map((f) => {
        const srcs = (f.sources || [])
          .map((s) => {
            const name = nameOf(s.slug, data.sources);
            return `<div class="src"><b>${esc(name)}</b> <span>${esc(s.note || "")}</span></div>`;
          })
          .join("");
        return `<tr>
          <td>${esc(f.label_zh)}<span class="cmp">${esc(f.comparability || "")}</span></td>
          <td>${srcs}</td>
        </tr>`;
      })
      .join("");
    host.innerHTML = `<div class="bk-flow-scroll"><table class="bk-xwalk">
      <thead><tr><th>家族</th><th>各源可核实的子计数或说明</th></tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
  }

  function renderHos7(root) {
    const host = root.querySelector("[data-bk-hos7]");
    host.innerHTML = `
      <div class="bk-matrix">
        <div class="h"><span class="lab"></span></div>
        <div class="h"><span class="lab">component · data props</span></div>
        <div class="h"><span class="lab">demo · baked</span></div>
        <div class="r"><span class="lab">整页 page</span></div>
        <div class="c is-empty">
          <div class="bk-num">—</div>
          <p>理想态尚未占位：可路由、可喂数据的整页 frame。</p>
        </div>
        <div class="c">
          <div class="bk-num">14</div>
          <span class="bk-unit">page-type blocks · 全部 kind=demo</span>
          <p>供 <code>ds.py route</code> 选择。适合展示或抄结构，不应当成可运行的产品壳。</p>
        </div>
        <div class="r"><span class="lab">区域 region</span></div>
        <div class="c is-weight">
          <div class="bk-num">53</div>
          <span class="bk-unit">region blocks · component</span>
          <p>真正可组合、可 data-driven 的重心。安装为空，必须喂数据。</p>
        </div>
        <div class="c">
          <div class="bk-num">2</div>
          <span class="bk-unit">region blocks · demo</span>
          <p>适合抄结构。另有接近卡片单元的条目（如 big-image-card）仍混在 region 标签下，region 本身并不同质。</p>
        </div>
      </div>
      <p class="bk-caption">14 + 53 + 2 = 69。不要把 69 读成 69 个屏幕，也不要读成 69 个 section。另有 87 个 <code>registry:ui</code> 组件与 10 个 layout blueprints，不是 blocks。</p>
      <div class="bk-subhead">
        <h4>建议先补的字段</h4>
        <p>这是结构建议，不是数量建议。route 应优先选择带数据契约的 frame。</p>
      </div>
      <table class="bk-fields">
        <thead><tr><th>字段</th><th>取值</th><th>解决什么</th></tr></thead>
        <tbody>
          <tr><td>grain</td><td>primitive / region / page / template</td><td>防止把卡片、区域、整页塞进同一个 69</td></tr>
          <tr><td>kind</td><td>component / demo</td><td>保留现有优势：安装后是空的，还是烘焙的</td></tr>
          <tr><td>data_contract</td><td>props schema 或 null</td><td>让 agent 知道装完要不要喂数据、喂什么</td></tr>
          <tr><td>scene</td><td>产品表面</td><td>检索先过滤场景，再选条目</td></tr>
          <tr><td>routeable</td><td>true / false</td><td>明确哪些条目能被 route 选中；demo page-type 必须显式</td></tr>
        </tbody>
      </table>
      <p class="bk-caption">当前不要在这一步扩大目录。先把已有 69 条标清：卡片单元从 region 里拆出或标注；14 个 page-type 标 demo_only；53 个 component region 补上数据契约。</p>`;
  }

  function renderInsights(root, data) {
    const host = root.querySelector("[data-bk-insights]");
    const cards = (data.insight_cards || []).filter((c) => c.status === "established");
    host.innerHTML = cards
      .map((c) => {
        const ev = (c.evidence_pointers || []).map((p) => evidenceItem(p)).join("");
        return `<article class="bk-ins">
          <div class="st">已成立</div>
          <h4>${esc(c.title_zh)}</h4>
          <p>${esc(c.body_zh)}</p>
          <div class="bk-ev">${ev}</div>
        </article>`;
      })
      .join("");
  }

  function renderHyps(root, data) {
    const host = root.querySelector("[data-bk-hyps]");
    const qc = data.query_coverage || {};
    const draft = qc.agui_test_set_draft_queries || {};
    host.innerHTML =
      (data.next_step_hypotheses || [])
        .map((h) => {
          const blocker = h.blocker
            ? `<div class="block">${esc(h.blocker)}。本轮未复算，不得用于覆盖结论。</div>`
            : "";
          return `<article class="bk-hyp">
            <div class="hid">${esc(h.id)}</div>
            <div>
              <span class="st-h">假设</span>
              <b>${esc(h.hypothesis_zh)}</b>
              <p>证伪条件：${esc(h.falsify_if)}</p>
              ${blocker}
            </div>
          </article>`;
        })
        .join("") +
      (draft.claimed_in_plan != null
        ? `<p class="bk-warn"><strong>${esc(String(draft.claimed_in_plan))} 条 draft query：本轮未复算。</strong> recounted_this_round = ${draft.recounted_this_round ? "是" : "否"}，不得用于覆盖结论，也不能回答「${esc(qc.do_not_answer || "我们需要 N 个 blocks")}」。</p>`
        : "");
  }

  function renderUnverified(root, data) {
    const host = root.querySelector("[data-bk-unverified]");
    const items = (data.unverified_or_do_not_merge || [])
      .map(
        (u) =>
          `<li><span class="d">${esc(u.display)}</span><span>${esc(u.visual_action)}</span></li>`
      )
      .join("");
    host.innerHTML = `<div class="bk-close"><h4>必须带着状态出现的数字与做法</h4><ul>${items}</ul></div>`;

    const method = root.querySelector("[data-bk-method]");
    const date = data.meta && data.meta.date ? data.meta.date : "";
    const tz = data.meta && data.meta.timezone ? data.meta.timezone : "";
    method.innerHTML = `证据来自官方文档与本地 HOS7；洞察初稿由火山网关 DeepSeek V4.1 Flash 综合，再对照证据包核验。调研日期 ${esc(date)}${tz ? "（" + esc(tz) + "）" : ""}。`;
  }

  function bindNav(root) {
    const nav = root.querySelector("[data-bk-subnav]");
    const links = [...nav.querySelectorAll("a[href^='#']")];
    const ids = links.map((a) => a.getAttribute("href").slice(1));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    const scroller = scrollRoot();

    nav.addEventListener("click", (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a || !nav.contains(a)) return;
      const el = document.getElementById(a.getAttribute("href").slice(1));
      if (!el) return;
      e.preventDefault();
      const navH = nav.getBoundingClientRect().height;
      const top = el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - navH;
      scroller.scrollTo({ top: Math.max(0, top), behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    });

    const setCurrent = (id) => {
      links.forEach((a) => {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };
    if (ids[0]) setCurrent(ids[0]);

    if (typeof IntersectionObserver === "function") {
      const obs = new IntersectionObserver(
        (entries) => {
          const vis = entries
            .filter((en) => en.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          if (vis[0] && vis[0].target && vis[0].target.id) setCurrent(vis[0].target.id);
        },
        { root: scroller === document.scrollingElement ? null : scroller, rootMargin: "-12% 0px -70% 0px", threshold: [0, 0.2, 0.5] }
      );
      sections.forEach((s) => obs.observe(s));
      state.observer = obs;
    }
  }

  function bindFilters(root, data) {
    const host = root.querySelector("[data-bk-filters]");
    host.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-filter]");
      if (!btn) return;
      state.filter = btn.getAttribute("data-filter");
      renderFilters(root, data);
      renderCards(root, data);
    });
  }

  function bindCards(root, data) {
    root.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-open-source]");
      if (!btn || !root.contains(btn)) return;
      openDrawer(data, btn.getAttribute("data-open-source"));
    });
  }

  function ensureDrawer() {
    if (document.querySelector(".bk-drawer")) return;
    const scrim = document.createElement("div");
    scrim.className = "bk-scrim";
    scrim.addEventListener("click", () => closeDrawer());
    const drawer = document.createElement("aside");
    drawer.className = "bk-drawer";
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-modal", "true");
    drawer.setAttribute("aria-labelledby", "bk-drawer-title");
    drawer.hidden = true;
    document.body.appendChild(scrim);
    document.body.appendChild(drawer);
    state.onKey = (e) => {
      if (e.key === "Escape") closeDrawer();
    };
    addEventListener("keydown", state.onKey);
  }

  function openDrawer(data, slug) {
    const s = data.sources.find((x) => x.slug === slug);
    if (!s) return;
    ensureDrawer();
    const drawer = document.querySelector(".bk-drawer");
    const scrim = document.querySelector(".bk-scrim");
    state.drawerSlug = slug;

    const { main, rest } = primaryCounts(s);
    const allCounts = [...main, ...rest];
    const counts = allCounts
      .map((c) => {
        const flag = c.verified === false ? "未核实" : c.verified === true ? "本轮核实" : "";
        return `<li><b>${esc(countDisplay(c))}</b> ${esc(c.unit || "")}${c.grain ? " · " + esc(c.grain) : ""}${flag ? " · " + flag : ""}${c.notes ? "<br><span class='bk-local'>" + esc(c.notes) + "</span>" : ""}</li>`;
      })
      .join("");

    const tax = (s.taxonomy || [])
      .map((t) => {
        const n = t.count != null ? formatNumber(t.count) : t.count_display || "";
        const mixed = t.mixed ? "（混合库存）" : "";
        const notes = t.notes ? " · " + t.notes : "";
        return `<li>${esc(t.name)}${n ? " · " + esc(n) : ""}${esc(mixed)}${esc(notes)}</li>`;
      })
      .join("");

    const scenes = (s.scenes || []).map((x) => `<li>${esc(x)}</li>`).join("");
    const fams = (s.component_families || []).map((x) => `<li>${esc(x)}</li>`).join("");

    const links = (s.official_urls || [])
      .map((u) => {
        if (isHttp(u)) {
          return `<li><a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(linkLabel(u))}</a></li>`;
        }
        return `<li class="bk-local">本地路径，不在页上打开：${esc(linkLabel(u))}</li>`;
      })
      .join("");

    const clash = s.name_clash && s.name_clash.length
      ? `<div class="bk-dl"><h4>名称需区分</h4><p>本课题对象不是 ${esc(s.name_clash.join("，"))}。</p></div>`
      : "";

    const catalogLine = s.has_traditional_block_catalog
      ? "有传统 block 目录。"
      : "无传统 block 目录，不能把空缺读成“零个 blocks”。";

    drawer.innerHTML = `
      <div class="bk-drawer-bar">
        <div>
          <h3 id="bk-drawer-title">${esc(s.name)}</h3>
          <div class="sub">${esc(KIND_LABEL[s.kind] || s.kind)} · ${esc(CONTRACT_LABEL[s.interface_contract] || s.interface_contract || "")}</div>
        </div>
        <button type="button" class="bk-drawer-close press" data-bk-close aria-label="关闭">×</button>
      </div>
      <div class="bk-drawer-body">
        <div class="bk-dl">
          <h4>界定</h4>
          <p>${esc(catalogLine)} 粒度：${esc((s.grain || []).join(" / "))}${s.grain_notes ? "。" + esc(s.grain_notes) : ""}</p>
        </div>
        <div class="bk-dl">
          <h4>官方数字</h4>
          <ul>${counts || "<li>无</li>"}</ul>
        </div>
        <div class="bk-dl">
          <h4>分类</h4>
          <ul>${tax || "<li>本轮无逐项分类计数</li>"}</ul>
        </div>
        <div class="bk-dl">
          <h4>场景</h4>
          <ul>${scenes || "<li>—</li>"}</ul>
        </div>
        <div class="bk-dl">
          <h4>组件族</h4>
          <ul>${fams || "<li>—</li>"}</ul>
        </div>
        <div class="bk-dl">
          <h4>覆盖声称</h4>
          <p>${esc(s.coverage_claim || "—")}</p>
        </div>
        ${clash}
        <div class="bk-dl">
          <h4>官方链接</h4>
          <ul>${links || "<li>—</li>"}</ul>
        </div>
      </div>`;
    drawer.querySelector("[data-bk-close]").addEventListener("click", () => closeDrawer());
    drawer.hidden = false;
    requestAnimationFrame(() => {
      scrim.classList.add("is-on");
      drawer.classList.add("is-on");
    });
  }

  function closeDrawer(immediate) {
    const drawer = document.querySelector(".bk-drawer");
    const scrim = document.querySelector(".bk-scrim");
    if (!drawer || !scrim) return;
    state.drawerSlug = null;
    drawer.classList.remove("is-on");
    scrim.classList.remove("is-on");
    const hide = () => {
      drawer.hidden = true;
    };
    if (immediate || matchMedia("(prefers-reduced-motion: reduce)").matches) hide();
    else setTimeout(hide, 360);
  }

  function onHashLeave() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (raw !== ROUTE) teardown();
  }

  function boot() {
    global.VfxPages = global.VfxPages || {};
    global.VfxPages[ROUTE] = function () {
      const root = document.querySelector("[data-blocks-root]");
      if (root) delete root.dataset.bkReady;
      init();
    };
    if (typeof global.initVfxPage !== "function") {
      global.initVfxPage = function (route) {
        const fn = global.VfxPages && global.VfxPages[route];
        if (typeof fn === "function") fn(route);
      };
    }
    const prevTear = global.teardownVfxPage;
    global.teardownVfxPage = function () {
      teardown();
      if (typeof prevTear === "function" && prevTear !== global.teardownVfxPage) {
        try { prevTear(); } catch (e) { /* ignore */ }
      }
    };
    addEventListener("hashchange", onHashLeave);
    // 壳会在 loadScripts 之后调用 initVfxPage；独立打开本页时没有这一步，需要自行初始化。
    const loadedByShell = !!(document.currentScript && document.currentScript.getAttribute("data-shell-src"));
    if (!loadedByShell && document.querySelector("[data-blocks-root]")) init();
  }

  boot();
})(window);
