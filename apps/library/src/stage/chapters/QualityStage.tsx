/**
 * 质量章节：2 步。第 1 步只讲评价尺度，第 2 步给出覆盖结论。
 * 通用文案关闭，由 QualityOverlay 接管；124 条标杆在本层隐去，不和现状抽样混用。
 */
import { DUR, COPY_DELAY } from '../../motion/tokens';
import { gridLayout, type LayoutFn, type Placement } from '../layout';
import type { ChapterOverlayProps, PlacementHint } from '../stageApi';
import { QualityOverlay } from '../quality/QualityOverlay';
import { Linger, useReadyAfter } from './linger';
import './chapters.css';

export const QUALITY_STEPS = 2;

export function qualityStepLayout(_step: number): LayoutFn {
  return (f) => {
    const a = gridLayout(f);
    for (const p of a.placements.values()) p.opacity = 0;
    return {
      placements: new Map([...a.placements].map(([id, p]) => [id, { ...p, inert: true } as Placement & PlacementHint])),
    };
  };
}

export function QualityStage({ step, frame, focused, leavingTo }: ChapterOverlayProps) {
  const ready = useReadyAfter(COPY_DELAY * 1000);
  return (
    <Linger id="quality" ms={(DUR.fade + COPY_DELAY) * 1000 + 80} leavingTo={leavingTo}>
      {(leaving) => (
        <QualityOverlay
          step={leaving ? -1 : step}
          frame={frame}
          focused={focused}
          ready={ready && !leaving && !focused}
        />
      )}
    </Linger>
  );
}
