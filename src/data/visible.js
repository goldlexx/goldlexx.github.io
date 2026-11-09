// Готовые к показу списки разделов — единый источник для страниц, маршрутов и меню.
// Правила: только опубликованное; примеры заполнения — только в демо-режиме и только пока нет настоящих записей
// (см. published в preview.js); порядок — как записано в данных, если нет подтверждённого правила сортировки.
import { published } from './preview.js'
import { COACHES } from './coaches.js'
import { REVIEWS } from './reviews.js'
import { EVENTS, VIDEOS } from './club.js'
import { ACHIEVEMENTS } from './achievements.js'
import { visiblePhotos } from './gallery.js'
import { HOME_LIMITS } from './display.js'

export const COACHES_V = published(COACHES)
export const REVIEWS_V = published(REVIEWS)
export const EVENTS_V = published(EVENTS)
export const VIDEOS_V = published(VIDEOS)
export const ACHIEVEMENTS_V = published(ACHIEVEMENTS)
export const PHOTOS_V = visiblePhotos()

// Страница «Отзывы» нужна, только когда отзывов больше, чем помещается в превью (главная и «Жизнь клуба»):
// при 1–3 отзывах все они уже видны в превью, отдельная страница повторяла бы их и осталась бы без ссылок.
// Одно условие для маршрута, карты сайта и ссылок «Все отзывы».
export const REVIEWS_PAGE = REVIEWS_V.length > HOME_LIMITS.reviews
