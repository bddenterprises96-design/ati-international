export default function WhyATI({ onNavigate }) {
  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page)
    }
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero — PRESERVED EXACTLY AS REQUESTED */}
      <section className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/why.jpeg"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue overlay so text stays readable, matches homepage style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/30" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest">
            Our Advantage
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Why Source Through AT International?</h1>
          <p className="text-white/90 text-base max-w-3xl leading-relaxed">
            AT International is a premier global supplier and trading partner specializing in 3 core export lines: <strong className="text-white underline decoration-white/50">Motorcycle Parts</strong>, <strong className="text-white underline decoration-white/50">E-Bike Parts & Components</strong>, and <strong className="text-white underline decoration-white/50">Industrial Sealing Solutions</strong>.
          </p>
        </div>
      </section>

      {/* ── CORE PRODUCT DIVISIONS WE SUPPLY (CLEAR HIGHLIGHT BAR) ── */}
      <section className="py-16 max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-[#005691] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 mb-3 inline-block">
            Our 3 Dedicated Product Lines
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005691] mb-3">
            What AT International Supplies
          </h2>
          <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
            We are a specialized international supplier and trading channel connecting global distributors and B2B buyers with 3 core component divisions:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Division 1: Motorcycle Parts */}
          <div className="bg-white border-2 border-orange-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#FF6B35] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-orange-50 text-[#FF6B35] rounded-2xl flex items-center justify-center group-hover:bg-[#FF6B35] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">two_wheeler</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FF6B35] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
                  Division 01
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#FF6B35] transition-colors">
                Motorcycle Parts
              </h3>
              <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed mb-6">
                Engine cylinder blocks, forged pistons, high-coefficient clutch friction plates, crankshaft oil seal kits, and complete engine overhaul gasket sets.
              </p>
              <div className="space-y-2.5 mb-8 border-t border-gray-100 pt-4">
                {[
                  'Engine Cylinder & Piston Kits',
                  'Clutch Friction Plates & Assemblies',
                  'Crankshaft & Overhaul Oil Seal Kits',
                  'Complete Engine Head Gaskets'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <span className="material-symbols-outlined text-[#FF6B35] text-base">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavigate('Products#motorcycle')}
              className="w-full bg-[#FF6B35] text-white py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Explore Motorcycle Parts
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* Division 2: E-Bike Parts & Components */}
          <div className="bg-white border-2 border-emerald-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#10B981] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-emerald-50 text-[#10B981] rounded-2xl flex items-center justify-center group-hover:bg-[#10B981] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">electric_bike</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#10B981] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Division 02
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#10B981] transition-colors">
                E-Bike Parts & Components
              </h3>
              <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed mb-6">
                IP67 mid-drive motor rotary shaft seals, UL94-V0 flame-retardant silicone battery enclosure gaskets, and multi-wire controller grommets.
              </p>
              <div className="space-y-2.5 mb-8 border-t border-gray-100 pt-4">
                {[
                  'Mid-Drive Motor Rotary Shaft Seals (IP67)',
                  'Silicone Battery Pack Enclosure Gaskets',
                  'Multi-Wire Controller Sealing Grommets',
                  'Powertrain & Hub Seals'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <span className="material-symbols-outlined text-[#10B981] text-base">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavigate('Products#e-bike')}
              className="w-full bg-[#10B981] text-white py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Explore E-Bike Parts
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>

          {/* Division 3: Industrial Sealing Solutions */}
          <div className="bg-white border-2 border-blue-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:border-[#005691] transition-all duration-300 flex flex-col justify-between group">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 bg-blue-50 text-[#005691] rounded-2xl flex items-center justify-center group-hover:bg-[#005691] group-hover:text-white transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-3xl">precision_manufacturing</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#005691] bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Division 03
                </span>
              </div>
              <h3 className="text-2xl font-bold text-[#005691] mb-3 group-hover:text-[#003e69] transition-colors">
                Industrial Sealing Solutions
              </h3>
              <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed mb-6">
                High-performance Valve Stem Seals (FKM/Viton), Fluororubber & NBR O-Rings, and Heavy-Duty Rotary Shaft Oil Seals for hydraulic and engine systems.
              </p>
              <div className="space-y-2.5 mb-8 border-t border-gray-100 pt-4">
                {[
                  'FKM / Viton Valve Stem Seals',
                  'Precision Fluororubber & NBR O-Rings',
                  'Heavy-Duty Rotary Shaft Oil Seals',
                  'Custom Spec Molded Rubber Seals'
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-xs text-gray-700 font-medium">
                    <span className="material-symbols-outlined text-[#005691] text-base">check_circle</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => handleNavigate('Products#industrial-seals')}
              className="w-full bg-[#005691] text-white py-3.5 px-5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#003e69] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              Explore Industrial Seals
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── END-TO-END SUPPLY CHAIN WORKFLOW (6 STAGES) ── */}
      <section className="bg-white py-16 border-y border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#005691] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 mb-3 inline-block">
              End-to-End Supply Chain Value
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#005691] mb-3">
              Our 6-Step Global Supply Chain Workflow
            </h2>
            <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
              AT International seamlessly manages your entire cross-border procurement process from supplier verification to final destination delivery:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {[
              {
                step: '01',
                title: 'Verified Supplier Network',
                desc: 'Access ISO-certified partner factories across China verified for technical compliance.',
                icon: 'verified'
              },
              {
                step: '02',
                title: 'Sourcing Support',
                desc: 'CAD drawing reviews, 14-day sample production, and custom spec sourcing.',
                icon: 'engineering'
              },
              {
                step: '03',
                title: 'Quality Verification',
                desc: 'Pre-shipment audit, dimensional checks, MTC material testing & inspection.',
                icon: 'fact_check'
              },
              {
                step: '04',
                title: 'Documentation',
                desc: 'Complete B/L, Certificates of Origin (Form A/E), RoHS/REACH & Invoices.',
                icon: 'description'
              },
              {
                step: '05',
                title: 'Logistics',
                desc: 'Container consolidation (LCL/FCL) with flexible FOB, CIF, or DDP terms.',
                icon: 'local_shipping'
              },
              {
                step: '06',
                title: 'Delivery',
                desc: 'Dependable, on-time global cargo dispatch to 40+ destinations worldwide.',
                icon: 'mark_email_read'
              },
            ].map((s, idx) => (
              <div key={s.step} className="relative bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl p-5 hover:border-[#005691] hover:bg-blue-50/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-black text-[#005691] bg-blue-100 px-2 py-0.5 rounded-md">
                      {s.step}
                    </span>
                    <span className="material-symbols-outlined text-[#005691] text-2xl group-hover:scale-110 transition-transform">
                      {s.icon}
                    </span>
                  </div>
                  <h4 className="font-bold text-[#005691] text-sm mb-2 leading-snug">
                    {s.title}
                  </h4>
                  <p className="text-[#505f76] text-[11px] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
                {idx < 5 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-[#005691]">
                    <span className="material-symbols-outlined text-base">chevron_right</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEY DIFFERENTIATORS: WHAT SETS US APART ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#005691] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full border border-blue-100 mb-3 inline-block">
            Global Supply Advantage
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005691] mb-4">What Sets Us Apart</h2>
          <p className="text-[#505f76] text-base leading-relaxed">
            As a dedicated international supplier and trading partner based in China, AT International streamlines cross-border procurement for global distributors, wholesalers, and industrial buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: 'public',
              badge: 'Sourcing Network',
              title: 'Direct Supplier & Trading Network',
              desc: 'Access a verified network of ISO-certified manufacturing facilities across China. We simplify international procurement by acting as your single, reliable supply and quality channel.',
            },
            {
              icon: 'verified_user',
              badge: 'Quality Control',
              title: 'ISO 9001:2015 & Pre-Shipment Inspection',
              desc: 'Partner manufacturers perform the required inspections/testing, while AT International manages supplier verification, reviews quality records and inspection reports, and coordinates quality documentation before shipment.',
            },
            {
              icon: 'local_shipping',
              badge: 'Export Logistics',
              title: 'Consolidated Container & Freight Logistics',
              desc: 'Operating from major shipping hubs in China. We consolidate multi-category orders into single LCL or FCL container shipments with flexible FOB, CIF, or DDP terms to 40+ countries.',
            },
            {
              icon: 'build',
              badge: 'Custom Sourcing',
              title: 'Custom CAD & Spec Sourcing in 14 Days',
              desc: 'Beyond standard catalog offerings, we coordinate custom-source products to your 2D/3D technical drawings or physical samples, sample production, and first-article approvals.',
            },
            {
              icon: 'inventory_2',
              badge: 'Supply Chain',
              title: 'Flexible MOQs & Inventory Programs',
              desc: 'We support competitive minimum order quantities (MOQs) for regional distributors, mixed-item orders, and Vendor Managed Inventory (VMI) agreements that keep your stock fluid.',
            },
            {
              icon: 'support_agent',
              badge: 'Dedicated Desk',
              title: '24-Hour B2B Proposal Commitment',
              desc: 'Our export team in China reviews your technical inquiries, BOMs, and RFQs, providing comprehensive pricing, material specifications, and delivery lead times within 24 business hours.',
            },
            {
              icon: 'gavel',
              badge: 'Compliance',
              title: 'International Regulatory & Chemical Safety',
              desc: 'AT International sources products with applicable RoHS/REACH documentation and compliance declarations through qualified suppliers, where applicable.',
            },
            {
              icon: 'fact_check',
              badge: 'Inspection Desk',
              title: 'Multi-Tier Factory Audits & Testing',
              desc: 'We perform on-site factory audits, raw material chemical checks, and pre-dispatch zero-defect testing to guarantee that every shipment strictly matches client technical specifications.',
            },
            {
              icon: 'package_2',
              badge: 'Custom Packaging',
              title: 'OEM Private Labeling & Export Packaging',
              desc: 'We provide complete private label branding, customized inner box packaging, automated barcoding, and heavy-duty export crating designed for safe international transport.',
            },
            {
              icon: 'assignment_ind',
              badge: 'Personal Service',
              title: 'Dedicated Single Point of Contact',
              desc: 'Every client is paired with a dedicated sourcing manager in China who manages product quotes, order tracking, quality inspection reports, and logistics from start to finish.',
            },
            {
              icon: 'description',
              badge: 'Export Docs',
              title: 'Complete Export Documentation & Customs',
              desc: 'We prepare all required export documentation including Bills of Lading (B/L), Certificates of Origin (Form A, Form E, CO), Commercial Invoices, and Packing Lists for fast customs release.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white border border-[#c5c6cd] rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-[#005691] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-[#005691]/10 text-[#005691] rounded-xl flex items-center justify-center group-hover:bg-[#005691] group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#005691] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-bold text-[#005691] text-base mb-2.5 leading-snug group-hover:text-[#003e69]">
                  {item.title}
                </h3>
                <p className="text-[#505f76] text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS & COMPLIANCE BAR ── */}
      <section className="bg-white py-16 border-y border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#005691] mb-2">Quality & Compliance Assurance</h2>
            <p className="text-[#505f76] text-xs sm:text-sm">Globally recognized standards governing our supply operations and partner factories.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { cert: 'ISO 9001:2015', desc: 'Quality Management System', icon: 'verified' },
              { cert: '100% Pre-Shipment Inspection', desc: 'Batch Traceability & Reports', icon: 'fact_check' },
              { cert: 'RoHS 3 Compliant', desc: 'Hazardous Substance Directive', icon: 'eco' },
              { cert: 'REACH Compliant', desc: 'Global Chemical Safety', icon: 'gavel' },
            ].map((c) => (
              <div key={c.cert} className="border border-[#005691]/25 rounded-2xl p-6 text-center hover:bg-blue-50/50 hover:border-[#005691] transition-all hover:-translate-y-0.5 duration-200">
                <div className="w-12 h-12 bg-[#005691] text-white rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-md">
                  <span className="material-symbols-outlined text-2xl">{c.icon}</span>
                </div>
                <div className="font-bold text-[#005691] text-sm mb-1">{c.cert}</div>
                <div className="text-[#505f76] text-xs">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#005691] py-16">
        <div className="max-w-[1280px] mx-auto px-6 sm:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '25+',    label: 'Years of Global Trading Experience' },
            { num: '40+',    label: 'Export Destinations Worldwide' },
            { num: '200+',   label: 'Verified Manufacturing Partners' },
            { num: '100%',   label: 'Batch Traceability & Inspection' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1.5">{s.num}</div>
              <div className="text-white/80 text-xs sm:text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW WE WORK WITH YOU (4 COMMITMENT CARDS) ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#005691] uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-100 mb-3 inline-block">
            Our Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#005691] mb-3">
            How We Work With You
          </h2>
          <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
            A simple, transparent process from your first inquiry to final delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Share Your Requirement',
              desc: 'Send us your product specs, drawings, or quantity needs — no minimum complexity.',
              icon: 'assignment_add',
            },
            {
              step: '02',
              title: 'Get a Transparent Quote',
              desc: 'Receive clear pricing and lead times within 24 business hours, no hidden costs.',
              icon: 'request_quote',
            },
            {
              step: '03',
              title: 'Quality-Verified Sourcing',
              desc: 'We coordinate with ISO-certified partner manufacturers and share documentation on request.',
              icon: 'fact_check',
            },
            {
              step: '04',
              title: 'Reliable Global Delivery',
              desc: 'Consolidated shipping and full export documentation to 40+ countries.',
              icon: 'local_shipping',
            },
          ].map((item) => (
            <div
              key={item.step}
              className="bg-white border border-[#c5c6cd] rounded-2xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-[#005691] hover:-translate-y-1 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-blue-50 text-[#005691] rounded-xl flex items-center justify-center group-hover:bg-[#005691] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-xs font-black text-[#005691] bg-blue-100/70 px-2.5 py-1 rounded-md">
                    Step {item.step}
                  </span>
                </div>
                <h3 className="font-bold text-[#005691] text-lg mb-3 leading-snug group-hover:text-[#003e69]">
                  {item.title}
                </h3>
                <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-16 bg-[#f2f4f6] text-center border-t border-[#c5c6cd]">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-[#005691] mb-4">Ready to Simplify Your Global Sourcing?</h2>
          <p className="text-[#505f76] text-sm mb-8 leading-relaxed">
            Partner with AT International for reliable supplier network access, pre-shipment quality assurance, and consolidated container delivery.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleNavigate('Contact Us')}
              className="bg-[#005691] text-white px-8 py-3.5 rounded-xl font-bold text-xs hover:bg-[#003e69] transition-all inline-flex items-center gap-2 shadow-lg uppercase tracking-widest hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">request_quote</span>
              Request Sourcing Proposal
            </button>
            <button
              onClick={() => handleNavigate('Products')}
              className="border-2 border-[#005691] text-[#005691] px-8 py-3.5 rounded-xl font-bold text-xs hover:bg-[#005691] hover:text-white transition-all inline-flex items-center gap-2 uppercase tracking-widest hover:scale-105 active:scale-95 duration-200 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">inventory_2</span>
              Explore Product Catalog
            </button>
          </div>
        </div>
      </section>

    </div>
  )
}