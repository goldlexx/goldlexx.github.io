import { useState } from 'react'
import { Icon } from '../ui/Icon.jsx'
import { isSlot } from '../../data/preview.js'

// Видеокарточка: обложка и кнопка воспроизведения; видео грузится только по нажатию.
function VideoCard({ v }) {
  const [play, setPlay] = useState(false)
  if (isSlot(v)) {
    return (
      <article className="vcard vcard-slot">
        <div className="vcard-media">
          {v.poster && <img src={v.poster} alt={v.posterAlt || ''} loading="lazy" />}
          <div className="vcard-over"><span className="slot-ic"><Icon n="play" size={26} /></span><b>Выбрать и добавить видео</b></div>
        </div>
        {v.topic && <p className="vcard-topic">Например: {v.topic}</p>}
      </article>
    )
  }
  return (
    <article className="vcard">
      <div className="vcard-media">
        {play
          ? (v.embed
            ? <iframe src={v.embed} title={v.title} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />
            : <video src={v.src} poster={v.poster || undefined} controls autoPlay playsInline />)
          : (
            <button type="button" className="vcard-play" onClick={() => setPlay(true)} aria-label={`Смотреть видео: ${v.title}`}>
              {v.poster && <img src={v.poster} alt="" loading="lazy" />}
              <span className="vid-btn"><Icon n="play" size={26} /></span>
            </button>
          )}
      </div>
      <h3>{v.title}</h3>
      {v.summary && <p>{v.summary}</p>}
    </article>
  )
}

export default function VideoCards({ items }) {
  return <div className="vcards">{items.map((v) => <VideoCard key={v.id} v={v} />)}</div>
}
