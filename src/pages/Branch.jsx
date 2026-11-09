import { Link } from '../lib/router.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import WeekStrip from '../components/ui/WeekStrip.jsx'
import { Icon } from '../components/ui/Icon.jsx'
import { TgBtn, CallBtn } from '../components/ui/Buttons.jsx'
import Gallery from '../components/gallery/Gallery.jsx'
import TrainerCards from '../components/blocks/TrainerCards.jsx'
import Reviews from '../components/blocks/Reviews.jsx'
import { BRANCHES, BRANCH_BY } from '../data/branches.js'
import { COACHES_V } from '../data/visible.js'
import { fmtTimes } from '../lib/schedule.js'
import { MediaSlot, NeedNote } from '../components/ui/PreviewNote.jsx'
import { CONTENT_PREVIEW_MODE, published } from '../data/preview.js'

// Общий шаблон страницы филиала: показываются только заполненные и подтверждённые данные.
export default function Branch({ slug }) {
  const b = BRANCH_BY[slug]
  const i = BRANCHES.indexOf(b), n = BRANCHES.length
  const prev = BRANCHES[(i - 1 + n) % n], next = BRANCHES[(i + 1) % n]
  // Тренеры филиала — из общего списка COACHES_V по полю branches у тренера (единственный источник связи «тренер — филиал»).
  // Отзывы филиала проходят те же правила видимости, что и на остальных страницах (slot — только демо, hidden — никогда).
  const trainers = COACHES_V.filter((c) => c.branches?.includes(b.slug))
  const reviews = published(b.reviews)
  const photos = b.photos.filter((p) => !p.hidden)
  return (
    <>
      <PageHero title={b.name} lead={`Филиал школы брейкинга PRIDE ONE, ${b.address}${b.city !== 'Москва' ? `, ${b.city}` : ''}`} img={photos[0]} crumbs={[['/', 'Главная'], ['/filialy/', 'Филиалы']]}>
        <div className="phero-wk"><WeekStrip branch={b} large /></div>
      </PageHero>
      <section className="sec"><div className="wrap bp">
        <div className="bp-card">
          <h2>Расписание</h2>
          <dl className="bp-days">{b.schedule.map(([d, t]) => <div key={d}><dt>{d}</dt><dd>{fmtTimes(t)}</dd></div>)}</dl>
          <p className="note">Указано время начала занятий.</p>
        </div>
        <div className="bp-side">
          <div className="bp-card">
            <h2>Адрес</h2>
            <p className="bp-addr"><Icon n="pin" size={18} />{b.address}{b.city !== 'Москва' ? `, ${b.city}` : ''}</p>
            {b.description && <p>{b.description}</p>}
            {b.howToGet && <p>{b.howToGet}</p>}
            <a className="btn btn-g" href={b.mapUrl} target="_blank" rel="noopener noreferrer"><Icon n="route" size={18} />Построить маршрут</a>
          </div>
          <div className="bp-card bp-cta">
            <h2>Пробное занятие</h2>
            <p>Напишите в Telegram или позвоните — подскажем ближайшую группу в этом филиале.</p>
            <div className="acts"><TgBtn>Записаться</TgBtn><CallBtn /></div>
            <Link className="more" to={`/zapis/?filial=${b.slug}`}>Все способы записи</Link>
          </div>
        </div>
      </div></section>
      {trainers.length > 0 && <section className="sec alt"><div className="wrap"><h2 className="h2">Тренеры филиала</h2><TrainerCards items={trainers} /></div></section>}
      {photos.length > 0 && <section className="sec"><div className="wrap"><h2 className="h2">Зал и тренировки</h2><Gallery items={photos} /></div></section>}
      {photos.length === 0 && CONTENT_PREVIEW_MODE && (
        <section className="sec"><div className="wrap">
          <h2 className="h2">Зал и тренировки</h2>
          <div className="bp-slots">
            <MediaSlot label="Выбрать и добавить фото зала" ratio="4/3" icon="layers" />
            <MediaSlot label="Выбрать и добавить фото входа или тренировки" ratio="4/3" icon="layers" />
            <NeedNote title="Нужно от школы для этого филиала" items={[!b.description && 'пара предложений о месте', !b.howToGet && 'как дойти: выход из метро, ориентиры, вход, этаж', '2–3 фото зала'].filter(Boolean)} />
          </div>
        </div></section>
      )}
      {reviews.length > 0 && <section className="sec alt"><div className="wrap"><h2 className="h2">Отзывы</h2><Reviews items={reviews} /></div></section>}
      <section className="sec alt"><div className="wrap">
        <nav className="bp-nav" aria-label="Другие филиалы">
          <Link to={`/filialy/${prev.slug}/`}><small>Предыдущий филиал</small><b>{prev.name}</b></Link>
          <Link className="bp-all" to="/filialy/"><b>Все филиалы</b></Link>
          <Link className="nx" to={`/filialy/${next.slug}/`}><small>Следующий филиал</small><b>{next.name}</b></Link>
        </nav>
      </div></section>
    </>
  )
}
