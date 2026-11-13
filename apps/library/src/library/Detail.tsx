import { useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from 'react';
import { gsap, prefersReducedMotion } from '../motion/gsap';
import { DUR, EASE } from '../motion/tokens';
import { artifactFor, type CaseArtifact, type CodeArtifact, type SourceNote } from './data/artifacts';
import { OWN_BY_ID, WALL_BY_ID, type FocusTarget } from './data/items';
import { platformUrl } from './embed';

interface Props {
  target: FocusTarget;
  onClose: () => void;
}

export function Detail({ target, onClose }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const plate = useRef<HTMLElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useLayoutEffect(() => {
    setFailed(false);
    const el = root.current;
    const board = plate.current;
    const text = copy.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      if (board) gsap.set(board, { opacity: 1, scale: 1 });
      if (text) gsap.set(text, { opacity: 1, y: 0 });
      return;
    }
    gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: DUR.fade, ease: EASE.out.gsap });
    if (board) {
      gsap.fromTo(
        board,
        { opacity: 0, scale: 1.035 },
        { opacity: 1, scale: 1, duration: DUR.move, ease: EASE.move.gsap },
      );
    }
    if (text) {
      gsap.fromTo(
        text,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: DUR.fade, ease: EASE.out.gsap, delay: 0.3 },
      );
    }
    return () => {
      gsap.killTweensOf(el);
      if (board) gsap.killTweensOf(board);
      if (text) gsap.killTweensOf(text);
    };
  }, [target.id, target.kind]);

  if (target.kind === 'own') {
    const item = OWN_BY_ID.get(target.id);
    if (!item) return null;
    const src = item.thumb && !failed ? platformUrl(item.thumb) : null;
    return (
      <Stage
        root={root}
        plate={plate}
        copy={copy}
        title={item.title}
        kicker="做了但不够"
        line={`${item.language} · 自身抽样，不计入 124`}
        note={item.note}
        src={src}
        missing={!src}
        layout="overlay"
        artifactKind="empty"
        qaOwn
        onClose={onClose}
        onImgError={() => setFailed(true)}
        material={<EmptyNote body="这条是自身抽样，没有收入可展示的源码或 skill。" />}
      />
    );
  }

  const item = WALL_BY_ID.get(target.id);
  if (!item) return null;
  const missing = item.missingCapture || failed || !item.full;
  const src = !missing && item.full ? platformUrl(item.full) : null;
  const artifact = artifactFor(item.id);
  const isCode = artifact?.kind === 'code';
  const kicker = missing ? '暂无现场截图' : '实拍截图';
  const line = [item.studio || '未标注工作室', item.language, item.scenes.join('、') || '未标注', item.scale]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <Stage
      root={root}
      plate={plate}
      copy={copy}
      title={item.title}
      kicker={kicker}
      line={line}
      note={missing ? '暂无现场截图，不使用官方预览静帧或视频帧冒充。' : undefined}
      reason={!missing && !isCode ? item.reason : undefined}
      src={src}
      missing={missing}
      layout={isCode ? 'stage-code' : 'overlay'}
      artifactKind={artifact ? artifact.kind : 'empty'}
      caseId={item.id}
      url={item.url}
      onClose={onClose}
      onImgError={() => setFailed(true)}
      material={
        isCode ? (
          <CodePlate artifact={artifact as CodeArtifact} />
        ) : (
          <HonestNote artifact={artifact} />
        )
      }
    />
  );
}

interface StageProps {
  root: RefObject<HTMLDivElement | null>;
  plate: RefObject<HTMLElement | null>;
  copy: RefObject<HTMLDivElement | null>;
  title: string;
  kicker: string;
  line: string;
  note?: string;
  reason?: string;
  src: string | null;
  missing: boolean;
  layout: 'overlay' | 'stage-code';
  artifactKind: string;
  caseId?: string;
  url?: string;
  qaOwn?: boolean;
  onClose: () => void;
  onImgError: () => void;
  material: ReactNode;
}

function Stage(props: StageProps) {
  const {
    root, plate, copy, title, kicker, line, note, reason, src, missing,
    layout, artifactKind, caseId, url, qaOwn, onClose, onImgError, material,
  } = props;
  return (
    <div
      ref={root}
      className="lib-detail"
      data-qa="detail"
      data-qa-own={qaOwn ? '1' : undefined}
      data-qa-case={caseId}
      data-qa-missing={missing ? '1' : '0'}
      data-qa-artifact={artifactKind}
      data-qa-layout={layout}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button type="button" className="lib-detail-veil" aria-label="关闭样例" onClick={onClose} />
      <figure ref={plate} className="lib-detail-frame" data-qa="detail-frame">
        {src ? (
          <img src={src} alt="" onError={onImgError} />
        ) : (
          <div className="lib-detail-plate">暂无现场截图</div>
        )}
      </figure>
      <div className="lib-detail-scrim" aria-hidden="true" />
      <div ref={copy} className="lib-detail-copy">
        <p className="lib-detail-kicker">{kicker}</p>
        <h2>{title}</h2>
        <p className="lib-detail-line">{line}</p>
        {note && <p className="lib-detail-note">{note}</p>}
        {reason && <p className="lib-detail-reason">{reason}</p>}
        {layout === 'overlay' && material}
        {url && (
          <p className="lib-detail-origin">
            <a href={url} target="_blank" rel="noreferrer">
              打开原站
            </a>
          </p>
        )}
      </div>
      {layout === 'stage-code' && material}
      <button type="button" className="lib-detail-dismiss" onClick={onClose}>
        关闭 <span>Esc</span>
      </button>
    </div>
  );
}

function EmptyNote({ body }: { body: string }) {
  return (
    <p className="lib-detail-material" data-qa="detail-artifact">
      {body}
    </p>
  );
}

function HonestNote({ artifact }: { artifact: CaseArtifact | null }) {
  if (!artifact || artifact.kind === 'code') {
    return (
      <p className="lib-detail-material" data-qa="detail-artifact">
        查过之后，这条没有可展示的公开源码，也不编造样例。
      </p>
    );
  }
  const note = artifact as SourceNote;
  const label =
    note.kind === 'official-only' ? '源码在官方' : note.kind === 'prompt-only' ? '公开页仅有 prompt' : '暂无公开源码';
  return (
    <div className="lib-detail-material" data-qa="detail-artifact">
      <p className="lib-detail-material-kicker">{label}</p>
      <p>{note.body}</p>
      {note.extraUrl && note.extraLabel && (
        <p>
          <a href={note.extraUrl} target="_blank" rel="noreferrer">
            {note.extraLabel}
          </a>
        </p>
      )}
    </div>
  );
}

function CodePlate({ artifact }: { artifact: CodeArtifact }) {
  return (
    <aside className="lib-detail-codeplate" data-qa="detail-artifact">
      <p className="lib-detail-code-kicker">
        源码摘录 <span>{artifact.filename}</span>
      </p>
      <pre className="lib-detail-code">
        <code>{artifact.excerpt}</code>
      </pre>
      <p className="lib-detail-attr">
        摘自 {artifact.attribution} · {artifact.license}
        <a href={artifact.fileUrl} target="_blank" rel="noreferrer">
          查看完整源码
        </a>
      </p>
    </aside>
  );
}
