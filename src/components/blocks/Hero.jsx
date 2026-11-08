import { Link } from '../../lib/router.jsx'
import { Icon } from '../ui/Icon.jsx'

// Первый экран главной (визуал и тексты сохранены). Танцор на фото — вымышленный, не ученик и не тренер школы.
export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-art">
        <img src="/img/hero.webp" srcSet="/img/hero-1200.webp 1200w, /img/hero.webp 2400w" sizes="(max-width:860px) 100vw, 1400px" width="2400" height="1342" alt="Танцор исполняет элемент брейкинга на фоне граффити" fetchPriority="high" />
      </div>
      <div className="wrap hero-in">
        <p className="eyebrow">Школа брейкинга</p>
        <h1>Больше, чем танцы.<em>Это культура.</em><em>Характер. Сообщество.</em></h1>
        <p className="lead">Школа брейкинга PRIDE ONE</p>
        <div className="row">
          <Link className="btn btn-o" to="/zapis/">Записаться на пробное</Link>
          <Link className="btn btn-g" to="/filialy/"><Icon n="pin" size={16} />Найти филиал</Link>
        </div>
      </div>
    </section>
  )
}
