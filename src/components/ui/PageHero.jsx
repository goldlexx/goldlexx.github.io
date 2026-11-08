import { Link } from '../../lib/router.jsx'
import { srcOf, srcSetOf, thumbOf } from '../../data/gallery.js'

// Шапка внутренних страниц: единственный H1 страницы, хлебные крошки, описание и фотография.
// Одна система для всех страниц:
//   — от 1024 px: текст слева, фото справа во всю базовую высоту шапки (--phh) и до правого края экрана.
//     Ширина области фото — не меньше 42% экрана; если кадр по своей пропорции шире (16:9 у «Расписания»),
//     он показывается в своей ширине целиком. Узкие (квадратные) кадры заполняют область с кадрированием
//     по точке pos, своей для каждого фото; ограничение maxAr не даёт квадрату превратиться в полосу на 1920 px.
//   — до 1024 px: текст, под ним фото по центру в горизонтальной карточке не уже 3:2 (та же точка pos).
// pos — точка кадрирования (object-position), где лица и главное действие; tone — лёгкое затемнение
// пересвеченного правого верхнего угла (0…0.5) для светлых кадров. Без фото шапка сохраняет ту же высоту.
export default function PageHero({ title, lead, img, pos = '50% 50%', maxAr = 1.75, tone = 0, crumbs, children }) {
  const ar = img?.width && img?.height ? img.width / img.height : 4 / 3
  const fit = (e) => {
    if (img?.width) return
    const a = e.currentTarget.naturalWidth / e.currentTarget.naturalHeight
    const ph = e.currentTarget.closest('.phero-ph')
    ph?.style.setProperty('--ar', a); ph?.style.setProperty('--arm', Math.max(a, 1.5))
  }
  return (
    <section className={`phero ${img ? 'has-img' : ''}`}>
      <div className="wrap phero-in">
        <div className="phero-txt">
          {crumbs && (
            <nav className="crumbs" aria-label="Навигационная цепочка">
              <ol>{crumbs.map(([to, t]) => <li key={to}><Link to={to}>{t}</Link></li>)}</ol>
            </nav>
          )}
          <h1>{title}</h1>
          {lead && <p className="lead">{lead}</p>}
          {children}
        </div>
        {img && (
          <div className="phero-ph" style={{ '--ar': ar, '--arm': Math.max(ar, 1.5), '--pos': pos, '--maxar': maxAr, '--tone': tone }}>
            <img className="phero-img" src={img.base ? srcOf(img.base, img.w) : thumbOf(img)} srcSet={img.base ? srcSetOf(img.base, img.w) : undefined}
              sizes="(max-width:1023px) 92vw, 820px" width={img.width} height={img.height} alt="" fetchPriority="high" onLoad={fit} />
          </div>
        )}
      </div>
    </section>
  )
}
