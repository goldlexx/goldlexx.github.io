import PageHero from '../components/ui/PageHero.jsx'
import Reviews from '../components/blocks/Reviews.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { ShowMore, useBatch } from '../components/ui/ShowMore.jsx'
import { REVIEWS_V } from '../data/visible.js'
import { PAGE_BATCH } from '../data/display.js'

// Кадр команды в зале (16:9): в шапке целиком; не повторяет шапки других страниц
const IMG = { base: '/img/ai/ai-video-team', w: [640, 1200, 1800], width: 1800, height: 1005 }

// Все опубликованные отзывы, порциями по PAGE_BATCH.reviews. Маршрут существует, только когда есть хотя бы один отзыв (routes.js).
export default function ReviewsPage() {
  const { shown, next } = useBatch(REVIEWS_V.length, PAGE_BATCH.reviews)
  return (
    <>
      <PageHero title="Отзывы" lead="Что говорят о занятиях в PRIDE ONE родители и ученики." img={IMG} crumbs={[['/', 'Главная']]} />
      <section className="sec"><div className="wrap">
        <Reviews items={REVIEWS_V.slice(0, shown)} />
        <ShowMore shown={shown} total={REVIEWS_V.length} onMore={next} />
      </div></section>
      <CtaFinal />
    </>
  )
}
