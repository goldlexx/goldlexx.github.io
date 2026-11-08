import { Link } from '../../lib/router.jsx'
import { Icon } from '../ui/Icon.jsx'
import { PHILOSOPHY, PARENTS, PILLARS } from '../../data/content.js'

// «Почему PRIDE ONE»: философия школы + шесть опор (объединены прежние преимущества и блок Breaking)
// more — ссылка «Подробнее о школе» (на главной; на самой странице «О школе» её нет)
export default function WhyPride({ title = 'Почему PRIDE ONE', img = true, more = false }) {
  return (
    <>
      <section className="about" aria-labelledby="why-h">
        {img && <img className="about-img" src="/img/ai/ai-why-team-1200.webp" srcSet="/img/ai/ai-why-team-640.webp 640w, /img/ai/ai-why-team-1200.webp 1200w, /img/ai/ai-why-team-1800.webp 1800w" sizes="(max-width:1020px) 100vw, 50vw" width="2400" height="1792" alt="Группа учеников и тренеры школы брейкинга" loading="lazy" />}
        <div className="about-txt">
          <h2 id="why-h">{title}</h2>
          <p className="quote">«{PHILOSOPHY}»</p>
          <p className="side">{PARENTS}</p>
          {more && <Link className="more" to="/o-shkole/">Подробнее о школе</Link>}
        </div>
      </section>
      <div className="pillars-wrap"><ul className="wrap pillars">{PILLARS.map(([i, t]) => <li key={t}><Icon n={i} size={30} /><span>{t}</span></li>)}</ul></div>
    </>
  )
}
