import {useEffect, useMemo, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {clamp, readStore, selectStories, shortType, sourceLink, storyImage, storyLink, writeStore, yearOf} from '../lib/archive.js'
import {External, Image, Tag} from '../components/UI.jsx'
const types = {focus:'主要篇章', all:'全部档案', main:'主线剧情', side:'SideStory', collections:'故事集', records:'干员密录', modes:'模式与其他'}
export default function Overview() {
  const {archive, prefs, progress} = useArchive()
  const [state, setState] = useState(() => ({sort:'terra', type:'focus', selected:null, ...readStore('terra-overview-v1', {})}))
  const [revealed, setRevealed] = useState(null)
  const list = useMemo(() => selectStories(archive.stories, state.type, state.sort), [archive.stories, state.type, state.sort])
  const found = list.findIndex(s => s.id === state.selected)
  const index = found >= 0 ? found : Math.max(0, list.findIndex(s => s.gameId === 'main_0'))
  const story = list[index]
  const stage = useRef(null), rail = useRef(null), touch = useRef(null)
  const select = i => setState(s => ({...s, selected:list[clamp(i,0,list.length-1)]?.id}))
  useEffect(() => {writeStore('terra-overview-v1', state)}, [state])
  useEffect(() => {
    let delta = 0
    const wheel = e => {if (e.ctrlKey || e.metaKey) return; e.preventDefault(); delta += e.deltaY || e.deltaX; if (Math.abs(delta) > 32) {setState(s => ({...s, selected:list[clamp(index+(delta>0 ? 1 : -1),0,list.length-1)]?.id})); delta = 0}}
    const nodes = [stage.current, rail.current].filter(Boolean); nodes.forEach(n => n.addEventListener('wheel', wheel, {passive:false})); return () => nodes.forEach(n => n.removeEventListener('wheel', wheel))
  }, [list, index])
  if (!story) return <section className="page"><p className="empty-state">此类型暂无档案。<button onClick={() => setState(s => ({...s, type:'all'}))}>查看全部</button></p></section>
  const visible = prefs.spoilers || progress[story.id]?.finished || story.gameId === 'main_0' || revealed === story.id
  const year = state.sort === 'release' ? story.release.slice(0,4) : yearOf(story) || '未定'
  return <section className="page overview-page">
    <div className="section-heading overview-heading"><div className="heading-lockup"><h1 className="section-title">剧情时间轴</h1><span className="eyebrow">STORY TIMELINE</span></div><div className="overview-controls"><div className="segmented" role="group" aria-label="时间顺序">{[['terra','泰拉时间'],['release','实装顺序']].map(([id,label]) => <button key={id} className={state.sort === id ? 'active' : ''} aria-pressed={state.sort === id} onClick={() => setState(s => ({...s, sort:id}))}>{label}</button>)}</div><select aria-label="剧情类型" value={state.type} onChange={e => setState(s => ({...s, type:e.target.value}))}>{Object.entries(types).map(([id,label]) => <option key={id} value={id}>{label}</option>)}</select><a className="text-button" href="#/stories">目录 ↗</a></div></div>
    <div ref={stage} className="timeline-stage" onTouchStart={e => {touch.current = e.touches[0].clientX}} onTouchEnd={e => {if (touch.current !== null) {const dx = e.changedTouches[0].clientX-touch.current; if (Math.abs(dx)>55) select(index+(dx<0 ? 1 : -1)); touch.current=null}}}>
      <div className="timeline-art"><Image src={visible ? storyImage(story,archive.stories) : 'assets/hero.webp'} alt={`${story.name} 剧情配图`}/><span className="art-caption">TERRA ARCHIVE / {story.series.toUpperCase()}</span></div>
      <article className="story-feature" key={story.id}><span className="feature-count">{String(index+1).padStart(3,'0')} / {list.length}</span><div className="pill-row"><Tag>{shortType(story)}</Tag>{story.continuity !== '主世界' && <Tag tone="gold">{story.continuity}</Tag>}</div><p className="story-year">{year}</p><p className="story-date">{state.sort === 'release' ? `${story.release} · 国服实装` : `${story.timeLabel} · 整理定位`}</p><h2>{story.name}</h2><p className="story-summary">{visible ? story.summary : `这份档案属于「${story.seriesLabel}」。展开简介或进入阅读，沿着人物与事件了解故事。`}</p><div className="feature-actions"><a className="button" href={storyLink(story.id)}>{progress[story.id] && !progress[story.id].finished ? '继续阅读' : '阅读剧情'}<span className="arrow">→</span></a>{!visible ? <button className="text-button" onClick={() => setRevealed(story.id)}>展开简介</button> : <External href={sourceLink(story)} className="text-button">资料来源 ↗</External>}</div></article>
    </div>
    <div ref={rail} className="timeline-window" tabIndex={0} role="region" aria-label="剧情时间轴，滚轮或左右方向键浏览" onKeyDown={e => {if (e.target.tagName === 'INPUT') return; if (['ArrowLeft','ArrowRight'].includes(e.key)) {e.preventDefault();select(index+(e.key === 'ArrowRight' ? 1 : -1))}}}>
      <button className="rail-button" aria-label="上一条剧情" disabled={!index} onClick={() => select(index-1)}>‹</button><div className="rail-wrap"><div className="rail-labels">{[0,.25,.5,.75,1].map((v,i) => {const s = list[Math.round(clamp(index-16+v*32,0,list.length-1))]; return <span key={i} className={i === 2 ? 'selected' : ''}>{state.sort === 'release' ? s.release.slice(0,4) : yearOf(s) || '未定'}</span>})}</div><input className="timeline-slider" type="range" min="0" max={list.length-1} value={index} aria-label="选择剧情" aria-valuetext={`${year} ${story.name}`} onChange={e => select(Number(e.target.value))}/><div className="rail-meta"><span><span className="rail-current">{story.seriesLabel}</span> · {index+1} / {list.length}</span><span className="rail-hint">拖动 / 滚轮浏览 · 时间间隔已压缩</span></div></div><button className="rail-button" aria-label="下一条剧情" disabled={index === list.length-1} onClick={() => select(index+1)}>›</button>
    </div>
    <div className="entry-grid"><a className="entry-card corner-mark" href="#/relations"><div className="entry-copy"><p className="entry-num">ARCHIVE 01</p><h3>关系图谱</h3><p className="eyebrow">RELATIONS</p></div><div className="entry-visual mini-network"><svg viewBox="0 0 260 160" aria-hidden="true"><path fill="none" d="m45 30 80 55 90-55M35 130l90-45 95 50M125 85V15M125 85l-15 65"/><path d="m45 19 11 11-11 11-11-11ZM125 69l16 16-16 16-16-16ZM215 19l11 11-11 11-11-11ZM35 119l11 11-11 11-11-11ZM220 124l11 11-11 11-11-11Z"/></svg></div></a><a className="entry-card corner-mark" href="#/map"><div className="entry-copy"><p className="entry-num">ARCHIVE 02</p><h3>时空地图</h3><p className="eyebrow">TERRA MAP</p></div><div className="entry-visual entry-map"><Image src="assets/terra-map.webp" alt="泰拉地图预览"/></div></a><a className="entry-card corner-mark" href="#/operators"><div className="entry-copy"><p className="entry-num">ARCHIVE 03</p><h3>干员档案</h3><p className="eyebrow">OPERATORS</p></div><div className="entry-visual entry-operators">{['char_002_amiya','char_003_kalts','char_102_texas','char_103_angel'].map(id => <Image key={id} src={`assets/portrait-${id}.webp`}/>)}</div></a></div>
  </section>
}
