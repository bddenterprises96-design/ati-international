import { useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContacts from './components/FloatingContacts'

// Lazy-loaded page components for route code-splitting and fast initial load
const AboutUs = lazy(() => import('./Pages/AboutUs'))
const Products = lazy(() => import('./Pages/Products'))
const WhyATI = lazy(() => import('./Pages/WhyATI'))
const ContactUs = lazy(() => import('./Pages/ContactUs'))
const Blogs = lazy(() => import('./Pages/Blogs'))
const FAQs = lazy(() => import('./Pages/FAQs'))

// Loading Fallback Component
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#f7f9fb] p-8">
      <div className="w-12 h-12 border-4 border-[#005691]/20 border-t-[#005691] rounded-full animate-spin mb-4" />
      <span className="text-xs font-bold uppercase tracking-widest text-[#005691]">Loading Content...</span>
    </div>
  )
}

// Scroll to top or target hash element on route/hash change
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '')
      const timer = setTimeout(() => {
        const elem = document.getElementById(targetId)
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          window.scrollTo({ top: 0, behavior: 'auto' })
        }
      }, 150)
      return () => clearTimeout(timer)
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [pathname, hash])
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
        <Suspense fallback={<PageLoader />}>
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
        </Suspense>
      </main>
      <Footer onNavigate={onNavigate} />
      <FloatingContacts />
    </div>
  )
}