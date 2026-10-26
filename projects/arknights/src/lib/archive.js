export const PAGE_NAMES = ['home', 'overview', 'world', 'more']
export const PAGE_LABELS = ['首页', '总览', '设定', '其他']
export const SOURCE_REPO = 'https://github.com/Yakumo-Sue/Yakumo-Sue.github.io/tree/main/projects/arknights'
export const BLOG_URL = 'https://yakumo-sue.github.io/posts/arknights-vite-react-development/'
export const clamp = (value, min, max) => Math.min(max, Math.max(min, value))
export const asset = (path = '') => /^(https?:|data:)/.test(path) ? path : `${import.meta.env?.BASE_URL || './'}${path.replace(/^\.?\//, '')}`
export const safeURL = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : '#'} catch {return '#'} }
export const readStore = (key, fallback) => {try {return JSON.parse(localStorage.getItem(key)) ?? fallback} catch {return fallback}}
export const writeStore = (key, value) => {try {localStorage.setItem(key, JSON.stringify(value))} catch {/* Reading remains available when storage is blocked. */}}
export const shortType = s => s.type.includes('主线') ? '主线' : s.type.includes('SideStory') ? 'SideStory' : s.type.includes('故事集') ? (s.type.includes('短篇') ? '故事集短篇' : '故事集') : s.type.includes('密录') ? '干员密录' : s.type
export const storyLink = (id, scene) => `#/story/${encodeURIComponent(id)}${scene === undefined ? '' : `/${scene}`}`
export const sourceLink = s => s.sources?.find(url => url.includes('prts.wiki')) || 'https://prts.wiki/w/剧情一览'
export const yearOf = s => s.year > 0 ? s.year : null
export const storyImage = (s, stories) => s?.image || stories.find(x => x.series === s?.series && x.image)?.image || 'assets/hero.webp'
export const splitLines = text => (text.match(/[^。！？!?]+[。！？!?]?/gu) || [text]).filter(x => x.trim())
export function selectStories(stories, type = 'focus', sort = 'terra') {
  return stories.filter(s => type === 'all' || type === 'focus' && /主线|SideStory|故事集总览/.test(s.type) || type === 'main' && s.type.includes('主线') || type === 'side' && s.type.includes('SideStory') || type === 'collections' && s.type.includes('故事集') || type === 'records' && s.type.includes('密录') || type === 'modes' && /战略|结局|演算|特殊/.test(s.type))
    .sort((a, b) => sort === 'release' ? a.release.localeCompare(b.release) : (a.time > 0 ? a.time : Infinity) - (b.time > 0 ? b.time : Infinity) || a.release.localeCompare(b.release))
}
export function relatedStories(stories, keywords = [], limit = 5) {
  return stories.map(story => ({story, score: keywords.filter(Boolean).reduce((n, k) => n + (`${story.name} ${story.seriesLabel}`.includes(k) ? 5 : story.summary.includes(k) ? 1 : 0), 0)}))
    .filter(x => x.score > 0).sort((a, b) => b.score - a.score || a.story.release.localeCompare(b.story.release)).slice(0, limit).map(x => x.story)
}
export function restoreCursor(story, saved = {}, sceneParam) {
  const parsed = sceneParam === undefined ? saved.scene : Number(sceneParam)
  const scene = clamp(Number.isFinite(parsed) ? Math.floor(parsed) : 0, 0, story.scenes.length - 1)
  const rawLine = sceneParam === undefined || scene === saved.scene ? saved.line : 0
  const line = clamp(Number.isFinite(rawLine) ? Math.floor(rawLine) : 0, 0, splitLines(story.scenes[scene].text).length - 1)
  return {scene, line}
}
let dataPromise
export function loadSiteData() {
  if (dataPromise) return dataPromise
  const loadArchive = async () => {
    if ('DecompressionStream' in window) {
      try {const r = await fetch(asset('data/archive.json.gz')); if (!r.ok) throw Error(r.status); return await new Response(r.body.pipeThrough(new DecompressionStream('gzip'))).json()} catch {/* Older browsers and proxies use plain JSON below. */}
    }
    const r = await fetch(asset('data/archive.json')); if (!r.ok) throw Error(`Archive ${r.status}`); return r.json()
  }
  const json = async path => {const r = await fetch(asset(path)); if (!r.ok) throw Error(`${path} ${r.status}`); return r.json()}
  dataPromise = Promise.all([loadArchive(), json('data/operators.json'), json('assets/sources.json')]).then(([archive, operatorData, sources]) => {
    if (!archive.stories?.length || !operatorData.operators?.length) throw Error('Invalid archive')
    return {archive, operators: operatorData.operators, operatorForms: [...operatorData.operators, ...Object.values(operatorData.formsById || {})], media: sources.assets || []}
  }).catch(e => {dataPromise = null; throw e})
  return dataPromise
}
