export const DAYS = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
export const SHORT = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
export const times = (s) => s.split(',').map((t) => t.trim())
// Между временами — неразрывный пробел перед точкой: строка переносится только после «·», время не отрывается от разделителя
export const joinTimes = (list) => list.join(' · ')
export const fmtTimes = (s) => joinTimes(times(s))
export const activeDays = (b) => new Set(b.schedule.map(([d]) => DAYS.indexOf(d)))
// Все филиалы, сгруппированные по дню недели, внутри дня — по времени начала
export const byDay = (branches) => DAYS.map((day, i) => ({
  day, i,
  items: branches.flatMap((b) => b.schedule.filter(([d]) => d === day).map(([, t]) => ({ branch: b, times: times(t) })))
    .sort((a, b) => a.times[0].localeCompare(b.times[0])),
}))
// Минимальная цена абонемента — из данных, без ручного дублирования
export const fromPrice = (rows) => rows.map((r) => [Number(r[1].replace(/\D/g, '')), r[1]]).sort((a, b) => a[0] - b[0])[0][1]
