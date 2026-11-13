/**
 * Single token source for color, type, motion, nav height, and overview geometry.
 * CSS must only read these via custom properties; do not retell the numbers in CSS.
 */
export const tokens = {
  color: {
    bg: '#0e0f11',
    raised: '#17191c',
    line: '#2a2d32',
    text: '#e8e9eb',
    muted: '#8b9098',
    mutedSoft: 'rgb(255 255 255 / 0.58)',
    accent: '#3EC8FF',
    cardBorder: 'rgb(255 255 255 / 0.13)',
    cardBg: 'rgb(255 255 255 / 0.03)',
    cardHoverBg: 'rgb(255 255 255 / 0.05)',
    closeBg: 'rgb(14 15 17 / 0.72)',
    white: '#ffffff',
  },
  type: {
    fontSans:
      "system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    fontTitle:
      "'Helvetica Neue', Arial, system-ui, -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    subtitleSize: '0.8125rem',
    subtitleWeight: '700',
    subtitleTracking: '0.12em',
    titleSize: 'clamp(2rem, 4.2vw, 3.25rem)',
    titleWeight: '700',
    titleTracking: '-0.04em',
    titleLeading: '1.15',
    cardTitleSize: 'clamp(1rem, 1.45vw, 1.25rem)',
    cardTitleWeight: '700',
    captionSize: '0.8125rem',
    captionLeading: '1.5',
  },
  motion: {
    chapterEnterMs: 420,
    chapterEnterDelayMs: 160,
    chapterEnterEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    chapterEnterTravelPx: 8,
    itemEnterMs: 520,
    itemEnterEase: 'cubic-bezier(0.16, 1, 0.3, 1)',
    itemEnterTravelPx: 16,
    categoryStaggerBaseMs: 180,
    categoryStaggerStepMs: 120,
    sceneStaggerBaseMs: 80,
    sceneStaggerStepMs: 100,
    variantStaggerBaseMs: 120,
    variantStaggerStepMs: 55,
    variantHeroDelayMs: 40,
    crossfadeMs: 450,
    crossfadeEase: 'cubic-bezier(0.22, 1, 0.36, 1)',
    chapterLeaveHoldMs: 700,
    chapterChangeFadeMs: 200,
    hoverMs: 200,
    dashLoopMs: 8000,
    intakeCycleMs: 16000,
    autoplayMs: 7000,
  },
  layout: {
    navHDesktopPx: 100,
    navHCompactPx: 88,
    compactWidthPx: 900,
    overviewWidth: 'min(82rem, 100%)',
    overviewGap: '2.5rem',
    overviewCardHeight: 'min(46vh, 25rem)',
    titleToCards: '2.5rem',
    cardRadius: '13px',
    closeSize: '2.25rem',
    focusOffset: '3px',
    contentPadX: '2rem',
  },
}

const VAR_MAP = [
  ['--bg', tokens.color.bg],
  ['--bg-raised', tokens.color.raised],
  ['--line', tokens.color.line],
  ['--text', tokens.color.text],
  ['--text-muted', tokens.color.muted],
  ['--text-muted-soft', tokens.color.mutedSoft],
  ['--accent', tokens.color.accent],
  ['--card-border', tokens.color.cardBorder],
  ['--card-bg', tokens.color.cardBg],
  ['--card-hover-bg', tokens.color.cardHoverBg],
  ['--close-bg', tokens.color.closeBg],
  ['--white', tokens.color.white],
  ['--font-sans', tokens.type.fontSans],
  ['--font-title', tokens.type.fontTitle],
  ['--subtitle-size', tokens.type.subtitleSize],
  ['--subtitle-weight', tokens.type.subtitleWeight],
  ['--subtitle-tracking', tokens.type.subtitleTracking],
  ['--title-size', tokens.type.titleSize],
  ['--title-weight', tokens.type.titleWeight],
  ['--title-tracking', tokens.type.titleTracking],
  ['--title-leading', tokens.type.titleLeading],
  ['--card-title-size', tokens.type.cardTitleSize],
  ['--card-title-weight', tokens.type.cardTitleWeight],
  ['--caption-size', tokens.type.captionSize],
  ['--caption-leading', tokens.type.captionLeading],
  ['--dur-chapter-enter', `${tokens.motion.chapterEnterMs}ms`],
  ['--delay-chapter-enter', `${tokens.motion.chapterEnterDelayMs}ms`],
  ['--ease-chapter-enter', tokens.motion.chapterEnterEase],
  ['--travel-chapter-enter', `${tokens.motion.chapterEnterTravelPx}px`],
  ['--dur-item-enter', `${tokens.motion.itemEnterMs}ms`],
  ['--ease-item-enter', tokens.motion.itemEnterEase],
  ['--travel-item-enter', `${tokens.motion.itemEnterTravelPx}px`],
  ['--stagger-category-base', `${tokens.motion.categoryStaggerBaseMs}ms`],
  ['--stagger-category-step', `${tokens.motion.categoryStaggerStepMs}ms`],
  ['--stagger-scene-base', `${tokens.motion.sceneStaggerBaseMs}ms`],
  ['--stagger-scene-step', `${tokens.motion.sceneStaggerStepMs}ms`],
  ['--stagger-variant-base', `${tokens.motion.variantStaggerBaseMs}ms`],
  ['--stagger-variant-step', `${tokens.motion.variantStaggerStepMs}ms`],
  ['--delay-variant-hero', `${tokens.motion.variantHeroDelayMs}ms`],
  ['--dur-crossfade', `${tokens.motion.crossfadeMs}ms`],
  ['--ease-crossfade', tokens.motion.crossfadeEase],
  ['--dur-chapter-leave-hold', `${tokens.motion.chapterLeaveHoldMs}ms`],
  ['--dur-chapter-fade', `${tokens.motion.chapterChangeFadeMs}ms`],
  ['--dur-hover', `${tokens.motion.hoverMs}ms`],
  ['--dur-dash', `${tokens.motion.dashLoopMs}ms`],
  ['--dur-autoplay', `${tokens.motion.autoplayMs}ms`],
  ['--nav-h-desktop', `${tokens.layout.navHDesktopPx}px`],
  ['--nav-h-compact', `${tokens.layout.navHCompactPx}px`],
  ['--compact-width', `${tokens.layout.compactWidthPx}px`],
  ['--overview-width', tokens.layout.overviewWidth],
  ['--overview-gap', tokens.layout.overviewGap],
  ['--overview-card-h', tokens.layout.overviewCardHeight],
  ['--title-to-cards', tokens.layout.titleToCards],
  ['--card-radius', tokens.layout.cardRadius],
  ['--close-size', tokens.layout.closeSize],
  ['--focus-offset', tokens.layout.focusOffset],
  ['--content-pad-x', tokens.layout.contentPadX],
  ['--nav-h', `${tokens.layout.navHDesktopPx}px`],
]

export function tokensCssText() {
  const body = VAR_MAP.map(([k, v]) => `  ${k}: ${v};`).join('\n')
  return `:root {\n  color-scheme: dark;\n${body}\n}\n`
}

export function applyTokens(root = document.documentElement) {
  for (const [key, value] of VAR_MAP) {
    root.style.setProperty(key, value)
  }
}

export function categoryStagger(i) {
  return tokens.motion.categoryStaggerBaseMs + i * tokens.motion.categoryStaggerStepMs
}

export function sceneStagger(i) {
  return tokens.motion.sceneStaggerBaseMs + i * tokens.motion.sceneStaggerStepMs
}

export function variantStagger(i) {
  return tokens.motion.variantStaggerBaseMs + i * tokens.motion.variantStaggerStepMs
}
export const lightColor = {
  bg: '#f7f7f5',
  raised: '#ffffff',
  line: '#e7e7ea',
  text: '#111113',
  muted: '#63636b',
  mutedSoft: 'rgb(17 17 19 / 0.62)',
  accent: '#2f43ff',
  cardBorder: 'rgb(17 17 30 / 0.08)',
  cardBg: '#ffffff',
  cardHoverBg: 'rgba(47, 67, 255, 0.06)',
  closeBg: 'rgb(255 255 255 / 0.86)',
  white: '#ffffff',
}

const LIGHT_COLOR_VARS = [
  ['--bg', lightColor.bg],
  ['--bg-raised', lightColor.raised],
  ['--line', lightColor.line],
  ['--text', lightColor.text],
  ['--text-muted', lightColor.muted],
  ['--text-muted-soft', lightColor.mutedSoft],
  ['--accent', lightColor.accent],
  ['--card-border', lightColor.cardBorder],
  ['--card-bg', lightColor.cardBg],
  ['--card-hover-bg', lightColor.cardHoverBg],
  ['--close-bg', lightColor.closeBg],
  ['--white', lightColor.white],
]

export function lightTokensCssText() {
  const overrides = Object.fromEntries(LIGHT_COLOR_VARS)
  const body = VAR_MAP.map(([k, v]) => `  ${k}: ${overrides[k] ?? v};`).join('\n')
  return `:root {\n  color-scheme: light;\n${body}\n}\n`
}

export function applyLightTokens(root = document.documentElement) {
  const overrides = Object.fromEntries(LIGHT_COLOR_VARS)
  for (const [key, value] of VAR_MAP) {
    root.style.setProperty(key, overrides[key] ?? value)
  }
  root.style.setProperty('color-scheme', 'light')
  root.classList.add('theme-light')
}
