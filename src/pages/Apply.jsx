import { useEffect, useState } from 'react'
import { useRouter } from '../lib/router.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { Icon } from '../components/ui/Icon.jsx'
import { TgBtn, CallBtn } from '../components/ui/Buttons.jsx'
import { BRANCHES } from '../data/branches.js'
import { GALLERY } from '../data/gallery.js'

const IMG = GALLERY.find((g) => g.base?.endsWith('ai-gallery-13-group-sign'))

// Прототип формы: данные никуда не отправляются и не сохраняются. Пока отправка не подключена, все поля отключены
// (fieldset disabled): посетитель не тратит время на заполнение, предупреждение связано со всей формой.
export default function Apply() {
  const { search } = useRouter()
  const [filial, setFilial] = useState('')
  useEffect(() => {
    const s = new URLSearchParams(search).get('filial')
    if (s && BRANCHES.some((b) => b.slug === s)) setFilial(s)
  }, [search])
  return (
    <>
      <PageHero title="Запись на пробное занятие" lead="Сейчас записаться можно в Telegram или по телефону." img={IMG} pos="50% 42%" crumbs={[['/', 'Главная']]} />
      <section className="sec"><div className="wrap ap">
        <div className="ap-ch">
          <h2 className="h2">Как записаться</h2>
          <div className="card ap-card"><h3>Telegram</h3><p>Напишите, какой филиал вам удобен, — подскажем ближайшую группу.</p><TgBtn /></div>
          <div className="card ap-card"><h3>Телефон</h3><p>Если удобнее голосом — позвоните, подскажем ближайшую группу.</p><CallBtn /></div>
        </div>
        <form className="form form-off" aria-labelledby="form-h" aria-describedby="form-off" onSubmit={(e) => e.preventDefault()}>
          <div className="form-head"><h2 id="form-h" className="h2">Онлайн-заявка</h2><span className="tpl-tag form-tag">Макет формы</span></div>
          <p className="notice" id="form-off"><Icon n="bolt" size={18} /><span>Онлайн-отправка заявки пока не подключена, поэтому поля неактивны. Чтобы записаться, напишите в Telegram или позвоните.</span></p>
          <fieldset disabled>
          <label>Имя родителя<input type="text" name="parent" autoComplete="off" /></label>
          <label>Телефон<input type="tel" name="phone" autoComplete="off" inputMode="tel" /></label>
          <label>Филиал
            <select name="filial" value={filial} onChange={(e) => setFilial(e.target.value)}>
              <option value="">Пока не выбрали</option>
              {BRANCHES.map((b) => <option key={b.slug} value={b.slug}>{b.name} — {b.address}</option>)}
            </select>
          </label>
          <label>Возраст ребёнка <small>необязательно</small><input type="number" name="age" min="1" max="99" inputMode="numeric" autoComplete="off" /></label>
          <label>Комментарий <small>необязательно</small><textarea name="comment" rows="3" /></label>
          <button type="submit" className="btn btn-o">Отправка пока не подключена</button>
          </fieldset>
        </form>
      </div></section>
    </>
  )
}
