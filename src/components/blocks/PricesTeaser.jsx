import { Link } from '../../lib/router.jsx'
import SectionHead from '../ui/SectionHead.jsx'
import { PRICES as P, money } from '../../data/prices.js'
import { fromPrice } from '../../lib/schedule.js'

export default function PricesTeaser() {
  const tiles = [['Пробное занятие', money(P.trial.price)], ['Разовое занятие', money(P.single)], ['Абонементы на 30 дней', `от ${money(fromPrice(P.passes.rows))}`]]
  return (
    <section className="sec alt"><div className="wrap">
      <SectionHead to="/tseny/" more="Все цены">Цены</SectionHead>
      <ul className="tease">{tiles.map(([t, v]) => <li key={t}><Link to="/tseny/"><span>{t}</span><b>{v}</b></Link></li>)}</ul>
      <p className="note">{P.trial.note}</p>
    </div></section>
  )
}
