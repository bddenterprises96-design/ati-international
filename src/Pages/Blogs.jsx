import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

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
    author: 'AT International Insights',
    icon: 'science',
    image: '/assets/blog_valve_stem_seal_materials.png',
    summary: 'Valve stem seals are subjected to demanding engine conditions, high operational temperatures, continuous mechanical friction, and engine oils. Selecting the correct elastomeric material helps optimize engine oil consumption, valve guide protection, and long-term seal performance.',
    sections: [
      {
        heading: '1. Introduction to Valve Stem Seal Elastomers',
        text: 'In internal combustion engines, valve stem seals regulate lubricant flow between the valve stem and valve guide. Choosing the right compound helps manage oil flow while ensuring sufficient lubrication to maintain engine operating efficiency.',
      },
      {
        heading: '2. Material Comparison: FKM vs VMQ vs NBR',
        table: {
          headers: ['Property', 'FKM (Fluoroelastomer)', 'VMQ (Silicone Rubber)', 'NBR (Nitrile Rubber)'],
          rows: [
            ['Continuous Temp Range', '-20°C to +200°C (peak +230°C)', '-60°C to +225°C', '-40°C to +120°C'],
            ['Oil & Chemical Resistance', 'Outstanding (Synthetic & Bio-oils)', 'Moderate (Application dependent)', 'Good in standard oils'],
            ['Compression Set Resistance', 'Excellent at high temperatures', 'Good at high temperatures', 'Moderate at high temps'],
            ['Wear & Abrasion Resistance', 'High', 'Moderate to Low', 'High'],
            ['Primary Application', 'High-performance automotive & motorcycle engines', 'Specialized thermal cycling valve trains', 'Standard duty engines & low-temp sealing'],
          ],
        },
      },
      {
        heading: '3. FKM: High-Performance Sealing for Demanding Applications',
        text: 'FKM fluoroelastomers offer strong resistance to modern synthetic lubricants and high operating temperatures. For motorcycle and automotive engine applications, FKM valve stem seals maintain flexibility and lip tension under continuous thermal exposure.',
      },
      {
        heading: '4. Selection Recommendations for Procurement Managers',
        list: [
          'For High RPM & Turbocharged Applications: Consider FKM (Viton® grade) with stainless steel garter spring.',
          'For Extreme Thermal Cycling: Consider VMQ Silicone seals with reinforced steel retaining jackets.',
          'For Standard Replacement / Economy Applications: NBR provides cost-effective sealing within standard temperature limits.',
        ],
      },
    ],
  },
  {
    id: 2,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Engine Sealing: Key Failure Points & Sourcing Standards',
    excerpt: 'High RPM vibrations, rapid thermal cycles, and oil pressure fluctuations place intense demands on motorcycle engine seals. Here is how ATI sources reliable replacement and component sealing parts through verified supplier partners.',
    date: 'May 12, 2026',
    readTime: '7 min read',
    author: 'ATI Motorcycle Sourcing Team',
    icon: 'two_wheeler',
    image: '/assets/motorcycle_engine_sealing.png',
    summary: 'Motorcycle engines can operate under demanding RPM, temperature, vibration, and lubrication conditions. Reliable sealing across cylinder heads, crankcases, valve stems, and transmission shafts is important for preventing oil leakage and maintaining component performance.',
    sections: [
      {
        heading: '1. The Unique Sealing Demands of Motorcycle Powertrains',
        text: 'Whether supplying parts for popular commuter, touring, and performance motorcycle models, replacement components must withstand demanding operating conditions, high oil pressure peaks, and rapid heat dissipation.',
      },
      {
        heading: '2. Top 4 Motorcycle Engine Sealing Failure Modes',
        list: [
          'Valve Stem Lip Hardening: Caused by excessive exhaust heat leading to blue exhaust smoke and elevated oil consumption.',
          'Crankshaft Oil Seal Extrusion: Caused by blow-by pressure build-up and improper shaft surface hardness.',
          'Cylinder Head Gasket Blowby: Resulting from thermal warping or poor torque retention of sub-standard gasket composite layers.',
          'Clutch Cover O-Ring Compression Set: Hardening due to repeated exposure to hot engine oil and clutch friction debris.',
        ],
      },
      {
        heading: '3. ATI Sourcing & Quality Review for Motorcycle Parts',
        text: 'ATI sources motorcycle sealing kits and engine components through trusted supplier partners. Product specifications, dimensions, materials, and applicable quality requirements are reviewed according to customer and sourcing requirements before supply.',
      },
    ],
  },
  {
    id: 3,
    featured: false,
    category: 'E-Bike Powertrain',
    title: 'Waterproofing E-Bike Motors: Sealing Mid-Drive & Hub Systems to IP Standards',
    excerpt: 'Electric bicycles can operate in rain, mud, and water-splash conditions, making effective sealing important for protecting motors and other sensitive components. Learn how rotary shaft seals, O-rings, gaskets, and other sealing solutions can help protect mid-drive and hub motor systems from moisture and contamination.',
    date: 'April 28, 2026',
    readTime: '5 min read',
    author: 'E-Bike Powertrain Engineering Desk',
    icon: 'electric_bike',
    image: '/assets/ebike_motor_sealing.png',
    summary: 'Electric bike drive units combine electric motors, reduction gearboxes, and electronic controllers into compact housings. Water or dust ingress can impact electrical insulation and cause premature bearing or component wear.',
    sections: [
      {
        heading: '1. Ingress Protection (IP) Requirements for E-Bike Motors',
        text: 'E-bike drive systems may require different levels of ingress protection depending on their design, application, and operating environment. Where higher protection is required, sealing must be carefully considered at critical points such as the drive shaft exit, housing interfaces, and cable entry points.',
      },
      {
        heading: '2. Specialized Sealing Solutions for Mid-Drive & Hub Motors',
        list: [
          'Double-Lip PTFE Radial Shaft Seals: Protect rotating pedal and motor shafts against low-friction water ingress without creating excessive drag.',
          'Low-Closure Force Silicone Gaskets: Ensure watertight sealing on die-cast aluminum motor casings without warping thin cover walls.',
          'Overmolded Rubber Cable Grommets: Seal power and sensor wiring looms against high-pressure water spray during bike cleaning.',
        ],
      },
      {
        heading: '3. Material Selection for E-Bike Sealing',
        text: 'Material selection depends on temperature, moisture exposure, chemical compatibility, friction, compression, and other application requirements. Depending on the operating conditions, materials such as silicone, FKM (Viton®), EPDM, or PTFE-based solutions may be considered through our supplier network. Final material and sealing performance should be confirmed against the specific application and supplier/product data.',
      },
    ],
  },
  {
    id: 4,
    featured: false,
    category: 'Technical',
    title: 'O-Ring Failure Analysis: Common Causes and How to Prevent Them',
    excerpt: 'From compression set and extrusion to spiral failure and chemical attack, learn how to identify O-ring failure modes early and evaluate suitable material compounds to eliminate them.',
    date: 'April 18, 2026',
    readTime: '8 min read',
    author: 'AT International Insights',
    icon: 'build',
    image: '/assets/blog_oring_analysis.png',
    summary: 'O-Rings are simple in design yet critical in performance. A failed O-ring can halt hydraulic machinery, cause fluid leaks, or lead to equipment downtime. Understanding root causes is key to prevention.',
    sections: [
      {
        heading: '1. Compression Set',
        text: 'Occurs when an elastomer loses its elasticity after prolonged compression under heat, leaving flat surfaces on the ring cross-section. Prevention: Evaluate high-grade FKM or peroxide-cured EPDM with superior compression set resistance.',
      },
      {
        heading: '2. High-Pressure Extrusion & Nibbling',
        text: 'Under high system pressure, rubber material is forced into the clearance gap between metal mating parts, tearing the ring edges. Prevention: Install PTFE back-up rings or select higher Shore A hardness O-rings.',
      },
      {
        heading: '3. Chemical Swelling & Degradation',
        text: 'Incompatible chemical exposure causes the O-ring to absorb fluid, swell, and lose mechanical strength. Prevention: Verify chemical compatibility charts before specifying NBR, Viton®, EPDM, or FFKM.',
      },
      {
        heading: '4. Explosive Decompression & Spiral Failure',
        text: 'Common in high-pressure gas or dynamic hydraulic applications. Rapid pressure drops cause trapped gas inside the rubber matrix to expand. Prevention: Specify Explosive Decompression Resistant (EDR/AED) fluoroelastomers.',
      },
    ],
  },
  {
    id: 5,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Sourcing High-Performance Motorcycle Clutch & Transmission Components',
    excerpt: 'A comprehensive buyer guide on evaluating friction plate materials, steel drive plates, clutch springs, and gear shaft oil seals for motorcycle assembly and spare parts distribution.',
    date: 'April 02, 2026',
    readTime: '6 min read',
    author: 'ATI Motorcycle Sourcing Team',
    icon: 'settings_bipolar',
    image: '/assets/motorcycle_clutch_parts.png',
    summary: 'The motorcycle clutch transmits engine torque to the transmission under continuous sliding friction, operating heat, and oil immersion. High-quality friction plates and seals help prevent slippage and support smooth gear engagement.',
    sections: [
      {
        heading: '1. Paper-Based vs Cork vs Heavy-Duty Friction Plates',
        text: 'Different motorcycle segments require specialized friction lining materials. Paper-composite friction plates deliver smooth engagement and long life in commuter motorcycles, while reinforced friction plates cater to higher-performance applications.',
      },
      {
        heading: '2. Essential Drivetrain Sealing Components',
        list: [
          'Countershaft Oil Seals: Designed to withstand dirt, chain fling, and shaft rotation under radial load.',
          'Gear Shift Shaft Seals: Help prevent oil weeping along the gear lever stem.',
          'Clutch Pushrod Seals: Retain crankcase lubricant where the actuator rod enters the engine casing.',
        ],
      },
      {
        heading: '3. Complete Sourcing Solutions from ATI',
        text: 'ATI sources motorcycle clutch assembly kits, replacement friction plate sets, oil seals, and related components through trusted supplier partners. Products can be supplied according to distributor requirements, including suitable packaging and private-label options where available.',
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
    author: 'AT International Insights',
    icon: 'battery_charging_full',
    image: '/assets/ebike_battery_sealing.png',
    summary: 'The lithium-ion battery pack is a central component on an electric bicycle. Moisture ingress into battery enclosures can lead to electrical short circuits, BMS failure, or thermal issues.',
    sections: [
      {
        heading: '1. Challenges in Battery Enclosure Sealing',
        text: 'Battery casings experience thermal expansion during charging and rapid cooling in outdoor riding conditions. Seals must accommodate dimensional expansion while maintaining the moisture barrier.',
      },
      {
        heading: '2. Gasket Compound Selection: EPDM Foam vs Liquid Silicone Gaskets',
        list: [
          'Closed-Cell EPDM Foam Gaskets: Excellent compression recovery, cost-effective, and strong resistance to weather exposure.',
          'Liquid Silicone Rubber (LSR) Molded Gaskets: Superior temperature stability, precise fit, and flame retardancy options.',
          'Pressure Relief Vents: Equalize internal air pressure during thermal cycles while helping block liquid water.',
        ],
      },
    ],
  },
  {
    id: 7,
    featured: false,
    category: 'Technical',
    title: 'Rotary Oil Seal Selection for Heavy-Duty Gearboxes & Pumps',
    excerpt: 'Selecting radial shaft oil seals with hydrodynamic wave lips, garter spring tensions, and auxiliary dust lips for industrial and automotive equipment.',
    date: 'March 15, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'cached',
    image: '/assets/rotary_oil_seals.png',
    summary: 'Rotary shaft seals retain lubricating oils and greases while excluding ambient dust, dirt, and water in rotating equipment. Selecting the right lip design and material compound helps prevent shaft wear and fluid leaks.',
    sections: [
      {
        heading: '1. Hydrodynamic Wave Lip Seals',
        text: 'Wave lip oil seals feature a sine wave lip geometry that pumps oil back into the lubricant reservoir during shaft rotation, helping reduce friction temperatures compared to standard straight lips.',
      },
      {
        heading: '2. Single Lip vs Double Lip Profiles',
        text: 'Single-lip seals are used for primary lubricant retention in clean environments. Double-lip seals incorporate a secondary dust lip to exclude contaminants in agricultural, motorcycle, and industrial machinery.',
      },
    ],
  },
  {
    id: 8,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Global Sealing & Parts Market Trends 2026: Supply Chain Insights',
    excerpt: 'Supply chain shifts, raw material volatility, changing compliance requirements, and the growth of electric powertrains are reshaping global sourcing. Here are key procurement trends buyers should understand when planning international parts supply.',
    date: 'March 01, 2026',
    readTime: '5 min read',
    author: 'AT International Insights',
    icon: 'trending_up',
    image: '/assets/blog_market_trends.png',
    summary: 'As global demand for industrial, motorcycle, and e-bike components evolves across major markets, procurement teams face changing lead times, material costs, supplier risks, and compliance requirements. Understanding these trends can help buyers plan sourcing strategies and manage supply more effectively.',
    sections: [
      {
        heading: '1. Key Industry Drivers in 2026',
        list: [
          'Growth of Electric Powertrains: The expansion of e-bikes and other electric mobility applications is increasing demand for application-specific sealing, gasket, and component solutions. Material selection depends on temperature, moisture, chemical exposure, friction, and other operating conditions.',
          'Evolving REACH & RoHS Requirements: Buyers increasingly need greater visibility into restricted substances, declarations, and supporting compliance documentation when sourcing components for regulated markets.',
          'Supplier Consolidation: Buyers are increasingly looking for reliable sourcing partners who can coordinate multiple product categories—such as sealing products, motorcycle parts, e-bike components, and other industrial products—through one supply network.',
        ],
      },
      {
        heading: '2. How ATI Helps Buyers Manage Procurement Risks',
        text: 'ATI helps buyers manage procurement risks by coordinating suitable supplier options, supporting supplier communication, reviewing available quality and product documentation, and coordinating international shipment requirements. Where applicable, multiple supplier options, inventory planning, and shipment tracking can be discussed according to product and order requirements.',
      },
    ],
  },
  {
    id: 9,
    featured: false,
    category: 'Quality & Compliance',
    title: 'What ISO 9001:2015 & REACH Compliance Mean for Sourcing Partners',
    excerpt: 'Understanding quality management systems, material test reports (MTR), PPAP documentation, and chemical compliance for industrial, motorcycle, and e-bike components.',
    date: 'February 18, 2026',
    readTime: '5 min read',
    author: 'AT International Insights',
    icon: 'verified',
    image: '/assets/blog_iso_compliance.png',
    summary: 'A well-implemented quality management system helps organizations establish consistent processes for supplier quality, material verification, production controls, traceability, and corrective actions. For sourcing partners, reviewing relevant quality documentation can provide greater visibility into supplier capabilities and product requirements.',
    sections: [
      {
        heading: '1. Key Elements of Supplier Quality Verification',
        list: [
          'Rheometer & Compound Testing: Depending on the supplier and product requirements, relevant testing may include rubber cure characteristics, hardness, and other material properties. ATI can review available supplier test records and material documentation as part of the sourcing and quality review process.',
          'Automated Visual & Dimensional Inspection: Depending on the supplier, product, and agreed quality requirements, automated or manual inspection may be used to identify dimensional variations, surface defects, and other quality issues.',
          'PPAP Documentation: Where required by the customer or applicable to the project, PPAP documentation may include dimensional results, material test reports, control plans, and other production approval records. ATI coordinates the collection and review of applicable supplier documentation.',
        ],
      },
      {
        heading: '2. REACH & RoHS Compliance',
        text: 'Depending on the product, market, and customer requirements, ATI can coordinate relevant REACH and RoHS declarations or compliance documentation through its supplier network. Customers with specific regulatory requirements can share them with our sourcing team so the appropriate documentation can be reviewed before supply. Relevant restricted substances and chemical requirements should be assessed according to the applicable regulation, product, material, and market. Supporting supplier declarations or test documentation can be reviewed where available and required.',
      },
    ],
  },
  {
    id: 10,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Exporting Industrial, Motorcycle & E-Bike Components: AT International Logistics Playbook',
    excerpt: 'How ATI coordinates international export logistics from China to global customers, including documentation, Incoterms 2020, shipment planning, transit considerations, and customs requirements.',
    date: 'February 04, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'local_shipping',
    image: '/assets/blog_export_logistics.png',
    summary: 'International component sourcing involves coordination between suppliers, documentation, freight arrangements, customs requirements, and delivery schedules. ATI helps simplify this process by coordinating with supplier and logistics partners and supporting customers with the documentation and shipping requirements relevant to their orders.',
    sections: [
      {
        heading: '1. Navigating Incoterms 2020: EXW, FOB, CFR, CIF & DDP',
        text: 'ATI can support commonly used Incoterms such as EXW, FOB, CFR, CIF, and DDP, depending on the product, destination, shipment requirements, and agreed commercial terms. We coordinate FOB shipments through agreed Chinese ports to align with buyer freight arrangements.',
      },
      {
        heading: '2. Consolidated Container Shipments',
        text: 'Where order volumes and product requirements allow, buyers can consolidate industrial sealing products, motorcycle parts, e-bike components, and other compatible products into LCL or FCL shipments. Consolidation can help optimize freight utilization and simplify shipment coordination.',
      },
      {
        heading: '3. What Buyers Should Prepare for International Sourcing',
        text: 'Before requesting an international shipment, buyers should provide product specifications, required quantities, destination details, preferred Incoterms, packaging requirements, and any applicable documentation or compliance requirements. Clear information helps suppliers and logistics partners coordinate quotations and shipment planning more efficiently.',
      },
    ],
  },
  {
    id: 11,
    featured: false,
    category: 'Technical',
    title: 'Custom Component Sourcing: From Drawing to First Article',
    excerpt: 'Learn how ATI coordinates custom sourcing from drawing review and supplier communication to sample evaluation and first-article verification.',
    date: 'January 20, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'design_services',
    image: '/assets/blog_custom_seal_design.png',
    summary: 'Standard catalog parts do not always meet specialized engineering demands. When you need custom cross-sections, non-standard dimensions, or specific material formulations, ATI facilitates custom sourcing through qualified manufacturing partners.',
    sections: [
      {
        heading: '1. Step 1: Technical Review & Application Analysis',
        text: 'Our sourcing team reviews your 2D/3D CAD drawings (STEP, DWG, PDF), checking groove dimensions, compression requirements, fluid contact, and operating temperature parameters with supplier engineers.',
      },
      {
        heading: '2. Step 2: Tooling Coordination & Compound Formulation',
        text: 'Coordination of prototype tooling and material compound preparation tailored to your required hardness (Shore A) and performance criteria through verified supplier factories.',
      },
      {
        heading: '3. Step 3: Sample Verification & First Article Review',
        text: 'Production of initial sample batches, complete with dimensional inspection records and available material test certificates for client review and testing prior to volume production.',
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
              <h4 className="font-bold text-lg mb-1">Planning Your Next International Shipment?</h4>
              <p className="text-xs sm:text-sm text-white/80">Share your product requirements, quantities, destination, and preferred shipping terms with ATI, and our team can help coordinate suitable sourcing and logistics options.</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white text-[#005691] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 whitespace-nowrap transition-all shadow-md cursor-pointer"
            >
              Discuss Your Requirements
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
  useEffect(() => {
    document.title = 'Blogs & News | AT International'
  }, [])

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
      const templateParams = {
        from_name: 'Newsletter Subscriber',
        to_name: 'AT International',
        reply_to: emailInput,
        user_email: emailInput,
        message: `New Technical Insights Newsletter subscription from: ${emailInput}`,
        title: `Newsletter Subscription: ${emailInput}`
      }

      emailjs.send(
        'service_hrbqaj9',
        'template_l94ixmr',
        templateParams,
        'l9K4E835PGcGZMP2Z'
      ).catch((err) => console.error('EmailJS Newsletter Error:', err))

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
          backgroundImage: 'url(/assets/blogs_hero_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/85 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest backdrop-blur-sm">
            Technical & Sourcing Knowledge Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            AT International Insights
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            Practical technical guides, motorcycle and e-bike component insights, quality standards, and procurement knowledge from our China sourcing team.
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
              Get practical sourcing insights, motorcycle and e-bike component updates, quality guidance, and global procurement news delivered monthly.
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
