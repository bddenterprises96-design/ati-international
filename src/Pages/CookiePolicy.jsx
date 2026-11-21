import { useState, useEffect } from 'react'

export default function CookiePolicy({ onNavigate }) {
  useEffect(() => {
    document.title = 'Cookie Policy | AT International'
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page)
    }
  }

  // Cookie Preferences State (Loaded from localStorage if present)
  const [preferences, setPreferences] = useState(() => {
    try {
      const saved = localStorage.getItem('ati_cookie_consent')
      if (saved) {
        return JSON.parse(saved)
      }
    } catch {
      // fallback
    }
    return {
      essential: true,
      functional: true,
      analytics: false,
    }
  })

  const [saveNotice, setSaveNotice] = useState(false)

  const togglePreference = (key) => {
    if (key === 'essential') return // Cannot disable essential cookies
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const handleSave = (customPrefs = null) => {
    const toSave = customPrefs || preferences
    try {
      localStorage.setItem('ati_cookie_consent', JSON.stringify({
        ...toSave,
        updatedAt: new Date().toISOString(),
      }))
      window.dispatchEvent(new Event('ati_cookie_consent_updated'))
    } catch {
      // ignore
    }
    setSaveNotice(true)
    setTimeout(() => setSaveNotice(false), 3500)
  }

  const handleAcceptAll = () => {
    const all = { essential: true, functional: true, analytics: true }
    setPreferences(all)
    handleSave(all)
  }

  const handleRejectNonEssential = () => {
    const minimal = { essential: true, functional: false, analytics: false }
    setPreferences(minimal)
    handleSave(minimal)
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen text-[#191c1e]">

      {/* Hero Header */}
      <section className="relative -mt-20 pt-44 sm:pt-48 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/quality_compliance_bg.jpg"
          alt="AT International Cookie Policy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/assets/fll.png'
          }}
        />
        {/* Blue overlay */}
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
            <span className="text-white font-medium">Cookie Policy</span>
          </div>

          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-2.5 sm:mb-4 uppercase tracking-widest">
            Transparency & Consent
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Cookies & Tracking Policy
          </h1>
          <p className="text-white/90 text-xs sm:text-base md:text-lg max-w-3xl leading-relaxed">
            AT International values your digital privacy. This policy provides a comprehensive, transparent overview of how we use cookies, local storage, and similar web technologies across our international export and sourcing website.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6 text-xs sm:text-sm text-white/80">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-white">cookie</span>
              <span>EU ePrivacy & GDPR Compliant</span>
            </div>
            <span className="hidden sm:inline">•</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-white">tune</span>
              <span>Granular User Preference Controls</span>
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

        {/* ── INTERACTIVE PREFERENCES MANAGER WIDGET ── */}
        <div className="bg-white border-2 border-blue-100 rounded-3xl p-6 sm:p-10 shadow-lg mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-2xl pointer-events-none -mr-10 -mt-10" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#c5c6cd]/50">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#005691] rounded-full text-xs font-bold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-base">settings</span>
                Interactive Preference Center
              </div>
              <h2 className="text-2xl font-bold text-[#005691]">
                Customize Your Cookie Preferences
              </h2>
              <p className="text-[#505f76] text-xs sm:text-sm mt-1 max-w-2xl">
                Choose which categories of cookies and local storage tokens you permit during your visit. You may update your consent at any time.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-[#005691] text-white text-xs sm:text-sm font-semibold rounded-lg hover:brightness-110 transition-all shadow-sm cursor-pointer"
              >
                Accept All
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-4 py-2 bg-[#f2f4f6] text-[#505f76] hover:text-[#191c1e] text-xs sm:text-sm font-semibold rounded-lg hover:bg-[#e6e8eb] transition-all cursor-pointer"
              >
                Reject Non-Essential
              </button>
            </div>
          </div>

          {/* Cookie Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

            {/* Essential */}
            <div className="border border-[#c5c6cd] rounded-2xl p-5 bg-[#f7f9fb] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#005691] flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">verified_user</span>
                  </div>
                  <span className="text-[11px] font-bold text-[#005691] bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-full uppercase">
                    Always Active
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#191c1e] mb-1.5">Strictly Necessary</h3>
                <p className="text-xs text-[#505f76] leading-relaxed">
                  Crucial for website navigation, CSRF security, session routing, and loading cached assets. Cannot be disabled without breaking website operation.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c5c6cd]/50 text-[11px] text-[#505f76] font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-xs text-green-600">lock</span>
                Core Infrastructure Requirement
              </div>
            </div>

            {/* Functional */}
            <div className="border border-[#c5c6cd] rounded-2xl p-5 bg-[#f7f9fb] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">tune</span>
                  </div>
                  {/* Switch */}
                  <button
                    onClick={() => togglePreference('functional')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.functional ? 'bg-[#005691]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle Functional Cookies"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.functional ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#191c1e] mb-1.5">Functional & Preferences</h3>
                <p className="text-xs text-[#505f76] leading-relaxed">
                  Preserves user selections such as catalog search filters, procurement inquiry form field recovery, and selected interface preferences.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c5c6cd]/50 text-[11px] text-[#505f76] font-medium flex items-center justify-between">
                <span>Status:</span>
                <span className={preferences.functional ? 'text-green-600 font-bold' : 'text-gray-400 font-bold'}>
                  {preferences.functional ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

            {/* Analytics */}
            <div className="border border-[#c5c6cd] rounded-2xl p-5 bg-[#f7f9fb] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                    <span className="material-symbols-outlined text-xl">analytics</span>
                  </div>
                  {/* Switch */}
                  <button
                    onClick={() => togglePreference('analytics')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                      preferences.analytics ? 'bg-[#005691]' : 'bg-gray-300'
                    }`}
                    aria-label="Toggle Analytics Cookies"
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.analytics ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                <h3 className="font-bold text-base text-[#191c1e] mb-1.5">Analytics & Performance</h3>
                <p className="text-xs text-[#505f76] leading-relaxed">
                  Aggregated and anonymized metrics helping us understand how international buyers navigate product datasheets, page speed, and bounce rates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#c5c6cd]/50 text-[11px] text-[#505f76] font-medium flex items-center justify-between">
                <span>Status:</span>
                <span className={preferences.analytics ? 'text-green-600 font-bold' : 'text-gray-400 font-bold'}>
                  {preferences.analytics ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#c5c6cd]/40">
            <div className="text-xs text-[#505f76] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm text-[#005691]">info</span>
              <span>Preferences are automatically stored in your browser&apos;s localStorage for future visits.</span>
            </div>

            <div className="flex items-center gap-3">
              {saveNotice && (
                <span className="text-xs font-semibold text-green-700 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200 animate-fadeIn flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Preferences Saved Successfully!
                </span>
              )}
              <button
                onClick={() => handleSave()}
                className="px-6 py-2.5 bg-[#005691] text-white text-xs sm:text-sm font-bold rounded-lg hover:brightness-110 shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">save</span>
                Save Preferences
              </button>
            </div>
          </div>
        </div>

        {/* ── DETAILED POLICY BREAKDOWN ── */}
        <div className="bg-white border border-[#c5c6cd] rounded-3xl p-6 sm:p-10 shadow-sm space-y-12">

          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                What Are Cookies & Web Storage Technologies?
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
              <p>
                A <strong>cookie</strong> is a small text file containing a string of characters that is placed on your computer, smartphone, or tablet when you visit a website. Cookies allow the website to recognize your browser, remember user settings, and understand which technical specifications or product categories are of highest interest to you.
              </p>
              <p>
                In addition to standard HTTP cookies, modern web applications may utilize related storage mechanisms, including <strong>HTML5 Local Storage</strong> and <strong>Session Storage</strong>. These technologies store data client-side within your browser without automatically transferring the payload back to the web server on every HTTP request, leading to enhanced performance and security.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="border-t border-[#c5c6cd]/50 pt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                Why Does AT International Use Cookies?
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
              <p>
                As an international B2B exporter coordinating high-precision industrial seals, motorcycle components, and e-bike assemblies with global buyers in multiple time zones, our digital platform utilizes cookies and local storage tokens for specific operational functions:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                  <strong className="text-sm font-bold text-[#191c1e] block mb-1">Session & Navigation Routing:</strong>
                  Maintaining rapid single-page application (SPA) routing, anchor scrolling to technical product specifications, and preventing repeated asset re-downloads.
                </div>
                <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                  <strong className="text-sm font-bold text-[#191c1e] block mb-1">Inquiry Form Reliability:</strong>
                  Assisting in preserving draft form values in inquiry modals if your connection momentarily lapses during procurement review.
                </div>
                <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                  <strong className="text-sm font-bold text-[#191c1e] block mb-1">Security & Attack Prevention:</strong>
                  Distinguishing genuine procurement queries from malicious automated bot submissions and denial-of-service spam.
                </div>
                <div className="p-4 bg-[#f7f9fb] rounded-xl border border-[#c5c6cd]">
                  <strong className="text-sm font-bold text-[#191c1e] block mb-1">Regulatory Consent Record:</strong>
                  Remembering your specific cookie choices so you are not confronted with repetitive consent inquiries.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="border-t border-[#c5c6cd]/50 pt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                Inventory of Specific Cookies & Storage Tokens
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
              <p>
                The following schedule provides a transparent breakdown of the primary cookies and local storage items deployed on this website:
              </p>

              {/* Table */}
              <div className="overflow-x-auto border border-[#c5c6cd] rounded-2xl shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[#f7f9fb] border-b border-[#c5c6cd] text-[#005691] font-bold">
                    <tr>
                      <th className="py-3 px-4">Identifier / Key</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Storage Medium</th>
                      <th className="py-3 px-4">Retention / Expiry</th>
                      <th className="py-3 px-4">Functional Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c5c6cd]/60">
                    <tr className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-[#191c1e]">ati_cookie_consent</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-[#005691] rounded-md text-[11px] font-bold">Necessary</span></td>
                      <td className="py-3 px-4">Local Storage</td>
                      <td className="py-3 px-4">12 Months</td>
                      <td className="py-3 px-4 text-[#505f76]">Stores your selected cookie preferences and consent timestamp.</td>
                    </tr>
                    <tr className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-[#191c1e]">__ati_session_state</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 bg-blue-50 text-[#005691] rounded-md text-[11px] font-bold">Necessary</span></td>
                      <td className="py-3 px-4">Session Cookie</td>
                      <td className="py-3 px-4">End of Browser Session</td>
                      <td className="py-3 px-4 text-[#505f76]">Maintains active view state and pagination across catalog sections.</td>
                    </tr>
                    <tr className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-[#191c1e]">ati_rfq_draft</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 bg-amber-50 text-amber-800 rounded-md text-[11px] font-bold">Functional</span></td>
                      <td className="py-3 px-4">Local Storage</td>
                      <td className="py-3 px-4">30 Days</td>
                      <td className="py-3 px-4 text-[#505f76]">Temporarily caches inquiry form inputs to prevent accidental draft loss.</td>
                    </tr>
                    <tr className="hover:bg-blue-50/20 transition-colors">
                      <td className="py-3 px-4 font-mono font-semibold text-[#191c1e]">_ga_telemetry (optional)</td>
                      <td className="py-3 px-4"><span className="px-2 py-0.5 bg-purple-50 text-purple-800 rounded-md text-[11px] font-bold">Analytics</span></td>
                      <td className="py-3 px-4">HTTP Cookie</td>
                      <td className="py-3 px-4">13 Months</td>
                      <td className="py-3 px-4 text-[#505f76]">Aggregated, anonymized statistics on page visits and technical performance.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section className="border-t border-[#c5c6cd]/50 pt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                4
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                Managing Cookies via Browser Controls
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
              <p>
                In addition to utilizing our preference tool above, you have full control over cookies through your web browser settings. Most browsers allow you to block all cookies, reject third-party cookies, or clear your cache upon closing the application:
              </p>

              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm">
                <div className="p-2 sm:p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                  <strong className="block text-[#191c1e] font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 leading-tight">Google Chrome</strong>
                  <span className="text-[#505f76] text-[8.5px] sm:text-xs leading-tight block">Settings &gt; Privacy and Security</span>
                </div>
                <div className="p-2 sm:p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                  <strong className="block text-[#191c1e] font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 leading-tight">Mozilla Firefox</strong>
                  <span className="text-[#505f76] text-[8.5px] sm:text-xs leading-tight block">Settings &gt; Enhanced Protection</span>
                </div>
                <div className="p-2 sm:p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                  <strong className="block text-[#191c1e] font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 leading-tight">Apple Safari</strong>
                  <span className="text-[#505f76] text-[8.5px] sm:text-xs leading-tight block">Preferences &gt; Block all cookies</span>
                </div>
                <div className="p-2 sm:p-4 bg-[#f7f9fb] border border-[#c5c6cd] rounded-xl text-center">
                  <strong className="block text-[#191c1e] font-bold text-[10px] sm:text-sm mb-0.5 sm:mb-1 leading-tight">Microsoft Edge</strong>
                  <span className="text-[#505f76] text-[8.5px] sm:text-xs leading-tight block">Settings &gt; Manage cookies</span>
                </div>
              </div>
              <p className="text-xs text-[#505f76] italic">
                * Note: Disabling strictly necessary cookies in your browser settings may impair certain dynamic website functions, such as interactive procurement forms and smooth route navigation.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="border-t border-[#c5c6cd]/50 pt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#005691] flex items-center justify-center font-bold">
                5
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#005691]">
                Related Policies & Inquiries
              </h2>
            </div>
            <div className="space-y-4 text-sm sm:text-base text-[#505f76] leading-relaxed">
              <p>
                To learn more about how we collect, safeguard, and process your commercial and personal data under international data protection laws, please review our comprehensive <button onClick={() => handleNavigate('Privacy Policy')} className="text-[#005691] font-semibold underline cursor-pointer">Privacy Policy</button>.
              </p>
              <div className="p-6 bg-blue-50/60 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-[#005691] text-base mb-1">Questions Concerning Our Tracking Practices?</h3>
                  <p className="text-xs sm:text-sm text-[#505f76]">
                    Our compliance team and export coordinators are available to answer your technical questions.
                  </p>
                </div>
                <div className="flex gap-2.5 flex-shrink-0">
                  <button
                    onClick={() => handleNavigate('Contact Us')}
                    className="px-4 py-2 bg-[#005691] text-white text-xs sm:text-sm font-semibold rounded-lg hover:brightness-110 shadow-sm transition-all cursor-pointer"
                  >
                    Contact Export Desk
                  </button>
                  <a
                    href="mailto:info@theatinternational.com"
                    className="px-4 py-2 bg-white text-[#005691] border border-[#005691] text-xs sm:text-sm font-semibold rounded-lg hover:bg-blue-50 transition-all"
                  >
                    Email DPO
                  </a>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  )
}
