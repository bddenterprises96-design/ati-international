export default function WhyATI({ onNavigate }) {
  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero */}
<section className="relative h-[330px] flex items-center overflow-hidden bg-[#005691]">

  {/* Background Image */}
  <div className="absolute inset-0 z-0">
    <img
      src="/assets/why.jpeg"
      alt="Why ATI Background"
      className="w-full h-full object-cover opacity-60"
    />

    {/* Same Gradient Overlay as Homepage */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/60 to-transparent" />
  </div>

  {/* Content */}
  <div className="relative z-10 max-w-[1280px] mx-auto px-8 w-full">
    <div className="max-w-3xl">

      <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">
        Our Advantage
      </span>

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose ATI International?</h1>


      <p className="text-lg text-white/80 mb-10 max-w-xl leading-relaxed">
        Discover the key differentiators that make ATI International the preferred
        sealing solutions partner for manufacturers worldwide.
      </p>

    </div>
  </div>

</section>

      {/* Certifications */}
      <section className="bg-white py-20 ">
        <div className="max-w-[1280px] mx-auto px-8">
          <h2 className="text-3xl font-bold text-[#005691] mb-3 text-center">Certifications</h2>
          <p className="text-[#505f76] text-center mb-12">Internationally recognized compliance across quality, environment, and chemical safety.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { cert: 'ISO 9001:2015', desc: 'Quality Management System' },
              { cert: 'TS 16949', desc: 'Automotive Quality Standard' },
              { cert: 'RoHS Compliant', desc: 'Hazardous Substances Directive' },
              { cert: 'REACH Compliant', desc: 'EU Chemical Safety Regulation' },
            ].map((c) => (
              <div key={c.cert} className="border border-[#005691]/30 rounded-xl p-8 text-center hover:bg-[#005691]/5 transition-colors hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
                <div className="w-12 h-12 bg-[#005691] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-white text-xl">verified</span>
                </div>
                <div className="font-bold text-[#005691] mb-1">{c.cert}</div>
                <div className="text-[#505f76] text-sm">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#005691] py-16">
        <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: '25+', label: 'Years of Experience' },
            { num: '40+', label: 'Export Countries' },
            { num: '0.001mm', label: 'Machining Tolerance' },
            { num: '100%', label: 'Batch Traceability' },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-4xl font-bold text-white mb-2">{s.num}</div>
              <div className="text-white/70 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-[1280px] mx-auto px-8">
        <h2 className="text-3xl font-bold text-[#005691] mb-3 text-center">What Our Clients Say</h2>
        <p className="text-[#505f76] text-center mb-12">Trusted by leading manufacturers and procurement teams around the world.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { quote: 'ATI International has been our preferred seal supplier for 8 years. Consistent quality, reliable lead times, and excellent technical support.', name: 'Procurement Manager', company: 'Tier 1 Automotive, Germany' },
            { quote: 'Their custom O-ring solutions solved a sealing challenge we had struggled with for months. Fast prototyping and great engineering collaboration.', name: 'R&D Engineer', company: 'Industrial OEM, UAE' },
            { quote: 'Competitive pricing, ISO-certified quality, and delivery to our facility in South Africa on schedule every time. Highly recommended.', name: 'Supply Chain Director', company: 'Mining Equipment, South Africa' },
          ].map((t) => (
            <div key={t.company} className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-md transition-shadow hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
              <span className="material-symbols-outlined text-[#005691] text-3xl mb-4 block">format_quote</span>
              <p className="text-[#505f76] text-sm leading-relaxed mb-6 italic">"{t.quote}"</p>
              <div className="font-bold text-[#005691] text-sm">{t.name}</div>
              <div className="text-[#505f76] text-xs">{t.company}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#f2f4f6] text-center">
        <h2 className="text-3xl font-bold text-[#005691] mb-4">Ready to Experience the ATI Difference?</h2>
        <p className="text-[#505f76] mb-8 max-w-xl mx-auto">Get a fast, competitive quote for your sealing requirements — no minimum complexity, no obligation.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => onNavigate('Contact US')}
            className="bg-[#005691] text-white px-12 py-4 rounded-lg font-semibold text-sm hover:brightness-110 transition-all inline-flex items-center gap-2 shadow-lg uppercase tracking-widest "
          >
            <span className="material-symbols-outlined text-sm">request_quote</span>
            Request a Quote
          </button>
          <button
            onClick={() => onNavigate('Products')}
            className="border border-[#005691] text-[#005691] px-12 py-4 rounded-lg font-semibold text-sm hover:bg-[#005691]/5 transition-all inline-flex items-center gap-2 uppercase tracking-widest"
          >
            <span className="material-symbols-outlined text-sm">inventory_2</span>
            View Product Catalog
          </button>
        </div>
      </section>
    </div>
  )
}