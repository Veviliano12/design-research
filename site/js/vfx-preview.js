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
      return `<button type="button" class="${cellClass(it)}" data-preview-id="${U.esc(it.id)}" title="${U.esc(it.name)}" aria-label="${U.esc(it.officialName || it.name)}，候审，尚未进入视效库">${img}</button>`;
    }

    function recordBodyHtml(it) {
      const img = U.thumbSrc(it, true);
      const shot = img
        ? `<div class="book-modal-shot"><span>暂无现场截图</span><img src="${U.esc(img)}" alt="${U.esc(it.officialName || it.name)}"></div>`
        : `<div class="book-modal-shot is-missing"><span>暂无现场截图</span></div>`;
      const bits = [];
      bits.push('<span class="src-st is-queue">候审</span>');
      if (it.sourceGroup) bits.push(U.esc(it.sourceGroup));
      if (it.sourceSite && it.sourceSite !== it.sourceGroup) bits.push(U.esc(it.sourceSite));
      if (it.language) bits.push(U.esc(it.language));
      if (it.scale) bits.push(U.esc(it.scale));
      if ((it.scenes || []).length) bits.push(U.esc(it.scenes.join("、")));
      const note = it.reason ? `<p class="src-inspect-note">${U.esc(it.reason)}</p>` : "";
      const link = it.url
        ? `<a class="src-go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`
        : "";
      const official = it.officialName && it.officialName !== it.name
        ? `<p class="src-official-name">${U.esc(it.officialName)}</p>`
        : "";
      return `
        <div class="src-record" data-qa="preview-item">
          ${shot}
          <div class="src-record-main">
            <h3 class="src-record-name">${U.esc(it.name)}</h3>
            ${official}
            <p class="src-inspect-meta">${bits.join(" · ")}</p>
            <div class="src-inspect-links">${link}</div>
            ${note}
            <p class="auth-status">尚未进入视效库 · 不计入 124</p>
          </div>
        </div>`;
    }

    function bindShotFallback(scope) {
      (scope || document).querySelectorAll(".book-modal-shot img").forEach((img) => {
        img.addEventListener("error", () => {
          const box = img.closest(".book-modal-shot");
          if (!box) return;
          box.classList.add("is-missing");
          img.remove();
          if (!box.querySelector("span")) box.insertAdjacentHTML("beforeend", "<span>暂无现场截图</span>");
        });
      });
    }

    function openItem(it) {
      const Modal = global.VfxModal;
      if (!Modal || !it) return;
      Modal.open({
        kicker: "候审",
        title: U.esc(it.officialName || it.name),
        label: it.officialName || it.name,
        className: "is-preview-item",
        html: recordBodyHtml(it),
        onMount: (panel) => bindShotFallback(panel)
      });
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
            <a class="src-queue" href="#/vfx/review">去评判</a>
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

      root.querySelectorAll("[data-preview-id]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const it = byId.get(btn.getAttribute("data-preview-id"));
          if (it) openItem(it);
        });
      });
    }

    if (global.VfxModal) global.VfxModal.closeAll();
    render();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/preview"] = init;
})(window);
