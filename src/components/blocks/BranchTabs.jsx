import { useEffect, useRef, useState } from 'react'
import { Link } from '../../lib/router.jsx'
import { Icon } from '../ui/Icon.jsx'
import { BRANCHES } from '../../data/branches.js'
import { fmtTimes } from '../../lib/schedule.js'

// Вкладки филиалов (из прежней версии) + полноценная клавиатурная навигация стрелками
export default function BranchTabs() {
  const [i, setI] = useState(0)
  const b = BRANCHES[i]
  const pick = (k) => { const n = (k + BRANCHES.length) % BRANCHES.length; setI(n); document.getElementById(`tab-${BRANCHES[n].slug}`)?.focus() }
  const onKey = (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); pick(i + 1) }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); pick(i - 1) }
  }
  // На телефонах вкладки прокручиваются по горизонтали: затухание у края показывает, что список продолжается
  const tabs = useRef(null)
  const [fade, setFade] = useState('')
  useEffect(() => {
    const el = tabs.current
    if (!el) return
    const upd = () => {
      const more = el.scrollWidth - el.clientWidth > 2
      setFade(!more ? '' : `${el.scrollLeft > 2 ? 'fade-l' : ''} ${el.scrollLeft < el.scrollWidth - el.clientWidth - 2 ? 'fade-r' : ''}`.trim())
    }
    upd()
    el.addEventListener('scroll', upd, { passive: true })
    window.addEventListener('resize', upd)
    return () => { el.removeEventListener('scroll', upd); window.removeEventListener('resize', upd) }
  }, [])
  return (
    <div className="br-grid">
      <div ref={tabs} className={`tabs ${fade}`} role="tablist" aria-label="Филиалы" onKeyDown={onKey}>
        {BRANCHES.map((x, k) => <button key={x.slug} id={`tab-${x.slug}`} role="tab" aria-selected={k === i} aria-controls="br-panel" tabIndex={k === i ? 0 : -1} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{x.name}</button>)}
      </div>
      <div className="card br-card" role="tabpanel" id="br-panel" aria-labelledby={`tab-${b.slug}`}>
        <h3>{b.name}</h3>
        <p className="addr"><Icon n="pin" size={16} />{b.address}</p>
        <dl>{b.schedule.map(([d, t]) => <div key={d}><dt>{d}</dt><dd>{fmtTimes(t)}</dd></div>)}</dl>
        <div className="acts">
          <Link className="btn btn-o" to={`/filialy/${b.slug}/`}>Страница филиала</Link>
          <a className="btn btn-g" href={b.mapUrl} target="_blank" rel="noopener noreferrer"><Icon n="pin" size={16} />Маршрут</a>
        </div>
      </div>
    </div>
  )
}
