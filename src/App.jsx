import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContacts from './components/FloatingContacts'
import AboutUs from './Pages/AboutUs'
import Products from './Pages/Products'
import WhyATI from './Pages/WhyATI'
import ContactUS from './Pages/ContactUS'
import Blogs from './Pages/Blogs'
import FAQs from './Pages/FAQs'

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

export default function App() {
  const navigate = useNavigate()

  const onNavigate = (page) => {
    const routes = {
      'About':      '/',
      'Products':   '/products',
      'Why ATI?':   '/why-ati',
      'Contact US': '/contact',
      'Blogs':      '/blogs',
      "FAQ's":      '/faqs',
    }
    navigate(routes[page] ?? '/')
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
          <Route path="/contact"  element={<ContactUS onNavigate={onNavigate} />} />
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