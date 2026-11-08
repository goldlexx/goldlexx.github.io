import { useState } from 'react'
import PageHero from '../components/ui/PageHero.jsx'
import Gallery from '../components/gallery/Gallery.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import EventCards from '../components/blocks/EventCards.jsx'
import VideoCards from '../components/blocks/VideoCards.jsx'
import AchievementCards from '../components/blocks/AchievementCards.jsx'
import Reviews from '../components/blocks/Reviews.jsx'
import { CLUB_FILTERS, groupOf, visiblePhotos, PHOTO_SLOTS_PREVIEW } from '../data/gallery.js'
import { EVENTS, VIDEOS } from '../data/club.js'
import { REVIEWS } from '../data/reviews.js'
import { ACHIEVEMENTS } from '../data/achievements.js'
import { onlyVisible, CONTENT_PREVIEW_MODE } from '../data/preview.js'

// Обложка — общий кадр команды, которого нет в галерее ниже: первое фото галереи не повторяет шапку
const IMG = { base: '/img/ai/ai-why-team', w: [640, 1200, 1800], width: 2400, height: 1792 }

export default function Club() {
  const [f, setF] = useState('all')
  const photos = visiblePhotos()
  const items = f === 'all' ? photos : photos.filter((g) => groupOf(g) === f)
  const videos = onlyVisible(VIDEOS)
  const events = onlyVisible(EVENTS)
  const achievements = onlyVisible(ACHIEVEMENTS)
  const reviews = onlyVisible(REVIEWS)
  const showAch = achievements.length > 0 || CONTENT_PREVIEW_MODE
  return (
    <>
      <PageHero title="Жизнь клуба" lead="Тренировки, баттлы и команда PRIDE ONE." img={IMG} pos="50% 35%" crumbs={[['/', 'Главная']]} />
      <section className="sec" aria-labelledby="ph-h"><div className="wrap">
        <h2 id="ph-h" className="h2">Фото</h2>
        <div className="chips" role="group" aria-label="Фильтр фотографий">
          {CLUB_FILTERS.map(([k, t]) => <button key={k} type="button" className="chip" aria-pressed={f === k} onClick={() => setF(k)}>{t}</button>)}
        </div>
        <Gallery key={f} items={items} slots={f === 'all' ? PHOTO_SLOTS_PREVIEW : 0} />
      </div></section>
      {videos.length > 0 && (
        <section className="sec alt" aria-labelledby="vd-h"><div className="wrap">
          <h2 id="vd-h" className="h2">Видео</h2>
          {CONTENT_PREVIEW_MODE && <p className="notice-soft">Четыре места под видео: какие ролики здесь будут, выбирает школа. Видео загружается только по нажатию.</p>}
          <VideoCards items={videos} />
        </div></section>
      )}
      {events.length > 0 && (
        <section className="sec" aria-labelledby="ev-h"><div className="wrap">
          <h2 id="ev-h" className="h2">Баттлы, выезды и <em>события</em></h2>
          <EventCards items={events} />
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
          <h2 id="rv-h" className="h2">Отзывы</h2>
          <Reviews items={reviews} />
        </div></section>
      )}
      <CtaFinal />
    </>
  )
}
