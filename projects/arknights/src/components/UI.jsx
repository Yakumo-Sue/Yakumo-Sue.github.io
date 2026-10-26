import {useState} from 'react'
import {asset, safeURL, shortType, storyLink} from '../lib/archive.js'
export function Image({src, alt = '', className = '', ...props}) {
  const [broken, setBroken] = useState(null)
  const failed = broken === src
  const label = String(alt || 'TERRA').slice(0,3).replace(/[<>&"']/g, '')
  const fallback = 'data:image/svg+xml,' + encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect width="240" height="240" fill="#1a2c38"/><path d="M20 200 120 30l100 170Z" fill="none" stroke="#58778b"/><text x="120" y="139" text-anchor="middle" fill="#aec4d1" font-size="32" font-family="sans-serif">${label}</text><text x="120" y="221" text-anchor="middle" fill="#57778a" font-size="9" letter-spacing="4">TERRA ARCHIVE</text></svg>`)
  return <img {...props} src={failed ? fallback : asset(src)} alt={alt} className={`${className} ${failed ? 'broken-image' : ''}`} onError={() => setBroken(src)}/>
}
export const External = ({href, className = '', children, ...props}) => <a {...props} className={className} href={safeURL(href)} target="_blank" rel="noopener noreferrer">{children}</a>
export const Tag = ({children, tone = ''}) => <span className={`tag ${tone}`}>{children}</span>
export const Back = ({href = '#/overview', children = '返回总览'}) => <a className="back-link" href={href}>{children}</a>
export function StoryLinks({stories}) {return stories.length ? stories.map(s => <a key={s.id} className="story-link" href={storyLink(s.id)}><span>{s.name}<small> {shortType(s)}</small></span><span className="arrow">→</span></a>) : <p className="muted">可通过全站搜索继续查找相关档案。</p>}
export function ErrorView({title = '档案未找到', children}) {return <section className="error-view"><p className="eyebrow">TERRA ARCHIVE</p><h1>{title}</h1><p>{children || '没有找到这份档案，可返回时间轴或使用搜索。'}</p><a className="button" href="#/overview">返回总览 →</a></section>}
export const Icon = ({name}) => <svg viewBox="0 0 24 24" aria-hidden="true">{name === 'search' ? <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></> : name === 'settings' ? <><path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="3"/><circle cx="15" cy="17" r="3"/></> : <path d="M3 7h18M3 12h18M3 17h18"/>}</svg>
