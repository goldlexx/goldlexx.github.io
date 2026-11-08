import { Link } from '../lib/router.jsx'

export default function NotFound() {
  return (
    <section className="sec nf"><div className="wrap">
      <h1>Такой страницы нет</h1>
      <p className="lead-m">Возможно, ссылка устарела. Начните с главной или выберите филиал.</p>
      <div className="row"><Link className="btn btn-o" to="/">На главную</Link><Link className="btn btn-g" to="/filialy/">Филиалы</Link></div>
    </div></section>
  )
}
