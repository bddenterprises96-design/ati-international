import { useState, useEffect, useRef } from 'react'

const DATA_SHEETS = {
  'valve-stem': {
    title: 'Valve Stem Seals ',
    subtitle: 'Valve stem seals control oil flow to engine valve stems, ensuring proper lubrication while preventing oil leakage into the combustion chamber.',
    structureImage: '/assets/cylinder.png',
    structureCaption: 'Valve Stem Seal Cross-Section Structure Diagram',
    theoryImage: '/assets/cyy.png',
    theoryCaption: 'Valve Stem Seal Sealing Theory Diagram',
    sections: [
      { heading: 'Product Description', content: 'Valve stem seals are precision engine components that regulate the flow of lubricant between the valve stem and valve guide. They help minimize oil consumption, reduce emissions, and maintain engine efficiency by preventing excess oil from entering the combustion chamber.' },
      { heading: 'Features & Benefits', list: ['Accurately controls oil flow while maintaining proper lubrication of the valve stem.', 'Constructed from high-temperature, oil-resistant materials to perform reliably under engine heat and pressure.', 'Reduces wear, prevents oil burning and deposits, and extends the service life of the valve train.'] },
      { heading: 'Basic Structure', content: 'A valve stem seal typically consists of a metal or reinforced casing combined with a rubber sealing lip. The sealing lip fits tightly around the valve stem, while the outer body is securely seated on the valve guide to maintain stable sealing during engine operation.', showImageAfter: 'structure' },
      { heading: 'Sealing Theory', content: 'As the valve moves up and down, the valve stem seal meters a controlled amount of oil along the valve stem. The elastic sealing lip prevents excess oil from entering the combustion chamber while ensuring sufficient lubrication to reduce wear and friction.', showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Store in a clean, dry environment away from sunlight, heat, and chemicals.', 'Handle carefully to avoid damage to the sealing lip.', 'Use proper installation tools to prevent deformation or misalignment.', 'Inspect for damage before installation to ensure reliable sealing performance.'] },
      { heading: 'Usage Example', content: 'Automotive engines, commercial vehicles, motorcycles, agricultural machinery, and industrial engines, where precise oil control and long engine life are required.' },
    ],
  },
  'o-rings': {
    title: 'O-Rings ',
    subtitle: 'O-Rings provide reliable static and dynamic sealing across a wide range of pressures, temperatures, and chemical environments.',
    structureImage: '/assets/il2.png',
    structureCaption: 'O-Ring Cross-Section & Groove Dimension Diagram',
    theoryImage: '/assets/oo.png',
    theoryCaption: 'O-Ring Pressure Sealing Theory Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI O-Rings are torus-shaped sealing elements manufactured from elastomeric compounds. They create a pressure-tight seal when compressed between mating surfaces in static or dynamic applications, preventing fluid or gas leakage across a broad range of industrial environments.' },
      { heading: 'Features & Benefits', list: ['Available in NBR, FKM (Viton), EPDM, Silicone, PTFE, and FFKM for maximum chemical compatibility.', 'Suitable for static, dynamic, pneumatic, and hydraulic sealing applications.', 'Hardness range of 40–90 Shore A for flexible or rigid sealing requirements.', 'Compliant with DIN 3771, AS568, and JIS B2401 international standards.'] },
      { heading: 'Standards', content: 'The O-Rings we supply comply with widely recognized international and regional standards, ensuring reliable performance and compatibility across industries. Key standards include ISO for global sizing, AS568 for aerospace dimensions, ASTM for material testing, and JIS/DIN/BS for metric sizing and performance.' },
      { heading: 'Product Types', content: 'Our O-Rings are available in a variety of standard designs to meet different industrial and commercial needs. Options include standard circular O-Rings for general sealing, quad-ring (X-Ring) profiles for improved stability, encapsulated O-Rings for chemical resistance, square-cut seals for high-pressure applications, and metallic O-Rings for extreme temperatures and pressures.' },
      { heading: 'Basic Structure', content: 'An O-Ring is a simple, circular cross-section ring formed from a continuous elastomeric compound. Its geometry allows it to be compressed into a groove, creating a leak-free seal against mating surfaces under pressure.', showImageAfter: 'structure' },
      { heading: 'Sealing Theory', content: "When installed in a groove and subjected to system pressure, the O-Ring deforms elastically and presses against the groove walls and mating surface. This contact pressure, combined with the elastomer's natural resilience, creates a positive seal that increases with system pressure.", showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Store in sealed packaging away from ozone, UV light, and solvents.', 'Avoid stretching or twisting O-Rings during installation.', 'Lubricate with compatible grease before fitting to prevent damage.', 'Verify chemical compatibility with the sealing medium before use.'] },
      { heading: 'Usage Example', content: 'Hydraulic cylinders, pneumatic systems, chemical processing equipment, food and beverage machinery, aerospace components, and oil and gas pipeline connections.' },
    ],
  },
  'oil-seals': {
    title: 'Oil Seals ',
    subtitle: 'Oil seals retain lubricants and exclude contaminants in rotating and reciprocating shaft assemblies.',
    structureImage: '/assets/il.png',
    structureCaption: 'Oil Seal Component Anatomy & Installation Diagram',
    theoryImage: '/assets/oo1.png',
    theoryCaption: 'Oil Seal Hydrodynamic Sealing Theory Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI Oil Seals (rotary shaft seals) are engineered to retain lubricants and exclude dust, water, and contaminants in rotating shaft assemblies. Available in single lip, double lip, and PTFE designs with spring-loaded sealing edges for consistent contact force across the full service life.' },
      { heading: 'Features & Benefits', list: ['Spring-loaded sealing lip maintains consistent radial contact force across shaft speed variations.', 'Available in single lip (lubricant retention) and double lip (lubricant + contamination exclusion) configurations.', 'Compatible with mineral oil, synthetic lubricants, grease, water, and process fluids.', 'Stainless steel (AISI 304) garter spring for corrosion resistance in harsh environments.'] },
      { heading: 'Basic Structure', content: 'An oil seal consists of a metal outer casing, bonded elastomeric sealing lip, and a garter spring that applies radial force on the lip. The outer casing provides a press-fit into the housing bore, while the sealing lip makes contact with the rotating shaft.', showImageAfter: 'structure' },
      { heading: 'Sealing Theory', content: 'The garter spring presses the sealing lip against the rotating shaft surface, maintaining a thin hydrodynamic oil film. This film lubricates the lip-to-shaft interface while preventing bulk leakage. The secondary dust lip (on double-lip designs) excludes external contaminants.', showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Store horizontally in original packaging to prevent lip deformation.', 'Clean shaft and housing bore thoroughly before installation.', 'Apply light grease to the sealing lip and shaft before fitting.', 'Use a sleeve or installation tool never hammer directly on the seal face.', 'Verify shaft hardness (55–65 HRC) and surface finish (Ra 0.2–0.8 μm) before installation.'] },
      { heading: 'Usage Example', content: 'Gearboxes, axles and differentials, hydraulic pumps, electric motors, wind turbine gearboxes, and heavy construction equipment where shaft sealing and contamination exclusion are critical.' },
    ],
  },
}

const PRODUCTS = [
  // ── INDUSTRIAL SEALS ────────────────────────────────────────────
  {
    id: 'industrial-seals',
    name: 'Industrial Seals',
    tagline: 'Complete industrial sealing solutions for demanding applications',
    image: '/assets/industrial-seals.png',
    hasDataSheet: false,
    isIndustrialGroup: true,
    description: 'ATI supplies a comprehensive range of industrial sealing components sourced from certified partner manufacturers. Our portfolio includes Valve Stem Seals, O-Rings, and Oil Seals, all engineered to deliver reliable performance across diverse industrial applications.',
    subProducts: [
      {
        id: 'valve-stem',
        name: 'Valve Stem Seals',
        tagline: 'Precision lubrication control for high-performance engines',
        image: '/assets/aaa.png',
        hasDataSheet: true,
        description: 'ATI supplies Valve Stem Seals produced from high-grade Viton (FKM) and Silicone (VMQ) elastomers, designed to provide consistent oil film control on valve stems. Sourced from certified partner manufacturers for extreme thermal cycling and high-RPM environments in gasoline, diesel, and gas engines.',
        features: ['Operating temperature: -40°C to +230°C', 'Pressure resistance: up to 10 bar', 'Material options: FKM, VMQ, PTFE-coated', 'Tolerance: ±0.01mm on critical dimensions', 'Compatible with mineral, synthetic, and bio-based oils', 'OEM cross-reference available on request'],
        specs: [
          { part: 'ATI-VS-5022', material: 'Viton-75 (FKM)', dim: '22.0 × 3.5', temp: '-20 to +200°C', moq: '5,000' },
          { part: 'ATI-VS-7822', material: 'Silicone VMQ',   dim: '18.0 × 2.0', temp: '-60 to +230°C', moq: '10,000' },
          { part: 'ATI-VS-4418', material: 'NBR-70',         dim: '14.0 × 2.5', temp: '-40 to +120°C', moq: '5,000' },
        ],
        applications: ['MotorCycles', 'E-Bikes', 'Industrial Engines', 'Marine Engines', 'Agricultural Equipment', 'Small Engine'],
      },
      {
        id: 'o-rings',
        name: 'O-Rings',
        tagline: 'Comprehensive material range for universal sealing',
        image: '/assets/ccc.png',
        hasDataSheet: true,
        description: 'ATI supplies O-Rings in a comprehensive range of elastomeric materials, suitable for static, dynamic, pneumatic, and hydraulic applications. Our supply catalogue covers metric (DIN 3771), imperial (AS568), and custom dimensions with full material traceability.',
        features: ['Materials: NBR, FKM (Viton), EPDM, Silicone, PTFE, FFKM', 'Hardness range: 40–90 Shore A', 'Sizes: 1mm ID to 1000mm+ ID, custom on request', 'Temperature range: -70°C to +300°C (material dependent)', 'DIN 3771, AS568, JIS B2401 compliant', 'Chemical resistance data sheets available on request'],
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
        features: ['Types: Single lip, Double lip, PTFE / Hydrodynamic', 'Shaft speed: up to 10,000 RPM', 'Operating temperature: -30°C to +250°C', 'Housing bore tolerance: h8 / H8 standard', 'Spring material: Stainless steel (AISI 304)', 'Custom lip geometries for special applications'],
        specs: [
          { part: 'ATI-SL-12-B', material: 'Stainless / Viton',  dim: '88.0 OD × 65 ID', temp: '-30 to +250°C', moq: '1,000' },
          { part: 'ATI-SL-40-A', material: 'NBR Double Lip',     dim: '55.0 OD × 40 ID', temp: '-40 to +120°C', moq: '2,000' },
          { part: 'ATI-SL-80-P', material: 'PTFE Spring-Loaded', dim: '80.0 OD × 60 ID', temp: '-60 to +260°C', moq: '500' },
        ],
        applications: ['Gearboxes', 'Axles & Differentials', 'Pumps & Compressors', 'Electric Motors', 'Wind Turbines', 'Heavy Equipment'],
      },
    ],
  },
  // ── MOTORCYCLES ─────────────────────────────────────────────────
  {
    id: 'motorcycle',
    name: 'Motorcycles',
    tagline: 'Complete sealing parts catalogue for motorcycle engines',
    image: '/assets/moto.png',
    hasDataSheet: false,
    partsOnly: true,
    description: 'ATI supplies a comprehensive range of sealing components specifically sourced for motorcycle engines. All parts are verified for fitment compatibility with leading motorcycle brands and engine types.',
    parts: [
      { partNo: 'ATI-MC-001', name: 'Valve Stem Seal — FKM',        compatibility: 'Honda, Yamaha 4-stroke',   moq: '1,000' },
      { partNo: 'ATI-MC-002', name: 'Valve Stem Seal — VMQ Silicone',compatibility: 'Kawasaki, Suzuki',         moq: '1,000' },
      { partNo: 'ATI-MC-003', name: 'Crankshaft Oil Seal',          compatibility: 'Universal 2-stroke & 4-stroke', moq: '500' },
      { partNo: 'ATI-MC-004', name: 'Gearbox Output Shaft Seal',    compatibility: 'Honda CG/CB Series',        moq: '500'   },
      { partNo: 'ATI-MC-005', name: 'Fork Dust Seal',               compatibility: '38mm / 41mm / 45mm fork',  moq: '1,000' },
      { partNo: 'ATI-MC-006', name: 'Fork Oil Seal',                compatibility: '38mm / 41mm / 45mm fork',  moq: '1,000' },
      { partNo: 'ATI-MC-007', name: 'Carburetor O-Ring Kit',        compatibility: 'Multi-brand universal',     moq: '500'   },
      { partNo: 'ATI-MC-008', name: 'Clutch Cover Gasket Seal',     compatibility: 'Yamaha YBR / FZ Series',   moq: '500'   },
      { partNo: 'ATI-MC-009', name: 'Cam Chain Tensioner Seal',     compatibility: 'Honda, Yamaha 4-stroke',   moq: '1,000' },
      { partNo: 'ATI-MC-010', name: 'Wheel Hub Oil Seal — Rear',    compatibility: 'Universal 100–120mm shaft', moq: '500'   },
    ],
  },
  // ── E-BIKE ─────────────────────────────────────────────────────
  {
    id: 'e-bike',
    name: 'E-Bike',
    tagline: 'Precision sealing parts for electric bicycle drive systems',
    image: '/assets/ebike.png',
    hasDataSheet: false,
    partsOnly: true,
    description: 'ATI supplies sealing components engineered for electric bicycle mid-drive and hub-drive motor systems. Sourced for compatibility with leading e-bike motor brands and battery enclosure standards.',
    parts: [
      { partNo: 'ATI-EB-001', name: 'Mid-Drive Motor Output Seal',    compatibility: 'Bafang BBS01/BBS02/BBSHD',  moq: '500'   },
      { partNo: 'ATI-EB-002', name: 'Hub Motor Axle Seal',            compatibility: 'Universal 14mm / 12mm axle', moq: '500'   },
      { partNo: 'ATI-EB-003', name: 'Controller Housing O-Ring',      compatibility: 'IP65 waterproof enclosures',  moq: '1,000' },
      { partNo: 'ATI-EB-004', name: 'Battery Pack Connector O-Ring',  compatibility: 'XT60 / Anderson connectors',  moq: '1,000' },
      { partNo: 'ATI-EB-005', name: 'Bottom Bracket Seal',            compatibility: 'Shimano Steps / Bosch CX',   moq: '500'   },
      { partNo: 'ATI-EB-006', name: 'Rear Derailleur Gear Seal',      compatibility: 'Universal 8/9/10-speed',      moq: '1,000' },
      { partNo: 'ATI-EB-007', name: 'Suspension Fork Oil Seal',       compatibility: '32mm / 34mm air forks',       moq: '500'   },
      { partNo: 'ATI-EB-008', name: 'Throttle Grip O-Ring',           compatibility: 'Universal 22mm handlebar',    moq: '1,000' },
      { partNo: 'ATI-EB-009', name: 'Display Unit Gasket Seal',       compatibility: 'IP67 display housings',       moq: '1,000' },
      { partNo: 'ATI-EB-010', name: 'Charging Port Waterproof Seal',  compatibility: 'Universal DC barrel / USB-C', moq: '1,000' },
    ],
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
              <h3 className="font-bold text-[#005691] text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                {sec.heading}
              </h3>
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
              {sec.showImageAfter === 'structure' && (
                <div className="mt-4">
                  <StructureImage src={sheet.structureImage} caption={sheet.structureCaption} />
                </div>
              )}
              {sec.showImageAfter === 'theory' && (
                <div className="mt-4">
                  <StructureImage src={sheet.theoryImage} caption={sheet.theoryCaption} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-[#c5c6cd] px-8 py-5 flex items-center justify-between gap-4 rounded-b-2xl bg-[#f7f9fb]">
          <p className="text-xs text-[#505f76]">ATI Confidential Technical Document</p>
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

// ── Sub-Product Navigation Bar ──────────────────────────────────
function SubProductNav({ subProducts, activeSub, onSelect, onBack }) {
  return (
    <div className="sticky top-40 z-30 bg-gradient-to-r from-[#005691]/100 to-[#0077be]/0 shadow-sm transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-8 py-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1 text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 transform"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="text-sm font-semibold hidden sm:inline">Back</span>
          </button>
          
          {/* Divider */}
          <div className="w-px h-8 bg-white/30 mx-2 hidden sm:block"></div>
          
          {/* Sub-Product Buttons */}
          {subProducts.map((sub, index) => (
            <button
              key={sub.id}
              onClick={() => onSelect(sub.id)}
              className={`
                relative px-5 py-2 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300
                ${activeSub === sub.id 
                  ? 'bg-white text-[#005691] shadow-lg transform scale-105' 
                  : 'text-white/80 hover:text-white hover:bg-white/20 hover:scale-105'
                }
                transform transition-all duration-300 ease-in-out
                hover:shadow-md
                group
                animate-fadeInUp
              `}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both'
              }}
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {activeSub === sub.id && (
                  <span className="material-symbols-outlined text-sm animate-bounceIn">check_circle</span>
                )}
                {sub.name}
              </span>
              {activeSub === sub.id && (
                <span className="absolute inset-0 rounded-lg bg-white/10 animate-pulse-subtle" />
              )}
            </button>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounceIn {
          0% {
            transform: scale(0);
          }
          50% {
            transform: scale(1.2);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.3;
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s ease-out;
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// ── Product Detail Sub-Component ──────────────────────────────────
function ProductDetail({ product, onNavigate, setSheetOpen, selectedSubProduct, onSelectSubProduct, onBackToMain }) {
  if (product.isIndustrialGroup) {
    // If a sub-product is selected, show its full details with navigation
    if (selectedSubProduct) {
      const sub = product.subProducts.find(p => p.id === selectedSubProduct)
      if (!sub) return null

      return (
        <div className="space-y-12">
          {/* Sub-Product Navigation Bar - Sticky with Back Button */}
          <SubProductNav 
            subProducts={product.subProducts} 
            activeSub={selectedSubProduct} 
            onSelect={onSelectSubProduct}
            onBack={onBackToMain}
          />

          {/* Sub-Product Full Details with animation */}
          <div className="animate-slideIn">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
              <div className="rounded-2xl overflow-hidden h-80 animate-zoomIn">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.style.background = '#eceef0' }}
                />
              </div>
              <div className="flex flex-col justify-center animate-fadeInRight">
                <h2 className="text-3xl font-bold text-[#005691] mb-2">{sub.name}</h2>
                <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">
                  {sub.tagline}
                </p>
                <p className="text-[#505f76] leading-relaxed mb-8">{sub.description}</p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => onNavigate('Contact Us')}
                    className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">request_quote</span>
                    Request Quote
                  </button>
                  {sub.hasDataSheet && (
                    <button
                      onClick={() => setSheetOpen(sub.id)}
                      className="border border-[#005691] text-[#005691] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
                    >
                      <span className="material-symbols-outlined text-sm">description</span>
                      Data Sheet
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Features + Applications */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 animate-fadeInUp">
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#005691] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Key Features & Specifications
                </h3>
                <ul className="space-y-3">
                  {sub.features.map((f, index) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#505f76] animate-slideInLeft" style={{ animationDelay: `${index * 0.1}s` }}>
                      <span className="material-symbols-outlined text-[#005691] text-sm mt-0.5">arrow_right</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-lg font-bold text-[#005691] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">factory</span>
                  Applications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sub.applications.map((a, index) => (
                    <span 
                      key={a} 
                      className="px-4 py-2 bg-[#005691]/10 text-[#005691] rounded-full text-sm font-semibold animate-scaleIn"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Specs Table */}
            <div className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden shadow-sm animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
                    {sub.specs.map((row, i) => (
                      <tr key={row.part} className={`border-b border-[#c5c6cd] hover:bg-[#f2f4f6] transition-colors ${i % 2 === 1 ? 'bg-[#f1f5f9]' : ''} animate-fadeIn`} style={{ animationDelay: `${i * 0.1}s` }}>
                        <td className="p-5 font-mono font-semibold text-[#005691]">{row.part}</td>
                        <td className="p-5 text-[#505f76]">{row.material}</td>
                        <td className="p-5 text-[#505f76]">{row.dim}</td>
                        <td className="p-5 text-[#505f76]">{row.temp}</td>
                        <td className="p-5 font-semibold text-[#005691]">{row.moq}</td>
                        <td className="p-5">
                          <button
                            onClick={() => onNavigate('Contact Us')}
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
            <div className="mt-5 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
                <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
              </div>
              <button
                onClick={() => onNavigate('Contact Us')}
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

    // Show the three-column view - No image, only heading and description
    return (
      <div className="space-y-12">
        {/* Group Description - No Image */}
        <div className="mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
          <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">
            {product.tagline}
          </p>
          <p className="text-[#505f76] leading-relaxed max-w-4xl">{product.description}</p>
        </div>

        {/* Three Column Sub-Products - Clickable Cards with Request Quote Button */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.subProducts.map((sub, index) => (
            <div 
              key={sub.id} 
              className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105 transform duration-300 cursor-pointer group animate-scaleIn"
              style={{ animationDelay: `${index * 0.15}s` }}
              onClick={() => onSelectSubProduct(sub.id)}
            >
              <div className="h-48 overflow-hidden bg-[#f7f9fb]">
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.style.background = '#eceef0' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#005691] mb-2">{sub.name}</h3>
                <p className="text-sm text-[#505f76] leading-relaxed mb-4">{sub.tagline}</p>
                <div className="flex flex-col gap-2">
                  <button 
                    className="w-full bg-[#005691] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 transform duration-200 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate('Contact Us')
                    }}
                  >
                    <span className="material-symbols-outlined text-sm">request_quote</span>
                    Request Quote
                  </button>
                  <div className="flex gap-2">
                    <button 
                      className="flex-1 bg-[#005691]/10 text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/20 transition-all hover:scale-105 transform duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectSubProduct(sub.id)
                      }}
                    >
                      View Details
                    </button>
                    {sub.hasDataSheet && (
                      <button
                        className="border border-[#005691] text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all hover:scale-105 transform duration-200"
                        onClick={(e) => {
                          e.stopPropagation()
                          setSheetOpen(sub.id)
                        }}
                      >
                        <span className="material-symbols-outlined text-sm">description</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom CTA */}
        <div className="mt-10 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
            <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
          </div>
          <button
            onClick={() => onNavigate('Contact Us')}
            className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
          >
            <span className="material-symbols-outlined text-sm">engineering</span>
            Discuss Custom Order
          </button>
        </div>
      </div>
    )
  }

  // Parts-only view for Motorcycles & E-Bike
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="rounded-2xl overflow-hidden h-80 animate-zoomIn">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.background = '#eceef0' }}
          />
        </div>
        <div className="flex flex-col justify-center animate-fadeInRight">
          <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
          <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">
            {product.tagline}
          </p>
          <p className="text-[#505f76] leading-relaxed mb-8">{product.description}</p>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => onNavigate('Contact Us')}
              className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
            >
              <span className="material-symbols-outlined text-sm">request_quote</span>
              Request Quote
            </button>
          </div>
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden shadow-sm animate-fadeInUp">
        <div className="bg-[#eceef0] px-8 py-4">
          <h3 className="font-bold text-[#005691] text-sm uppercase tracking-widest">
            Parts List & MOQ — {product.name}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#c5c6cd]">
                {['Part Number', 'Part Name', 'Compatibility', 'MOQ (units)', 'Action'].map((h) => (
                  <th key={h} className="p-5 font-semibold text-left text-xs uppercase tracking-widest text-[#005691]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {product.parts.map((row, i) => (
                <tr key={row.partNo} className={`border-b border-[#c5c6cd] hover:bg-[#f2f4f6] transition-colors ${i % 2 === 1 ? 'bg-[#f1f5f9]' : ''} animate-fadeIn`} style={{ animationDelay: `${i * 0.05}s` }}>
                  <td className="p-5 font-mono font-semibold text-[#005691]">{row.partNo}</td>
                  <td className="p-5 text-[#505f76] font-medium">{row.name}</td>
                  <td className="p-5 text-[#505f76]">{row.compatibility}</td>
                  <td className="p-5 font-semibold text-[#005691]">{row.moq}</td>
                  <td className="p-5">
                    <button
                      onClick={() => onNavigate('Contact Us')}
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
      <div className="mt-10 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
        <div>
          <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
          <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
        </div>
        <button
          onClick={() => onNavigate('Contact Us')}
          className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap flex items-center gap-2 hover:bg-grey/20 hover:scale-105 transition-transform duration-200"
        >
          <span className="material-symbols-outlined text-sm">engineering</span>
          Discuss Custom Order
        </button>
      </div>
    </div>
  )
}

// ── Main Products Page ────────────────────────────────────────────
export default function Products({ onNavigate }) {
  const [active, setActive] = useState('industrial-seals')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeSubProduct, setActiveSubProduct] = useState(null)

  const product = PRODUCTS.find((p) => p.id === active)

  const handleSheetOpen = (subId) => {
    setActiveSubProduct(subId)
    setSheetOpen(true)
  }

  const handleSelectSubProduct = (subId) => {
    setActiveSubProduct(subId)
    // Scroll to top of content when selecting a sub-product
    window.scrollTo({ top: 240, behavior: 'smooth' })
  }

  const handleBackToMain = () => {
    setActiveSubProduct(null)
    // Scroll to top of content when going back
    window.scrollTo({ top: 200, behavior: 'smooth' })
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {sheetOpen && (
        <DataSheetModal 
          productId={activeSubProduct} 
          onClose={() => setSheetOpen(false)} 
        />
      )}

      {/* Hero */}
      <section className="relative -mt-20 pt-40 pb-20 px-8 overflow-hidden">
        <img
          src="/assets/vvv.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">
            Our Products
          </span>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">Industrial Product Catalogue</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Quality-verified sealing components sourced from certified partner manufacturers, supplied for demanding industrial applications worldwide.
          </p>
        </div>
      </section>

      {/* Tabs - Main Navigation - Sticky */}
      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex gap-9 overflow-x-auto py-4">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => { 
                  setActive(p.id)
                  setActiveSubProduct(null)
                  setSheetOpen(false) 
                }}
                className={`
                  px-6 py-3 rounded-lg font-semibold text-md tracking-wide transition-all duration-300 whitespace-nowrap
                  ${active === p.id 
                    ? 'bg-[#005691] text-white shadow-lg transform scale-105' 
                    : 'text-[#505f76] hover:text-[#005691] hover:bg-[#005691]/10'
                  }
                  transform transition-all duration-300 ease-in-out
                  hover:scale-105
                `}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Detail */}
      <div className="max-w-[1280px] mx-auto px-8 py-10">
        <ProductDetail 
          product={product} 
          onNavigate={onNavigate} 
          setSheetOpen={handleSheetOpen}
          selectedSubProduct={activeSubProduct}
          onSelectSubProduct={handleSelectSubProduct}
          onBackToMain={handleBackToMain}
        />
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-15px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fadeInRight {
          animation: fadeInRight 0.6s ease-out forwards;
        }
        .animate-fadeInLeft {
          animation: fadeInLeft 0.6s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.5s ease-out forwards;
        }
        .animate-slideIn {
          animation: slideIn 0.6s ease-out forwards;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  )
}