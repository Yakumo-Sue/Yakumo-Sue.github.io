import {useEffect, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {PAGE_NAMES, PAGE_LABELS} from '../lib/archive.js'
import {Icon, Image} from './UI.jsx'
export function Shell({route, children}) {
  const {archive, prefs, setModal, modal} = useArchive()
  const [menu, setMenu] = useState(false)
  const main = useRef(null)
  const active = PAGE_NAMES.includes(route[0]) ? route[0] : ['story','stories','operators','operator','map','relations'].includes(route[0]) ? 'overview' : 'home'
  const index = PAGE_NAMES.indexOf(active)
  useEffect(() => {
    const handler = e => {if (e.key === '/' && !modal && !e.target.closest('input,textarea,select,[contenteditable]')) {e.preventDefault(); setModal({type:'search'})}}
    document.addEventListener('keydown', handler); return () => document.removeEventListener('keydown', handler)
  }, [modal, setModal])
  return <>
    <a className="skip-link" href="#main" onClick={e => {e.preventDefault(); main.current?.focus(); main.current?.scrollIntoView()}}>跳到主要内容</a>
    <header className={`site-header ${menu ? 'menu-open' : ''}`}>
      <a className="brand" href="#/home" aria-label="明日方舟 泰拉剧情档案 首页" onClick={() => setMenu(false)}><Image src="assets/arknights-logo.svg" alt="明日方舟 ARKNIGHTS"/><span className="brand-note">非官方剧情档案<span>TERRA ARCHIVE</span></span></a>
      <nav className="main-nav" aria-label="主要导航">{PAGE_NAMES.map((name, i) => <a key={name} href={`#/${name}`} className={active === name ? 'active' : ''} aria-current={active === name ? 'page' : undefined} onClick={() => setMenu(false)}><b>{['INDEX','OVERVIEW','WORLD','MORE'][i]}</b><span>{PAGE_LABELS[i]}</span></a>)}</nav>
      <div className="header-tools"><button className="icon-button" aria-label="搜索档案" title="搜索档案 /" onClick={() => setModal({type:'search'})}><Icon name="search"/></button><button className="icon-button" aria-label="阅读设置" id="preferences-button" onClick={() => setModal({type:'preferences'})}><Icon name="settings"/></button><button className="icon-button menu-button" aria-label="展开导航" aria-expanded={menu} onClick={() => setMenu(x => !x)}><Icon name="menu"/></button></div>
    </header>
    <main id="main" ref={main} tabIndex={-1}>{children}</main>
    <div className="page-footer"><div className="footer-source"><button onClick={() => setModal({type:'sources'})}>资料与来源 ↗</button><span className="footer-cutoff">收录截至 {archive.meta.cutoff}</span><button onClick={() => setModal({type:'preferences'})}>{prefs.spoilers ? '完整档案' : '剧透保护'} <span style={{color:'var(--cyan)'}}>●</span></button></div><nav className="page-counter" aria-label="主页面翻页">{PAGE_NAMES.map((name, i) => <a key={name} href={`#/${name}`} className={name === active ? 'active' : ''} aria-label={PAGE_LABELS[i]} aria-current={name === active ? 'page' : undefined}>{String(i+1).padStart(2,'0')}</a>)}{index < 3 && <a className="next-page" href={`#/${PAGE_NAMES[index+1]}`} aria-label="下一主页面">→</a>}</nav></div>
  </>
}
