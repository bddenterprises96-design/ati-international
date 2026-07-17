import { useState } from 'react'

const NAV_LINKS = ['About', 'Products', 'Why ATI?', 'Contact US', 'Blogs', "FAQ's"]

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header
      className="bg-white/90 border-b border-[#c5c6cd] top-0 sticky z-50"
      style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
    >
      <div className="flex justify-between items-center h-20 px-8 max-w-[1280px] mx-auto">

        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onNavigate('About')}
        >
          <img
            alt="ATI Logo"
            className="h-14 w-auto object-contain"
            src="/assets/logo.png"
            onError={(e) => { e.target.style.display = 'none' }}
          />
          <span className="text-xl font-bold text-[#005691] tracking-tight">
            ATI International
          </span>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((label) => {
            const isActive = currentPage === label
            return (
              <button
                key={label}
                onClick={() => onNavigate(label)}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'text-[#005691] bg-[#e6f1fb]'
                    : 'text-[#505f76] hover:text-[#005691] hover:bg-[#f2f4f6]'
                }`}
              >
                {label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#005691] rounded-full" />
                )}
              </button>
            )
          })}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="relative hidden lg:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777d]">search</span>
            <input
              type="text"
              placeholder="Search technical specs..."
              className="pl-10 pr-4 py-2.5 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg text-sm w-56 outline-none focus:ring-2 focus:ring-[#005691]/30"
            />
          </div>
          <button
            onClick={() => onNavigate('Contact US')}
            className="bg-[#005691] text-white px-5 py-3 text-sm font-semibold rounded-lg flex items-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-sm">request_quote</span>
            <span className="hidden sm:inline">Generate Inquiry</span>
          </button>
          <button
            className="md:hidden p-2 rounded-lg hover:bg-[#f2f4f6]"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-[#005691] text-2xl">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#c5c6cd] px-6 py-4 flex flex-col gap-1 shadow-lg">
          {NAV_LINKS.map((label) => {
            const isActive = currentPage === label
            return (
              <button
                key={label}
                onClick={() => { onNavigate(label); setMenuOpen(false) }}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'text-[#005691] bg-[#e6f1fb] border-l-4 border-[#005691]'
                    : 'text-[#505f76] hover:text-[#005691] hover:bg-[#f2f4f6]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}
    </header>
  )
}