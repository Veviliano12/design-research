/* 设计研究 · 大弹窗。来源与候审共用，和研究和逻辑工位下钻同一套语言。
 * 平台 hash 不变。Esc / 关闭 / 点遮罩只关当前一层。 */
(function (global) {
  "use strict";

  const FOCUSABLE =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  function focusables(root) {
    return [...root.querySelectorAll(FOCUSABLE)].filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  }

  const Modal = {
    layer: null,
    stack: [],
    lastFocus: null,
    onKey: null,

    host() {
      return document.querySelector(".book-page") || document.body;
    },

    ensure() {
      if (this.layer && this.layer.isConnected) return this.layer;
      const layer = document.createElement("div");
      layer.className = "book-modal-layer";
      layer.setAttribute("data-qa", "book-modal");
      layer.innerHTML = `<div class="book-modal-backdrop" data-qa="book-modal-backdrop" aria-hidden="true"></div>
        <div class="book-modal-stack" data-stack></div>`;
      layer.querySelector(".book-modal-backdrop").addEventListener("click", () => this.close());
      this.host().appendChild(layer);
      this.layer = layer;
      if (!this.onKey) {
        this.onKey = (event) => this.handleKey(event);
        document.addEventListener("keydown", this.onKey, true);
      }
      return layer;
    },

    handleKey(event) {
      if (!this.stack.length) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        this.close();
        return;
      }
      if (event.key !== "Tab") return;
      const top = this.stack[this.stack.length - 1];
      if (!top || !top.panel) return;
      const nodes = focusables(top.panel);
      if (!nodes.length) {
        event.preventDefault();
        top.panel.focus();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !top.panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !top.panel.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    },

    lock() {
      const page = this.host();
      page.classList.add("is-modal-open");
      document.documentElement.classList.add("is-book-modal-open");
    },

    unlock() {
      if (this.stack.length) return;
      const page = this.host();
      page.classList.remove("is-modal-open");
      document.documentElement.classList.remove("is-book-modal-open");
    },

    open(opts) {
      const options = opts || {};
      if (!this.stack.length) this.lastFocus = document.activeElement;
      const layer = this.ensure();
      const stack = layer.querySelector("[data-stack]");
      const panel = document.createElement("div");
      panel.className = "book-modal" + (options.className ? " " + options.className : "");
      panel.setAttribute("role", "dialog");
      panel.setAttribute("aria-modal", "true");
      panel.setAttribute("aria-label", options.label || options.title || "详层");
      panel.tabIndex = -1;
      const kicker = options.kicker
        ? `<p class="book-modal-kicker">${options.kicker}</p>`
        : "";
      const title = options.title ? `<h2 class="book-modal-title">${options.title}</h2>` : "";
      panel.innerHTML = `
        <div class="book-modal-chrome">
          <div class="book-modal-lead">${kicker}</div>
          <button type="button" class="close-btn" aria-label="关闭" title="关闭" data-modal-close>
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M3.2 3.2l9.6 9.6M12.8 3.2l-9.6 9.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path>
            </svg>
          </button>
        </div>
        <div class="book-modal-body" data-qa="book-modal-body">
          ${title}
          <div class="book-modal-content">${options.html || ""}</div>
        </div>`;
      panel.querySelector("[data-modal-close]").addEventListener("click", () => this.close());
      stack.appendChild(panel);
      const entry = { panel, onClose: options.onClose, onMount: options.onMount };
      this.stack.push(entry);
      this.lock();
      layer.hidden = false;
      layer.classList.add("is-open");
      this.syncDepth();
      if (typeof options.onMount === "function") options.onMount(panel);
      const focusStart = panel.querySelector("[data-modal-close]") || panel;
      focusStart.focus();
      return panel;
    },

    syncDepth() {
      if (!this.layer) return;
      const n = this.stack.length;
      this.layer.setAttribute("data-depth", String(n));
      this.stack.forEach((entry, i) => {
        entry.panel.classList.toggle("is-under", i < n - 1);
        entry.panel.setAttribute("aria-hidden", i < n - 1 ? "true" : "false");
      });
    },

    close() {
      if (!this.stack.length) return;
      const entry = this.stack.pop();
      if (entry.panel && entry.panel.parentNode) entry.panel.parentNode.removeChild(entry.panel);
      if (typeof entry.onClose === "function") entry.onClose();
      this.syncDepth();
      if (!this.stack.length) {
        if (this.layer) {
          this.layer.classList.remove("is-open");
          this.layer.hidden = true;
        }
        this.unlock();
        if (this.lastFocus && typeof this.lastFocus.focus === "function") {
          try { this.lastFocus.focus(); } catch (_) { /* ignore */ }
        }
        this.lastFocus = null;
      } else {
        const top = this.stack[this.stack.length - 1];
        const start = top.panel.querySelector("[data-modal-close]") || top.panel;
        start.focus();
      }
    },

    closeAll() {
      while (this.stack.length) this.close();
    },

    isOpen() {
      return this.stack.length > 0;
    },

    destroy() {
      this.closeAll();
      if (this.onKey) {
        document.removeEventListener("keydown", this.onKey, true);
        this.onKey = null;
      }
      if (this.layer && this.layer.parentNode) this.layer.parentNode.removeChild(this.layer);
      this.layer = null;
    }
  };

  global.VfxModal = Modal;
})(window);
