import { Icon } from '../ui/Icon.jsx'
import { PRICES as P, money } from '../../data/prices.js'

const Row = ({ r }) => <li><span>{r[0]}</span><b>{money(r[1])}</b></li>
export default function PricingCards({ title = 'Прайс' }) {
  return (
    <>
      {title && <h2 className="h2">{title}</h2>}
      <div className="pr">
      <div className="pr-grid">
        <div className="card"><span className="ic"><Icon n="trophy" size={26} /></span><div><h3>Пробное занятие</h3><b className="big">{money(P.trial.price)}</b><p>{P.trial.note}</p></div></div>
        <div className="card"><span className="ic"><Icon n="flame" size={26} /></span><div><h3>Разовое занятие</h3><b className="big">{money(P.single)}</b></div></div>
        <div className="card"><span className="ic"><Icon n="target" size={26} /></span><div><h3 className="tt">Абонементы <small>({P.passes.note})</small></h3><ul>{P.passes.rows.map((r) => <Row key={r[0]} r={r} />)}</ul></div></div>
        <div className="card"><span className="ic"><Icon n="user" size={26} /></span><div><h3 className="tt">Индивидуальные уроки</h3><ul>{P.personal.map((r) => <Row key={r[0]} r={r} />)}</ul></div></div>
        <div className="card full"><span className="ic"><Icon n="users" size={26} /></span><div><h3>Комплексный индивидуальный</h3><ul>{P.group.map((r) => <Row key={r[0]} r={r} />)}</ul></div></div>
      </div>
      </div>
    </>
  )
}
