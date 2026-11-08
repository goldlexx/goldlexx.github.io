// Статический пререндер: для каждого маршрута создаётся готовый HTML со своими title, description, canonical и Open Graph.
// Запускается из `npm run build` после клиентской и серверной (SSR) сборки Vite.
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const dist = path.resolve('dist')
const entry = path.resolve(process.argv[2] || 'dist-ssr/entry-server.js')
const mod = await import(pathToFileURL(entry).href)
const api = mod.render ? mod : mod.default
const { render, routes, notFound, renderHead, SITE } = api
const tpl = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
if (!tpl.includes('<div id="root"><!--app-->') || !tpl.includes('<!--head-->')) throw new Error('В dist/index.html нет меток <div id="root"><!--app--> и <!--head-->')

// React 19 при renderToString ставит <link rel="preload" as="image"> в начало разметки приложения.
// Внутри #root они ломают гидратацию (ошибка React #418), поэтому переносим их в <head>.
const page = (r) => {
  const html = render(r.path)
  const preloads = html.match(/^(?:<link [^>]*\/>)*/)[0]
  return tpl.replace('<!--head-->', renderHead(r) + preloads).replace('<div id="root"><!--app-->', `<div id="root" data-page="${r.path}">${html.slice(preloads.length)}`)
}
for (const r of routes) {
  const out = path.join(dist, r.path, 'index.html')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  fs.writeFileSync(out, page(r))
}
fs.writeFileSync(path.join(dist, '404.html'), page(notFound))

const base = SITE.url ? SITE.url.replace(/\/$/, '') : null
fs.writeFileSync(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n${base ? `\nSitemap: ${base}/sitemap.xml\n` : ''}`)
if (base) {
  const urls = routes.map((r) => `  <url><loc>${base}${r.path}</loc></url>`).join('\n')
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`)
} else {
  console.warn('[prerender] VITE_SITE_URL не задан: sitemap.xml не создан, canonical и og:url относительные.')
}
console.log(`[prerender] страниц: ${routes.length} + 404`)
