// Филиалы — единый источник адресов и расписания для всех страниц.
// Необязательные поля (пустые не показываются на сайте):
//   trainers: ['slug-тренера'], photos: [фото зала: { src: '/img/...', alt: '...' } или как в gallery.js],
//   description: 'пара предложений о месте', howToGet: 'как дойти', reviews: [как в reviews.js]
// Добавить филиал = добавить запись сюда: страница, карточка и sitemap появятся автоматически.
const RAW = [
  { slug: 'pyhtino', name: 'Пыхтино', address: 'ул. Лётчика Ульянина, 5', schedule: [['Понедельник','17:00, 18:00, 19:00'],['Среда','17:00, 18:00, 19:00'],['Пятница','17:00, 18:00, 19:00']] },
  { slug: 'universitet', name: 'Университет', address: 'проспект Вернадского, 29', schedule: [['Среда','18:00, 19:00'],['Суббота','17:00, 18:00']] },
  { slug: 'proletarskaya', name: 'Пролетарская', address: 'ул. Крутицкая, 9с1', schedule: [['Вторник','18:00, 19:00'],['Четверг','18:00, 19:00'],['Воскресенье','12:00, 13:00']] },
  { slug: 'tushino', name: 'Тушино', address: 'ул. Тушинская, 17', schedule: [['Вторник','18:00, 19:00'],['Четверг','18:00, 19:00'],['Суббота','14:00, 15:00']] },
  { slug: 'dmitrovskaya', name: 'Дмитровская', address: 'ул. Новодмитровская, 5Ас2', schedule: [['Вторник','17:30, 18:30'],['Четверг','17:30, 18:30'],['Суббота','11:00, 12:00']] },
  { slug: 'vidnoe', name: 'Видное', address: 'ул. Радужная, 8', city: 'Видное', schedule: [['Понедельник','17:00'],['Пятница','16:00']] },
  { slug: 'govorovo', name: 'Говорово', address: 'ул. Центральная, 2/1', mapQuery: 'Москва, Говорово, ул. Центральная, 2/1', schedule: [['Среда','15:10']] },
]

const mapUrl = (q) => `https://yandex.ru/maps/?text=${encodeURIComponent(q)}`
export const BRANCHES = RAW.map((b) => ({
  city: 'Москва', trainers: [], photos: [], description: null, howToGet: null, reviews: [], ...b,
  mapUrl: mapUrl(b.mapQuery || `${b.city || 'Москва'}, ${b.address}`),
}))
export const BRANCH_BY = Object.fromEntries(BRANCHES.map((b) => [b.slug, b]))
