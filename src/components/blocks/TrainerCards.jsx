import { Link } from '../../lib/router.jsx'
import { BRANCH_BY } from '../../data/branches.js'
import { MediaSlot, TplTag } from '../ui/PreviewNote.jsx'
import { isSlot } from '../../data/preview.js'
import { srcOf, srcSetOf, thumbOf } from '../../data/gallery.js'

function Photo({ c, tpl }) {
  const p = typeof c.photo === 'string' ? { src: c.photo } : c.photo
  if (!p) return <MediaSlot label="Место для фото тренера" ratio="3/4" icon="users" />
  const img = p.base
    ? <img src={srcOf(p.base, p.w)} srcSet={srcSetOf(p.base, p.w)} sizes="(max-width:520px) 100vw, 360px" alt={tpl ? '' : (p.alt || c.name)} loading="lazy" />
    : <img src={thumbOf(p)} alt={tpl ? '' : (p.alt || c.name)} loading="lazy" />
  return (
    <>
      {img}
      {tpl && <span className="tcard-over"><b>Место для фото тренера</b></span>}
    </>
  )
}

// Карточка тренера: фото, имя, направление, рассказ, факты. Единая структура: факты прижаты к низу карточки.
// Карточка-пример (status: 'slot') выводит подсказки полей приглушённым стилем.
// Компактная карточка (главная) ведёт к полной карточке того же тренера на странице «Тренеры»: там рассказ и факты.
export default function TrainerCards({ items, compact = false }) {
  return (
    <div className={`tcards ${compact ? 'tcards-c' : ''}`}>{items.map((c) => {
      const tpl = isSlot(c)
      const branches = (c.branches || []).map((s) => BRANCH_BY[s]).filter(Boolean)
      // Филиалы — ссылками на страницы филиалов; неизвестный slug пропускается
      const facts = [
        c.experience && ['Опыт', c.experience],
        c.specialization && ['Специализация', c.specialization],
        branches.length > 0 ? ['Филиалы', branches.map((b, i) => <span key={b.slug}>{i > 0 && ', '}<Link to={`/filialy/${b.slug}/`}>{b.name}</Link></span>)] : (c.branchesNote && ['Филиалы', c.branchesNote]),
      ].filter(Boolean)
      return (
        <article key={c.slug} id={compact ? undefined : c.slug} className={`tcard ${tpl ? 'is-tpl' : ''}`}>
          <div className="tcard-ph"><Photo c={c} tpl={tpl} /></div>
          <div className="tcard-txt">
            {tpl && <TplTag />}
            <h3>{compact ? <Link to={`/trenery/#${c.slug}`}>{c.name}</Link> : c.name}{c.nick && <span className="nick">{c.nick}</span>}</h3>
            {c.role && <p className="role">{c.role}</p>}
            {!compact && c.about && <p className="about-t">{c.about}</p>}
            {!compact && facts.length > 0 && (
              <dl className="tfacts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            )}
            {!compact && c.awards?.length > 0 && (
              <details className="awards"><summary>Достижения</summary><ul>{c.awards.map((a) => <li key={a}>{a}</li>)}</ul></details>
            )}
          </div>
        </article>
      )
    })}</div>
  )
}
