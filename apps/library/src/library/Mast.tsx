import { ALL_SCALES, ALL_SCENES, SCENE_CHIPS, STATS } from './data/items';
import { platformHash, isEmbedded } from './embed';
import { useCountUp } from './hooks';

interface Props {
  settled: boolean;
  scene: string;
  scale: string;
  onScene: (scene: string) => void;
  onScale: (scale: string) => void;
}

const SWITCH = [
  { route: 'sources/review', label: '来源' },
  { route: 'vfx/logic', label: '研究逻辑' },
  { route: 'vfx/preview', label: '候审' },
] as const;

export function Mast({ settled, scene, scale, onScene, onScale }: Props) {
  const wall = useCountUp(STATS.benchmarkCount, settled);
  const shots = useCountUp(STATS.capturedCount, settled);
  const attempted = useCountUp(STATS.attempted, settled);

  return (
    <>
      <div className="lib-top">
        <div className="lib-mast" data-qa="stats">
          <div className="lib-stat">
            <span className="lib-stat-num is-accent">{wall}</span>
            <span className="lib-stat-label">已入库</span>
          </div>
          <div className="lib-stat">
            <span className="lib-stat-num">{shots}</span>
            <span className="lib-stat-label">张实拍截图</span>
          </div>
          <div className="lib-coverage">
            <span>
              点亮 <b className="is-zero">{STATS.present}</b>
            </span>
            <span>·</span>
            <span>
              接近标杆 <b className="is-zero">{STATS.nearBenchmark}</b>
            </span>
            <span>·</span>
            <span>
              做了但不够 <b>{attempted}</b>
            </span>
          </div>
        </div>
        <nav className="lib-switch" aria-label="平台去路">
          {SWITCH.map((item) => (
            <a
              key={item.route}
              href={platformHash(item.route)}
              target={isEmbedded ? '_parent' : undefined}
              rel={isEmbedded ? 'noopener' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="lib-filters" data-qa="filters">
        <button
          type="button"
          className={`lib-chip${scene === ALL_SCENES ? ' is-on' : ''}`}
          onClick={() => onScene(ALL_SCENES)}
        >
          全部场景
        </button>
        {SCENE_CHIPS.map((name) => (
          <button
            key={name}
            type="button"
            className={`lib-chip${scene === name ? ' is-on' : ''}`}
            onClick={() => onScene(scene === name ? ALL_SCENES : name)}
          >
            {name}
          </button>
        ))}
        <button
          type="button"
          className={`lib-chip${scale === ALL_SCALES ? ' is-on' : ''}`}
          onClick={() => onScale(ALL_SCALES)}
        >
          全部尺度
        </button>
        {(['整页', '组件'] as const).map((name) => (
          <button
            key={name}
            type="button"
            className={`lib-chip${scale === name ? ' is-on' : ''}`}
            onClick={() => onScale(scale === name ? ALL_SCALES : name)}
          >
            {name}
          </button>
        ))}
      </div>
    </>
  );
}
