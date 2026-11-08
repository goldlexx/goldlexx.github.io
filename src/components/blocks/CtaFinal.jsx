import { TgBtn, CallBtn } from '../ui/Buttons.jsx'

export default function CtaFinal() {
  return (
    <section className="cta"><div className="wrap cta-in">
      <h2><span>Готов сделать свой</span><b>NEXT STEP?</b></h2>
      <div className="row"><TgBtn /><CallBtn /></div>
    </div><img className="cta-img" src="/img/ai/ai-cta-next-step-1200.webp" srcSet="/img/ai/ai-cta-next-step-640.webp 640w, /img/ai/ai-cta-next-step-1200.webp 1200w, /img/ai/ai-cta-next-step-1800.webp 1800w" sizes="(max-width:860px) 100vw, 50vw" width="2400" height="1792" alt="" loading="lazy" /></section>
  )
}
