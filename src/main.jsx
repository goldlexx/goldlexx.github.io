import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App.jsx'
import { match } from './routes.js'
import { normPath } from './lib/router.jsx'
import './styles/base.css'
import './styles/pages.css'

const root = document.getElementById('root')
// Пререндеренная страница — гидратация. Если сервер отдал HTML другой страницы (например, главную вместо 404)
// или это dev-сервер без пререндера — обычный рендер.
if (root.firstElementChild && root.dataset.page === match(normPath(window.location.pathname)).path) hydrateRoot(root, <App />)
else { root.textContent = ''; createRoot(root).render(<App />) }
