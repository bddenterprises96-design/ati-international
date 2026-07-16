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
          <p className="text-white/60 text-sm leading-relaxed">
            Precision sealing solutions for global manufacturers. ISO 9001:2015 certified.
          </p>
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