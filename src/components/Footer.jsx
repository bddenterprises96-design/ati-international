const NAV_LINKS = ['About', 'Products', 'Why ATI?', 'Contact US', 'Blogs', "FAQ's"]

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-[#191c1e] text-white">
      <div className="max-w-[1280px] mx-auto px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Brand */}
        <div>
          <div
            className="flex items-center gap-3 mb-4 cursor-pointer"
            onClick={() => onNavigate('About')}
          >
            <img
              src="/assets/ooll.png"
              alt="ATI Logo"
              className="h-20 w-auto object-contain"
              onError={(e) => { e.target.style.display = 'none' }}
            />
            <span className="font-bold text-white">ATI International</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Precision sealing solutions for global manufacturers. ISO 9001:2015 certified.
          </p>
          
          {/* Social Media Icons - 2 Rows with Square Shape */}
          <div className="grid grid-cols-3 gap-3 max-w-[180px]">
            {/* Row 1: Facebook, Twitter, LinkedIn */}
            <a
              href="https://facebook.com/atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-[#1877f2] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="Facebook"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            
            <a
              href="https://twitter.com/atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-black transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="Twitter"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            
            <a
              href="https://linkedin.com/atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-[#0a66c2] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="LinkedIn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Row 2: YouTube, Instagram, TikTok */}
            <a
              href="https://youtube.com/@atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="YouTube"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            
            <a
              href="https://instagram.com/atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="Instagram"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
              </svg>
            </a>
            
            <a
              href="https://tiktok.com/atiinternational"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-12 h-12 bg-white/10 hover:bg-black transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
              aria-label="TikTok"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.013 2.61-.018 3.91-.02.063 1.735.413 3.457 1.144 5.03.678 1.46 1.676 2.719 2.933 3.716 1.097.862 2.37 1.49 3.724 1.83v4.077c-1.345.062-2.684-.214-3.933-.814-.95-.454-1.79-1.077-2.475-1.824-.003 2.9.025 5.8-.013 8.7-.047 1.702-.544 3.32-1.525 4.66-1.122 1.545-2.77 2.604-4.66 2.92-1.705.286-3.444.085-5.028-.618-1.52-.677-2.777-1.758-3.693-3.148-1.029-1.567-1.54-3.386-1.517-5.203.016-1.632.436-3.2 1.237-4.628 1.168-2.065 3.056-3.58 5.23-4.253 1.547-.479 3.194-.648 4.813-.502.02 1.774.012 3.548.013 5.322-.687-.15-1.39-.217-2.087-.166-1.457.084-2.847.615-3.918 1.605-1.062.982-1.72 2.367-1.714 3.824.008 1.53.642 2.947 1.736 3.974.938.881 2.168 1.382 3.47 1.438 1.244.06 2.476-.305 3.498-1.053.945-.696 1.6-1.702 1.808-2.839.087-.468.119-.943.112-1.418.01-3.044.006-6.089.008-9.134.004-1.03.014-2.06.024-3.09z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/80">Navigation</h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link}>
                <button
                  onClick={() => onNavigate(link)}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/80">Products</h4>
          <ul className="space-y-3">
            {['Valve Stem Seals', 'O-Rings', 'Oil Seals', 'Custom Seals'].map((p) => (
              <li key={p}>
                <button
                  onClick={() => onNavigate('Products')}
                  className="text-white/60 text-sm hover:text-white transition-colors"
                >
                  {p}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-5 text-white/80">Contact</h4>
          <ul className="space-y-3 text-white/60 text-sm">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">location_on</span>
              Room 271, 2nd Floor, No. 49 Dongjiao North Road, Liwan District, Guangzhou City, China.
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">mail</span>
              theatinternational@gmail.com
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-sm mt-0.5">phone</span>
              0086-18523210975
            </li>
          </ul>
          <button
            onClick={() => onNavigate('Contact US')}
            className="mt-6 bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
          >
            Generate Inquiry
          </button>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 px-8 text-center text-white/40 text-xs">
        © {new Date().getFullYear()} ATI International. All rights reserved. | Guangzhou City, China
      </div>
    </footer>
  )
}