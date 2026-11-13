import { isEmbedded, platformHash } from './embed';

export type DeviceKind = 'desktop' | 'phone';

interface Props {
  playing: boolean;
  status: string;
  device: DeviceKind;
  onPlay: () => void;
  onReplay: () => void;
  onDevice: (device: DeviceKind) => void;
}

const parent = isEmbedded ? '_parent' : undefined;
const rel = isEmbedded ? 'noopener' : undefined;

export function Chrome({ playing, status, device, onPlay, onReplay, onDevice }: Props) {
  return (
    <>
      <header className="lib-topbar">
        <nav className="lib-tabs" aria-label="章节">
          <span className="lib-tab is-current">视效库</span>
          <a className="lib-tab" href={platformHash('vfx/logic')} target={parent} rel={rel}>
            研究逻辑
          </a>
          <a className="lib-tab" href={platformHash('sources/review')} target={parent} rel={rel}>
            来源
          </a>
        </nav>
      </header>

      <div className="lib-devices" role="group" aria-label="设备">
        <button
          type="button"
          className={`lib-device${device === 'desktop' ? ' is-on' : ''}`}
          aria-pressed={device === 'desktop'}
          aria-label="桌面"
          data-qa="device-desktop"
          onClick={() => onDevice('desktop')}
        >
          <MonitorIcon />
        </button>
        <button
          type="button"
          className={`lib-device${device === 'phone' ? ' is-on' : ''}`}
          aria-pressed={device === 'phone'}
          aria-label="移动端"
          data-qa="device-phone"
          onClick={() => onDevice('phone')}
        >
          <PhoneIcon />
        </button>
      </div>

      <footer className="lib-deckbar">
        <div className="lib-deck-left">
          <button
            type="button"
            className={`lib-deck-btn${playing ? ' is-on' : ''}`}
            aria-label={playing ? '暂停' : '播放'}
            data-qa="play"
            onClick={onPlay}
          >
            {playing ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button type="button" className="lib-deck-btn" aria-label="重播" data-qa="replay" onClick={onReplay}>
            <ReplayIcon />
          </button>
          <span className="lib-deck-status">{status}</span>
        </div>
        <nav className="lib-chapters" aria-label="章节进度">
          <span className="lib-chapter is-current">01 视效库</span>
          <a className="lib-chapter" href={platformHash('vfx/logic')} target={parent} rel={rel}>
            02 研究逻辑
          </a>
          <a className="lib-chapter" href={platformHash('sources/review')} target={parent} rel={rel}>
            03 来源
          </a>
        </nav>
        <div className="lib-wordmark">设计研究</div>
      </footer>
    </>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.6" />
      <path d="M8 20h8M12 16v4" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="8" y="3.5" width="8" height="17" rx="1.6" />
      <path d="M11 17.7h2" strokeLinecap="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M9 7.2v9.6l8-4.8z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor">
      <path d="M8 7h3v10H8zM13 7h3v10h-3z" />
    </svg>
  );
}

function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M7.2 8.2A7 7 0 1 1 5 12" strokeLinecap="round" />
      <path d="M7.2 4.8v3.8H11" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
