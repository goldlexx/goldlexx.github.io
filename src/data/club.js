// РАЗДЕЛ «ЖИЗНЬ КЛУБА»: видео и события.
//
// ВИДЕО. Чтобы добавить видео, замените пустое место на запись:
//   { id: 'trenirovka-2026', status: 'confirmed', title: 'Тренировка в Тушино', summary: 'Короткое описание',
//     poster: '/img/video-poster.jpg', src: '/video/trenirovka.mp4' }   // или embed: 'ссылка плеера ВК/Rutube'
// Пустые места (status: 'slot') видны только в демо-режиме. topic — подсказка, какое видео сюда подойдёт.
export const VIDEOS = [
  { id: 'slot-training', status: 'slot', topic: 'тренировка', poster: '/img/ai/ai-video-training-1200.webp', posterAlt: 'Тренировка в зале' },
  { id: 'slot-battle', status: 'slot', topic: 'баттл', poster: '/img/ai/ai-video-battle-1200.webp', posterAlt: 'Баттл в круге' },
  { id: 'slot-show', status: 'slot', topic: 'выступление', poster: '/img/ai/ai-video-show-1200.webp', posterAlt: 'Выступление на сцене' },
  { id: 'slot-team', status: 'slot', topic: 'жизнь команды', poster: '/img/ai/ai-video-team-1200.webp', posterAlt: 'Команда после тренировки' },
]

// СОБЫТИЯ КЛУБА: баттлы, соревнования, выступления, мероприятия
// Сведения о событиях школа присылает сама. Публикации в Telegram источником не являются.
// Поля карточки: title, category, dateLabel (дата и место, только подтверждённые), summary, facts[] (участие команды, результат),
//   cover — обложка ({ src: '/img/...', alt: '...' } или как в gallery.js), photos[] — дополнительные фото,
//   link — ссылка «Подробнее», hidden: true — скрыть, не удаляя.
// Имена и результаты несовершеннолетних — только с письменного согласия родителей.
// Пример настоящей записи:
//   { slug: 'battl-2026', status: 'confirmed', category: 'battle', title: 'Название', dateLabel: 'Март 2026, Москва',
//     summary: '…', facts: ['…'], cover: { src: '/img/battl-2026.jpg', alt: '…' } }
// Сейчас в списке только примеры заполнения (status: 'slot'): видны в демо-режиме, в публичном скрыты.
export const EVENT_CATEGORIES = [
  ['battle', 'Баттл'], ['competition', 'Соревнования'], ['show', 'Выступление'],
  ['event', 'Мероприятие'], ['training', 'Тренировки'], ['team', 'Команда'],
]

// width/height — размеры исходника: обложка показывается целиком, место под неё известно до загрузки
const cover = (name, width, height, w = [640, 1200, 1800]) => ({ base: `/img/ai/${name}`, w, width, height, alt: '' })

export const EVENTS = [
  {
    slug: 'primer-battle', status: 'slot', category: 'battle',
    title: 'Название баттла', dateLabel: 'Дата и место проведения',
    summary: 'Краткое описание: формат баттла, номинации, атмосфера в круге.',
    facts: ['Участие команды: кто выступал от PRIDE ONE', 'Результат — если школа захочет его указать'],
    cover: cover('ai-gallery-03-cypher-cheer', 2400, 1792),
  },
  {
    slug: 'primer-competition', status: 'slot', category: 'competition',
    title: 'Название соревнования', dateLabel: 'Дата и город',
    summary: 'Пара предложений о выезде: уровень соревнования, как готовилась команда.',
    facts: ['Участие команды', 'Результат или номинация — по желанию'],
    cover: cover('ai-gallery-08-street-freeze', 1792, 2400, [640, 1200]),
  },
  {
    slug: 'primer-event', status: 'slot', category: 'event',
    title: 'Название мероприятия', dateLabel: 'Дата и место',
    summary: 'Что происходило: выступление, открытый урок, праздник или встреча команды.',
    facts: ['Кто участвовал', 'Фото и видео с мероприятия'],
    cover: cover('ai-gallery-13-group-sign', 2400, 1792),
  },
]
