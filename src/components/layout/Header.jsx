import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link, useRouter } from '../../lib/router.jsx'
import { NAV } from '../../data/site.js'
import { TgBtn } from '../ui/Buttons.jsx'

export const Logo = () => (
  <Link to="/" className="logo" aria-label="PRIDE ONE — на главную">
    <img src="/logo/paw-orange-sm.png" alt="" width="36" height="40" /><img src="/logo/wordmark-white-sm.png" alt="PRIDE ONE" width="117" height="26" />
  </Link>
)

// useLayoutEffect только в браузере (при пререндере эффекты не выполняются)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Подвал (#contacts) считается «на экране», когда его верх поднялся выше 60% высоты окна или страница прокручена до конца
function useAtContacts(path) {
  const [at, setAt] = useState(false)
  useEffect(() => {
    // Проверка дешёвая (одно измерение), React не перерисовывает шапку, пока значение не меняется
    const check = () => {
      const f = document.getElementById('contacts')
      if (!f) return
      const top = f.getBoundingClientRect().top, h = window.innerHeight
      const end = window.scrollY + h >= document.documentElement.scrollHeight - 2
      setAt(top < h * 0.6 || (end && top < h))
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    return () => { window.removeEventListener('scroll', check); window.removeEventListener('resize', check) }
  }, [path])
  return at
}

export default function Header() {
  const [open, setOpen] = useState(false)
  const burger = useRef(null)
  const { path } = useRouter()
  const atContacts = useAtContacts(path)
  useEffect(() => { setOpen(false) }, [path])

  // Мобильное меню открыто: контент под ним недоступен (inert). Ставится и снимается в layout-эффекте:
  // его очистка выполняется в том же коммите, где меню закрывается, — раньше, чем маршрутизатор (тоже layout-эффект)
  // переносит фокус на цель якоря. Иначе при переходе «Контакты» из меню подвал ещё inert и фокус на нём не встаёт.
  useIsoLayoutEffect(() => {
    if (!open) return
    const outside = [document.getElementById('main'), document.getElementById('contacts'), document.querySelector('.sticky')].filter(Boolean)
    outside.forEach((el) => el.setAttribute('inert', ''))
    return () => outside.forEach((el) => el.removeAttribute('inert'))
  }, [open])

  // Tab ходит по кругу внутри шапки, Escape и клик вне меню закрывают его; при переходе на ширину без бургера меню закрывается само.
  useEffect(() => {
    if (!open) return
    const hdr = burger.current?.closest('.hdr'), nav = document.getElementById('site-nav')
    const close = (refocus) => { setOpen(false); if (refocus) burger.current?.focus() }
    const onKey = (e) => {
      if (e.key === 'Escape') { close(true); return }
      if (e.key !== 'Tab' || !nav) return
      const items = [burger.current, ...nav.querySelectorAll('a')].filter(Boolean)
      const i = items.indexOf(document.activeElement)
      if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus() }
      else if (!e.shiftKey && (i === -1 || i === items.length - 1)) { e.preventDefault(); items[0].focus() }
    }
    const onDown = (e) => { if (hdr && !hdr.contains(e.target)) close(false) }
    // Меню занимает место от нижнего края шапки до низа экрана и прокручивается внутри себя.
    // Над шапкой может быть плашка демо-режима, поэтому отступ меряется по факту и обновляется при прокрутке.
    const fit = () => { if (hdr && nav) nav.style.setProperty('--nav-top', `${Math.max(0, Math.round(hdr.getBoundingClientRect().bottom))}px`) }
    const wide = window.matchMedia('(min-width: 1181px)')
    const onWide = () => { if (wide.matches) close(false) }
    fit()
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('scroll', fit, { passive: true })
    window.addEventListener('resize', fit)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('scroll', fit)
      window.removeEventListener('resize', fit)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  // «Контакты» подсвечивается, пока на экране подвал. aria-current="page" остаётся у текущей страницы:
  // подсветка контактов — только визуальное состояние (класс), а не смена текущей страницы.
  const isPage = (to) => !to.startsWith('#') && path.startsWith(to)
  return (
    <header className="hdr">
      <div className="wrap hdr-in">
        <Logo />
        <button ref={burger} className="burger" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen(!open)}><span /><span /><span /></button>
        <nav id="site-nav" className={`nav ${open ? 'open' : ''} ${atContacts ? 'at-contacts' : ''}`} aria-label="Основная навигация">
          {NAV.map(([to, t]) => (
            <Link key={to} to={to} aria-current={isPage(to) ? 'page' : undefined} className={to === '#contacts' && atContacts ? 'is-here' : undefined} onClick={() => setOpen(false)}>{t}</Link>
          ))}
          <TgBtn className="nav-cta" />
        </nav>
        <TgBtn className="hdr-cta" />
      </div>
    </header>
  )
}
