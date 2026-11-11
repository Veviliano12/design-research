/* 设计研究 · 视效来源三页。按文档层级分组，不把所有来源平铺在一页。
 * 未读（待审）不等于不吸收。不编造文献里没有的条目。 */
(function (global) {
  "use strict";

  const PAGE_SIZE = 40;
  const STATUS_CN = { absorbed: "已吸收", rejected: "不吸收", pending: "待审" };
  const PAGE_BLOCKS = {
    "vfx/sources/official": [
      {
        id: "official",
        intro: "苹果、鸿蒙、谷歌、微软的官方设计规范与产品页。"
      },
      {
        id: "awards",
        intro: "权威评选与高视效工作室。放在本页是为了和官方渠道一起构成已审的专业来源，而不是把它们算成官方规范。"
      },
      {
        id: "product",
        intro: "面向使用的产品页、配置器，以及已被反复引用的经典实验。"
      }
    ],
    "vfx/sources/oss": [
      {
        id: "threeui",
        intro: "Meng To 的 ThreeUI 组件与落地页，单独成组，不混进其他渠道。"
      },
      {
        id: "opensource",
        intro: "Chrome Experiments、Codrops Webzibition、p5aholic 等开源或实验图库。"
      },
      {
        id: "gallery",
        intro: "MUUUUU、mesh3d、HOVERSTAT.ES、Berkeley 案例库等图库渠道。"
      }
    ],
    "vfx/sources/x": [
      {
        id: "x",
        intro: "从 X 收获的视效 / 动效推文，以及来源标为 X 的站点。推文链接和外部站点链接分开标注。"
      }
    ]
  };

  function hydrate(it) {
    const o = Object.assign({}, it);
    o.channels = o.channels && o.channels.length ? o.channels : [o.channel];
    o.note = o.note || "";
    o.studio = o.studio || "";
    o.author_name = o.author_name || o.author || "";
    o.source_detail = o.source_detail || "";
    o.thumb = o.thumb || "";
    if (!o.thumb_kind) {
      o.thumb_kind = o.thumb ? (String(o.thumb).indexOf("http") === 0 ? "remote" : "local") : "none";
    }
    return o;
  }

  function collectItems() {
    const list = []
      .concat(global.VFX_LIT_CORE || [], global.VFX_LIT_SITES || [], global.VFX_LIT_X || [])
      .map(hydrate);
    return list;
  }

  function countsOf(list) {
    const c = { total: list.length, absorbed: 0, rejected: 0, pending: 0 };
    list.forEach((it) => {
      c[it.status] = (c[it.status] || 0) + 1;
    });
    return c;
  }

  function statusClass(st) {
    if (st === "absorbed") return "is-absorbed";
    if (st === "rejected") return "is-rejected";
    return "is-pending";
  }

  function init(route) {
    const U = global.VfxUtil;
    const root = document.querySelector("[data-vfx-root='sources']");
    if (!root || !U) return;

    const plan = PAGE_BLOCKS[route];
    if (!plan) {
      root.querySelector("[data-vfx-body]").innerHTML = '<p class="vfx-empty-page">未知的来源页。</p>';
      return;
    }

    const all = collectItems();
    const blocksMeta = new Map((global.VFX_LIT_BLOCKS || []).map((b) => [b.id, b]));
    const byId = new Map();

    const state = { filter: "all", q: "", more: {} };

    function pageItems() {
      const ids = new Set(plan.map((b) => b.id));
      return all.filter((it) => ids.has(it.block));
    }

    function matches(it) {
      if (state.filter !== "all" && it.status !== state.filter) return false;
      if (state.q) {
        const q = state.q.toLowerCase();
        const blob = [
          it.name,
          it.url,
          it.channel,
          (it.channels || []).join(" "),
          it.source_detail,
          it.studio,
          it.author_name,
          it.excerpt,
          it.note,
          it.external_url
        ]
          .join("\n")
          .toLowerCase();
        if (blob.indexOf(q) === -1) return false;
      }
      return true;
    }

    function channelOrder(blockId, items) {
      const seen = [];
      items.forEach((it) => {
        const ch = it.channel || "未分组";
        if (!seen.includes(ch)) seen.push(ch);
      });
      return seen;
    }

    function rowRich(it) {
      const thumb = U.thumbButton(it);
      const stu = it.studio || it.author_name;
      const meta = [
        `<span class="vfx-st ${statusClass(it.status)}">${STATUS_CN[it.status] || "待审"}</span>`
      ];
      if (stu) meta.push(`<span>${U.esc(stu)}</span>`);
      if (it.source_detail) meta.push(`<span>${U.esc(it.source_detail)}</span>`);
      const reason =
        it.status === "rejected" && it.note
          ? `<p class="reason">不吸收原因：${U.esc(it.note)}</p>`
          : it.note
            ? `<p class="reason">${U.esc(it.note)}</p>`
            : "";
      const links = [];
      if (it.url) {
        links.push(`<a class="go" href="${U.esc(it.url)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`);
      }
      if (it.external_url && it.external_url !== it.url) {
        links.push(`<a class="go" href="${U.esc(it.external_url)}" target="_blank" rel="noopener noreferrer">相关站点 ↗</a>`);
      }
      return `<article class="vfx-src-row" data-vfx-id="${U.esc(it.id)}">
        ${thumb}
        <div>
          <h5>${U.esc(it.name)}</h5>
          <div class="meta">${meta.join("")}</div>
          ${reason}
          ${links.join(" ")}
        </div>
      </article>`;
    }

    function rowLine(it) {
      const reason =
        it.status === "rejected" && it.note
          ? `<span class="reason"> · 不吸收原因：${U.esc(it.note)}</span>`
          : "";
      const href = it.url || it.external_url || "";
      const name = href
        ? `<a class="name" href="${U.esc(href)}" target="_blank" rel="noopener noreferrer">${U.esc(it.name)}</a>`
        : `<span class="name">${U.esc(it.name)}</span>`;
      const ext = href
        ? `<a class="ext" href="${U.esc(href)}" target="_blank" rel="noopener noreferrer">打开原页 ↗</a>`
        : "";
      return `<div class="vfx-src-line">
        <span class="vfx-st ${statusClass(it.status)}">${STATUS_CN[it.status] || "待审"}</span>
        <span>${name}${reason}</span>
        ${ext}
      </div>`;
    }

    function renderToolbar(visible, total) {
      const host = root.querySelector("[data-vfx-tabs]");
      const chips = [
        ["all", "全部", total],
        ["absorbed", "已吸收", countsOf(pageItems()).absorbed],
        ["rejected", "不吸收", countsOf(pageItems()).rejected],
        ["pending", "待审", countsOf(pageItems()).pending]
      ];
      host.innerHTML = chips
        .map(([id, label, n]) => {
          const on = state.filter === id ? " is-on" : "";
          return `<button type="button" class="vfx-tab press${on}" data-filter="${id}" aria-pressed="${state.filter === id}">${label}<span class="n">${n}</span></button>`;
        })
        .join("");
      const qel = root.querySelector("[data-vfx-q]");
      if (qel && qel.value !== state.q) qel.value = state.q;
      const hint = root.querySelector("[data-vfx-count]");
      if (hint) {
        hint.textContent =
          visible === total
            ? `本页 ${total} 条。待审只表示尚未下结论，不等于不吸收。`
            : `正在显示 ${visible} / ${total} 条。待审只表示尚未下结论，不等于不吸收。`;
      }
    }

    function render(opts) {
      const keepScroll = opts && opts.keepScroll;
      const scroller = document.getElementById("doc");
      const saved = keepScroll && scroller ? scroller.scrollTop : 0;
      const body = root.querySelector("[data-vfx-body]");
      const scoped = pageItems();
      const visibleAll = scoped.filter(matches);
      renderToolbar(visibleAll.length, scoped.length);

      const toc = plan
        .map((b) => {
          const meta = blocksMeta.get(b.id);
          const n = scoped.filter((it) => it.block === b.id).length;
          return `<li><button type="button" class="press" data-jump="src-${U.esc(b.id)}">${U.esc((meta && meta.name) || b.id)}</button><span class="n">${n}</span></li>`;
        })
        .join("");

      const sections = plan
        .map((b) => {
          const meta = blocksMeta.get(b.id);
          const name = (meta && meta.name) || b.id;
          const desc = b.intro || (meta && meta.desc) || "";
          const blockItems = scoped.filter((it) => it.block === b.id);
          const vis = blockItems.filter(matches);
          const channels = channelOrder(b.id, vis);
          const chHtml = channels
            .map((ch) => {
              const items = vis.filter((it) => (it.channel || "未分组") === ch);
              if (!items.length) return "";
              const c = countsOf(items);
              const key = b.id + "::" + ch;
              const shownN = state.more[key] || PAGE_SIZE;
              const shown = items.slice(0, shownN);
              const rich = shown.some((it) => U.hasThumb(it) || it.note);
              shown.forEach((it) => byId.set(it.id, it));
              const list = shown.map((it) => (rich || U.hasThumb(it) ? rowRich(it) : rowLine(it))).join("");
              const more =
                items.length > shown.length
                  ? `<button type="button" class="vfx-more press" data-more="${U.esc(key)}">还有 ${items.length - shown.length} 条，继续显示</button>`
                  : "";
              const sid = "src-" + b.id + "-" + ch;
              return `<section class="vfx-ch" id="${U.esc(sid)}">
                <h4>${U.esc(ch)}<span class="n">${items.length}</span></h4>
                <p class="stats">已吸收 ${c.absorbed} · 不吸收 ${c.rejected} · 待审 ${c.pending}</p>
                <div class="${rich || items.some((it) => U.hasThumb(it)) ? "vfx-src-list" : ""}">${list}</div>
                ${more}
              </section>`;
            })
            .join("");
          const empty = vis.length
            ? chHtml
            : '<p class="vfx-empty-page">这一组里没有符合当前筛选的条目。</p>';
          return `<section class="vfx-block" id="src-${U.esc(b.id)}">
            <h3>${U.esc(name)}</h3>
            <p class="lead">${U.esc(desc)}</p>
            ${empty}
          </section>`;
        })
        .join("");

      body.innerHTML = `<ul class="vfx-toc">${toc}</ul>${sections}`;

      body.querySelectorAll(".vfx-thumb img").forEach((img) => {
        img.addEventListener("error", () => {
          const btn = img.closest(".vfx-thumb");
          if (!btn) return;
          btn.classList.add("is-missing");
          img.remove();
          btn.appendChild(document.createTextNode("暂无截图"));
        });
      });
      if (keepScroll && scroller) scroller.scrollTop = saved;
    }

    const tabs = root.querySelector("[data-vfx-tabs]");
    tabs.addEventListener("click", (e) => {
      const b = e.target.closest("[data-filter]");
      if (!b) return;
      state.filter = b.getAttribute("data-filter");
      state.more = {};
      render();
    });
    const qel = root.querySelector("[data-vfx-q]");
    if (qel) {
      let t = 0;
      qel.addEventListener("input", () => {
        clearTimeout(t);
        t = setTimeout(() => {
          state.q = qel.value.trim();
          state.more = {};
          render();
        }, 160);
      });
    }
    const body = root.querySelector("[data-vfx-body]");
    body.addEventListener("click", (e) => {
      const jump = e.target.closest("[data-jump]");
      if (jump) {
        const el = document.getElementById(jump.getAttribute("data-jump"));
        const doc = document.getElementById("doc");
        if (el && doc) {
          const top = el.getBoundingClientRect().top - doc.getBoundingClientRect().top + doc.scrollTop - 8;
          doc.scrollTo({ top, behavior: "smooth" });
        }
        return;
      }
      const more = e.target.closest("[data-more]");
      if (!more) return;
      const key = more.getAttribute("data-more");
      state.more[key] = (state.more[key] || PAGE_SIZE) + PAGE_SIZE;
      render({ keepScroll: true });
    });

    U.Hover.bind(body, (card) => {
      const it = byId.get(card.getAttribute("data-vfx-id"));
      if (!it) return null;
      const src = it.studio || it.author_name || it.channel || "";
      const meta = [];
      if (src) meta.push(src);
      meta.push(STATUS_CN[it.status] || "待审");
      if (it.map && it.map.scenes && it.map.scenes.length) meta.push(it.map.scenes.join("、"));
      if (it.map && it.map.scale) meta.push(it.map.scale);
      const extra = it.status === "rejected" && it.note
        ? `<div class="why">不吸收原因：${U.esc(it.note)}</div>`
        : "";
      return {
        id: it.id,
        name: it.name,
        url: it.url,
        image: U.thumbSrc(it, true),
        meta,
        extraHtml: extra
      };
    });

    render();
  }

  global.VfxPages = global.VfxPages || {};
  global.VfxPages["vfx/sources/official"] = () => init("vfx/sources/official");
  global.VfxPages["vfx/sources/oss"] = () => init("vfx/sources/oss");
  global.VfxPages["vfx/sources/x"] = () => init("vfx/sources/x");
})(window);
