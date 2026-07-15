const FEATURES = [
  { icon: 'task_alt',       title: 'Full PPAP Support',       desc: 'Complete documentation and quality assurance for automotive compliance.' },
  { icon: 'local_shipping', title: 'Consolidated Shipping',   desc: 'Reduced logistics costs via strategic regional distribution centers.' },
  { icon: 'build',          title: 'Custom Engineering',      desc: 'Material testing and formulation for specific environmental extremes.' },
]

export default function GlobalReach() {
  return (
    <section className="py-20 bg-[#005691] text-white">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 rounded-xl overflow-hidden border border-white/20">
          <img alt="ATI Manufacturing" className="w-full h-[420px] object-cover"
            src="/src/assets/12.jpg" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-[32px] font-bold text-white mb-4">Optimized Supply Chain &amp; Global Reach</h2>
          <p className="text-base text-white/80 mb-8 leading-relaxed">
            ATI International ensures seamless distribution of essential sealing solutions.
            From custom material formulations to just-in-time delivery for high-volume manufacturing lines.
          </p>
          <div className="flex flex-col gap-6 mb-10">
            {FEATURES.map((f) => (
              <div key={f.title} className="flex items-start gap-4">
                <span className="material-symbols-outlined text-white/80 text-2xl mt-0.5">{f.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-sm text-white/70 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="border border-white text-white px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/10">Connect with Engineering</button>
            <button className="border border-white/40 text-white/80 px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/10">Review Inquiries</button>
          </div>
        </div>
      </div>
    </section>
  )
}