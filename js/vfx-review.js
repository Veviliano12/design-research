/* 设计研究 · 评判：机器初筛之后，由人决定是否进入视效库。
 * 标记写在本机 localStorage，可导出 JSON；不写入视效库 124。 */
(function (global) {
  "use strict";

  const STORE_KEY = "design-research-vfx-review-v1";
  const FITS = [
    { key: "yes", label: "适合" },
    { key: "no", label: "不适合" },
    { key: "hold", label: "待定" }
  ];

  function loadStore() {
    let seed = {};
    const file = global.VFX_REVIEW_MARKS_SEED;
    if (file && file.items && typeof file.items === "object") seed = { ...file.items };
    try {
      const raw = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
      const items = raw.items || raw;
      if (items && typeof items === "object") {
        Object.keys(items).forEach((id) => {
          const a = seed[id];
          const b = items[id];
          if (!a) seed[id] = b;
          else if (b && b.at && (!a.at || b.at >= a.at)) seed[id] = b;
        });
      }
    } catch {
      /* ignore */
    }
    return seed;
  }

  function saveStore(state) {
    const payload = {
      savedAt: new Date().toISOString(),
      timezone: "America/New_York",
      items: state
    };
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore */
    }
    return payload;
  }

  function init() {
    const U = global.VfxUtil;
    const D = global.VFX_REVIEW_QUEUE;
    const root = document.querySelector("[data-vfx-root='review']");
    if (!root || !U) return;
    if (!D || !D.items) {
      root.innerHTML = '<p class="vfx-empty-page">没有载入到评判队列。请用本地静态服务器打开，并确认 data/vfx/review-queue.js 已装载。</p>';
      return;
    }

    const items = D.items.slice();
    const byId = new Map(items.map((it) => [it.id, it]));
    const screened = items.filter((it) => it.lane === "screened");
    const confirmed = items.filter((it) => it.lane === "confirmed");
    let store = loadStore();
    let openId = null;
    let lastFocus = null;

    function marksOf(id) {
      return store[id] || {};
    }

    function setFit(id, fit) {
      const cur = marksOf(id);
      const next = fit && cur.fit === fit ? "" : fit;
      if (!next) {
        const { fit: _drop, ...rest } = { ...cur };
        if (Object.keys(rest).length) store[id] = { ...rest, at: new Date().toISOString() };
        else delete store[id];
      } else {
        store[id] = { ...cur, fit: next, at: new Date().toISOString() };
      }
      saveStore(store);
      paint();
    }

    function laneItems(id) {
      const it = byId.get(id);
      if (!it) return screened;
      return it.lane === "confirmed" ? confirmed : screened;
    }

    function exportMarks() {
      const payload = {
        savedAt: new Date().toISOString(),
        timezone: "America/New_York",
        note: "评判标记。不写入视效库 124。可把此文件放到 data/vfx/review-marks.json，下次作为种子合并。",
        items: store
      };
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "review-marks.json";
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    }

    function counted(list) {
      let yes = 0, no = 0, hold = 0, unset = 0;
      list.forEach((it) => {
        const f = marksOf(it.id).fit;
        if (f === "yes") yes++;
        else if (f === "no") no++;
        else if (f === "hold") hold++;
        else unset++;
      });
      return { yes, no, hold, unset, total: list.length };
    }

    function plateClass(it) {
      const m = marksOf(it.id);
      const bits = ["rev-plate"];
      if (it.lane === "confirmed") bits.push("is-confirmed");
      if (openId === it.id) bits.push("is-on");
      if (m.fit === "yes") bits.push("is-yes");
      if (m.fit === "no") bits.push("is-no");
      if (m.fit === "hold") bits.push("is-hold");
      if (!U.hasThumb(it) && !it.thumb) bits.push("is-missing");
      return bits.join(" ");
    }

    function plateHtml(it) {
      const src = U.thumbSrc(it, false) || it.thumb;
      const img = src
        ? `<img src="${U.esc(src)}" alt="${U.esc(it.name)}" loading="lazy">`
        : "<span>暂无现场截图</span>";
      const mark = marksOf(it.id).fit;
      const tag = mark === "yes" ? "适合" : mark === "no" ? "不适合" : mark === "hold" ? "待定" : "";
      return `<button type="button" class="${plateClass(it)}" data-review-id="${U.esc(it.id)}" title="${U.esc(it.officialName || it.name)}">
        ${img}
        <i class="rev-plate-name">${U.esc(it.name)}</i>
        ${tag ? `<i class="rev-plate-fit">${tag}</i>` : ""}
      </button>`;
    }

    function fieldHtml(lane, list) {
      return `<section class="rev-field is-${U.esc(lane.id)}" aria-label="${U.esc(lane.label)}">
        <header class="rev-field-head">
          <p class="rev-field-kicker">${U.esc(lane.kicker)}</p>
          <h2>${U.esc(lane.label)}</h2>
          <b>${list.length}</b>
        </header>
        <div class="rev-plates">${list.map(plateHtml).join("")}</div>
      </section>`;
    }

    function overviewHtml() {
      const sc = counted(screened);
      const cc = counted(confirmed);
      const process = (D.process || []).map((s, i) => {
        const on = i === 1 ? " is-here" : "";
        const arrow = i < (D.process.length - 1) ? '<i class="rev-arrow" aria-hidden="true"></i>' : "";
        return `<span class="rev-step${on}">${U.esc(s)}</span>${arrow}`;
      }).join("");
      return `
        <div class="rev-overview">
          <header class="rev-lead">
            <p class="kicker">人评判</p>
            <h1>机器初筛之后，由你决定是否进入视效库</h1>
            <p class="rev-process" aria-label="流程">${process}</p>
          </header>
          <div class="rev-heroes" aria-hidden="true">
            <div class="rev-hero">
              <b>${screened.length}</b>
              <span>本轮队列</span>
            </div>
            <div class="rev-hero is-confirmed">
              <b>${confirmed.length}</b>
              <span>已确认候审</span>
            </div>
          </div>
          ${fieldHtml(D.lanes[0], screened)}
          ${fieldHtml(D.lanes[1], confirmed)}
          <p class="rev-persist">标记保存在这台浏览器里，刷新还在；不写入视效库 124。可导出 JSON，放到 data/vfx/review-marks.json 作为种子。<button type="button" class="rev-export" data-export>导出标记</button>
            <span class="rev-tally">本轮已标 ${sc.yes + sc.no + sc.hold} / ${sc.total} · 候审已标 ${cc.yes + cc.no + cc.hold} / ${cc.total}</span>
          </p>
        </div>`;
    }

    function authLine(it) {
      if (it.authorityOf === "source" && it.authority != null) {
        return `来源权威性 ${it.authority} / ${it.authorityStars}（${it.sourceName}）· 不是这条推文的分数`;
      }
      if (it.authorityOf === "author-notoriety") {
        return it.authorityNote || "只有作者声量记录，不编造权威分";
      }
      return it.authorityNote || "";
    }

    function stageHtml(it) {
      const src = U.thumbSrc(it, true) || it.thumb || it.remoteThumb;
      const laneLabel = it.lane === "confirmed" ? "已确认候审" : "本轮队列";
      const list = laneItems(it.id);
      const idx = list.findIndex((x) => x.id === it.id);
      const fit = marksOf(it.id).fit;
      const marks = FITS.map((f) => {
        const on = fit === f.key ? " is-on" : "";
        return `<button type="button" class="rev-fit${on}" data-fit="${f.key}">${U.esc(f.label)}</button>`;
      }).join("");
      const links = [];
      if (it.externalUrl || (it.url && it.url !== it.tweetUrl)) {
        const href = it.externalUrl || it.url;
        links.push(`<a class="rev-go" href="${U.esc(href)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`);
      }
      if (it.tweetUrl) {
        links.push(`<a class="rev-go" href="${U.esc(it.tweetUrl)}" target="_blank" rel="noopener noreferrer">打开原帖 ↗</a>`);
      } else if (it.url && !it.externalUrl) {
        links.push(`<a class="rev-go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`);
      }
      const auth = authLine(it);
      const shot = src
        ? `<img src="${U.esc(src)}" alt="${U.esc(it.officialName || it.name)}">`
        : "";
      return `
        <div class="rev-stage" data-stage role="dialog" aria-modal="true" aria-label="${U.esc(it.officialName || it.name)}">
          <div class="rev-stage-plate${src ? "" : " is-missing"}">${shot || "<span>暂无现场截图</span>"}</div>
          <div class="rev-stage-veil" aria-hidden="true"></div>
          <div class="rev-stage-copy">
            <p class="kicker">${U.esc(laneLabel)}</p>
            <h2>${U.esc(it.officialName || it.name)}</h2>
            <p class="rev-why">${U.esc(it.why || "")}</p>
            ${auth ? `<p class="rev-auth">${U.esc(auth)}</p>` : ""}
            <div class="rev-links">${links.join("")}</div>
            <div class="rev-fits" role="group" aria-label="是否适合进入视效库">${marks}</div>
          </div>
          <div class="rev-stage-bar">
            <button type="button" class="rev-stepper" data-step="-1"${idx <= 0 ? " disabled" : ""}>上一件</button>
            <span class="rev-pos">${idx + 1} / ${list.length}</span>
            <button type="button" class="rev-stepper" data-step="1"${idx >= list.length - 1 ? " disabled" : ""}>下一件</button>
            <button type="button" class="rev-close" data-close aria-label="关闭">关闭</button>
          </div>
        </div>`;
    }

    function openItem(id, fromEl) {
      if (!byId.has(id)) return;
      openId = id;
      if (fromEl) lastFocus = fromEl;
      paint();
    }

    function closeStage() {
      const id = openId;
      openId = null;
      paint();
      const btn = id && root.querySelector(`[data-review-id="${CSS.escape(id)}"]`);
      (btn || lastFocus)?.focus?.();
    }

    function step(dir) {
      if (!openId) return;
      const list = laneItems(openId);
      const idx = list.findIndex((x) => x.id === openId);
      const next = list[idx + dir];
      if (next) openItem(next.id);
    }

    function bindOverview() {
      root.querySelectorAll("[data-review-id]").forEach((btn) => {
        btn.addEventListener("click", () => openItem(btn.getAttribute("data-review-id"), btn));
      });
      root.querySelectorAll("[data-export]").forEach((btn) => {
        btn.addEventListener("click", exportMarks);
      });
      root.querySelectorAll(".rev-plate img").forEach((img) => {
        img.addEventListener("error", () => {
          const btn = img.closest(".rev-plate");
          if (!btn) return;
          btn.classList.add("is-missing");
          img.remove();
          if (!btn.querySelector("span")) btn.insertAdjacentHTML("afterbegin", "<span>暂无现场截图</span>");
        });
      });
    }

    function bindStage(it) {
      const stage = root.querySelector("[data-stage]");
      if (!stage) return;
      stage.querySelectorAll("[data-fit]").forEach((btn) => {
        btn.addEventListener("click", () => setFit(it.id, btn.getAttribute("data-fit")));
      });
      stage.querySelectorAll("[data-step]").forEach((btn) => {
        btn.addEventListener("click", () => step(Number(btn.getAttribute("data-step"))));
      });
      stage.querySelector("[data-close]")?.addEventListener("click", closeStage);
      stage.querySelectorAll(".rev-stage-plate img").forEach((img) => {
        img.addEventListener("error", () => {
          const box = img.closest(".rev-stage-plate");
          if (!box) return;
          box.classList.add("is-missing");
          img.remove();
          if (!box.querySelector("span")) box.insertAdjacentHTML("beforeend", "<span>暂无现场截图</span>");
        });
      });
      const first = stage.querySelector(".rev-fit.is-on") || stage.querySelector(".rev-fit") || stage.querySelector("[data-close]");
      first?.focus?.();
    }

    function onKey(event) {
      if (!openId) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        closeStage();
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        event.stopPropagation();
        step(-1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        event.stopPropagation();
        step(1);
      }
    }

    function paint() {
      const page = root.closest(".book-page");
      const it = openId && byId.get(openId);
      if (it) {
        root.innerHTML = overviewHtml() + stageHtml(it);
        if (page) page.classList.add("is-review-open");
        bindOverview();
        bindStage(it);
      } else {
        root.innerHTML = overviewHtml();
        if (page) page.classList.remove("is-review-open");
        bindOverview();
      }
    }

    if (!root._revKey) {
      root._revKey = onKey;
      document.addEventListener("keydown", onKey, true);
    }
    paint();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/review"] = init;
})(window);
