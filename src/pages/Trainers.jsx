import PageHero from '../components/ui/PageHero.jsx'
import TrainerCards from '../components/blocks/TrainerCards.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { COACHES_V } from '../data/visible.js'
import { GALLERY } from '../data/gallery.js'

// Тренер страхует ученика в стойке: кадр о работе тренера, не повторяет фото в карточках-примерах ниже
const IMG = GALLERY.find((g) => g.base?.endsWith('ai-gallery-06-spotting'))

export default function Trainers() {
  const items = COACHES_V
  return (
    <>
      <PageHero title="Тренеры" lead="Команда школы брейкинга PRIDE ONE." img={IMG} pos="50% 55%" crumbs={[['/', 'Главная']]} />
      <section className="sec"><div className="wrap"><TrainerCards items={items} /></div></section>
      <CtaFinal />
    </>
  )
}
