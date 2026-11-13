import { MAIN_CHANNELS, SOURCE_AUTHORITY } from '../data/channels.js'
import { methodSources as S } from '../data/methodSources.js'
import { coverageRows } from './Coverage.jsx'
import { assetSrc } from '../lib/media.js'
import { platformHref } from './Chrome.jsx'

const FONT =
  "system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif"

function isEmbed() {
  if (typeof window === 'undefined') return false
  try {
    if (new URLSearchParams(window.location.search).get('embed') === '1') return true
    return window.parent !== window
  } catch {
    return true
  }
}

function Src({ id, children }) {
  const src = S[id]
  return (
    <a className="src-link" href={src.href} target="_blank" rel="noopener noreferrer">
      {children || src.label}
    </a>
  )
}

function findCase(catalog, id) {
  for (const lang of catalog.languages) {
    const found = lang.cases.find((item) => item.id === id)
    if (found) return found
  }
  return null
}

function DrillFrame({ cap, children, className = '', kicker }) {
  return (
    <article className={`detail-page detail-page--cap logic-drill enter-item ${className}`} key={cap.id}>
      <header className="logic-drill-head">
        <p className="kicker">
          {cap.no} {kicker || cap.short}
        </p>
        <h2>{cap.full}</h2>
      </header>
      <div className="logic-figure">{children}</div>
    </article>
  )
}

export function LogicDrill({ catalog, cap }) {
  if (cap.id === 'intake') return <IntakeDrill cap={cap} />
  if (cap.id === 'screen') return <ScreenDrill catalog={catalog} cap={cap} />
  if (cap.id === 'classify') return <ClassifyDrill catalog={catalog} cap={cap} />
  if (cap.id === 'review') return <ReviewDrill catalog={catalog} cap={cap} />
  if (cap.id === 'lightup') return <LightupDrill catalog={catalog} cap={cap} />
  return (
    <DrillFrame cap={cap}>
      <div className="pending-slot">待补充</div>
    </DrillFrame>
  )
}

function ArrowDefs({ id }) {
  return (
    <defs>
      <marker id={id} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0.8L7.2 4 0 7.2Z" fill="#3EC8FF" />
      </marker>
    </defs>
  )
}

function IntakeDrill({ cap }) {
  const embed = isEmbed()
  return (
    <DrillFrame cap={cap} className="logic-drill--intake">
      <div className="intake-deep">
        <section className="drill-purpose" aria-label="目的与方法">
          <div className="drill-purpose-block">
            <p className="fig-kicker">目的</p>
            <p>把三条主渠里的页汇入输入池，供后面的初筛和人审使用。先判断的是来源值不值得进来，不是某一页好不好看。</p>
          </div>
          <div className="system-split" aria-label="两套系统不相混">
            <div className="system-card is-this">
              <p className="fig-kicker">本站</p>
              <h3>权威性</h3>
              <p>判断这个来源值不值得进入输入池。五项加权，有分才展示。</p>
            </div>
            <div className="system-card is-other">
              <p className="fig-kicker">不是这套</p>
              <h3>页面形态初筛</h3>
              <p>好看、完整页面或组件、不是孤立的引擎或 playground 照。那是下一站的规则。</p>
            </div>
          </div>
        </section>

        <svg
          className="logic-svg intake-svg"
          viewBox="0 0 1280 420"
          role="img"
          aria-label="三条主渠汇入输入池"
          style={{ fontFamily: FONT }}
        >
          <ArrowDefs id="in-arrow" />
          <text x="48" y="28" fill="#8b9098" fontSize="13" fontWeight="700" letterSpacing="0.12em">
            方法 · 主渠汇入
          </text>
          {MAIN_CHANNELS.map((ch, i) => {
            const y = 42 + i * 124
            const midY = y + 54
            return (
              <g key={ch.id}>
                <rect
                  x="40"
                  y={y}
                  width="520"
                  height="112"
                  rx="16"
                  fill="rgba(62,200,255,0.04)"
                  stroke="#3EC8FF"
                  strokeWidth="1.7"
                />
                <foreignObject x="40" y={y} width="520" height="148">
                  <div className="intake-basin" xmlns="http://www.w3.org/1999/xhtml">
                    <h3>{ch.label}</h3>
                    {ch.groups.map((g) => (
                      <p key={g.name}>
                        <span>{g.name}</span>
                        {g.items.join('　')}
                      </p>
                    ))}
                  </div>
                </foreignObject>
                <path
                  d={`M 560 ${midY} C 700 ${midY}, 780 226, 860 226`}
                  fill="none"
                  stroke="#3EC8FF"
                  strokeWidth="2"
                />
              </g>
            )
          })}

          <rect
            x="860"
            y="146"
            width="360"
            height="160"
            rx="18"
            fill="rgba(62,200,255,0.08)"
            stroke="#3EC8FF"
            strokeWidth="2"
          />
          <text x="1040" y="216" textAnchor="middle" fill="#3EC8FF" fontSize="32" fontWeight="700">
            输入池
          </text>
          <text x="1040" y="254" textAnchor="middle" fill="#8b9098" fontSize="16" fontWeight="600">
            页按条进入，不把库存加总
          </text>
        </svg>

        <section className="intake-auth" aria-label="五项权威性">
          <p className="fig-kicker">方法 · 权威性</p>
          <h3 className="intake-auth-title">值不值得让这个来源进入输入池</h3>
          <ol className="intake-factors">
            {SOURCE_AUTHORITY.map((a) => (
              <li key={a.id}>
                <div className="intake-factor-head">
                  <b>{a.name}</b>
                  <em>{a.weight}%</em>
                </div>
                <i className="intake-factor-track" aria-hidden="true">
                  <i style={{ width: `${a.weight}%` }} />
                </i>
                <p>{a.hint}</p>
              </li>
            ))}
          </ol>
          <ol className="intake-bands" aria-label="星级换算">
            <li>
              <b>4.5–5.0</b>
              <span>五星</span>
            </li>
            <li>
              <b>3.5–4.4</b>
              <span>四星</span>
            </li>
            <li>
              <b>2.5–3.4</b>
              <span>三星</span>
            </li>
            <li>
              <b>1.5–2.4</b>
              <span>两星</span>
            </li>
            <li>
              <b>0–1.4</b>
              <span>一星</span>
            </li>
          </ol>
          <p className="fig-note authority-method">
            每项 0–5，按权重加总得到 0–5 的总分（保留一位小数），再换成星级。有分时同时展示星级、总分、一句依据和五项分数。尚未打分的来源如实写「尚未按准则打分」，不编造星标或分数。观测时点以工作表为准（2026-11-11，America/New_York）。
          </p>
        </section>

        <footer className="intake-foot">
          <a
            className="logic-door"
            href={platformHref('sources/review')}
            target={embed ? '_parent' : undefined}
            rel="noopener"
          >
            打开来源清单
          </a>
        </footer>
      </div>
    </DrillFrame>
  )
}

function RejectTray({ kind }) {
  if (kind === 'engine') {
    return (
      <div className="screen-tray" aria-label="引擎孤立场景照，被滤出">
        <svg viewBox="0 0 80 62" width="80" height="62" aria-hidden="true">
          <rect width="80" height="62" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(232,233,235,0.28)" />
          <path d="M24 16l18-9 18 9v24l-18 9-18-9z" stroke="rgba(232,233,235,0.42)" fill="none" />
          <path d="M16 14l48 34M16 48l48-34" stroke="#3EC8FF" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
        <span>引擎照</span>
      </div>
    )
  }
  return (
    <div className="screen-tray" aria-label="playground 孤立场景照，被滤出">
      <svg viewBox="0 0 86 62" width="86" height="62" aria-hidden="true">
        <rect width="86" height="62" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(232,233,235,0.28)" />
        <rect x="10" y="12" width="26" height="18" rx="2" stroke="rgba(232,233,235,0.4)" fill="none" />
        <rect x="42" y="12" width="30" height="6" rx="1" fill="rgba(232,233,235,0.16)" />
        <rect x="42" y="22" width="22" height="6" rx="1" fill="rgba(232,233,235,0.16)" />
        <path d="M12 16l22 14M12 30l22-14" stroke="#3EC8FF" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <span>playground 照</span>
    </div>
  )
}

function WirePage({ label, ok }) {
  return (
    <div className={`screen-wire ${ok ? 'is-ok' : 'is-out'}`}>
      <svg viewBox="0 0 72 90" width="72" height="90" aria-hidden="true">
        <rect x="4" y="4" width="64" height="82" rx="8" fill="rgba(255,255,255,0.03)" stroke={ok ? '#3EC8FF' : 'rgba(232,233,235,0.35)'} />
        <rect x="12" y="14" width="48" height="8" rx="2" fill={ok ? 'rgba(62,200,255,0.35)' : 'rgba(232,233,235,0.16)'} />
        <rect x="12" y="28" width="48" height="28" rx="3" fill="rgba(232,233,235,0.06)" stroke="rgba(232,233,235,0.2)" />
        <rect x="12" y="62" width="30" height="6" rx="2" fill="rgba(232,233,235,0.16)" />
        <rect x="12" y="72" width="22" height="6" rx="2" fill="rgba(232,233,235,0.12)" />
        {!ok ? <path d="M10 10l52 70M10 80l52-70" stroke="#3EC8FF" strokeWidth="1.7" strokeLinecap="round" /> : null}
      </svg>
      <span>{label}</span>
    </div>
  )
}

function WireComponent({ label, ok }) {
  return (
    <div className={`screen-wire ${ok ? 'is-ok' : 'is-out'}`}>
      <svg viewBox="0 0 72 90" width="72" height="90" aria-hidden="true">
        <rect x="10" y="22" width="52" height="46" rx="10" fill="rgba(255,255,255,0.03)" stroke={ok ? '#3EC8FF' : 'rgba(232,233,235,0.35)'} />
        <circle cx="36" cy="45" r="10" fill="none" stroke={ok ? '#3EC8FF' : 'rgba(232,233,235,0.4)'} />
        {!ok ? <path d="M14 18l44 54M14 72l44-54" stroke="#3EC8FF" strokeWidth="1.7" strokeLinecap="round" /> : null}
      </svg>
      <span>{label}</span>
    </div>
  )
}

function WireOrphan() {
  return (
    <div className="screen-wire is-out">
      <svg viewBox="0 0 72 90" width="72" height="90" aria-hidden="true">
        <circle cx="36" cy="44" r="20" fill="rgba(255,255,255,0.02)" stroke="rgba(232,233,235,0.35)" />
        <path d="M28 36l16 16M28 52l16-16" stroke="#3EC8FF" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
      <span>孤立物件照</span>
    </div>
  )
}

function ScreenShot({ src, name, note, href, kind }) {
  const missing = !src
  return (
    <figure className={`screen-ex ${kind === 'pass' ? 'is-pass' : 'is-reject'}`}>
      <div className={`screen-shot-frame${missing ? ' is-missing' : ''}`}>
        <span>暂无现场截图</span>
        {src ? (
          <img
            src={src}
            alt=""
            onError={(e) => {
              const box = e.currentTarget.closest('.screen-shot-frame')
              if (box) box.classList.add('is-missing')
              e.currentTarget.remove()
            }}
          />
        ) : null}
      </div>
      <figcaption>
        <strong>{name}</strong>
        {note ? <span>{note}</span> : null}
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            打开原页 ↗
          </a>
        ) : null}
      </figcaption>
    </figure>
  )
}

function ScreenDrill({ catalog, cap }) {
  const example = findCase(catalog, cap.passedExampleId)
  const exampleSrc = assetSrc(example?.image)
  return (
    <DrillFrame cap={cap} className="logic-drill--screen">
      <div className="screen-deep">
        <section className="drill-purpose" aria-label="目的与方法">
          <div className="drill-purpose-block">
            <p className="fig-kicker">目的</p>
            <p>机器先按三条已有的页面形态规则过滤，减轻人审。拦下的是不够好看、没落在完整页面或组件里、或孤立的引擎 / playground 照。不编造被滤出的条数。</p>
          </div>
          <div className="system-split" aria-label="两套系统不相混">
            <div className="system-card is-other">
              <p className="fig-kicker">不是这套</p>
              <h3>权威性</h3>
              <p>判断来源值不值得进输入池。在上一站完成，不在这里重新打分。</p>
            </div>
            <div className="system-card is-this">
              <p className="fig-kicker">本站规则</p>
              <h3>页面形态</h3>
              <p>只看这一页：好不好看、是不是完整页面或组件、是不是孤立的引擎或 playground 照。</p>
            </div>
          </div>
        </section>

        <p className="fig-kicker screen-method-kicker">方法 · 三条规则依次看</p>
        <svg
          className="screen-path"
          viewBox="0 0 1180 86"
          role="img"
          aria-label="输入页依次经过三条规则，通过的继续向前，被滤出的离开路径"
          style={{ fontFamily: FONT }}
        >
          <ArrowDefs id="sc-arrow" />
          <rect x="8" y="22" width="70" height="44" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(232,233,235,0.35)" />
          <text x="43" y="49" textAnchor="middle" fill="#8b9098" fontSize="13" fontWeight="700">
            输入
          </text>
          <path d="M 82 44 H 118" fill="none" stroke="#3EC8FF" strokeWidth="2" markerEnd="url(#sc-arrow)" />
          {[
            { x: 126, w: 230, t: '① 好看是门槛' },
            { x: 400, w: 300, t: '② 完整页面或组件' },
            { x: 744, w: 280, t: '③ 不是孤立引擎 / playground 照' },
          ].map((g, i) => (
            <g key={g.t}>
              {i > 0 ? (
                <path
                  d={`M ${g.x - 40} 44 H ${g.x - 8}`}
                  fill="none"
                  stroke="#3EC8FF"
                  strokeWidth="2"
                  markerEnd="url(#sc-arrow)"
                />
              ) : null}
              <rect
                x={g.x}
                y="18"
                width={g.w}
                height="52"
                rx="12"
                fill="rgba(62,200,255,0.08)"
                stroke="#3EC8FF"
                strokeWidth="1.6"
              />
              <text x={g.x + g.w / 2} y="50" textAnchor="middle" fill="#e8e9eb" fontSize="15" fontWeight="700">
                {g.t}
              </text>
            </g>
          ))}
          <path d="M 1028 44 H 1070" fill="none" stroke="#3EC8FF" strokeWidth="2" markerEnd="url(#sc-arrow)" />
          <rect x="1076" y="18" width="96" height="52" rx="12" fill="rgba(62,200,255,0.16)" stroke="#3EC8FF" strokeWidth="1.8" />
          <text x="1124" y="50" textAnchor="middle" fill="#3EC8FF" fontSize="16" fontWeight="700">
            通过
          </text>
        </svg>

        <ol className="screen-rules">
          <li className="screen-rule">
            <header>
              <em>①</em>
              <h3>好看是门槛</h3>
            </header>
            <p className="screen-rule-mean">
              不够好看的输入到此离开，不进入后面的分类和人审。过了这一条，只表示过了门槛，不是自身已经做到。
            </p>
            <div className="screen-rule-split">
              <div className="screen-side is-pass">
                <p className="fig-kicker">通过</p>
                <p>达到门槛，进入后两条。</p>
              </div>
              <div className="screen-side is-out">
                <p className="fig-kicker">被滤出</p>
                <p>现有不吸收记录里，因不够好看离开的例子：</p>
                <div className="screen-ex-row">
                  <ScreenShot
                    src="../thumbs/vfx/threeui-iridis.webp"
                    name="ThreeUI · Iridis"
                    note="不吸收：感觉不够好看？"
                    href="https://threeui.com/three-js/iridis"
                    kind="reject"
                  />
                  <ScreenShot
                    name="365 Tetrahedron"
                    note="不吸收：偏演示型线框几何，不够好看。"
                    href="https://threeui.com/three-js/365-tetrahedron"
                    kind="reject"
                  />
                </div>
              </div>
            </div>
          </li>

          <li className="screen-rule">
            <header>
              <em>②</em>
              <h3>必须发生在完整页面或组件里</h3>
            </header>
            <p className="screen-rule-mean">
              视效必须落在完整页面，或可复用的组件里。没装进页面或组件的孤立物件照不过。没有另写一条「引擎 / playground」以外的第四条规则。
            </p>
            <div className="screen-wire-row">
              <WirePage label="完整页面" ok />
              <WireComponent label="组件" ok />
              <span className="screen-wire-or">被滤出</span>
              <WireOrphan />
            </div>
          </li>

          <li className="screen-rule">
            <header>
              <em>③</em>
              <h3>淘汰孤立的引擎或 playground 照</h3>
            </header>
            <p className="screen-rule-mean">
              引擎演示照、playground 里的孤立场景照离开路径，进入本站的拒收托盘。这里画的是规则本身，不编造被滤出的条数，也不把未注明原因的记录算进这一条。
            </p>
            <div className="screen-trays" aria-label="拒收托盘">
              <RejectTray kind="engine" />
              <RejectTray kind="playground" />
              <p className="screen-trays-cap">离开路径 · 不进入分类和人审</p>
            </div>
          </li>
        </ol>

        {example ? (
          <aside className="screen-pass" aria-label="通过的例子">
            <p className="screen-pass-kicker">通过</p>
            <ScreenShot
              src={exampleSrc}
              name={example.name}
              note="通过的例子，不是自身对照"
              href={example.url}
              kind="pass"
            />
          </aside>
        ) : null}
      </div>
    </DrillFrame>
  )
}

function ClassifyDrill({ catalog, cap }) {
  const c = catalog.counts
  const max = Math.max(...catalog.languages.map((l) => l.count))
  const laneH = 48
  const top = 86
  return (
    <DrillFrame cap={cap} className="logic-drill--classify">
      <div className="classify-deep">
        <section className="drill-purpose" aria-label="目的与方法">
          <div className="drill-purpose-block">
            <p className="fig-kicker">目的</p>
            <p>过了初筛的页按视效语言归入九类，供人审和视效库对照使用。动效不是一类，场景也不是主轴。</p>
          </div>
          <div className="drill-method-notes">
            <p>
              <b>方法</b>
              分类轴是九种视效语言。条数与已入库 {c.onWall} 合计一致。
            </p>
            <p>
              <b>不用场景当主轴</b>
              {c.landingPages} / {c.onWall} 是落地页，场景只作复用面的加权，不替换语言分类。
            </p>
            <p>
              <b>可修订</b>
              人审可以回流：新增、删减、合并、修改。
            </p>
          </div>
        </section>
        <svg
          className="logic-svg"
          viewBox="0 0 1280 640"
          role="img"
          aria-label="九种视效语言分类，动效不是分类轴，分类可被人审修订"
          style={{ fontFamily: FONT }}
        >
          <ArrowDefs id="cl-arrow" />
          <text x="48" y="44" fill="#8b9098" fontSize="13" fontWeight="700" letterSpacing="0.12em">
            分类轴 · 视效语言
          </text>

          <text x="74" y="330" textAnchor="middle" fill="#8b9098" fontSize="13" fontWeight="600">
            入
          </text>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x="52"
              y={292 + i * 20}
              width="26"
              height="34"
              rx="4"
              fill="rgba(255,255,255,0.03)"
              stroke="rgba(232,233,235,0.35)"
            />
          ))}

          {catalog.languages.map((lang, i) => {
            const y = top + i * laneH
            const mid = y + 20
            const barW = 36 + (lang.count / max) * 300
            return (
              <g key={lang.id}>
                <path
                  d={`M 100 330 C 170 330, 210 ${mid}, 250 ${mid}`}
                  fill="none"
                  stroke="#3EC8FF"
                  strokeWidth="1.5"
                  opacity="0.75"
                />
                <text x="260" y={y + 24} fill="#e8e9eb" fontSize="15" fontWeight="700">
                  {lang.name}
                </text>
                <rect
                  x="520"
                  y={y + 4}
                  width={barW}
                  height="32"
                  rx="8"
                  fill="rgba(62,200,255,0.12)"
                  stroke="#3EC8FF"
                  strokeWidth="1.5"
                />
                <text x={520 + barW + 16} y={y + 26} fill="#3EC8FF" fontSize="18" fontWeight="700">
                  {lang.count}
                </text>
                <path
                  d={`M ${520 + barW + 56} ${mid} C ${520 + barW + 130} ${mid}, 980 330, 1048 330`}
                  fill="none"
                  stroke="#3EC8FF"
                  strokeWidth="1.5"
                  opacity="0.75"
                />
              </g>
            )
          })}

          <rect
            x="1050"
            y="268"
            width="186"
            height="124"
            rx="16"
            fill="rgba(62,200,255,0.08)"
            stroke="#3EC8FF"
            strokeWidth="1.8"
          />
          <text x="1143" y="328" textAnchor="middle" fill="#3EC8FF" fontSize="44" fontWeight="700">
            {c.onWall}
          </text>
          <text x="1143" y="362" textAnchor="middle" fill="#8b9098" fontSize="13" fontWeight="600">
            已入库 · 与语言合计一致
          </text>

          <rect
            x="1050"
            y="70"
            width="186"
            height="96"
            rx="14"
            fill="rgba(255,255,255,0.02)"
            stroke="#2a2d32"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
          <text x="1143" y="104" textAnchor="middle" fill="#8b9098" fontSize="12" fontWeight="700" letterSpacing="0.1em">
            轴外
          </text>
          <text x="1143" y="132" textAnchor="middle" fill="#8b9098" fontSize="18" fontWeight="700">
            <tspan textDecoration="line-through">动效</tspan>
          </text>
          <text x="1143" y="154" textAnchor="middle" fill="#8b9098" fontSize="13" fontWeight="600">
            不是分类轴
          </text>

          <text x="48" y="590" fill="#8b9098" fontSize="14">
            {c.landingPages} / {c.onWall} 是落地页 · 不用场景当主轴
          </text>

          <path
            d="M 1143 392 V 530 H 260"
            fill="none"
            stroke="#3EC8FF"
            strokeWidth="1.6"
            strokeDasharray="5 6"
            className="logic-flow"
            markerEnd="url(#cl-arrow)"
          />
          <text x="700" y="554" textAnchor="middle" fill="#3EC8FF" fontSize="14" fontWeight="700">
            人审可修订 · 新增 / 删减 / 合并 / 修改
          </text>
        </svg>
      </div>
    </DrillFrame>
  )
}

function ReviewDrill({ catalog, cap }) {
  const c = catalog.counts
  return (
    <DrillFrame cap={cap} className="logic-drill--review">
      <div className="review-deep">
        <section className="drill-purpose" aria-label="目的与方法">
          <div className="drill-purpose-block">
            <p className="fig-kicker">目的</p>
            <p>人做最终判断。同一来源也要逐页看，不因来源已过权威性或初筛就整批放行。通过的注入视效库；未通过的反馈回去，用来修订初筛规则或分类体系。</p>
          </div>
          <div className="drill-method-notes">
            <p>
              <b>出口一</b>
              注入视效库 {c.onWall}。构成：视效 {c.vfxKind} · 视觉参考 {c.visualRefKind}；整页 {c.fullPage} · 组件 {c.component}。{c.withCapture} 实拍 · 缺 {c.missingCapture}。
            </p>
            <p>
              <b>出口二</b>
              反馈回流：规则修订回到机器初筛，分类修订回到视效分类（新增 / 删减 / 合并 / 修改）。
            </p>
            <p>
              <b>候审</b>
              {c.pendingReview} 条候审不计入已入库的 {c.onWall}。
            </p>
          </div>
        </section>
        <svg
          className="logic-svg"
          viewBox="0 0 1280 620"
          role="img"
          aria-label="人审有两条出口：注入视效库，以及回流修订初筛和分类。候审不计入已入库标杆"
          style={{ fontFamily: FONT }}
        >
          <ArrowDefs id="rv-arrow" />
          <text x="70" y="96" fill="#8b9098" fontSize="13" fontWeight="700" letterSpacing="0.08em">
            同一来源的页 · 逐页看
          </text>
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${70 + i * 50}, 120)`}>
              <rect width="40" height="58" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(232,233,235,0.45)" />
              <rect width="40" height="11" rx="6" fill="rgba(232,233,235,0.14)" />
            </g>
          ))}
          <path d="M 274 149 H 350" fill="none" stroke="#3EC8FF" strokeWidth="2" markerEnd="url(#rv-arrow)" />

          <rect
            x="360"
            y="110"
            width="170"
            height="80"
            rx="16"
            fill="rgba(62,200,255,0.08)"
            stroke="#3EC8FF"
            strokeWidth="1.8"
          />
          <text x="445" y="160" textAnchor="middle" fill="#e8e9eb" fontSize="24" fontWeight="700">
            人审
          </text>

          <path d="M 530 150 H 630" fill="none" stroke="#3EC8FF" strokeWidth="2" markerEnd="url(#rv-arrow)" />
          <rect
            x="640"
            y="72"
            width="300"
            height="168"
            rx="18"
            fill="rgba(62,200,255,0.08)"
            stroke="#3EC8FF"
            strokeWidth="2"
          />
          <text x="790" y="108" textAnchor="middle" fill="#8b9098" fontSize="13" fontWeight="700" letterSpacing="0.1em">
            出口一 · 注入
          </text>
          <text x="790" y="168" textAnchor="middle" fill="#3EC8FF" fontSize="58" fontWeight="700">
            {c.onWall}
          </text>
          <text x="790" y="200" textAnchor="middle" fill="#e8e9eb" fontSize="17" fontWeight="700">
            视效库
          </text>
          <text x="790" y="224" textAnchor="middle" fill="#8b9098" fontSize="13">
            {c.withCapture} 实拍 · 缺 {c.missingCapture}
          </text>
          <text x="790" y="268" textAnchor="middle" fill="#8b9098" fontSize="13">
            视效 {c.vfxKind} · 视觉参考 {c.visualRefKind}　　整页 {c.fullPage} · 组件 {c.component}
          </text>

          <path d="M 445 190 V 300" fill="none" stroke="#3EC8FF" strokeWidth="1.8" />
          <text x="445" y="286" textAnchor="middle" fill="#3EC8FF" fontSize="14" fontWeight="700">
            出口二 · 反馈回流
          </text>
          <path
            d="M 445 300 H 200"
            fill="none"
            stroke="#3EC8FF"
            strokeWidth="1.8"
            strokeDasharray="5 6"
            className="logic-flow"
            markerEnd="url(#rv-arrow)"
          />
          <path
            d="M 445 300 H 690"
            fill="none"
            stroke="#3EC8FF"
            strokeWidth="1.8"
            strokeDasharray="5 6"
            className="logic-flow"
            markerEnd="url(#rv-arrow)"
          />

          <rect
            x="70"
            y="350"
            width="250"
            height="120"
            rx="16"
            fill="rgba(62,200,255,0.04)"
            stroke="#3EC8FF"
            strokeWidth="1.6"
            strokeDasharray="5 5"
          />
          <text x="195" y="402" textAnchor="middle" fill="#3EC8FF" fontSize="20" fontWeight="700">
            规则修订
          </text>
          <text x="195" y="432" textAnchor="middle" fill="#8b9098" fontSize="14" fontWeight="600">
            回到机器初筛
          </text>

          <rect
            x="560"
            y="350"
            width="250"
            height="120"
            rx="16"
            fill="rgba(62,200,255,0.04)"
            stroke="#3EC8FF"
            strokeWidth="1.6"
            strokeDasharray="5 5"
          />
          <text x="685" y="402" textAnchor="middle" fill="#3EC8FF" fontSize="20" fontWeight="700">
            分类修订
          </text>
          <text x="685" y="432" textAnchor="middle" fill="#8b9098" fontSize="14" fontWeight="600">
            新增 / 删减 / 合并 / 修改
          </text>

          <rect
            x="1000"
            y="330"
            width="220"
            height="160"
            rx="16"
            fill="none"
            stroke="#3EC8FF"
            strokeWidth="1.7"
            strokeDasharray="6 5"
          />
          <text x="1110" y="392" textAnchor="middle" fill="#3EC8FF" fontSize="48" fontWeight="700">
            {c.pendingReview}
          </text>
          <text x="1110" y="430" textAnchor="middle" fill="#e8e9eb" fontSize="18" fontWeight="700">
            候审
          </text>
          <text x="1110" y="458" textAnchor="middle" fill="#8b9098" fontSize="14" fontWeight="600">
            不计入 {c.onWall}
          </text>
        </svg>
      </div>
    </DrillFrame>
  )
}

function LightupDrill({ catalog, cap }) {
  const c = catalog.counts
  const rows = coverageRows(catalog)
  const unseen = rows.filter((r) => r.state === 'unseen')
  const post = rows.find((r) => r.id === 'post')
  return (
    <DrillFrame cap={cap} className="logic-drill--lightup" kicker="点亮 / 排期">
      <div className="lightup-figure">
        <section className="drill-purpose lightup-purpose" aria-label="目的">
          <div className="drill-purpose-block">
            <p className="fig-kicker">目的</p>
            <p>对照自身时分三层，再按杠杆排期。点亮、做了但不够、接近标杆，三层都不等于已掌握。有限时间里，先按能不能在目标场景里跑，再按区分度与复用面决定先补什么。</p>
          </div>
        </section>
        <section className="lightup-self" aria-label="对照自身的三层">
          <p className="fig-kicker">方法 · 对照自身</p>
          <div className="layer-stack">
            <div className="layer-band is-empty">
              <span className="layer-name">接近标杆</span>
              <b>0</b>
            </div>
            <div className="layer-band is-accent">
              <span className="layer-name">做了但不够</span>
              <b>{c.attempted}</b>
              <em>
                {c.attemptedPages} 页 / {c.reviewed} 页抽样
              </em>
            </div>
            <div className="layer-band is-empty">
              <span className="layer-name">点亮</span>
              <b>0</b>
            </div>
          </div>
          <p className="struck-line">
            <s>已掌握</s>
            <span>不是一层</span>
          </p>
          <div className="compare-slot" aria-label="对照">
            对照：待补充
          </div>
          <ul className="lang-chips" aria-label="九种语言覆盖">
            {rows.map((row) => (
              <li key={row.id} className={`lang-chip is-${row.state}`}>
                <span className="lang-chip-name">{row.short}</span>
                <span className="lang-chip-n">
                  {row.state === 'attempted' ? `做了但不够 ${row.attempted}` : '未见'}
                </span>
              </li>
            ))}
          </ul>
          {post ? (
            <p className="fig-note">
              图像与视频后期 {post.attempted} 条是产品演示样张，不是页内后期语言。未见：
              {unseen.map((r) => r.short).join('、')}。
            </p>
          ) : null}
        </section>

        <section className="lightup-plan" aria-label="排期方法">
          <p className="fig-kicker">方法 · 排期</p>
          <ol className="plan-flow">
            <li>
              <span className="plan-name">门禁</span>
              <p>目标场景跑不起来，先不进名单</p>
            </li>
            <li className="plan-arrow" aria-hidden="true" />
            <li>
              <span className="plan-name">价值</span>
              <p className="value-eq">
                <em>区分度</em>
                <span>×</span>
                <em>复用面</em>
              </p>
            </li>
            <li className="plan-arrow" aria-hidden="true" />
            <li>
              <span className="plan-name">投入</span>
              <p>决定时机，不决定价值</p>
            </li>
            <li className="plan-arrow" aria-hidden="true" />
            <li>
              <span className="plan-name">分版注入</span>
              <p>按优先级分批进入视效库，不编造批次条数</p>
            </li>
          </ol>
          <div className="defn-row" aria-label="工作定义">
            <p className="fig-kicker">工作定义</p>
            <ul className="defn-marks">
              <li>
                <b>①</b> 是否目标 H5 / Web 的默认能力
              </li>
              <li>
                <b>②</b> 实现是否超出标准 CSS
              </li>
              <li>
                <b>③</b> 出现率只作校验
              </li>
            </ul>
            <p className="defn-verdict">
              ① 且 ② 都基础 → <em>基础</em>
              <span className="defn-sep">/</span>
              有一条高阶 → <em>高阶</em>
            </p>
            <p className="fig-note">
              「把效果去掉，页面还能否成立」区分核心或装饰，不用来判定高阶。场景可给复用面加权，但不替换语言分类。依据{' '}
              <Src id="ves" />、<Src id="appleHig" />、<Src id="hbr" />。
            </p>
          </div>
        </section>
      </div>
    </DrillFrame>
  )
}


export function WallDrill({ catalog }) {
  const c = catalog.counts
  const embed = isEmbed()
  return (
    <article className="logic-drill logic-drill--wall enter-item">
      <header className="logic-drill-head">
        <p className="kicker">05 视效库</p>
        <h2>已入库标杆是对照样本，不是来源库全集，也不是自身已经做到的程度</h2>
      </header>
      <div className="logic-figure wall-figure">
        <div className="wall-hero">
          <b>{c.onWall}</b>
          <span>已入库标杆</span>
          <p>
            {c.withCapture} 实拍 · 缺 {c.missingCapture}
          </p>
        </div>
        <ul className="wall-facts">
          <li>
            构成：视效 {c.vfxKind} · 视觉参考 {c.visualRefKind}；整页 {c.fullPage} · 组件 {c.component}
          </li>
          <li>地图上的 {c.onWall} 只是已入库标杆，不是来源库加总，也不计入候审 {c.pendingReview}。</li>
          <li>
            自身覆盖在脚注里另记：点亮 {c.present}，做了但不够 {c.attempted}（{c.attemptedPages} 页 / {c.reviewed} 页抽样），接近标杆 {c.nearBenchmark}。
            <s>已掌握</s>不是一层。
          </li>
        </ul>
        <a
          className="logic-door"
          href={platformHref('vfx/overview')}
          target={embed ? '_parent' : undefined}
          rel="noopener"
        >
          打开视效库
        </a>
      </div>
    </article>
  )
}
