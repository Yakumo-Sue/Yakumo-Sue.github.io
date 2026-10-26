import {createContext, useCallback, useContext, useEffect, useState} from 'react'
import {readStore, writeStore} from './lib/archive.js'
const ArchiveContext = createContext(null)
export const useArchive = () => useContext(ArchiveContext)
export function ArchiveProvider({data, children}) {
  const [prefs, setPrefs] = useState(() => ({spoilers:false, speed:35, reduceMotion:matchMedia('(prefers-reduced-motion: reduce)').matches, ...readStore('terra-preferences-v1', {})}))
  const [progress, setProgress] = useState(() => readStore('terra-progress-v1', {}))
  const [modal, setModal] = useState(null)
  const [notice, setNotice] = useState('')
  useEffect(() => {writeStore('terra-preferences-v1', prefs); document.documentElement.classList.toggle('reduce-motion', prefs.reduceMotion)}, [prefs])
  useEffect(() => {writeStore('terra-progress-v1', progress)}, [progress])
  useEffect(() => {if (!notice) return; const timer = setTimeout(() => setNotice(''), 3200); return () => clearTimeout(timer)}, [notice])
  const saveProgress = useCallback((id, value) => setProgress(previous => ({...previous, [id]: {...value, finished:value.finished || Boolean(previous[id]?.finished), updated:Date.now()}})), [])
  return <ArchiveContext.Provider value={{...data, prefs, setPrefs, progress, saveProgress, modal, setModal, toast:setNotice}}>{children}<div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div></ArchiveContext.Provider>
}
