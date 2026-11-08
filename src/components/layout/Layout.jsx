import Header from './Header.jsx'
import Footer from './Footer.jsx'
import StickyCta from './StickyCta.jsx'
import { PreviewBanner } from '../ui/PreviewNote.jsx'

export default function Layout({ children }) {
  return (
    <>
      <a className="skip" href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus() }}>Перейти к содержанию</a>
      <PreviewBanner />
      <Header />
      <main id="main" tabIndex={-1}>{children}</main>
      <Footer />
      <StickyCta />
    </>
  )
}
