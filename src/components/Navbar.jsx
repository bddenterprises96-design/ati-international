import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { label: 'About',      path: '/' },
  { label: 'Products',   path: '/products' },
  { label: 'Why ATI?',   path: '/why-ati' },
  { label: 'Contact US', path: '/contact' },
  { label: 'Blogs',      path: '/blogs' },
  { label: "FAQ's",      path: '/faqs' },
]

export default function Navbar({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  // Turn opaque once user scrolls past 10px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    // Reset on route change
    setScrolled(window.scrollY > 10)
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  const isActive = (path) => pathname === path

  return (
    <header
      className={`top-0 sticky z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 border-b border-[#c5c6cd] shadow-sm'
          : 'bg-transparent border-b border-white/10'
      }`}
      style={scrolled ? { backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' } : {}}
    >
      <div className="flex justify-between items-center h-20 px-4 max-w-[1440px] mx-auto">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer flex-shrink-0"
          onClick={() => onNavigate('About')}
        >
          <img
            alt="ATI Logo"
            className="h-16 w-auto object-contain transition-all duration-300"
            src="/assets/logo.png"
            style={{ filter: scrolled ? 'none' : 'brightness(0) invert(1)' }}
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className={`text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-[#005691]' : 'text-white'}`}>
            ATI International
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 ml-auto mr-4">
          {NAV_LINKS.map(({ label, path }) => {
            const active = isActive(path)
            return (
              <button
                key={label}
                onClick={() => onNavigate(label)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
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
              </button>
            )
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Search — desktop only */}
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#75777d]">search</span>
            <input
              type="text"
              placeholder="Search specs..."
              className="pl-10 pr-4 py-2.5 rounded-lg text-sm w-40 outline-none bg-white border border-[#c5c6cd] text-[#191c1e] placeholder-[#9aa0a6] focus:ring-2 focus:ring-[#005691]/30"
            />
          </div>

          {/* Generate Inquiry button */}
          <button
            onClick={() => onNavigate('Contact US')}
            className={`px-5 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 transition-all duration-200 ${
              scrolled
                ? 'bg-[#005691] text-white hover:brightness-110'
                : 'bg-white text-[#005691] hover:bg-white/90'
            }`}
          >
            <span className="material-symbols-outlined text-sm">request_quote</span>
            <span className="hidden sm:inline">Generate Inquiry</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${scrolled ? 'hover:bg-[#f2f4f6]' : 'hover:bg-white/10'}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className={`material-symbols-outlined text-2xl ${scrolled ? 'text-[#005691]' : 'text-white'}`}>
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#c5c6cd] shadow-lg">

          {/* Search bar — mobile */}
          <div className="px-6 pt-4 pb-2">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777d] text-lg">search</span>
              <input
                type="text"
                placeholder="Search technical specs..."
                className="w-full pl-10 pr-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#005691]/30"
              />
            </div>
          </div>

          {/* Nav Links */}
          <div className="px-6 pb-4 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, path }) => {
              const active = isActive(path)
              return (
                <button
                  key={label}
                  onClick={() => { onNavigate(label); setMenuOpen(false) }}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-between ${
                    active
                      ? 'text-[#005691] bg-[#e6f1fb] border-l-4 border-[#005691]'
                      : 'text-[#505f76] hover:text-[#005691] hover:bg-[#f2f4f6]'
                  }`}
                >
                  {label}
                  {active && (
                    <span className="material-symbols-outlined text-[#005691] text-sm">chevron_right</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}