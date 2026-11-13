export function assetSrc(image) {
  if (!image?.file) return null
  const base = import.meta.env.BASE_URL || './'
  const file = String(image.file).replace(/^\//, '')
  return base.endsWith('/') ? `${base}${file}` : `${base}/${file}`
}

export function preload(urls) {
  for (const url of urls) {
    if (!url) continue
    const img = new Image()
    img.decoding = 'async'
    img.src = url
  }
}

export function caseUrls(cases = []) {
  return cases.filter((c) => !c.missingCapture).map((c) => assetSrc(c.image))
}

export function languageHeroUrls(languages = []) {
  return languages.map((l) => assetSrc(l.hero))
}
