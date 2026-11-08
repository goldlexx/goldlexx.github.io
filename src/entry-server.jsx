import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import { routes, notFound } from './routes.js'
import { renderHead } from './lib/seo.js'
import { SITE } from './data/site.js'

export { routes, notFound, renderHead, SITE }
export const render = (url) => renderToString(<App url={url} />)
