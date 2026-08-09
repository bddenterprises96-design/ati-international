import { useState, useEffect } from 'react'

// Inject Cloudinary transformations for fast delivery (auto format, auto quality, width-capped)
const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return url
  return url.replace('/upload/', '/upload/w_600,q_auto,f_auto/')
}

// Card image with skeleton shimmer + fade-in on load
function BlogImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const optimized = optimizeCloudinaryUrl(src)

  return (
    <div className="relative w-full h-full bg-[#f2f4f6] overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8edf2] via-[#f2f4f6] to-[#e8edf2] animate-pulse" />
      )}
      {!error ? (
        <img
          src={optimized}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-cover group-hover:scale-105 transition-all duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#005691]/10 text-[#005691]">
          <span className="material-symbols-outlined text-5xl">article</span>
        </div>
      )}
    </div>
  )
}

const POSTS = [
  {
    id: 1,
    featured: true,
    category: 'Technical',
    title: 'Understanding Valve Stem Seal Materials: FKM vs VMQ vs NBR',
    excerpt: 'A deep-dive into the three most common elastomers used in valve stem seals comparing thermal resistance, chemical compatibility, and long-term durability across real engine environments.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    author: 'ATI Polymer & Materials Engineering Team',
    icon: 'science',
    image: '/assets/blog_valve_stem_seal_materials.png',
    summary: 'Valve stem seals are subjected to severe engine conditions, high operational temperatures, continuous mechanical friction, and aggressive synthetic engine oils. Selecting the correct elastomeric material determines engine oil consumption, valve guide wear, and long-term seal reliability.',
    sections: [
      {
        heading: '1. Introduction to Valve Stem Seal Elastomers',
        text: 'In internal combustion engines, valve stem seals regulate lubricant flow between the valve stem and valve guide. Choosing the right compound prevents excess oil from leaking into the combustion chamber while ensuring sufficient lubrication to avoid valve seizure.',
      },
      {
        heading: '2. Material Comparison: FKM (Viton) vs VMQ (Silicone) vs NBR (Nitrile)',
        table: {
          headers: ['Property', 'FKM (Fluoroelastomer / Viton)', 'VMQ (Silicone Rubber)', 'NBR (Nitrile Butadiene Rubber)'],
          rows: [
            ['Continuous Temp Range', '-20°C to +200°C (peak +230°C)', '-60°C to +225°C', '-40°C to +120°C'],
            ['Oil & Additive Resistance', 'Outstanding (Synthetic & Bio-oils)', 'Moderate (Attacked by acidic oils)', 'Good in mineral oil, fair in synthetics'],
            ['Compression Set Resistance', 'Excellent at high temperatures', 'Good at high temperatures', 'Moderate at high temps'],
            ['Wear & Abrasion Resistance', 'High', 'Moderate to Low', 'High'],
            ['Primary Application', 'High-performance automotive & motorcycle engines', 'Extreme cold/heat specialized valve train', 'Standard duty engines & low-temp sealing'],
          ],
        },
      },
      {
        heading: '3. FKM (Viton): The Gold Standard for Modern Engines',
        text: 'FKM fluoroelastomers offer unparalleled resistance to modern synthetic lubricants containing aggressive friction modifiers and detergent packages. For motorcycle high-RPM engines and heavy-duty automotive engines, FKM valve stem seals maintain lip flexibility and spring tension over 100,000+ kilometers.',
      },
      {
        heading: '4. Selection Recommendations for Procurement Managers',
        list: [
          'For High RPM Motorcycles & Turbo Automotive Engines: Specify FKM (Viton-75 Shore A) with stainless steel garter spring.',
          'For Extreme Thermal Cycling: Consider VMQ Silicone seals with reinforced steel retaining jackets.',
          'For Budget OEM Replacement / Economy Engines: NBR-70 provides cost-effective performance under standard temperature limits.',
        ],
      },
    ],
  },
  {
    id: 2,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Engine Sealing: Key Failure Points & OEM Sourcing Standards',
    excerpt: 'High RPM vibrations, rapid thermal cycles, and oil pressure fluctuations place intense demands on motorcycle engine seals. Here is how ATI sources high-durability replacement and OEM sealing parts.',
    date: 'May 12, 2026',
    readTime: '7 min read',
    author: 'ATI Motorcycle Sourcing Specialist',
    icon: 'two_wheeler',
    image: '/assets/motorcycle_engine_sealing.png',
    summary: 'Motorcycle engines operate at significantly higher RPMs and operating temperatures than conventional automotive engines. Reliable sealing across cylinder heads, crankcases, valve stems, and transmission shafts is essential to prevent power loss and oil leaks.',
    sections: [
      {
        heading: '1. The Unique Sealing Demands of Motorcycle Powertrains',
        text: 'Whether supplying parts for Honda, Yamaha, Kawasaki, Suzuki, Bajaj, or TVS motorcycles, replacement components must withstand up to 14,000 RPM continuous operation, high oil pressure peaks, and rapid heat dissipation.',
      },
      {
        heading: '2. Top 4 Motorcycle Engine Sealing Failure Modes',
        list: [
          'Valve Stem Lip Hardening: Caused by excessive exhaust heat leading to blue exhaust smoke and high oil consumption.',
          'Crankshaft Oil Seal Extrusion: Caused by blow-by pressure build-up and improper shaft surface hardness.',
          'Cylinder Head Gasket Blowby: Resulting from thermal warping or poor torque retention of sub-standard gasket composite layers.',
          'Clutch Cover O-Ring Compression Set: Hardening due to repeated exposure to hot engine oil and clutch friction debris.',
        ],
      },
      {
        heading: '3. ATI Sourcing & Quality Standards for Motorcycle Parts',
        text: 'All ATI motorcycle sealing kits and engine spare parts are manufactured to strict OEM dimensional tolerances. We provide comprehensive kit packaging options for aftermarket distributors, including full engine overhaul gasket sets, valve stem seal pairs, and oil seal packages.',
      },
    ],
  },
  {
    id: 3,
    featured: false,
    category: 'E-Bike Powertrain',
    title: 'Waterproofing E-Bike Motors: Sealing Mid-Drive & Hub Systems to IP67/IP68',
    excerpt: 'Electric bicycles operate in rain, mud, and water splash conditions. Learn how specialized rotary oil seals and custom O-rings protect Bafang, Bosch, and Shimano e-bike motors.',
    date: 'April 28, 2026',
    readTime: '5 min read',
    author: 'E-Bike Powertrain Engineering Desk',
    icon: 'electric_bike',
    image: '/assets/ebike_motor_sealing.png',
    summary: 'Electric bike drive units combine high-speed electric motors, reduction gearboxes, and sensitive electronic controllers into compact housings. Water or dust ingress can ruin electrical insulation, corrode copper windings, and cause premature bearing failure.',
    sections: [
      {
        heading: '1. Ingress Protection (IP) Requirements for E-Bike Motors',
        text: 'Modern e-bike drive systems demand IP65 to IP68 rating. Achieving this requires precision sealing at three critical junctions: the drive shaft exit, housing split lines, and cable entry grommets.',
      },
      {
        heading: '2. Specialized Sealing Solutions for Mid-Drive & Hub Motors',
        list: [
          'Double-Lip PTFE Radial Shaft Seals: Protect rotating pedal and motor shafts against low-friction water ingress without creating drag that drains battery range.',
          'Low-Closure Force Silicone Gaskets: Ensure watertight sealing on die-cast aluminum motor casings without warping thin cover walls.',
          'Overmolded Rubber Cable Grommets: Seal power and sensor wiring looms against high-pressure water spray during bike cleaning.',
        ],
      },
      {
        heading: '3. Materials Engineered for EV Efficiency',
        text: 'ATI supplies e-bike manufacturers with friction-optimized Fluorosilicone and Viton seals engineered to minimize torque loss while maintaining IP68 water tightness across 20,000+ operating kilometers.',
      },
    ],
  },
  {
    id: 4,
    featured: false,
    category: 'Technical',
    title: 'O-Ring Failure Analysis: The 7 Most Common Causes and How to Prevent Them',
    excerpt: 'From compression set and extrusion to spiral failure and chemical attack, learn how to identify O-ring failure modes early and select the correct material compounds to eliminate them.',
    date: 'April 18, 2026',
    readTime: '8 min read',
    author: 'ATI Technical Quality Division',
    icon: 'build',
    image: '/assets/blog_oring_analysis.png',
    summary: 'O-Rings are simple in design yet critical in performance. A single failed O-ring can halt hydraulic machinery, cause industrial fluid leaks, or lead to costly equipment downtime. Understanding root causes is key to prevention.',
    sections: [
      {
        heading: '1. Compression Set',
        text: 'Occurs when an elastomer loses its elasticity after prolonged compression under heat, leaving flat surfaces on the ring cross-section. Prevention: Upgrade to high-grade FKM or peroxide-cured EPDM with superior compression set resistance.',
      },
      {
        heading: '2. High-Pressure Extrusion & Nibbling',
        text: 'Under high system pressure, rubber material is forced into the clearance gap between metal mating parts, tearing the ring edges. Prevention: Install hard PTFE back-up rings or select 90 Shore A hardness O-rings.',
      },
      {
        heading: '3. Chemical Swelling & Degradation',
        text: 'Incompatible chemical exposure causes the O-ring to absorb fluid, swell significantly, and lose mechanical strength. Prevention: Verify chemical compatibility charts before specifying NBR, Viton, EPDM, or FFKM.',
      },
      {
        heading: '4. Explosive Decompression & Spiral Failure',
        text: 'Common in high-pressure gas or dynamic hydraulic applications. Rapid pressure drops cause trapped gas inside the rubber matrix to expand explosively. Prevention: Specify Explosive Decompression Resistant (EDR/AED) fluoroelastomers.',
      },
    ],
  },
  {
    id: 5,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Sourcing High-Performance Motorcycle Clutch & Transmission Components',
    excerpt: 'A comprehensive buyer’s guide on evaluating friction plate materials, steel drive plates, clutch springs, and gear shaft oil seals for motorcycle assembly and spare parts distribution.',
    date: 'April 02, 2026',
    readTime: '6 min read',
    author: 'Automotive & Drivetrain Sourcing Group',
    icon: 'settings_bipolar',
    image: '/assets/motorcycle_clutch_parts.png',
    summary: 'The motorcycle clutch transmits engine torque to the transmission under continuous sliding friction, extreme heat, and oil immersion. High-quality friction plates and seals prevent slippage and deliver smooth gear engagement.',
    sections: [
      {
        heading: '1. Paper-Based vs Cork vs Kevlar Friction Plates',
        text: 'Different motorcycle segments require specialized friction lining materials. Paper-composite friction plates deliver smooth engagement and long life in commuter motorcycles, while Kevlar-reinforced and carbon-friction plates cater to high-performance sportbikes.',
      },
      {
        heading: '2. Essential Drivetrain Sealing Components',
        list: [
          'Countershaft Oil Seals: Must withstand dirt, chain fling, and shaft rotation under high radial load.',
          'Gear Shift Shaft Seals: Prevent slow oil weeping along the gear lever stem.',
          'Clutch Pushrod Seals: Retain crankcase lubricant where the actuator rod enters the engine casing.',
        ],
      },
      {
        heading: '3. Complete Sourcing Solutions from ATI',
        text: 'ATI supplies full motorcycle clutch assembly kits, replacement friction plate sets, and complete rubber oil seal sets packaged to distributor specifications with private label options.',
      },
    ],
  },
  {
    id: 6,
    featured: false,
    category: 'E-Bike Powertrain',
    title: 'E-Bike Lithium Battery Pack Housings: Thermal Management & Moisture Sealing',
    excerpt: 'How custom-molded silicone gaskets, EPDM foam seals, and moisture vents protect lithium battery cells against water intrusion, vibration, and thermal expansion.',
    date: 'March 22, 2026',
    readTime: '6 min read',
    author: 'EV Battery & Sealing Solutions Team',
    icon: 'battery_charging_full',
    image: '/assets/ebike_battery_sealing.png',
    summary: 'The lithium-ion battery pack is the single most valuable component on an electric bicycle. Moisture ingress into 36V, 48V, or 52V battery packs can lead to short circuits, BMS failure, and hazardous thermal events.',
    sections: [
      {
        heading: '1. Challenges in Battery Enclosure Sealing',
        text: 'Battery casings experience thermal expansion during charging and rapid cooling in outdoor riding conditions. Seals must accommodate dimensional expansion without breaking the moisture barrier.',
      },
      {
        heading: '2. Gasket Compound Selection: EPDM Foam vs Liquid Silicone Gaskets',
        list: [
          'Closed-Cell EPDM Foam Gaskets: Excellent compression recovery, low cost, and outstanding resistance to rain and UV exposure.',
          'Liquid Silicone Rubber (LSR) Molded Gaskets: Superior temperature stability (-50°C to +200°C), precise dimensional fit, and long-term flame retardancy (UL 94 V-0 options).',
          'Pressure Relief & Gore Membrane Vents: Equalize internal air pressure during thermal cycles while blocking liquid water.',
        ],
      },
    ],
  },
  {
    id: 7,
    featured: false,
    category: 'Technical',
    title: 'Rotary Oil Seal Selection for Heavy-Duty Gearboxes & Pumps',
    excerpt: 'Selecting radial shaft oil seals with hydrodynamic wave lips, garter spring tensions, and auxiliary dust lips for extreme industrial and automotive applications.',
    date: 'March 15, 2026',
    readTime: '7 min read',
    author: 'Fluid Power & Sealing Specialist',
    icon: 'cached',
    image: '/assets/rotary_oil_seals.png',
    summary: 'Rotary shaft seals retain lubricating oils and greases while excluding ambient dust, dirt, and water in rotating equipment. Selecting the right lip design and material compound prevents shaft wear and fluid leaks.',
    sections: [
      {
        heading: '1. Hydrodynamic Wave Lip Seals',
        text: 'Wave lip oil seals feature a bi-directional sine wave lip geometry that pumps oil back into the lubricant reservoir during shaft rotation. This design reduces friction temperature by up to 30% compared to standard straight lips.',
      },
      {
        heading: '2. Single Lip vs Double Lip (TC / TB / TA Profiles)',
        text: 'Single-lip (SC/SB) oil seals are used for primary lubricant retention in clean environments. Double-lip (TC/TB) seals incorporate a secondary dust lip to exclude heavy contaminants in agricultural, motorcycle, and industrial machinery.',
      },
    ],
  },
  {
    id: 8,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Global Sealing & Parts Market Trends 2026: Supply Chain Insights',
    excerpt: 'Supply chain shifts, raw material volatility, and the expansion of electric powertrains are reshaping global industrial sourcing. Here is what procurement teams need to know.',
    date: 'March 01, 2026',
    readTime: '5 min read',
    author: 'ATI Global Supply Intelligence Desk',
    icon: 'trending_up',
    image: '/assets/blog_market_trends.png',
    summary: 'As global manufacturing demand accelerates across North America, Europe, the Middle East, and Asia-Pacific, procurement managers face changing lead times, raw material pricing dynamics, and stricter compliance rules.',
    sections: [
      {
        heading: '1. Key Industry Drivers in 2026',
        list: [
          'Shift to EV & Hybrid Powertrains: Growing demand for high-grade Fluorosilicone and low-friction PTFE seals.',
          'RoHS 3 & REACH SVHC Expansion: Stricter regulation on chemical plasticizers and heavy metals in rubber compounds.',
          'Consolidation of Supply Chain Partners: Buyers seeking unified sourcing partners capable of supplying seals, motorcycle spare parts, and e-bike hardware together.',
        ],
      },
      {
        heading: '2. How ATI Mitigates Procurement Risks',
        text: 'ATI leverages dual-sourcing partner networks in China, maintains safety stock reserves, and offers transparent freight tracking to ensure uninterrupted supply lines for our international clients.',
      },
    ],
  },
  {
    id: 9,
    featured: false,
    category: 'Quality & Compliance',
    title: 'What ISO 9001:2015 & REACH Compliance Mean for Sourcing Partners',
    excerpt: 'Understanding quality management systems, material test reports (MTR), PPAP documentation, and chemical compliance for industrial and automotive components.',
    date: 'February 18, 2026',
    readTime: '5 min read',
    author: 'Quality Management System Auditor',
    icon: 'verified',
    image: '/assets/blog_iso_compliance.png',
    summary: 'ISO certification is far more than a certificate on a wall. A genuinely implemented QMS guarantees incoming raw material inspection, precise vulcanization process controls, 100% batch traceability, and formal corrective action protocols.',
    sections: [
      {
        heading: '1. Key Pillars of ATI Quality Assurance',
        list: [
          'Rheometer & Compound Vulcanization Testing: Verifying rubber cure curves and hardness on every raw material batch.',
          '100% Optical Automated Inspection: Automated vision sorting systems eliminate dimensional outliers and surface flash.',
          'PPAP Level 3 Documentation: Production Part Approval Process documentation including dimensional results, material test reports, and control plans.',
        ],
      },
      {
        heading: '2. REACH & RoHS 3 Environmental Compliance',
        text: 'All sealing products, motorcycle components, and e-bike parts supplied by ATI comply strictly with EU REACH Regulations and RoHS 3 directives, free from restricted phthalates, heavy metals, and polycyclic aromatic hydrocarbons (PAHs).',
      },
    ],
  },
  {
    id: 10,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Exporting Industrial & Automotive Components: ATI\'s Logistics Playbook',
    excerpt: 'How ATI manages end-to-end export logistics from Guangzhou to 40+ countries covering documentation, Incoterms 2020 (FOB, CIF, DDP), transit times, and customs clearance.',
    date: 'February 04, 2026',
    readTime: '6 min read',
    author: 'Guangzhou Logistics Operations Desk',
    icon: 'local_shipping',
    image: '/assets/blog_export_logistics.png',
    summary: 'Exporting manufactured goods requires seamless coordination between factory schedules, container loading, customs documentation, and international shipping lines. ATI handles the entire process to make global sourcing hassle-free.',
    sections: [
      {
        heading: '1. Navigating Incoterms 2020: FOB vs CIF vs DDP',
        text: 'We support flexible trade terms tailored to your logistics capabilities: EXW for buyers with local freight forwarders, FOB Guangzhou/Shenzhen for standard sea freight, CIF for port delivery, and DDP for hassle-free door-to-door delivery with customs duties paid.',
      },
      {
        heading: '2. Consolidated Container Shipments',
        text: 'Combine industrial sealing products, motorcycle engine spare parts, and e-bike hardware into single consolidated container loads (LCL / FCL), maximizing freight cost efficiency and simplifying import clearance.',
      },
    ],
  },
  {
    id: 11,
    featured: false,
    category: 'Technical',
    title: 'Custom Seal & Component Design: From Drawing to First Article in 14 Days',
    excerpt: 'Walk through ATI\'s rapid custom sourcing process: drawing review, mold design, sample vulcanization, and first article inspection report (FAIR).',
    date: 'January 20, 2026',
    readTime: '7 min read',
    author: 'ATI Custom Tooling & Prototyping Group',
    icon: 'design_services',
    image: '/assets/blog_custom_seal_design.png',
    summary: 'Standard off-the-shelf catalog parts don\'t always meet specialized engineering demands. When you need custom cross-sections, non-standard dimensions, or proprietary elastomer formulations, ATI delivers rapid custom prototyping.',
    sections: [
      {
        heading: '1. Step 1: CAD Drawing & Application Analysis (Days 1–3)',
        text: 'Our engineering team reviews your 2D/3D CAD drawings (STEP, DWG, PDF), checking groove dimensions, compression percentages, fluid contact, and operating temperatures.',
      },
      {
        heading: '2. Step 2: Precision Mold Tooling & Compound Mixing (Days 4–9)',
        text: 'CNC machining of multi-cavity prototype steel molds and custom elastomer compound mixing tailored to your hardness (Shore A) and color requirements.',
      },
      {
        heading: '3. Step 3: Sample Vulcanization & First Article Inspection (Days 10–14)',
        text: 'Production of initial sample batches, complete with optical CMM dimensional inspection reports and material test certificates shipped via express courier for immediate client testing.',
      },
    ],
  },
]

const CATEGORIES = [
  'All',
  'Technical',
  'Motorcycle Parts',
  'E-Bike Powertrain',
  'Quality & Compliance',
  'Logistics & Sourcing',
]

const CATEGORY_COLORS = {
  Technical: 'bg-blue-100 text-blue-700 border-blue-200',
  'Motorcycle Parts': 'bg-orange-100 text-orange-700 border-orange-200',
  'E-Bike Powertrain': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Quality & Compliance': 'bg-purple-100 text-purple-700 border-purple-200',
  'Logistics & Sourcing': 'bg-amber-100 text-amber-700 border-amber-200',
}

// ── FULL ARTICLE DETAIL MODAL ──────────────────────────────────────
function ArticleModal({ post, onClose, onSelectPost }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!post) return null

  const related = POSTS.filter((p) => p.id !== post.id && (p.category === post.category || p.category === 'Technical')).slice(0, 3)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-modalFade"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header Bar */}
        <div className="bg-[#005691] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_COLORS[post.category] || 'bg-white/20 text-white border-white/30'}`}>
              {post.category}
            </span>
            <span className="text-xs text-white/80 hidden sm:inline">• {post.readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300"
            title="Close Article"
          >
            <span className="material-symbols-outlined text-white text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#005691] leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#505f76] pb-4 border-b border-gray-200">
              <span className="font-semibold text-[#005691]">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="h-64 sm:h-80 rounded-xl overflow-hidden shadow-md">
            <BlogImage src={post.image} alt={post.title} />
          </div>

          {/* Summary Callout Box */}
          {post.summary && (
            <div className="bg-[#f0f6fa] border-l-4 border-[#005691] p-5 rounded-r-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#005691] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">lightbulb</span> Executive Summary
              </h4>
              <p className="text-sm text-[#334155] leading-relaxed italic">{post.summary}</p>
            </div>
          )}

          {/* Article Sections */}
          <div className="space-y-6 text-[#334155]">
            {post.sections &&
              post.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl font-bold text-[#005691] pt-2">{sec.heading}</h3>
                  {sec.text && <p className="text-sm sm:text-base leading-relaxed">{sec.text}</p>}

                  {/* List items if present */}
                  {sec.list && (
                    <ul className="space-y-2.5 my-3 pl-2">
                      {sec.list.map((li, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base">
                          <span className="material-symbols-outlined text-[#005691] text-base mt-1 flex-shrink-0">check_circle</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Table if present */}
                  {sec.table && (
                    <div className="overflow-x-auto my-4 border border-gray-200 rounded-xl">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#005691] text-white">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-semibold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {sec.table.rows.map((r, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              {r.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-3 text-[#505f76] ${cIdx === 0 ? 'font-semibold text-[#005691]' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* CTA Box inside modal */}
          <div className="bg-gradient-to-r from-[#005691] to-[#003d66] text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-1">Need Sourcing or Technical Support?</h4>
              <p className="text-xs sm:text-sm text-white/80">Connect with ATI's engineering team for custom samples, drawings, or volume quotes.</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white text-[#005691] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 whitespace-nowrap transition-all shadow-md"
            >
              Contact Engineering
            </button>
          </div>

          {/* Related Articles Section */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-bold text-lg text-[#005691] mb-4">Related Technical Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rPost) => (
                  <div
                    key={rPost.id}
                    onClick={() => onSelectPost(rPost)}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md cursor-pointer transition-all hover:border-[#005691] group bg-white"
                  >
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 ${CATEGORY_COLORS[rPost.category]}`}>
                      {rPost.category}
                    </span>
                    <h4 className="font-bold text-xs text-[#005691] line-clamp-2 group-hover:underline mb-2">{rPost.title}</h4>
                    <p className="text-[11px] text-[#505f76] line-clamp-2">{rPost.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#f7f9fb] border-t border-gray-200 px-6 py-4 flex items-center justify-between text-xs text-[#505f76] flex-shrink-0">
          <span>AT International Knowledge Center</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005691] text-white rounded-lg font-semibold text-xs hover:bg-[#004270] transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const featuredPost = POSTS.find((p) => p.featured) || POSTS[0]

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (emailInput.trim()) {
      setSubscribed(true)
      setEmailInput('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen">
      {/* Detail Modal */}
      {selectedPost && (
        <ArticleModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSelectPost={(post) => setSelectedPost(post)}
        />
      )}

      {/* Hero Section */}
      <section
        className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden"
        style={{
          backgroundImage: 'url(https://res.cloudinary.com/ybne3lvu/image/upload/v1784457971/wwe_siixmw.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/85 to-[#005691]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest backdrop-blur-sm">
            Technical & Sourcing Knowledge Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            AT International Insights
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            Engineering breakdowns, technical guides, motorcycle spare parts standards, e-bike sealing innovations, and global procurement insights from our China sourcing desk.
          </p>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <div className="bg-white border-b border-[#c5c6cd] sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between gap-4 py-3 overflow-x-auto scrollbar-none">
          <div className="flex gap-2 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#005691] text-white shadow-md'
                    : 'text-[#505f76] hover:bg-[#f2f4f6] hover:text-[#005691]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#505f76] font-medium hidden md:inline whitespace-nowrap">
            Showing {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-8 py-14">
        {/* Featured Article Banner (Show only when on 'All' category and no search active) */}
        {activeCategory === 'All' && !searchQuery && featuredPost && (
          <div className="mb-14 bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 h-64 lg:h-auto overflow-hidden relative">
              <BlogImage src={featuredPost.image} alt={featuredPost.title} />
              <span className="absolute top-4 left-4 bg-[#005691] text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow">
                Featured Article
              </span>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_COLORS[featuredPost.category]}`}>
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-[#505f76]">{featuredPost.readTime}</span>
                </div>

                <h2
                  onClick={() => setSelectedPost(featuredPost)}
                  className="text-2xl font-bold text-[#005691] hover:underline cursor-pointer leading-snug mb-3"
                >
                  {featuredPost.title}
                </h2>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">{featuredPost.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-[#505f76]">
                  <span className="font-semibold text-[#005691]">{featuredPost.author}</span> • {featuredPost.date}
                </div>
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="bg-[#005691] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#004270] transition-all flex items-center gap-1.5 group-hover:gap-2 shadow"
                >
                  Read Full Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#005691]">
              {activeCategory === 'All' ? 'Latest Technical Articles' : `${activeCategory} Articles`}
            </h2>
            <p className="text-xs sm:text-sm text-[#505f76] mt-1">
              Curated technical specs and sourcing guides for procurement managers and engineering teams.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="h-48 bg-[#005691]/10 overflow-hidden relative">
                  <BlogImage src={post.image} alt={post.title} />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[#505f76] font-medium">{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-[#005691] text-base leading-snug mb-2 group-hover:text-[#003d66] group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <span className="text-[#505f76]">{post.date}</span>
                <span className="text-[#005691] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Results State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <span className="material-symbols-outlined text-[#c5c6cd] text-6xl mb-3 block">article_off</span>
            <h3 className="text-lg font-bold text-[#005691] mb-1">No articles found</h3>
            <p className="text-sm text-[#505f76] mb-6">
              We couldn't find any articles matching "{searchQuery}" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All')
                setSearchQuery('')
              }}
              className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#004270] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#005691] via-[#00487a] to-[#00365c] text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl mb-3 text-white/90">mark_email_unread</span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">NEWSLETTER</h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Get technical compound guides, motorcycle & e-bike part updates, and global freight insights sent straight to your inbox monthly.
            </p>

            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-400 text-white p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> Thank you! You have successfully subscribed to ATI Technical Insights.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your work email address"
                  className="flex-1 px-4 py-3 rounded-xl text-sm text-[#191c1e] bg-white outline-none focus:ring-2 focus:ring-white shadow"
                />
                <button
                  type="submit"
                  className="bg-white text-[#005691] px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all whitespace-nowrap shadow cursor-pointer hover:scale-105 active:scale-95 duration-200"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
