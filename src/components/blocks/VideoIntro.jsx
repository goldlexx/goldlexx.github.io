import { useState } from 'react'
import { Icon } from '../ui/Icon.jsx'
import { VIDEO as V } from '../../data/site.js'
import { CONTENT_PREVIEW_MODE } from '../../data/preview.js'

// Видео загружается только по нажатию. Пока файла нет — подготовленное место без плеера (только в демо-режиме);
// в публичном режиме блок без видео не выводится.
export default function VideoIntro() {
  const [play, setPlay] = useState(false)
  const ready = Boolean(V.src || V.embed)
  if (!ready && !CONTENT_PREVIEW_MODE) return null
  return (
    <section className="sec vid-sec" aria-labelledby="vid-h"><div className="wrap vid">
      <div className="vid-txt">
        <h2 id="vid-h" className="h2">Знакомство с <em>Андреем</em></h2>
        <p>{V.person}. В видео он расскажет о школе, её целях и о том, как устроены тренировки.</p>
      </div>
      <div className="vid-frame">
        {ready && play && (V.embed
          ? <iframe src={V.embed} title={V.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
          : <video src={V.src} poster={V.poster || undefined} controls autoPlay playsInline />)}
        {ready && !play && (
          <button type="button" className="vid-play" onClick={() => setPlay(true)} aria-label={`Смотреть: ${V.title}`}>
            {V.poster && <img src={V.poster} alt="" loading="lazy" />}<span className="vid-btn"><Icon n="play" size={30} /></span>
          </button>
        )}
        {!ready && (
          <div className="vid-ph">
            <span className="vid-btn off" aria-hidden="true"><Icon n="play" size={30} /></span>
            <b>Видео-знакомство скоро</b>
            <span>Здесь появится видео, когда школа его подготовит.</span>
          </div>
        )}
      </div>
    </div></section>
  )
}
