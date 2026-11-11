/* 设计研究 · 待吸收预览：30 条密缩略图 + 悬停浮卡。不自动并入地图。 */
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

    function marksOf(id) {
      return store[id] || {};
    }
    function setMark(id, patch) {
      store[id] = { ...marksOf(id), ...patch };
      saveStore(store);
    }

    function reviewHtml(it) {
      const m = marksOf(it.id);
      const btn = (act, label, on) =>
        `<button type="button" data-vfx-act="${act}" class="${on ? "is-on" : ""}">${label}</button>`;
      const note = m.note || "";
      return `<div class="vfx-review">
        ${btn("seen", "看过了", !!m.seen)}
        ${btn("yes", "合适", m.fit === "yes")}
        ${btn("no", "不合适", m.fit === "no")}
        <textarea data-vfx-act="note" placeholder="批注（仅保存在本机）">${U.esc(note)}</textarea>
      </div>`;
    }

    function floatData(it) {
      const src = it.sourceSite && it.sourceSite !== it.sourceGroup
        ? `${it.sourceGroup} · ${it.sourceSite}`
        : it.sourceGroup || it.sourceSite || "";
      const meta = [];
      if (src) meta.push(src);
      if ((it.scenes || []).length) meta.push(it.scenes.join("、"));
      if (it.scale) meta.push(it.scale);
      if (it.language) meta.push(it.language);
      const extra = it.reason ? `<div class="why">${U.esc(it.reason)}</div>` : "";
      return {
        id: it.id,
        name: it.name,
        url: it.url,
        image: U.thumbSrc(it, true),
        meta,
        extraHtml: extra,
        reviewHtml: reviewHtml(it)
      };
    }

    function render() {
      const host = root.querySelector("[data-vfx-gallery]");
      const present = {};
      items.forEach((it) => {
        present[it.sourceGroup] = (present[it.sourceGroup] || 0) + 1;
      });
      const order = groupOrder.filter((g) => present[g]);
      Object.keys(present).forEach((g) => {
        if (!order.includes(g)) order.push(g);
      });
      host.innerHTML = order
        .map((g) => {
          const group = items.filter((it) => it.sourceGroup === g);
          return `<section class="vfx-group">
            <h3>${U.esc(g)}<span class="n">${group.length}</span></h3>
            <div class="vfx-dense">${group.map((it) => U.thumbButton(it)).join("")}</div>
          </section>`;
        })
        .join("");
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

    const hoverOpts = {
      onAction(act, data, el) {
        if (!data) return;
        const cur = marksOf(data.id);
        if (act === "seen") setMark(data.id, { seen: !cur.seen });
        else if (act === "yes") setMark(data.id, { fit: cur.fit === "yes" ? "" : "yes" });
        else if (act === "no") setMark(data.id, { fit: cur.fit === "no" ? "" : "no" });
        else if (act === "note") {
          setMark(data.id, { note: el.value || "" });
          return;
        }
        const it = byId.get(data.id);
        const card = root.querySelector(`[data-vfx-id="${CSS.escape(data.id)}"]`);
        if (it && card) U.Hover.show(card, floatData(it), hoverOpts);
      }
    };
    U.Hover.bind(root.querySelector("[data-vfx-gallery]"), (card) => {
      const it = byId.get(card.getAttribute("data-vfx-id"));
      return it ? floatData(it) : null;
    }, hoverOpts);

    render();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/preview"] = init;
})(window);
