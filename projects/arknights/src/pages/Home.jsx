import {useEffect, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {Image} from '../components/UI.jsx'
const edge = [[0,0],[25,0],[50,0],[75,0],[100,0],[100,25],[100,50],[100,75],[100,100],[75,100],[50,100],[25,100],[0,100],[0,75],[0,50],[0,25]]
const seenIntro = () => {try {return sessionStorage.getItem('terra-intro-seen') === '1'} catch {return false}}
export default function Home() {
  const {archive, prefs, modal, toast} = useArchive()
  const [intro, setIntro] = useState(() => !seenIntro() && !prefs.reduceMotion)
  const [replay, setReplay] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    if (!intro) return
    try {sessionStorage.setItem('terra-intro-seen', '1')} catch {/* Optional session preference. */}
    const timer = setTimeout(() => setIntro(false), 4400); return () => clearTimeout(timer)
  }, [intro, replay])
  useEffect(() => {
    const node = ref.current
    const wheel = e => {if (!modal && !e.ctrlKey && !e.metaKey && e.deltaY > 30 && !e.target.closest('button')) {e.preventDefault(); location.hash = '#/overview'}}
    node.addEventListener('wheel', wheel, {passive:false}); return () => node.removeEventListener('wheel', wheel)
  }, [modal])
  const playing = intro && !prefs.reduceMotion
  const enter = () => {setIntro(false); location.hash = '#/overview'}
  return <section ref={ref} className={`home-page ${playing ? 'is-intro' : ''}`} aria-label="首页">
    <div className="hero-landscape"/><div className="hero-vignette"/><div className="hero-grid"/><div className="hero-side-label">RHODES ISLAND / TERRA ARCHIVE</div><div className="hero-index">ARCHIVE SYSTEM · 001</div>
    <button className="replay-button" onClick={() => {if (prefs.reduceMotion) toast('已按减少动态效果设置显示首页'); else {setIntro(true); setReplay(x => x+1)}}}>▷ 重播开场</button>
    <div className="hero-lockup"><div className="rhodes-emblem native"><Image src="assets/rhodes-logo.webp" alt="罗德岛标志"/></div><div className="hero-heading"><h1>罗德岛</h1><p className="hero-english">RHODES ISLAND</p><p className="hero-subtitle">泰拉剧情档案</p><p className="eyebrow">STORIES ACROSS TERRA</p></div></div>
    <div className="hero-bottom-note">沿着时间，重返这片大地。<br/>{archive.stories.length} 篇档案 / {archive.meta.sceneCount} 个梳理场景</div>
    <button className="down-button" onClick={enter}><svg viewBox="0 0 30 30" fill="none" aria-hidden="true"><path d="m5 9 10 8L25 9M5 17l10 8 10-8" strokeWidth="1.5"/></svg><span>进入总览</span></button>
    {playing && <><div key={replay} className="intro-overlay" aria-hidden="true"><div className="intro-base"><Image className="intro-logo" src="assets/babel-logo.webp"/></div><div className="mirror-shards">{edge.map((a, i) => {const b = edge[(i+1)%edge.length];return <div key={i} className="shard" style={{clipPath:`polygon(50% 44%,${a[0]}% ${a[1]}%,${b[0]}% ${b[1]}%)`, '--dx':`${((a[0]+b[0])/2-50)*1.5}vw`, '--dy':`${((a[1]+b[1])/2-44)*1.5}vh`, '--rot':`${(i%2 ? 1 : -1)*(15+i*2)}deg`, '--delay':`${1.35+i*.009}s`}}><Image className="intro-logo" src="assets/babel-logo.webp"/></div>})}</div></div><button className="intro-skip" onClick={() => setIntro(false)}>跳过开场 →</button></>}
  </section>
}
