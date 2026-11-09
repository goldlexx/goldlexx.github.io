import { useState } from 'react'

// Постепенный показ длинного списка: сначала size элементов, кнопка добавляет следующую порцию.
// При пререндере в HTML попадает только первая порция — DOM не разрастается до сотен элементов.
// Сброс (например, при смене категории) — через key у компонента-владельца.
export function useBatch(total, size) {
  const [n, setN] = useState(size)
  const shown = Math.min(n, total)
  return { shown, next: () => setN((x) => x + size) }
}

// Счётчик «Показано N из M» — живой регион: скринридер сообщает, сколько добавилось. Кнопка исчезает, когда показано всё.
export function ShowMore({ shown, total, onMore }) {
  if (total <= shown) return null
  return (
    <div className="more-row">
      <p className="count" aria-live="polite">Показано {shown} из {total}</p>
      <button type="button" className="btn btn-g" onClick={onMore}>Показать ещё</button>
    </div>
  )
}
