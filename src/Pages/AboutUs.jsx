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
    <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 text-center shadow-sm hover:shadow-md hover:scale-105 transition-transform duration-500">
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

  const STATS = [
    { num: '25+',  label: 'Years in Industry' },
    { num: '40+',  label: 'Countries Served'  },
    { num: '500+', label: 'Product SKUs'      },
    { num: '98%',  label: 'Quality Pass Rate' },
  ]

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* ── ANIMATED HERO ── */}
      <section className="relative -mt-20 h-[750px] flex items-center overflow-hidden">

        {/* Video Background — replaces the previous static image */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/ybne3lvu/video/upload/v1784380222/make_this_video_s_quality_bett_ldzldn.mp4" type="video/mp4" />
        </video>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/70 to-[#005691]/10" />

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
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
          <div className="max-w-3xl">

            {/* Badge */}
            <div style={{ transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)' }}>
              <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest backdrop-blur-sm">
                GLOBAL REACH • TRUSTED SUPPLY
              </span>
            </div>

            {/* Headline */}
            <div style={{ transition: 'opacity 0.9s ease 0.4s, transform 0.9s ease 0.4s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                Global Sourcing  <br />Partner
              </h1>
            </div>

            {/* Subtext */}
            <div style={{ transition: 'opacity 0.9s ease 0.6s, transform 0.9s ease 0.6s', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)' }}>
              <p className="mt-6 max-w-[85%] md:w-[80%] text-white/80 text-lg mb-10 leading-8">
                AT International is a trusted global supplier, exporter and trading company, connecting buyers and businesses across 40+ countries with quality-verified motorcycle parts, e-bike components, and industrial sealing solutions — sourced from reliable partners and delivered with precision.
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
                onClick={() => onNavigate('Contact Us')}
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
      <section className="bg-white border-b border-[#c5c6cd] py-8">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[
            { icon: 'verified_user',    title: 'Quality-Assured Sourcing', desc: 'All products sourced from ISO 9001:2015 certified partner manufacturers.' },
            { icon: 'public',           title: 'Global Export Network',    desc: 'Supplying industrial buyers in over 40 countries across six continents.' },
            { icon: 'handshake',        title: 'Trusted Trading Partner',  desc: 'Transparent procurement, competitive pricing, and long-term supply reliability.' },
            { icon: 'engineering',      title: 'Technical Sourcing Support', desc: 'Specification guidance, cross-referencing, and custom sourcing for your exact requirements.' },
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
            <p className="text-[#505f76] leading-relaxed mb-5">
              AT International is a trusted global supplier, exporter and trading company, connecting buyers and businesses across 40+ countries with quality-verified motorcycle parts, e-bike components, and industrial sealing solutions. We supply a wide range of motorcycle parts, e-bike components, Valve Stem Seals, O-Rings, Oil Seals, and custom-sourced sealing solutions to procurement teams, distributors, and industrial buyers worldwide.
            </p>
            <p className="text-[#505f76] leading-relaxed mb-5">
              Operating from China, we source exclusively from verified, ISO-certified
              partner manufacturers giving our customers access to quality-assured components
              at competitive international pricing, backed by full documentation and traceability.
            </p>
            <p className="text-[#505f76] leading-relaxed">
              Whether you need standard catalogue items or custom specifications sourced to your drawings,
              our experienced sourcing team manages the entire supply process from inquiry to delivery.
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

      {/* ── CORE SUPPLY DIVISIONS ── */}
      <section className="py-20 max-w-[1440px] mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-extrabold text-[#005691] mb-4 tracking-tight">Core Supply Divisions</h2>
          <p className="text-[#505f76] text-base leading-relaxed">
            Explore our primary export product lines engineered for demanding industrial, automotive, and electric mobility applications worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Industrial Division Card */}
          <div 
            onClick={() => onNavigate('Products#industrial-seals')}
            className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <span className="absolute top-4 left-4 z-10 bg-[#005691] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Industrial Division
                </span>
                <img
                  src="/assets/homepage_3d_bento_industrial.png"
                  alt="Industrial Sealing Solutions"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/industrial-seals.png' }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                  Industrial Sealing Solutions
                </h3>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                  High-performance Valve Stem Seals (FKM/Viton), Fluororubber & NBR O-Rings, and Heavy-Duty Rotary Shaft Oil Seals for hydraulic and engine systems.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Valve Stem Seals', 'O-Rings', 'Oil Seals'].map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 pt-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate('Products#industrial-seals')
                }}
                className="w-full bg-[#005691] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#003e69] transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                Explore Industrial Seals
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Motorcycle Division Card */}
          <div 
            onClick={() => onNavigate('Products#motorcycle')}
            className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <span className="absolute top-4 left-4 z-10 bg-[#FF6B35] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  Motorcycle Division
                </span>
                <img
                  src="/assets/homepage_3d_bento_motorcycle.png"
                  alt="Motorcycle Components & Gaskets"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/moto.png' }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                  Motorcycle Components & Gaskets
                </h3>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                  Precision cylinder blocks, forged pistons, high-coefficient clutch friction plates, crankshaft oil seal kits, and complete engine overhaul gaskets.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Engine Parts', 'Clutch Kits', 'Rubber Seals'].map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 pt-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate('Products#motorcycle')
                }}
                className="w-full bg-[#005691] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#003e69] transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                Explore Motorcycle Division
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* E-Bike Division Card */}
          <div 
            onClick={() => onNavigate('Products#e-bike')}
            className="bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between cursor-pointer group"
          >
            <div>
              <div className="h-64 overflow-hidden relative bg-gray-100">
                <span className="absolute top-4 left-4 z-10 bg-[#10B981] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md">
                  E-Bike Division
                </span>
                <img
                  src="/assets/homepage_3d_bento_ebike.png"
                  alt="E-Bike Powertrain & Battery Seals"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = '/assets/ebike.png' }}
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                  E-Bike Powertrain & Battery Seals
                </h3>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">
                  IP67 mid-drive motor rotary shaft seals, UL94-V0 flame-retardant silicone battery enclosure gaskets, and multi-wire controller grommets.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Motor Seals', 'Battery Gaskets', 'Powertrain'].map((tag) => (
                    <span key={tag} className="text-xs font-semibold px-3 py-1 bg-gray-100 text-gray-700 rounded-lg border border-gray-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-8 pt-0">
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  onNavigate('Products#e-bike')
                }}
                className="w-full bg-[#005691] text-white py-3.5 px-6 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#003e69] transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-md"
              >
                Explore E-Bike Division
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSION & VISION ── */}
      <section className="bg-white py-20">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-[#005691] text-white rounded-2xl p-10 hover:shadow-xl hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl mb-5 block">flag</span>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-white/80 leading-relaxed">
              To simplify global sourcing by connecting businesses with reliable supply partners and providing quality-verified motorcycle parts, e-bike components, and industrial sealing products. We are committed to dependable delivery, transparent service, and efficient sourcing that creates long-term value for businesses worldwide.
            </p>
          </div>
          <div className="bg-[#f2f4f6] border border-[#c5c6cd] rounded-2xl p-10 hover:shadow-xl hover:scale-105 transition-transform duration-500">
            <span className="material-symbols-outlined text-4xl text-[#005691] mb-5 block">visibility</span>
            <h3 className="text-2xl font-bold text-[#005691] mb-4">Our Vision</h3>
            <p className="text-[#505f76] leading-relaxed">
              To become a trusted global sourcing partner for motorcycle, e-bike, and industrial component buyers worldwide — recognized for our reliable supply network, sourcing expertise, product quality, and long-term partnerships across international markets.
            </p>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="py-20 max-w-[1440px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-[#005691] mb-3 text-center">Core Values</h2>
        <p className="text-[#505f76] text-center mb-12">The principles that guide everything we do at AT International.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'verified',      title: 'Quality First',       desc: 'We source only from ISO-certified partner manufacturers. Every shipment includes full material documentation and traceability.' },
            { icon: 'handshake',     title: 'Integrity',           desc: 'Transparent pricing, honest communication, and dependable commitments form the foundation of every customer relationship.' },
            { icon: 'rocket_launch', title: 'Procurement Agility', desc: 'Fast inquiry turnaround, flexible MOQ options, and responsive sourcing that adapts to your production schedules.' },
            { icon: 'groups',        title: 'Customer Focus',      desc: "We listen, understand your application, and source components that match your exact technical and commercial requirements." },
            { icon: 'public',        title: 'Global Reach',        desc: 'From our base in Guangzhou, we manage exports to over 40 countries with experience in customs, Incoterms, and international freight.' },
            { icon: 'eco',           title: 'Responsible Sourcing', desc: 'We prioritize suppliers with strong environmental commitments, RoHS and REACH compliant materials, and responsible supply chains.' },
          ].map((v) => (
            <div key={v.title} className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg hover:bg-white/20 hover:scale-105 transition-transform duration-500">
              <span className="material-symbols-outlined text-[#005691] text-4xl mb-4 block">{v.icon}</span>
              <h4 className="font-bold text-[#005691] text-lg mb-3">{v.title}</h4>
              <p className="text-[#505f76] text-sm leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICAT International.ONS ── */}
      <section className="bg-[#005691] py-10">
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Compliance Standards</h2>
          <p className="text-white/80 mb-12">Products sourced and supplied in compliance with leading international quality and safety standards.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { cert: 'ISO 9001:2015', desc: 'Quality Management System'     },
              { cert: 'RoHS',          desc: 'Hazardous Substance Compliance' },
              { cert: 'REACH',         desc: 'Chemical Safety Regulation'    },
              { cert: 'Quality Verification & Traceability',      desc: ' ATI: Verify Third-Party Inspection Records'   },
            ].map((c) => (
              <div key={c.cert} className="bg-white/10 border border-white/20 rounded-xl p-8 hover:bg-white/20 hover:scale-105 transition-transform duration-500">
                <div className="text-xl font-bold text-white mb-2">{c.cert}</div>
                <div className="text-white/70 text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL REACH ── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden h-80 shadow-lg">
            <img src="/assets/888.jpeg" alt="AT International Supply" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#005691] mb-6">Global Sourcing & Export Capabilities</h2>
            <p className="text-[#505f76] leading-relaxed mb-8">
              From China, we coordinate the full supply chain on your behalf from supplier
              selection and quality verification to export documentation and international delivery.
            </p>
            {[
              { icon: 'check_circle', title: 'Full Documentation',    desc: 'CoC, material data sheets, RoHS and REACH declarations provided with every order.' },
              { icon: 'check_circle', title: 'Flexible Incoterms',    desc: 'EXW, FOB, CFR, CIF and DDP terms available to suit your logistics and import requirements.' },
              { icon: 'check_circle', title: 'Custom Sourcing',       desc: 'We source to your drawings, specifications, and OEM cross-references from our verified supplier network.' },
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
                onClick={() => onNavigate('Contact Us')}
                className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 hover:scale-105 transition-all duration-200"
              >
                Discuss Your Requirements
              </button>
              <button
                onClick={() => onNavigate('Contact Us')}
                className="border border-[#005691] text-[#005691] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 hover:scale-105 transition-all duration-200"
              >
                Submit a Sourcing Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 text-center bg-[#f2f4f6]">
        <h2 className="text-3xl font-bold text-[#005691] mb-4">Ready to Source Smarter?</h2>
        <p className="text-[#505f76] mb-8 max-w-xl mx-auto">
          Submit your product requirements and our sourcing team will respond with a competitive supply proposal within 24 business hours.
        </p>
        <button
          onClick={() => onNavigate('Contact Us')}
          className="bg-[#005691] text-white px-12 py-4 rounded-lg font-semibold text-sm hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-200 inline-flex items-center gap-2 shadow-lg"
        >
          <span className="material-symbols-outlined text-sm">mail</span>
          Contact Our Team
        </button>
      </section>

    </div>
  )
}