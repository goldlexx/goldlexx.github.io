import { useEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../../lib/router.jsx'
import { Icon } from '../ui/Icon.jsx'
import { Logo } from './Header.jsx'
import { TG, CONTACTS as C, NAV } from '../../data/site.js'
import { BRANCHES } from '../../data/branches.js'

// Контакты — короткие названия площадок вместо технических адресов. Сами ссылки берутся из site.js.
const LINKS = [
  { href: `tel:${C.tel}`, icon: 'phone', label: 'Позвонить' },
  { href: TG, icon: 'send', label: 'Telegram', ext: true },
  { href: C.vk, icon: 'vk', label: 'ВКонтакте', ext: true },
  { href: C.ig, icon: 'ig', label: 'Instagram', ext: true },
]

// «Наши филиалы на карте»: список раскрывается вниз, сразу под кнопкой, в обычном потоке (подвал становится выше,
// ничего не перекрывается). После раскрытия страница плавно докручивается ровно настолько, чтобы список был виден
// целиком с отступом 16 px, с учётом фиксированной шапки и нижней панели записи. Если список выше экрана, его верх
// встаёт под шапку. Escape и клик вне блока закрывают список, фокус возвращается на кнопку.
const GAP = 16
function revealBelow(el) {
  const r = el.getBoundingClientRect()
  const top = (document.querySelector('.hdr')?.getBoundingClientRect().bottom || 0) + GAP
  const bar = document.querySelector('.sticky')
  const barH = bar && !bar.classList.contains('off') && getComputedStyle(bar).display !== 'none' ? bar.getBoundingClientRect().height : 0
  const bottom = window.innerHeight - barH - GAP
  const delta = Math.min(r.bottom - bottom, r.top - top)
  if (delta <= 0) return
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollBy({ top: delta, behavior: smooth ? 'smooth' : 'auto' })
}

function useBranchesMap() {
  const [open, setOpen] = useState(false)
  const btn = useRef(null), list = useRef(null)
  const { path } = useRouter()
  useEffect(() => { setOpen(false) }, [path])
  useEffect(() => {
    if (!open) return
    if (list.current) revealBelow(list.current)
    const onKey = (e) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus() } }
    const onDown = (e) => { if (!btn.current?.contains(e.target) && !list.current?.contains(e.target)) setOpen(false) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => { document.removeEventListener('keydown', onKey); document.removeEventListener('pointerdown', onDown) }
  }, [open])
  const button = (
    <button ref={btn} type="button" className="ftr-map-btn" aria-expanded={open} aria-controls="ftr-map-list" onClick={() => setOpen(!open)}>
      <Icon n="pin" size={16} />Наши филиалы на карте
    </button>
  )
  const panel = (
    <div ref={list} id="ftr-map-list" className="ftr-map-list" hidden={!open}>
      <ul>{BRANCHES.map((b) => <li key={b.slug}><a href={b.mapUrl} target="_blank" rel="noopener noreferrer"><b>{b.name}</b><span>{b.address}{b.city !== 'Москва' ? `, ${b.city}` : ''}</span></a></li>)}</ul>
    </div>
  )
  return { open, button, panel }
}

// Подвал: логотип и группа контактов, навигация, нижняя строка — копирайт и «Наши филиалы на карте»; на телефоне — одна колонка.
// tabIndex -1: после перехода по «Контакты» фокус переносится сюда, клавиатура продолжает с подвала.
export default function Footer() {
  const map = useBranchesMap()
  return (
    <footer className="ftr" id="contacts" tabIndex={-1}><div className="wrap ftr-in">
      <Logo />
      <ul className="ftr-links" aria-label="Контакты">
        {LINKS.map((l) => (
          <li key={l.label}><a href={l.href} {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}><Icon n={l.icon} size={18} />{l.label}</a></li>
        ))}
      </ul>
      <nav className="ftr-nav" aria-label="Навигация в подвале">
        {NAV.filter(([to]) => !to.startsWith('#')).map(([to, t]) => <Link key={to} to={to}>{t}</Link>)}
        <Link to="/zapis/">Запись на пробное</Link>
      </nav>
      <div className={`ftr-bar ${map.open ? 'map-open' : ''}`}>
        <p className="copy">© PRIDE ONE · Школа брейкинга</p>
        <div className="ftr-map">{map.button}</div>
        {map.panel}
      </div>
    </div></footer>
  )
}
