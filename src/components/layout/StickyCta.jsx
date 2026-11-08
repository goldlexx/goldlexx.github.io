import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useRouter } from '../../lib/router.jsx'
import { TgBtn, CallBtn } from '../ui/Buttons.jsx'

// useLayoutEffect только в браузере (при пререндере эффекты не выполняются)
const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// Нижняя панель записи на телефонах (на десктопе скрыта стилями).
// Прячется, пока на экране первый экран главной (там свои кнопки записи, а фото брейкера должно быть видно сразу),
// блок NEXT STEP или подвал (в них те же кнопки «Telegram» и «Позвонить»).
// На главной панель с самого начала скрыта: в пререндере (класс off уже в HTML, гидратация совпадает) и при переходе
// на главную с другой страницы (состояние ставится до отрисовки, без анимации ухода). Дальше видимость решает
// IntersectionObserver: его первый отчёт приходит сразу после подписки, поэтому при возврате на главную с позицией
// ниже Hero панель появляется, а при прокрутке ниже Hero — выезжает снизу.
export default function StickyCta() {
  const { path } = useRouter()
  const [off, setOff] = useState(() => path === '/')
  const [still, setStill] = useState(false)
  const seen = useRef(new Set())
  const first = useRef(true)
  useIsoLayoutEffect(() => {
    if (first.current) { first.current = false; return }
    setStill(true) // смена страницы: состояние меняется мгновенно, без анимации
    setOff(path === '/')
  }, [path])
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    seen.current = new Set()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) e.isIntersecting ? seen.current.add(e.target) : seen.current.delete(e.target)
      setOff(seen.current.size > 0)
      setStill(false)
    })
    document.querySelectorAll('.hero, .cta, .ftr').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [path])
  return <div className={`sticky ${off ? 'off' : ''} ${still ? 'still' : ''}`} role="region" aria-label="Быстрая запись"><TgBtn>Telegram</TgBtn><CallBtn /></div>
}
