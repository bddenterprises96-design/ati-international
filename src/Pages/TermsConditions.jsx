import { useEffect } from 'react'

export default function TermsConditions({ onNavigate }) {
  useEffect(() => {
    document.title = 'Terms & Conditions | AT International'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page)
    }
  }

  const sections = [
    { id: 'introduction', title: '1. Introduction & Corporate Scope' },
    { id: 'quotations-orders', title: '2. Quotations, Pricing & Order Acceptance' },
    { id: 'specifications-custom', title: '3. Technical Specs & Custom Sourcing' },
    { id: 'quality-compliance', title: '4. Quality Assurance & Standards' },
    { id: 'delivery-incoterms', title: '5. Delivery, Freight & Incoterms' },
    { id: 'payment-terms', title: '6. Payment Terms & Settlement' },
    { id: 'inspection-claims', title: '7. Inspection, Acceptance & Claims' },
    { id: 'ip-confidentiality', title: '8. Intellectual Property & Confidentiality' },
    { id: 'liability-force-majeure', title: '9. Limitation of Liability & Force Majeure' },
    { id: 'governing-law', title: '10. Governing Law & Dispute Resolution' },
  ]

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen text-[#191c1e]">

      {/* Hero Header */}
      <section className="relative -mt-16 sm:-mt-20 pt-36 sm:pt-48 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/compliance_bg.jpg"
          alt="AT International Legal & Terms"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/fll.png'
          }}
        />
        {/* Blue overlay matching site identity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/80 to-[#005691]/35" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm mb-3 sm:mb-4">
            <button
              onClick={() => handleNavigate('Home')}
              className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">home</span>
              Home
            </button>
            <span>/</span>
            <span className="text-white font-medium">Terms & Conditions</span>
          </div>

          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-2.5 sm:mb-4 uppercase tracking-widest">
            Corporate Governance & Legal
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-3xl leading-relaxed">
            These Terms & Conditions govern all international trade transactions, quotations, proforma invoices, sourcing operations, and export supply contracts executed by AT International.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-white">gavel</span>
              <span>Incoterms® 2020 & International B2B Commercial Law</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-white">event</span>
              <span>Last Revised: October 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 bg-white border border-[#c5c6cd] rounded-2xl p-6 shadow-sm">
            <h2 className="font-bold text-[#005691] text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">list_alt</span>
              Terms Navigation
            </h2>
            <nav className="flex flex-col gap-1.5">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToSection(s.id)}
                  className="text-left text-xs sm:text-sm py-2 px-3 rounded-lg text-[#505f76] hover:text-[#005691] hover:bg-blue-50/70 transition-all font-medium flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate">{s.title}</span>
                  <span className="material-symbols-outlined text-xs text-[#005691] opacity-0 group-hover:opacity-100 transition-opacity">
                    arrow_forward
                  </span>
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-[#c5c6cd]/60 space-y-3">
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="text-xs font-bold text-[#005691] block mb-1">Related Legal Policies</span>
                <p className="text-xs text-[#505f76] mb-3 leading-relaxed">
                  Review our complete data governance and privacy frameworks:
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleNavigate('Privacy Policy')}
                    className="text-xs font-semibold text-[#005691] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Privacy Policy</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                  <button
                    onClick={() => handleNavigate('Cookie Policy')}
                    className="text-xs font-semibold text-[#005691] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Cookie Policy</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Document Body */}
          <div className="lg:col-span-8 bg-white border border-[#c5c6cd] rounded-2xl p-6 sm:p-10 shadow-sm space-y-12">

            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-28">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  1
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Introduction & Corporate Scope
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  <strong>AT International</strong> (&quot;ATI&quot;, &quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a specialized global trading and export organization operating from <strong>Guangzhou City, Guangdong Province, China</strong>. We specialize in cross-border procurement, technical verification, and global containerized distribution of <strong>Industrial Sealing Solutions</strong> (Valve Stem Seals, O-Rings, Oil Seals, Custom Molded Rubbers), <strong>Motorcycle Parts</strong>, and <strong>E-Bike Parts</strong> for commercial buyers, industrial distributors, and OEM manufacturing partners across more than 40 countries worldwide.
                </p>
                <p>
                  These Terms & Conditions (&quot;Terms&quot;) constitute the legal framework governing all trade interactions, price quotations, Proforma Invoices (PI), Sales Confirmations (SC), and export shipments executed between AT International and the commercial purchasing entity (&quot;Buyer&quot; or &quot;Client&quot;).
                </p>
                <div className="p-4 bg-[#f7f9fb] border-l-4 border-[#005691] rounded-r-xl text-xs sm:text-sm text-[#191c1e]">
                  <strong>B2B Nature of Transactions:</strong> All products and services supplied by AT International are intended exclusively for commercial, industrial, OEM, and wholesale trade. Consumer retail protections do not apply to commercial sales contracts entered into with ATI.
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="quotations-orders" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Quotations, Pricing & Order Acceptance
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Quotations and price estimates issued by AT International are valid for <strong>30 calendar days</strong> from the date of issuance, unless explicitly stated otherwise in writing, subject to fluctuations in raw material costs, currency exchange rates (USD/CNY/EUR), and ocean freight tariffs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="border border-[#c5c6cd] rounded-xl p-5 bg-[#f7f9fb]">
                    <div className="flex items-center gap-2 font-semibold text-[#191c1e] text-sm sm:text-base mb-2">
                      <span className="material-symbols-outlined text-[#005691]">receipt_long</span>
                      Order Formation
                    </div>
                    <p className="text-xs sm:text-sm text-[#505f76]">
                      A commercial contract is binding only upon mutual execution of our formal Proforma Invoice (PI) or Sales Confirmation and receipt of the agreed deposit or commercial letter of credit.
                    </p>
                  </div>
                  <div className="border border-[#c5c6cd] rounded-xl p-5 bg-[#f7f9fb]">
                    <div className="flex items-center gap-2 font-semibold text-[#191c1e] text-sm sm:text-base mb-2">
                      <span className="material-symbols-outlined text-[#005691]">currency_exchange</span>
                      Price Currency & Taxes
                    </div>
                    <p className="text-xs sm:text-sm text-[#505f76]">
                      All prices are quoted in US Dollars (USD), Euros (EUR), or Chinese Yuan (CNY) as specified. Prices exclude import duties, VAT, or local clearance charges at the destination port unless sold under DDP terms.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="specifications-custom" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Technical Specs, Engineering Drawings & Custom Sourcing
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  For custom-engineered components, OEM manufacturing, or bespoke material formulations (such as specialized FKM fluoroelastomer durometer ratings, specific crankshaft alloy grades, or custom BLDC motor winding specifications):
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-[#505f76] ml-2">
                  <li><strong>Buyer Verification:</strong> The Buyer is responsible for the accuracy of supplied technical drawings (CAD, STEP, PDF), dimensional tolerances, material callouts, and operating environment parameters.</li>
                  <li><strong>Pre-Production Samples:</strong> Where agreed in the Proforma Invoice, production will commence only after the Buyer formally approves physical golden samples or signed dimensional inspection reports.</li>
                  <li><strong>Tooling & Molds:</strong> Mold fees and tooling deposits are billed upfront. Molds dedicated to proprietary Buyer designs remain the exclusive property of the Buyer and will not be utilized for third-party production.</li>
                </ul>
              </div>
            </section>

            {/* Section 4 */}
            <section id="quality-compliance" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Quality Assurance, Inspection & Compliance
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  AT International partners exclusively with <strong>ISO 9001:2015</strong> verified manufacturers. Every export batch undergoes standardized pre-shipment inspection (PSI) in accordance with agreed AQL sampling standards (MIL-STD-105E / ISO 2859-1).
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
                  <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
                    <span className="font-bold text-[#005691] text-sm block">ISO 9001:2015</span>
                    <span className="text-[11px] text-[#505f76]">Partner Quality Management System</span>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-center">
                    <span className="font-bold text-emerald-700 text-sm block">RoHS 3 Compliant</span>
                    <span className="text-[11px] text-[#505f76]">Directive (EU) 2015/863 Hazardous Free</span>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
                    <span className="font-bold text-purple-700 text-sm block">REACH (EC 1907/2006)</span>
                    <span className="text-[11px] text-[#505f76]">Chemical Substances SVHC Verified</span>
                  </div>
                </div>
                <p className="text-xs text-[#505f76]">
                  Material test certificates (MTC), dimensional reports, and batch traceability sheets are provided upon request prior to container dispatch.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section id="delivery-incoterms" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Delivery, International Freight & Incoterms® 2020
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Unless otherwise specified in writing, all trade terms are interpreted according to <strong>Incoterms® 2020</strong> published by the International Chamber of Commerce (ICC). We regularly execute orders under the following terms:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-[#c5c6cd] rounded-xl bg-[#f7f9fb]">
                    <span className="font-bold text-sm text-[#005691] block mb-1">FOB (Free on Board) — Guangzhou / Shenzhen / Ningbo</span>
                    <p className="text-xs text-[#505f76]">
                      ATI handles export customs clearance and loads goods on board the carrier nominated by the Buyer. Freight and marine transit risks transfer to Buyer once goods cross ship’s rail.
                    </p>
                  </div>
                  <div className="p-4 border border-[#c5c6cd] rounded-xl bg-[#f7f9fb]">
                    <span className="font-bold text-sm text-[#005691] block mb-1">CIF / CFR (Cost, Insurance & Freight)</span>
                    <p className="text-xs text-[#505f76]">
                      ATI arranges ocean or air transport to the named destination port. For CIF terms, ATI procures cargo insurance covering Institute Cargo Clauses (C or A) as agreed.
                    </p>
                  </div>
                  <div className="p-4 border border-[#c5c6cd] rounded-xl bg-[#f7f9fb]">
                    <span className="font-bold text-sm text-[#005691] block mb-1">DDP (Delivered Duty Paid)</span>
                    <p className="text-xs text-[#505f76]">
                      Available for selected global destinations. ATI handles freight, destination clearance, customs duties, and door delivery directly to Buyer’s warehouse.
                    </p>
                  </div>
                  <div className="p-4 border border-[#c5c6cd] rounded-xl bg-[#f7f9fb]">
                    <span className="font-bold text-sm text-[#005691] block mb-1">EXW (Ex Works) & Container Consolidation</span>
                    <p className="text-xs text-[#505f76]">
                      Buyer collects from our warehouse facility in China. ATI provides comprehensive consolidation (LCL/FCL) for mixed multi-category product dispatches.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="payment-terms" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Payment Terms & Settlement
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Payment terms are established on a client-by-client basis based on order volume, commercial history, and credit evaluation:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-[#505f76] ml-2">
                  <li><strong>Standard Production Terms:</strong> 30% Telegraphic Transfer (T/T) deposit upon order confirmation, with the remaining 70% balance payable against presentation of export Bill of Lading (B/L) copy.</li>
                  <li><strong>Letter of Credit (L/C):</strong> Irrevocable Documentary Letters of Credit payable at sight (Sight L/C), issued by internationally recognized premier commercial banks.</li>
                  <li><strong>Banking Details:</strong> Payment must only be remitted to the official corporate bank account of AT International explicitly designated on our formal proforma invoices. ATI never requests fund transfer to unverified third-party accounts.</li>
                </ul>
              </div>
            </section>

            {/* Section 7 */}
            <section id="inspection-claims" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Inspection, Acceptance & Warranty Claims
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  The Buyer shall inspect received shipments upon arrival at the destination warehouse:
                </p>
                <ul className="list-disc list-inside space-y-2 text-sm text-[#505f76] ml-2">
                  <li><strong>Visible Damage or Quantity Discrepancy:</strong> Must be reported in writing within <strong>14 calendar days</strong> of cargo receipt, accompanied by photographic evidence and the bill of lading reference.</li>
                  <li><strong>Latent Defect / Technical Non-Conformance:</strong> Must be submitted in writing within <strong>60 calendar days</strong> of arrival, supported by technical testing data or independent third-party inspection findings.</li>
                  <li><strong>Remedies:</strong> Where ATI confirms a legitimate manufacturing defect or deviation from approved specifications, ATI will at its discretion provide free replacement parts in the subsequent shipment, issue a credit note, or refund the affected commercial value.</li>
                </ul>
              </div>
            </section>

            {/* Section 8 */}
            <section id="ip-confidentiality" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Intellectual Property & Non-Disclosure
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Technical drawings, CAD files, tooling molds, chemical formulations, and proprietary specifications exchanged during inquiries or manufacturing contracts are treated with strict confidentiality under Non-Disclosure Agreement (NDA) standards.
                </p>
                <p>
                  Neither party shall disclose, reproduce, or transfer proprietary technical information to unauthorized third parties without express prior written consent.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="liability-force-majeure" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Limitation of Liability & Force Majeure
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  In no event shall AT International be liable for indirect, incidental, consequential, special, or punitive damages, including loss of profit, loss of production, or business interruption. The total cumulative liability of ATI arising out of any supply contract shall not exceed the total net purchase price actually received by ATI for the specific goods giving rise to the claim.
                </p>
                <p>
                  Neither party shall be held liable for failure or delay in performing trade obligations where such failure results from events beyond reasonable control (&quot;Force Majeure&quot;), including natural disasters, typhoons, pandemics, port blockades, war, embargoes, export/import sanctions, or severe maritime gridlock.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="governing-law" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Governing Law & Dispute Resolution
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  These Terms & Conditions and all commercial contracts executed hereunder shall be governed by and construed in accordance with the laws of the People’s Republic of China, with reference to the United Nations Convention on Contracts for the International Sale of Goods (CISG).
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or in connection with these Terms shall first be resolved through friendly commercial negotiations between senior executives. If unresolved within 30 days, it shall be submitted to the <strong>China International Economic and Trade Arbitration Commission (CIETAC)</strong> South China Sub-Commission (Guangzhou) for arbitration in accordance with its arbitration rules in effect at the time of applying for arbitration.
                </p>

                {/* Contact Card */}
                <div className="bg-[#005691] text-white rounded-2xl p-6 sm:p-8 space-y-4 mt-8">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined">corporate_fare</span>
                    AT International — Legal & Commercial Trade Desk
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-white/90">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-base text-white/70">location_on</span>
                        <span><strong>Head Office:</strong> Room 271, 2nd Floor, Fengchao Youth Innovation Community, No. 49 Dongjiaobei Road, Liwan District, Guangzhou, China</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-white/70">mail</span>
                        <span><strong>Email:</strong> <a href="mailto:info@theatinternational.com" className="underline hover:text-white">info@theatinternational.com</a></span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-base text-white/70">call</span>
                        <span><strong>Phone / WhatsApp:</strong> <a href="tel:+8618523210975" className="underline hover:text-white">+86 185 2321 0975</a></span>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-base text-white/70">schedule</span>
                        <span><strong>Desk Hours:</strong> Mon–Sat: 9:00 AM – 6:00 PM (GMT+8)</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/20 flex flex-wrap gap-3">
                    <button
                      onClick={() => handleNavigate('Contact Us')}
                      className="bg-white text-[#005691] px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold hover:brightness-105 transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Contact Commercial Desk
                    </button>
                    <a
                      href="https://wa.me/8618523210975"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-sm">chat</span>
                      Connect via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  )
}
