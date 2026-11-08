import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'

// Небольшой маршрутизатор на History API: без зависимостей, работает и при пререндере (url передаётся снаружи).
const Ctx = createContext({ path: '/', search: '', navigate: () => {} })
export const normPath = (p) => {
  let x = (p || '/').split('#')[0].split('?')[0] || '/'
  if (!x.endsWith('/') && !/\.[a-z0-9]+$/i.test(x)) x += '/'
  return x
}
const split = (u) => { const [p, q = ''] = u.split('?'); return { path: normPath(p), search: q.split('#')[0] } }

// Прокрутка без плавной анимации (у html задан scroll-behavior: smooth для якорей)
const jump = (y) => {
  const el = document.documentElement, prev = el.style.scrollBehavior, top = Math.max(0, Math.round(y))
  el.style.scrollBehavior = 'auto'
  void getComputedStyle(el).scrollBehavior // применить стиль до прокрутки
  try { window.scrollTo({ top, left: 0, behavior: 'instant' }) } catch { window.scrollTo(0, top) }
  el.style.scrollBehavior = prev
}
const headerH = () => document.querySelector('.hdr')?.getBoundingClientRect().height || 0
const topOf = (el) => el.getBoundingClientRect().top + window.scrollY - headerH()
// Якорь (карточка тренера, подвал): небольшой зазор под шапкой, чтобы блок не прилипал к её нижней границе
const ANCHOR_GAP = 16
// Фокус на цель якоря: клавиатура и скринридер продолжают с неё, а не с прежнего места страницы
const focusAnchor = (el) => { if (!el.matches('a,button,input,select,textarea,[tabindex]')) el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }) }

// Точка перехода на другую страницу: начало <main>, сразу под фиксированной шапкой.
// Шапка страницы (H1, хлебные крошки, адрес филиала, неделя занятий) видна целиком; плашка демо-режима над шапкой
// при этом прокручивается вверх. В публичном режиме плашки нет, и это обычный переход в начало страницы.
const pageTop = () => { const m = document.getElementById('main'); return m ? topOf(m) : 0 }

// Позиции прокрутки по записям истории: для кнопок «Назад» и «Вперёд».
// Прокруткой управляем сами (scrollRestoration = 'manual'): позиция уходящей записи сохраняется в момент перехода,
// а также в history.state — чтобы она пережила перезагрузку страницы и возврат с другого сайта.
const positions = new Map()
const entryKey = () => window.history.state?.k
const newKey = () => `k${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`
const stamp = () => window.history.replaceState({ ...(window.history.state || {}), y: window.scrollY }, '')
// При перезагрузке и уходе со страницы позиция сохраняется в sessionStorage (history.state в момент pagehide не всегда сохраняется)
const SS = 'pride-scroll:'
const ssGet = (k) => { try { const v = sessionStorage.getItem(SS + k); return v === null ? undefined : Number(v) } catch { return undefined } }
const ssSet = (k, y) => { try { sessionStorage.setItem(SS + k, String(Math.round(y))) } catch { /* хранилище недоступно — не страшно */ } }

export function RouterProvider({ url, children }) {
  const [loc, setLoc] = useState(() => split(url ?? (typeof window !== 'undefined' ? window.location.pathname + window.location.search : '/')))
  const intent = useRef(null)
  const cur = useRef(null)

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual'
    if (!entryKey()) window.history.replaceState({ ...(window.history.state || {}), k: newKey() }, '')
    cur.current = entryKey()
    const y0 = ssGet(cur.current) ?? window.history.state?.y
    if (typeof y0 === 'number' && y0 > 0) jump(y0) // перезагрузка или возврат с другого сайта
    else if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView()
    const onPop = () => {
      if (cur.current) positions.set(cur.current, window.scrollY)
      const k = entryKey()
      cur.current = k
      const y = k ? (positions.get(k) ?? window.history.state?.y) : undefined
      // Запись без ключа создаёт браузер при переходе по якорю (#contacts): прокручиваем к якорю
      intent.current = typeof y === 'number' ? { y } : { hash: window.location.hash.slice(1), keep: !k }
      setLoc(split(window.location.pathname + window.location.search))
    }
    const onHide = () => { if (entryKey()) ssSet(entryKey(), window.scrollY) }
    // Якорь, набранный вручную в адресной строке, создаёт запись без ключа: её позицию не запоминаем
    const onHash = () => { if (!entryKey()) cur.current = null }
    window.addEventListener('popstate', onPop)
    window.addEventListener('pagehide', onHide)
    window.addEventListener('hashchange', onHash)
    return () => { window.removeEventListener('popstate', onPop); window.removeEventListener('pagehide', onHide); window.removeEventListener('hashchange', onHash) }
  }, [])

  // После отрисовки новой страницы: «Назад/Вперёд» → прежняя позиция; якорь → к нему; обычный переход → в начало страницы
  useLayoutEffect(() => {
    const it = intent.current
    if (!it) return
    intent.current = null
    if (it.y !== undefined) { jump(it.y); return }
    const anchor = it.hash && document.getElementById(it.hash)
    if (anchor) { jump(topOf(anchor) - ANCHOR_GAP); focusAnchor(anchor); return }
    if (it.keep) return
    jump(pageTop())
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [loc])

  const navigate = useCallback((to) => {
    const hash = to.split('#')[1] || ''
    // Ссылка на текущий адрес: новую запись в истории не создаём, только прокручиваем (к якорю или в начало страницы)
    if (to === window.location.pathname + window.location.search + window.location.hash) {
      intent.current = { hash }
      setLoc(split(to.split('#')[0]))
      return
    }
    if (cur.current) positions.set(cur.current, window.scrollY)
    stamp()
    const k = newKey()
    window.history.pushState({ k }, '', to)
    cur.current = k
    intent.current = { hash }
    setLoc(split(to.split('#')[0]))
  }, [])
  return <Ctx.Provider value={{ ...loc, navigate }}>{children}</Ctx.Provider>
}
export const useRouter = () => useContext(Ctx)

export function Link({ to, onClick, ...rest }) {
  const { navigate } = useRouter()
  const handle = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || rest.target) return
    const u = new URL(to, window.location.href)
    if (u.origin !== window.location.origin) return
    e.preventDefault()
    navigate(u.pathname + u.search + u.hash)
  }
  return <a href={to} onClick={handle} {...rest} />
}
