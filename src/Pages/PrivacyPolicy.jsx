import { useEffect } from 'react'

export default function PrivacyPolicy({ onNavigate }) {
  useEffect(() => {
    document.title = 'Privacy Policy | AT International'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page)
    }
  }

  const sections = [
    { id: 'introduction', title: '1. Introduction & Corporate Scope' },
    { id: 'information-collected', title: '2. Information We Collect' },
    { id: 'how-we-use-information', title: '3. How We Use Your Information' },
    { id: 'legal-bases', title: '4. Legal Bases for Processing' },
    { id: 'data-sharing', title: '5. Data Sharing & Third Parties' },
    { id: 'international-transfers', title: '6. International Data Transfers' },
    { id: 'security-retention', title: '7. Data Security & Retention' },
    { id: 'your-rights', title: '8. Your Rights & Choices' },
    { id: 'cookies-tracking', title: '9. Cookies & Web Tracking' },
    { id: 'contact-officer', title: '10. Contacting Our Privacy Desk' },
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
      <section className="relative -mt-16 sm:-mt-20 pt-36 sm:pt-48 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden" style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translateZ(0)' }}>
        {/* Background image */}
        <img
          src="/assets/compliance_bg.jpg"
          alt="AT International Compliance"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            // Fallback if compliance_bg.jpg is unavailable
            e.target.src = '/assets/fll.png'
          }}
        />
        {/* Blue overlay matching site identity */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/80 to-[#005691]/35" />

        <div className="relative z-10 max-w-[1280px] mx-auto" style={{ WebkitTransform: 'translate3d(0,0,0)', transform: 'translateZ(0)', isolation: 'isolate' }}>
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
            <span className="text-white font-medium">Privacy Policy</span>
          </div>

          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-2.5 sm:mb-4 uppercase tracking-widest">
            Corporate Governance & Legal
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-3xl leading-relaxed">
            AT International is committed to safeguarding your business and personal information. This Privacy Policy details how we collect, process, protect, and handle data across our global export, sourcing, and digital procurement platforms.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-white">verified_user</span>
              <span>GDPR, PIPL & International B2B Compliant</span>
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
              Policy Navigation
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

            <div className="mt-6 pt-6 border-t border-[#c5c6cd]/60">
              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100">
                <span className="text-xs font-bold text-[#005691] block mb-1">Looking for Cookie Settings?</span>
                <p className="text-xs text-[#505f76] mb-3 leading-relaxed">
                  Review our Cookie Policy to manage web storage and analytics preferences.
                </p>
                <button
                  onClick={() => handleNavigate('Cookie Policy')}
                  className="text-xs font-semibold text-[#005691] hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to Cookie Policy</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
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
                  <strong>AT International</strong> (&quot;ATI&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is a specialized international trading, sourcing, and export organization headquartered in <strong>Guangzhou City, Guangdong Province, China</strong>. We specialize in the supply and export of <strong>Industrial Sealing Solutions</strong> (Valve Stem Seals, O-Rings, Oil Seals, Molded Elastomers), <strong>Motorcycle Parts</strong>, and <strong>E-Bike Parts</strong> to industrial clients, distributors, and OEMs across more than 40 countries worldwide.
                </p>
                <p>
                  This Privacy Policy sets forth our operational practices regarding the collection, handling, storage, and transfer of personal and commercial data collected through our website (<a href="https://www.theatinternational.com/" className="text-[#005691] hover:underline">theatinternational.com</a>), electronic mail systems, commercial inquiry forms, WhatsApp/WeChat business channels, and direct trading communications.
                </p>
                <div className="p-4 bg-[#f7f9fb] border-l-4 border-[#005691] rounded-r-xl text-xs sm:text-sm text-[#191c1e]">
                  <strong>Core Commitment:</strong> AT International operates exclusively in the B2B (business-to-business) commercial domain. We do not sell, rent, monetize, or broker personal information to third-party marketers or advertisers under any circumstances.
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section id="information-collected" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  2
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Information We Collect
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Depending on how you engage with our export desk and website, we may collect the following categories of information:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                  <div className="border border-[#c5c6cd] rounded-xl p-5 bg-[#f7f9fb]">
                    <div className="flex items-center gap-2 font-semibold text-[#191c1e] text-sm sm:text-base mb-2">
                      <span className="material-symbols-outlined text-[#005691]">badge</span>
                      Business & Contact Credentials
                    </div>
                    <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-[#505f76]">
                      <li>Full name and corporate designation</li>
                      <li>Business email address</li>
                      <li>Telephone, mobile, and WhatsApp numbers</li>
                      <li>Company name and registered country</li>
                      <li>Delivery, discharge port, and billing addresses</li>
                    </ul>
                  </div>

                  <div className="border border-[#c5c6cd] rounded-xl p-5 bg-[#f7f9fb]">
                    <div className="flex items-center gap-2 font-semibold text-[#191c1e] text-sm sm:text-base mb-2">
                      <span className="material-symbols-outlined text-[#005691]">precision_manufacturing</span>
                      Technical & Order Specifications
                    </div>
                    <ul className="text-xs sm:text-sm space-y-1.5 list-disc list-inside text-[#505f76]">
                      <li>Product inquiry details (part numbers, dimensions)</li>
                      <li>Elastomer & material specs (FKM, NBR, Silicone, PTFE)</li>
                      <li>Technical drawings, 2D/3D CAD files (STEP, DXF, PDF)</li>
                      <li>Estimated order volumes and Target MOQs</li>
                      <li>Requested Incoterms (FOB, CIF, CFR, EXW, DDP)</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-[#c5c6cd] rounded-xl p-5 bg-[#f7f9fb]">
                  <div className="flex items-center gap-2 font-semibold text-[#191c1e] text-sm sm:text-base mb-2">
                    <span className="material-symbols-outlined text-[#005691]">devices</span>
                    Automated Digital Logs & Device Telemetry
                  </div>
                  <p className="text-xs sm:text-sm text-[#505f76] mb-2">
                    When you access our web portal, our hosting infrastructure automatically logs standard network requests to maintain security and optimize global content delivery:
                  </p>
                  <ul className="text-xs sm:text-sm space-y-1 list-disc list-inside text-[#505f76]">
                    <li>Internet Protocol (IP) address and approximate geographic region (city/country)</li>
                    <li>Browser family, browser version, and operating system</li>
                    <li>Referring URL, timestamp of access, and pages visited</li>
                    <li>Technical error logs to diagnose routing or connectivity anomalies</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section id="how-we-use-information" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  3
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  How We Use Your Information
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  All data gathered by AT International is processed strictly for legitimate commercial, operational, and export fulfillment purposes:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100/80">
                    <span className="material-symbols-outlined text-[#005691] mt-0.5">request_quote</span>
                    <div>
                      <strong className="text-sm font-bold text-[#191c1e] block">Generating Commercial Quotes & RFQ Processing</strong>
                      <span className="text-xs sm:text-sm text-[#505f76]">Reviewing customer inquiries, calculating unit prices, factoring raw material and tooling costs, and issuing formal proforma invoices and quotations.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100/80">
                    <span className="material-symbols-outlined text-[#005691] mt-0.5">local_shipping</span>
                    <div>
                      <strong className="text-sm font-bold text-[#191c1e] block">International Freight & Export Documentation</strong>
                      <span className="text-xs sm:text-sm text-[#505f76]">Arranging ocean, air, or multimodal shipping, preparing Bills of Lading, Certificates of Origin, packing lists, and export customs clearance in Guangzhou and destination ports.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100/80">
                    <span className="material-symbols-outlined text-[#005691] mt-0.5">biotech</span>
                    <div>
                      <strong className="text-sm font-bold text-[#191c1e] block">Custom Tooling & Technical Feasibility Coordination</strong>
                      <span className="text-xs sm:text-sm text-[#505f76]">Liaising with verified partner factories to evaluate 2D/3D drawings, assess elastomer shrinkage rates, and manufacture pre-production physical samples.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/40 border border-blue-100/80">
                    <span className="material-symbols-outlined text-[#005691] mt-0.5">support_agent</span>
                    <div>
                      <strong className="text-sm font-bold text-[#191c1e] block">Client Support & Contractual Communications</strong>
                      <span className="text-xs sm:text-sm text-[#505f76]">Delivering order updates, shipping notifications, tracking codes, and resolving quality inquiries or after-sales requests.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="legal-bases" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  4
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Legal Bases for Processing
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  In compliance with applicable data protection legislation (including the EU General Data Protection Regulation (GDPR) and the Personal Information Protection Law of the People&apos;s Republic of China (PIPL)), we process information under the following legal bases:
                </p>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[#505f76]">
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#005691] mt-0.5">check_circle</span>
                    <span><strong>Performance of a Contract:</strong> Processing necessary to execute a sales contract, quotation, sample manufacturing agreement, or export consignment.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#005691] mt-0.5">check_circle</span>
                    <span><strong>Legitimate Interests:</strong> Necessary for standard B2B commercial trading, website defense, anti-fraud controls, and commercial relationship management.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#005691] mt-0.5">check_circle</span>
                    <span><strong>Legal Compliance:</strong> Mandatory retention for international customs inspections, tax audit records, and export trade compliance laws.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-sm text-[#005691] mt-0.5">check_circle</span>
                    <span><strong>Consent:</strong> When you voluntarily submit an RFQ form or communicate with our staff via WhatsApp or email.</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Section 5 */}
            <section id="data-sharing" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  5
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Data Sharing & Third Parties
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  AT International maintains strict boundaries regarding external data sharing. We disclose data solely to the following trusted operational partners:
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-[#505f76]">
                  <div className="p-4 border border-[#c5c6cd] rounded-xl">
                    <strong className="text-[#191c1e] text-sm block mb-1">1. Verified Manufacturing & Quality Control Partners:</strong>
                    Technical drawings and component parameters are shared strictly with verified ISO-compliant manufacturing facilities for mold fabrication, dimensional verification, and sample production. Commercial buyer contact information is anonymized whenever feasible.
                  </div>
                  <div className="p-4 border border-[#c5c6cd] rounded-xl">
                    <strong className="text-[#191c1e] text-sm block mb-1">2. International Freight Forwarders & Shipping Carriers:</strong>
                    Consignee name, destination address, and phone numbers are transmitted to freight lines (e.g., COSCO, Maersk, DHL, FedEx) and customs brokers to facilitate bill of lading issuance and port dispatch.
                  </div>
                  <div className="p-4 border border-[#c5c6cd] rounded-xl">
                    <strong className="text-[#191c1e] text-sm block mb-1">3. Technology Infrastructure Providers:</strong>
                    We use reputable digital infrastructure providers, including EmailJS (for relaying procurement inquiries securely to our export desk) and enterprise email hosting with SSL encryption.
                  </div>
                </div>
              </div>
            </section>

            {/* Section 6 */}
            <section id="international-transfers" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  6
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  International Data Transfers
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  As an international trading company headquartered in <strong>Guangzhou, China</strong> and serving clients in Europe, North America, the Middle East, Southeast Asia, and Africa, data you provide will be transferred to, stored, and processed in China and other transit jurisdictions where our logistics partners operate.
                </p>
                <p>
                  We implement robust contractual safeguards, confidentiality obligations, and standard data protection terms with all overseas partners to ensure your commercial data receives an equivalent standard of protection regardless of physical destination.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section id="security-retention" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  7
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Data Security & Retention Standards
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  We have instituted rigorous technical and organizational measures to prevent unauthorized access, alteration, disclosure, or destruction of your information:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                    <span className="material-symbols-outlined text-2xl text-[#005691] mb-2">lock</span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#191c1e] mb-1">SSL/TLS Encryption</h3>
                    <p className="text-xs text-[#505f76]">All web transmissions are encrypted using end-to-end 256-bit TLS protocols.</p>
                  </div>
                  <div className="p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                    <span className="material-symbols-outlined text-2xl text-[#005691] mb-2">shield</span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#191c1e] mb-1">Restricted Access</h3>
                    <p className="text-xs text-[#505f76]">Only authorized export personnel and procurement officers hold access to trade records.</p>
                  </div>
                  <div className="p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                    <span className="material-symbols-outlined text-2xl text-[#005691] mb-2">history</span>
                    <h3 className="font-bold text-xs sm:text-sm text-[#191c1e] mb-1">Commercial Retention</h3>
                    <p className="text-xs text-[#505f76]">Export files and invoices are retained in accordance with customs and tax statutes (typically 5–7 years).</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section id="your-rights" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  8
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Your Rights & Choices
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Depending on your jurisdiction, you have fundamental rights regarding your personal and corporate contact data:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#505f76]">
                  <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                    <strong className="text-[#191c1e] block mb-1">Right to Access & Portability</strong>
                    Request a copy of the commercial and contact records we maintain regarding your company.
                  </div>
                  <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                    <strong className="text-[#191c1e] block mb-1">Right to Rectification</strong>
                    Request corrections to out-of-date or inaccurate contact, billing, or shipping records.
                  </div>
                  <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                    <strong className="text-[#191c1e] block mb-1">Right to Erasure (&quot;Right to Be Forgotten&quot;)</strong>
                    Request deletion of your contact data, subject to mandatory customs retention laws.
                  </div>
                  <div className="p-3.5 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                    <strong className="text-[#191c1e] block mb-1">Right to Restrict or Object</strong>
                    Object to future communications or restrict specific processing activities.
                  </div>
                </div>
                <p className="text-xs sm:text-sm">
                  To exercise any of these rights, contact our Data Governance Desk at <a href="mailto:info@theatinternational.com" className="text-[#005691] font-semibold hover:underline">info@theatinternational.com</a>. We respond to all formal inquiries within 24 to 48 business hours.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section id="cookies-tracking" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  9
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Cookies & Web Tracking
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  Our website uses cookies and browser local storage mechanisms to deliver essential routing, remember UI states, and monitor website availability. For a full breakdown of specific cookies and to customize your preferences, please consult our dedicated <button onClick={() => handleNavigate('Cookie Policy')} className="text-[#005691] font-semibold underline cursor-pointer">Cookie Policy</button>.
                </p>
              </div>
            </section>

            {/* Section 10 */}
            <section id="contact-officer" className="scroll-mt-28 border-t border-[#c5c6cd]/50 pt-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                  10
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                  Contacting Our Privacy & Compliance Desk
                </h2>
              </div>
              <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
                <p>
                  If you have inquiries, concerns, or requests regarding this Privacy Policy or how your data is handled by our export team, please contact us directly:
                </p>

                <div className="bg-[#005691] text-white rounded-2xl p-6 sm:p-8 space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    <span className="material-symbols-outlined">corporate_fare</span>
                    AT International — Privacy & Compliance Office
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
                      Submit Formal Inquiry
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
