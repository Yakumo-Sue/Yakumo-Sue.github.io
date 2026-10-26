import {useEffect, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {COUNTRIES, GROUPS} from '../lore.js'
import {clamp, relatedStories} from '../lib/archive.js'
import {Back, External, Image, StoryLinks, Tag} from '../components/UI.jsx'
export function Relations({groupId}) {
  const {operators} = useArchive()
  const group = GROUPS.find(g => g.id === groupId) || GROUPS[0]
  const [selected,setSelected] = useState(null)
  const members = group.members.map(name => operators.find(o => o.name === name)).filter(Boolean)
  const positions = members.map((op,i) => ({op, x:49+Math.cos((-90+i*360/members.length)*Math.PI/180)*29, y:48+Math.sin((-90+i*360/members.length)*Math.PI/180)*31}))
  const op = members.find(o => o.id === selected)
  return <section className="page graph-page"><div className="graph-toolbar"><div className="graph-title"><Back/><p className="eyebrow">RELATIONSHIP ARCHIVE</p><h1>关系图谱</h1></div><div className="graph-group-pills">{GROUPS.map(g => <a key={g.id} className={`button small ${g === group ? 'active' : ''}`} href={`#/relations/${g.id}`} onClick={() => setSelected(null)}>{g.name}</a>)}</div></div><div className="graph-stage"><svg viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">{positions.map(p => <line key={p.op.id} className="graph-edge" x1="490" y1="288" x2={p.x*10} y2={p.y*6}/>)}</svg><div className="graph-center"><Image src={group.image}/><b>{group.name}</b><small>ORGANIZATION</small></div>{positions.map(p => <button key={p.op.id} className={`graph-node ${selected === p.op.id ? 'selected' : ''}`} style={{left:`${p.x}%`,top:`${p.y}%`}} aria-label={`${p.op.name} 组织关联`} onClick={() => setSelected(p.op.id)}><div className="node-portrait"><Image src={p.op.portrait} alt={p.op.name}/></div><span>{p.op.name}</span></button>)}<div className="graph-legend"><span className="line"/>组织 / 剧情关联<br/>点击人物查看资料。此页为组织关联概览，不展示未经核对的亲属关系。</div>{op && <aside className="graph-detail"><button className="close-panel" aria-label="关闭人物侧栏" onClick={() => setSelected(null)}>×</button><Image src={op.portrait} alt={op.name}/><h2>{op.name}</h2><Tag tone="cyan">{group.name} · 关联人物</Tag><p>{group.intro}</p><p>关系依据：干员所属资料与相关剧情。组织视角不代表所有时期的直接任职状态。</p><External className="text-button" href={op.source}>查看档案来源 ↗</External><a className="button small" href={`#/operator/${op.id}`}>人物档案 →</a></aside>}</div></section>
}
export function TerraMap({countryId}) {
  const {archive} = useArchive()
  const [layer,setLayer] = useState('all'), [listOpen,setListOpen] = useState(false)
  const [view,setView] = useState({zoom:1,x:0,y:0}), [size,setSize] = useState({width:1200,height:800})
  const canvas = useRef(null), drag = useRef(null)
  const country = COUNTRIES.find(c => c.id === countryId)
  useEffect(() => {
    const node = canvas.current
    const resize = () => setSize({width:node.clientWidth,height:node.clientHeight})
    const observer = new ResizeObserver(resize); observer.observe(node); resize()
    const wheel = e => {if (e.target.closest('aside,.map-list-pane') || e.ctrlKey || e.metaKey) return; e.preventDefault();setView(v => ({...v,zoom:clamp(v.zoom+(e.deltaY < 0 ? .1 : -.1),.75,3.5)}))}
    node.addEventListener('wheel',wheel,{passive:false});return () => {observer.disconnect();node.removeEventListener('wheel',wheel)}
  }, [])
  const scale = Math.min(size.width/1200,size.height/800)*view.zoom
  const choose = id => {setListOpen(false); location.hash = `#/map/${id}`}
  const startDrag = e => {if (e.target.closest('button,a,aside,select,.map-list-pane')) return; drag.current={x:e.clientX,y:e.clientY,ox:view.x,oy:view.y};e.currentTarget.setPointerCapture(e.pointerId)}
  const moveDrag = e => {if (!drag.current) return;const d=drag.current;setView(v => ({...v,x:clamp(d.ox+e.clientX-d.x,-1200,1200),y:clamp(d.oy+e.clientY-d.y,-800,800)}))}
  return <section className="page map-page"><div className="map-head"><div><Back/><p className="eyebrow map-eyebrow">TERRA / GEOGRAPHIC INDEX</p><h1>泰拉时空地图</h1></div><div><select aria-label="地图图层" value={layer} onChange={e => setLayer(e.target.value)}>{[['all','全部图层'],['country','现代国家'],['historical','历史政体'],['sea','海域'],['city','城市 / 城邦'],['region','特殊地区']].map(([id,label]) => <option key={id} value={id}>{label}</option>)}</select><button className="button small" onClick={() => setListOpen(x => !x)}>地区列表</button></div></div>
    <div className="map-canvas" ref={canvas} onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={() => {drag.current=null}} onPointerCancel={() => {drag.current=null}}>
      <div className="map-transform" style={{width:1200,height:800,inset:'auto',left:'50%',top:'50%',transform:`translate(-50%,-50%) translate(${view.x}px,${view.y}px) scale(${scale})`,'--pin-scale':1/scale}}><Image className="map-background" src="assets/terra-map.webp" alt="明日方舟游戏泰拉世界地图底图" draggable={false}/>{COUNTRIES.filter(c => c.x !== null && (layer === 'all' || c.type === layer)).map(c => <button key={c.id} className={`map-label ${c.type} ${c === country ? 'selected' : ''}`} style={{left:`${c.x}%`,top:`${c.y}%`,transform:'translate(-50%,-50%) scale(var(--pin-scale,1))'}} aria-label={`查看${c.name}`} onClick={() => choose(c.id)}>{c.name}</button>)}</div>
      <div className="map-controls"><button aria-label="放大地图" onClick={() => setView(v => ({...v,zoom:clamp(v.zoom+.25,.75,3.5)}))}>＋</button><button aria-label="缩小地图" onClick={() => setView(v => ({...v,zoom:clamp(v.zoom-.25,.75,3.5)}))}>−</button><button aria-label="复位地图" onClick={() => setView({zoom:1,x:0,y:0})}>⌖</button></div><div className="map-scale">游戏世界地图底图 / PRTS<br/>国家点位为概略阅读导航，不代表精确国界。<br/>拖动平移 · ＋/− 缩放</div>
      {country && !listOpen && <aside className="country-panel"><button className="close-panel" aria-label="关闭地区档案" onClick={() => {location.hash='#/map'}}>×</button><p className="eyebrow">{({historical:'HISTORICAL POLITY',sea:'OCEAN ARCHIVE',city:'CITY ARCHIVE',country:'COUNTRY ARCHIVE',underground:'UNDERGROUND REGION',region:'SPECIAL REGION'})[country.type]}</p><h2>{country.name}</h2><p className="country-english">{country.en}</p><p>{country.intro}</p><p className="eyebrow">RELATED PLACES / 已知地点</p><p>{country.regions.join(' / ')}</p><a className="button small" href={`#/world/countries/${country.id}`}>阅读地区介绍 →</a><p className="eyebrow map-related">RELATED STORIES</p><StoryLinks stories={relatedStories(archive.stories,country.keywords,3)}/><p className="record-note">概略标记，用于剧情导航；不代表精确行政边界。</p><External className="text-button" href={country.source}>PRTS 地理来源 ↗</External></aside>}
      {listOpen && <div className="map-list-pane"><div className="dialog-heading"><div><p className="eyebrow">COUNTRIES AND REGIONS</p><h2>国家与地区</h2></div><button aria-label="关闭地区列表" onClick={() => setListOpen(false)}>×</button></div><div className="country-grid">{COUNTRIES.map(c => <button key={c.id} onClick={() => choose(c.id)}>{c.name}<small>{c.en}</small></button>)}</div></div>}
    </div><div className="country-list">{COUNTRIES.map(c => <button key={c.id} className={c === country ? 'selected' : ''} onClick={() => choose(c.id)}>{c.name}</button>)}</div>
  </section>
}
