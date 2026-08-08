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
          <p className="text-white/80 text-base max-w-2xl">
            Discover what makes AT International the preferred global sourcing & trading partner for procurement teams, distributors and industrial buyers worldwide.
          </p>
        </div>
      </section>

      {/* ── KEY DIFFERENTIATORS: WHAT SETS US APART (12 SUPPLIER & TRADING FOCUSED BOXES) ── */}
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
              desc: 'Every product order undergoes rigorous pre-shipment quality audits, dimensional verification, and material testing, accompanied by Material Test Certificates (MTC) and full batch traceability.',
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
              desc: 'Beyond standard catalog offerings, we custom-source products to your 2D/3D technical drawings or physical samples, managing tooling design, sample production, and first-article approvals.',
            },
            {
              icon: 'payments',
              badge: 'Commercial Terms',
              title: 'Factory-Direct Pricing & Commercial Value',
              desc: 'Leverage ATI’s combined purchasing volume and direct factory relationships in China to secure tier-1 commercial pricing, eliminating unnecessary middleman markups for B2B buyers.',
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
              desc: 'All supplied products comply with strict international quality, chemical safety, and environmental standards (REACH & RoHS 3), ensuring hassle-free customs clearance in worldwide markets.',
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

      {/* ── CLIENT TESTIMONIALS ── */}
      <section className="py-20 max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-[#005691] mb-2">What Our B2B Clients Say</h2>
          <p className="text-[#505f76] text-xs sm:text-sm">Trusted by regional distributors, importers, and procurement buyers around the globe.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              quote: 'ATI has been our reliable trading and supply partner for over three years. Product quality is consistently verified, pricing is competitive, and container shipments always arrive on schedule. Their team in China makes international sourcing seamless.',
              name: 'Procurement Director',
              company: 'Industrial Supply Distributor, Bangladesh',
              rating: 5
            },
            {
              quote: 'Their custom CAD sourcing desk solved a complex product specification challenge for us. Fast sample turnarounds in 14 days and flawless engineering collaboration saved our procurement schedule.',
              name: 'Sourcing Manager',
              company: 'Equipment & Hardware Importer, UAE',
              rating: 5
            },
            {
              quote: 'ATI is our preferred supplier for international trading and volume components. Their consistent quality control, flexible MOQs, and dependable container shipping help us maintain an efficient supply chain.',
              name: 'Purchasing Manager',
              company: 'Regional Wholesale Distributor, Indonesia',
              rating: 5
            },
          ].map((t) => (
            <div key={t.company} className="bg-white border border-[#c5c6cd] rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <span className="material-symbols-outlined text-[#005691] text-3xl mb-3 block">format_quote</span>
                <p className="text-[#505f76] text-xs leading-relaxed mb-6 italic">"{t.quote}"</p>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <div className="flex gap-1 mb-2 text-yellow-400 text-sm">
                  ★★★★★
                </div>
                <div className="font-bold text-[#005691] text-xs">{t.name}</div>
                <div className="text-[#505f76] text-[11px]">{t.company}</div>
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