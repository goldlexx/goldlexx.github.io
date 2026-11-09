import { SITE, CONTACTS, TG_CHANNEL } from '../data/site.js'
import { BRANCH_BY } from '../data/branches.js'

export const abs = (p) => (SITE.url ? SITE.url.replace(/\/$/, '') + p : p)

function jsonLd(r) {
  const org = { '@type': 'Organization', name: 'PRIDE ONE', description: 'Школа брейкинга', telephone: CONTACTS.tel, sameAs: [CONTACTS.vk, CONTACTS.ig, TG_CHANNEL].filter(Boolean) }
  if (SITE.url) { org.url = SITE.url; org.logo = abs('/logo/paw-orange.png') }
  const graph = [org]
  const b = r.slug && BRANCH_BY[r.slug]
  // hasMap — поиск адреса в Яндекс Картах (точных координат нет); url — только при заданном домене, относительных адресов в разметке нет
  if (b) graph.push({ '@type': 'SportsActivityLocation', name: `PRIDE ONE — ${b.name}`, telephone: CONTACTS.tel, hasMap: b.mapUrl,
    ...(SITE.url ? { url: abs(r.path) } : {}),
    address: { '@type': 'PostalAddress', streetAddress: b.address, addressLocality: b.city, addressCountry: 'RU' } })
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function headTags(r) {
  const url = abs(r.path)
  const t = [
    ['title', {}, r.title],
    ['meta', { name: 'description', content: r.description }],
    // Служебные страницы с noindex (404) не получают canonical и og:url: у них нет своего адреса
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: SITE.name }],
    ['meta', { property: 'og:locale', content: 'ru_RU' }],
    ['meta', { property: 'og:title', content: r.title }],
    ['meta', { property: 'og:description', content: r.description }],
    ['meta', { property: 'og:image', content: abs(SITE.ogImage) }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
  ]
  if (r.noindex) t.push(['meta', { name: 'robots', content: 'noindex' }])
  else t.splice(2, 0, ['link', { rel: 'canonical', href: url }], ['meta', { property: 'og:url', content: url }])
  t.push(['script', { type: 'application/ld+json' }, JSON.stringify(jsonLd(r))])
  return t
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')
export const renderHead = (r) => headTags(r).map(([tag, a, inner]) => {
  const attrs = Object.entries(a).map(([k, v]) => ` ${k}="${esc(v)}"`).join('')
  if (tag === 'meta' || tag === 'link') return `<${tag} data-seo${attrs} />`
  const body = tag === 'script' ? inner.replace(/</g, '\\u003c') : esc(inner)
  return `<${tag} data-seo${attrs}>${body}</${tag}>`
}).join('\n    ')

export function applyHead(r) {
  if (typeof document === 'undefined') return
  document.head.querySelectorAll('[data-seo]').forEach((n) => n.remove())
  for (const [tag, a, inner] of headTags(r)) {
    const el = document.createElement(tag)
    el.setAttribute('data-seo', '')
    for (const [k, v] of Object.entries(a)) el.setAttribute(k, v)
    if (inner) el.textContent = inner
    document.head.appendChild(el)
  }
}
