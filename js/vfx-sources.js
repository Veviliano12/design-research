/* 设计研究 · 来源。一屏三层：渠道 → 具体来源 → 一条一格。
 * 颜色只表示真实状态：已吸收 / 待审 / 不吸收。候审 30 另行着色，不画进 124。
 * 核心 / 站点清单 / X 分库存立账，不加总成一个来源库总数。
 * 已吸收 53 ≠ 视效库 124。格子亮了只说明这条来源记录已吸收。 */
(function (global) {
  "use strict";

  const STATUS_CN = { absorbed: "已吸收", rejected: "不吸收", pending: "待审" };
  const STATUS_ORDER = { absorbed: 0, rejected: 1, pending: 2 };
  const QUEUE_HREF = "#/vfx/preview";
  const LANG_ORDER = [
    "液态玻璃与光学",
    "流体与着色器场",
    "光与发光",
    "粒子与点云",
    "图像与视频后期",
    "生成艺术与程序化图形",
    "实时 3D · 写实材质与物件",
    "实时 3D · 场景与世界",
    "物理与软体模拟"
  ];

  const CHANNELS = [
    {
      id: "official",
      label: "官方渠道",
      blocks: ["official", "awards", "product"],
      groups: [
        { name: "厂方", sources: ["苹果", "谷歌", "鸿蒙", "微软"] },
        { name: "奖项", sources: ["Awwwards", "FWA", "CSSDA", "工作室"] },
        { name: "产品与案例", sources: ["产品", "已有案例", "经典实验"] }
      ]
    },
    {
      id: "oss",
      label: "开源与组件库",
      blocks: ["threeui", "opensource", "gallery"],
      groups: [
        { name: "核心清单", sources: ["ThreeUI", "开源产品"], kind: "core" },
        {
          name: "站点清单",
          sources: [
            "Codrops Webzibition",
            "Chrome Experiments",
            "Berkeley 案例库",
            "mesh3d",
            "MUUUUU",
            "Interact Gallery",
            "storytelling.design",
            "HOVERSTAT.ES",
            "补充收录",
            "p5aholic",
            "The Pudding"
          ],
          kind: "sites"
        }
      ]
    },
    {
      id: "x",
      label: "X",
      blocks: ["x"],
      groups: [
        { name: "发现渠道", sources: ["视效推文", "动效推文", "X 收获站点"], kind: "x" }
      ]
    }
  ];

  function hydrate(it) {
    const o = Object.assign({}, it);
    o.channels = o.channels && o.channels.length ? o.channels : [o.channel];
    o.note = o.note || "";
    o.studio = o.studio || "";
    o.author_name = o.author_name || o.author || "";
    o.source_detail = o.source_detail || "";
    o.thumb = o.thumb || "";
    if (!o.thumb_kind) {
      o.thumb_kind = o.thumb ? (String(o.thumb).indexOf("http") === 0 ? "remote" : "local") : "none";
    }
    return o;
  }

  function collectItems() {
    return []
      .concat(global.VFX_LIT_CORE || [], global.VFX_LIT_SITES || [], global.VFX_LIT_X || [])
      .map(hydrate);
  }

  function countsOf(list) {
    const c = { total: list.length, absorbed: 0, rejected: 0, pending: 0 };
    list.forEach((it) => {
      c[it.status] = (c[it.status] || 0) + 1;
    });
    return c;
  }

  function sortItems(list) {
    return list.slice().sort((a, b) => (STATUS_ORDER[a.status] || 9) - (STATUS_ORDER[b.status] || 9));
  }

  function statusFill(st) {
    if (st === "absorbed") return "#3EC8FF";
    if (st === "rejected") return "rgba(232,233,235,0.30)";
    return "rgba(255,255,255,0.075)";
  }

  function mixHtml(U, c, withLabels) {
    return [
      `<span class="src-swatch is-absorbed"></span>${withLabels ? "已吸收 " : ""}${c.absorbed}`,
      `<span class="src-swatch is-rejected"></span>${withLabels ? "不吸收 " : ""}${c.rejected}`,
      `<span class="src-swatch is-pending"></span>${withLabels ? "待审 " : ""}${c.pending}`
    ].join(" ");
  }

  function paintGrid(canvas, items, opts) {
    const cell = Math.max(2, opts.cell || 8);
    const gap = opts.gap != null ? opts.gap : Math.min(2, Math.max(1, Math.floor(cell / 5)));
    const pad = opts.pad || 0;
    const width = Math.max(1, canvas.clientWidth || opts.width || 120);
    const maxCols = Math.max(1, Math.floor((width - pad * 2) / cell));
    const sq = Math.ceil(Math.sqrt(Math.max(items.length, 1)));
    const cols = Math.min(maxCols, Math.max(1, opts.fillWidth ? maxCols : (opts.cols || sq)));
    const rows = Math.max(1, Math.ceil(Math.max(items.length, 1) / cols));
    const h = rows * cell + pad * 2;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = width + "px";
    canvas.style.height = h + "px";
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, h);
    const size = Math.max(1, cell - gap);
    items.forEach((it, i) => {
      const x = pad + (i % cols) * cell;
      const y = pad + Math.floor(i / cols) * cell;
      ctx.fillStyle = statusFill(it.status);
      ctx.fillRect(x, y, size, size);
    });
    canvas.__grid = { items, cols, rows, cell, pad, size, width, height: h };
    return canvas.__grid;
  }

  function hitCell(canvas, ev) {
    const g = canvas.__grid;
    if (!g) return null;
    const r = canvas.getBoundingClientRect();
    const x = ev.clientX - r.left;
    const y = ev.clientY - r.top;
    const scaleX = g.width / r.width;
    const scaleY = g.height / r.height;
    const col = Math.floor((x * scaleX - g.pad) / g.cell);
    const row = Math.floor((y * scaleY - g.pad) / g.cell);
    if (col < 0 || row < 0 || col >= g.cols) return null;
    const i = row * g.cols + col;
    return g.items[i] || null;
  }

  function init(route) {
    const U = global.VfxUtil;
    const root = document.querySelector("[data-vfx-root='sources']");
    if (!root || !U) return;

    const all = collectItems();
    if (!all.length) {
      root.innerHTML = '<p class="vfx-empty-page">没有载入到来源数据。</p>';
      return;
    }

    const bySource = new Map();
    all.forEach((it) => {
      const name = it.channel || "未分组";
      if (!bySource.has(name)) bySource.set(name, []);
      bySource.get(name).push(it);
    });

    const coreItems = global.VFX_LIT_CORE || [];
    const siteItems = global.VFX_LIT_SITES || [];
    const xItems = global.VFX_LIT_X || [];
    const coreC = countsOf(coreItems);
    const siteC = countsOf(siteItems);
    const xC = countsOf(xItems);

    const state = {
      focus: null,
      item: null
    };

    function itemsOf(name) {
      return bySource.get(name) || [];
    }

    function channelItems(ch) {
      const names = ch.groups.flatMap((g) => g.sources);
      const list = [];
      names.forEach((n) => list.push.apply(list, itemsOf(n)));
      return list;
    }

    function kindOf(name, group) {
      if (group && group.kind) return group.kind;
      const n = itemsOf(name).length;
      if (n >= 400) return "sites";
      return "core";
    }

    function cellSize(kind, mode) {
      if (mode === "focus") {
        if (kind === "core") return 12;
        if (kind === "x") return 7;
        return 5;
      }
      if (kind === "core") return 8;
      return 3;
    }

    function renderHead(host) {
      host.innerHTML = `
        <header class="src-viz-head">
          <div class="src-viz-title">
            <p class="kicker">来源</p>
            <div class="src-inventories" aria-label="分库存立账，不加总">
              <div class="src-inv">
                <b>${coreC.total}</b>
                <span>核心清单</span>
                <small>已吸收 ${coreC.absorbed} · 不吸收 ${coreC.rejected} · 待审 ${coreC.pending}</small>
              </div>
              <div class="src-inv">
                <b>${siteC.total}</b>
                <span>站点清单</span>
                <small>待审 ${siteC.pending}</small>
              </div>
              <div class="src-inv">
                <b>${xC.total}</b>
                <span>X</span>
                <small>已吸收 ${xC.absorbed} · 不吸收 ${xC.rejected} · 待审 ${xC.pending}</small>
              </div>
            </div>
          </div>
          <div class="src-viz-legend">
            <span><i class="src-swatch is-absorbed"></i>已吸收</span>
            <span><i class="src-swatch is-rejected"></i>不吸收</span>
            <span><i class="src-swatch is-pending"></i>待审</span>
            <a class="src-queue" href="${QUEUE_HREF}">
              <i class="src-swatch is-queue"></i>候审 30 · 不计入 124
            </a>
          </div>
        </header>
        <p class="src-viz-note">亮格 = 该条来源记录已吸收，不是视效库的 124。站点清单与 X 按真实条数铺成密色域，几乎都还待审。</p>
      `;
    }

    function clusterButton(name, group) {
      const items = sortItems(itemsOf(name));
      const c = countsOf(items);
      if (!c.total) return "";
      const kind = kindOf(name, group);
      const featured = name === "ThreeUI" || name === "视效推文" ? " is-featured" : "";
      return `<button type="button" class="src-cluster is-${kind}${featured}" data-source="${U.esc(name)}" data-kind="${kind}">
        <span class="src-cluster-head">
          <span class="src-cluster-name">${U.esc(name)}</span>
          <b>${c.total}</b>
        </span>
        <span class="src-cluster-mix">${mixHtml(U, c, false)}</span>
        <canvas class="src-grid" data-grid="${U.esc(name)}" aria-hidden="true"></canvas>
      </button>`;
    }

    function leftoverSources(ch) {
      const listed = new Set(ch.groups.flatMap((g) => g.sources));
      const names = [];
      all.forEach((it) => {
        if (ch.blocks.indexOf(it.block) === -1) return;
        const name = it.channel || "未分组";
        if (!listed.has(name) && names.indexOf(name) === -1) names.push(name);
      });
      return names;
    }

    function renderBoard(host) {
      const cols = CHANNELS.map((ch) => {
        const extra = leftoverSources(ch);
        const groupsSpec = ch.groups.map((g, i, arr) => {
          if (i === arr.length - 1 && extra.length) {
            return Object.assign({}, g, { sources: g.sources.concat(extra) });
          }
          return g;
        });
        const items = channelItems(ch).concat(extra.flatMap(itemsOf));
        const c = countsOf(items);
        const groups = groupsSpec
          .map((g) => {
            const present = g.sources.filter((n) => itemsOf(n).length);
            if (!present.length) return "";
            const body = present.map((n) => clusterButton(n, g)).join("");
            const wrapCls = g.kind === "sites" || g.kind === "x" ? "src-dense-wrap" : "src-core-wrap";
            return `<div class="src-group">
              <p class="src-group-name">${U.esc(g.name)}</p>
              <div class="${wrapCls}">${body}</div>
            </div>`;
          })
          .join("");
        let tally = "";
        if (ch.id === "official") {
          tally = `${c.total} · 核心清单中的官方渠道`;
        } else if (ch.id === "oss") {
          const coreN = itemsOf("ThreeUI").length + itemsOf("开源产品").length;
          const siteN = c.total - coreN;
          tally = `核心 ${coreN} · 站点清单 ${siteN}`;
        } else {
          tally = String(c.total);
        }
        return `<section class="src-channel" data-channel="${ch.id}">
          <header class="src-channel-head">
            <h2>${U.esc(ch.label)}</h2>
            <p>${U.esc(tally)}</p>
          </header>
          <div class="src-groups">${groups}</div>
        </section>`;
      }).join("");
      host.insertAdjacentHTML("beforeend", `<div class="src-board">${cols}</div>`);
    }

    function paintAll(scope) {
      (scope || root).querySelectorAll("canvas[data-grid]").forEach((cv) => {
        const name = cv.getAttribute("data-grid");
        const cluster = cv.closest("[data-kind]");
        const kind = cluster ? cluster.getAttribute("data-kind") : "core";
        const mode = cv.closest(".src-focus") ? "focus" : "view";
        const band = cv.getAttribute("data-band");
        let items;
        if (band === "absorbed") {
          const lang = cv.getAttribute("data-lang") || "";
          items = sortItems(itemsOf(name).filter((it) => it.status === "absorbed" && languageOf(it) === lang));
        } else if (band === "rejected" || band === "pending") {
          items = itemsOf(name).filter((it) => it.status === band);
        } else {
          items = sortItems(itemsOf(name));
        }
        const fillWidth = kind === "sites" || kind === "x" || mode === "focus";
        paintGrid(cv, items, { cell: cellSize(kind, mode), fillWidth });
      });
    }

    function languageOf(it) {
      return (it.map && it.map.row) || "未分组";
    }

    function inspectHtml(it) {
      if (!it) {
        return `<div class="src-inspect-empty">点格查看单条</div>`;
      }
      const img = U.thumbSrc(it, true);
      const shot = img
        ? `<div class="src-inspect-shot"><img src="${U.esc(img)}" alt="${U.esc(it.name)}"></div>`
        : `<div class="src-inspect-shot is-missing">暂无现场截图</div>`;
      const bits = [];
      bits.push(`<span class="src-st is-${it.status}">${STATUS_CN[it.status] || "待审"}</span>`);
      if (it.studio) bits.push(U.esc(it.studio));
      if (it.author_name && it.author_name !== it.studio) bits.push(U.esc(it.author_name));
      if (it.map && it.map.row) bits.push(U.esc(it.map.row));
      if (it.map && it.map.scale) bits.push(U.esc(it.map.scale));
      const links = [];
      if (it.url) {
        links.push(`<a class="src-go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`);
      }
      if (it.external_url && it.external_url !== it.url) {
        links.push(`<a class="src-go" href="${U.esc(it.external_url)}" target="_blank" rel="noopener noreferrer">相关站点 ↗</a>`);
      }
      const note =
        it.status === "rejected" && it.note
          ? `<p class="src-inspect-note">不吸收原因：${U.esc(it.note)}</p>`
          : it.note
            ? `<p class="src-inspect-note">${U.esc(it.note)}</p>`
            : "";
      return `${shot}
        <h3>${U.esc(it.name)}</h3>
        <p class="src-inspect-meta">${bits.join(" · ")}</p>
        <div class="src-inspect-links">${links.join("")}</div>
        ${note}`;
    }

    function renderFocus(host, sourceName) {
      const items = itemsOf(sourceName);
      const c = countsOf(items);
      const kind = sourceName === "ThreeUI" || sourceName === "开源产品" || CHANNELS[0].groups.some((g) => g.sources.includes(sourceName))
        ? "core"
        : sourceName.indexOf("推文") >= 0 || sourceName === "X 收获站点"
          ? "x"
          : "sites";
      const absorbed = items.filter((it) => it.status === "absorbed");
      const byLang = new Map();
      absorbed.forEach((it) => {
        const lang = languageOf(it);
        if (!byLang.has(lang)) byLang.set(lang, []);
        byLang.get(lang).push(it);
      });
      const langNames = LANG_ORDER.filter((n) => byLang.has(n));
      byLang.forEach((_, n) => {
        if (!langNames.includes(n)) langNames.push(n);
      });

      let langHtml = "";
      if (absorbed.length && kind === "core") {
        langHtml = `<div class="src-langs">` + langNames
          .map((lang) => {
            const n = byLang.get(lang).length;
            return `<div class="src-band">
              <p class="src-band-name">${U.esc(lang)}<b>${n}</b></p>
              <canvas class="src-grid" data-grid="${U.esc(sourceName)}" data-band="absorbed" data-lang="${U.esc(lang)}"></canvas>
            </div>`;
          })
          .join("") + `</div>`;
      } else if (absorbed.length) {
        langHtml = `<div class="src-band">
          <p class="src-band-name">已吸收<b>${c.absorbed}</b></p>
          <canvas class="src-grid" data-grid="${U.esc(sourceName)}" data-band="absorbed" data-lang=""></canvas>
        </div>`;
      }
      const statusHtml = `<div class="src-status-row">
        ${c.rejected ? `<div class="src-band">
          <p class="src-band-name">不吸收<b>${c.rejected}</b></p>
          <canvas class="src-grid" data-grid="${U.esc(sourceName)}" data-band="rejected"></canvas>
        </div>` : ""}
        ${c.pending ? `<div class="src-band">
          <p class="src-band-name">待审<b>${c.pending}</b></p>
          <canvas class="src-grid" data-grid="${U.esc(sourceName)}" data-band="pending"></canvas>
        </div>` : ""}
      </div>`;
      const gridHtml = langHtml + statusHtml;

      host.insertAdjacentHTML(
        "beforeend",
        `<div class="src-focus" data-kind="${kind}">
          <header class="src-focus-head">
            <button type="button" class="src-back" data-back>全部来源</button>
            <h2>${U.esc(sourceName)}</h2>
            <p class="src-cluster-mix">${c.total}　${mixHtml(U, c, true)}</p>
          </header>
          <div class="src-focus-body">
            <div class="src-focus-grid">${gridHtml}</div>
            <aside class="src-inspect" data-inspect>${inspectHtml(state.item)}</aside>
          </div>
        </div>`
      );
    }

    function render() {
      root.innerHTML = "";
      root.classList.add("src-viz-root");
      if (state.focus) {
        renderHead(root);
        renderFocus(root, state.focus);
      } else {
        renderHead(root);
        renderBoard(root);
      }
      requestAnimationFrame(() => paintAll(root));
    }

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => paintAll(root), 60);
    });
    ro.observe(root);

    root.addEventListener("click", (e) => {
      const back = e.target.closest("[data-back]");
      if (back) {
        state.focus = null;
        state.item = null;
        render();
        return;
      }
      const canvas = e.target.closest("canvas[data-grid]");
      if (canvas && canvas.closest(".src-focus")) {
        const it = hitCell(canvas, e);
        if (it) {
          state.item = it;
          const pane = root.querySelector("[data-inspect]");
          if (pane) pane.innerHTML = inspectHtml(it);
          root.querySelectorAll("canvas[data-grid]").forEach((cv) => cv.classList.remove("is-picked"));
          canvas.classList.add("is-picked");
        }
        return;
      }
      const cluster = e.target.closest("[data-source]");
      if (cluster && !state.focus) {
        state.focus = cluster.getAttribute("data-source");
        state.item = null;
        render();
      }
    });

    global.addEventListener("keydown", function onKey(ev) {
      if (ev.key !== "Escape") return;
      if (state.item) {
        ev.preventDefault();
        state.item = null;
        const pane = root.querySelector("[data-inspect]");
        if (pane) pane.innerHTML = inspectHtml(null);
        return;
      }
      if (state.focus) {
        ev.preventDefault();
        ev.stopPropagation();
        state.focus = null;
        render();
      }
    }, true);

    render();

    if (route && route !== "sources/review") {
      /* Old single-channel routes still open the same three-channel visual. */
    }
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["sources/review"] = () => init("sources/review");
  global.VfxPages["vfx/sources/official"] = () => init("vfx/sources/official");
  global.VfxPages["vfx/sources/oss"] = () => init("vfx/sources/oss");
  global.VfxPages["vfx/sources/x"] = () => init("vfx/sources/x");
})(window);
