import { DAYS, SHORT, activeDays } from '../../lib/schedule.js'

// Неделя филиала: оранжевые — дни занятий. Используется в карточках, на странице филиала и в расписании.
export default function WeekStrip({ branch, large = false }) {
  const on = activeDays(branch)
  const label = 'Дни занятий: ' + DAYS.filter((_, i) => on.has(i)).map((d) => d.toLowerCase()).join(', ')
  return (
    <div className={`wk ${large ? 'wk-lg' : ''}`} role="img" aria-label={label}>
      {SHORT.map((s, i) => <span key={s} className={on.has(i) ? 'on' : ''} aria-hidden="true">{s}</span>)}
    </div>
  )
}
