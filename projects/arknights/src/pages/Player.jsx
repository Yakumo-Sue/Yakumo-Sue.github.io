import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useArchive} from '../context.jsx'
import {clamp, restoreCursor, shortType, sourceLink, splitLines, storyImage, storyLink} from '../lib/archive.js'
import {Back, External, Image, StoryLinks, Tag} from '../components/UI.jsx'
const figures = [['阿米娅','amiya'],['凯尔希','kaltsit'],['德克萨斯','texas'],['能天使','exusiai'],['白面鸮','ptilopsis'],['陈','chen']]
export default function Player({story,sceneParam}) {
  const {archive,prefs,progress,saveProgress,modal,toast} = useArchive()
  const saved = useRef(progress[story.id] || {}).current
  const [cursor,setCursor] = useState(() => restoreCursor(story,saved,sceneParam))
  const [started,setStarted] = useState(false), [finished,setFinished] = useState(false)
  const [seen,setSeen] = useState(() => Array.isArray(saved.seen) ? saved.seen.filter(x => typeof x === 'string') : [])
  const [typing,setTyping] = useState({key:'',shown:0}), [auto,setAuto] = useState(false), [hidden,setHidden] = useState(false)
  const [log,setLog] = useState(null), [directory,setDirectory] = useState(false), [tab,setTab] = useState('guide'), [guide,setGuide] = useState(false)
  const frame = useRef(null), typeTimer = useRef(null)
  const lines = useMemo(() => story.scenes.map(s => splitLines(s.text)), [story])
  const scene = story.scenes[cursor.scene], text = lines[cursor.scene][cursor.line]
  const letters = useMemo(() => Array.from(text),[text])
  const cursorKey = `${cursor.scene}:${cursor.line}`
  const typed = !started || prefs.reduceMotion || typing.key === cursorKey && typing.shown >= letters.length
  const fullText = typed ? text : letters.slice(0,typing.key === cursorKey ? typing.shown : 0).join('')
  const figure = figures.find(([name]) => name === '陈' ? text.includes('陈与') || text.includes('陈的') : text.includes(name))
  const stopTyping = useCallback(() => {clearInterval(typeTimer.current);setTyping({key:cursorKey,shown:letters.length})},[letters.length,cursorKey])
  useEffect(() => {
    if (sceneParam !== undefined && Number(sceneParam) !== cursor.scene) {
      setCursor(restoreCursor(story,{},sceneParam));setStarted(true);setFinished(false);setLog(null)
    }
  }, [sceneParam, cursor.scene, story])
  useEffect(() => {
    clearInterval(typeTimer.current)
    if (!started || prefs.reduceMotion) return
    let i=0;setTyping({key:cursorKey,shown:0})
    typeTimer.current=setInterval(() => {i++;setTyping({key:cursorKey,shown:i});if (i >= letters.length) clearInterval(typeTimer.current)},clamp(Number(prefs.speed) || 35,10,80))
    return () => clearInterval(typeTimer.current)
  }, [cursor.scene,cursor.line,started,prefs.reduceMotion,prefs.speed,letters,cursorKey])
  useEffect(() => {
    if (started && typed) {const id=`${cursor.scene}:${cursor.line}`;setSeen(previous => previous.includes(id) ? previous : [...previous,id])}
  }, [started,typed,cursor.scene,cursor.line])
  useEffect(() => {
    if (started || finished) saveProgress(story.id,{...cursor,seen,finished})
  }, [started,finished,cursor,seen,story.id,saveProgress])
  useEffect(() => {if (modal) setAuto(false)},[modal])
  useEffect(() => {
    const pause = () => {if (document.hidden) setAuto(false)}
    document.addEventListener('visibilitychange',pause);return () => document.removeEventListener('visibilitychange',pause)
  }, [])
  const go = useCallback((sceneIndex,line=0) => {
    if (sceneIndex >= story.scenes.length) {setFinished(true);setStarted(false);setAuto(false);return}
    const scene=clamp(sceneIndex,0,story.scenes.length-1)
    setCursor({scene,line:clamp(line,0,lines[scene].length-1)});setStarted(true);setFinished(false);setLog(null);setHidden(false);setDirectory(false)
    // Keep a shareable scene URL without resetting the React player or adding history on every line.
    history.replaceState(null,'',storyLink(story.id,scene))
    window.dispatchEvent(new HashChangeEvent('hashchange'))
  }, [story,lines])
  const start = restart => {if (restart) go(0);setStarted(true);setFinished(false);setHidden(false);frame.current?.focus({preventScroll:true})}
  const advance = useCallback(() => {
    if (log || modal) return
    if (hidden) {setHidden(false);return}
    if (!started) {if (!finished) setStarted(true);return}
    if (!typed) {stopTyping();return}
    if (cursor.line < lines[cursor.scene].length-1) setCursor(c => ({...c,line:c.line+1}))
    else go(cursor.scene+1)
  }, [log,modal,hidden,started,finished,typed,stopTyping,cursor,lines,go])
  useEffect(() => {
    if (!auto || !started || !typed || log || modal || finished) return
    const timer=setTimeout(advance,Math.max(1800,letters.length*75));return () => clearTimeout(timer)
  }, [auto,started,typed,log,modal,finished,advance,letters.length])
  const openLog = mode => {setAuto(false);stopTyping();setLog(mode)}
  const total=lines.reduce((n,ls) => n+ls.length,0), done=lines.slice(0,cursor.scene).reduce((n,ls) => n+ls.length,0)+cursor.line+1
  const logRows=lines.flatMap((ls,s) => ls.map((text,l) => ({scene:s,line:l,text,title:story.scenes[s].title}))).filter(r => log === 'all' ? r.scene === cursor.scene : seen.includes(`${r.scene}:${r.line}`))
  const readableGuide=prefs.spoilers || progress[story.id]?.finished || guide
  async function fullscreen() {try {if (document.fullscreenElement) await document.exitFullscreen();else await frame.current.requestFullscreen()} catch {toast('当前浏览器不支持全屏，可继续在页面阅读')}}
  return <section className="page player-page"><div className="player-breadcrumb"><Back/><span>{shortType(story)} / {story.seriesLabel}</span></div><div className="player-title"><div><h1>{story.name}</h1><p className="player-subtitle">{story.timeLabel} · 按原章节顺序阅读</p></div><div className="pill-row"><Tag tone="cyan">原创剧情梳理</Tag><Tag>{story.scenes.length} 个场景</Tag></div></div>
    <div className="player-layout"><aside className={`player-directory ${directory ? 'open' : ''}`}><p className="directory-title">CHAPTER / 章节目录</p>{story.scenes.map((s,i) => <button key={s.id} className={`scene-item ${i === cursor.scene ? 'active' : ''} ${seen.includes(i+':0') ? 'read' : ''}`} onClick={() => {setAuto(false);go(i)}}><small>SCENE {String(i+1).padStart(3,'0')}</small>{s.title}</button>)}</aside><div className="player-main">
      <div ref={frame} className={`player-frame ${hidden ? 'hide-dialogue' : ''}`} tabIndex={0} role="region" aria-label="剧情演出区，点击或按空格推进" onClick={e => {if (!e.target.closest('button,a,.player-log,.player-start')) advance()}} onKeyDown={e => {if (e.target.closest('button,a,input,select,textarea')) return;if ([' ','ArrowRight'].includes(e.key)) {e.preventDefault();advance()} else if (e.key === 'ArrowLeft' && cursor.scene > 0) {e.preventDefault();setAuto(false);go(cursor.scene-1)} else if (e.key === 'Escape') setLog(null)}}>
        <Image className="player-background" src={scene.background || storyImage(story,archive.stories)} alt="本篇精选配图"/><div className="player-scene-title"><span>{scene.title}</span><span>TERRA ARCHIVE</span></div>{figure && <Image className="player-figure" src={`assets/character-${figure[1]}.webp`} alt="关联人物立绘示意"/>}<div className="player-watermark">ORIGINAL SYNOPSIS / 非游戏逐字原文</div><div className="dialogue-box"><span className="dialogue-speaker">剧情梳理</span><p className="dialogue-text" aria-live="off">{fullText}</p><span className="dialogue-next" aria-hidden="true"/></div><span className="status-badge">{auto ? 'AUTO / 自动推进' : ''}</span><button className="fullscreen-close" onClick={fullscreen}>退出全屏 ×</button>
        {!started && <div className="player-start">{finished ? <><p className="eyebrow">ARCHIVE COMPLETE</p><h2>这段旅程，暂告一段落</h2><p>你已读完本篇已收录的剧情梳理。<br/>可前往原文继续阅读，或返回时间轴。</p><div className="pill-row"><a className="button small" href="#/overview">返回总览 →</a><External className="button small" href={sourceLink(story)}>前往原文 ↗</External></div><button className="text-button" onClick={() => start(true)}>重新阅读</button></> : <><button className="start-icon" aria-label="开始阅读" onClick={() => start(false)}>▷</button><h2>{saved.scene || saved.line ? '继续这段旅程' : '打开这份档案'}</h2><p>原创剧情梳理，非游戏逐字原文。<br/>点击开始，或通过“原文与来源”前往原始剧情。</p><button className="text-button" onClick={() => start(true)}>从头开始</button></>}</div>}
        {log && <section className="player-log" aria-label={log === 'all' ? '本节全文' : '已读对话记录'}><h2>{log === 'all' ? 'LOG ALL' : 'READING LOG'}<button aria-label="关闭记录" onClick={() => setLog(null)}>×</button></h2><p className="log-description">{log === 'all' ? '当前片段的全部原创梳理文字；不展开后续片段。' : '只显示已经完整阅读的梳理文字。点击条目返回相应节点。'}</p>{logRows.length ? logRows.map(r => <button className="log-row" key={`${r.scene}:${r.line}`} onClick={() => go(r.scene,r.line)}><small>{r.title}</small>{r.text}</button>) : <p className="muted">开始阅读后，这里将留下你的记录。</p>}</section>}
      </div><div className="player-timeline" aria-hidden="true"><span style={{width:`${done/total*100}%`}}/></div>
      <div className="player-controls"><button className="player-directory-toggle" onClick={() => {setAuto(false);setDirectory(x => !x)}}>目录</button><button className={auto ? 'active' : ''} aria-pressed={auto} onClick={() => {if (!started) start(false);setAuto(x => !x)}}>AUTO <small>自动</small></button><button onClick={() => openLog('seen')}>LOG <small>记录</small></button><button onClick={() => openLog('all')}>LOG ALL <small>本节全文</small></button><button onClick={() => {setAuto(false);go(cursor.scene+1)}}>SKIP <small>下一段</small></button><button aria-pressed={hidden} onClick={() => setHidden(x => !x)}>HIDE <small>对话框</small></button><span className="player-control-spacer"/><span className="player-progress">{String(cursor.scene+1).padStart(2,'0')} / {String(story.scenes.length).padStart(2,'0')}</span><button disabled title="当前梳理版未配置原始音轨">♪ <small>无音轨</small></button><button aria-label="全屏阅读" onClick={fullscreen}>⛶</button></div>
      <div className="player-below"><button className="button small" disabled={cursor.scene === 0} onClick={() => {setAuto(false);go(cursor.scene-1)}}>← 上一段</button><p>点击补全台词，再次点击继续 · 空格推进<br/>精选配图与人物示意，非逐节点原始演出复现。</p><button className="button small" onClick={() => {setAuto(false);go(cursor.scene+1)}}>下一段 →</button></div>
      <div className="player-info-tabs">{[['guide','故事导读'],['sources','原文与来源'],['related','相关阅读']].map(([id,label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => {setAuto(false);setTab(id)}}>{label}</button>)}</div>
      <div className="player-info-content">{tab === 'sources' ? <><p>当前为原创剧情梳理版。背景为本篇精选 CG，人物为关联立绘示意；尚未接入完整逐句脚本、逐节点演出与原始音轨。</p><div className="pill-row source-buttons"><External className="button small" href={sourceLink(story)}>PRTS 原始剧情入口 ↗</External>{story.sources.filter(s => s.includes('github.com')).slice(0,1).map(s => <External key={s} className="button small" href={s}>关卡脚本来源 ↗</External>)}</div>{scene.segments?.length > 0 && <><p className="record-note">当前节点的原始片段入口：</p><div className="pill-row">{scene.segments.map(s => <External key={s.id} className="button small" href={s.url}>{s.label} ↗</External>)}</div></>}<p className="record-note">图片定位见“资料与来源”。剧情时间为既有整理定位，可结合来源复核。</p></> : tab === 'related' ? <StoryLinks stories={archive.stories.filter(s => s.series === story.series && s.id !== story.id).sort((a,b) => a.release.localeCompare(b.release)).slice(0,6)}/> : <><p>{readableGuide ? story.summary : '新读者模式：完整故事导读可能包含后续内容。你可以先逐段阅读，或主动展开导读。'}</p>{!readableGuide && <button className="text-button" onClick={() => setGuide(true)}>展开本篇导读</button>}<p className="record-note">{readableGuide && story.link ? `${story.link} · ` : ''}发生时间：{story.timeLabel} · 实装：{story.release}</p></>}</div>
    </div></div>
  </section>
}
