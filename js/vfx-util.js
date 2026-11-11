/* 设计研究 · 高阶视效共用工具：转义、缩略图、悬停浮卡。 */
(function (global) {
  "use strict";

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    }[c]));

  function hasThumb(item) {
    const t = item && (item.thumb || item.image);
    return !!(t && !item.capture_failed && !item.thumbMissing);
  }

  function thumbSrc(item, full) {
    if (!item) return "";
    if (item.capture_failed || item.thumbMissing) return "";
    if (full) return item.thumb_full || item.thumb || "";
    return item.thumb || item.thumb_full || "";
  }

  function isFinePointer() {
    return !!(global.matchMedia && matchMedia("(hover: hover) and (pointer: fine)").matches);
  }

  const Hover = {
    el: null,
    hideTimer: 0,
    current: null,
    onAction: null,

    ensure() {
      if (this.el) return this.el;
      const el = document.createElement("div");
      el.className = "vfx-float";
      el.hidden = true;
      el.setAttribute("role", "dialog");
      el.addEventListener("mouseenter", () => this.cancelHide());
      el.addEventListener("mouseleave", () => this.scheduleHide());
      el.addEventListener("click", (e) => {
        const act = e.target.closest("[data-vfx-act]");
        if (!act || !this.onAction) return;
        if (act.tagName === "TEXTAREA" || act.tagName === "INPUT") return;
        e.preventDefault();
        this.onAction(act.getAttribute("data-vfx-act"), this.current, act);
      });
      el.addEventListener("input", (e) => {
        const act = e.target.closest("[data-vfx-act]");
        if (!act || !this.onAction) return;
        if (act.tagName === "TEXTAREA" || act.tagName === "INPUT") {
          this.onAction(act.getAttribute("data-vfx-act"), this.current, act);
        }
      });
      document.body.appendChild(el);
      this.el = el;
      this._onKey = (e) => {
        if (e.key === "Escape") this.hide(true);
      };
      addEventListener("scroll", this._onScroll, true);
      addEventListener("resize", this._onScroll);
      addEventListener("keydown", this._onKey);
      return el;
    },

    _onScroll: () => {
      /* 滚动时收起，避免浮卡与格子错位。 */
      Hover.hide(true);
    },

    cancelHide() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = 0;
      }
    },

    scheduleHide() {
      this.cancelHide();
      this.hideTimer = setTimeout(() => this.hide(true), 120);
    },

    hide(immediate) {
      this.cancelHide();
      this.current = null;
      this.onAction = null;
      if (!this.el) return;
      this.el.hidden = true;
      this.el.classList.remove("is-in");
      this.el.innerHTML = "";
      if (immediate) {
        /* keep hidden */
      }
    },

    show(anchor, data, opts) {
      this.ensure();
      this.cancelHide();
      this.current = data;
      this.onAction = (opts && opts.onAction) || null;
      const el = this.el;
      const img = data.image;
      const shot = img
        ? `<div class="shot"><img src="${esc(img)}" alt="${esc(data.name || "")}"></div>`
        : `<div class="shot is-missing">暂无截图</div>`;
      const metaBits = (data.meta || []).filter(Boolean);
      const review = data.reviewHtml || "";
      const extra = data.extraHtml || "";
      const link = data.url
        ? `<a class="go" href="${esc(data.url)}" target="_blank" rel="noopener noreferrer">打开原站 ↗</a>`
        : "";
      el.innerHTML = `${shot}<div class="body">
        <h3>${esc(data.name || "")}</h3>
        ${metaBits.length ? `<div class="meta">${metaBits.map(esc).join(" · ")}</div>` : ""}
        ${extra}
        ${link}
        ${review}
      </div>`;
      el.hidden = false;
      el.classList.remove("is-in");
      void el.offsetWidth;
      if (!(matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches)) {
        el.classList.add("is-in");
      }
      this.place(anchor);
      const imgEl = el.querySelector("img");
      if (imgEl) {
        imgEl.addEventListener("error", () => {
          const box = el.querySelector(".shot");
          if (box) {
            box.classList.add("is-missing");
            box.textContent = "暂无截图";
          }
        }, { once: true });
      }
    },

    place(anchor) {
      const el = this.el;
      if (!el || el.hidden) return;
      const r = anchor.getBoundingClientRect();
      const vw = innerWidth;
      const vh = innerHeight;
      const margin = 12;
      const w = el.offsetWidth || 320;
      const h = el.offsetHeight || 280;
      let left = r.right - 8;
      if (left + w > vw - margin) left = r.left - w + 8;
      if (left < margin) left = Math.max(margin, Math.min(vw - w - margin, r.left));
      let top = r.top;
      if (top + h > vh - margin) top = Math.max(margin, vh - h - margin);
      if (top < margin) top = margin;
      /* 与锚点略重叠，便于指针移入浮卡。 */
      el.style.left = Math.round(left) + "px";
      el.style.top = Math.round(top) + "px";
    },

    bind(root, getData, opts) {
      this.ensure();
      const selector = (opts && opts.selector) || "[data-vfx-id]";
      let lastPointer = "mouse";

      const showFrom = (card) => {
        const data = getData(card);
        if (!data) return;
        this.show(card, data, opts);
      };

      const onOver = (e) => {
        if (e.pointerType === "touch" || (e.type === "mouseover" && lastPointer === "touch")) return;
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        const from = e.relatedTarget;
        if (from && card.contains(from)) return;
        showFrom(card);
      };
      const onOut = (e) => {
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        const next = e.relatedTarget;
        if (next && (card.contains(next) || (this.el && this.el.contains(next)))) return;
        this.scheduleHide();
      };
      const onPointerDown = (e) => {
        lastPointer = e.pointerType || "mouse";
      };
      const onClick = (e) => {
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        if (e.target.closest("a")) return;
        const data = getData(card);
        if (!data) return;
        const touch = lastPointer === "touch" || !isFinePointer();
        if (!touch) {
          if (data.url) {
            window.open(data.url, "_blank", "noopener,noreferrer");
          }
        } else {
          e.preventDefault();
          if (this.current && this.current.id === data.id && !this.el.hidden) {
            this.hide(true);
            return;
          }
          showFrom(card);
        }
      };
      const onFocus = (e) => {
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        showFrom(card);
      };

      root.addEventListener("pointerover", onOver);
      root.addEventListener("pointerout", onOut);
      root.addEventListener("mouseover", onOver);
      root.addEventListener("mouseout", onOut);
      root.addEventListener("pointerdown", onPointerDown);
      root.addEventListener("focusin", onFocus);
      root.addEventListener("click", onClick);

      this._bound = this._bound || [];
      this._bound.push({ root, onOver, onOut, onPointerDown, onClick, onFocus });
    },

    destroy() {
      this.hide(true);
      if (this._bound) {
        this._bound.forEach(({ root, onOver, onOut, onPointerDown, onClick, onFocus }) => {
          root.removeEventListener("pointerover", onOver);
          root.removeEventListener("pointerout", onOut);
          root.removeEventListener("mouseover", onOver);
          root.removeEventListener("mouseout", onOut);
          root.removeEventListener("pointerdown", onPointerDown);
          root.removeEventListener("focusin", onFocus);
          root.removeEventListener("click", onClick);
        });
        this._bound = [];
      }
      if (this.el) {
        this.el.remove();
        this.el = null;
      }
      removeEventListener("scroll", this._onScroll, true);
      removeEventListener("resize", this._onScroll);
      if (this._onKey) removeEventListener("keydown", this._onKey);
    }
  };

  function thumbButton(item, opts) {
    const o = opts || {};
    const id = item.id || "";
    const label = item.name || "";
    const src = thumbSrc(item, false);
    const cls = "vfx-thumb" + (src ? "" : " is-missing");
    const img = src
      ? `<img loading="lazy" src="${esc(src)}" alt="${esc(label)}">`
      : "暂无截图";
    return `<button type="button" class="${cls}" data-vfx-id="${esc(id)}" aria-label="${esc(label)}">${img}</button>`;
  }

  global.VfxUtil = { esc, hasThumb, thumbSrc, isFinePointer, Hover, thumbButton };
  global.VfxPages = global.VfxPages || {};
  global.initVfxPage = function (route) {
    const fn = global.VfxPages[route];
    if (typeof fn === "function") fn(route);
  };
  global.teardownVfxPage = function () {
    Hover.destroy();
  };
})(window);
