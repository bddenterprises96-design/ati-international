import { useState, useEffect } from 'react'

const FAQS = [
  {
    category: 'Products & Specifications',
    items: [
      {
        q: 'What types of sealing products does ATI supply?',
        a: 'ATI supplies Valve Stem Seals, O-Rings, Oil Seals (rotary shaft seals), and custom sealing components. Beyond sealing products, AT International also sources and supplies motorcycle parts, e-bike components, accessories, and other industrial products through our trusted supplier network. All products are sourced from our network of verified, ISO-certified partner manufacturers. We cover a wide range of elastomeric materials including FKM (Viton), NBR, EPDM, Silicone (VMQ), PTFE, and FFKM.',
      },
      {
        q: 'Does ATI supply products beyond sealing components?',
        a: 'Yes. As a global trading company, supplier, and exporter, ATI sources and supplies a wide range of motorcycle parts, e-bike components, accessories, and other industrial products beyond our core sealing product line through our trusted supplier network and ISO-certified partner manufacturers.',
      },
      {
        q: 'Can ATI source seals to my custom dimensions and drawings?',
        a: 'Yes. ATI coordinates custom sourcing based on your drawings, specifications, samples, and application requirements. Share your DXF, PDF, STEP, or other technical information with our sourcing team, and we will coordinate with suitable partner suppliers to develop samples for your approval.',
      },
      {
        q: 'What are the maximum operating temperatures for your seals?',
        a: 'Operating temperature depends on the specific material compound, formulation, grade, and application. Share your operating conditions with our sourcing team and we can help identify suitable material options through our supplier network.',
      },
      {
        q: 'Do you provide material certifications and test reports?',
        a: 'Yes. Full material traceability is available including Certificate of Conformance (CoC), material data sheets (MDS) and ROHS/REACH compliance declarations. These are provided with every order on request.',
      },
    ],
  },
  {
    category: 'Ordering & MOQ',
    items: [
      {
        q: 'What is the Minimum Order Quantity (MOQ)?',
        a: 'MOQ varies by product, specification, material, and sourcing requirements. Share your required quantity with our team and we will confirm the applicable MOQ and commercial terms.',
      },
      {
        q: 'Can I order samples before placing a bulk order?',
        a: 'Sample availability and charges depend on the product and sourcing requirements. Our team will confirm sample costs and lead times before proceeding.',
      },
      {
        q: 'How do I submit a procurement inquiry?',
        a: 'Use our Contact Us page to submit a Procurement Inquiry Form, or reach us directly via WhatsApp or WeChat. Provide your product type, quantity, dimensions, material preference, and delivery destination our team will respond with a proposal within 24 business hours.',
      },
    ],
  },
  {
    category: 'Quality & Certification',
    items: [
      {
        q: 'Is AT International ISO certified?',
        a: 'All partner manufacturers in our supply network hold ISO 9001:2015 certification. We verify supplier quality systems as part of our sourcing process and can provide material certifications and traceability records with every order. We also supply products compliant with RoHS and REACH regulations.',
      },
      {
        q: 'What quality control processes do you use?',
        a: 'Quality checks are carried out through our verified supplier network according to the product and customer requirements. Depending on the application, inspections may include dimensional checks, material verification, hardness testing, visual inspection, and other relevant tests. AT International reviews available quality records and inspection documentation before shipment to help ensure the supplied products meet the agreed specifications.',
      },
      {
        q: 'Can you match competitor part numbers?',
        a: 'Yes. We maintain an extensive OEM and aftermarket cross-reference database. Provide us with the original part number, brand, or application details and our team will identify the matching ATI specification or source an equivalent.',
      },
    ],
  },
  {
    category: 'Shipping & Logistics',
    items: [
      {
        q: 'Which countries does ATI export to?',
        a: 'We currently export to over 40 countries across Asia, the Middle East, Europe, Africa, and the Americas. We have established logistics partnerships and experience with customs documentation for all major markets.',
      },
      {
        q: 'What Incoterms do you offer?',
        a: 'We offer EXW, FOB Guangzhou, CFR, CIF, and DDP depending on destination and order volume. For repeat customers, we can arrange freight on preferred carriers or integrate with your existing logistics provider.',
      },
      {
        q: 'What are typical lead times for bulk orders?',
        a: 'Standard catalogue items typically follow shorter sourcing and delivery timelines, while custom-sourced products may require additional time for supplier coordination, sampling, approval, and production. Lead times depend on the product, specifications, quantity, and destination and will be confirmed with your quotation.',
      },
      {
        q: 'Is ATI a manufacturer or a trading company?',
        a: 'AT International is a global sourcing, trading, supply, and export company. We work with verified manufacturing partners to source and supply motorcycle parts, e-bike components, industrial sealing products, and other components according to customer requirements. Our role is to simplify procurement, coordinate with suitable suppliers, and manage the supply process from sourcing through export for customers worldwide.',
      },
    ],
  },
]

export default function FAQs({ onNavigate }) {
  useEffect(() => {
    document.title = "FAQ's | AT International"
  }, [])

  const [open, setOpen] = useState(null)

  const toggle = (key) => setOpen(open === key ? null : key)

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero */}
      <section className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/fll.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue overlay so text stays readable, matches homepage style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691]/100 via-[#005691]/65 to-[#005691]/10" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest">
            Support
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Frequently Asked Questions</h1>
          <p className="text-white/80 text-base max-w-2xl">
            Answers to common questions from global buyers, distributors, procurement teams, and sourcing partners.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        {FAQS.map((section) => (
          <div key={section.category} className="mb-12">
            <h2 className="text-xl font-bold text-[#005691] mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#005691] block" />
              {section.category}
            </h2>
            <div className="flex flex-col gap-3">
              {section.items.map((item, i) => {
                const key = `${section.category}-${i}`
                const isOpen = open === key
                return (
                  <div key={key} className={`bg-white border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-[#005691] shadow-md' : 'border-[#c5c6cd]'}`}>
                    <button
                      onClick={() => toggle(key)}
                      className="w-full text-left px-8 py-5 flex items-center justify-between gap-4"
                    >
                      <span className={`font-semibold text-sm leading-snug ${isOpen ? 'text-[#005691]' : 'text-[#191c1e]'}`}>{item.q}</span>
                      <span className={`material-symbols-outlined text-[#005691] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}>expand_more</span>
                    </button>
                    {isOpen && (
                      <div className="px-8 pb-6 border-t border-[#c5c6cd]">
                        <p className="text-[#505f76] text-sm leading-relaxed pt-4">{item.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Still Have Questions */}
        <div className="bg-[#005691] text-white rounded-2xl p-10 text-center mt-8">
          <span className="material-symbols-outlined text-4xl mb-4 block">help</span>
          <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
          <p className="text-white/80 mb-8 max-w-md mx-auto">Our sourcing team is available Mon–Sat to help with your product requirements, specifications, and procurement needs.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/8618523210975"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Us
            </a>
            <button 
            onClick={() => onNavigate('Contact Us')}
            className="bg-white text-[#005691] px-8 py-3 rounded-lg font-semibold text-sm hover:brightness-105 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span>
              Email Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}