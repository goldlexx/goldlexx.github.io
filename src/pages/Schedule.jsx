import { useState } from 'react'
import { Link } from '../lib/router.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import BranchTabs from '../components/blocks/BranchTabs.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { BRANCHES } from '../data/branches.js'
import { byDay, joinTimes } from '../lib/schedule.js'

// Горизонтальный кадр 16:9 (тренировка в зале): в шапке целиком и крупно; квадратный кадр при общей высоте шапки выходил мелким
const IMG = { base: '/img/ai/ai-video-training', w: [640, 1200, 1800], width: 1800, height: 1005 }

export default function Schedule() {
  const [mode, setMode] = useState('branch')
  return (
    <>
      <PageHero title="Расписание" lead="Время начала занятий во всех филиалах PRIDE ONE." img={IMG} crumbs={[['/', 'Главная']]} />
      <section className="sec"><div className="wrap">
        <div className="seg" role="group" aria-label="Вид расписания">
          <button type="button" aria-pressed={mode === 'branch'} onClick={() => setMode('branch')}>По филиалам</button>
          <button type="button" aria-pressed={mode === 'day'} onClick={() => setMode('day')}>По дням недели</button>
        </div>
        {mode === 'branch' ? <div className="br"><BranchTabs /></div> : (
          <div className="days">{byDay(BRANCHES).map(({ day, items }) => (
            <section key={day} className="day" aria-label={day}>
              <h3>{day}</h3>
              <ul>{items.map(({ branch, times }) => (
                <li key={branch.slug}><span className="day-b"><Link to={`/filialy/${branch.slug}/`}>{branch.name}</Link><small>{branch.address}{branch.city !== 'Москва' ? `, ${branch.city}` : ''}</small></span><span className="t">{joinTimes(times)}</span></li>
              ))}</ul>
            </section>
          ))}</div>
        )}
      </div></section>
      <CtaFinal />
    </>
  )
}
