/* 设计研究 · 来源。一屏三层：渠道 → 具体来源 → 一条一格。
 * 颜色只表示真实状态：已吸收 / 待审 / 不吸收。候审 30 另行着色，不画进 124。
 * 核心 / 站点清单 / X 分库存立账，不加总成一个来源库总数。
 * 已吸收 53 ≠ 视效库 124。格子亮了只说明这条来源记录已吸收。 */
(function (global) {
  "use strict";

  const STATUS_CN = { absorbed: "已吸收", rejected: "不吸收", pending: "待审" };
  const STATUS_ORDER = { absorbed: 0, rejected: 1, pending: 2 };
  const QUEUE_HREF = "#/vfx/preview";
  const SOURCE_AUTHORITY = [
    { id: "producer", name: "出品方", weight: 30, hint: "大厂官方或该领域公认标准接近满分。" },
    { id: "scale", name: "维护与规模", weight: 25, hint: "以已核实的星标与最近推送为准。" },
    { id: "citation", name: "被引用", weight: 20, hint: "官方互链或行业默认入口最高。" },
    { id: "docs", name: "文档与可核验", weight: 15, hint: "官网、文档、示例、许可、定价能否当场核对。" },
    { id: "license", name: "许可与获取", weight: 10, hint: "许可证和获取方式是否清楚。" }
  ];
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
    const pad = opts.pad || 0;
    const width = Math.max(1, canvas.clientWidth || opts.width || 120);
    const boxH = canvas.clientHeight || opts.height || 0;
    const n = Math.max(items.length, 1);
    let cell, cols, rows, gap, height, originX, originY;

    if (opts.fillBox && boxH > 2) {
      height = boxH;
      const minCell = opts.minCell || 3;
      const maxCell = opts.maxCell || 36;
      cell = maxCell;
      while (cell > minCell) {
        gap = Math.min(2, Math.max(1, Math.floor(cell / 6)));
        cols = Math.max(1, Math.floor((width - pad * 2) / cell));
        rows = Math.ceil(n / cols);
        if (rows * cell + pad * 2 <= height + 0.01) break;
        cell -= 0.5;
      }
      cell = Math.max(minCell, cell);
      gap = Math.min(2, Math.max(1, Math.floor(cell / 6)));
      cols = Math.max(1, Math.floor((width - pad * 2) / cell));
      rows = Math.ceil(n / cols);
      const gridW = cols * cell;
      const gridH = rows * cell;
      originX = pad + Math.max(0, (width - pad * 2 - gridW) / 2);
      originY = pad + Math.max(0, (height - pad * 2 - gridH) / 2);
      // 铺满时不把画布高度改回内容高度，避免把列面重新漏空。
    } else {
      cell = Math.max(2, opts.cell || 8);
      gap = opts.gap != null ? opts.gap : Math.min(2, Math.max(1, Math.floor(cell / 5)));
      const maxCols = Math.max(1, Math.floor((width - pad * 2) / cell));
      const sq = Math.ceil(Math.sqrt(n));
      cols = Math.min(maxCols, Math.max(1, opts.fillWidth ? maxCols : (opts.cols || sq)));
      rows = Math.max(1, Math.ceil(n / cols));
      height = rows * cell + pad * 2;
      originX = pad;
      originY = pad;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
    }

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const size = Math.max(1, cell - gap);
    items.forEach((it, i) => {
      const x = originX + (i % cols) * cell;
      const y = originY + Math.floor(i / cols) * cell;
      ctx.fillStyle = statusFill(it.status);
      ctx.fillRect(x, y, size, size);
    });
    canvas.__grid = { items, cols, rows, cell, pad, size, width, height, originX, originY };
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
    const originX = g.originX != null ? g.originX : g.pad;
    const originY = g.originY != null ? g.originY : g.pad;
    const col = Math.floor((x * scaleX - originX) / g.cell);
    const row = Math.floor((y * scaleY - originY) / g.cell);
    if (col < 0 || row < 0 || col >= g.cols || row >= g.rows) return null;
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
          <p class="kicker">来源</p>
          <div class="src-viz-legend">
            <span><i class="src-swatch is-absorbed"></i>已吸收</span>
            <span><i class="src-swatch is-rejected"></i>不吸收</span>
            <span><i class="src-swatch is-pending"></i>待审</span>
            <span class="src-legend-note">亮格 = 该条来源记录已吸收，不是视效库的 124</span>
            <a class="src-queue" href="${QUEUE_HREF}">
              <i class="src-swatch is-queue"></i>候审 30 · 不计入 124
            </a>
            <a class="src-queue" href="#/vfx/review">评判</a>
          </div>
        </header>
      `;
    }

    function clusterBlock(name, group, fill) {
      const items = sortItems(itemsOf(name));
      const c = countsOf(items);
      if (!c.total) return "";
      const kind = kindOf(name, group);
      return `<button type="button" class="src-cluster is-${kind}${fill ? " is-fill" : ""}" data-kind="${kind}" data-source="${U.esc(name)}" aria-label="${U.esc(name)}，${c.total} 条，打开来源">
        <span class="src-cluster-head">
          <span class="src-cluster-name">${U.esc(name)}</span>
          <b>${c.total}</b>
        </span>
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

    function officialTotal() {
      return channelItems(CHANNELS[0]).length;
    }

    function renderBoard(host) {
      const officialN = officialTotal();
      const ossCoreN = itemsOf("ThreeUI").length + itemsOf("开源产品").length;
      const siteN = siteC.total;
      const xN = xC.total;

      const officialNames = CHANNELS[0].groups.flatMap((g) => g.sources)
        .concat(leftoverSources(CHANNELS[0]))
        .filter((n) => itemsOf(n).length);
      const officialTiles = officialNames.map((n) => clusterBlock(n, { kind: "core" }, true)).join("");

      const ossCoreTiles = ["ThreeUI", "开源产品"]
        .filter((n) => itemsOf(n).length)
        .map((n) => clusterBlock(n, { kind: "core" }, true))
        .join("");
      const siteNames = CHANNELS[1].groups.find((g) => g.kind === "sites").sources
        .concat(leftoverSources(CHANNELS[1]))
        .filter((n) => itemsOf(n).length);
      const siteTiles = siteNames.map((n) => clusterBlock(n, { kind: "sites" }, true)).join("");

      const xNames = CHANNELS[2].groups.flatMap((g) => g.sources)
        .concat(leftoverSources(CHANNELS[2]))
        .filter((n) => itemsOf(n).length);
      const xTiles = xNames.map((n) => {
        const share = Math.max(8, Math.round((itemsOf(n).length / Math.max(xN, 1)) * 100));
        return `<div class="src-x-band" style="--share:${share}">${clusterBlock(n, { kind: "x" }, true)}</div>`;
      }).join("");

      host.insertAdjacentHTML(
        "beforeend",
        `<div class="src-board">
          <section class="src-channel" data-channel="official">
            <header class="src-channel-head"><h2>官方渠道</h2></header>
            <div class="src-hero">
              <b>${officialN}</b>
              <span>核心清单中的官方渠道</span>
            </div>
            <div class="src-field src-field-official">${officialTiles}</div>
          </section>
          <section class="src-channel" data-channel="oss">
            <header class="src-channel-head"><h2>开源与组件库</h2></header>
            <div class="src-hero src-hero-pair">
              <div class="src-hero-num">
                <b>${ossCoreN}</b>
                <span>核心清单</span>
              </div>
              <div class="src-hero-num">
                <b>${siteN}</b>
                <span>站点清单</span>
              </div>
            </div>
            <div class="src-field src-field-oss">
              <div class="src-oss-core">${ossCoreTiles}</div>
              <div class="src-oss-sites">${siteTiles}</div>
            </div>
          </section>
          <section class="src-channel" data-channel="x">
            <header class="src-channel-head"><h2>X</h2></header>
            <div class="src-hero">
              <b>${xN}</b>
              <span>发现渠道</span>
            </div>
            <div class="src-field src-field-x">${xTiles}</div>
          </section>
        </div>`
      );
    }

    function paintAll(scope) {
      (scope || root).querySelectorAll("canvas[data-grid]").forEach((cv) => {
        const name = cv.getAttribute("data-grid");
        const cluster = cv.closest("[data-kind]");
        const kind = cluster ? cluster.getAttribute("data-kind") : "core";
        const mode = cv.closest(".book-modal, .src-focus") ? "focus" : "view";
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
        if (mode === "focus") {
          paintGrid(cv, items, { cell: cellSize(kind, mode), fillWidth: true });
          return;
        }
        const maxCell = kind === "core" ? 28 : kind === "x" ? 14 : 8;
        const minCell = kind === "core" ? 6 : kind === "x" ? 5 : 3;
        paintGrid(cv, items, { fillBox: true, maxCell, minCell });
      });
    }

    function languageOf(it) {
      return (it.map && it.map.row) || "未分组";
    }

    function bindShotFallback(scope) {
      (scope || document).querySelectorAll(".book-modal-shot img, .src-record-shot img").forEach((img) => {
        img.addEventListener("error", () => {
          const box = img.closest(".book-modal-shot, .src-record-shot");
          if (!box) return;
          box.classList.add("is-missing");
          img.remove();
          if (!box.querySelector("span")) {
            box.insertAdjacentHTML("beforeend", "<span>暂无现场截图</span>");
          }
        });
      });
    }

    function lookupAuthority(sourceName) {
      const pack = window.VFX_AUTHORITY;
      if (!pack || !sourceName) return null;
      const aliases = pack.aliases || {};
      const key = aliases[sourceName] || sourceName;
      const items = pack.items || [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].name === key) return items[i];
      }
      return null;
    }

    function starMarks(label) {
      const n = ({ "五星": 5, "四星": 4, "三星": 3, "两星": 2, "一星": 1 })[label] || 0;
      return "★".repeat(n) + "☆".repeat(Math.max(0, 5 - n));
    }

    function authorityHtml(sourceName) {
      const scored = lookupAuthority(sourceName);
      const who = sourceName ? U.esc(sourceName) : "该来源";
      const pack = window.VFX_AUTHORITY || {};
      const rows = SOURCE_AUTHORITY.map((a) => {
        const score = scored ? scored[a.id] : null;
        const scoreHtml = score == null ? `<b>${a.weight}%</b>` : `<b class="auth-factor-score">${score}</b>`;
        const nameHtml = scored
          ? `<span>${U.esc(a.name)}<small>${a.weight}%</small></span>`
          : `<span>${U.esc(a.name)}</span>`;
        const width = scored ? Math.max(0, Math.min(100, (Number(score) / 5) * 100)) : a.weight;
        return `
        <li class="auth-row">
          <div class="auth-row-head">
            ${nameHtml}
            ${scoreHtml}
          </div>
          <i class="auth-track"><i style="width:${width}%"></i></i>
        </li>`;
      }).join("");
      const scoreBlock = scored ? `
        <div class="auth-score">
          <p class="auth-stars"><span class="auth-star-marks">${starMarks(scored.stars)}</span><b>${scored.total}</b> ${U.esc(scored.stars)}</p>
          <p class="auth-basis">依据：${U.esc(scored.basis || "")}</p>
        </div>` : "";
      const obs = pack.observedAt
        ? `<p class="auth-obs">观测时点：${U.esc(pack.observedAt)}（${U.esc(pack.observedZone || "America/New_York")}）。工作表已有分数，未当场重跑。</p>`
        : "";
      const status = scored
        ? obs
        : `<p class="auth-status"><strong>${who}</strong> 尚未按准则打分。</p>${obs ? obs.replace("工作表已有分数，未当场重跑。", "有分的来源才展示星级，不把厂方桶或单条推文算成已打分。") : ""}`;
      return `<section class="auth-panel is-compact${scored ? " is-scored" : ""}" aria-label="权威评分体系">
        <p class="auth-kicker">权威性</p>
        <h3>值不值得让这个来源进入输入池</h3>
        <p class="auth-lead">对来源的加权初评，不是单条推文或单页的星级，也不能代替可信度标注。权威性不是下一站的页面形态初筛。</p>
        ${scoreBlock}
        <ol class="auth-weights is-row${scored ? " is-scored" : ""}">${rows}</ol>
        <p class="auth-method">满分 5 星。先加权得到 0–5 的总分（一位小数），再换成星级：4.5–5.0 五星，3.5–4.4 四星，2.5–3.4 三星，1.5–2.4 两星，0–1.4 一星。有分时同时展示星级、总分、一句依据和五项分数。不编造星标或价格。</p>
        ${status}
      </section>`;
    }

    function kindOfName(sourceName) {
      if (sourceName === "ThreeUI" || sourceName === "开源产品" || CHANNELS[0].groups.some((g) => g.sources.includes(sourceName))) {
        return "core";
      }
      if (String(sourceName).indexOf("推文") >= 0 || sourceName === "X 收获站点") return "x";
      return "sites";
    }

    function recordMetaHtml(it) {
      const bits = [];
      bits.push(`<span class="src-st is-${it.status}">${STATUS_CN[it.status] || "待审"}</span>`);
      if (it.channel) bits.push(U.esc(it.channel));
      if (it.studio) bits.push(U.esc(it.studio));
      if (it.author_name && it.author_name !== it.studio) bits.push(U.esc(it.author_name));
      if (it.date) bits.push(U.esc(it.date));
      if (it.tag) bits.push(U.esc(it.tag));
      if (it.status === "absorbed" && it.map && it.map.row) bits.push(U.esc(it.map.row));
      if (it.status === "absorbed" && it.map && it.map.scale) bits.push(U.esc(it.map.scale));
      if (it.status === "absorbed" && it.map && it.map.scenes && it.map.scenes.length) {
        bits.push(U.esc(it.map.scenes.join("、")));
      }
      return bits.join(" · ");
    }

    function recordLinksHtml(it) {
      const links = [];
      if (it.url) {
        links.push(`<a class="src-go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`);
      }
      if (it.external_url && it.external_url !== it.url) {
        links.push(`<a class="src-go" href="${U.esc(it.external_url)}" target="_blank" rel="noopener noreferrer">相关站点 ↗</a>`);
      }
      return links.length ? `<div class="src-inspect-links">${links.join("")}</div>` : "";
    }

    function recordNotesHtml(it) {
      const parts = [];
      if (it.source_detail) {
        parts.push(`<p class="src-inspect-detail">来路：${U.esc(it.source_detail)}</p>`);
      }
      if (it.excerpt) {
        parts.push(`<p class="src-inspect-excerpt">${U.esc(it.excerpt)}</p>`);
      }
      if (it.note) {
        const label = it.status === "rejected" ? "不吸收原因：" : "";
        parts.push(`<p class="src-inspect-note">${label}${U.esc(it.note)}</p>`);
      }
      if (it.inherited) {
        parts.push(`<p class="src-inspect-inherited">沿用已有判断${it.inherited_from ? "（" + U.esc(it.inherited_from) + "）" : ""}。</p>`);
      }
      return parts.join("");
    }

    function shotHtml(it, extraClass) {
      const img = U.thumbSrc(it, true);
      const cls = extraClass ? " " + extraClass : "";
      if (img) {
        return `<div class="book-modal-shot${cls}" data-shot><span>暂无现场截图</span><img src="${U.esc(img)}" alt="${U.esc(it.name || "")}"></div>`;
      }
      return `<div class="book-modal-shot is-missing${cls}" data-shot><span>暂无现场截图</span></div>`;
    }

    function recordBodyHtml(it) {
      return `
        <div class="src-record">
          ${shotHtml(it)}
          <div class="src-record-main">
            <h3 class="src-record-name">${U.esc(it.name)}</h3>
            <p class="src-inspect-meta">${recordMetaHtml(it)}</p>
            ${recordLinksHtml(it)}
            ${recordNotesHtml(it)}
            <p class="auth-status is-record">本条尚未按准则打分。权威性评估的是来源是否进入输入池，不给单条编造星级。</p>
          </div>
        </div>`;
    }

    function recordCardHtml(it) {
      const img = U.thumbSrc(it, true);
      const shot = img
        ? `<div class="src-record-shot"><span>暂无现场截图</span><img src="${U.esc(img)}" alt=""></div>`
        : `<div class="src-record-shot is-missing"><span>暂无现场截图</span></div>`;
      return `<button type="button" class="src-record-card" data-record="${U.esc(it.id)}" aria-label="${U.esc(it.name)}，${STATUS_CN[it.status] || "待审"}">
        ${shot}
        <span class="src-st is-${it.status}">${STATUS_CN[it.status] || "待审"}</span>
        <span class="src-record-card-name">${U.esc(it.name)}</span>
      </button>`;
    }

    function clusterFieldHtml(sourceName) {
      const items = itemsOf(sourceName);
      const c = countsOf(items);
      const kind = kindOfName(sourceName);
      if (items.length <= 12) {
        return `<div class="src-record-cards" data-kind="${kind}">${sortItems(items).map(recordCardHtml).join("")}</div>`;
      }
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
        langHtml = `<div class="src-langs">` + langNames.map((lang) => {
          const n = byLang.get(lang).length;
          return `<div class="src-band">
            <p class="src-band-name">${U.esc(lang)}<b>${n}</b></p>
            <canvas class="src-grid" data-grid="${U.esc(sourceName)}" data-band="absorbed" data-lang="${U.esc(lang)}"></canvas>
          </div>`;
        }).join("") + `</div>`;
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
      return `<div class="src-cluster-field" data-kind="${kind}">${langHtml}${statusHtml}</div>`;
    }

    function bindClusterField(panel, sourceName) {
      paintAll(panel);
      bindShotFallback(panel);
      panel.querySelectorAll("canvas[data-grid]").forEach((cv) => {
        cv.style.cursor = "pointer";
        cv.addEventListener("click", (ev) => {
          ev.preventDefault();
          ev.stopPropagation();
          const item = hitCell(cv, ev);
          if (item) openRecordModal(item);
        });
      });
      panel.querySelectorAll("[data-record]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = btn.getAttribute("data-record");
          const item = itemsOf(sourceName).find((it) => it.id === id);
          if (item) openRecordModal(item);
        });
      });
    }

    function openClusterModal(sourceName) {
      const Modal = global.VfxModal;
      if (!Modal) return;
      const items = itemsOf(sourceName);
      const c = countsOf(items);
      const html = `
        <div class="src-l2" data-qa="source-l2">
          <p class="src-l2-mix">${c.total}　${mixHtml(U, c, true)}</p>
          <p class="src-l2-legend">亮格表示该条来源记录已吸收，不是视效库的 124，也不是研究逻辑里的「点亮」。</p>
          ${authorityHtml(sourceName)}
          ${clusterFieldHtml(sourceName)}
        </div>`;
      Modal.open({
        kicker: "来源",
        title: U.esc(sourceName),
        label: sourceName,
        className: "is-source-l2",
        html,
        onMount: (panel) => bindClusterField(panel, sourceName)
      });
    }

    function openRecordModal(it) {
      const Modal = global.VfxModal;
      if (!Modal || !it) return;
      Modal.open({
        kicker: "来源记录",
        title: U.esc(it.name),
        label: it.name,
        className: "is-source-l3",
        html: `<div data-qa="source-l3">${recordBodyHtml(it)}</div>`,
        onMount: (panel) => bindShotFallback(panel)
      });
    }

    function onBoardClick(event) {
      const cluster = event.target.closest(".src-cluster");
      if (!cluster || !root.contains(cluster)) return;
      const name = cluster.getAttribute("data-source");
      if (!name) return;
      const kind = cluster.getAttribute("data-kind") || "core";
      const canvas = event.target.closest("canvas[data-grid]");
      if (canvas && (kind === "sites" || kind === "x")) {
        const item = hitCell(canvas, event);
        if (item) {
          event.preventDefault();
          openRecordModal(item);
          return;
        }
      }
      event.preventDefault();
      openClusterModal(name);
    }

    function render() {
      root.innerHTML = "";
      root.classList.add("src-viz-root");
      renderHead(root);
      renderBoard(root);
      requestAnimationFrame(() => paintAll(root));
    }

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => paintAll(root), 60);
    });
    ro.observe(root);

    if (global.VfxModal) global.VfxModal.closeAll();
    root.addEventListener("click", onBoardClick);
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
