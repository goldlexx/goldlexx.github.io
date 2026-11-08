import { useEffect } from 'react'
import { RouterProvider, useRouter } from './lib/router.jsx'
import { match } from './routes.js'
import { applyHead } from './lib/seo.js'
import Layout from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Branches from './pages/Branches.jsx'
import Branch from './pages/Branch.jsx'
import Schedule from './pages/Schedule.jsx'
import Prices from './pages/Prices.jsx'
import Club from './pages/Club.jsx'
import Apply from './pages/Apply.jsx'
import Trainers from './pages/Trainers.jsx'
import NotFound from './pages/NotFound.jsx'

const PAGES = { home: Home, about: About, branches: Branches, branch: Branch, schedule: Schedule, prices: Prices, club: Club, apply: Apply, trainers: Trainers, notfound: NotFound }

function Page() {
  const { path } = useRouter()
  const r = match(path)
  useEffect(() => { applyHead(r) }, [r])
  const P = PAGES[r.page]
  return <P key={r.path} slug={r.slug} />
}

export default function App({ url }) {
  return <RouterProvider url={url}><Layout><Page /></Layout></RouterProvider>
}
