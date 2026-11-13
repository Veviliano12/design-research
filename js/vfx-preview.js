/* 设计研究 · 候审：30 条真实格子，按来源组排列。不计入地图上的 124。不编造截图。 */
(function (global) {
  "use strict";

  const STORE_KEY = "design-research-vfx-preview-v1";

  function loadStore() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function saveStore(state) {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }

  function init() {
    const U = global.VfxUtil;
    const D = global.VFX_PREVIEW_DATA;
    const root = document.querySelector("[data-vfx-root='preview']");
    if (!root || !U) return;
    if (!D || !D.items) {
      root.innerHTML = '<p class="vfx-empty-page">没有载入到预览数据。请用本地静态服务器打开，并确认 data/vfx/preview-cases.js 与 thumbs/vfx/ 都在。</p>';
      return;
    }

    const items = D.items.slice();
    const byId = new Map(items.map((it) => [it.id, it]));
    const groupOrder = D.groupOrder || [];
    let store = loadStore();
    let selected = null;

    function marksOf(id) {
      return store[id] || {};
    }
    function setMark(id, patch) {
      store[id] = { ...marksOf(id), ...patch };
      saveStore(store);
    }

    function cellClass(it) {
      const m = marksOf(it.id);
      const bits = ["q-cell"];
      if (it.thumbMissing || !U.hasThumb(it)) bits.push("is-missing");
      if (m.seen) bits.push("is-seen");
      if (m.fit === "yes") bits.push("is-yes");
      if (m.fit === "no") bits.push("is-no");
      if (selected && selected.id === it.id) bits.push("is-on");
      return bits.join(" ");
    }

    function cellHtml(it) {
      const src = U.thumbSrc(it, false);
      const img = src
        ? `<img src="${U.esc(src)}" alt="${U.esc(it.name)}" loading="lazy">`
        : `<span>暂无现场截图</span>`;
      return `<div class="${cellClass(it)}" title="${U.esc(it.name)}">${img}</div>`;
    }

    function inspectHtml(it) {
      if (!it) return `<div class="src-inspect-empty">点格查看单条 · 候审不计入 124</div>`;
      const m = marksOf(it.id);
      const img = U.thumbSrc(it, true);
      const shot = img
        ? `<div class="src-inspect-shot"><img src="${U.esc(img)}" alt="${U.esc(it.name)}"></div>`
        : `<div class="src-inspect-shot is-missing">暂无现场截图</div>`;
      const bits = [];
      bits.push("候审");
      if (it.sourceGroup) bits.push(U.esc(it.sourceGroup));
      if (it.sourceSite && it.sourceSite !== it.sourceGroup) bits.push(U.esc(it.sourceSite));
      if (it.language) bits.push(U.esc(it.language));
      if (it.scale) bits.push(U.esc(it.scale));
      if ((it.scenes || []).length) bits.push(U.esc(it.scenes.join("、")));
      const btn = (act, label, on) =>
        `<button type="button" data-vfx-act="${act}" class="${on ? "is-on" : ""}">${label}</button>`;
      const review = `<div class="vfx-review">
        ${btn("seen", "看过了", !!m.seen)}
        ${btn("yes", "合适", m.fit === "yes")}
        ${btn("no", "不合适", m.fit === "no")}
        <textarea data-vfx-act="note" placeholder="批注（仅保存在本机）">${U.esc(m.note || "")}</textarea>
      </div>`;
      const note = it.reason ? `<p class="src-inspect-note">${U.esc(it.reason)}</p>` : "";
      const link = it.url
        ? `<a class="src-go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`
        : "";
      return `${shot}
        <h3>${U.esc(it.name)}</h3>
        <p class="src-inspect-meta">${bits.join(" · ")}</p>
        <div class="src-inspect-links">${link}</div>
        ${note}
        ${review}`;
    }

    function render() {
      root.classList.add("src-viz-root", "is-preview-viz");
      const present = {};
      items.forEach((it) => {
        present[it.sourceGroup] = (present[it.sourceGroup] || 0) + 1;
      });
      const order = groupOrder.filter((g) => present[g]);
      Object.keys(present).forEach((g) => {
        if (!order.includes(g)) order.push(g);
      });
      const fields = order
        .map((g) => {
          const group = items.filter((it) => it.sourceGroup === g);
          return `<section class="q-group">
            <header class="q-group-head">
              <h2>${U.esc(g)}</h2>
              <b>${group.length}</b>
            </header>
            <div class="q-field">${group.map(cellHtml).join("")}</div>
          </section>`;
        })
        .join("");

      root.innerHTML = `
        <header class="src-viz-head">
          <p class="kicker">候审</p>
          <div class="src-viz-legend">
            <span><i class="src-swatch is-queue"></i>候审，尚未进入视效库 · 不计入 124</span>
            <a class="src-queue" href="#/sources/review">返回来源</a>
          </div>
        </header>
        <div class="q-hero"><b>${items.length}</b><span>候审</span></div>
        <div class="q-board is-static">
          <div class="q-fields">${fields}</div>
        </div>
      `;

      root.querySelectorAll(".q-cell img").forEach((img) => {
        img.addEventListener("error", () => {
          const btn = img.closest(".q-cell");
          if (!btn) return;
          btn.classList.add("is-missing");
          img.remove();
          btn.insertAdjacentHTML("afterbegin", "<span>暂无现场截图</span>");
        });
      });
    }

    /* 先不支持点进单条：格子本身已展示缩略图与分组，不再打开未完成的详层。 */

        render();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/preview"] = init;
})(window);
