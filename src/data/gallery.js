// Демонстрационные AI-фотографии (вымышленные люди), файлы в public/img/ai.
// Чтобы поставить настоящее фото школы: положить файл в public/img и заменить запись на { src: '/img/имя.jpg', alt: '...' }.
// Настоящие фотографии детей публиковать только при подтверждённом письменном разрешении родителей.
export const srcSetOf = (base, w) => w.map((x) => `${base}-${x}.webp ${x}w`).join(', ')
export const srcOf = (base, w) => `${base}-${w[w.length - 1]}.webp`
// Фото можно добавить и в простом виде: { src: '/img/имя.jpg', alt: 'описание', width: 1600, height: 1200 } — без подготовки нескольких размеров.
// width и height (размеры файла в пикселях) лучше указывать: тогда место под фото известно заранее и страница не «прыгает» при загрузке.
export const thumbOf = (g) => g.src || srcOf(g.base, g.w)
export const fullOf = (g) => g.src || srcOf(g.base, g.w)
export const maxWOf = (g) => (g.w ? g.w[g.w.length - 1] : g.width || null)
export const keyOf = (g) => g.base || g.src

export const GALLERY = [
  { base: '/img/ai/ai-gallery-01-battle-night', w: [640, 1200, 1800], width: 2400, height: 1792, category: 'battle', alt: 'Баттл-вечер: танцор в круге, зрители вокруг' },
  { base: '/img/ai/ai-gallery-02-floor-drill', w: [640, 1200, 1800], width: 2528, height: 1696, category: 'training', alt: 'Тренер и ученики отрабатывают элемент на полу' },
  { base: '/img/ai/ai-gallery-03-cypher-cheer', w: [640, 1200, 1800], width: 2400, height: 1792, category: 'battle', alt: 'Круг болеет за танцора во время баттла' },
  { base: '/img/ai/ai-gallery-04-coach-back', w: [640, 1200], width: 1536, height: 2752, category: 'battle', alt: 'Тренер в клубном жилете перед зрителями' },
  { base: '/img/ai/ai-gallery-05-coach-demo', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'coaches', alt: 'Тренер показывает движение ученикам' },
  { base: '/img/ai/ai-gallery-06-spotting', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'coaches', alt: 'Тренер страхует ученика в стойке на руках' },
  { base: '/img/ai/ai-gallery-07-team-laugh', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'club', alt: 'Тренер и ученики смеются после занятия' },
  { base: '/img/ai/ai-gallery-08-street-freeze', w: [640, 1200], width: 1792, height: 2400, category: 'club', alt: 'Фриз на улице на закате' },
  { base: '/img/ai/ai-gallery-09-high-five', w: [640, 1200], width: 1792, height: 2400, category: 'coaches', alt: 'Тренер даёт пять ученику после выхода' },
  { base: '/img/ai/ai-gallery-10-headstand-wall', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'training', alt: 'Ученик в стойке на голове у кирпичной стены' },
  { base: '/img/ai/ai-gallery-11-stretch', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'training', alt: 'Разминка и растяжка группы в зале' },
  { base: '/img/ai/ai-gallery-12-handstands-mirror', w: [640, 1200, 1800], width: 2048, height: 2048, category: 'training', alt: 'Тренировка: стойки в зале с зеркалом' },
  { base: '/img/ai/ai-gallery-13-group-sign', w: [640, 1200, 1800], width: 2400, height: 1792, category: 'team', alt: 'Группа учеников и тренер у фирменной вывески' },
]

// Фильтры страницы «Жизнь клуба»: ключ категории фото → группа фильтра
export const CLUB_FILTERS = [['all', 'Все'], ['training', 'Тренировки'], ['battle', 'Баттлы и события'], ['team', 'Команда']]
const GROUP = { training: 'training', coaches: 'training', battle: 'battle', team: 'team', club: 'team' }
export const groupOf = (g) => GROUP[g.category] || 'team'

// Сколько пустых мест под новые фото показывать в демо-режиме на странице «Жизнь клуба»
export const PHOTO_SLOTS_PREVIEW = 3
// Видимые фото (запись с hidden: true скрывается, но остаётся в данных)
export const visiblePhotos = () => GALLERY.filter((g) => !g.hidden)
