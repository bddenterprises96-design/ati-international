import { useEffect, useRef, useState } from 'react'
import AboutUsTeamSection from '../components/AboutUsTeamSection'

// ── Animated Counter Hook ─────────────────────────────────────────
function useCounter(target, duration = 1800, startCounting = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!startCounting) return
    let startTime = null
    let animationFrame = null
    const numericTarget = parseInt(target.replace(/\D/g, ''))

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * numericTarget)

      setCount((prev) => (prev !== current ? current : prev))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setCount(numericTarget)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [startCounting, target, duration])

  const suffix = target.replace(/[0-9]/g, '')
  return `${count}${suffix}`
}

// ── Single Stat Card with counter ────────────────────────────────
function StatCard({ num, label, startCounting }) {
  const display = useCounter(num, 1800, startCounting)
  return (
    <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 text-center shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-300 transform-gpu">
      <div className="text-4xl font-bold text-[#005691] mb-2">{display}</div>
      <div className="text-[#505f76] text-sm">{label}</div>
    </div>
  )
}

// ── Real Motorcycle Tire Card Component for Mission & Vision ───────────
function MotorcycleTireCard({ type, title, icon, description, imageSrc }) {
  const isMission = type === 'mission'

  return (
    <div className="relative group flex items-center justify-center p-2 sm:p-4 w-full">
      {/* Outer Ambient Glow behind real tire */}
      <div
        className={`absolute inset-8 rounded-full blur-2xl opacity-25 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none ${isMission ? 'bg-[#005691]' : 'bg-[#0e7490]'
          }`}
      />

      {/* Outer Real Tire Container - Transparent background (Optimized for smooth 60fps scroll) */}
      <div className="relative w-full max-w-[540px] aspect-square flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-300">

        {/* Real Motorcycle Tire Image with Tight Circular clipPath */}
        <img
          src={imageSrc}
          alt={`${title} Real Motorcycle Tire`}
          style={{ clipPath: 'circle(43.8% at 50% 50%)' }}
          className="w-full h-full object-contain pointer-events-none group-hover:rotate-6 transition-transform duration-700 ease-out"
        />

        {/* Central Tire Hole Content Box - Expanded within Rim */}
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[74%] h-[74%] sm:w-[65%] sm:h-[65%] rounded-full p-3 sm:p-7 flex flex-col items-center justify-center text-center shadow-2xl border-2 transition-all duration-300 ${isMission
            ? 'bg-gradient-to-br from-[#003860] via-[#005691] to-[#00223d] border-cyan-300/60 text-white'
            : 'bg-gradient-to-br from-[#09243d] via-[#005691] to-[#041525] border-teal-300/60 text-white'
            }`}
        >
          {/* Icon Badge */}
          <div
            className={`w-7 h-7 sm:w-11 sm:h-11 rounded-full flex items-center justify-center mb-1 sm:mb-1.5 shadow-md shrink-0 ${isMission
              ? 'bg-white/20 text-cyan-300 border border-cyan-300/40'
              : 'bg-white/20 text-teal-300 border border-teal-300/40'
              }`}
          >
            <span className="material-symbols-outlined text-base sm:text-2xl">{icon}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-xl md:text-2xl font-extrabold mb-1 sm:mb-1.5 tracking-tight text-white drop-shadow-md shrink-0">
            {title}
          </h3>

          {/* Text inside the Real Tire Hole - No Scrollbar, Fully Expanded */}
          <p className="text-[10px] xs:text-[11px] sm:text-xs md:text-sm text-white/95 leading-tight sm:leading-relaxed font-normal max-w-[98%]">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

// Video Assets
const HERO_DESKTOP_VIDEO = 'https://res.cloudinary.com/ybne3lvu/video/upload/v1795156605/WhatsApp_Video_2026-11-20_at_11.34.58_AM11111_xok9fw.mp4'
const HERO_MOBILE_VIDEO = 'https://res.cloudinary.com/ybne3lvu/video/upload/v1795236864/WhatsApp_Video_2026-11-20_at_11.34.59_AM_kqq6i6.mp4'

// ── Main Component ────────────────────────────────────────────────
export default function AboutUs({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  const [countStarted, setCountStarted] = useState(false)
  const [divisionTab, setDivisionTab] = useState('all')
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 640)
  const statsRef = useRef(null)
  const heroRef = useRef(null)
  const videoRef = useRef(null)

  // Listen for viewport changes to serve the right video resolution
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)')
    const handler = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  // Hero entrance animation & document title
  useEffect(() => {
    document.title = 'About Us | AT International'
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

  // Auto-pause background video when scrolled out of view to guarantee buttery smooth 60fps page scroll
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => { })
        } else {
          video.pause()
        }
      },
      { threshold: 0.05 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [isMobile])

  const STATS = [
    { num: '25+', label: 'Years in Industry' },
    { num: '40+', label: 'Countries Served' },
    { num: '500+', label: 'Product SKUs' },
    { num: '98%', label: 'Quality Pass Rate' },
  ]

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* ── ANIMATED HERO ── */}
      <section ref={heroRef} className="relative -mt-20 min-h-[760px] sm:min-h-[840px] lg:min-h-[880px] pt-44 sm:pt-48 pb-10 sm:pb-20 flex items-start sm:items-center overflow-hidden bg-[#005691]">

        {/* Video Background — starts strictly at top-20 (80px) below navbar */}
        <div className="absolute top-20 inset-x-0 bottom-0 overflow-hidden">
          <video
            key={isMobile ? 'mobile-hero-video' : 'desktop-hero-video'}
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-center pointer-events-none"
          >
            <source
              src={isMobile ? HERO_MOBILE_VIDEO : HERO_DESKTOP_VIDEO}
              type="video/mp4"
            />
          </video>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/25 to-[#005691]/00" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <div style={{ transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-2 sm:mb-4 uppercase tracking-widest backdrop-blur-xs">
                GLOBAL REACH • TRUSTED SUPPLY
              </span>
            </div>

            {/* Headline & Tagline */}
            <div style={{ transition: 'opacity 0.9s ease 0.3s, transform 0.9s ease 0.3s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <h1 className="text-2xl sm:text-5xl md:text-7xl font-bold text-white mb-1.5 sm:mb-4 leading-tight tracking-tight">
                Global Sourcing <br />Partner
              </h1>
              <div className="flex items-center gap-2 sm:gap-2.5 text-white text-xs sm:text-xl md:text-2xl font-bold mb-2 sm:mb-6 tracking-tight">
                <span className="w-5 sm:w-8 h-[2px] sm:h-[2.5px] bg-white inline-block flex-shrink-0" />
                <span>Keep Your World Moving.</span>
              </div>
            </div>

            {/* Subtext */}
            <div style={{ transition: 'opacity 0.9s ease 0.5s, transform 0.9s ease 0.5s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <p className="max-w-xl text-white/90 text-xs sm:text-base md:text-lg mb-3 sm:mb-8 leading-relaxed">
                Quality-verified parts sourced in China and delivered to businesses across 40+ countries.
              </p>
            </div>

            {/* Category Pills */}
            <div
              className="flex flex-wrap items-center gap-1.5 sm:gap-3 mb-3.5 sm:mb-8"
              style={{ transition: 'opacity 0.9s ease 0.7s, transform 0.9s ease 0.7s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}
            >
              <button
                type="button"
                onClick={() => onNavigate('Products#motorcycle')}
                className="px-2.5 sm:px-5 py-1 sm:py-2 rounded-full border border-white/35 bg-white/15 hover:bg-white/25 text-white text-[11px] sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                Motorcycle Parts
              </button>
              <button
                type="button"
                onClick={() => onNavigate('Products#e-bike')}
                className="px-2.5 sm:px-5 py-1 sm:py-2 rounded-full border border-white/35 bg-white/15 hover:bg-white/25 text-white text-[11px] sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                E-Bike Parts
              </button>
              <button
                type="button"
                onClick={() => onNavigate('Products#industrial-seals')}
                className="px-2.5 sm:px-5 py-1 sm:py-2 rounded-full border border-white/35 bg-white/15 hover:bg-white/25 text-white text-[11px] sm:text-sm font-medium transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
              >
                Industrial Sealing
              </button>
            </div>

            {/* Action Buttons: 2 cols on mobile, flex on desktop */}
            <div className="grid grid-cols-2 sm:flex sm:flex-row gap-2.5 sm:gap-4 max-w-sm sm:max-w-none" style={{ transition: 'opacity 0.9s ease 0.8s, transform 0.9s ease 0.8s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <button
                onClick={() => onNavigate('Products')}
                className="bg-white text-[#005691] hover:bg-gray-100 px-3 sm:px-8 py-2.5 sm:py-4 font-bold rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                <span>Explore Catalog</span>
                <span className="material-symbols-outlined text-sm sm:text-base">north_east</span>
              </button>
              <button
                onClick={() => onNavigate('Contact Us')}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold px-3 sm:px-8 py-2.5 sm:py-4 rounded-xl hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-lg shadow-amber-500/25 cursor-pointer"
              >
                <span>Get a Quote</span>
              </button>
            </div>

          </div>
        </div>

      </section>

      {/* ── VALUE PROPS BAR ── */}
      <section className="bg-white py-4 sm:py-8">
        <div className="max-w-[1440px] mx-auto px-2 sm:px-8 grid grid-cols-4 gap-2 sm:gap-6 lg:gap-10">
          {[
            { icon: 'verified_user', title: 'Quality-Assured Sourcing', desc: 'All products sourced from ISO 9001:2015 certified partner manufacturers.' },
            { icon: 'public', title: 'Global Export Network', desc: 'Supplying industrial buyers in over 40 countries across six continents.' },
            { icon: 'handshake', title: 'Trusted Trading Partner', desc: 'Transparent procurement, competitive pricing, and long-term supply reliability.' },
            { icon: 'engineering', title: 'Technical Sourcing Support', desc: 'Specification guidance, cross-referencing, and custom sourcing for your exact requirements.' },
          ].map((item, i) => (
            <div
              key={item.title}
              className="flex flex-col gap-1 sm:gap-3"
              style={{
                transition: `opacity 0.7s ease ${1.0 + i * 0.15}s, transform 0.7s ease ${1.0 + i * 0.15}s`,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              <span className="material-symbols-outlined text-[#005691] text-2xl sm:text-4xl">{item.icon}</span>
              <p className="font-bold text-[10px] sm:text-sm text-[#005691] leading-tight">{item.title}</p>
              <p className="text-[9px] sm:text-sm text-[#505f76] leading-tight sm:leading-normal">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPANY OVERVIEW with ANIMATED COUNTERS ── */}
      <section className="py-12 sm:py-20 max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005691] mb-4 sm:mb-6">Our Company</h2>
            <p className="text-[#505f76] text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
              AT International operates as a specialized global trading and supply partner. We specialize in streamlining cross-border procurement for industrial sealing solutions, motorcycle parts, and e-bike parts for distributors and B2B buyers worldwide.
            </p>
            <p className="text-[#505f76] text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">
              Based in China, our team collaborates directly with ISO-certified partner manufacturers. We oversee supplier verification, inspect technical documentation, and ensure rigorous pre-shipment standards on every cargo dispatch.
            </p>
            <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
              Whether you need standard catalogue items or custom specifications sourced to your drawings,
              our experienced sourcing team manages the entire supply process from inquiry to delivery.
            </p>
          </div>

          {/* Stat Cards with counters — observed by IntersectionObserver */}
          <div ref={statsRef} className="grid grid-cols-2 gap-4 sm:gap-6">
            {STATS.map((s) => (
              <StatCard key={s.label} num={s.num} label={s.label} startCounting={countStarted} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE SUPPLY DIVISIONS ── */}
      <section className="py-12 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005691] mb-3 sm:mb-4 tracking-tight">Core Supply Divisions</h2>
          <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
            Explore our primary export product lines, sourced for industrial, automotive, and electric mobility applications worldwide.
          </p>
        </div>

        {/* Division Filter Tabs for Quick Navigation (Section 03-B) */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10">
          {[
            { id: 'all', label: 'All Divisions', icon: 'apps' },
            { id: 'industrial', label: 'Industrial Sealing', icon: 'settings' },
            { id: 'motorcycle', label: 'Motorcycle Parts', icon: 'two_wheeler' },
            { id: 'ebike', label: 'E-Bike Parts', icon: 'electric_bike' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setDivisionTab(tab.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer ${divisionTab === tab.id
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/25 scale-105'
                : 'bg-white border border-[#c5c6cd] text-[#505f76] hover:border-[#005691] hover:text-[#005691]'
                }`}
            >
              <span className="material-symbols-outlined text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Industrial Division Card */}
          {(divisionTab === 'all' || divisionTab === 'industrial') && (
            <div
              onClick={() => onNavigate('Products#industrial-seals')}
              className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-white p-4 flex items-center justify-center border-b border-[#e2effa]">
                  <span className="absolute top-4 left-4 z-10 bg-[#005691] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    Industrial Division
                  </span>
                  <img
                    src="/assets/homepage_bento_seals_clean.png"
                    alt="Industrial Sealing Solutions"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/industrial-seals.png' }}
                  />
                </div>
                <div className="p-8 bg-[#f0f7ff]">
                  <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                    Industrial Sealing Solutions
                  </h3>
                  <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                    High-performance Valve Stem Seals (FKM/Viton), Fluororubber & NBR O-Rings, and Heavy-Duty Rotary Shaft Oil Seals for hydraulic and engine systems.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Valve Stem Seals', 'O-Rings', 'Oil Seals'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white text-[#005691] rounded-lg border border-[#cbe3f7]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0 bg-[#f0f7ff]">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate('Products#industrial-seals')
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 group-hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Industrial Division</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* Motorcycle Division Card */}
          {(divisionTab === 'all' || divisionTab === 'motorcycle') && (
            <div
              onClick={() => onNavigate('Products#motorcycle')}
              className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-white p-4 flex items-center justify-center border-b border-[#e2effa]">
                  <span className="absolute top-4 left-4 z-10 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    Motorcycle Division
                  </span>
                  <img
                    src="/assets/homepage_bento_moto_clean.png"
                    alt="Motorcycle Parts"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/moto.png' }}
                  />
                </div>
                <div className="p-8 bg-[#f0f7ff]">
                  <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                    Motorcycle Parts
                  </h3>
                  <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                    Quality-verified engine parts including crankshafts, cylinder heads, and cylinders, along with a complete range of motorcycle parts sourced to your specifications.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Crankshafts', 'Cylinder Heads', 'Cylinders'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white text-[#005691] rounded-lg border border-[#cbe3f7]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0 bg-[#f0f7ff]">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate('Products#motorcycle')
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 group-hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore Motorcycle Division</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          )}

          {/* E-Bike Division Card */}
          {(divisionTab === 'all' || divisionTab === 'ebike') && (
            <div
              onClick={() => onNavigate('Products#e-bike')}
              className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
            >
              <div>
                <div className="h-64 overflow-hidden relative bg-white p-4 flex items-center justify-center border-b border-[#e2effa]">
                  <span className="absolute top-4 left-4 z-10 bg-[#10B981] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                    E-Bike Division
                  </span>
                  <img
                    src="/assets/homepage_bento_ebike_clean.png"
                    alt="E-Bike Parts"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = '/assets/ebike.png' }}
                  />
                </div>
                <div className="p-8 bg-[#f0f7ff]">
                  <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                    E-Bike Parts
                  </h3>
                  <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                    BLDC hub motors, motor controllers, and Li-ion battery chargers, plus IP67 motor shaft seals and UL94-V0 flame-retardant battery gaskets, along with a complete range of e-bike parts.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {['Hub Motors', 'Motor Controllers', 'Battery Chargers'].map((tag) => (
                      <span key={tag} className="text-xs font-semibold px-3 py-1 bg-white text-[#005691] rounded-lg border border-[#cbe3f7]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="p-8 pt-0 bg-[#f0f7ff]">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onNavigate('Products#e-bike')
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-amber-500/20 group-hover:scale-[1.02] cursor-pointer"
                >
                  <span>Explore E-Bike Division</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── MISSION & VISION (MOTORCYCLE TIRE HOLE DESIGN) ── */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-white py-12 sm:py-20 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
            <span className="inline-block px-3.5 py-1 bg-[#005691]/10 text-[#005691] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
              DRIVING FORWARD
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#005691]">Our Strategic Direction</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center justify-items-center">
            <MotorcycleTireCard
              type="mission"
              title="Our Mission"
              icon="flag"
              imageSrc="/assets/real_moto_tire_mission.jpg"
              description="To simplify global sourcing by connecting businesses with reliable supply partners and delivering quality-verified Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions through dependable service, transparent processes, and efficient supply."
            />
            <MotorcycleTireCard
              type="vision"
              title="Our Vision"
              icon="visibility"
              imageSrc="/assets/real_moto_tire_vision.jpg"
              description="To become a trusted global sourcing partner for Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions buyers worldwide."
            />
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-12 sm:py-20 max-w-[1440px] mx-auto px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#005691] mb-2 sm:mb-3 text-center">Core Values</h2>
        <p className="text-[#505f76] text-xs sm:text-sm text-center mb-8 sm:mb-12">The principles that guide everything we do at AT International.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            { icon: 'verified', title: 'Quality First', desc: 'We source from verified, certified partner manufacturers. Material documentation and traceability are available on request.' },
            { icon: 'handshake', title: 'Integrity', desc: 'Transparent pricing, honest communication, and dependable commitments form the foundation of every customer relationship.' },
            { icon: 'rocket_launch', title: 'Procurement Agility', desc: 'Fast inquiry turnaround, flexible MOQ options, and responsive sourcing that adapts to your production schedules.' },
            { icon: 'groups', title: 'Customer Focus', desc: "We listen, understand your application, and source components that match your exact technical and commercial requirements." },
            { icon: 'public', title: 'Global Reach', desc: 'Guangzhou, China. We manage exports to over 40 countries with experience in customs, Incoterms, and international freight.' },
            { icon: 'eco', title: 'Responsible Sourcing', desc: 'We prioritize suppliers with strong environmental commitments, RoHS and REACH compliant materials, and responsible supply chains.' },
          ].map((v) => (
            <div key={v.title} className="bg-white border border-[#c5c6cd] rounded-xl p-5 sm:p-8 hover:shadow-lg hover:bg-white/20 hover:scale-105 transition-transform duration-500 transform-gpu">
              <span className="material-symbols-outlined text-[#005691] text-3xl sm:text-4xl mb-3 sm:mb-4 block">{v.icon}</span>
              <h4 className="font-bold text-[#005691] text-base sm:text-lg mb-2 sm:mb-3">{v.title}</h4>
              <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS & COMPLIANCE STANDARDS ── */}
      <section className="relative py-16 sm:py-24 overflow-hidden">
        {/* Generated product background image */}
        <img
          src="/assets/compliance_bg.jpg"
          alt="Quality Assurance & Compliance"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark navy overlay for maximum contrast and zero-lag rendering */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#002447]/90 via-[#004275]/15 to-[#001d3a]/20" />

        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 text-center">
          <div className="mb-3">
            <span className="inline-block px-3.5 py-1 bg-white/15 backdrop-blur-md text-white text-xs font-semibold rounded-full uppercase tracking-widest border border-white/25 shadow-sm">
              Global Quality Assurance
            </span>
          </div>

          <div className="mb-4">
            <h2 className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl text-2xl sm:text-4xl font-extrabold text-white tracking-widest shadow-lg">
              Compliance Standards
            </h2>
          </div>

          <div className="mb-10 sm:mb-14 max-w-2xl mx-auto px-2">
            <p className="inline-block bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-5 sm:px-7 py-3 sm:py-3.5 text-white/95 text-xs sm:text-base leading-relaxed tracking-wider shadow-lg">
              Products sourced and supplied in strict compliance with international quality, safety, and material standards.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-4xl mx-auto">
            {[
              { cert: 'ISO 9001:2015', desc: 'Quality Management System', icon: 'verified' },
              { cert: 'RoHS', desc: 'Hazardous Substance Compliance', icon: 'eco' },
              { cert: 'REACH', desc: 'Chemical Safety Regulation', icon: 'science' },
              { cert: 'Quality Verification & Traceability', desc: 'Verified Third-Party Inspection Records', icon: 'fact_check' },
            ].map((c) => (
              <div
                key={c.cert}
                className="bg-white/15 backdrop-blur-md border border-white/25 rounded-xl p-2 sm:p-4 hover:bg-white/25 hover:border-white/40 hover:-translate-y-0.5 transition-all duration-300 shadow-lg flex flex-col items-center justify-center text-center group"
              >
                <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-white/15 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-white text-base sm:text-xl">{c.icon}</span>
                </div>
                <div>
                  <div className="text-[10px] sm:text-sm font-bold text-white mb-0.5 sm:mb-1 leading-tight">{c.cert}</div>
                  <div className="text-white/80 text-[8.5px] sm:text-xs leading-tight sm:leading-snug">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ── */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
          <div className="rounded-2xl overflow-hidden h-64 sm:h-80 shadow-lg">
            <img src="/assets/888.jpeg" alt="AT International Supply" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005691] mb-4 sm:mb-6">Global Sourcing & Export Capabilities</h2>
            <p className="text-[#505f76] text-sm sm:text-base leading-relaxed mb-6 sm:mb-8">
              From China, we coordinate the full supply chain on your behalf from supplier
              selection and quality verification to export documentation and international delivery.
            </p>
            {[
              { icon: 'check_circle', title: 'Full Documentation', desc: 'CoC, material data sheets, RoHS and REACH declarations available on request.' },
              { icon: 'check_circle', title: 'Flexible Incoterms', desc: 'EXW, FOB, CFR, CIF and DDP terms available to suit your logistics and import requirements.' },
              { icon: 'check_circle', title: 'Custom Sourcing', desc: 'We source to your drawings, specifications, and OEM cross-references from our verified supplier network.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 sm:gap-4 mb-4 sm:mb-5">
                <span className="material-symbols-outlined text-[#005691] text-lg sm:text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="font-bold text-[#005691] text-xs sm:text-sm mb-0.5 sm:mb-1">{item.title}</div>
                  <div className="text-[#505f76] text-xs sm:text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <button
                onClick={() => onNavigate('Contact Us')}
                className="bg-[#005691] text-white px-6 sm:px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 hover:scale-105 transition-all duration-200 text-center"
              >
                Discuss Your Requirements
              </button>
              <button
                onClick={() => onNavigate('Contact Us')}
                className="border border-[#005691] text-[#005691] px-6 sm:px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 hover:scale-105 transition-all duration-200 text-center"
              >
                Submit a Sourcing Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US & LEADERSHIP TEAM SECTION (SECTION 03-E) ── */}
      <AboutUsTeamSection onNavigate={onNavigate} />

      {/* ── CTA ── */}
      <section className="py-14 sm:py-24 text-center bg-gradient-to-b from-[#f2f4f6] to-white px-4 sm:px-8">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#005691] mb-3 sm:mb-4 tracking-tight">Ready to Source Smarter?</h2>
        <p className="text-[#505f76] text-xs sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
          Submit your product requirements and our sourcing team will respond with a competitive supply proposal within 24 business hours.
        </p>
        <button
          onClick={() => onNavigate('Contact Us')}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-extrabold px-10 sm:px-14 py-4 sm:py-4.5 rounded-xl text-sm uppercase tracking-wider hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center justify-center gap-2.5 shadow-xl shadow-amber-500/30 w-full sm:w-auto cursor-pointer"
        >
          <span className="material-symbols-outlined text-lg">mail</span>
          <span>Contact Our Team</span>
        </button>
      </section>

    </div>
  )
}