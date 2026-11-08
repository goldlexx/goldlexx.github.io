import { Icon } from '../ui/Icon.jsx'

// Интерактивная карта требует ключ Яндекс Карт и проверенные координаты — их пока нет.
// До подключения показывается список адресов со ссылками на поиск в Яндекс Картах.
export default function MapPanel({ items }) {
  return (
    <ul className="mapfb">{items.map((b) => (
      <li key={b.slug}>
        <span><span className="nm">{b.name}</span> <span className="ad">{b.address}{b.city !== 'Москва' ? `, ${b.city}` : ''}</span></span>
        <a href={b.mapUrl} target="_blank" rel="noopener noreferrer"><Icon n="pin" size={16} />На карте</a>
      </li>
    ))}</ul>
  )
}
