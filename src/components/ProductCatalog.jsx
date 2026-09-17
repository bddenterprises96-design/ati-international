const PRODUCTS = [
  {
    id: 'valve', title: 'Valve Stem Seals', full: true,
    desc: 'High-precision seals designed for superior lubrication control and long-term durability.',
    img: '/assets/cylinder.png',
  },
  {
    id: 'orings', title: 'O-Rings', cta: 'Technical Hub',
    desc: 'Comprehensive range of materials including Viton, Nitrile, and Silicone for chemical resistance.',
    img: '/assets/il2.png',
  },
  {
    id: 'oilseals', title: 'Oil Seals', cta: 'Explore Dimensions',
    desc: 'Robust sealing solutions for rotating shafts, preventing leakage and contaminant ingress.',
    img: '/assets/il.png',
  },
]

export default function ProductCatalog({ onNavigate }) {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-[32px] font-bold text-[#005691] mb-3">Industrial Catalog</h2>
        <p className="text-base text-[#505f76]">Our core product lines engineered for extreme thermal and mechanical stress.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12 group relative overflow-hidden rounded-xl h-[450px] border border-[#c5c6cd] bg-white p-4">
          <img
            alt="Valve Stem Seals"
            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            src={PRODUCTS[0].img}
            onError={(e) => { e.target.src = '/assets/cylinder.png' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005691]/95 via-[#005691]/75 to-transparent" />
          <div className="absolute inset-y-0 left-0 p-8 sm:p-12 flex flex-col justify-center max-w-2xl">
            <h3 className="text-2xl sm:text-[32px] font-bold text-white mb-4">{PRODUCTS[0].title}</h3>
            <p className="text-sm sm:text-lg text-white/80 mb-8">{PRODUCTS[0].desc}</p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => onNavigate && onNavigate('Products')}
                className="bg-white text-[#005691] px-6 sm:px-8 py-3 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-all cursor-pointer shadow-md"
              >
                View Specifications
              </button>
              <button
                onClick={() => onNavigate && onNavigate('Contact Us')}
                className="border border-white/50 text-white px-6 sm:px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/10 transition-all cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
        {PRODUCTS.slice(1).map((p) => (
          <div key={p.id} className="md:col-span-6 group relative overflow-hidden rounded-xl h-[400px] border border-[#c5c6cd] bg-white p-4">
            <img
              alt={p.title}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              src={p.img}
              onError={(e) => { e.target.src = p.id === 'orings' ? '/assets/il2.png' : '/assets/il.png' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#005691]/95 via-[#005691]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 sm:p-8 w-full">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-white/80 mb-6 max-w-md">{p.desc}</p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate && onNavigate('Products')}
                  className="bg-white text-[#005691] px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded hover:bg-gray-100 transition-all cursor-pointer shadow-md"
                >
                  View Specifications
                </button>
                <button
                  onClick={() => onNavigate && onNavigate('Contact Us')}
                  className="border border-white/50 text-white px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg hover:bg-white/10 transition-all cursor-pointer"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}