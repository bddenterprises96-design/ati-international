import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

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
      { heading: 'Usage Example', content: 'Gearboxes, axles and differials, hydraulic pumps, electric motors, wind turbine gearboxes, and heavy construction equipment where shaft sealing and contamination exclusion are critical.' },
    ],
  },
}

// ── MOTORCYCLE PARTS DATA ─────────────────────────────────────────
const MOTORCYCLE_PARTS = {
  'Engine Parts': [
    'Cylinder Head', 'Cylinder Block', 'Piston', 'Piston Rings', 'Piston Pin',
    'Connecting Rod', 'Crankshaft', 'Camshaft', 'Valves', 'Valve Stem Seals',
    'Valve Guides', 'Valve Springs', 'Rocker Arms', 'Timing Chain',
    'Timing Chain Tensioner', 'Cam Chain Guide', 'Oil Pump', 'Oil Filter',
    'Oil Seals', 'O-Rings', 'Gaskets', 'Engine Bearings', 'Crankcase',
    'Clutch Cover'
  ],
  'Transmission & Clutch': [
    'Clutch Plates', 'Clutch Friction Plates', 'Clutch Basket', 'Clutch Hub',
    'Clutch Springs', 'Clutch Cable', 'Gear Shift Drum', 'Gear Shift Fork',
    'Transmission Gears', 'Drive Shaft', 'Counter Shaft', 'Kick Starter'
  ],
  'Fuel System': [
    'Fuel Tank', 'Fuel Pump', 'Carburetor', 'Fuel Injector', 'Throttle Body',
    'Fuel Filter', 'Fuel Hose', 'Fuel Cap'
  ],
  'Air Intake System': [
    'Air Filter', 'Air Filter Element', 'Air Cleaner Box', 'Intake Manifold',
    'Throttle Cable'
  ],
  'Exhaust System': [
    'Exhaust Pipe', 'Muffler', 'Silencer', 'Exhaust Gasket', 'Exhaust Heat Shield'
  ],
  'Cooling System': [
    'Radiator', 'Cooling Fan', 'Water Pump', 'Thermostat', 'Radiator Hose',
    'Coolant Reservoir'
  ],
  'Brake System': [
    'Brake Disc (Rotor)', 'Brake Drum', 'Brake Pads', 'Brake Shoes',
    'Brake Caliper', 'Brake Master Cylinder', 'Brake Pedal',
    'Brake Hose', 'Brake Fluid Reservoir'
  ],
  'Suspension & Steering': [
    'Front Fork', 'Rear Shock Absorber', 'Triple Clamp', 'Steering Stem',
    'Swing Arm', 'Swing Arm Bush', 'Suspension Linkage'
  ],
  'Wheels & Tires': [
    'Alloy Wheel', 'Spoked Wheel', 'Wheel Hub', 'Wheel Bearing', 'Tire',
    'Tube', 'Rim', 'Spokes', 'Axle Shaft'
  ],
  'Chain Drive': [
    'Drive Chain', 'Front Sprocket', 'Rear Sprocket', 'Chain Tensioner',
    'Chain Guard'
  ],
  'Electrical Parts': [
    'Battery', 'Stator', 'Magneto', 'CDI Unit', 'ECU', 'Ignition Coil',
    'Spark Plug', 'Starter Motor', 'Starter Relay', 'Regulator Rectifier',
    'Wiring Harness', 'Fuse Box'
  ],
  'Lighting': [
    'LED Headlight', 'Tail Light', 'Brake Light', 'Turn Signal',
    'Indicator Relay', 'Number Plate Light'
  ],
  'Controls': [
    'Handlebar', 'Handle Grips', 'Throttle Grip', 'Brake Lever',
    'Clutch Lever', 'Foot Peg', 'Side Stand', 'Center Stand', 'Mirrors',
    'Gear Lever'
  ],
  'Body Parts': [
    'Fuel Tank Cover', 'Front Fender', 'Rear Fender', 'Side Covers',
    'Fairings', 'Seat', 'Seat Cover', 'Rear Carrier', 'Chain Cover'
  ],
  'Rubber & Sealing Components': [
    'Rubber Bushes', 'Dust Seals', 'Rubber Mounts', 'Rubber Grommets',
    'Rubber Dampers'
  ],
  'Accessories': [
    'Phone Holder', 'USB Charger', 'Top Box', 'Side Box', 'Crash Guard',
    'Engine Guard', 'Windshield', 'Luggage Rack', 'LED Auxiliary Lights',
    'Helmet Lock', 'Hand Guards', 'Tank Pad', 'Frame Sliders'
  ]
}

// ── E-BIKE PARTS DATA ─────────────────────────────────────────────
const EBIKE_PARTS = {
  'Electric Drive System': [
    'Hub Motor', 'Mid-Drive Motor', 'Motor Controller', 'Motor Stator',
    'Motor Rotor', 'Motor Housing', 'Motor Bearings', 'Motor Shaft',
    'Motor Gears', 'Torque Sensor', 'Cadence Sensor'
  ],
  'Battery System': [
    'Lithium-Ion Battery Pack', 'Battery Cells', 'Battery Management System (BMS)',
    'Battery Charger', 'Charging Port', 'Battery Holder', 'Battery Mount',
    'Battery Lock', 'Battery Case'
  ],
  'Electrical Components': [
    'LCD Display', 'LED Display', 'Wiring Harness', 'Main Cable',
    'Controller Cable', 'Throttle', 'Thumb Throttle', 'Twist Throttle',
    'PAS (Pedal Assist Sensor)', 'Brake Sensor', 'Speed Sensor',
    'DC Converter', 'Fuse', 'Connectors'
  ],
  'Brake System': [
    'Hydraulic Brake Set', 'Mechanical Brake Set', 'Brake Caliper',
    'Brake Pads', 'Brake Disc (Rotor)', 'Brake Lever', 'Brake Cable',
    'Brake Hose'
  ],
  'Drivetrain': [
    'Crankset', 'Crank Arm', 'Chain', 'Chainring', 'Cassette', 'Freewheel',
    'Bottom Bracket', 'Derailleur', 'Gear Shifter', 'Pedals'
  ],
  'Suspension & Steering': [
    'Front Fork', 'Rear Suspension', 'Shock Absorber', 'Handlebar',
    'Stem', 'Headset', 'Steering Bearings'
  ],
  'Wheels & Tires': [
    'Front Wheel', 'Rear Wheel', 'Rim', 'Tire', 'Tube', 'Tubeless Tire',
    'Wheel Hub', 'Spokes', 'Wheel Bearings', 'Axle'
  ],
  'Frame & Body Parts': [
    'Aluminum Frame', 'Carbon Frame', 'Rear Rack', 'Front Basket',
    'Mudguards', 'Chain Guard', 'Kickstand', 'Seat Post', 'Saddle',
    'Seat Clamp'
  ],
  'Lighting & Safety': [
    'LED Headlight', 'Tail Light', 'Brake Light', 'Turn Indicators',
    'Reflectors', 'Horn', 'Bell'
  ],
  'Rubber & Sealing Components': [
    'O-Rings', 'Oil Seals', 'Dust Seals', 'Rubber Bushes',
    'Rubber Grommets', 'Rubber Dampers', 'Cable Boots', 'Rubber Mounts',
    'Silicone Seals', 'Protective Rubber Covers'
  ],
  'Fasteners & Hardware': [
    'Bolts', 'Nuts', 'Washers', 'Screws', 'Clamps', 'Mounting Brackets',
    'Frame Fasteners'
  ],
  'E-Bike Accessories': [
    'Phone Holder', 'Mobile Charging Port', 'Rear Carrier', 'Front Basket',
    'Water Bottle Holder', 'Rear View Mirror', 'Child Seat', 'Side Bag',
    'Pannier Bag', 'GPS Tracker', 'Security Lock', 'Helmet', 'Mud Flaps'
  ]
}

// ── GENERATE PRODUCT PARTS WITH CATEGORIES ────────────────────────
function generatePartsWithCategories(partsData) {
  const result = []
  Object.entries(partsData).forEach(([category, items]) => {
    items.forEach(item => {
      result.push({
        name: item,
        category: category,
        partNo: `ATI-${item.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`,
        moq: [500, 1000, 2000, 5000][Math.floor(Math.random() * 4)],
        selectedBrands: []
      })
    })
  })
  return result
}

// ── BRAND DATA ──────────────────────────────────────────────────────
const MOTORCYCLE_BRANDS = [
  'Honda', 'Yamaha', 'Kawasaki', 'Suzuki', 'Harley-Davidson',
  'BMW', 'Ducati', 'Triumph', 'KTM', 'Royal Enfield',
  'Bajaj', 'TVS', 'Hero', 'Aprilia', 'Moto Guzzi'
]

const EBIKE_BRANDS = [
  'Bafang', 'Bosch', 'Shimano Steps', 'Yamaha', 'Panasonic',
  'Trek', 'Specialized', 'Giant', 'Cannondale', 'Cube',
  'Haibike', 'Riese & Müller', 'Gazelle', 'KTM', 'Bulls'
]

const PRODUCTS = [
  {
    id: 'industrial-seals',
    name: 'Industrial Seals',
    tagline: 'Complete industrial sealing solutions for demanding applications',
    image: '/assets/industrial-seals.png',
    hasDataSheet: false,
    isIndustrialGroup: true,
    icon: '⚙️',
    description: 'ATI supplies a comprehensive range of industrial sealing components sourced from certified partner manufacturers.',
    subProducts: [
      {
        id: 'valve-stem',
        name: 'Valve Stem Seals',
        tagline: 'Precision lubrication control for high-performance engines',
        image: '/assets/aaa.png',
        hasDataSheet: true,
        description: 'ATI supplies Valve Stem Seals produced from high-grade Viton (FKM) and Silicone (VMQ) elastomers.',
        features: ['Operating temperature: -40°C to +230°C', 'Pressure resistance: up to 10 bar'],
        specs: [
          { part: 'ATI-VS-5022', material: 'Viton-75 (FKM)', dim: '22.0 × 3.5', temp: '-20 to +200°C', moq: '5,000' },
          { part: 'ATI-VS-7822', material: 'Silicone VMQ', dim: '18.0 × 2.0', temp: '-60 to +230°C', moq: '10,000' },
          { part: 'ATI-VS-4418', material: 'NBR-70', dim: '14.0 × 2.5', temp: '-40 to +120°C', moq: '5,000' },
        ],
        applications: ['MotorCycles', 'E-Bikes', 'Industrial Engines'],
      },
      {
        id: 'o-rings',
        name: 'O-Rings',
        tagline: 'Comprehensive material range for universal sealing',
        image: '/assets/ccc.png',
        hasDataSheet: true,
        description: 'ATI supplies O-Rings in a comprehensive range of elastomeric materials.',
        features: ['Materials: NBR, FKM (Viton), EPDM, Silicone, PTFE, FFKM', 'Hardness range: 40–90 Shore A'],
        specs: [
          { part: 'ATI-OR-991', material: 'NBR-90 High Grade', dim: '140.2 × 8.0', temp: '-40 to +120°C', moq: '2,500' },
          { part: 'ATI-OR-FKM-50', material: 'Viton 75A', dim: '50.0 × 3.0', temp: '-20 to +200°C', moq: '2,000' },
          { part: 'ATI-OR-EPD-20', material: 'EPDM 70A', dim: '20.0 × 2.5', temp: '-50 to +150°C', moq: '5,000' },
        ],
        applications: ['Hydraulic Systems', 'Pneumatic Cylinders', 'Chemical Processing'],
      },
      {
        id: 'oil-seals',
        name: 'Oil Seals',
        tagline: 'Robust rotating shaft sealing against leakage and contamination',
        image: '/assets/bbb.png',
        hasDataSheet: true,
        description: 'ATI Oil Seals retain lubricants and exclude contaminants in rotating and reciprocating shaft assemblies.',
        features: ['Types: Single lip, Double lip, PTFE / Hydrodynamic', 'Shaft speed: up to 10,000 RPM'],
        specs: [
          { part: 'ATI-OS-12-B', material: 'Stainless / Viton', dim: '88.0 OD × 65 ID', temp: '-30 to +250°C', moq: '1,000' },
          { part: 'ATI-OS-40-A', material: 'NBR Double Lip', dim: '55.0 OD × 40 ID', temp: '-40 to +120°C', moq: '2,000' },
          { part: 'ATI-OS-80-P', material: 'PTFE Spring-Loaded', dim: '80.0 OD × 60 ID', temp: '-60 to +260°C', moq: '500' },
        ],
        applications: ['Gearboxes', 'Pumps & Compressors', 'Electric Motors'],
      },
    ],
  },
  {
    id: 'motorcycle',
    name: 'Motorcycles',
    tagline: 'Complete sealing parts catalogue for motorcycle engines',
    image: '/assets/moto.png',
    hasDataSheet: false,
    partsOnly: true,
    icon: '🏍️',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600',
    description: 'ATI supplies a comprehensive range of sealing components specifically sourced for motorcycle engines.',
    parts: generatePartsWithCategories(MOTORCYCLE_PARTS),
    categories: Object.keys(MOTORCYCLE_PARTS),
    brands: MOTORCYCLE_BRANDS
  },
  {
    id: 'e-bike',
    name: 'E-Bike',
    tagline: 'Precision sealing parts for electric bicycle drive systems',
    image: '/assets/ebike.png',
    hasDataSheet: false,
    partsOnly: true,
    icon: '⚡',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'ATI supplies sealing components engineered for electric bicycle mid-drive and hub-drive motor systems.',
    parts: generatePartsWithCategories(EBIKE_PARTS),
    categories: Object.keys(EBIKE_PARTS),
    brands: EBIKE_BRANDS
  },
]

// ── Structure Image Block ─────────────────────────────────────────
function StructureImage({ src, caption }) {
  const [failed, setFailed] = useState(false)
  if (failed) return null
  return (
    <div className="my-6 flex justify-center">
      <div className="p-4">
        <img
          src={src}
          alt={caption}
          className="max-w-full h-42 object contain"
          onError={() => setFailed(true)}
        />
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
      onClick={onClose}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modalFade" onClick={e => e.stopPropagation()}>
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
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center flex-shrink-0 transition-all hover:rotate-90 duration-300"
          >
            <span className="material-symbols-outlined text-white text-xl">close</span>
          </button>
        </div>
        <div className="overflow-y-auto px-8 py-6 flex flex-col gap-5">
          {sheet.sections.map((sec, index) => (
            <div key={sec.heading} className="animate-sectionFade" style={{ animationDelay: `${index * 0.1}s` }}>
              <h3 className="font-bold text-[#005691] text-base mb-3 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                {sec.heading}
              </h3>
              {sec.content && <p className="text-[#505f76] text-sm leading-relaxed">{sec.content}</p>}
              {sec.list && (
                <ul className="space-y-2">
                  {sec.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#505f76] animate-listItem" style={{ animationDelay: `${i * 0.05}s` }}>
                      <span className="w-5 h-5 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {sec.showImageAfter === 'structure' && (
                <div className="mt-4 animate-imageFade">
                  <StructureImage src={sheet.structureImage} caption={sheet.structureCaption} />
                </div>
              )}
              {sec.showImageAfter === 'theory' && (
                <div className="mt-4 animate-imageFade">
                  <StructureImage src={sheet.theoryImage} caption={sheet.theoryCaption} />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="border-t border-[#c5c6cd] px-8 py-5 flex items-center justify-between gap-4 rounded-b-2xl bg-[#f7f9fb]">
          <p className="text-xs text-[#505f76]">ATI Confidential Technical Document</p>
          <button onClick={onClose} className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 duration-200">
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
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1 text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 transform"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="text-sm font-semibold hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-8 bg-white/30 mx-2 hidden sm:block"></div>
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
                hover:shadow-md group
              `}
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {activeSub === sub.id && (
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                )}
                {sub.name}
              </span>
              {activeSub === sub.id && (
                <span className="absolute inset-0 rounded-lg bg-white/10" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── PART BRAND DROPDOWN ───────────────────────────────────────────
const DROPDOWN_WIDTH = 208
const DROPDOWN_HEIGHT = 260

function PartBrandDropdown({ part, brands, selectedBrands, onBrandToggle, isOpen, onToggle }) {
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        onToggle(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onToggle])

  useEffect(() => {
    if (!isOpen || !buttonRef.current) return

    const computePosition = () => {
      const rect = buttonRef.current.getBoundingClientRect()
      let top = rect.bottom + 4
      let left = rect.left

      if (top + DROPDOWN_HEIGHT > window.innerHeight - 8) {
        const above = rect.top - DROPDOWN_HEIGHT - 4
        top = above < 8 ? 8 : above
      }

      if (left + DROPDOWN_WIDTH > window.innerWidth - 8) {
        left = window.innerWidth - DROPDOWN_WIDTH - 8
      }
      if (left < 8) left = 8

      setPosition({ top, left })
    }

    computePosition()
    window.addEventListener('scroll', computePosition, true)
    window.addEventListener('resize', computePosition)
    return () => {
      window.removeEventListener('scroll', computePosition, true)
      window.removeEventListener('resize', computePosition)
    }
  }, [isOpen])

  const selectedCount = selectedBrands ? selectedBrands.length : 0

  return (
    <div className="relative inline-block flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          onToggle(!isOpen)
        }}
        className={`
          w-7 h-7 rounded border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0
          ${isOpen 
            ? 'border-[#005691] bg-[#005691]/10 text-[#005691]' 
            : 'border-gray-300 hover:border-[#005691] text-gray-400 hover:text-[#005691]'
          }
          ${selectedCount > 0 ? 'border-[#005691] bg-[#005691]/5' : ''}
        `}
        title="Select brands for this part"
      >
        <span className="material-symbols-outlined text-sm">expand_more</span>
        {selectedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#005691] text-white text-[8px] font-bold flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </button>

      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] p-3 max-h-56 overflow-y-auto"
          style={{ top: position.top, left: position.left, width: DROPDOWN_WIDTH, minWidth: '180px' }}
        >
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-200">
            <span className="text-xs font-semibold text-gray-700 truncate pr-2" title={part.name}>
              {part.name}
            </span>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const allBrands = [...brands]
                  onBrandToggle(part, allBrands)
                  onToggle(false)
                }}
                className="text-[10px] text-[#005691] hover:underline font-medium"
              >
                All
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onBrandToggle(part, [])
                  onToggle(false)
                }}
                className="text-[10px] text-red-500 hover:underline font-medium"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-1">
            {brands.map((brand) => {
              const isSelected = selectedBrands && selectedBrands.includes(brand)
              return (
                <label
                  key={brand}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) => {
                      e.stopPropagation()
                      onBrandToggle(part, brand)
                    }}
                    className="w-4 h-4 accent-[#005691] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              )
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-400">
              {selectedCount} brand{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ── PART ITEM WITH SELECTION ──────────────────────────────────────
function PartItem({ part, onSelect, isSelected, brands, selectedBrands, onBrandToggle, isDropdownOpen, onDropdownToggle }) {
  return (
    <div 
      className={`
        flex items-center gap-1 sm:gap-2 px-1.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-200 group
        ${isSelected 
          ? 'bg-yellow-100 border-2 border-yellow-400 shadow-md' 
          : 'hover:bg-yellow-100 hover:shadow-sm hover:scale-[1.02]'
        }
      `}
    >
      <span className={`
        w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full transition-all duration-300 flex-shrink-0
        ${isSelected 
          ? 'bg-yellow-500 scale-150' 
          : 'bg-gradient-to-r from-[#005691] to-[#0077be] group-hover:bg-yellow-500 group-hover:scale-150'
        }
      `}></span>

      {brands && brands.length > 0 && (
        <PartBrandDropdown 
          part={part}
          brands={brands}
          selectedBrands={selectedBrands}
          onBrandToggle={onBrandToggle}
          isOpen={isDropdownOpen}
          onToggle={(state) => onDropdownToggle(part, state)}
        />
      )}

      <div 
        onClick={() => onSelect(part)}
        className="flex items-center gap-1 sm:gap-2 flex-1 cursor-pointer min-w-0"
      >
        <span className="text-[10px] sm:text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200 flex-1 font-medium truncate">
          {part.name}
        </span>
        <span className="text-[8px] sm:text-[10px] text-gray-400 font-mono bg-gray-100 group-hover:bg-yellow-200 px-1 sm:px-1.5 py-0.5 rounded transition-all duration-200 flex-shrink-0">
          {part.partNo}
        </span>
      </div>

      <button 
        className={`
          transition-all duration-200 flex-shrink-0
          ${isSelected 
            ? 'text-green-600 opacity-100' 
            : 'opacity-0 group-hover:opacity-100 text-[#005691] hover:text-[#0077be]'
          }
        `}
        onClick={(e) => {
          e.stopPropagation()
          onSelect(part)
        }}
      >
        <span className="material-symbols-outlined text-sm sm:text-base">
          {isSelected ? 'check_circle' : 'add_circle'}
        </span>
      </button>
    </div>
  )
}

// ── CONFIRM ORDER MODAL ────────────────────────────────────────────
function ConfirmOrderModal({ isOpen, onClose, onConfirm, selectedParts, onUpdateSelection }) {
  const [localSelectedParts, setLocalSelectedParts] = useState([])

  useEffect(() => {
    if (isOpen) {
      setLocalSelectedParts(JSON.parse(JSON.stringify(selectedParts)))
    }
  }, [isOpen, selectedParts])

  if (!isOpen) return null

  let totalItems = 0
  const allBrandsSet = new Set()
  const flattenedItems = []

  localSelectedParts.forEach(part => {
    if (part.selectedBrands && part.selectedBrands.length > 0) {
      const brands = part.selectedBrands
      totalItems += brands.length
      brands.forEach(b => allBrandsSet.add(b))
      
      brands.forEach(brand => {
        flattenedItems.push({
          ...part,
          brand: brand
        })
      })
    }
  })

  const uniqueBrandCount = allBrandsSet.size
  const totalParts = localSelectedParts.filter(p => p.selectedBrands && p.selectedBrands.length > 0).length

  const toggleItemSelection = (partName, brand) => {
    setLocalSelectedParts(prev => {
      return prev.map(p => {
        if (p.name === partName) {
          let newBrands = [...(p.selectedBrands || [])]
          if (newBrands.includes(brand)) {
            newBrands = newBrands.filter(b => b !== brand)
          } else {
            newBrands = [...newBrands, brand]
          }
          return { ...p, selectedBrands: newBrands }
        }
        return p
      })
    })
  }

  const toggleAllForPart = (partName) => {
    setLocalSelectedParts(prev => {
      return prev.map(p => {
        if (p.name === partName) {
          const allBrands = p.selectedBrands || []
          const originalPart = selectedParts.find(sp => sp.name === partName)
          const originalBrands = originalPart?.selectedBrands || []
          const allSelected = allBrands.length === originalBrands.length && originalBrands.length > 0
          
          if (allSelected) {
            return { ...p, selectedBrands: [] }
          } else {
            return { ...p, selectedBrands: [...originalBrands] }
          }
        }
        return p
      })
    })
  }

  const selectAllItems = () => {
    setLocalSelectedParts(prev => {
      return prev.map(p => {
        const originalPart = selectedParts.find(sp => sp.name === p.name)
        return { ...p, selectedBrands: [...(originalPart?.selectedBrands || [])] }
      })
    })
  }

  const deselectAllItems = () => {
    setLocalSelectedParts(prev => {
      return prev.map(p => {
        return { ...p, selectedBrands: [] }
      })
    })
  }

  const removePart = (partName) => {
    setLocalSelectedParts(prev => {
      return prev.filter(p => p.name !== partName)
    })
  }

  const getSelectedCount = () => {
    let count = 0
    localSelectedParts.forEach(p => {
      if (p.selectedBrands && p.selectedBrands.length > 0) {
        count += p.selectedBrands.length
      }
    })
    return count
  }

  const selectedCount = getSelectedCount()

  const handleConfirm = () => {
    onUpdateSelection(localSelectedParts)
    onConfirm(localSelectedParts)
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-[#005691] to-[#0077be] rounded-t-2xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-white text-2xl">shopping_cart</span>
            <div>
              <h2 className="text-white font-bold text-lg">Confirm Your Order</h2>
              <p className="text-white/70 text-sm">Review and manage your selected items</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90 duration-300"
          >
            <span className="material-symbols-outlined text-white text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button
                onClick={selectAllItems}
                className="text-xs text-[#005691] hover:text-[#0077be] font-medium px-3 py-1.5 border border-[#005691] rounded-lg hover:bg-[#005691]/5 transition-all"
              >
                Select All
              </button>
              <button
                onClick={deselectAllItems}
                className="text-xs text-gray-500 hover:text-red-600 font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Deselect All
              </button>
            </div>
            <span className="text-xs text-gray-500">
              <span className="font-semibold text-[#005691]">{selectedCount}</span> of <span className="font-semibold text-gray-700">{totalItems}</span> items selected
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-2xl font-bold text-[#005691]">{totalParts}</div>
              <div className="text-xs text-gray-500">Parts</div>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <div className="text-2xl font-bold text-green-600">{uniqueBrandCount}</div>
              <div className="text-xs text-gray-500">Unique Brands</div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
              <div className="text-2xl font-bold text-yellow-600">{selectedCount}</div>
              <div className="text-xs text-gray-500">Selected Items</div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-700">Selected Items</span>
              <span className="text-xs text-gray-400">{selectedCount} of {totalItems} selected</span>
            </div>
            <div className="max-h-64 overflow-y-auto p-2 space-y-1">
              {localSelectedParts.map((part, idx) => {
                if (!part.selectedBrands || part.selectedBrands.length === 0) return null
                
                const partBrands = part.selectedBrands
                const originalBrands = selectedParts.find(p => p.name === part.name)?.selectedBrands || []
                const allBrandsSelected = partBrands.length === originalBrands.length && originalBrands.length > 0

                return (
                  <div key={part.name} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm font-medium text-gray-800">{part.name}</span>
                        <span className="text-xs text-gray-400 font-mono">{part.partNo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">
                          {partBrands.length}/{originalBrands.length} brands
                        </span>
                        <button
                          onClick={() => toggleAllForPart(part.name)}
                          className={`text-xs px-2 py-1 rounded-lg transition-all ${
                            allBrandsSelected 
                              ? 'bg-[#005691]/10 text-[#005691] hover:bg-[#005691]/20' 
                              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                          }`}
                        >
                          {allBrandsSelected ? 'Deselect All' : 'Select All'}
                        </button>
                        <button
                          onClick={() => removePart(part.name)}
                          className="text-gray-400 hover:text-red-500 transition-all p-1"
                          title="Remove this part"
                        >
                          <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-2 grid grid-cols-2 gap-1">
                      {partBrands.map((brand, brandIdx) => {
                        const isChecked = part.selectedBrands?.includes(brand) || false
                        return (
                          <label
                            key={`${part.name}-${brand}-${brandIdx}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleItemSelection(part.name, brand)}
                              className="w-4 h-4 accent-[#005691] cursor-pointer"
                            />
                            <span className="text-sm text-gray-700">{brand}</span>
                            {isChecked && (
                              <span className="text-[10px] text-green-600 font-medium ml-auto">✓ Selected</span>
                            )}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {localSelectedParts.filter(p => p.selectedBrands && p.selectedBrands.length > 0).length === 0 && (
                <div className="text-center py-8 text-gray-400 text-sm">
                  No items selected. Select brands for your parts.
                </div>
              )}
            </div>
          </div>

          {localSelectedParts.filter(p => p.selectedBrands && p.selectedBrands.length > 0).length > 0 && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-[#005691]">{totalParts}</span> part{totalParts > 1 ? 's' : ''} with <span className="font-semibold text-[#005691]">{uniqueBrandCount}</span> brand{uniqueBrandCount > 1 ? 's' : ''} = <span className="font-semibold text-[#005691]">{selectedCount}</span> total items selected
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-all flex items-center gap-2 text-sm font-medium"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Go Back
          </button>
          <button
            onClick={handleConfirm}
            disabled={selectedCount === 0}
            className={`px-8 py-2.5 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-md ${
              selectedCount > 0
                ? 'bg-[#005691] text-white hover:brightness-110 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <span className="material-symbols-outlined text-sm">check_circle</span>
            Confirm Order {selectedCount > 0 && `(${selectedCount} items)`}
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}

// ── SELECTION SUMMARY BAR ─────────────────────────────────────────
function SelectionSummary({ 
  selectedParts, 
  onClearAll, 
  onProceedToQuote 
}) {
  let totalItems = 0
  const allBrandsSet = new Set()
  
  selectedParts.forEach(part => {
    if (part.selectedBrands && part.selectedBrands.length > 0) {
      totalItems += part.selectedBrands.length
      part.selectedBrands.forEach(b => allBrandsSet.add(b))
    }
  })
  
  const uniqueBrandCount = allBrandsSet.size

  if (selectedParts.length === 0 || totalItems === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-[#005691] px-4 sm:px-6 py-3 sm:py-4 animate-fadeInUp max-w-[95%] sm:max-w-[90%]">
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="material-symbols-outlined text-[#005691] text-base sm:text-xl">shopping_cart</span>
          <span className="font-bold text-[#005691] text-xs sm:text-base">{selectedParts.length}</span>
          <span className="text-gray-600 text-[10px] sm:text-sm">part{selectedParts.length > 1 ? 's' : ''}</span>
          <span className="text-gray-400 text-[10px] sm:text-sm">×</span>
          <span className="font-bold text-[#005691] text-xs sm:text-base">{uniqueBrandCount}</span>
          <span className="text-gray-600 text-[10px] sm:text-sm">brand{uniqueBrandCount > 1 ? 's' : ''}</span>
          <span className="text-gray-400 text-[10px] sm:text-sm">=</span>
          <span className="font-bold text-[#005691] text-xs sm:text-base">{totalItems}</span>
          <span className="text-gray-600 text-[10px] sm:text-sm">items</span>
        </div>
        <div className="flex gap-1 sm:gap-3 ml-auto">
          <button
            onClick={onClearAll}
            className="text-[10px] sm:text-sm text-gray-500 hover:text-red-600 transition-all flex items-center gap-0.5 sm:gap-1"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm">clear</span>
            <span className="hidden xs:inline">Clear All</span>
          </button>
          <button
            onClick={onProceedToQuote}
            className="bg-[#005691] text-white px-2 sm:px-6 py-1 sm:py-2 rounded-lg text-[10px] sm:text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-1 sm:gap-2 hover:scale-105 duration-200"
          >
            <span className="material-symbols-outlined text-xs sm:text-sm">request_quote</span>
            <span className="hidden xs:inline">Proceed to Quote</span>
            <span className="xs:hidden">Quote</span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── MODERN CATEGORY PARTS BOX ──────────────────────────────────────
function ModernCategoryBox({ 
  category, 
  parts, 
  onSelectPart, 
  selectedParts, 
  onQuoteAll, 
  index,
  brands,
  openDropdownPart,
  onBrandToggle,
  onDropdownToggle
}) {
  // All categories use the same color - website primary blue
  const color = { bg: 'from-[#005691] to-[#0077be]' }
  
  const getCategoryEmoji = (cat) => {
    const emojis = {
      'Engine Parts': '🔧',
      'Transmission & Clutch': '⚙️',
      'Fuel System': '⛽',
      'Air Intake System': '💨',
      'Exhaust System': '🔊',
      'Cooling System': '❄️',
      'Brake System': '🛑',
      'Suspension & Steering': '🔩',
      'Wheels & Tires': '🛞',
      'Chain Drive': '⛓️',
      'Electrical Parts': '⚡',
      'Lighting': '💡',
      'Controls': '🎮',
      'Body Parts': '🚗',
      'Rubber & Sealing Components': '🔄',
      'Accessories': '🎯',
      'Electric Drive System': '🔌',
      'Battery System': '🔋',
      'Electrical Components': '💻',
      'Drivetrain': '🚲',
      'Frame & Body Parts': '🏗️',
      'Lighting & Safety': '🛡️',
      'Fasteners & Hardware': '🔩',
      'E-Bike Accessories': '🎒'
    }
    return emojis[cat] || '📦'
  }

  const selectedCount = parts.filter(p => selectedParts.some(sp => sp.name === p.name)).length

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 animate-fadeInUp" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className={`bg-gradient-to-r ${color.bg} px-3 sm:px-5 py-2 sm:py-3 flex items-center justify-between`}>
        <div className="flex items-center gap-1 sm:gap-2 min-w-0">
          <span className="text-base sm:text-xl flex-shrink-0">{getCategoryEmoji(category)}</span>
          <h4 className="text-white font-bold text-[11px] sm:text-sm tracking-wide truncate">{category}</h4>
          {selectedCount > 0 && (
            <span className="bg-yellow-400 text-gray-800 text-[8px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-bold flex-shrink-0">
              {selectedCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <button
            onClick={() => onQuoteAll(category, parts)}
            className="bg-white/20 hover:bg-white/30 text-white text-[8px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-full font-medium transition-all duration-200 flex items-center gap-0.5 sm:gap-1"
          >
            <span className="material-symbols-outlined text-[10px] sm:text-sm">request_quote</span>
            <span className="hidden xs:inline">Quote All</span>
            <span className="xs:hidden">Quote</span>
          </button>
        </div>
      </div>
      <div className="p-1.5 sm:p-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1 sm:gap-1.5">
          {parts.map((part, idx) => {
            const partSelected = selectedParts.find(p => p.name === part.name)
            const selectedBrands = partSelected ? partSelected.selectedBrands || [] : []
            return (
              <PartItem 
                key={part.name} 
                part={part} 
                onSelect={onSelectPart}
                isSelected={!!partSelected}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandToggle={onBrandToggle}
                isDropdownOpen={openDropdownPart === part.name}
                onDropdownToggle={onDropdownToggle}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Product Detail Sub-Component ──────────────────────────────────
function ProductDetail({ 
  product, 
  onNavigate, 
  setSheetOpen, 
  selectedSubProduct, 
  onSelectSubProduct, 
  onBackToMain,
  selectedParts,
  onSelectPart,
  onClearAllParts,
  onProceedToQuote,
  onBrandToggle,
  openDropdownPart,
  onDropdownToggle
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  if (product.isIndustrialGroup) {
    if (selectedSubProduct) {
      const sub = product.subProducts.find(p => p.id === selectedSubProduct)
      if (!sub) return null

      return (
        <div className="space-y-12">
          <SubProductNav 
            subProducts={product.subProducts} 
            activeSub={selectedSubProduct} 
            onSelect={onSelectSubProduct}
            onBack={onBackToMain}
          />
          <div className="animate-fadeInUp">
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
                <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">{sub.tagline}</p>
                <p className="text-[#505f76] leading-relaxed mb-8">{sub.description}</p>
                <div className="flex gap-4 flex-wrap">
                  <button
                    onClick={() => onNavigate('Contact Us')}
                    className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:scale-105 duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">request_quote</span>
                    Request Quote
                  </button>
                  {sub.hasDataSheet && (
                    <button
                      onClick={() => setSheetOpen(sub.id)}
                      className="border border-[#005691] text-[#005691] px-8 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all flex items-center gap-2 hover:scale-105 duration-200"
                    >
                      <span className="material-symbols-outlined text-sm">description</span>
                      Data Sheet
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
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
              <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 hover:shadow-lg transition-shadow duration-300 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-lg font-bold text-[#005691] mb-6 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">factory</span>
                  Applications
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sub.applications.map((a, index) => (
                    <span key={a} className="px-4 py-2 bg-[#005691]/10 text-[#005691] rounded-full text-sm font-semibold animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden shadow-sm animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="bg-[#eceef0] px-8 py-4">
                <h3 className="font-bold text-[#005691] text-sm uppercase tracking-widest">Standard Part Numbers & MOQ</h3>
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
                            className="bg-[#005691] text-white px-4 py-2 rounded text-xs font-semibold hover:brightness-110 transition-all hover:scale-105 duration-200"
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
            <div className="mt-5 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
              <div>
                <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
                <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
              </div>
              <button
                onClick={() => onNavigate('Contact Us')}
                className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap flex items-center gap-2 hover:scale-105 duration-200"
              >
                <span className="material-symbols-outlined text-sm">engineering</span>
                Discuss Custom Order
              </button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="space-y-12">
        <div className="mb-16 animate-fadeIn">
          <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
          <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">{product.tagline}</p>
          <p className="text-[#505f76] leading-relaxed max-w-4xl">{product.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.subProducts.map((sub, index) => (
            <div 
              key={sub.id} 
              className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105 duration-300 cursor-pointer group animate-scaleIn"
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
                    className="w-full bg-[#005691] text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 duration-200 flex items-center justify-center gap-2"
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
                      className="flex-1 bg-[#005691]/10 text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/20 transition-all hover:scale-105 duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectSubProduct(sub.id)
                      }}
                    >
                      View Details
                    </button>
                    {sub.hasDataSheet && (
                      <button
                        className="border border-[#005691] text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all hover:scale-105 duration-200"
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
        <div className="mt-10 bg-[#005691] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
            <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
          </div>
          <button
            onClick={() => onNavigate('Contact Us')}
            className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap flex items-center gap-2 hover:scale-105 duration-200"
          >
            <span className="material-symbols-outlined text-sm">engineering</span>
            Discuss Custom Order
          </button>
        </div>
      </div>
    )
  }

  // ── PARTS VIEW FOR MOTORCYCLES & E-BIKE ──────────────────────
  const categories = product.categories || []
  const allParts = product.parts || []
  const brands = product.brands || []

  const filteredParts = allParts.filter(part => {
    const matchSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchCategory = selectedCategory === 'all' || part.category === selectedCategory
    return matchSearch && matchCategory
  })

  const groupedParts = {}
  filteredParts.forEach(part => {
    if (!groupedParts[part.category]) {
      groupedParts[part.category] = []
    }
    groupedParts[part.category].push(part)
  })

  const uniqueCategories = [...new Set(allParts.map(p => p.category))]

  const handleQuoteAll = (category, parts) => {
    parts.forEach(part => {
      if (!selectedParts.some(p => p.name === part.name)) {
        onSelectPart(part)
      }
    })
  }

  let totalItems = 0
  const totalBrandsSet = new Set()
  selectedParts.forEach(part => {
    if (part.selectedBrands && part.selectedBrands.length > 0) {
      totalItems += part.selectedBrands.length
      part.selectedBrands.forEach(b => totalBrandsSet.add(b))
    }
  })
  const brandCount = totalBrandsSet.size

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div className="rounded-2xl overflow-hidden h-80 animate-zoomIn relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.background = '#eceef0' }}
          />
          <div className="absolute top-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg text-3xl">
            {product.icon}
          </div>
        </div>
        <div className="flex flex-col justify-center animate-fadeInRight">
          <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
          <p className="text-[#005691] font-semibold text-sm mb-5 uppercase tracking-widest">
            {product.tagline}
          </p>
          <p className="text-[#505f76] leading-relaxed mb-8">{product.description}</p>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
              <div className="text-xs text-gray-500">Categories</div>
              <div className="text-2xl font-bold text-[#005691]">{categories.length}</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              <div className="text-xs text-gray-500">Brands Available</div>
              <div className="text-2xl font-bold text-[#005691]">{brands.length}</div>
            </div>
            <div className="bg-gray-50 rounded-xl px-6 py-3 border border-gray-200 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
              <div className="text-xs text-gray-500">MOQ Options</div>
              <div className="text-2xl font-bold text-[#005691]">Flexible</div>
            </div>
          </div>
          
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={() => onNavigate('Contact Us')}
              className="bg-[#005691] text-white px-8 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:scale-105 duration-200"
            >
              <span className="material-symbols-outlined text-sm">request_quote</span>
              Request Quote
            </button>
            {selectedParts.length > 0 && totalItems > 0 && (
              <button
                onClick={onProceedToQuote}
                className="bg-yellow-400 text-gray-800 px-8 py-3 rounded-lg text-sm font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 hover:scale-105 duration-200"
              >
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                {totalItems} Items ({selectedParts.length} parts × {brandCount} brands)
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white border border-[#c5c6cd] rounded-2xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">search</span>
            <input
              type="text"
              placeholder={`Search ${product.name} parts by name or part number...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005691] focus:bg-white transition-all duration-300"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#005691] transition-all duration-300 bg-gray-50 hover:bg-white min-w-[200px]"
          >
            <option value="all">📋 All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {searchTerm && (
          <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">info</span>
            Found <span className="font-semibold text-[#005691]">{filteredParts.length}</span> results for "{searchTerm}"
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {Object.entries(groupedParts).map(([category, parts], index) => (
          <ModernCategoryBox 
            key={category}
            category={category}
            parts={parts}
            onSelectPart={onSelectPart}
            selectedParts={selectedParts}
            onQuoteAll={handleQuoteAll}
            index={index}
            brands={brands}
            openDropdownPart={openDropdownPart}
            onBrandToggle={onBrandToggle}
            onDropdownToggle={onDropdownToggle}
          />
        ))}
        {filteredParts.length === 0 && (
          <div className="col-span-2 text-center py-16 bg-white rounded-2xl border border-[#c5c6cd]">
            <span className="material-symbols-outlined text-5xl text-gray-300">search_off</span>
            <p className="text-gray-500 mt-3 text-lg">No parts found matching your search.</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      <SelectionSummary 
        selectedParts={selectedParts}
        onClearAll={onClearAllParts}
        onProceedToQuote={onProceedToQuote}
      />

      <div className="mt-10 bg-gradient-to-r from-[#005691] to-[#0077be] text-white rounded-2xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
        <div>
          <h3 className="text-2xl font-bold mb-2">Need Custom Specifications?</h3>
          <p className="text-white/80">We source bespoke sealing components to your exact drawings and technical requirements from our verified supplier network.</p>
        </div>
        <button
          onClick={() => onNavigate('Contact Us')}
          className="bg-white text-[#005691] px-10 py-4 rounded-lg font-semibold text-sm hover:shadow-xl transition-all whitespace-nowrap flex items-center gap-2 hover:scale-105 duration-200"
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

  const [selectedPartsByTab, setSelectedPartsByTab] = useState({
    motorcycle: [],
    'e-bike': []
  })
  const [openDropdownPart, setOpenDropdownPart] = useState(null)
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const product = PRODUCTS.find((p) => p.id === active)
  const selectedParts = selectedPartsByTab[active] || []

  const handleSheetOpen = (subId) => {
    setActiveSubProduct(subId)
    setSheetOpen(true)
  }

  const handleSelectSubProduct = (subId) => {
    setActiveSubProduct(subId)
    window.scrollTo({ top: 240, behavior: 'smooth' })
  }

  const handleBackToMain = () => {
    setActiveSubProduct(null)
    window.scrollTo({ top: 200, behavior: 'smooth' })
  }

  const handleSelectPart = (part) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)
      const newList = exists
        ? currentList.filter(p => p.name !== part.name)
        : [...currentList, { ...part, selectedBrands: [] }]
      
      // Save to localStorage immediately with tab-specific key
      saveToStorage(newList, active)
      
      return { ...prev, [active]: newList }
    })
  }

  const handleClearAllParts = () => {
    setSelectedPartsByTab(prev => {
      const updated = { ...prev, [active]: [] }
      // Clear from storage for this specific tab
      const storageKey = `selectedParts_${active}`
      localStorage.removeItem(storageKey)
      localStorage.removeItem(`productCategory_${active}`)
      sessionStorage.removeItem(storageKey)
      sessionStorage.removeItem(`productCategory_${active}`)
      setOpenDropdownPart(null)
      window.dispatchEvent(new Event('selectedPartsUpdated'))
      return updated
    })
  }

  // Save to storage function with tab-specific keys
  const saveToStorage = (parts, tabId) => {
    const storageKey = `selectedParts_${tabId}`
    const categoryKey = `productCategory_${tabId}`
    
    if (parts && parts.length > 0) {
      const category = tabId === 'motorcycle' ? 'Motorcycle Parts & Accessories' : 
                      tabId === 'e-bike' ? 'E-Bike Parts & Components' : 
                      'Industrial Sealing Solutions'
      
      localStorage.setItem(storageKey, JSON.stringify(parts))
      localStorage.setItem(categoryKey, category)
      sessionStorage.setItem(storageKey, JSON.stringify(parts))
      sessionStorage.setItem(categoryKey, category)
      
      console.log(`💾 [Products] Saved to storage for ${tabId}:`, parts.length, 'parts')
    } else {
      // If no parts, clear storage for this tab
      localStorage.removeItem(storageKey)
      localStorage.removeItem(categoryKey)
      sessionStorage.removeItem(storageKey)
      sessionStorage.removeItem(categoryKey)
      console.log(`💾 [Products] Cleared storage for ${tabId}`)
    }
    window.dispatchEvent(new Event('selectedPartsUpdated'))
  }

  const handleOpenConfirmModal = () => {
    const currentParts = selectedPartsByTab[active] || []
    const hasBrands = currentParts.some(p => p.selectedBrands && p.selectedBrands.length > 0)
    if (currentParts.length > 0 && hasBrands) {
      setShowConfirmModal(true)
    }
  }

  const handleConfirmOrder = (updatedParts) => {
    const currentParts = updatedParts || selectedPartsByTab[active] || []

    let totalItems = 0
    const allBrands = new Set()
    currentParts.forEach(part => {
      if (part.selectedBrands && part.selectedBrands.length > 0) {
        totalItems += part.selectedBrands.length
        part.selectedBrands.forEach(b => allBrands.add(b))
      }
    })
    const brandCount = allBrands.size
    
    if (currentParts.length > 0 && totalItems > 0) {
      const orderData = {
        parts: currentParts,
        totalBrands: brandCount,
        totalItems: totalItems,
        category: active === 'motorcycle' ? 'Motorcycle Parts & Accessories' : 
                  active === 'e-bike' ? 'E-Bike Parts & Components' : 
                  'Industrial Sealing Solutions'
      }
      
      // Save to storage with tab-specific keys
      const storageKey = `selectedParts_${active}`
      const categoryKey = `productCategory_${active}`
      localStorage.setItem(storageKey, JSON.stringify(currentParts))
      localStorage.setItem(categoryKey, orderData.category)
      sessionStorage.setItem(storageKey, JSON.stringify(currentParts))
      sessionStorage.setItem(categoryKey, orderData.category)
      
      console.log('✅ Order Data:', orderData)
      window.dispatchEvent(new Event('selectedPartsUpdated'))
      
      setShowConfirmModal(false)
      onNavigate('Contact Us')
    }
  }

  const handleUpdateSelection = (updatedParts) => {
    setSelectedPartsByTab(prev => {
      const result = { ...prev, [active]: updatedParts }
      // Save to storage with tab-specific key
      saveToStorage(updatedParts, active)
      return result
    })
  }

  const handleBrandToggle = (part, brandOrBrands) => {
    console.log('🔄 Brand Toggle:', part.name, brandOrBrands)
    
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)
      let updatedList = exists ? currentList : [...currentList, { ...part, selectedBrands: [] }]

      updatedList = updatedList.map(p => {
        if (p.name === part.name) {
          let newBrands = [...(p.selectedBrands || [])]

          if (Array.isArray(brandOrBrands)) {
            newBrands = brandOrBrands.length === 0 ? [] : [...brandOrBrands]
          } else if (brandOrBrands === null) {
            return p
          } else {
            if (newBrands.includes(brandOrBrands)) {
              newBrands = newBrands.filter(b => b !== brandOrBrands)
            } else {
              newBrands = [...newBrands, brandOrBrands]
            }
          }

          console.log('📦 Updated brands for', p.name, ':', newBrands)
          return { ...p, selectedBrands: newBrands }
        }
        return p
      })

      // Save to storage with tab-specific key
      saveToStorage(updatedList, active)
      
      return { ...prev, [active]: updatedList }
    })
  }

  const handleDropdownToggle = (part, isOpen) => {
    if (isOpen === false) {
      setOpenDropdownPart(null)
    } else {
      setOpenDropdownPart(openDropdownPart === part.name ? null : part.name)
    }
  }

  const getTabBrandCount = (tabId) => {
    const parts = selectedPartsByTab[tabId] || []
    const brandsSet = new Set()
    parts.forEach(part => {
      if (part.selectedBrands && part.selectedBrands.length > 0) {
        part.selectedBrands.forEach(b => brandsSet.add(b))
      }
    })
    return brandsSet.size
  }

  const getTabTotalItems = (tabId) => {
    const parts = selectedPartsByTab[tabId] || []
    let totalItems = 0
    parts.forEach(part => {
      if (part.selectedBrands && part.selectedBrands.length > 0) {
        totalItems += part.selectedBrands.length
      }
    })
    return totalItems
  }

  // Function to open confirm modal from permanent button
  const handleOpenConfirmModalFromButton = () => {
    const currentParts = selectedPartsByTab[active] || []
    const hasBrands = currentParts.some(p => p.selectedBrands && p.selectedBrands.length > 0)
    if (currentParts.length > 0 && hasBrands) {
      setShowConfirmModal(true)
    } else {
      alert('Please select at least one part with brands before confirming your order.')
    }
  }

  // Calculate total selected items for the permanent button
  const getTotalSelectedItems = () => {
    const parts = selectedPartsByTab[active] || []
    let total = 0
    parts.forEach(part => {
      if (part.selectedBrands && part.selectedBrands.length > 0) {
        total += part.selectedBrands.length
      }
    })
    return total
  }

  const totalSelectedItems = getTotalSelectedItems()
  const hasSelection = totalSelectedItems > 0

  // Load selected parts from storage when component mounts or tab changes
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        const storageKey = `selectedParts_${active}`
        const storedParts = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey)
        if (storedParts) {
          const parsed = JSON.parse(storedParts)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setSelectedPartsByTab(prev => ({
              ...prev,
              [active]: parsed
            }))
            console.log(`📥 [Products] Loaded from storage for ${active}:`, parsed.length, 'parts')
          }
        }
      } catch (err) {
        console.error('Failed to load parts from storage:', err)
      }
    }
    
    loadFromStorage()
  }, [active])

  return (
    <div className="bg-[#f7f9fb] min-h-screen">
      {sheetOpen && (
        <DataSheetModal 
          productId={activeSubProduct} 
          onClose={() => setSheetOpen(false)} 
        />
      )}

      <ConfirmOrderModal 
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmOrder}
        selectedParts={selectedParts}
        onUpdateSelection={handleUpdateSelection}
      />

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

      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex gap-9 overflow-x-auto py-4">
            {PRODUCTS.map((p) => {
              const tabTotalItems = getTabTotalItems(p.id)
              const tabHasSelection = (selectedPartsByTab[p.id]?.length || 0) > 0 && getTabBrandCount(p.id) > 0
              return (
                <button
                  key={p.id}
                  onClick={() => { 
                    setActive(p.id)
                    setActiveSubProduct(null)
                    setSheetOpen(false)
                    setOpenDropdownPart(null)
                    setShowConfirmModal(false)
                  }}
                  className={`
                    px-6 py-3 rounded-lg font-semibold text-md tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2
                    ${active === p.id 
                      ? 'bg-[#005691] text-white shadow-lg transform scale-105' 
                      : 'text-[#505f76] hover:text-[#005691] hover:bg-[#005691]/10'
                    }
                    transform transition-all duration-300 ease-in-out
                    hover:scale-105
                  `}
                >
                  <span className="text-xl">{p.icon || '📦'}</span>
                  {p.name}
                  {p.id !== 'industrial-seals' && tabHasSelection && (
                    <span className="bg-yellow-400 text-gray-800 text-xs px-2 py-0.5 rounded-full ml-2">
                      {tabTotalItems}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* PERMANENT CONFIRM ORDER BUTTON */}
      {active !== 'industrial-seals' && (
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-2 sm:p-4 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1 sm:gap-4">
              <span className="material-symbols-outlined text-[#005691] text-base sm:text-2xl">shopping_cart</span>
              <div>
                <span className="font-semibold text-gray-700 text-xs sm:text-base">Your Selection</span>
                <span className="text-[10px] sm:text-sm text-gray-500 ml-1 sm:ml-2">
                  {hasSelection ? (
                    <>{totalSelectedItems} item{totalSelectedItems > 1 ? 's' : ''} selected</>
                  ) : (
                    'No items selected'
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={handleOpenConfirmModalFromButton}
              className={`px-2 sm:px-6 py-1 sm:py-2.5 rounded-lg text-[10px] sm:text-sm font-semibold transition-all flex items-center gap-1 sm:gap-2 ${
                hasSelection 
                  ? 'bg-[#005691] text-white hover:brightness-110 hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={!hasSelection}
            >
              <span className="material-symbols-outlined text-sm sm:text-base">checklist</span>
              <span className="hidden xs:inline">Review Order</span>
              <span className="xs:hidden">Review</span>
              {hasSelection && (
                <span className="bg-white/20 text-white text-[8px] sm:text-xs px-1 sm:px-2 py-0.5 rounded-full ml-0.5 sm:ml-1">
                  {totalSelectedItems}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-10">
        <ProductDetail 
          key={product.id}
          product={product} 
          onNavigate={onNavigate} 
          setSheetOpen={handleSheetOpen}
          selectedSubProduct={activeSubProduct}
          onSelectSubProduct={handleSelectSubProduct}
          onBackToMain={handleBackToMain}
          selectedParts={selectedParts}
          onSelectPart={handleSelectPart}
          onClearAllParts={handleClearAllParts}
          onProceedToQuote={handleOpenConfirmModal}
          onBrandToggle={handleBrandToggle}
          openDropdownPart={openDropdownPart}
          onDropdownToggle={handleDropdownToggle}
        />
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes modalFade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes sectionFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes listItem {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes imageFade {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.6s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.6s ease-out forwards; }
        .animate-fadeInRight { animation: fadeInRight 0.6s ease-out forwards; }
        .animate-fadeInLeft { animation: fadeInLeft 0.6s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.5s ease-out forwards; }
        .animate-zoomIn { animation: zoomIn 0.5s ease-out forwards; }
        .animate-slideIn { animation: slideIn 0.6s ease-out forwards; }
        .animate-slideInLeft { animation: slideInLeft 0.4s ease-out forwards; }
        .animate-modalFade { animation: modalFade 0.3s ease-out forwards; }
        .animate-sectionFade { animation: sectionFade 0.5s ease-out forwards; opacity: 0; }
        .animate-listItem { animation: listItem 0.3s ease-out forwards; opacity: 0; }
        .animate-imageFade { animation: imageFade 0.5s ease-out forwards; opacity: 0; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        /* Mobile responsive fixes */
        @media (max-width: 480px) {
          .material-symbols-outlined {
            font-size: 18px !important;
          }
        }
        /* Extra small devices */
        @media (max-width: 380px) {
          .material-symbols-outlined {
            font-size: 16px !important;
          }
        }
        .xs\:inline {
          display: none;
        }
        @media (min-width: 480px) {
          .xs\:inline {
            display: inline;
          }
        }
        .xs\:hidden {
          display: inline;
        }
        @media (min-width: 480px) {
          .xs\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  )
}