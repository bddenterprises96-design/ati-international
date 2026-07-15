const PRODUCTS = [
  {
    id: 'valve', title: 'Valve Stem Seals', full: true,
    desc: 'High-precision seals designed for superior lubrication control and long-term durability.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBacu1UyFdmT5tZ33935RyMDiaNtYM89ficuEktUAUTWBy9q3Z7VXx24qaS2BX1aqpxXwRbLuXDsSmFLh76-yCV5p9Z77lRvY0JaMnYhm81yC9PqNtozkPWUotvFyNIwpDtJx2u2WLCxpr0uIyMqBs31XV2_uzLxe2im4Y0IAaEohrREurnh338DmCo40XaDd8-n-dkEmralKLK0RhJK68av6MVhkvFCzYGOoyY-c0BoBlWpBtuTcn5P83B4LBk6xVFBmrBITTcmoM',
  },
  {
    id: 'orings', title: 'O-Rings', cta: 'Technical Hub',
    desc: 'Comprehensive range of materials including Viton, Nitrile, and Silicone for chemical resistance.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBg-mRDB7QHIIfeVhpqR2BxtuP9PUAGZcXm6JwVIAarg6RIQy62e2YQCpXPEhA3h-vsrq7jW4sdL51Pp8gWiyfYpx8XKQnvRTKZSnLCTvnKAPdZSthScffxDSfW_0HGwty5aoMzVe_Eqy1wqVHS7EAGKrffBePbaqmgz6dSsqy58dnS4ttqQAs-rwia5L14xtS6t449JBOHL_IJ7VT6Cobz6O2euj5x43x4j6PIAXcsUOS6dlAhf6qIl-2Gfe5S0Mk7WNGVAmlfx-g',
  },
  {
    id: 'oilseals', title: 'Oil Seals', cta: 'Explore Dimensions',
    desc: 'Robust sealing solutions for rotating shafts, preventing leakage and contaminant ingress.',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByZ4iLcwmUOD6Rg6OXWhmqvN2ASFLB2x3LlXzGh-PK_0v8vtdklm2pZtR39I6m2y7RbgSim571HSnW--hAdbV54Am81vWMetokYXf9cdjP0rrQRXwcpl8_Fk-sVBNfPTkc6BeGD-K8Va7cE6FAMK69dAOoJAPYD0jNHuOkG-eWmrYtsJNcaWWrMMku0-cGy8SNMlG_xbxgfaXFsp0m14wNd2uELP1_zeTbVs27DV24ZWEJOnZ-70rrjel-EMPAAQuQml7N8_tSunA',
  },
]

export default function ProductCatalog() {
  return (
    <section className="py-20 max-w-[1280px] mx-auto px-8">
      <div className="mb-16 text-center max-w-3xl mx-auto">
        <h2 className="text-[32px] font-bold text-[#005691] mb-3">Industrial Catalog</h2>
        <p className="text-base text-[#505f76]">Our core product lines engineered for extreme thermal and mechanical stress.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-12 group relative overflow-hidden rounded-xl h-[450px] border border-[#c5c6cd]">
          <img alt="Valve Stem Seals" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={PRODUCTS[0].img} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#005691]/95 via-[#005691]/60 to-transparent" />
          <div className="absolute inset-y-0 left-0 p-12 flex flex-col justify-center max-w-2xl">
            <h3 className="text-[32px] font-bold text-white mb-4">{PRODUCTS[0].title}</h3>
            <p className="text-lg text-white/80 mb-8">{PRODUCTS[0].desc}</p>
            <div className="flex gap-4">
              <button className="bg-white text-[#005691] px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/4">View Specifications</button>
              <button className="border border-white/50 text-white px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/10">Request Quote</button>
            </div>
          </div>
        </div>
        {PRODUCTS.slice(1).map((p) => (
          <div key={p.id} className="md:col-span-6 group relative overflow-hidden rounded-xl h-[400px] border border-[#c5c6cd]">
            <img alt={p.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" src={p.img} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#005691]/95 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-2xl font-semibold text-white mb-2">{p.title}</h3>
              <p className="text-sm text-white/70 mb-4 max-w-md">{p.desc}</p>
               <button className="bg-white text-[#005691] px-8 py-3 text-sm font-semibold rounded">View Specifications</button>
               <button className="border border-white/50 text-white px-8 py-3 text-sm font-semibold rounded-lg hover:bg-white/10">Request Quote</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}