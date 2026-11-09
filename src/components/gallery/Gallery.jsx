import { useRef, useState } from 'react'
import Lightbox from './Lightbox.jsx'
import { thumbOf, srcSetOf, keyOf } from '../../data/gallery.js'
import { CONTENT_PREVIEW_MODE } from '../../data/preview.js'
import { Icon } from '../ui/Icon.jsx'
import { ShowMore, useBatch } from '../ui/ShowMore.jsx'

const SLOT_AR = [4 / 3, 3 / 4, 1]

// Сетка по пропорциям фото (без обрезки) + просмотр.
// batch — показывать порциями (сначала batch фото, «Показать ещё» добавляет следующие); 0 — все сразу.
// Просмотр листает весь список, а не только показанную часть: в DOM всегда одно большое фото.
// slots — сколько пустых мест под новые фото добавить в конце (только в демо-режиме, когда показаны все фото).
export default function Gallery({ items, slots = 0, batch = 0 }) {
  const [idx, setIdx] = useState(null)
  const opener = useRef(null)
  const { shown, next } = useBatch(items.length, batch || items.length)
  const visible = batch ? items.slice(0, shown) : items
  const empty = CONTENT_PREVIEW_MODE && visible.length === items.length ? slots : 0
  return (
    <>
      <div className="gal">
        {visible.map((g, i) => {
          const ar = g.width && g.height ? g.width / g.height : 4 / 3
          const fit = (e) => { if (!g.width) e.currentTarget.closest('figure').style.setProperty('--ar', e.currentTarget.naturalWidth / e.currentTarget.naturalHeight) }
          return (
            <figure key={keyOf(g)} style={{ '--ar': ar }}>
              <button type="button" aria-haspopup="dialog" onClick={(e) => { opener.current = e.currentTarget; setIdx(i) }}>
                <img src={thumbOf(g)} srcSet={g.base ? srcSetOf(g.base, g.w) : undefined} sizes="(max-width:700px) 50vw, 380px" width={g.width} height={g.height} alt={g.alt} loading="lazy" onLoad={fit} />
              </button>
            </figure>
          )
        })}
        {Array.from({ length: empty }, (_, k) => (
          <figure key={`slot-${k}`} className="gal-slot" style={{ '--ar': SLOT_AR[k % SLOT_AR.length] }} aria-label="Место для новой фотографии">
            <div className="slot"><span className="slot-ic"><Icon n="layers" size={24} /></span><b>Выбрать и добавить фотографию</b></div>
          </figure>
        ))}
      </div>
      {batch > 0 && <ShowMore shown={shown} total={items.length} onMore={next} />}
      {idx !== null && <Lightbox items={items} index={idx} onIndex={setIdx} onClose={() => { setIdx(null); requestAnimationFrame(() => opener.current?.focus()) }} />}
    </>
  )
}
