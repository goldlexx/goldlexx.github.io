// ДЕМОНСТРАЦИОННЫЙ РЕЖИМ
// true  — показываем заготовки: примеры заполнения карточек, места под фото и видео (для показа владельцу школы)
// false — публичный режим: видно только подтверждённое школой, примеров и заглушек нет, пустые блоки скрыты
export const CONTENT_PREVIEW_MODE = true

// Поля записи в любом модуле данных:
//   status: 'confirmed' — подтверждено школой, показывается всегда
//           'slot'      — пример заполнения или пустое место под будущий материал (только в демо-режиме)
//   hidden: true         — скрыть запись в любом режиме, не удаляя её из данных
// Публикации школы в Telegram источником контента не являются: на сайт попадает только то, что школа передала и подтвердила.
export const isVisible = (item) => !item.hidden && (item.status === 'confirmed' || CONTENT_PREVIEW_MODE)
export const isSlot = (item) => item.status === 'slot'
export const onlyVisible = (list) => list.filter(isVisible)

// Список раздела для показа на сайте: настоящие записи (confirmed, без hidden). Примеры заполнения (slot) появляются
// только в демо-режиме и только пока в разделе нет ни одной настоящей записи — примеры никогда не стоят рядом с реальными.
export const published = (list) => {
  const live = list.filter((x) => !x.hidden)
  const real = live.filter((x) => x.status === 'confirmed')
  if (real.length || !CONTENT_PREVIEW_MODE) return real
  return live.filter(isSlot)
}
