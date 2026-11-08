import { useEffect, useRef } from 'react'
import { Icon } from '../ui/Icon.jsx'
import { fullOf, maxWOf } from '../../data/gallery.js'

export default function Lightbox({ items, index, onIndex, onClose }) {
  const ref = useRef(null)
  const touch = useRef(null)
  const n = items.length
  const g = items[index]
  const wMax = maxWOf(g)
  const go = (d) => onIndex((index + d + n) % n)
  useEffect(() => {
    ref.current?.showModal()
    const html = document.documentElement
    const prev = { o: html.style.overflow, p: html.style.paddingRight }
    const sb = window.innerWidth - html.clientWidth
    html.style.overflow = 'hidden'
    if (sb > 0) html.style.paddingRight = `${sb}px`
    return () => { html.style.overflow = prev.o; html.style.paddingRight = prev.p }
  }, [])
  useEffect(() => {
    ;[index - 1, index + 1].forEach((k) => { const t = items[(k + n) % n]; new Image().src = fullOf(t) })
  }, [index])
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
  }
  const onUp = (e) => {
    const t = touch.current; touch.current = null
    if (!t) return
    const dx = e.clientX - t.x, dy = e.clientY - t.y
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1)
  }
  return (
    <dialog ref={ref} className="lb" aria-label="Просмотр фотографий" onClose={onClose} onKeyDown={onKey}>
      <button type="button" className="lb-btn lb-close" aria-label="Закрыть" onClick={() => ref.current.close()}><Icon n="close" size={22} /></button>
      <div className="lb-stage" data-close onClick={(e) => { if (e.target.dataset.close !== undefined) ref.current.close() }}
        onPointerDown={(e) => { touch.current = { x: e.clientX, y: e.clientY } }} onPointerUp={onUp} onPointerCancel={() => { touch.current = null }}>
        <img key={index} className="lb-img" src={fullOf(g)} alt={g.alt} style={{ maxWidth: wMax ? `min(100%, ${wMax}px)` : '100%' }} draggable="false" />
      </div>
      <button type="button" className="lb-btn lb-prev" aria-label="Предыдущее фото" onClick={() => go(-1)}><Icon n="left" size={24} /></button>
      <button type="button" className="lb-btn lb-next" aria-label="Следующее фото" onClick={() => go(1)}><Icon n="right" size={24} /></button>
      <p className="lb-count" aria-live="polite">{index + 1} / {n}</p>
    </dialog>
  )
}
