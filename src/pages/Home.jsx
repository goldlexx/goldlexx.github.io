import { Link } from '../lib/router.jsx'
import Hero from '../components/blocks/Hero.jsx'
import VideoIntro from '../components/blocks/VideoIntro.jsx'
import WhyPride from '../components/blocks/WhyPride.jsx'
import BranchCards from '../components/blocks/BranchCards.jsx'
import TrainerCards from '../components/blocks/TrainerCards.jsx'
import Reviews from '../components/blocks/Reviews.jsx'
import PricesTeaser from '../components/blocks/PricesTeaser.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import Gallery from '../components/gallery/Gallery.jsx'
import SectionHead from '../components/ui/SectionHead.jsx'
import { BRANCHES } from '../data/branches.js'
import EventCards from '../components/blocks/EventCards.jsx'
import { COACHES_V, REVIEWS_V, REVIEWS_PAGE, EVENTS_V, PHOTOS_V } from '../data/visible.js'
import { HOME_LIMITS as L } from '../data/display.js'
import { keyOf } from '../data/gallery.js'
import { orderEvents, useToday } from '../lib/events.js'

// Превью разделов: не больше HOME_LIMITS; ссылка на полный список — только если материалов больше, чем показано.
export default function Home() {
  const today = useToday()
  const coaches = COACHES_V.slice(0, L.coaches)
  const reviews = REVIEWS_V.slice(0, L.reviews)
  const events = orderEvents(EVENTS_V, today).slice(0, L.events)
  // Фото, которые уже стоят в карточках тренеров и событий на этой странице, в галерее главной не повторяются
  // Ключ фото — как в галерее (keyOf: base или src); фото тренера может быть и строкой с путём
  const photoKey = (p) => (typeof p === 'string' ? p : p ? keyOf(p) : null)
  const used = new Set([...coaches.map((c) => photoKey(c.photo)), ...events.map((e) => photoKey(e.cover))].filter(Boolean))
  const photos = PHOTOS_V.filter((g) => !used.has(keyOf(g))).slice(0, L.photos)
  return (
    <>
      <Hero />
      <VideoIntro />
      <WhyPride more />
      <section className="sec alt"><div className="wrap">
        <SectionHead to="/filialy/" more="Все филиалы">Выберите <em>филиал</em></SectionHead>
        <BranchCards items={BRANCHES} />
      </div></section>
      {coaches.length > 0 && (
        <section className="sec"><div className="wrap">
          <SectionHead to={COACHES_V.length > coaches.length ? '/trenery/' : null} more="Вся команда">Тренеры</SectionHead>
          <TrainerCards items={coaches} compact />
        </div></section>
      )}
      {photos.length > 0 && (
        <section className="sec"><div className="wrap">
          <SectionHead to={PHOTOS_V.length > photos.length ? '/zhizn-kluba/' : null} more="Смотреть все фото">Жизнь <em>клуба</em></SectionHead>
          <Gallery items={photos} />
        </div></section>
      )}
      {events.length > 0 && (
        <section className="sec alt"><div className="wrap">
          <SectionHead to={EVENTS_V.length > events.length ? '/zhizn-kluba/#sobytiya' : null} more="Все события">Баттлы и <em>события</em></SectionHead>
          <EventCards items={events} />
        </div></section>
      )}
      {reviews.length > 0 && (
        <section className="sec"><div className="wrap">
          <SectionHead to={REVIEWS_PAGE ? '/otzyvy/' : null} more="Все отзывы">Отзывы</SectionHead>
          <Reviews items={reviews} />
        </div></section>
      )}
      <PricesTeaser />
      <CtaFinal />
    </>
  )
}
