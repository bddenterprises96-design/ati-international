import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContacts from './components/FloatingContacts'
import AboutUs from './Pages/AboutUs'
import Products from './Pages/Products'
import WhyATI from './Pages/WhyATI'
import ContactUs from './Pages/ContactUs'
import Blogs from './Pages/Blogs'
import FAQs from './Pages/FAQs'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return null
}

export default function App() {
  const navigate = useNavigate()

  const onNavigate = (page) => {
    const routes = {
      'Home':       '/',
      'About':      '/',
      'Products':   '/products',
      'Why ATI?':   '/why-ati',
      'Why ATI':    '/why-ati',
      'WhyATI':     '/why-ati',
      'why-ati':    '/why-ati',
      '/why-ati':   '/why-ati',
      'Contact Us': '/contact',
      'Blogs':      '/blogs',
      "FAQ's":      '/faqs',
    }

    if (!page) {
      navigate('/')
      return
    }

    if (typeof page === 'string' && page.includes('#')) {
      const [basePage, hash] = page.split('#')
      const targetRoute = routes[basePage] || (basePage.toLowerCase().includes('why') ? '/why-ati' : '/products')
      navigate(`${targetRoute}#${hash}`)
      return
    }

    if (typeof page === 'string' && page.includes('?')) {
      const [basePage, query] = page.split('?')
      const targetRoute = routes[basePage] || (basePage.toLowerCase().includes('why') ? '/why-ati' : '/products')
      navigate(`${targetRoute}?${query}`)
      return
    }

    const matched = routes[page] || (typeof page === 'string' && page.toLowerCase().includes('why') ? '/why-ati' : null)
    navigate(matched ?? (typeof page === 'string' && page.startsWith('/') ? page : '/'))
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <ScrollToTop />
      <Navbar onNavigate={onNavigate} />
      <main>
        <Routes>
          <Route path="/"         element={<AboutUs   onNavigate={onNavigate} />} />
          <Route path="/products" element={<Products  onNavigate={onNavigate} />} />
          <Route path="/why-ati"  element={<WhyATI    onNavigate={onNavigate} />} />
          <Route path="/contact"  element={<ContactUs onNavigate={onNavigate} />} />
          <Route path="/blogs"    element={<Blogs     onNavigate={onNavigate} />} />
          <Route path="/faqs"     element={<FAQs      onNavigate={onNavigate} />} />
          {/* Fallback */}
          <Route path="*"         element={<AboutUs   onNavigate={onNavigate} />} />
        </Routes>
      </main>
      <Footer onNavigate={onNavigate} />
      <FloatingContacts />
    </div>
  )
}