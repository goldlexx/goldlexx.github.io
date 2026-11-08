import PageHero from '../components/ui/PageHero.jsx'
import VideoIntro from '../components/blocks/VideoIntro.jsx'
import WhyPride from '../components/blocks/WhyPride.jsx'
import CtaFinal from '../components/blocks/CtaFinal.jsx'
import { Icon } from '../components/ui/Icon.jsx'
import { GALLERY } from '../data/gallery.js'
import { DIRECTIONS, BREAKING_ELEMENTS, TRAINING_FLOW, VALUES, HISTORY } from '../data/content.js'
import { NeedNote } from '../components/ui/PreviewNote.jsx'
import { CONTENT_PREVIEW_MODE } from '../data/preview.js'

const IMG = GALLERY.find((g) => g.base?.endsWith('ai-gallery-07-team-laugh'))

export default function About() {
  return (
    <>
      <PageHero title="О школе PRIDE ONE" lead="Больше, чем танцы. Это культура, характер и сообщество." img={IMG} pos="50% 28%" tone={0.25} crumbs={[['/', 'Главная']]} />
      <VideoIntro />
      <WhyPride title="Философия школы" />
      <section className="sec"><div className="wrap brk-about">
        <div>
          <h2 className="h2">Что такое <em>брейкинг</em></h2>
          <p>Брейкинг появился в 1970-х годах в Нью-Йорке, в Бронксе, как часть культуры хип-хопа. Танцоры выходили в круг под брейки — инструментальные фрагменты треков — и соревновались в баттлах.</p>
          <p>Сегодня это и уличная культура, и спорт: в 2024 году брейкинг дебютировал на Олимпийских играх в Париже.</p>
        </div>
        <dl className="elems">{BREAKING_ELEMENTS.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
      </div></section>
      <section className="sec alt"><div className="wrap">
        <h2 className="h2">Из чего складываются <em>занятия</em></h2>
        <ul className="pillars pillars-4">{DIRECTIONS.map(([i, t]) => <li key={t}><Icon n={i} size={30} /><span>{t}</span></li>)}</ul>
      </div></section>
      <section className="sec"><div className="wrap narrow">
        <h2 className="h2">Как проходит <em>тренировка</em></h2>
        <ol className="flow">{TRAINING_FLOW.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ol>
      </div></section>
      <section className="sec alt"><div className="wrap">
        <h2 className="h2">Ценности <em>школы</em></h2>
        <ul className="vals">{VALUES.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
      </div></section>
      {(HISTORY.length > 0 || CONTENT_PREVIEW_MODE) && (
        <section className="sec"><div className="wrap narrow">
          <h2 className="h2">История <em>школы</em></h2>
          {HISTORY.length > 0
            ? <ol className="hist">{HISTORY.map(([y, t]) => <li key={y + t}><b>{y}</b><span>{t}</span></li>)}</ol>
            : <NeedNote title="Место под историю школы" items={['год открытия школы', 'когда открывались филиалы', 'ключевые события и достижения — только подтверждённые']} />}
        </div></section>
      )}
      <CtaFinal />
    </>
  )
}
