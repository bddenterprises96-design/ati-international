export default function Hero({ onNavigate }) {
  return (
    <section className="relative h-[7000px] flex items-center overflow-hidden bg-[#005691]">

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/assets/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">
            Global Reach • Industrial Excellence
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1]">
            Essential Sealing <br />Solutions for Global <br />Manufacturing.
          </h1>
          <p className="text-lg text-white/80 mb-10 max-w-xl leading-relaxed">
            ATI International delivers high-performance engine components to global manufacturers.
            Specializing in Valve Stem Seals, O-Rings, and bespoke industrial sealing solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('Products')}
              className="bg-white text-[#005691] px-8 py-4 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-gray-50 shadow-xl"
            >
              Explore Technical Catalog
              <span className="material-symbols-outlined text-base">north_east</span>
            </button>
            <button
              onClick={() => onNavigate('Contact US')}
              className="border border-white/40 text-white px-8 py-4 text-sm font-semibold rounded-lg hover:bg-white/10 flex items-center gap-2"
            >
              Get a Quote Today
              <span className="material-symbols-outlined text-base">lock_open</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}