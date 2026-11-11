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

  const SHOW_DELAY = 700;
  const Hover = {
    el: null,
    hideTimer: 0,
    showTimer: 0,
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
      Hover.cancelShow();
      Hover.hide(true);
    },

    cancelHide() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = 0;
      }
    },

    cancelShow() {
      if (this.showTimer) {
        clearTimeout(this.showTimer);
        this.showTimer = 0;
      }
    },

    scheduleHide() {
      this.cancelHide();
      this.hideTimer = setTimeout(() => this.hide(true), 180);
    },

    scheduleShow(anchor, data, opts, delay) {
      this.cancelShow();
      this.cancelHide();
      const wait = delay == null ? SHOW_DELAY : delay;
      if (wait <= 0) {
        this.show(anchor, data, opts);
        return;
      }
      this.showTimer = setTimeout(() => {
        this.showTimer = 0;
        if (!anchor.isConnected) return;
        this.show(anchor, data, opts);
      }, wait);
    },

    hide(immediate) {
      this.cancelHide();
      this.cancelShow();
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
      const gap = 10;
      const w = el.offsetWidth || 320;
      const h = el.offsetHeight || 280;
      /* 优先放在缩略图上方或下方，避免出现在右侧挡住同一行后面的内容。 */
      let top = r.top - h - gap;
      if (top < margin) {
        top = r.bottom + gap;
        if (top + h > vh - margin) {
          top = Math.max(margin, vh - h - margin);
        }
      }
      let left = r.left + r.width / 2 - w / 2;
      if (left < margin) left = margin;
      if (left + w > vw - margin) left = Math.max(margin, vw - w - margin);
      el.style.left = Math.round(left) + "px";
      el.style.top = Math.round(top) + "px";
    },

    bind(root, getData, opts) {
      this.ensure();
      const selector = (opts && opts.selector) || "[data-vfx-id]";
      let lastPointer = "mouse";

      const showFrom = (card, delay) => {
        const data = getData(card);
        if (!data) return;
        if (delay == null || delay <= 0) this.show(card, data, opts);
        else this.scheduleShow(card, data, opts, delay);
      };

      const onOver = (e) => {
        if (e.pointerType === "touch" || (e.type === "mouseover" && lastPointer === "touch")) return;
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        const from = e.relatedTarget;
        if (from && card.contains(from)) return;
        /* 已显示同一张卡时不再重新计时；扫过其他卡则收起并重新等待。 */
        if (this.current && this.current.id === (getData(card) || {}).id && this.el && !this.el.hidden) {
          this.cancelHide();
          return;
        }
        if (this.current && this.el && !this.el.hidden) this.hide(true);
        showFrom(card, SHOW_DELAY);
      };
      const onOut = (e) => {
        const card = e.target.closest(selector);
        if (!card || !root.contains(card)) return;
        const next = e.relatedTarget;
        if (next && (card.contains(next) || (this.el && this.el.contains(next)))) return;
        this.cancelShow();
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
