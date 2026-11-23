import React, { useState } from 'react'
import emailjs from '@emailjs/browser'

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Products', path: '/products' },
  { label: 'Why ATI?', path: '/why-ati' },
  { label: 'Contact Us', path: '/contact' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'FAQs', path: '/faqs' },
]

export default function Footer({ onNavigate }) {
  // Function to handle navigation with product section targeting
  const handleNavigate = (page, section = null) => {
    if (section) {
      onNavigate(`${page}#${section}`)
    } else {
      onNavigate(page)
    }
  }

  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackEmail, setFeedbackEmail] = useState('')
  const [feedbackSending, setFeedbackSending] = useState(false)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)

  const handleFeedbackSubmit = (e) => {
    e.preventDefault()
    if (!feedbackText.trim()) return

    setFeedbackSending(true)

    const templateParams = {
      from_name: feedbackEmail.trim() ? `Feedback (${feedbackEmail.trim()})` : 'Website Visitor Feedback',
      name: feedbackEmail.trim() || 'Website Visitor',
      to_name: 'AT International',
      to_email: 'info@theatinternational.com',
      recipient_email: 'info@theatinternational.com',
      email: feedbackEmail.trim() || 'info@theatinternational.com',
      from_email: feedbackEmail.trim() || 'info@theatinternational.com',
      reply_to: feedbackEmail.trim() || 'info@theatinternational.com',
      user_email: feedbackEmail.trim() || 'info@theatinternational.com',
      customer_email: feedbackEmail.trim() || 'info@theatinternational.com',
      message: `Website Visitor Feedback:\n\n${feedbackText.trim()}\n\nSender Email: ${feedbackEmail.trim() || 'Not provided'}`,
      title: `Website Feedback${feedbackEmail.trim() ? ` from ${feedbackEmail.trim()}` : ''}`,
      product_category: 'Website Feedback',
      quantity: 'N/A',
      company: 'Feedback'
    }

    emailjs.send(
      'service_cd7t4tp',
      'template_wdsnb2r',
      templateParams,
      'Wg55VCxLMsJxxjNy0'
    ).then(
      () => {
        setFeedbackSending(false)
        setFeedbackSubmitted(true)
      },
      (error) => {
        console.error('EmailJS Feedback Error:', error)
        setFeedbackSending(false)
        setFeedbackSubmitted(true)
      }
    )
  }

  return (
    <footer className="bg-[#191c1e] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-8 items-start">

        {/* Brand */}
        <div className="flex flex-col justify-between h-full">
          <div>
            <div
              className="flex items-center gap-2.5 sm:gap-4 mb-3 cursor-pointer"
              onClick={() => handleNavigate('Home')}
            >
              <img
                src="/assets/ooll.png"
                alt="ATI Logo"
                className="h-9 sm:h-16 w-auto object-contain"
                onError={(e) => { e.target.style.display = 'none' }}
              />
              <span className="font-bold text-white text-base sm:text-lg">AT International</span>
            </div>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mb-4">
              AT International is a premier global supplier, exporter, and specialized trading company for Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions.
            </p>
          </div>

          <div>
            {/* Social Media Icons - 2 Rows with Square Shape with increased horizontal and vertical spacing */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-4 max-w-[240px] mb-6">
              {/* Row 1: Facebook, Twitter, LinkedIn */}
              <a
                href="https://www.facebook.com/share/1C3Acanq9d/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-[#1877f2] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href="https://x.com/ati_china?s=11&t=cTSAe3LIdfcsOj5pi9HOxg"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-black transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/144051252/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-[#0a66c2] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>

              {/* Row 2: YouTube, Instagram, TikTok */}
              <a
                href="https://www.youtube.com/channel/UCqJKf4oaUEoXJmGORXY6usQ"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-[#ff0000] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="YouTube"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/theatinternational/"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#dc2743] transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>

              <a
                href="https://www.tiktok.com/@theatinternational?_r=1&_t=ZS-9AvpR64BX8g"
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-11 h-11 bg-white/10 hover:bg-black transition-all duration-300 flex items-center justify-center group overflow-hidden rounded-lg"
                aria-label="TikTok"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <svg className="w-5 h-5 text-white/70 group-hover:text-white transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.013 2.61-.018 3.91-.02.063 1.735.413 3.457 1.144 5.03.678 1.46 1.676 2.719 2.933 3.716 1.097.862 2.37 1.49 3.724 1.83v4.077c-1.345.062-2.684-.214-3.933-.814-.95-.454-1.79-1.077-2.475-1.824-.003 2.9.025 5.8-.013 8.7-.047 1.702-.544 3.32-1.525 4.66-1.122 1.545-2.77 2.604-4.66 2.92-1.705.286-3.444.085-5.028-.618-1.52-.677-2.777-1.758-3.693-3.148-1.029-1.567-1.54-3.386-1.517-5.203.016-1.632.436-3.2 1.237-4.628 1.168-2.065 3.056-3.58 5.23-4.253 1.547-.479 3.194-.648 4.813-.502.02 1.774.012 3.548.013 5.322-.687-.15-1.39-.217-2.087-.166-1.457.084-2.847.615-3.918 1.605-1.062.982-1.72 2.367-1.714 3.824.008 1.53.642 2.947 1.736 3.974.938.881 2.168 1.382 3.47 1.438 1.244.06 2.476-.305 3.498-1.053.945-.696 1.6-1.702 1.808-2.839.087-.468.119-.943.112-1.418.01-3.044.006-6.089.008-9.134.004-1.03.014-2.06.024-3.09z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white/80">Navigation</h4>
          <ul className="space-y-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.path}
                  onClick={(e) => {
                    e.preventDefault()
                    handleNavigate(link.label)
                  }}
                  className="text-white/60 text-sm hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
                >
                  <span className="material-symbols-outlined text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#005691]">chevron_right</span>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white/80">Products</h4>
          <ul className="space-y-6">
            <li>
              <a
                href="/products#industrial-seals"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('Products', 'industrial-seals')
                }}
                className="text-white/60 text-sm hover:text-white transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#005691]">precision_manufacturing</span>
                Industrial Sealing Solutions
              </a>
            </li>
            <li>
              <a
                href="/products#motorcycle"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('Products', 'motorcycle')
                }}
                className="text-white/60 text-sm hover:text-white transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#005691]">two_wheeler</span>
                Motorcycle Parts
              </a>
            </li>
            <li>
              <a
                href="/products#e-bike"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('Products', 'e-bike')
                }}
                className="text-white/60 text-sm hover:text-white transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#005691]">electric_bike</span>
                E-Bike Parts
              </a>
            </li>
            <li>
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigate('Contact Us')
                }}
                className="text-white/60 text-sm hover:text-white transition-colors text-left flex items-center gap-1.5 group cursor-pointer"
              >
                <span className="material-symbols-outlined text-xs opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all text-[#005691]">engineering</span>
                Custom Order Sourcing
              </a>
            </li>
          </ul >

          {/* Quick Feedback Area */}
          <div className="mt-7 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-bold text-xs uppercase tracking-wider text-white/80 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#005691]">rate_review</span>
                Feedback
              </span>
              <a
                href="mailto:info@theatinternational.com?subject=Website%20Feedback"
                className="text-[11px] text-white/50 hover:text-white transition-colors flex items-center gap-1"
                title="Send feedback directly to info@theatinternational.com"
              >
                <span className="material-symbols-outlined text-[13px] text-[#005691]">mail</span>
                <span className="truncate max-w-[150px]">info@theatinternational.com</span>
              </a>
            </div>

            {feedbackSubmitted ? (
              <div className="bg-white/5 border border-emerald-500/30 rounded-xl p-3 text-center animate-fadeIn">
                <div className="flex items-center justify-center gap-1.5 text-emerald-400 text-xs font-semibold mb-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Feedback Received!</span>
                </div>
                <p className="text-[11px] text-white/70 leading-relaxed">
                  Thank you! Your feedback has been sent directly to{' '}
                  <a href="mailto:info@theatinternational.com" className="text-white font-medium hover:underline">
                    info@theatinternational.com
                  </a>
                  .
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setFeedbackSubmitted(false)
                    setFeedbackText('')
                    setFeedbackEmail('')
                  }}
                  className="mt-2 text-[10px] text-white/60 hover:text-white underline cursor-pointer"
                >
                  Send another note
                </button>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="space-y-2">
                <textarea
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Share your feedback, ideas, or suggestions..."
                  rows={2}
                  required
                  className="w-full bg-white/5 border border-white/15 focus:border-[#005691] focus:bg-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 outline-none transition-all resize-none"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="email"
                    value={feedbackEmail}
                    onChange={(e) => setFeedbackEmail(e.target.value)}
                    placeholder="Your email (optional)"
                    className="flex-1 min-w-0 bg-white/5 border border-white/15 focus:border-[#005691] focus:bg-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 outline-none transition-all"
                  />
                  <button
                    type="submit"
                    disabled={feedbackSending}
                    className="bg-[#005691] hover:bg-[#003e69] text-white font-bold px-3.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 hover:scale-[1.02] active:scale-95 disabled:opacity-50 flex-shrink-0"
                  >
                    {feedbackSending ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xs">send</span>
                        <span>Feedback</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="flex items-center justify-between text-[10px] text-white/40 pt-0.5">
                  <span className="flex items-center gap-1">

                  </span>
                  <a
                    href="mailto:info@theatinternational.com?subject=Website%20Feedback"
                    className="text-[#005691] hover:text-white transition-colors font-mono"
                  >
                  </a>
                </div>
              </form>
            )}
          </div>
        </div >

        {/* Contact & Global Head Office */}
        < div >
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-white/80">Global Export Desk</h4>
          <ul className="space-y-4 text-white/70 text-sm mb-6">
            <li className="flex items-start gap-5">
              <span className="material-symbols-outlined text-lg text-[#005691] flex-shrink-0 mt-0.5">location_on</span>
              <span className="text-sm font-medium text-white/80">Room 271, 2nd Floor, Fengchao Youth Innovation Community, No. 49 Dongjiaobei Road, Liwan District, Guangzhou, China</span>
            </li>
            <li className="flex items-center gap-5">
              <span className="material-symbols-outlined text-lg text-[#005691] flex-shrink-0">mail</span>
              <a href="mailto:info@theatinternational.com" className="text-sm font-medium text-white/80 hover:text-white transition-colors truncate">info@theatinternational.com</a>
            </li>
            <li className="flex items-center gap-5">
              <span className="material-symbols-outlined text-lg text-[#005691] flex-shrink-0">call</span>
              <a href="tel:+8618523210975" className="text-sm font-medium text-white/80 hover:text-white transition-colors">+86 185 2321 0975</a>
            </li>
            <li className="flex items-start gap-3 text-xs text-white/60 pt-8 border-t border-white/10">
              <span className="material-symbols-outlined text-lg text-[#005691] flex-shrink-0 mt-0.5">schedule</span>
              <span className="text-xs leading-relaxed text-white/70">Mon–Sat: 9:00 AM – 6:00 PM (China Standard Time, GMT+8)</span>
            </li>
          </ul>
          <button
            onClick={() => handleNavigate('Contact Us')}
            className="bg-white text-black hover:bg-[#005691] hover:text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2 w-full sm:w-auto hover:scale-105 active:scale-95 duration-200"
          >
            <span className="material-symbols-outlined text-base">request_quote</span>
            <span>Request a Quote</span>
          </button>
        </div >
      </div >

      {/* Bottom Bar */}
      < div className="border-t border-white/10 py-5 px-4 sm:px-8 text-center text-white/40 text-xs flex flex-col md:flex-row items-center justify-between gap-4 max-w-[1440px] mx-auto" >
        <div>© {new Date().getFullYear()} AT International. All rights reserved. | Guangzhou City, China</div>
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-white/60">
          <a
            href="/terms-and-conditions"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('Terms & Conditions')
            }}
            className="hover:text-white text-white/75 font-medium transition-colors cursor-pointer hover:underline underline-offset-4"
          >
            Terms & Conditions
          </a>
          <span className="text-white/30">•</span>
          <a
            href="/privacy-policy"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('Privacy Policy')
            }}
            className="hover:text-white text-white/75 font-medium transition-colors cursor-pointer hover:underline underline-offset-4"
          >
            Privacy Policy
          </a>
          <span className="text-white/30">•</span>
          <a
            href="/cookie-policy"
            onClick={(e) => {
              e.preventDefault()
              handleNavigate('Cookies Policy')
            }}
            className="hover:text-white text-white/75 font-medium transition-colors cursor-pointer hover:underline underline-offset-4"
          >
            Cookies Policy
          </a >
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-white/50">Global Trade & Export Supplier</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-white/50">Worldwide Freight Shipping</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-white/50">ISO 9001:2015</span>
        </div >
      </div >
    </footer >
  )
}