import { CONTENT_PREVIEW_MODE } from '../../data/preview.js'
import { TplTag } from '../ui/PreviewNote.jsx'
import { srcOf, srcSetOf, thumbOf } from '../../data/gallery.js'

// Примеры заполнения, пока список достижений пуст (только демо-режим). Изображения — демонстрационные AI-фото.
// Подобраны так, чтобы не повторять обложку страницы и обложки событий над ними; фото показываются целиком (высота по пропорциям),
// поэтому здесь только горизонтальные кадры — вертикальный сделал бы карточку втрое выше соседних.
const SAMPLES = [
  { img: { base: '/img/ai/ai-gallery-01-battle-night', w: [640, 1200], width: 2400, height: 1792 }, date: 'Месяц и год', competition: 'Название соревнования', result: 'Место или номинация', context: 'Пара слов о событии и участии команды.' },
  { img: { base: '/img/ai/ai-video-battle', w: [640, 1200], width: 1800, height: 1005 }, date: 'Месяц и год', competition: 'Название баттла', result: 'Результат', context: 'Уровень соревнования, категория участников.' },
  { img: { base: '/img/ai/ai-video-show', w: [640, 1200], width: 1800, height: 1005 }, date: 'Месяц и год', competition: 'Название фестиваля', result: 'Номинация', context: 'Что показала команда.' },
]

const Card = ({ a, tpl }) => (
  <article className={`acard ${tpl ? 'is-tpl' : ''}`}>
    {a.img && <img src={srcOf(a.img.base, a.img.w)} srcSet={srcSetOf(a.img.base, a.img.w)} sizes="(max-width:520px) 100vw, 380px" width={a.img.width} height={a.img.height} alt="" loading="lazy" />}
    {a.photo && <img src={thumbOf(a.photo)} alt={a.photo.alt || a.competition} loading="lazy" />}
    <div className="acard-txt">
      {tpl && <TplTag />}
      <p className="ecat">{a.date}</p>
      <h3>{a.competition}</h3>
      {a.result && <p className="aresult">{a.result}</p>}
      {a.context && <p className="actx">{a.context}</p>}
    </div>
  </article>
)

// Достижения: только подтверждённые. Пустой список — примеры карточек в демо-режиме, в публичном ничего.
export default function AchievementCards({ items }) {
  if (!items.length) {
    if (!CONTENT_PREVIEW_MODE) return null
    return <div className="acards">{SAMPLES.map((a) => <Card key={a.competition} a={a} tpl />)}</div>
  }
  return <div className="acards">{items.map((a) => <Card key={a.id} a={a} />)}</div>
}
