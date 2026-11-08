import { COACHES } from './coaches.js'
import { onlyVisible } from './preview.js'

// Адрес сайта задаётся при сборке: VITE_SITE_URL=https://домен npm run build
// Без него canonical и og:url относительные, sitemap.xml не создаётся.
export const SITE = {
  name: 'PRIDE ONE',
  url: (import.meta.env && import.meta.env.VITE_SITE_URL) || null,
  ogImage: '/og/og-default.jpg',
}
export const TG = 'https://t.me/PRIDEONEMOSCOW'
export const CONTACTS = {
  // Номер на сайте не выводится текстом: только кнопки «Позвонить» (tel:) и разметка schema.org для поисковиков.
  tel: '+79266784150',
  vk: 'https://vk.ru/pride0ne', vkLabel: 'vk.ru/pride0ne',
  ig: 'https://instagram.com/pride_one', igLabel: 'pride_one',
  maps: 'https://yandex.ru/maps/org/pride_one/53902095079/?ll=37.444791%2C55.826665&z=15',
}

export const NAV = [
  ['/o-shkole/', 'О школе'], ['/filialy/', 'Филиалы'], ['/raspisanie/', 'Расписание'], ['/tseny/', 'Цены'], ['/zhizn-kluba/', 'Жизнь клуба'],
  ...(onlyVisible(COACHES).length ? [['/trenery/', 'Тренеры']] : []),
  ['#contacts', 'Контакты'],
]

// Видео-знакомство с руководителем: укажите src (mp4/webm) или embed (ссылка плеера ВК/Rutube) и poster.
// Пока оба пустые, на сайте показывается подготовленное место без видео.
export const VIDEO = { src: null, embed: null, poster: null, title: 'Видео-знакомство с руководителем PRIDE ONE', person: 'Андрей, руководитель PRIDE ONE' }
