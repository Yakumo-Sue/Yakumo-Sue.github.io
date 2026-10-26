import {useEffect, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {COUNTRIES, WORLD_CHAPTERS} from '../lore.js'
import {asset, BLOG_URL, SOURCE_REPO, shortType, sourceLink, storyLink} from '../lib/archive.js'
import {External, Image} from './UI.jsx'
export default function Modals() {
  const {modal, setModal} = useArchive()
  const ref = useRef(null)
  useEffect(() => {
    if (modal && !ref.current.open) ref.current.showModal()
    if (!modal && ref.current.open) ref.current.close()
  }, [modal])
  const close = () => setModal(null)
  const titles = {search:'搜索档案', preferences:'阅读设置', sources:'资料与来源', topics:'词条目录'}
  return <dialog ref={ref} className={`utility-dialog ${modal?.type === 'gallery' ? 'lightbox' : ''}`} aria-labelledby="modal-title" onCancel={close} onClose={close} onClick={e => {if (e.target === e.currentTarget) {const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close()}}}>
    {modal && <><div className="dialog-heading"><div><p className="eyebrow">{modal.type === 'gallery' ? 'GALLERY / 游戏 CG' : 'TERRA ARCHIVE'}</p><h2 id="modal-title">{titles[modal.type] || modal.title || '档案'}</h2></div><button aria-label="关闭" onClick={close}>×</button></div>{modal.type === 'search' ? <Search close={close}/> : modal.type === 'preferences' ? <Preferences/> : modal.type === 'sources' ? <Sources/> : modal.type === 'topics' ? <div className="world-topic-grid">{modal.chapter.topics.map(t => <a className="button small" key={t.id} href={`#/world/${modal.chapter.id}/${t.id}`} onClick={close}>{t.name}</a>)}</div> : modal.type === 'gallery' ? <GalleryModal key={modal.index} modal={modal} close={close}/> : null}</>}
  </dialog>
}
function Search({close}) {
  const {archive, operators, prefs} = useArchive()
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()
  const hits = !q ? [] : [
    ...archive.stories.filter(s => `${s.name} ${s.seriesLabel} ${s.gameId}`.toLowerCase().includes(q)).slice(0,12).map(s => ({href:storyLink(s.id), name:s.name, meta:`剧情 / ${shortType(s)} / ${s.timeLabel}`})),
    ...operators.filter(o => (prefs.spoilers || !o.personId || o.personId === o.id) && `${o.name} ${o.appellation}`.toLowerCase().includes(q)).slice(0,8).map(o => ({href:`#/operator/${o.id}`, name:o.name, meta:`干员 / ${o.appellation}`})),
    ...COUNTRIES.filter(c => `${c.name} ${c.en} ${c.regions.join(' ')}`.toLowerCase().includes(q)).map(c => ({href:`#/map/${c.id}`, name:c.name, meta:`国家与地区 / ${c.en}`})),
    ...WORLD_CHAPTERS.flatMap(c => c.topics.filter(t => `${t.name} ${t.en}`.toLowerCase().includes(q)).map(t => ({href:`#/world/${c.id}/${t.id}`, name:t.name, meta:`设定 / ${c.name}`}))).slice(0,5),
  ]
  return <><input className="search-input" type="search" autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="输入剧情、干员、地点或设定词" aria-label="搜索全部档案"/><p className="search-hint">剧情名 / 干员中英文名 / 国家与地区 · 输入后显示结果</p><div className="search-results">{hits.map(h => <a className="search-result" key={`${h.href}-${h.name}`} href={h.href} onClick={close}><h3>{h.name}</h3><small>{h.meta}</small></a>)}{q && !hits.length && <div className="empty-state">没有找到匹配内容。</div>}</div></>
}
function Preferences() {
  const {prefs, setPrefs, progress, toast} = useArchive()
  function exportProgress() {
    const url = URL.createObjectURL(new Blob([JSON.stringify({version:1, exported:new Date().toISOString(), progress}, null, 2)], {type:'application/json'}))
    const link = document.createElement('a'); link.href = url; link.download = 'terra-reading-progress.json'; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); toast('已导出本机阅读记录')
  }
  return <>
    <div className="preference-row"><div><label htmlFor="spoiler-toggle">完整档案模式</label><p>关闭时隐藏未读剧情简介和图集预览，并折叠异格索引。主动展开只显示当前内容。</p></div><input id="spoiler-toggle" type="checkbox" checked={prefs.spoilers} onChange={e => setPrefs(p => ({...p, spoilers:e.target.checked}))}/></div>
    <div className="preference-row"><div><label htmlFor="motion-toggle">减少动态效果</label><p>跳过镜面碎裂，简化转场，并直接显示完整句子。</p></div><input id="motion-toggle" type="checkbox" checked={prefs.reduceMotion} onChange={e => setPrefs(p => ({...p, reduceMotion:e.target.checked}))}/></div>
    <div className="preference-row"><div><label htmlFor="text-speed">文字显示速度</label><p>播放器逐字显示的间隔，左快右慢。</p></div><input id="text-speed" type="range" min="10" max="80" step="5" value={prefs.speed} onChange={e => setPrefs(p => ({...p, speed:Number(e.target.value)}))}/></div>
    <div className="preference-row"><div><label>本机阅读记录</label><p>{Object.keys(progress).length} 篇有阅读记录。记录保存在当前浏览器。</p></div><button className="button small" onClick={exportProgress}>导出记录 ↓</button></div>
  </>
}
function Sources() {
  const {archive, operators} = useArchive()
  return <div className="source-details"><p>非官方明日方舟剧情档案。当前播放器展示原创剧情梳理；精选配图与关联人物示意不代表逐节点原始演出。</p><h3>当前收录</h3><p>{archive.stories.length} 个叙事单元 / {archive.meta.expandedStoryCount} 篇扩展梳理 / {archive.meta.sceneCount} 个梳理场景 / {operators.length} 条干员索引。资料截止 {archive.meta.cutoff}。</p><h3>剧情与设定</h3><p><External href="https://ak.hypergryph.com/">明日方舟官网</External> · <External href="https://prts.wiki/w/剧情一览">PRTS 剧情一览</External> · <External href="https://prts.wiki/w/大地巡旅">《大地巡旅》</External> · <External href="https://prts.wiki/w/泰拉大典:地理">PRTS 地理资料</External></p><h3>图片与资源</h3><p>游戏 CG、人物图与标志归鹰角网络及相关权利方所有。地图地点为概略导航，图谱展示组织关联。角色形态关系依据公开游戏映射数据。</p><p><a href={asset('assets/sources.json')} target="_blank" rel="noreferrer">逐项资源来源</a> · <External href="https://github.com/Aceship/Arknight-Images">游戏图片资料库</External> · <External href="https://github.com/Kengxxiao/ArknightsGameData">公开游戏数据</External></p><h3>时间与修订</h3><p>泰拉时间为既有资料的整理定位，包含推定与未定年代，不逐项等同于官方明示。阅读顺序保持原章节结构，不将回忆强制移出当前场景。模式分支和联动保留世界线标识。</p><h3>项目与开发文档</h3><p><External href={SOURCE_REPO}>Vite + React 源码 ↗</External> · <External href={BLOG_URL}>功能、需求与开发记录 ↗</External></p></div>
}
function GalleryModal({modal, close}) {
  const {archive, setModal} = useArchive()
  const item = modal.items[modal.index]
  const story = archive.stories.find(s => s.image === item.path || s.gameId === item.gameId || s.name === item.story)
  const move = delta => {const index = (modal.index + delta + modal.items.length) % modal.items.length; setModal({...modal, index, title:modal.items[index].story})}
  return <><Image src={item.path} alt={`${item.story} 剧情配图`}/><div className="lightbox-caption"><div>游戏 CG · {item.story}<br/>配图节点 {item.node || '详见来源'}</div><div>{story && <><a href={storyLink(story.id)} onClick={close}>阅读剧情 →</a> · </>}<External href={item.source || sourceLink(story || {})}>图片来源 ↗</External></div><div><button aria-label="上一张" onClick={() => move(-1)}>←</button><button aria-label="下一张" onClick={() => move(1)}>→</button></div></div></>
}
