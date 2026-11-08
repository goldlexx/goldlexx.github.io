import PageHero from '../components/ui/PageHero.jsx'
import PricingCards from '../components/blocks/PricingCards.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { GALLERY } from '../data/gallery.js'

const IMG = GALLERY.find((g) => g.base?.endsWith('ai-gallery-05-coach-demo'))

export default function Prices() {
  return (
    <>
      <PageHero title="Цены" lead="Пробное, разовые и индивидуальные занятия, абонементы на 30 календарных дней." img={IMG} pos="50% 40%" tone={0.35} crumbs={[['/', 'Главная']]} />
      <section className="sec" id="price"><div className="wrap"><PricingCards title={null} /></div></section>
      <CtaFinal />
    </>
  )
}
