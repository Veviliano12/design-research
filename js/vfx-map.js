/* 设计研究 · 全景总览：密缩略图网格 + 场景筛选 + 自身现状覆盖 + 悬停浮卡。 */
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

  function coverageLead(lightup) {
    const rows = (lightup.rows || []).map(rollup);
    const nPresent = rows.filter((r) => r.present).length;
    const nAttemptedOnly = rows.filter((r) => r.attempted && !r.present).length;
    const nNear = rows.filter((r) => r.near).length;
    const nNone = rows.filter((r) => r.none).length;
    const reviewed = lightup.reviewed || 94;
    const parts = [];
    parts.push("自身 " + reviewed + " 页抽样");
    if (nAttemptedOnly) parts.push(nAttemptedOnly + " 条语言做了但不够");
    if (nPresent) parts.push(nPresent + " 条已点亮");
    if (nNear) parts.push(nNear + " 条接近标杆");
    if (nNone) parts.push(nNone + " 条未见");
    if (!nPresent && !nNear) parts.push("尚未有点亮或接近标杆");
    if (lightup.updated_at) parts.push("审于 " + lightup.updated_at);
    return parts.join(" · ");
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

    function renderCoverage() {
      const host = root.querySelector("[data-vfx-coverage]");
      if (!host) return;
      if (!lightup) {
        host.hidden = true;
        host.innerHTML = "";
        return;
      }
      const items = (D.rows || []).map((r) => {
        const roll = rollup(rowRecord(lightup, r.name));
        const kind = coverageKind(roll);
        const mark = coverageMarkText(roll);
        return `<div class="vfx-cov is-${U.esc(kind)}"><span class="name">${U.esc(r.name)}</span><span class="mark">${U.esc(mark)}</span></div>`;
      }).join("");
      host.innerHTML = `<div class="vfx-coverage-lead">${U.esc(coverageLead(lightup))}</div><div class="vfx-coverage-grid">${items}</div>`;
      host.hidden = false;
    }

    function renderTabs() {
      const host = root.querySelector("[data-vfx-tabs]");
      const tabs = [{ name: "全部", kind: "all" }, ...(D.scenes || [])];
      host.innerHTML = tabs
        .map((t) => {
          const on = scene === t.name ? " is-on" : "";
          const sub = t.kind === "supplement" ? " is-sub" : "";
          const label = t.kind === "supplement" ? t.name + "（补充）" : t.name;
          return `<button type="button" class="vfx-tab press${on}${sub}" data-scene="${U.esc(t.name)}" aria-pressed="${scene === t.name ? "true" : "false"}">${U.esc(label)}<span class="n">${count(t.name)}</span></button>`;
        })
        .join("");
    }

    function emptyNote() {
      if (scene === "全部") return "此格暂无案例";
      return `「${scene}」暂无`;
    }

    function ownStrip(r) {
      if (!lightup) return "";
      const rec = rowRecord(lightup, r.name);
      const roll = rollup(rec);
      if (roll.none) return "";
      const pages = lightup.pages || {};
      const thumbs = roll.pages
        .map((item) => {
          const page = pages[item.id];
          if (!page) return "";
          return U.thumbButton({
            id: LIGHTUP_PREFIX + item.id + "::" + r.name,
            name: page.title || item.id,
            thumb: page.thumb
          });
        })
        .join("");
      const hint = roll.hint
        ? `<div class="vfx-own-hint">${U.esc(roll.hint)}</div>`
        : "";
      return `<div class="vfx-own">
        <div class="vfx-own-label">
          <span class="k">现状</span>
          ${marksHtml(U, roll, "vfx-own-marks", { allStatuses: true })}
        </div>
        <div class="vfx-own-thumbs">${thumbs}</div>
        ${hint}
      </div>`;
    }

    function renderGrid() {
      const host = root.querySelector("[data-vfx-grid]");
      const list = listForScene();
      const head = `<div class="vfx-map-head"><div>视效语言</div><div>整页 · 整个页面都好看</div><div>组件 · 按钮、卡片、局部材质</div></div>`;
      const langs = (D.rows || [])
        .map((r) => {
          const cells = (D.scales || ["整页", "组件"])
            .map((sc) => {
              const items = list.filter((c) => c.row === r.name && c.scale === sc);
              const inner = items.length
                ? items.map((c) => U.thumbButton(c)).join("")
                : `<div class="vfx-empty">${U.esc(emptyNote())}</div>`;
              return `<div class="vfx-map-cell" data-scale="${U.esc(sc)}">${inner}</div>`;
            })
            .join("");
          const roll = lightup ? rollup(rowRecord(lightup, r.name)) : { none: true, present: 0, attempted: 0, near: 0, pages: [] };
          const headMarks = marksHtml(U, roll, "vfx-row-marks");
          const strip = ownStrip(r);
          return `<div class="vfx-map-lang${strip ? " has-own" : ""}">
            <div class="vfx-map-row">
              <div class="vfx-map-row-head"><b>${U.esc(r.name)}</b><span>${U.esc(r.desc || "")}</span>${headMarks}</div>
              ${cells}
            </div>
            ${strip}
          </div>`;
        })
        .join("");
      host.innerHTML = `<div class="vfx-map">${head}${langs}</div>`;
      host.querySelectorAll(".vfx-thumb img").forEach((img) => {
        img.addEventListener("error", () => {
          const btn = img.closest(".vfx-thumb");
          if (!btn) return;
          btn.classList.add("is-missing");
          img.remove();
          btn.appendChild(document.createTextNode("暂无截图"));
        });
      });
    }

    const tabs = root.querySelector("[data-vfx-tabs]");
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[data-scene]");
      if (!b) return;
      scene = b.getAttribute("data-scene");
      renderTabs();
      renderGrid();
    });

    U.Hover.bind(root.querySelector("[data-vfx-grid]"), (card) => {
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

    renderTabs();
    if (lightup) {
      paint();
    } else {
      loadLightup().then((L) => {
        if (!root.isConnected) return;
        lightup = L;
        paint();
      });
    }
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/overview"] = init;
})(window);
