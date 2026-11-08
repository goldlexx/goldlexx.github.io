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
import { COACHES } from '../data/coaches.js'
import { REVIEWS } from '../data/reviews.js'
import { EVENTS } from '../data/club.js'
import EventCards from '../components/blocks/EventCards.jsx'
import { onlyVisible } from '../data/preview.js'
import { visiblePhotos, keyOf } from '../data/gallery.js'

export default function Home() {
  const coaches = onlyVisible(COACHES)
  const reviews = onlyVisible(REVIEWS)
  const events = onlyVisible(EVENTS)
  // Фото, которые уже стоят в карточках тренеров и событий на этой странице, в галерее главной не повторяются
  const used = new Set([...coaches.slice(0, 4).map((c) => c.photo?.base), ...events.slice(0, 3).map((e) => e.cover?.base)].filter(Boolean))
  const photos = visiblePhotos().filter((g) => !used.has(keyOf(g))).slice(0, 9)
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
          <SectionHead to="/trenery/" more="Вся команда">Тренеры</SectionHead>
          <TrainerCards items={coaches.slice(0, 4)} compact />
        </div></section>
      )}
      <section className="sec"><div className="wrap">
        <SectionHead to="/zhizn-kluba/" more="Смотреть все фото">Жизнь <em>клуба</em></SectionHead>
        <Gallery items={photos} />
      </div></section>
      {events.length > 0 && (
        <section className="sec alt"><div className="wrap">
          <SectionHead to="/zhizn-kluba/" more="Все события">Баттлы и <em>события</em></SectionHead>
          <EventCards items={events.slice(0, 3)} />
        </div></section>
      )}
      {reviews.length > 0 && (
        <section className="sec"><div className="wrap">
          <SectionHead to="/zhizn-kluba/" more="Все отзывы">Отзывы</SectionHead>
          <Reviews items={reviews.slice(0, 3)} />
        </div></section>
      )}
      <PricesTeaser />
      <CtaFinal />
    </>
  )
}
