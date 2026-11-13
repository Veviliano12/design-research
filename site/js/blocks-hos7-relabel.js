/* 设计研究 · HOS7 重标
 * 从 window.HOS7_RELABEL 渲染已核对的 69 条标注提案。不改写数字，不建议新的 N。
 * 脚本可能被壳缓存，故把初始化挂到 VfxPages；独立打开本页时自行初始化。
 */
(function (global) {
  "use strict";

  const ROUTE = "blocks/hos7-relabel";
  const ROOT_SEL = "[data-hos7-relabel-root]";
  const SCENE_ORDER = [
    "mobile-shell",
    "settings",
    "cloud-services",
    "first-launch",
    "downloads",
    "profile",
    "movies",
    "music",
    "games",
    "books",
    "mine",
    "search",
    "travel"
  ];
  const INSTALL_LABEL = {
    baked: "烘焙",
    empty_feed: "空安装喂数据"
  };
  const FIELD_PATHS = [
    "id",
    "official_name",
    "kind",
    "demo_only",
    "grain",
    "card_unit",
    "scene",
    "routeable",
    "data_contract",
    "data_contract.install_mode",
    "data_contract.required_props",
    "data_contract.optional_props",
    "data_contract.schema",
    "data_contract.children_take_required_data"
  ];
  const DC_STATUS = {
    install_mode: "install_mode_status",
    required_props: "required_props_status",
    optional_props: "optional_props_status",
    schema: "schema_status",
    children_take_required_data: "children_take_required_data_status"
  };

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  function code(s) {
    return `<code>${esc(s)}</code>`;
  }

  function codes(list) {
    return (list || []).map((s) => code(s)).join(" ");
  }

  function field(row, key) {
    const f = row && row[key];
    if (f && typeof f === "object" && "value" in f) return f;
    return { value: f, status: null };
  }

  function idOf(row) {
    return field(row, "id").value;
  }

  function fieldStatus(row, path) {
    if (path === "data_contract") {
      return row.data_contract && row.data_contract.status;
    }
    if (path.startsWith("data_contract.")) {
      const sub = path.slice("data_contract.".length);
      const key = DC_STATUS[sub];
      return row.data_contract ? row.data_contract[key] : undefined;
    }
    const f = row[path];
    return f && typeof f === "object" ? f.status : undefined;
  }

  function unnamedRequired(row) {
    return !!(row.data_contract && row.data_contract.required_props_status === "missing");
  }

  let state = {
    filters: {
      grain: "all",
      kind: "all",
      scene: "all",
      card_unit: "all",
      routeable: "all",
      gap: "all"
    },
    open: Object.create(null),
    observer: null,
    root: null,
    audit: null
  };

  function teardown() {
    if (state.observer) {
      state.observer.disconnect();
      state.observer = null;
    }
    const root = state.root;
    if (root) delete root.dataset.bkRlReady;
    state.root = null;
    state.open = Object.create(null);
    state.audit = null;
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
      document.querySelector(".doc")
    ];
    for (const el of candidates) {
      if (isScrollable(el)) return el;
    }
    return document.scrollingElement || document.documentElement;
  }

  function compute(rows) {
    const status = { official: 0, inferred: 0, missing: 0 };
    const byField = {};
    const grain = { page: 0, region: 0 };
    const kind = { component: 0, demo: 0 };
    let routeable = 0;
    const sceneStatus = { official: 0, inferred: 0, missing: 0 };
    const sceneValue = Object.create(null);
    const card = { officialFalse: 0, inferredTrue: 0, missing: 0 };
    const cardInferredIds = [];
    const unnamedIds = [];
    let schemaMissing = 0;

    rows.forEach((row) => {
      FIELD_PATHS.forEach((path) => {
        const st = fieldStatus(row, path);
        if (st) {
          status[st] = (status[st] || 0) + 1;
          byField[path] = byField[path] || {};
          byField[path][st] = (byField[path][st] || 0) + 1;
        }
      });
      const g = field(row, "grain").value;
      if (g) grain[g] = (grain[g] || 0) + 1;
      const k = field(row, "kind").value;
      if (k) kind[k] = (kind[k] || 0) + 1;
      if (field(row, "routeable").value === true) routeable += 1;
      const sc = field(row, "scene");
      if (sc.status) sceneStatus[sc.status] = (sceneStatus[sc.status] || 0) + 1;
      const sv = sc.value == null ? "" : String(sc.value);
      if (sv) sceneValue[sv] = (sceneValue[sv] || 0) + 1;
      const cu = field(row, "card_unit");
      if (cu.status === "missing") card.missing += 1;
      else if (cu.status === "inferred" && cu.value === true) {
        card.inferredTrue += 1;
        cardInferredIds.push(idOf(row));
      } else if (cu.status === "official" && cu.value === false) {
        card.officialFalse += 1;
      }
      if (row.data_contract && row.data_contract.schema_status === "missing") schemaMissing += 1;
      if (unnamedRequired(row)) unnamedIds.push(idOf(row));
    });

    return {
      total: rows.length,
      status,
      byField,
      grain,
      kind,
      routeable,
      sceneStatus,
      sceneValue,
      card,
      cardInferredIds,
      unnamedIds,
      schemaMissing
    };
  }

  function mismatches(data, counted) {
    const issues = [];
    const v = (data.meta && data.meta.verified_official_counts) || {};
    const f = (data.meta && data.meta.field_status_counts) || {};
    const by = f.by_status || {};
    const check = (label, got, want) => {
      if (got !== want) issues.push(`${label}：点算 ${got}，meta ${want}`);
    };
    check("总条数", counted.total, v.total_blocks);
    check("page-type", counted.grain.page, v.page_type);
    check("region", counted.grain.region, v.region);
    check("component", counted.kind.component, v.kind_component);
    check("demo", counted.kind.demo, v.kind_demo);
    check("可路由", counted.routeable, v.routeable);
    check("字段 official", counted.status.official, by.official);
    check("字段 inferred", counted.status.inferred, by.inferred);
    check("字段 missing", counted.status.missing, by.missing);
    check("scene official", counted.sceneStatus.official, f.scene_official);
    check("scene inferred", counted.sceneStatus.inferred, f.scene_inferred);
    check("scene missing", counted.sceneStatus.missing, f.scene_missing);
    check("card_unit 推断是", counted.card.inferredTrue, f.card_unit_inferred_true);
    const cu = (f.by_field && f.by_field.card_unit) || {};
    check("card_unit official", counted.card.officialFalse, cu.official);
    check("card_unit missing", counted.card.missing, cu.missing);
    const schema = (f.by_field && f.by_field["data_contract.schema"]) || {};
    check("schema missing", counted.schemaMissing, schema.missing);
    const req = (f.by_field && f.by_field["data_contract.required_props"]) || {};
    check("未点名必填", counted.unnamedIds.length, req.missing);
    if (counted.status.official + counted.status.inferred + counted.status.missing !== counted.total * FIELD_PATHS.length) {
      issues.push(
        `字段实例合计 ${counted.status.official + counted.status.inferred + counted.status.missing}，不等于 ${counted.total}×${FIELD_PATHS.length}`
      );
    }
    const discs = (data.meta && data.meta.count_discrepancies) || [];
    const values = discs.map((d) => d && d.value);
    if (!values.includes(63)) issues.push("meta.count_discrepancies 缺少 63");
    if (!values.includes(62)) issues.push("meta.count_discrepancies 缺少 62");
    return issues;
  }

  function init() {
    const root = document.querySelector(ROOT_SEL);
    if (!root) return;
    if (root.dataset.bkRlReady === "1") return;
    teardown();
    root.dataset.bkRlReady = "1";
    state.root = root;
    state.filters = {
      grain: "all",
      kind: "all",
      scene: "all",
      card_unit: "all",
      routeable: "all",
      gap: "all"
    };
    state.open = Object.create(null);

    const data = global.HOS7_RELABEL;
    if (!data || !Array.isArray(data.rows)) {
      root.insertAdjacentHTML(
        "afterbegin",
        '<p class="bk-warn">没有载入到重标草案。请用本地静态服务器打开本平台，并确认 data/blocks/hos7-relabel.js 已装载。</p>'
      );
      return;
    }

    const counted = compute(data.rows);
    const issues = mismatches(data, counted);
    state.audit = { counted, issues, ok: issues.length === 0 };

    if (!state.audit.ok) {
      renderMismatch(root, issues);
    } else {
      renderBoard(root, data, counted);
      renderDiscrepancy(root, data);
      renderLegend(root);
      renderTensions(root, counted);
    }
    renderFilters(root, data, counted);
    renderTable(root, data);
    bindNav(root);
    bindUI(root, data);
  }

  function renderMismatch(root, issues) {
    const board = root.querySelector("[data-bk-rl-board]");
    board.innerHTML = `<p class="bk-warn"><strong>点算与草案 meta 不一致，计数板未渲染，数字不予改写。</strong> ${esc(issues.join("；"))}</p>`;
    const disc = root.querySelector("[data-bk-rl-discrepancy]");
    if (disc) disc.innerHTML = "";
    const legend = root.querySelector("[data-bk-rl-legend]");
    if (legend) legend.textContent = "";
    const tensions = root.querySelector("[data-bk-rl-tensions]");
    if (tensions) {
      tensions.innerHTML = `<p class="bk-warn">混粒度张力未渲染，以免在计数不一致时写出另一套数字。</p>`;
    }
  }

  function renderBoard(root, data, counted) {
    const host = root.querySelector("[data-bk-rl-board]");
    const v = data.meta.verified_official_counts;
    const f = data.meta.field_status_counts;
    const by = f.by_status;
    const unnamed = counted.unnamedIds.map((id) => code(id)).join(" ");
    const ph = counted.card.officialFalse === 1 ? code("profile-header") : "";
    host.innerHTML = `
      <article class="bk-rl-stat">
        <div class="k">官方 blocks</div>
        <div class="bk-num">${esc(v.total_blocks)}</div>
        <span class="bk-unit">${esc(v.page_type)} page-type + ${esc(v.region)} region</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">kind</div>
        <div class="pair">
          <span class="bk-num">${esc(v.kind_component)}</span><span class="lab">component</span>
          <span class="bk-num">${esc(v.kind_demo)}</span><span class="lab">demo</span>
        </div>
        <span class="bk-unit">16 个 demo 中，14 个是 page-type，2 个是 region</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">可路由</div>
        <div class="bk-num">${esc(v.routeable)}</div>
        <span class="bk-unit">仅 14 个 page-type，可被 <code>ds.py route</code> 选中</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">字段实例</div>
        <div class="pair">
          <span class="bk-num" data-st="official">${esc(by.official)}</span><span class="lab">official</span>
          <span class="bk-num" data-st="inferred">${esc(by.inferred)}</span><span class="lab">inferred</span>
          <span class="bk-num" data-st="missing">${esc(by.missing)}</span><span class="lab">missing</span>
        </div>
        <span class="bk-unit">69 × 14 = 966</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">scene</div>
        <div class="pair">
          <span class="bk-num" data-st="official">${esc(f.scene_official)}</span><span class="lab">official</span>
          <span class="bk-num" data-st="inferred">${esc(f.scene_inferred)}</span><span class="lab">inferred</span>
          <span class="bk-num" data-st="missing">${esc(f.scene_missing)}</span><span class="lab">未在官方文档出现</span>
        </div>
      </article>
      <article class="bk-rl-stat">
        <div class="k">card_unit</div>
        <div class="pair">
          <span class="bk-num" data-st="official">${esc(f.by_field.card_unit.official)}</span><span class="lab">官方「否」</span>
          <span class="bk-num" data-st="inferred">${esc(f.card_unit_inferred_true)}</span><span class="lab">推断「是」</span>
          <span class="bk-num" data-st="missing">${esc(f.by_field.card_unit.missing)}</span><span class="lab">未标注</span>
        </div>
        <span class="bk-unit">官方「否」为 ${ph}。不把 card 写成官方 grain。</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">schema</div>
        <div class="bk-num" data-st="missing">${esc(f.by_field["data_contract.schema"].missing)}</div>
        <span class="bk-unit">全部 69 条均为 missing / null，不从 TypeScript 发明类型</span>
      </article>
      <article class="bk-rl-stat">
        <div class="k">未点名必填 props</div>
        <div class="bk-num" data-st="missing">${esc(f.by_field["data_contract.required_props"].missing)}</div>
        <span class="bk-unit">6 个 component 的必填标识符未在官方描述中点名</span>
        <div class="ids">${unnamed}</div>
      </article>`;
  }

  function renderDiscrepancy(root, data) {
    const host = root.querySelector("[data-bk-rl-discrepancy]");
    const discs = data.meta.count_discrepancies || [];
    const items = discs
      .map((d) => {
        const where = (d.where || []).map((w) => esc(w)).join("；");
        return `<strong>${esc(d.value)}</strong>：${where} ${esc(d.note || "")}`;
      })
      .join(" ");
    host.innerHTML = `<p class="bk-warn"><strong>63 与 62 须与 69 并列，不能改写成 69。</strong> ${items}</p>`;
  }

  function renderLegend(root) {
    const host = root.querySelector("[data-bk-rl-legend]");
    host.innerHTML =
      "图例：实线、默认墨色为官方字段；虚线标签并写「推断」的不是官方事实；淡色或破折号表示未在官方文档出现。";
  }

  function renderTensions(root, counted) {
    const host = root.querySelector("[data-bk-rl-tensions]");
    const cards = counted.cardInferredIds.map((id) => code(id)).join(" ");
    const unnamed = counted.unnamedIds.map((id) => code(id)).join(" ");
    host.innerHTML = `
      <article class="bk-rl-tn">
        <h4>14 个可路由 page-type 全部是烘焙 demo</h4>
        <p>官方 kind 列为 demo，且都 “carry routing rules”，是 <code>ds.py route</code> 当前选择的入口。先标 <code>demo_only</code>，不把它们当作 data-driven 页面。</p>
      </article>
      <article class="bk-rl-tn">
        <h4><code>services-setting</code> 是可路由的半模态</h4>
        <p>它是 page-type，可被 route 选中，描述却是 half-modal，与 “Each is a complete screen.” 的字面不完全同构。</p>
      </article>
      <article class="bk-rl-tn">
        <h4>Region 目录里有整页形态，却不可路由</h4>
        <p>两个 region demo（<code>app-shell-starter</code>、<code>downloads-manager</code>）以及 component <code>search-results</code>（“The second search page”）都是整页或整屏形态，但都不可路由。</p>
      </article>
      <article class="bk-rl-tn">
        <h4>9 个推断的卡片 / 单元格单元</h4>
        <p>官方目录没有 card 层，本草案只用 <code>card_unit</code> 旗标，且一律标为推断，不把 card 写成官方 grain。</p>
        <div class="bk-rl-ids">${cards}</div>
      </article>
      <article class="bk-rl-tn">
        <h4>官方 grain 只有 page 与 region</h4>
        <p><code>profile-header</code> 官方写明 “not a card”，故为官方「否」。其余未点名的条目不推断为卡片单元。</p>
      </article>
      <article class="bk-rl-tn">
        <h4>6 个 component 未点名必填 props</h4>
        <p>官方 kind 为 component，按通则应安装为空并喂数据，但描述未列出必填标识符。不把 docs 示例里的属性名发明成必填清单。</p>
        <div class="bk-rl-ids">${unnamed}</div>
      </article>
      <article class="bk-rl-tn">
        <h4>全部 69 条 schema 均为 missing</h4>
        <p>官方文档没有可独立执行的 props schema。本草案全部记为 <code>null</code>，不从 TypeScript 源码发明类型或完整形状。</p>
      </article>`;
  }

  function sceneKeys(counted) {
    const seen = Object.keys(counted.sceneValue);
    const ordered = SCENE_ORDER.filter((s) => seen.includes(s));
    seen.sort().forEach((s) => {
      if (!ordered.includes(s)) ordered.push(s);
    });
    return ordered;
  }

  function chip(group, id, label, n, on) {
    return `<button type="button" class="bk-chip press${on ? " is-on" : ""}" data-fg="${esc(group)}" data-fv="${esc(id)}" aria-pressed="${on ? "true" : "false"}">${esc(label)}<span class="n">${esc(n)}</span></button>`;
  }

  function renderFilters(root, data, counted) {
    const host = root.querySelector("[data-bk-rl-filters]");
    const f = state.filters;
    const scenes = sceneKeys(counted)
      .map((s) => chip("scene", s, s, counted.sceneValue[s], f.scene === s))
      .join("");
    host.innerHTML = `
      <div class="bk-rl-fg"><span class="lab">粒度</span>${
        chip("grain", "all", "全部", counted.total, f.grain === "all") +
        chip("grain", "page", "page", counted.grain.page, f.grain === "page") +
        chip("grain", "region", "region", counted.grain.region, f.grain === "region")
      }</div>
      <div class="bk-rl-fg"><span class="lab">类型</span>${
        chip("kind", "all", "全部", counted.total, f.kind === "all") +
        chip("kind", "component", "component", counted.kind.component, f.kind === "component") +
        chip("kind", "demo", "demo", counted.kind.demo, f.kind === "demo")
      }</div>
      <div class="bk-rl-fg"><span class="lab">场景</span>${
        chip("scene", "all", "全部", counted.total, f.scene === "all") +
        scenes +
        chip("scene", "missing", "未在官方文档出现", counted.sceneStatus.missing, f.scene === "missing")
      }</div>
      <div class="bk-rl-fg"><span class="lab">卡片单元</span>${
        chip("card_unit", "all", "全部", counted.total, f.card_unit === "all") +
        chip("card_unit", "inferred-yes", "推断「是」", counted.card.inferredTrue, f.card_unit === "inferred-yes") +
        chip("card_unit", "official-no", "官方「否」", counted.card.officialFalse, f.card_unit === "official-no") +
        chip("card_unit", "missing", "未标注", counted.card.missing, f.card_unit === "missing")
      }</div>
      <div class="bk-rl-fg"><span class="lab">可路由</span>${
        chip("routeable", "all", "全部", counted.total, f.routeable === "all") +
        chip("routeable", "yes", "可路由", counted.routeable, f.routeable === "yes") +
        chip("routeable", "no", "不可路由", counted.total - counted.routeable, f.routeable === "no")
      }</div>
      <div class="bk-rl-fg"><span class="lab">字段缺口</span>${
        chip("gap", "all", "全部", counted.total, f.gap === "all") +
        chip("gap", "scene-missing", "缺 scene", counted.sceneStatus.missing, f.gap === "scene-missing") +
        chip("gap", "card-inferred", "推断 card_unit", counted.card.inferredTrue, f.gap === "card-inferred") +
        chip("gap", "unnamed-props", "未点名必填 props", counted.unnamedIds.length, f.gap === "unnamed-props") +
        chip("gap", "schema-missing", "缺 schema", counted.schemaMissing, f.gap === "schema-missing")
      }</div>`;
  }

  function rowMatch(row, filters) {
    if (filters.grain !== "all" && field(row, "grain").value !== filters.grain) return false;
    if (filters.kind !== "all" && field(row, "kind").value !== filters.kind) return false;
    if (filters.scene === "missing") {
      if (field(row, "scene").status !== "missing") return false;
    } else if (filters.scene !== "all") {
      if (field(row, "scene").value !== filters.scene) return false;
    }
    if (filters.card_unit === "inferred-yes") {
      const cu = field(row, "card_unit");
      if (!(cu.status === "inferred" && cu.value === true)) return false;
    } else if (filters.card_unit === "official-no") {
      const cu = field(row, "card_unit");
      if (!(cu.status === "official" && cu.value === false)) return false;
    } else if (filters.card_unit === "missing") {
      if (field(row, "card_unit").status !== "missing") return false;
    }
    if (filters.routeable === "yes" && field(row, "routeable").value !== true) return false;
    if (filters.routeable === "no" && field(row, "routeable").value !== false) return false;
    if (filters.gap === "scene-missing" && field(row, "scene").status !== "missing") return false;
    if (filters.gap === "card-inferred") {
      const cu = field(row, "card_unit");
      if (!(cu.status === "inferred" && cu.value === true)) return false;
    }
    if (filters.gap === "unnamed-props" && !unnamedRequired(row)) return false;
    if (filters.gap === "schema-missing" && !(row.data_contract && row.data_contract.schema_status === "missing")) {
      return false;
    }
    return true;
  }

  function filtersActive(filters) {
    return Object.keys(filters).some((k) => filters[k] !== "all");
  }

  function sceneCell(row) {
    const sc = field(row, "scene");
    if (sc.status === "missing" || sc.value == null) {
      return `<span class="bk-rl-tag" data-st="missing">未在官方文档出现</span>`;
    }
    const label = sc.status === "inferred" ? `${sc.value}（推断）` : String(sc.value);
    return `<span class="bk-rl-tag" data-st="${esc(sc.status)}">${esc(label)}</span>`;
  }

  function cardCell(row) {
    const cu = field(row, "card_unit");
    if (cu.status === "inferred" && cu.value === true) {
      return `<span class="bk-rl-tag" data-st="inferred">是（推断）</span>`;
    }
    if (cu.status === "official" && cu.value === false) {
      return `<span class="bk-rl-tag" data-st="official">否</span>`;
    }
    return `<span class="bk-rl-tag" data-st="missing">—</span>`;
  }

  function propsCell(row) {
    const dc = row.data_contract || {};
    if (dc.required_props_status === "missing") {
      return `<span class="bk-rl-tag" data-st="missing">未点名</span>`;
    }
    const named = dc.required_props_named_in_description || [];
    if (!named.length) return "—";
    return `<span class="props">${codes(named)}</span>`;
  }

  function collectCites(row) {
    const items = [];
    const push = (key, obj) => {
      if (!obj || typeof obj !== "object") return;
      if (obj.citation) items.push({ key, text: obj.citation });
      if (obj.note) items.push({ key, text: obj.note });
    };
    FIELD_PATHS.slice(0, 8).forEach((k) => push(k, row[k]));
    const dc = row.data_contract || {};
    push("data_contract", dc);
    if (dc.install_mode_citation) items.push({ key: "install_mode", text: dc.install_mode_citation });
    if (dc.required_props_note) items.push({ key: "required_props", text: dc.required_props_note });
    if (dc.schema_note) items.push({ key: "schema", text: dc.schema_note });
    if (row.official_description) push("official_description", row.official_description);
    if (row.aliases) push("aliases", row.aliases);
    const seen = new Set();
    return items.filter((it) => {
      const k = it.key + "\0" + it.text;
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }

  function detailHtml(row) {
    const desc = field(row, "official_description");
    const aliases = field(row, "aliases");
    const aliasList = Array.isArray(aliases.value) ? aliases.value : [];
    const dc = row.data_contract || {};
    const cites = collectCites(row)
      .map((c) => `<div><b>${esc(c.key)}</b>${esc(c.text)}</div>`)
      .join("");
    const opt = dc.optional_props_named_in_description || [];
    const docsProps = dc.props_in_official_docs_example || [];
    const children = dc.children_take_required_data;
    return `<div class="bk-rl-detail-inner">
      <div class="bk-rl-dl">
        <h5>官方描述</h5>
        <p>${esc(desc.value || "—")}</p>
      </div>
      ${row.notes ? `<div class="bk-rl-dl"><h5>备注</h5><p>${esc(row.notes)}</p></div>` : ""}
      ${dc.summary_zh ? `<div class="bk-rl-dl"><h5>数据契约摘要</h5><p>${esc(dc.summary_zh)}</p></div>` : ""}
      ${aliasList.length ? `<div class="bk-rl-dl"><h5>别名</h5><p>${codes(aliasList)}</p></div>` : ""}
      ${opt.length ? `<div class="bk-rl-dl"><h5>官方点名的可选 props</h5><p>${codes(opt)}</p></div>` : ""}
      ${docsProps.length ? `<div class="bk-rl-dl"><h5>官方 docs 示例中的属性名</h5><p>${codes(docsProps)}。示例名不自动升格为必填清单。</p></div>` : ""}
      ${
        children != null
          ? `<div class="bk-rl-dl"><h5>子 block 接受必填数据</h5><p>${esc(String(children))}</p></div>`
          : ""
      }
      <div class="bk-rl-dl">
        <h5>出处与说明</h5>
        <div class="bk-rl-cites">${cites || "—"}</div>
      </div>
    </div>`;
  }

  function rowHtml(row) {
    const id = idOf(row);
    const open = !!state.open[id];
    const grain = field(row, "grain");
    const kind = field(row, "kind");
    const demo = field(row, "demo_only");
    const route = field(row, "routeable");
    const install = (row.data_contract && row.data_contract.install_mode) || "";
    const installSt = (row.data_contract && row.data_contract.install_mode_status) || "official";
    const demoTag = demo.value
      ? `<span class="bk-rl-tag" data-st="${esc(demo.status || "official")}">仅 demo</span>`
      : "";
    const routeTag = route.value
      ? `<span class="bk-rl-tag is-route" data-st="official">可路由</span>`
      : `<span class="bk-rl-tag" data-st="official">不可路由</span>`;
    return `<tr class="bk-rl-row${open ? " is-open" : ""}" data-row-id="${esc(id)}" aria-expanded="${open ? "true" : "false"}">
      <td class="id">${esc(id)}</td>
      <td class="name">${esc(field(row, "official_name").value || "")}</td>
      <td><span class="bk-rl-tag" data-st="${esc(grain.status || "official")}">${esc(grain.value)}</span></td>
      <td><div class="bk-rl-tags"><span class="bk-rl-tag" data-st="${esc(kind.status || "official")}">${esc(kind.value)}</span>${demoTag}</div></td>
      <td>${cardCell(row)}</td>
      <td>${sceneCell(row)}</td>
      <td>${routeTag}</td>
      <td><span class="bk-rl-tag" data-st="${esc(installSt)}">${esc(INSTALL_LABEL[install] || install || "—")}</span></td>
      <td>${propsCell(row)}</td>
      <td><button type="button" class="bk-rl-toggle" data-toggle="${esc(id)}" aria-expanded="${open ? "true" : "false"}">${open ? "收起" : "详情"}</button></td>
    </tr>
    <tr class="bk-rl-detail" data-detail-for="${esc(id)}" ${open ? "" : "hidden"}>
      <td colspan="10">${open ? detailHtml(row) : ""}</td>
    </tr>`;
  }

  function renderTable(root, data) {
    const host = root.querySelector("[data-bk-rl-table]");
    const countHost = root.querySelector("[data-bk-rl-count]");
    const rows = data.rows.filter((row) => rowMatch(row, state.filters));
    const total = data.rows.length;
    const reset = filtersActive(state.filters)
      ? ` <button type="button" class="bk-rl-clear" data-rl-reset>清除筛选</button>`
      : "";
    countHost.innerHTML = `显示 <strong>${esc(rows.length)}</strong> / ${esc(total)}${reset}`;
    if (!rows.length) {
      host.innerHTML = `<p class="bk-rl-empty">没有符合当前筛选的条目。</p>`;
      return;
    }
    host.innerHTML = `<div class="bk-rl-wrap"><table class="bk-rl-table">
      <thead>
        <tr>
          <th>标识</th>
          <th>官方名称</th>
          <th>粒度</th>
          <th>类型</th>
          <th>卡片单元</th>
          <th>场景</th>
          <th>可路由</th>
          <th>安装</th>
          <th>必填 props</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows.map(rowHtml).join("")}</tbody>
    </table></div>`;
  }

  function bindNav(root) {
    const nav = root.querySelector("[data-bk-subnav]");
    if (!nav) return;
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
      const top =
        el.getBoundingClientRect().top - scroller.getBoundingClientRect().top + scroller.scrollTop - navH;
      scroller.scrollTo({
        top: Math.max(0, top),
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"
      });
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
        {
          root: scroller === document.scrollingElement ? null : scroller,
          rootMargin: "-12% 0px -70% 0px",
          threshold: [0, 0.2, 0.5]
        }
      );
      sections.forEach((s) => obs.observe(s));
      state.observer = obs;
    }
  }

  function bindUI(root, data) {
    root.addEventListener("click", (e) => {
      const reset = e.target.closest("[data-rl-reset]");
      if (reset && root.contains(reset)) {
        state.filters = {
          grain: "all",
          kind: "all",
          scene: "all",
          card_unit: "all",
          routeable: "all",
          gap: "all"
        };
        renderFilters(root, data, state.audit.counted);
        renderTable(root, data);
        return;
      }
      const chipBtn = e.target.closest("[data-fg]");
      if (chipBtn && root.contains(chipBtn)) {
        const group = chipBtn.getAttribute("data-fg");
        const value = chipBtn.getAttribute("data-fv");
        if (group && value) state.filters[group] = value;
        renderFilters(root, data, state.audit.counted);
        renderTable(root, data);
        return;
      }
      const toggle = e.target.closest("[data-toggle], .bk-rl-row");
      if (!toggle || !root.contains(toggle)) return;
      if (e.target.closest(".bk-rl-detail")) return;
      const id = toggle.getAttribute("data-toggle") || toggle.getAttribute("data-row-id");
      if (!id) return;
      e.preventDefault();
      state.open[id] = !state.open[id];
      const row = data.rows.find((r) => idOf(r) === id);
      const tr = root.querySelector(`.bk-rl-row[data-row-id="${CSS.escape(id)}"]`);
      const detail = root.querySelector(`.bk-rl-detail[data-detail-for="${CSS.escape(id)}"]`);
      if (!tr || !detail || !row) return;
      const open = !!state.open[id];
      tr.classList.toggle("is-open", open);
      tr.setAttribute("aria-expanded", open ? "true" : "false");
      const btn = tr.querySelector("[data-toggle]");
      if (btn) {
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.textContent = open ? "收起" : "详情";
      }
      detail.hidden = !open;
      detail.querySelector("td").innerHTML = open ? detailHtml(row) : "";
    });
  }

  function onHashLeave() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    if (raw !== ROUTE) teardown();
  }

  function boot() {
    global.VfxPages = global.VfxPages || {};
    global.VfxPages[ROUTE] = function () {
      const root = document.querySelector(ROOT_SEL);
      if (root) delete root.dataset.bkRlReady;
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
        try {
          prevTear();
        } catch (e) { /* ignore */ }
      }
    };
    addEventListener("hashchange", onHashLeave);
    const loadedByShell = !!(document.currentScript && document.currentScript.getAttribute("data-shell-src"));
    if (!loadedByShell && document.querySelector(ROOT_SEL)) init();
  }

  boot();
})(window);
