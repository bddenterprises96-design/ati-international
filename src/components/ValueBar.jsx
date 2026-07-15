const VALUE_PROPS = [
  { icon: 'verified_user',          title: 'ISO 9001:2015 Certified', desc: 'Rigorous quality control for mission-critical components.' },
  { icon: 'precision_manufacturing', title: 'Advanced Machining',      desc: 'Zero-defect manufacturing with 0.001mm tolerance.' },
  { icon: 'public',                  title: 'Global Supply Chain',     desc: 'Strategic distribution hubs across five continents.' },
  { icon: 'engineering',             title: 'Expert Engineering',      desc: 'Direct access to technical consultants and CAD support.' },
]

export default function ValueBar() {
  return (
    <section className="bg-white border-b border-[#c5c6cd] py-16">
      <div className="max-w-[1280px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">
        {VALUE_PROPS.map((item) => (
          <div key={item.title} className="flex flex-col gap-3">
            <span className="material-symbols-outlined text-[#005691] text-4xl">{item.icon}</span>
            <p className="text-sm font-semibold tracking-wide text-[#005691]">{item.title}</p>
            <p className="text-sm text-[#505f76]">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}