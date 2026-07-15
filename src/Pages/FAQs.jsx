import { useState } from 'react'

const FAQS = [
  {
    category: 'Products & Specifications',
    items: [
      {
        q: 'What types of sealing products does ATI International manufacture?',
        a: 'ATI International manufactures Valve Stem Seals, O-Rings, Oil Seals (rotary shaft seals), and custom-engineered sealing components. We cover a wide range of elastomeric materials including FKM (Viton), NBR, EPDM, Silicone (VMQ), PTFE, and FFKM.',
      },
      {
        q: 'Can ATI manufacture seals to my custom dimensions and drawings?',
        a: 'Yes. We have a dedicated custom manufacturing division. Submit your technical drawings (DXF, PDF, or STEP format), material requirements, and application details — our engineering team will review your design, provide DFM feedback, and produce first article samples within 7–14 business days.',
      },
      {
        q: 'What are the maximum operating temperatures for your seals?',
        a: 'It depends on the material. NBR: -40°C to +120°C. FKM (Viton): -20°C to +200°C. Silicone (VMQ): -60°C to +230°C. PTFE-based: -60°C to +260°C. FFKM: up to +300°C. We recommend sharing your full application details so we can recommend the optimal material.',
      },
      {
        q: 'Do you provide material certifications and test reports?',
        a: 'Yes. Full material traceability is available including Certificate of Conformance (CoC), material data sheets (MDS), PPAP documentation, and ROHS/REACH compliance declarations. These are provided with every order on request.',
      },
    ],
  },
  {
    category: 'Ordering & MOQ',
    items: [
      {
        q: 'What is the Minimum Order Quantity (MOQ)?',
        a: 'MOQ varies by product. For standard O-Rings: 2,000–5,000 units. For Valve Stem Seals: 5,000–10,000 units. For Oil Seals: 500–2,000 units. For custom components, MOQ is discussed during the engineering review. We also offer VMI and consignment programs for high-volume customers.',
      },
      {
        q: 'Can I order samples before placing a bulk order?',
        a: 'Absolutely. We encourage sample qualification before bulk production. Sample orders are processed within 7–14 business days. Sample costs are typically refunded against the first production order above MOQ.',
      },
      {
        q: 'How do I submit a procurement inquiry?',
        a: 'Use our Contact US page to submit a Procurement Inquiry Form, or reach us directly via WhatsApp or WeChat. Provide your product type, quantity, dimensions, material preference, and delivery destination — our team will respond with a proposal within 24 business hours.',
      },
    ],
  },
  {
    category: 'Quality & Certification',
    items: [
      {
        q: 'Is ATI International ISO certified?',
        a: 'Yes. ATI International is ISO 9001:2015 certified. Our quality management system covers raw material sourcing, in-process inspection, final QC, and packaging. We also comply with TS 16949 (automotive), RoHS, and REACH regulations.',
      },
      {
        q: 'What quality control processes do you use?',
        a: 'Every batch goes through dimensional inspection (CMM and optical comparators), hardness testing (Shore A/D), material verification (FTIR spectroscopy), and visual inspection. We use AQL sampling plans and can provide 100% inspection for critical applications on request.',
      },
      {
        q: 'Can you match competitor part numbers?',
        a: 'Yes. We maintain an extensive OEM and aftermarket cross-reference database. Provide us with the original part number, brand, or application details and our team will identify the matching ATI specification or engineer an equivalent.',
      },
    ],
  },
  {
    category: 'Shipping & Logistics',
    items: [
      {
        q: 'Which countries does ATI International export to?',
        a: 'We currently export to over 40 countries across Asia, the Middle East, Europe, Africa, and the Americas. We have established logistics partnerships and experience with customs documentation for all major markets.',
      },
      {
        q: 'What Incoterms do you offer?',
        a: 'We offer EXW, FOB Karachi, CFR, CIF, and DDP depending on destination and order volume. For repeat customers, we can arrange freight on preferred carriers or integrate with your existing logistics provider.',
      },
      {
        q: 'What are typical lead times for production orders?',
        a: 'Standard catalogue items: 3–4 weeks after order confirmation. Custom or new tooling orders: 6–10 weeks including tooling, sampling, and approval. We provide a detailed production schedule at order confirmation and provide regular updates throughout.',
      },
    ],
  },
]

export default function FAQs() {
  const [open, setOpen] = useState(null)

  const toggle = (key) => setOpen(open === key ? null : key)

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero */}
      <section className="bg-[#005691] py-20 px-8">
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">Support</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-white/80 text-lg max-w-2xl">Answers to the most common questions from our global procurement and engineering customers.</p>
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
          <p className="text-white/80 mb-8 max-w-md mx-auto">Our technical and procurement team is available Mon–Sat to answer your specific requirements.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="bg-[#25D366] text-white px-8 py-3 rounded-lg font-semibold text-sm hover:brightness-110 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-sm">chat</span>
              WhatsApp Us
            </a>
            <button 
            onClick={() => onNavigate('Contact US')}
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