import { Icon } from './Icon.jsx'
import { ENROLL_TG, CONTACTS } from '../../data/site.js'

// Кнопка записи: всегда ведёт на контакт для записи (ENROLL_TG в site.js)
export const TgBtn = ({ children = 'Записаться в Telegram', className = '' }) => (
  <a className={`btn btn-o ${className}`} href={ENROLL_TG} target="_blank" rel="noopener noreferrer"><Icon n="send" size={18} />{children}</a>
)
export const CallBtn = ({ className = '' }) => (
  <a className={`btn btn-g ${className}`} href={`tel:${CONTACTS.tel}`}><Icon n="phone" size={18} />Позвонить</a>
)
