import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Why ATI?', path: '/why-ati' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Blogs', path: '/blogs' },
  { label: "FAQs", path: '/faqs' },
]

export default function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Turn opaque once user scrolls past 10px (optimized rAF throttle)
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isOver = window.scrollY > 10
          setScrolled((prev) => (prev !== isOver ? isOver : prev))
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    setScrolled(window.scrollY > 10)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  // Close mobile drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isActive = (path) => pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${scrolled
          ? 'bg-white/95 border-b border-[#c5c6cd] shadow-xs'
          : 'bg-transparent'
        }`}
      style={scrolled ? { backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' } : {}}
    >
      <div className="flex justify-between items-center h-16 sm:h-20 px-4 max-w-[1440px] mx-auto">

        {/* Logo */}
        <div
          className="flex items-center gap-2 sm:gap-3 cursor-pointer flex-shrink-0"
          onClick={() => onNavigate('Home')}
        >
          <img
            alt="ATI Logo"
            className="h-9 sm:h-14 w-auto object-contain transition-all duration-300"
            src="/assets/logo.png"
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className={`text-base sm:text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#005691]' : 'text-white'}`}>
            AT International
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-auto mr-4">
          {NAV_LINKS.map(({ label, path }) => {
            const active = isActive(path)
            return (
              <a
                key={label}
                href={path}
                onClick={(e) => {
                  e.preventDefault()
                  onNavigate(label)
                }}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${
                  active
                    ? scrolled
                      ? 'text-[#005691] bg-[#e6f1fb]'
                      : 'text-white bg-white/20'
                    : scrolled
                      ? 'text-[#505f76] hover:text-[#005691] hover:bg-[#f2f4f6]'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
                {active && (
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 rounded-full ${scrolled ? 'bg-[#005691]' : 'bg-white'}`} />
                )}
              </a>
        )
          })}
      </nav>

      {/* Right Side */}
      <div className="flex items-center gap-3 flex-shrink-0">

        {/* Request a Quote button with High-Contrast Accent (Section 03-A) — hidden on mobile to keep navbar clean, visible on sm+ */}
        <button
          onClick={() => onNavigate('Contact Us')}
          className="hidden sm:flex bg-gradient-to-b from-zinc-700 via-zinc-900 to-black hover:from-zinc-600 hover:via-zinc-800 hover:to-neutral-950 text-white border border-zinc-500/50 font-bold px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm rounded-xl items-center gap-2 shadow-xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <span className="material-symbols-outlined text-base">request_quote</span>
          <span>Request a Quote</span>
        </button>

        {/* Hamburger — mobile only */}
        <button
          aria-label="Toggle Navigation Menu"
          className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-[#f2f4f6]' : 'hover:bg-white/10'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`material-symbols-outlined text-2xl ${scrolled ? 'text-[#005691]' : 'text-white'}`}>
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
    </div>

      {/* ── Mobile Menu Backdrop & Drawer ── */ }
  {
    menuOpen && (
      <>
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
        <div className="relative z-50 md:hidden bg-white border-t border-[#c5c6cd] shadow-xl py-3 animate-fadeIn">
          <div className="px-6 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, path }) => {
              const active = isActive(path)
              return (
                  <a
                    key={label}
                    href={path}
                    onClick={(e) => {
                      e.preventDefault()
                      onNavigate(label)
                      setMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                      active
                        ? 'text-[#005691] bg-[#e6f1fb] border-l-4 border-[#005691]'
                        : 'text-[#505f76] hover:text-[#005691] hover:bg-[#f2f4f6]'
                    }`}
                  >
                    {label}
                    {active && (
                      <span className="material-symbols-outlined text-[#005691] text-sm">chevron_right</span>
                    )}
                  </a>
          )
              })}
        </div>
      </div >
        </>
      )
  }
    </header >
  )
}