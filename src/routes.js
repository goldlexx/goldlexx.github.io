import { BRANCHES } from './data/branches.js'
import { COACHES_V, REVIEWS_PAGE } from './data/visible.js'
import { PRICES } from './data/prices.js'

// Карта сайта: путь → страница + метаданные. «Тренеры» появляются сами, когда в данных есть хотя бы одна опубликованная запись
// (в демо-режиме — пример заполнения); «Отзывы» — когда отзывов больше, чем в превью (REVIEWS_PAGE в visible.js).
// Пустых и повторяющих превью страниц в сборке не бывает.
export const routes = [
  { path: '/', page: 'home', title: 'PRIDE ONE — школа брейкинга', description: 'Школа брейкинга PRIDE ONE: культура, характер и сообщество. Семь филиалов, расписание, цены и запись на пробное занятие.' },
  { path: '/o-shkole/', page: 'about', title: 'О школе — PRIDE ONE', description: 'Философия PRIDE ONE, что такое брейкинг и из чего складываются занятия в школе.' },
  { path: '/filialy/', page: 'branches', title: 'Филиалы — PRIDE ONE', description: 'Семь филиалов школы брейкинга PRIDE ONE: адреса, дни занятий и маршрут.' },
  ...BRANCHES.map((b) => ({ path: `/filialy/${b.slug}/`, page: 'branch', slug: b.slug, title: `${b.name} — филиал PRIDE ONE`,
    description: `Школа брейкинга PRIDE ONE, филиал ${b.name}: ${b.address}. Расписание занятий и запись на пробное.` })),
  { path: '/raspisanie/', page: 'schedule', title: 'Расписание занятий — PRIDE ONE', description: 'Расписание занятий по брейкингу во всех филиалах PRIDE ONE: по филиалам и по дням недели.' },
  { path: '/tseny/', page: 'prices', title: 'Цены — PRIDE ONE', description: `Стоимость занятий в PRIDE ONE: пробное ${PRICES.trial.price}, разовое ${PRICES.single}, абонементы на 30 дней и индивидуальные занятия.` },
  { path: '/zhizn-kluba/', page: 'club', title: 'Жизнь клуба — PRIDE ONE', description: 'Тренировки, баттлы и команда PRIDE ONE в фотографиях.' },
  { path: '/zapis/', page: 'apply', title: 'Запись на пробное занятие — PRIDE ONE', description: 'Как записаться на пробное занятие в PRIDE ONE: Telegram и телефон.' },
  ...(REVIEWS_PAGE ? [{ path: '/otzyvy/', page: 'reviews', title: 'Отзывы — PRIDE ONE', description: 'Отзывы родителей и учеников о школе брейкинга PRIDE ONE.' }] : []),
  ...(COACHES_V.length ? [{ path: '/trenery/', page: 'trainers', title: 'Тренеры — PRIDE ONE', description: 'Команда тренеров школы брейкинга PRIDE ONE: опыт, филиалы и достижения.' }] : []),
]
export const notFound = { path: '/404/', page: 'notfound', title: 'Страница не найдена — PRIDE ONE', description: 'Такой страницы нет на сайте PRIDE ONE.', noindex: true }
export const match = (path) => routes.find((r) => r.path === path) || notFound
