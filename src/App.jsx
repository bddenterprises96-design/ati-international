import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingContacts from './components/FloatingContacts'
import AboutUs from './Pages/AboutUs'
import Products from './Pages/Products'
import WhyATI from './Pages/WhyATI'
import ContactUS from './Pages/ContactUS'
import Blogs from './Pages/Blogs'
import FAQs from './Pages/FAQs'

const PAGES = {
  'About':      AboutUs,
  'Products':   Products,
  'Why ATI?':   WhyATI,
  'Contact US': ContactUS,
  'Blogs':      Blogs,
  "FAQ's":      FAQs,
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('About')

  const navigate = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const PageComponent = PAGES[currentPage] || AboutUs

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#f7f9fb', minHeight: '100vh' }}>
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      <main>
        <PageComponent onNavigate={navigate} />
      </main>
      <Footer onNavigate={navigate} />
      <FloatingContacts />
    </div>
  )
}