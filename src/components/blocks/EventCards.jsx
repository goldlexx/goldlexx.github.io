import Gallery from '../gallery/Gallery.jsx'
import { MediaSlot, TplTag } from '../ui/PreviewNote.jsx'
import { isSlot } from '../../data/preview.js'
import { EVENT_CATEGORIES } from '../../data/club.js'
import { srcOf, srcSetOf, thumbOf } from '../../data/gallery.js'

const CAT = Object.fromEntries(EVENT_CATEGORIES)

function Cover({ e, tpl }) {
  const c = e.cover
  const alt = tpl ? '' : (c.alt || e.title)
  const style = c.width && c.height ? { '--ar': c.width / c.height } : undefined
  return c.base
    ? <img className="ecover" src={srcOf(c.base, c.w)} srcSet={srcSetOf(c.base, c.w)} sizes="(max-width:860px) 100vw, 480px" width={c.width} height={c.height} style={style} alt={alt} loading="lazy" />
    : <img className="ecover" src={thumbOf(c)} width={c.width} height={c.height} style={style} alt={alt} loading="lazy" />
}

// Карточка события: обложка, категория и дата, название, описание, участие и результат, «Подробнее» при наличии ссылки.
// Карточка-пример (status: 'slot') выводит подсказки полей приглушённым стилем.
export default function EventCards({ items }) {
  return (
    <div className="events">{items.map((e) => {
      const tpl = isSlot(e)
      return (
        <article key={e.slug} className={`ecard ${tpl ? 'is-tpl' : ''}`}>
          <div className="ecard-media">
            {e.cover
              ? <Cover e={e} tpl={tpl} />
              : e.photos?.length > 0
                ? <Gallery items={e.photos} />
                : <MediaSlot label="Выбрать и добавить фото события" ratio="16/10" icon="crown" />}
          </div>
          <div className="ecard-txt">
            {tpl && <TplTag />}
            <p className="ecat">{CAT[e.category]}{e.dateLabel ? ` · ${e.dateLabel}` : ''}</p>
            <h3>{e.title}</h3>
            {e.summary && <p className="esum">{e.summary}</p>}
            {e.facts?.length > 0 && <ul className="efacts">{e.facts.map((f) => <li key={f}>{f}</li>)}</ul>}
            {e.link && <a className="more" href={e.link} target="_blank" rel="noopener noreferrer">Подробнее</a>}
          </div>
          {/* Фотоотчёт при наличии обложки — отдельным рядом миниатюр на всю ширину карточки, с просмотром в Lightbox */}
          {e.cover && e.photos?.length > 0 && <div className="ecard-more"><Gallery items={e.photos} /></div>}
        </article>
      )
    })}</div>
  )
}
