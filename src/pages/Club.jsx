import { Fragment, useState } from 'react'
import PageHero from '../components/ui/PageHero.jsx'
import Gallery from '../components/gallery/Gallery.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import EventCards from '../components/blocks/EventCards.jsx'
import VideoCards from '../components/blocks/VideoCards.jsx'
import AchievementCards from '../components/blocks/AchievementCards.jsx'
import Reviews from '../components/blocks/Reviews.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import { ShowMore, useBatch } from '../components/ui/ShowMore.jsx'
import { CLUB_FILTERS, groupOf, PHOTO_SLOTS_PREVIEW } from '../data/gallery.js'
import { PHOTOS_V, VIDEOS_V, EVENTS_V, ACHIEVEMENTS_V, REVIEWS_V, REVIEWS_PAGE } from '../data/visible.js'
import { HOME_LIMITS, PAGE_BATCH } from '../data/display.js'
import { CONTENT_PREVIEW_MODE } from '../data/preview.js'
import { splitEvents, useToday } from '../lib/events.js'

// Обложка — общий кадр команды, которого нет в галерее ниже: первое фото галереи не повторяет шапку
const IMG = { base: '/img/ai/ai-why-team', w: [640, 1200, 1800], width: 2400, height: 1792 }

// События порциями по PAGE_BATCH.events, группами (lib/events.js): «Ближайшие» и «Прошедшие» — только по подтверждённой
// точной дате (date), «Другие события» — без точной даты. Подзаголовки — только если непустых групп больше одной.
function ClubEvents({ events }) {
  const today = useToday()
  const { upcoming, other, past } = splitEvents(events, today)
  const { shown, next } = useBatch(events.length, PAGE_BATCH.events)
  const groups = [['Ближайшие', upcoming], ['Другие события', other], ['Прошедшие', past]].filter(([, list]) => list.length)
  const titled = groups.length > 1
  let left = shown
  return (
    <>
      {groups.map(([title, list]) => {
        const part = list.slice(0, Math.max(0, left))
        left -= list.length
        return part.length > 0 && (
          <Fragment key={title}>
            {titled && <h3 className="ev-group">{title}</h3>}
            <EventCards items={part} />
          </Fragment>
        )
      })}
      <ShowMore shown={shown} total={events.length} onMore={next} />
    </>
  )
}

export default function Club() {
  const [f, setF] = useState('all')
  const photos = PHOTOS_V
  const items = f === 'all' ? photos : photos.filter((g) => groupOf(g) === f)
  // Кнопки категорий — только для категорий, в которых есть фото; если непустая категория одна, фильтр не нужен
  const filters = CLUB_FILTERS.filter(([k]) => k === 'all' || photos.some((g) => groupOf(g) === k))
  const slots = CONTENT_PREVIEW_MODE ? PHOTO_SLOTS_PREVIEW : 0
  const videos = VIDEOS_V
  const events = EVENTS_V
  const achievements = ACHIEVEMENTS_V
  const reviews = REVIEWS_V.slice(0, HOME_LIMITS.reviews)
  const showAch = achievements.length > 0 || CONTENT_PREVIEW_MODE
  return (
    <>
      <PageHero title="Жизнь клуба" lead="Тренировки, баттлы и команда PRIDE ONE." img={IMG} pos="50% 35%" crumbs={[['/', 'Главная']]} />
      {(photos.length > 0 || slots > 0) && (
        <section className="sec" aria-labelledby="ph-h"><div className="wrap">
          <h2 id="ph-h" className="h2">Фото</h2>
          {filters.length > 2 && (
            <div className="chips" role="group" aria-label="Фильтр фотографий">
              {filters.map(([k, t]) => <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{t}</button>)}
            </div>
          )}
          <Gallery key={f} items={items} batch={PAGE_BATCH.photos} slots={f === 'all' ? slots : 0} />
        </div></section>
      )}
      {videos.length > 0 && (
        <section className="sec alt" aria-labelledby="vd-h"><div className="wrap">
          <h2 id="vd-h" className="h2">Видео</h2>
          {CONTENT_PREVIEW_MODE && <p className="notice-soft">Четыре места под видео: какие ролики здесь будут, выбирает школа. Видео загружается только по нажатию.</p>}
          <VideoCards items={videos} />
        </div></section>
      )}
      {events.length > 0 && (
        <section className="sec" id="sobytiya" aria-labelledby="ev-h"><div className="wrap">
          <h2 id="ev-h" className="h2">Баттлы, выезды и <em>события</em></h2>
          <ClubEvents events={events} />
        </div></section>
      )}
      {showAch && (
        <section className="sec alt" aria-labelledby="ac-h"><div className="wrap">
          <h2 id="ac-h" className="h2">Достижения</h2>
          <AchievementCards items={achievements} />
        </div></section>
      )}
      {reviews.length > 0 && (
        <section className="sec" aria-labelledby="rv-h"><div className="wrap">
          {/* Превью: полный список — на странице «Отзывы», ссылка только если отзывов больше, чем показано */}
          <SectionHead to={REVIEWS_PAGE ? '/otzyvy/' : null} more="Все отзывы"><span id="rv-h">Отзывы</span></SectionHead>
          <Reviews items={reviews} />
        </div></section>
      )}
      <CtaFinal />
    </>
  )
}
