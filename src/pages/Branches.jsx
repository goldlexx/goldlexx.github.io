import { useState } from 'react'
import PageHero from '../components/ui/PageHero.jsx'
import BranchCards from '../components/blocks/BranchCards.jsx'
import MapPanel from '../components/blocks/MapPanel.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { BRANCHES } from '../data/branches.js'
import { DAYS, SHORT, activeDays } from '../lib/schedule.js'
import { GALLERY } from '../data/gallery.js'

const IMG = GALLERY.find((g) => g.base?.endsWith('ai-gallery-02-floor-drill'))

export default function Branches() {
  const [day, setDay] = useState(-1)
  const list = day < 0 ? BRANCHES : BRANCHES.filter((b) => activeDays(b).has(day))
  return (
    <>
      <PageHero title="Филиалы" lead="Семь филиалов школы брейкинга. Выберите удобный адрес и дни занятий." img={IMG} pos="50% 35%" tone={0.2} crumbs={[['/', 'Главная']]} />
      <section className="sec"><div className="wrap">
        <div className="chips" role="group" aria-label="Показать филиалы по дню занятий">
          <button type="button" className="chip" aria-pressed={day < 0} onClick={() => setDay(-1)}>Все дни</button>
          {SHORT.map((s, i) => <button key={s} type="button" className="chip" aria-pressed={day === i} aria-label={DAYS[i]} onClick={() => setDay(i)}>{s}</button>)}
        </div>
        <p className="count" aria-live="polite">{day < 0 ? `Все ${BRANCHES.length} филиалов` : `${DAYS[day]}: филиалов — ${list.length}`}</p>
        <BranchCards items={list} />
      </div></section>
      <section className="sec alt"><div className="wrap narrow">
        <h2 className="h2">На карте</h2>
        <MapPanel items={BRANCHES} />
      </div></section>
      <CtaFinal />
    </>
  )
}
