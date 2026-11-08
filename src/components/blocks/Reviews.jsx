import { MediaSlot, TplTag } from '../ui/PreviewNote.jsx'
import { isSlot } from '../../data/preview.js'
import { Icon } from '../ui/Icon.jsx'

// Отзывы: текстовые, видео и ссылки на внешние источники. Подпись автора — только при consent: true.
// Структура карточки одинаковая: содержимое сверху, подпись прижата к нижнему краю.
// Карточка-пример (status: 'slot') выводит подсказки полей приглушённым стилем.
export default function Reviews({ items }) {
  return (
    <div className="revs">{items.map((r) => {
      const tpl = isSlot(r)
      const author = tpl || r.consent ? r.author : null
      return (
        <figure key={r.id} className={`rev rev--${r.kind} ${tpl ? 'is-tpl' : ''}`}>
          {tpl && <TplTag />}
          {r.kind === 'video' && (r.video
            ? <video className="rev-video" src={r.video} controls preload="none" poster={r.poster || undefined} />
            : <MediaSlot label={tpl ? 'Место для видеоотзыва' : 'Выбрать и добавить видеоотзыв'} ratio="16/9" />)}
          <div className="rev-body">
            {r.kind === 'text' && r.text && <blockquote>{tpl ? r.text : `«${r.text}»`}</blockquote>}
            {r.kind !== 'text' && r.summary && <p className="rev-sum">{r.summary}</p>}
          </div>
          {(r.title || author || r.role) && (
            <figcaption>
              {r.title && <b>{r.title}</b>}
              {author && <b>{author}</b>}
              {r.role && <span className="rev-role">{r.role}</span>}
            </figcaption>
          )}
          {r.kind === 'link' && r.url && (
            <a className="btn btn-g rev-out" href={r.url} target="_blank" rel="noopener noreferrer"><Icon n="pin" size={16} />{r.linkLabel || 'Читать отзывы'}</a>
          )}
        </figure>
      )
    })}</div>
  )
}
