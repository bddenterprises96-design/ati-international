import { useState } from 'react'

const DATA_SHEETS = {
  'valve-stem': {
    title: 'Valve Stem Seals — Technical Data Sheet',
    subtitle: 'Valve stem seals control oil flow to engine valve stems, ensuring proper lubrication while preventing oil leakage into the combustion chamber.',
    structureImage: '/assets/cylinder.png',
    structureCaption: 'Valve Stem Seal — Cross-Section Structure Diagram',
    theoryImage: '/assets/cyy.png',
    theoryCaption: 'Valve Stem Seal — Sealing Theory Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: 'Valve stem seals are precision engine components that regulate the flow of lubricant between the valve stem and valve guide. They help minimize oil consumption, reduce emissions, and maintain engine efficiency by preventing excess oil from entering the combustion chamber.',
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Accurately controls oil flow while maintaining proper lubrication of the valve stem.',
          'Constructed from high-temperature, oil-resistant materials to perform reliably under engine heat and pressure.',
          'Reduces wear, prevents oil burning and deposits, and extends the service life of the valve train.',
        ],
      },
      {
        heading: 'Basic Structure',
        content: 'A valve stem seal typically consists of a metal or reinforced casing combined with a rubber sealing lip. The sealing lip fits tightly around the valve stem, while the outer body is securely seated on the valve guide to maintain stable sealing during engine operation.',
        showImageAfter: 'structure',
      },
      {
        heading: 'Sealing Theory',
        content: 'As the valve moves up and down, the valve stem seal meters a controlled amount of oil along the valve stem. The elastic sealing lip prevents excess oil from entering the combustion chamber while ensuring sufficient lubrication to reduce wear and friction.',
        showImageAfter: 'theory',
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store in a clean, dry environment away from sunlight, heat, and chemicals.',
          'Handle carefully to avoid damage to the sealing lip.',
          'Use proper installation tools to prevent deformation or misalignment.',
          'Inspect for damage before installation to ensure reliable sealing performance.',
        ],
      },
      {
        heading: 'Usage Example',
        content: 'Automotive engines, commercial vehicles, motorcycles, agricultural machinery, and industrial engines, where precise oil control and long engine life are required.',
      },
    ],
  },
  'o-rings': {
    title: 'O-Rings — Technical Data Sheet',
    subtitle: 'O-Rings provide reliable static and dynamic sealing across a wide range of pressures, temperatures, and chemical environments.',
    structureImage: '/assets/il2.png',
    structureCaption: 'O-Ring — Cross-Section & Groove Dimension Diagram',
    theoryImage: '/assets/oo.png',
    theoryCaption: 'O-Ring — Pressure Sealing Theory Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: 'ATI O-Rings are torus-shaped sealing elements manufactured from elastomeric compounds. They create a pressure-tight seal when compressed between mating surfaces in static or dynamic applications, preventing fluid or gas leakage across a broad range of industrial environments.',
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Available in NBR, FKM (Viton), EPDM, Silicone, PTFE, and FFKM for maximum chemical compatibility.',
          'Suitable for static, dynamic, pneumatic, and hydraulic sealing applications.',
          'Hardness range of 40–90 Shore A for flexible or rigid sealing requirements.',
          'Compliant with DIN 3771, AS568, and JIS B2401 international standards.',
        ],
      },
      {
        heading: 'Basic Structure',
        content: 'An O-Ring is a simple, circular cross-section ring formed from a continuous elastomeric compound. Its geometry allows it to be compressed into a groove, creating a leak-free seal against mating surfaces under pressure.',
        showImageAfter: 'structure',
      },
      {
        heading: 'Sealing Theory',
        content: "When installed in a groove and subjected to system pressure, the O-Ring deforms elastically and presses against the groove walls and mating surface. This contact pressure, combined with the elastomer's natural resilience, creates a positive seal that increases with system pressure.",
        showImageAfter: 'theory',
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store in sealed packaging away from ozone, UV light, and solvents.',
          'Avoid stretching or twisting O-Rings during installation.',
          'Lubricate with compatible grease before fitting to prevent damage.',
          'Verify chemical compatibility with the sealing medium before use.',
        ],
      },
      {
        heading: 'Usage Example',
        content: 'Hydraulic cylinders, pneumatic systems, chemical processing equipment, food and beverage machinery, aerospace components, and oil and gas pipeline connections.',
      },
    ],
  },
  'oil-seals': {
    title: 'Oil Seals — Technical Data Sheet',
    subtitle: 'Oil seals retain lubricants and exclude contaminants in rotating and reciprocating shaft assemblies.',
    structureImage: '/assets/il.png',
    structureCaption: 'Oil Seal — Component Anatomy & Installation Diagram',
    theoryImage: '/assets/oo1.png',
    theoryCaption: 'Oil Seal — Hydrodynamic Sealing Theory Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: 'ATI Oil Seals (rotary shaft seals) are engineered to retain lubricants and exclude dust, water, and contaminants in rotating shaft assemblies. Available in single lip, double lip, and PTFE designs with spring-loaded sealing edges for consistent contact force across the full service life.',
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Spring-loaded sealing lip maintains consistent radial contact force across shaft speed variations.',
          'Available in single lip (lubricant retention) and double lip (lubricant + contamination exclusion) configurations.',
          'Compatible with mineral oil, synthetic lubricants, grease, water, and process fluids.',
          'Stainless steel (AISI 304) garter spring for corrosion resistance in harsh environments.',
        ],
      },
      {
        heading: 'Basic Structure',
        content: 'An oil seal consists of a metal outer casing, bonded elastomeric sealing lip, and a garter spring that applies radial force on the lip. The outer casing provides a press-fit into the housing bore, while the sealing lip makes contact with the rotating shaft.',
        showImageAfter: 'structure',
      },
      {
        heading: 'Sealing Theory',
        content: 'The garter spring presses the sealing lip against the rotating shaft surface, maintaining a thin hydrodynamic oil film. This film lubricates the lip-to-shaft interface while preventing bulk leakage. The secondary dust lip (on double-lip designs) excludes external contaminants.',
        showImageAfter: 'theory',
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store horizontally in original packaging to prevent lip deformation.',
          'Clean shaft and housing bore thoroughly before installation.',
          'Apply light grease to the sealing lip and shaft before fitting.',
          'Use a sleeve or installation tool — never hammer directly on the seal face.',
          'Verify shaft hardness (55–65 HRC) and surface finish (Ra 0.2–0.8 μm) before installation.',
        ],
      },
      {
        heading: 'Usage Example',
        content: 'Gearboxes, axles and differentials, hydraulic pumps, electric motors, wind turbine gearboxes, and heavy construction equipment where shaft sealing and contamination exclusion are critical.',
      },
    ],
  },
}

const PRODUCTS = [
  {
    id: 'valve-stem',
    name: 'Valve Stem Seals',
    tagline: 'Precision lubrication control for high-performance engines',
    image: '/assets/aaa.png',
    hasDataSheet: true,
    description: 'ATI Valve Stem Seals are manufactured using high-grade Viton (FKM) and Silicone (VMQ) elastomers, engineered to provide consistent oil film control on valve stems. Designed for extreme thermal cycling and high-RPM environments in gasoline, diesel, and gas engines.',
    features: [
      'Operating temperature: -40°C to +230°C',
      'Pressure resistance: up to 10 bar',
      'Material options: FKM, VMQ, PTFE-coated',
      'Tolerance: ±0.01mm on critical dimensions',
      'Compatible with mineral, synthetic, and bio-based oils',
      'OEM cross-reference available on request',
    ],
    specs: [
      { part: 'ATI-VS-5022', material: 'Viton-75 (FKM)', dim: '22.0 × 3.5', temp: '-20 to +200°C', moq: '5,000'  },
      { part: 'ATI-VS-7822', material: 'Silicone VMQ',   dim: '18.0 × 2.0', temp: '-60 to +230°C', moq: '10,000' },
      { part: 'ATI-VS-4418', material: 'NBR-70',         dim: '14.0 × 2.5', temp: '-40 to +120°C', moq: '5,000'  },
    ],
    applications: ['Passenger Vehicles', 'Commercial Trucks', 'Industrial Engines', 'Marine Engines', 'Agricultural Equipment'],
  },
  {
    id: 'o-rings',
    name: 'O-Rings',
    tagline: 'Comprehensive material range for universal sealing',
    image: '/assets/ccc.png',
    hasDataSheet: true,
    description: 'ATI O-Rings are available in a comprehensive range of elastomeric materials, suitable for static, dynamic, pneumatic, and hydraulic applications. Our manufacturing covers metric (DIN 3771), imperial (AS568), and custom dimensions with full material traceability.',
    features: [
      'Materials: NBR, FKM (Viton), EPDM, Silicone, PTFE, FFKM',
      'Hardness range: 40–90 Shore A',
      'Sizes: 1mm ID to 1000mm+ ID, custom on request',
      'Temperature range: -70°C to +300°C (material dependent)',
      'DIN 3771, AS568, JIS B2401 compliant',
      'Chemical resistance data sheets available on request',
    ],
    specs: [
      { part: 'ATI-OR-991',    material: 'NBR-90 High Grade', dim: '140.2 × 8.0', temp: '-40 to +120°C', moq: '2,500' },
      { part: 'ATI-OR-FKM-50', material: 'Viton 75A',         dim: '50.0 × 3.0',  temp: '-20 to +200°C', moq: '2,000' },
      { part: 'ATI-OR-EPD-20', material: 'EPDM 70A',          dim: '20.0 × 2.5',  temp: '-50 to +150°C', moq: '5,000' },
    ],
    applications: ['Hydraulic Systems', 'Pneumatic Cylinders', 'Chemical Processing', 'Food & Beverage', 'Aerospace', 'Oil & Gas'],
  },
  {
    id: 'oil-seals',
    name: 'Oil Seals',
    tagline: 'Robust rotating shaft sealing against leakage and contamination',
    image: '/assets/bbb.png',
    hasDataSheet: true,
    description: 'ATI Oil Seals retain lubricants and exclude contaminants in rotating and reciprocating shaft assemblies. Available with single lip, double lip, and PTFE designs with spring-loaded sealing edges for superior long-term performance in demanding environments.',
    features: [
      'Types: Single lip, Double lip, PTFE / Hydrodynamic',
      'Shaft speed: up to 10,000 RPM',
      'Operating temperature: -30°C to +250°C',
      'Housing bore tolerance: h8 / H8 standard',
      'Spring material: Stainless steel (AISI 304)',
      'Custom lip geometries for special applications',
    ],
    specs: [
      { part: 'ATI-SL-12-B', material: 'Stainless / Viton',  dim: '88.0 OD × 65 ID', temp: '-30 to +250°C', moq: '1,000' },
      { part: 'ATI-SL-40-A', material: 'NBR Double Lip',     dim: '55.0 OD × 40 ID', temp: '-40 to +120°C', moq: '2,000' },
      { part: 'ATI-SL-80-P', material: 'PTFE Spring-Loaded', dim: '80.0 OD × 60 ID', temp: '-60 to +260°C', moq: '500'   },
    ],
    applications: ['Gearboxes', 'Axles & Differentials', 'Pumps & Compressors', 'Electric Motors', 'Wind Turbines', 'Heavy Equipment'],
  },
]

// ── Structure Image Block ─────────────────────────────────────────
function StructureImage({ src, caption }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="my-6 flex justify-center">
      <div className="px-0 py-0 bg-[#005691] flex items-center gap-0">
      </div>
      <div className="p-4">
        <img
          src={src}
          alt={caption}
          className="max-w-full h-42 object contain"
          onError={() => setFailed(true)}
        />
      </div>
      <div className="px-0 py-0 bg-[#eceef0] border-t border-[#c5c6cd]">
      </div>
    </div>
  )
}

// ── Data Sheet Modal ──────────────────────────────────────────────
function DataSheetModal({ productId, onClose }) {
  const sheet = DATA_SHEETS[productId]
  if (!sheet) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">

        {/* Modal Header */}
        <div className="bg-[#005691] rounded-t-2xl px-8 py-6 flex items-start justify-between gap-4">
          <div>
            <div className="text-white/70 text-xs font-semibold uppercase tracking-widest mb-2">
              Technical Data Sheet
            </div>
            <h2 className="text-xl font-bold text-white leading-snug">{sheet.title}</h2>
            <p className="text-white/70 text-sm mt-2 leading-relaxed">{sheet.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all"
          >
            <span className="material-symbols-outlined text-white text-xl">close</span>
          </button>
        </div>

        {/* Modal Body — scrollable */}
        <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">
          {sheet.sections.map((sec) => (
            <div key={sec.heading}>
              {/* Section heading */}
              <h3 className="font-bold text-[#005691] text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                {sec.heading}
              </h3>

              {/* Section content */}
              {sec.content && (
                <p className="text-[#505f76] text-sm leading-relaxed">{sec.content}</p>
              )}
              {sec.list && (
                <ul className="space-y-2">
                  {sec.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#505f76]">
                      <span className="w-5 h-5 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Structure image — shown after Basic Structure section only */}
              {sec.showImageAfter === 'structure' && (
                <div className="mt-4">
                  <StructureImage
                    src={sheet.structureImage}
                    caption={sheet.structureCaption}
                  />
                </div>
              )}

              {/* Theory image — shown after Sealing Theory section only */}
              {sec.showImageAfter === 'theory' && (
                <div className="mt-4">
                  <StructureImage
                    src={sheet.theoryImage}
                    caption={sheet.theoryCaption}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#c5c6cd] px-8 py-5 flex items-center justify-between gap-4 rounded-b-2xl bg-[#f7f9fb]">
          <p className="text-xs text-[#505f76]">ATI International — Confidential Technical Document</p>
          <button
            onClick={onClose}
            className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Products Page ────────────────────────────────────────────
export default function Products({ onNavigate }) {
  const [active, setActive]       = useState('valve-stem')
  const [sheetOpen, setSheetOpen] = useState(false)

  const product = PRODUCTS.find((p) => p.id === active)

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {sheetOpen && (
        <DataSheetModal productId={active} onClose={() => setSheetOpen(false)} />
      )}

      {/* Hero */}
      <section className="relative py-20 px-8 overflow-hidden">
        {/* Background image */}
        <img
          src="/assets/vvv.png"
          alt="ATI International Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Blue overlay so text stays readable, matches homepage style */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/10" />

        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">
            Our Produts
          </span>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">Industrial Product Catalogose</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Precision-sourced sealing components, supplied for demanding industrial applications worldwide.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-white border-b border-[#c5c6cd] sticky top-24 z-40">
        <div className="max-w-[1280px] mx-auto px-8 flex gap-2 overflow-x-auto">
          {PRODUCTS.map((p) => (
            <button
              key={p.id}
              onClick={() => { setActive(p.id); setSheetOpen(false) }}
              className={`px-8 py-5 font-semibold text-sm tracking-widest uppercase border-b-2 transition-all whitespace-nowrap ${
                active === p.id
                  ? 'border-[#005691] text-[#005691]'
                  : 'border-transparent text-[#505f76] hover:text-[#005691]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="rounded-2xl overflow-hidden h-80 hover:scale-110 transition-transform duration-500">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.background = '#eceef0' }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
            <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">
              {product.tagline}
            </p>
            <p className="text-[#505f76] leading-relaxed mb-8">{product.description}</p>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={() => onNavigate('Contact US')}
                className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
              >
                <span className="material-symbols-outlined text-sm">request_quote</span>
                Request Quote
              </button>
              <button
                onClick={() => product.hasDataSheet && setSheetOpen(true)}
                className="border border-[#005691] text-[#005691] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
              >
                <span className="material-symbols-outlined text-sm">description</span>
                Data Sheet
              </button>
            </div>
          </div>
        </div>

        {/* Features + Applications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white border border-[#c5c6cd] rounded-xl p-8">
            <h3 className="text-lg font-bold text-[#005691] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Key Features & Specifications
            </h3>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-[#505f76]">
                  <span className="material-symbols-outlined text-[#005691] text-sm mt-0.5">arrow_right</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white border border-[#c5c6cd] rounded-xl p-8">
            <h3 className="text-lg font-bold text-[#005691] mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">factory</span>
              Applications
            </h3>
            <div className="flex flex-wrap gap-3">
              {product.applications.map((a) => (
                <span key={a} className="px-4 py-2 bg-[#005691]/10 text-[#005691] rounded-full text-sm font-semibold">
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Specs Table */}
        <div className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden shadow-sm">
          <div className="bg-[#eceef0] px-8 py-4">
            <h3 className="font-bold text-[#005691] text-sm uppercase tracking-widest">
              Standard Part Numbers & MOQ
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c5c6cd]">
                  {['Part Number', 'Material', 'Dimensions (mm)', 'Temp Range', 'MOQ (units)', 'Action'].map((h) => (
                    <th key={h} className="p-5 font-semibold text-left text-xs uppercase tracking-widest text-[#005691]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {product.specs.map((row, i) => (
                  <tr key={row.part} className={`border-b border-[#c5c6cd] hover:bg-[#f2f4f6] transition-colors ${i % 2 === 1 ? 'bg-[#f1f5f9]' : ''}`}>
                    <td className="p-5 font-mono font-semibold text-[#005691]">{row.part}</td>
                    <td className="p-5 text-[#505f76]">{row.material}</td>
                    <td className="p-5 text-[#505f76]">{row.dim}</td>
                    <td className="p-5 text-[#505f76]">{row.temp}</td>
                    <td className="p-5 font-semibold text-[#005691]">{row.moq}</td>
                    <td className="p-5">
                      <button
                        onClick={() => onNavigate('Contact US')}
                        className="bg-[#005691] text-white px-4 py-2 rounded text-xs font-semibold hover:brightness-110 transition-all hover:scale-105 transition-transform duration-200"
                      >
                        Add to Inquiry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Custom CTA */}
        <div className="mt-10 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
            <p className="text-white/80">We manufacture bespoke sealing components to your exact drawings and technical requirements.</p>
          </div>
          <button
            onClick={() => onNavigate('Contact US')}
            className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-sm">engineering</span>
            Discuss Custom Order
          </button>
        </div>
      </div>
    </div>
  )
}