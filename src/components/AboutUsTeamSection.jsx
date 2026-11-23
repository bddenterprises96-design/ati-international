/**
 * About Us & Key Team Members Section
 * Conforms to Section 03-E & Section 04 of Website Improvement & Redesign Plan
 */
import usmanTariqPhoto from '../assets/team/usman_tariq.jpg'

const TEAM_MEMBERS = [
  {
    name: 'Mr. UK',
    role: 'Founder & CEO',
    photo: usmanTariqPhoto,
    initial: 'U',
    experience: 'Global Trade & Leadership',
    bio: 'Directs overall company vision, international partnerships, multi-modal supply chain operations, and verified delivery to 40+ destination countries.',
    badge: 'Founder & CEO',
    email: 'info@theatinternational.com',
    whatsapp: 'https://wa.me/message/63ZBE2NPDE3FB1',
  },
  {
    name: 'Mr. Kevin',
    role: 'Managing Director & Head of Sourcing',
    photo: '',
    initial: 'K',
    gender: 'male',
    experience: '25+ Years Experience',
    bio: 'Leads global sourcing strategy, supplier auditing, and manufacturer partnerships across China to ensure world-class production standards for international buyers.',
    badge: 'Executive Leadership',
    email: 'info@theatinternational.com',
    whatsapp: 'https://wa.me/message/63ZBE2NPDE3FB1',
  },
  {
    name: 'Mr. Mark',
    role: 'Quality Assurance & Technical Lead',
    photo: '',
    initial: 'M',
    gender: 'male',
    experience: 'ISO 9001:2015 QA Lead',
    bio: 'Directs on-site factory verification, dimensional laser checks, Shore durometer testing, and strict pre-shipment zero-defect quality control.',
    badge: 'Technical & QA',
    email: 'info@theatinternational.com',
    whatsapp: 'https://wa.me/message/63ZBE2NPDE3FB1',
  },
  {
    name: 'Ms. Rachel',
    role: 'Customer Support & Procurement Coordinator',
    photo: '',
    initial: 'R',
    gender: 'female',
    experience: 'Client Accounts & RFQs',
    bio: 'Ensures 24-hour turnaround on technical quotes, manages OEM sample distribution, and coordinates bespoke CAD drawing sourcing requests.',
    badge: 'Client Relations',
    email: 'info@theatinternational.com',
    whatsapp: 'https://wa.me/message/63ZBE2NPDE3FB1',
  },
]

export default function AboutUsTeamSection({ onNavigate }) {
  return (
    <section className="mt-2 pt-6 sm:mt-16 sm:pt-16">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
            <span className="material-symbols-outlined text-base text-amber-600">groups</span>
            <span>The People Behind AT International</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#005691] tracking-tight mb-4">
            Meet Our Leadership & Sourcing Team
          </h2>
          <p className="text-[#505f76] text-sm sm:text-base leading-relaxed">
            International buyers need transparent, dependable partners. Our multilingual engineering and export team oversees your orders directly from Guangzhou to your home port.
          </p>
        </div>

        {/* Company Sourcing & Export Credentials Banner */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-12 sm:mb-16">
          {[
            { stat: '25+', label: 'Years Sourcing Experience', icon: 'history_edu' },
            { stat: '40+', label: 'Destination Countries', icon: 'public' },
            { stat: '100%', label: 'Pre-Shipment QA Inspected', icon: 'verified' },
            { stat: '24h', label: 'RFQ Response Guarantee', icon: 'pace' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#cbe3f7] rounded-xl sm:rounded-2xl p-2 sm:p-5 text-center shadow-xs hover:shadow-md hover:border-[#005691] transition-all"
            >
              <div className="w-7 h-7 sm:w-10 sm:h-10 mx-auto rounded-lg sm:rounded-xl bg-[#005691]/10 text-[#005691] flex items-center justify-center mb-1.5 sm:mb-2">
                <span className="material-symbols-outlined text-base sm:text-xl">{item.icon}</span>
              </div>
              <div className="text-base sm:text-3xl font-extrabold text-[#005691] mb-0.5 sm:mb-1">{item.stat}</div>
              <div className="text-[9.5px] sm:text-xs font-medium text-gray-600 leading-tight">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-14">
          {TEAM_MEMBERS.map((member, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#c5c6cd] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-amber-400 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo Container */}
                <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100 flex items-center justify-center">
                  {member.photo ? (
                    <>
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#005691]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <span className="text-white text-xs font-semibold">{member.experience}</span>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-[#f8fafc] to-[#eef4f9] flex flex-col items-center justify-center">
                      <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#005691] flex items-center justify-center shadow-md ring-8 ring-[#005691]/15 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white text-4xl sm:text-5xl font-bold select-none">
                          {member.initial || member.name.replace(/^(Mr\.|Ms\.|Mrs\.|Dr\.)\s*/i, '').charAt(0)}
                        </span>
                      </div>
                    </div>
                  )}
                  <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[#005691] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md uppercase tracking-wider">
                    {member.badge}
                  </span>
                </div>

                {/* Info Container */}
                <div className="p-5">
                  <h3 className="font-extrabold text-[#005691] text-lg mb-1 group-hover:text-amber-600 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">
                    {member.role}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Office Location & Fast Inquiry Callout */}
        <div className="bg-gradient-to-r from-[#005691] via-[#004b7f] to-[#003861] rounded-3xl p-6 sm:p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
              <span className="material-symbols-outlined text-white text-2xl">location_on</span>
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-1">
                Head Office & Sourcing Hub
              </span>
              <h4 className="text-lg sm:text-xl font-bold mb-1">Visit or Contact Our Guangzhou Facility</h4>
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                Room 271, 2nd Floor, Fengchao Youth Innovation Community, No. 49 Dongjiaobei Road, Liwan District, Guangzhou, China
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <a
              href="https://wa.me/message/63ZBE2NPDE3FB1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-[240px] h-12 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black hover:from-zinc-600 hover:via-zinc-800 hover:to-neutral-950 text-white border border-zinc-500/50 font-bold px-4 rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-xl shadow-black/60 whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              <span>Direct WhatsApp Chat</span>
            </a>
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('inquiry-form-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-full sm:w-[240px] h-12 bg-white text-[#005691] hover:bg-gray-100 font-bold px-4 rounded-xl text-xs uppercase tracking-wider border border-white transition-all hover:scale-105 active:scale-95 duration-200 flex items-center justify-center gap-2 shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="material-symbols-outlined text-base">edit_note</span>
              <span>Start Sourcing RFQ</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
