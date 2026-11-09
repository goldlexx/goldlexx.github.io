import { COACHES_V } from './visible.js'

// Адрес сайта задаётся при сборке: VITE_SITE_URL=https://домен npm run build
// Без него canonical и og:url относительные, sitemap.xml не создаётся.
export const SITE = {
  name: 'PRIDE ONE',
  url: (import.meta.env && import.meta.env.VITE_SITE_URL) || null,
  ogImage: '/og/og-default.jpg',
}
// ЗАПИСЬ НА ЗАНЯТИЯ — единственный источник для всех кнопок записи: шапка, NEXT STEP, нижняя панель, страница «Запись»,
// страницы филиалов, «Telegram» в подвале. Чтобы сменить контакт для записи, достаточно поменять его здесь.
export const ENROLL_TG = 'https://t.me/LevRockZvuk'
// Канал школы в Telegram (публикации). Как кнопка записи не используется; на сайте ссылкой не выводится,
// указан только в разметке schema.org как профиль школы.
export const TG_CHANNEL = 'https://t.me/PRIDEONEMOSCOW'
export const CONTACTS = {
  // Номер на сайте не выводится текстом: только кнопки «Позвонить» (tel:) и разметка schema.org для поисковиков.
  tel: '+79266784150',
  vk: 'https://vk.ru/pride0ne', vkLabel: 'vk.ru/pride0ne',
  // Instagram школы пока не подтверждён: null — в подвале неактивная плашка «Instagram — скоро».
  // Когда школа пришлёт свой аккаунт, укажите ссылку: ig: 'https://instagram.com/…' — плашка сама станет ссылкой.
  ig: null,
  maps: 'https://yandex.ru/maps/org/pride_one/53902095079/?ll=37.444791%2C55.826665&z=15',
}

export const NAV = [
  ['/o-shkole/', 'О школе'], ['/filialy/', 'Филиалы'], ['/raspisanie/', 'Расписание'], ['/tseny/', 'Цены'], ['/zhizn-kluba/', 'Жизнь клуба'],
  ...(COACHES_V.length ? [['/trenery/', 'Тренеры']] : []),
  ['#contacts', 'Контакты'],
]

// Видео-знакомство с руководителем: укажите src (mp4/webm) или embed (ссылка плеера ВК/Rutube) и poster.
// Пока оба пустые, на сайте показывается подготовленное место без видео.
export const VIDEO = { src: null, embed: null, poster: null, title: 'Видео-знакомство с руководителем PRIDE ONE', person: 'Андрей, руководитель PRIDE ONE' }
