import { CONTENT_PREVIEW_MODE } from '../../data/preview.js'
import { Icon } from './Icon.jsx'

// Служебные пометки демо-режима. При CONTENT_PREVIEW_MODE = false не выводятся вообще.

// Плашка «что нужно от школы»
export function NeedNote({ items, title = 'Нужно от школы' }) {
  if (!CONTENT_PREVIEW_MODE || !items?.length) return null
  return (
    <div className="need">
      <b>{title}</b>
      <ul>{items.map((t) => <li key={t}>{t}</li>)}</ul>
    </div>
  )
}

// Небольшая метка на карточке-примере: показывает, что это образец заполнения, а не настоящие данные
export function TplTag({ children = 'Пример заполнения' }) {
  if (!CONTENT_PREVIEW_MODE) return null
  return <span className="tpl-tag">{children}</span>
}

// Место под недостающее фото или видео
export function MediaSlot({ label, ratio = '4/3', icon = 'play' }) {
  if (!CONTENT_PREVIEW_MODE) return null
  return (
    <div className="slot" style={{ aspectRatio: ratio }}>
      <span className="slot-ic"><Icon n={icon} size={26} /></span>
      <b>{label}</b>
    </div>
  )
}

// Полоса вверху страницы: объясняет, что сайт в демонстрационном режиме
export function PreviewBanner() {
  if (!CONTENT_PREVIEW_MODE) return null
  return (
    <div className="pbanner" role="note">
      <Icon n="bolt" size={18} />
      <span>Демонстрационный режим: часть материалов ещё не получена от школы. Такие места отмечены плашками и в публичной версии не показываются.</span>
    </div>
  )
}
