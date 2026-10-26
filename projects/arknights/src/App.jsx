import {Component, lazy, Suspense, useEffect, useState} from 'react'
import {ArchiveProvider, useArchive} from './context.jsx'
import {loadSiteData} from './lib/archive.js'
import {Shell} from './components/Shell.jsx'
import Modals from './components/Modals.jsx'
import {ErrorView} from './components/UI.jsx'
const Home=lazy(() => import('./pages/Home.jsx'))
const Overview=lazy(() => import('./pages/Overview.jsx'))
const World=lazy(() => import('./pages/World.jsx'))
const More=lazy(() => import('./pages/More.jsx'))
const Player=lazy(() => import('./pages/Player.jsx'))
const Stories=lazy(() => import('./pages/Archive.jsx').then(m => ({default:m.Stories})))
const Operators=lazy(() => import('./pages/Archive.jsx').then(m => ({default:m.Operators})))
const Operator=lazy(() => import('./pages/Archive.jsx').then(m => ({default:m.Operator})))
const Relations=lazy(() => import('./pages/Explore.jsx').then(m => ({default:m.Relations})))
const TerraMap=lazy(() => import('./pages/Explore.jsx').then(m => ({default:m.TerraMap})))
function Loading() {return <div className="boot-state"><span className="loading-mark"/><p>正在整理档案</p><small>CONNECTING TO TERRA ARCHIVE</small></div>}
class PageBoundary extends Component {
  state={error:false}
  static getDerivedStateFromError() {return {error:true}}
  componentDidCatch(error) {console.error('Archive view failed',error)}
  render() {return this.state.error ? <ErrorView title="档案暂时未能打开">可返回时间轴，或刷新页面后重试。</ErrorView> : this.props.children}
}
const parseHash=() => (location.hash.replace(/^#\/?/,'') || 'home').split('/').map(x => {try{return decodeURIComponent(x)}catch{return x}})
function Router() {
  const {archive,operators,setModal} = useArchive()
  const [route,setRoute]=useState(parseHash)
  useEffect(() => {const update=() => setRoute(parseHash());window.addEventListener('hashchange',update);return () => window.removeEventListener('hashchange',update)},[])
  const [page,id,scene]=route
  const story=page === 'story' ? archive.stories.find(s => s.id === id) : null
  const operator=page === 'operator' ? operators.find(o => o.id === id) : null
  useEffect(() => {setModal(null)},[page,id,setModal])
  useEffect(() => {window.scrollTo(0,0)},[page,id])
  useEffect(() => {document.title=`${story ? `${story.name} 剧情梳理` : operator ? `${operator.name} 干员档案` : ({home:'泰拉剧情档案',overview:'剧情总览',stories:'全部剧情目录',world:'泰拉设定',more:'唱片与图集',operators:'干员档案',operator:'干员档案',relations:'关系图谱',map:'泰拉时空地图'})[page] || '档案未找到'} · TERRA ARCHIVE`},[page,story,operator])
  let content
  switch(page) {
    case 'home':content=<Home/>;break
    case 'overview':content=<Overview/>;break
    case 'world':content=<World chapterId={id} topicId={scene}/>;break
    case 'more':content=<More/>;break
    case 'stories':content=<Stories/>;break
    case 'operators':content=<Operators/>;break
    case 'operator':content=<Operator key={id} id={id}/>;break
    case 'relations':content=<Relations groupId={id}/>;break
    case 'map':content=<TerraMap countryId={id}/>;break
    case 'story':content=story ? <Player key={story.id} story={story} sceneParam={scene}/> : <ErrorView/>;break
    default:content=<ErrorView/>
  }
  return <><Shell route={route}><PageBoundary key={`${page}/${page === 'story' ? id : ''}`}><Suspense fallback={<Loading/>}>{content}</Suspense></PageBoundary></Shell><Modals/></>
}
export default function App() {
  const [data,setData]=useState(null),[error,setError]=useState(false),[attempt,setAttempt]=useState(0)
  useEffect(() => {let active=true;loadSiteData().then(data => {if(active){setData(data);setError(false)}}).catch(e => {console.error(e);if(active)setError(true)});return () => {active=false}},[attempt])
  if(error)return <section className="error-view"><p className="eyebrow">ARCHIVE CONNECTION</p><h1>连接暂未完成</h1><p>档案数据暂未能载入，请检查连接后重试。</p><button className="button" onClick={() => {setError(false);setAttempt(n => n+1)}}>重新载入 →</button><a href="https://prts.wiki/w/剧情一览">PRTS 剧情一览 ↗</a></section>
  return data ? <ArchiveProvider data={data}><Router/></ArchiveProvider> : <Loading/>
}
