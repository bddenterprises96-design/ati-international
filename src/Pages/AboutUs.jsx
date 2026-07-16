import { useEffect, useRef, useState } from 'react'

// ── Animated Counter Hook ─────────────────────────────────────────
function useCounter(target, duration = 2000, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let startTime = null
    const numericTarget = parseInt(target.replace(/\D/g, ''))

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * numericTarget))
      if (progress < 1) requestAnimationFrame(step)
      else setCount(numericTarget)
    }

    requestAnimationFrame(step)
  }, [startCounting, target, duration])

  // Re-attach suffix/prefix
  const suffix = target.replace(/[0-9]/g, '')
  return `${count}${suffix}`
}

// ── Single Stat Card with counter ────────────────────────────────
function StatCard({ num, label, startCounting }) {
  const display = useCounter(num, 2000, startCounting)
  return (
    <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="text-4xl font-bold text-[#005691] mb-2">{display}</div>
      <div className="text-[#505f76] text-sm">{label}</div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────
export default function AboutUs({ onNavigate }) {
  const [visible, setVisible]           = useState(false)
  const [countStarted, setCountStarted] = useState(false)
  const statsRef                        = useRef(null)

  // Hero entrance animation
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  // Start counter when stats section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setCountStarted(true) },
      { threshold: 0.3 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [])

  const STATS = [
    { num: '25+',  label: 'Years in Industry' },
    { num: '40+',  label: 'Countries Served'  },
    { num: '500+', label: 'Product SKUs'      },
    { num: '98%',  label: 'Quality Pass Rate' },
  ]

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* ── ANIMATED HERO ── */}
      <section className="relative h-[700px] flex items-center overflow-hidden">

        {/* Video Background — replaces the previous static image */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/80 to-[#005691]/20" />

        {/* Shimmer lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-white/10"
              style={{
                top: `${15 + i * 18}%`,
                left: 0, right: 0,
                transition: `opacity 1.5s ease ${i * 0.3}s, transform 1.5s ease ${i * 0.3}s`,
                opacity: visible ? 0.4 : 0,
                transform: visible ? 'scaleX(1)' : 'scaleX(0)',
                transformOrigin: 'left',
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
          <div className="max-w-2xl">

            {/* Badge */}
            <div style={{ transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest backdrop-blur-sm">
                Global Reach • Industrial Excellence
              </span>
            </div>

            {/* Headline */}
            <div style={{ transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Essential Sealing <br />Solutions
              </h1>
            </div>

            {/* Subtext */}
            <div style={{ transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Engineered for your most demanding mechanical systems with reinforced
                construction and a range of high-quality sealing compounds, ATI sealing
                solutions deliver reliable, high-quality products. Delivering Pivotal Products
                that Keep Systems Running Smoothly.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4" style={{ transition: 'opacity 0.9s ease 0.8s, transform 0.9s ease 0.8s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <button
                onClick={() => onNavigate('Products')}
                className="bg-white text-[#005691] px-8 py-4 font-semibold rounded-lg flex items-center gap-2 text-sm hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Explore Technical Catalog
                <span className="material-symbols-outlined text-sm">north_east</span>
              </button>
              <button
                onClick={() => onNavigate('Contact US')}
                className="border border-white/50 text-white px-8 py-4 font-semibold rounded-lg hover:bg-white/10 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2 text-sm backdrop-blur-sm"
              >
                Get a Quote Today
                <span className="material-symbols-outlined text-sm">lock_open</span>
              </button>
            </div>

          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f9fb] to-transparent" />
      </section>

      {/* ── VALUE PROPS BAR ── */}
      <section className="bg-white border-b border-[#c5c6cd] py-1">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: 'verified_user',           title: 'ISO 9001:2015 Certified', desc: 'Rigorous quality control for mission-critical components.' },
            { icon: 'precision_manufacturing', title: 'Advanced Machining',      desc: 'Zero-defect manufacturing with 0.001mm tolerance.' },
            { icon: 'public',                  title: 'Global Supply Chain',     desc: 'Strategic distribution hubs across five continents.' },
            { icon: 'engineering',             title: 'Expert Engineering',      desc: 'Direct access to technical consultants and CAD support.' },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col gap-3"
              style={{
                transition: `opacity 0.7s ease ${1.0 + i * 0.15}s, transform 0.7s ease ${1.0 + i * 0.15}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <span className="material-symbols-outlined text-[#005691] text-4xl">{item.icon}</span>
              <p className="font-bold text-sm text-[#005691]">{item.title}</p>
              <p className="text-sm text-[#505f76]">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPANY OVERVIEW with ANIMATED COUNTERS ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#005691] mb-6">Our Company</h2>
            <p className="text-[#505f76] text-lg leading-relaxed mb-5">
              ATI International is a leading manufacturer and global exporter of high-performance sealing components.
              We specialize in Valve Stem Seals, O-Rings, Oil Seals, and custom-engineered sealing solutions for the
              automotive and industrial sectors.
            </p>
            <p className="text-[#505f76] leading-relaxed mb-5">
              Founded with a mission to deliver precision-engineered components to global OEMs and Tier 1 suppliers,
              ATI International has grown into a trusted name recognized for consistent quality, technical expertise,
              and reliable logistics.
            </p>
            <p className="text-[#505f76] leading-relaxed">
              Our manufacturing facilities are equipped with advanced CNC machinery and quality control systems,
              ensuring every component exceeds customer expectations.
            </p>
          </div>

          {/* Stat Cards with counters — observed by IntersectionObserver */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {STATS.map((s) => (
              <StatCard key={s.label} num={s.num} label={s.label} startCounting={countStarted} />
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#005691] text-white rounded-2xl p-10 hover:shadow-xl transition-shadow duration-300">
            <span className="material-symbols-outlined text-4xl mb-5 block">flag</span>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To deliver precision-engineered sealing solutions that enable our customers to achieve the highest levels
              of performance, reliability, and efficiency — while maintaining the highest standards of quality,
              integrity, and sustainability.
            </p>
          </div>
          <div className="bg-[#f2f4f6] border border-[#c5c6cd] rounded-2xl p-10 hover:shadow-xl transition-shadow duration-300">
            <span className="material-symbols-outlined text-4xl text-[#005691] mb-5 block">visibility</span>
            <h3 className="text-2xl font-bold text-[#005691] mb-4">Our Vision</h3>
            <p className="text-[#505f76] leading-relaxed">
              To be the world's most trusted partner for industrial sealing solutions — recognized globally for
              innovation, quality excellence, and our commitment to long-term customer relationships.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-[#005691] mb-3 text-center">Core Values</h2>
        <p className="text-[#505f76] text-center mb-12">The principles that guide everything we do at ATI International.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'verified',      title: 'Quality First',   desc: 'Every component undergoes rigorous multi-stage inspection. ISO 9001:2015 certified processes ensure zero-defect delivery.' },
            { icon: 'handshake',     title: 'Integrity',       desc: 'Transparent pricing, honest communication, and dependable commitments form the foundation of every customer relationship.' },
            { icon: 'rocket_launch', title: 'Innovation',      desc: 'Continuous investment in R&D and advanced manufacturing technology keeps our solutions at the cutting edge.' },
            { icon: 'groups',        title: 'Customer Focus',  desc: "We listen, adapt, and deliver solutions tailored to each client's specific technical and commercial requirements." },
            { icon: 'public',        title: 'Global Thinking', desc: 'Our worldwide logistics network ensures timely delivery to every corner of the globe, on schedule and on budget.' },
            { icon: 'eco',           title: 'Sustainability',  desc: 'Committed to environmentally responsible manufacturing with reduced waste, energy efficiency, and green sourcing.' },
          ].map((v) => (
            <div key={v.title} className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <span className="material-symbols-outlined text-[#005691] text-4xl mb-4 block">{v.icon}</span>
              <h4 className="font-bold text-[#005691] text-lg mb-3">{v.title}</h4>
              <p className="text-[#505f76] text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="bg-[#005691] py-10">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Certifications & Compliance</h2>
          <p className="text-white/80 mb-12">ATI International meets the highest international standards.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { cert: 'ISO 9001:2015', desc: 'Quality Management System'     },
              { cert: 'RoHS',          desc: 'Hazardous Substance Compliance' },
              { cert: 'REACH',         desc: 'Chemical Safety Regulation'    },
              { cert: 'TS 16949',      desc: 'Automotive Quality Standard'   },
            ].map((c) => (
              <div key={c.cert} className="bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 transition-all duration-200">
                <div className="text-xl font-bold text-white mb-2">{c.cert}</div>
                <div className="text-white/70 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden h-80 shadow-lg">
            <img src="/assets/background.jpg" alt="ATI Manufacturing" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#005691] mb-6">Optimized Supply Chain & Global Reach</h2>
            <p className="text-[#505f76] leading-relaxed mb-8">
              ATI International ensures seamless distribution of essential sealing solutions. From custom material
              formulations to just-in-time delivery for high-volume manufacturing lines.
            </p>
            {[
              { icon: 'check_circle', title: 'Full PPAP Support',     desc: 'Complete documentation and quality assurance for automotive compliance.' },
              { icon: 'check_circle', title: 'Consolidated Shipping', desc: 'Reduced logistics costs via strategic regional distribution centers.' },
              { icon: 'check_circle', title: 'Custom Engineering',    desc: 'Material testing and formulation for specific environmental extremes.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-4 mb-5">
                <span className="material-symbols-outlined text-[#005691] text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-[#005691] text-sm mb-1">{item.title}</div>
                  <div className="text-[#505f76] text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
            <div className="flex gap-4 mt-8 flex-wrap">
              <button
                onClick={() => onNavigate('Contact US')}
                className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 hover:scale-105 transition-all duration-200"
              >
                Connect with Engineering
              </button>
              <button
                onClick={() => onNavigate('Contact US')}
                className="border border-[#005691] text-[#005691] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 hover:scale-105 transition-all duration-200"
              >
                Review Inquiries
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center bg-[#f2f4f6]">
        <h2 className="text-3xl font-bold text-[#005691] mb-4">Partner with ATI International</h2>
        <p className="text-[#505f76] mb-8 max-w-xl mx-auto">
          Get in touch with our team to discuss your sealing requirements and receive a tailored procurement proposal.
        </p>
        <button
          onClick={() => onNavigate('Contact US')}
          className="bg-[#005691] text-white px-12 py-4 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 shadow-lg"
        >
          <span className="material-symbols-outlined text-sm">mail</span>
          Contact Our Team
        </button>
      </section>

    </div>
  )
}