import { useState } from 'react'

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <defs>
          <radialGradient id="ig1" cx="19%" cy="99%" r="128%">
            <stop offset="0%" stopColor="#ffd676"/>
            <stop offset="25%" stopColor="#f2a454"/>
            <stop offset="50%" stopColor="#f05c35"/>
            <stop offset="75%" stopColor="#c62a8a"/>
            <stop offset="100%" stopColor="#6a35b5"/>
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ig1)"/>
        <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2.8" fill="none"/>
        <circle cx="33.5" cy="14.5" r="2" fill="white"/>
        <rect x="8" y="8" width="32" height="32" rx="9" stroke="white" strokeWidth="2.8" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#1877F2"/>
        <path d="M32 8h-4a8 8 0 00-8 8v4h-4v6h4v14h6V26h4l1-6h-5v-4a2 2 0 012-2h3V8z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8618523210975',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#25D366"/>
        <path d="M24 8C15.163 8 8 15.163 8 24c0 2.813.729 5.463 2.006 7.769L8 40l8.48-2.218A15.934 15.934 0 0024 40c8.837 0 16-7.163 16-16S32.837 8 24 8zm0 29.333a13.29 13.29 0 01-6.777-1.856l-.486-.29-5.03 1.316 1.34-4.897-.317-.502A13.29 13.29 0 0110.667 24C10.667 16.636 16.636 10.667 24 10.667S37.333 16.636 37.333 24 31.364 37.333 24 37.333zm7.293-9.946c-.4-.2-2.368-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.686-.621-3.21-1.978-1.186-1.057-1.987-2.363-2.22-2.763-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.779-.656-.674-.9-.686l-.767-.016c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.831.262 2.52.159.769-.115 2.368-.967 2.701-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'WeChat',
    href: '#',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#07C160"/>
        <ellipse cx="18" cy="21" rx="9" ry="7" stroke="white" strokeWidth="2" fill="none"/>
        <ellipse cx="30" cy="25" rx="9" ry="7" stroke="white" strokeWidth="2" fill="none"/>
        <circle cx="15" cy="21" r="1.5" fill="white"/>
        <circle cx="21" cy="21" r="1.5" fill="white"/>
        <circle cx="27" cy="25" r="1.5" fill="white"/>
        <circle cx="33" cy="25" r="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#000000"/>
        <path d="M26.244 21.956L35.5 11h-2.18l-8.019 9.323L18.93 11H11.5l9.709 14.129L11.5 37h2.18l8.489-9.869L28.93 37h7.43L26.244 21.956zm-3.006 3.494l-.984-1.408L14.548 12.64h3.368l6.318 9.039.984 1.408 8.214 11.75h-3.368l-6.826-9.387z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#010101"/>
        <path d="M34.2 16.533a7.653 7.653 0 01-7.644-7.644V8h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V21.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V19.4a12.6 12.6 0 007.644 2.578V17a7.67 7.67 0 01-4-.467z" fill="white"/>
        <path d="M33.2 15.533a7.653 7.653 0 01-7.644-7.644V7h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V20.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V18.4a12.6 12.6 0 007.644 2.578V16a7.67 7.67 0 01-4-.467z" fill="#EE1D52" opacity="0.8"/>
        <path d="M35.2 17.533a7.653 7.653 0 01-7.644-7.644V9h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V22.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V20.4a12.6 12.6 0 007.644 2.578V18a7.67 7.67 0 01-4-.467z" fill="#69C9D0" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#FF0000"/>
        <path d="M37.41 17.26a3.5 3.5 0 00-2.46-2.47C32.76 14.2 24 14.2 24 14.2s-8.76 0-10.95.59a3.5 3.5 0 00-2.46 2.47A36.26 36.26 0 0010 24a36.26 36.26 0 00.59 6.74 3.5 3.5 0 002.46 2.47C15.24 33.8 24 33.8 24 33.8s8.76 0 10.95-.59a3.5 3.5 0 002.46-2.47A36.26 36.26 0 0038 24a36.26 36.26 0 00-.59-6.74zM21.2 28.4V19.6l7.33 4.4-7.33 4.4z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/atiinternational',
    icon: (
      <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#0A66C2"/>
        <path d="M14 19h4v15h-4V19zm2-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 6h3.6v2h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 5 2.8 5 6.3V34h-4v-8c0-1.9 0-4.3-2.6-4.3-2.7 0-3.1 2.1-3.1 4.2V34h-3.9V19z" fill="white"/>
      </svg>
    ),
  },
]

export default function ContactUS() {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', country: '', product: '', quantity: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const submit = () => {
    if (!form.name || !form.email) return
    setSubmitted(true)
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero */}
      <section className="relative -mt-20 pt-40 pb-20 px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/icccc.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue overlay so text stays readable, matches homepage style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/65 to-[#005691]/10" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">Contact & Procurement Inquiry</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Submit your requirements and our team will respond with a detailed proposal within 24 business hours.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left Column */}
          <div className="md:col-span-1 flex flex-col gap-6">

            {/* Contact Info */}
            <div className="bg-white border border-[#c5c6cd] rounded-xl p-8">
              <h3 className="font-bold text-[#005691] text-lg mb-6">Contact Information</h3>
              {[
                { icon: 'location_on', label: 'Head Office',      value: 'Liwan District, Guangzhou City'   },
                { icon: 'mail',        label: 'Email',            value: 'theatinternational@gmail.com' },
                { icon: 'phone',       label: 'Phone / WhatsApp', value: '0086-18523210975'           },
                { icon: 'schedule',    label: 'Business Hours',   value: 'Mon–Sat: 9am – 6pm CST (China)'    },
              ].map((c) => (
                <div key={c.label} className="flex gap-4 mb-6">
                  <div className="w-10 h-10 bg-[#005691]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#005691] text-xl">{c.icon}</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#005691] uppercase tracking-widest mb-1">{c.label}</div>
                    <div className="text-sm text-[#505f76]">{c.value}</div>
                  </div>
                </div>
              ))}

              <div className="border-t border-[#c5c6cd] my-4" />

              <h4 className="font-bold text-[#005691] text-sm uppercase tracking-widest mb-4">Regional Offices</h4>
              {[
                { region: 'Middle East',  contact: 'UAE Distribution Hub' },
                { region: 'Europe',       contact: 'Germany Sales Office' },
                { region: 'Asia Pacific', contact: 'China Liaison Office' },
              ].map((r) => (
                <div key={r.region} className="flex gap-4 mb-4 last:mb-0">
                  <div className="w-10 h-10 bg-[#005691]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-[#005691] text-xl">location_on</span>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#005691] uppercase tracking-widest mb-1">{r.region}</div>
                    <div className="text-sm text-[#505f76]">{r.contact}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="bg-white border border-[#c5c6cd] rounded-2xl p-6">
              <h3 className="font-bold text-[#005691] text-base mb-1">Follow Us</h3>
              <p className="text-[#505f76] text-xs mb-5">Find us on social media</p>
              <div className="grid grid-cols-4 gap-4">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.name}
                    className="flex flex-col items-center gap-1.5 group"
                  >
                    <div className="w-14 h-14 rounded-[16px] flex items-center justify-center group-hover:scale-110 group-hover:brightness-110 transition-all duration-200 shadow-md">
                      {s.icon}
                    </div>
                    <span className="text-[10px] text-[#505f76] group-hover:text-[#005691] transition-colors text-center font-medium">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Inquiry Form */}
          <div className="md:col-span-2">
            {submitted ? (
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-16 text-center">
                <span className="material-symbols-outlined text-[#005691] text-6xl mb-6 block">check_circle</span>
                <h3 className="text-2xl font-bold text-[#005691] mb-4">Inquiry Submitted!</h3>
                <p className="text-[#505f76]">Thank you, <strong>{form.name}</strong>. Our procurement team will review your inquiry and respond within 24 business hours.</p>
              </div>
            ) : (
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-10">
                <h3 className="font-bold text-[#005691] text-xl mb-8">Procurement Inquiry Form</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { name: 'name',     label: 'Full Name *',       placeholder: 'Your full name',      type: 'text'  },
                    { name: 'company',  label: 'Company Name',      placeholder: 'Your company',        type: 'text'  },
                    { name: 'email',    label: 'Email Address *',   placeholder: 'your@email.com',      type: 'email' },
                    { name: 'phone',    label: 'Phone / WhatsApp',  placeholder: '+1 234 567 8900',     type: 'tel'   },
                    { name: 'country',  label: 'Country',           placeholder: 'Country of delivery', type: 'text'  },
                    { name: 'quantity', label: 'Quantity Required', placeholder: 'e.g. 5,000 units',    type: 'text'  },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className="block text-xs font-semibold text-[#005691] uppercase tracking-widest mb-2">{f.label}</label>
                      <input
                        type={f.type}
                        name={f.name}
                        value={form[f.name]}
                        onChange={handle}
                        placeholder={f.placeholder}
                        className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg text-sm focus:ring-2 focus:ring-[#005691] focus:border-[#005691] outline-none transition-all"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#005691] uppercase tracking-widest mb-2">Product Required</label>
                    <select
                      name="product"
                      value={form.product}
                      onChange={handle}
                      className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg text-sm focus:ring-2 focus:ring-[#005691] focus:border-[#005691] outline-none transition-all"
                    >
                      <option value="">Select a product category</option>
                      <option>Valve Stem Seals</option>
                      <option>O-Rings</option>
                      <option>Oil Seals</option>
                      <option>Custom / Bespoke Seals</option>
                      <option>Multiple Products</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-[#005691] uppercase tracking-widest mb-2">Technical Requirements / Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      rows={5}
                      placeholder="Include dimensions, material specifications, tolerances, application details..."
                      className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg text-sm focus:ring-2 focus:ring-[#005691] focus:border-[#005691] outline-none transition-all resize-none"
                    />
                  </div>
                </div>
                <button
                  onClick={submit}
                  className="mt-8 w-full bg-[#005691] text-white py-4 rounded-lg font-semibold text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  Submit Inquiry
                </button>
                <p className="text-xs text-[#505f76] text-center mt-4">We respond within 24 business hours. Your information is kept strictly confidential.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}