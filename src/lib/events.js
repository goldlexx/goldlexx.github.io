import { useEffect, useState } from 'react'

// Порядок событий. Машинно-читаемая дата — необязательное поле date: 'ГГГГ-ММ-ДД', только если точная дата подтверждена
// (подпись для людей по-прежнему в dateLabel). Без date событие остаётся на своём месте в порядке данных.
// Три группы, группа определяется только полем date (даты не додумываются):
//   upcoming — точная дата сегодня или позже, ближайшее первым;
//   other    — точной даты нет (только подпись в dateLabel, например «Март 2026»): прошло событие или нет, неизвестно,
//              поэтому оно не называется ни ближайшим, ни прошедшим; стоит между ними — это может быть и анонс, и отчёт;
//   past     — точная дата уже прошла.
// Внутри other и past — порядок, который задала школа. Когда дата наступила и прошла, событие само переходит в past.
const ISO = /^\d{4}-\d{2}-\d{2}$/
export function splitEvents(list, today) {
  const dated = list.filter((e) => ISO.test(e.date || ''))
  const upcoming = dated.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date))
  const past = dated.filter((e) => e.date < today)
  const other = list.filter((e) => !ISO.test(e.date || ''))
  return { upcoming, other, past }
}
export const orderEvents = (list, today) => { const { upcoming, other, past } = splitEvents(list, today); return [...upcoming, ...other, ...past] }

// «Сегодня» для сортировки. При пререндере и первой отрисовке в браузере — дата сборки (одинаковая, гидратация совпадает),
// сразу после загрузки — текущая дата посетителя: если с момента сборки событие уже прошло, порядок обновится.
/* global __BUILD_DATE__ */
const BUILD_DATE = typeof __BUILD_DATE__ !== 'undefined' ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10)
const localToday = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}` }
export function useToday() {
  const [today, setToday] = useState(BUILD_DATE)
  useEffect(() => { const t = localToday(); if (t !== BUILD_DATE) setToday(t) }, [])
  return today
}
