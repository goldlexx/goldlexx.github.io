import { Link } from '../../lib/router.jsx'
import WeekStrip from '../ui/WeekStrip.jsx'
import { thumbOf } from '../../data/gallery.js'

// Карточки филиалов: различаются неделей занятий (оранжевые дни), вся карточка — ссылка на страницу филиала.
export default function BranchCards({ items }) {
  return (
    <ul className="bcards">{items.map((b) => (
      <li key={b.slug} className={`bcard ${b.photos[0] ? 'has-cover' : ''}`}>
        {b.photos[0] && <img className="bcard-cover" src={thumbOf(b.photos[0])} alt="" loading="lazy" />}
        <h3><Link to={`/filialy/${b.slug}/`}>{b.name}</Link></h3>
        <p className="addr">{b.address}{b.city !== 'Москва' ? `, ${b.city}` : ''}</p>
        <WeekStrip branch={b} />
        <div className="bcard-foot"><span className="go">Расписание и запись</span><a className="route" href={b.mapUrl} target="_blank" rel="noopener noreferrer">Маршрут</a></div>
      </li>
    ))}</ul>
  )
}
