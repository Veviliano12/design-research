/* 设计研究 · 全景总览：密缩略图网格 + 场景筛选 + 悬停浮卡。 */
(function (global) {
  "use strict";

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

    function emptyNote(row, scale) {
      if (scene === "全部") return "此格暂无案例";
      return `「${scene}」暂无`;
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
                : `<div class="vfx-empty">${U.esc(emptyNote(r.name, sc))}</div>`;
              return `<div class="vfx-map-cell" data-scale="${U.esc(sc)}">${inner}</div>`;
            })
            .join("");
          return `<div class="vfx-map-lang">
            <div class="vfx-map-row-head"><b>${U.esc(r.name)}</b><span>${U.esc(r.desc || "")}</span></div>
            ${cells}
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
      const c = byId.get(card.getAttribute("data-vfx-id"));
      return c ? floatData(c) : null;
    });

    renderTabs();
    renderGrid();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/overview"] = init;
})(window);
