export default function Hero({ onNavigate }) {
  return (
    <section className="relative min-h-[560px] sm:h-[700px] pt-24 sm:pt-0 flex items-center overflow-hidden bg-[#005691]">

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
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-8 w-full">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-3 sm:mb-6 uppercase tracking-widest">
            Global Reach • Industrial Excellence
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-3 sm:mb-6 leading-[1.1]">
            Essential Sealing <br />Solutions for Global <br />Manufacturing.
          </h1>
          <p className="text-xs sm:text-lg text-white/90 mb-6 sm:mb-10 max-w-xl leading-relaxed">
            ATI delivers high-performance engine components to global manufacturers.
            Specializing in Valve Stem Seals, O-Rings, and bespoke industrial sealing solutions.
          </p>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5 sm:gap-4 max-w-sm sm:max-w-none">
            <button
              onClick={() => onNavigate('Products')}
              className="bg-white text-[#005691] px-3 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-sm font-semibold rounded-lg flex items-center justify-center gap-1.5 hover:bg-gray-50 shadow-xl"
            >
              <span>Explore Catalog</span>
              <span className="material-symbols-outlined text-sm sm:text-base">north_east</span>
            </button>
            <button
              onClick={() => onNavigate('Contact Us')}
              className="bg-gradient-to-b from-zinc-700 via-zinc-900 to-black hover:from-zinc-600 hover:via-zinc-800 hover:to-neutral-950 text-white border border-zinc-500/50 font-bold px-3 sm:px-8 py-2.5 sm:py-4 text-xs sm:text-sm rounded-xl flex items-center justify-center gap-1.5 shadow-xl shadow-black/60 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Get a Quote</span>
              <span className="material-symbols-outlined text-sm sm:text-base">request_quote</span>
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}