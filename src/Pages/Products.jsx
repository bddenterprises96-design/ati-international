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
    'Transmission Gears', 'Drive Shaft', 'Counter Shaft', 'Kick Starter',
    'Gear Lever'
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
    'Brake Caliper', 'Brake Master Cylinder', 'Brake Lever', 'Brake Pedal',
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
    'Clutch Lever', 'Foot Peg', 'Side Stand', 'Center Stand', 'Mirrors'
  ],
  'Body Parts': [
    'Fuel Tank Cover', 'Front Fender', 'Rear Fender', 'Side Covers',
    'Fairings', 'Seat', 'Seat Cover', 'Rear Carrier', 'Chain Cover'
  ],
  'Rubber & Sealing Components': [
    'Oil Seals', 'Valve Stem Seals', 'O-Rings', 'Gaskets',
    'Rubber Bushes', 'Dust Seals', 'Rubber Mounts', 'Rubber Grommets',
    'Rubber Dampers'
  ],
  'Motorcycle Accessories': [
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

// ── BRAND MODELS DATA ─────────────────────────────────────────────
const BRAND_MODELS = {
  'Honda': [
    'CBR125R', 'CBR250R', 'CBR300R', 'CBR500R', 'CBR600RR', 'CBR650R', 'CBR1000RR-R Fireblade',
    'CB125R', 'CB300R', 'CB500F', 'CB650R', 'CB750 Hornet', 'CB1000 Hornet',
    'CRF300L', 'CRF300 Rally', 'CRF1100L Africa Twin', 'Africa Twin Adventure Sports', 'NC750X', 'XL750 Transalp',
    'Rebel 300', 'Rebel 500', 'Rebel 1100', 'Gold Wing',
    'CG125', 'CG150', 'CG160', 'CB125F', 'CB150F', 'CB190R', 'CB200X', 'CB250F', 'CB Shine', 'CB Unicorn', 'SP125'
  ],
  'Yamaha': [
    'YZF-R1', 'YZF-R7', 'YZF-R6', 'YZF-R3', 'YZF-R25', 'YZF-R15',
    'MT-125', 'MT-15', 'MT-03', 'MT-07', 'MT-09', 'MT-10',
    'Tenere 700', 'Tenere 700 World Raid', 'Tracer 7', 'Tracer 9', 'Super Tenere',
    'WR250F', 'WR450F', 'YZ125', 'YZ250', 'YZ250F', 'YZ450F',
    'FZ', 'FZS', 'SZ-RR', 'XSR125', 'XSR700', 'XSR900'
  ],
  'Kawasaki': [
    'Ninja 125', 'Ninja 250', 'Ninja 300', 'Ninja 400', 'Ninja 500', 'Ninja 650', 'Ninja 1000SX', 'Ninja ZX-4R', 'Ninja ZX-6R', 'Ninja ZX-10R', 'Ninja H2',
    'Z125', 'Z250', 'Z400', 'Z500', 'Z650', 'Z900', 'Z H2',
    'Versys-X 300', 'Versys 650', 'Versys 1000', 'KLE500',
    'Eliminator', 'Vulcan S', 'Vulcan 900', 'Vulcan 1700',
    'KLR650', 'KLX230', 'KLX250', 'KLX300', 'KLX450R', 'KX65', 'KX85', 'KX112', 'KX250', 'KX450'
  ],
  'Suzuki': [
    'GSX-R125', 'GSX-R600', 'GSX-R750', 'GSX-R1000', 'GSX-8R', 'Hayabusa',
    'GSX-S125', 'GSX-S750', 'GSX-S1000', 'GSX-8S',
    'V-Strom 250', 'V-Strom 650', 'V-Strom 800', 'V-Strom 1050',
    'Boulevard C50', 'Boulevard M109R',
    'DR-Z400', 'DR650S', 'DR-Z4S'
  ],
  'Harley-Davidson': [
    'Sportster S', 'Nightster',
    'Street Bob', 'Low Rider S', 'Low Rider ST', 'Fat Boy', 'Heritage Classic', 'Breakout',
    'Street Glide', 'Road Glide', 'Road Glide Limited', 'Street Glide Limited',
    'Pan America 1250', 'Pan America 1250 Special',
    'Freewheeler', 'Road Glide 3'
  ],
  'BMW': [
    'R 1250 GS', 'R 1300 GS', 'R 1300 GS Adventure', 'R 1300 R', 'R 1300 RS', 'R 1300 RT', 'R 18', 'R 18 Classic', 'R 18 Transcontinental',
    'S 1000 RR', 'S 1000 R', 'S 1000 XR',
    'M 1000 RR', 'M 1000 R', 'M 1000 XR',
    'F 450 GS', 'F 700 GS', 'F 750 GS', 'F 800 GS', 'F 850 GS', 'F 900 GS', 'F 900 XR', 'F 900 R',
    'G 310 R', 'G 310 GS', 'G 310 RR'
  ],
  'Ducati': [
    'Panigale V2', 'Panigale V4', 'Panigale V4 R',
    'Monster', 'Monster SP',
    'Multistrada V2', 'Multistrada V4', 'Multistrada V4 Rally', 'Multistrada V4 Pikes Peak',
    'Streetfighter V2', 'Streetfighter V4', 'Streetfighter V4 SP',
    'Scrambler Icon', 'Scrambler Full Throttle', 'Scrambler Nightshift', 'Scrambler 1100',
    'Diavel V4', 'XDiavel',
    'DesertX', 'DesertX Rally'
  ],
  'Triumph': [
    'Bonneville T100', 'Bonneville T120', 'Bonneville Bobber', 'Speedmaster', 'Speed Twin 900', 'Speed Twin 1200', 'Scrambler 900', 'Scrambler 1200',
    'Trident 660', 'Speed Triple 1200', 'Street Triple 765',
    'Tiger Sport 660', 'Tiger 900', 'Tiger 1200', 'Tiger 1200 GT', 'Tiger 1200 Rally Pro',
    'Daytona 660', 'Daytona 765',
    'Speed 400', 'Scrambler 400 X', 'Scrambler 400 XC', 'Thruxton 400', 'Tracker 400'
  ],
  'KTM': [
    '125 Duke', '200 Duke', '250 Duke', '390 Duke', '790 Duke', '890 Duke', '990 Duke', '1390 Super Duke R',
    'RC 125', 'RC 200', 'RC 390', 'RC 8C',
    '390 Adventure', '790 Adventure', '890 Adventure', '1290 Super Adventure', '1390 Super Adventure',
    '125 EXC', '250 EXC', '300 EXC', '350 EXC-F', '450 EXC-F', '500 EXC-F'
  ],
  'Royal Enfield': [
    'Bullet 350', 'Bullet 650', 'Classic 350', 'Classic 650', 'Hunter 350', 'Meteor 350',
    'Guerrilla 450', 'Himalayan 450', 'Scram 440', 'Goan Classic 350',
    'Super Meteor 650', 'Shotgun 650', 'Bear 650', 'Interceptor 650', 'Continental GT 650'
  ],
  'Bajaj': [
    'Pulsar 125', 'Pulsar 150', 'Pulsar 160 NS', 'Pulsar N160', 'Pulsar N250', 'Pulsar NS200', 'Pulsar NS400Z', 'Pulsar RS200', 'Pulsar 220F',
    'Dominar 250', 'Dominar 400',
    'Avenger 160', 'Avenger 220',
    'Platina 100', 'Platina 110', 'CT100', 'CT110', 'Discover 100', 'Discover 125'
  ],
  'TVS': [
    'Apache RTR 160', 'Apache RTR 160 4V', 'Apache RTR 180', 'Apache RTR 200 4V', 'Apache RTR 310', 'Apache RR 310', 'Apache RTX',
    'Raider 125', 'Ronin 225', 'Radeon', 'Sport', 'Star City+'
  ],
  'Hero': [
    'Splendor+', 'Splendor+ XTEC', 'Splendor+ XTEC 2.0',
    'HF Deluxe', 'HF 100',
    'Glamour', 'Glamour X',
    'Xtreme 125R', 'Xtreme 160R', 'Xtreme 160R 4V', 'Xtreme 250R',
    'Xpulse 200 4V', 'Xpulse 210',
    'Karizma XMR',
    'Mavrick 440'
  ],
  'Aprilia': [
    'RS 125', 'RS 457', 'RS 660', 'RSV4', 'RSV4 Factory',
    'Tuono 125', 'Tuono 457', 'Tuono 660', 'Tuono V4', 'Tuono V4 Factory',
    'Tuareg 660', 'Tuareg Rally',
    'SX 125', 'RX 125'
  ],
  'Moto Guzzi': [
    'V7 Stone', 'V7 Special', 'V7 Sport', 'V7 Racer',
    'V85 TT', 'V85 TT Travel', 'V85 Strada',
    'V100 Mandello', 'V100 Mandello S', 'V100 Stelvio',
    'California 1400', 'Audace', 'Eldorado'
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
        selectedBrands: [],
        selectedModels: []
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
const DROPDOWN_WIDTH = 260
const DROPDOWN_HEIGHT = 320

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

  const handleBrandSelect = (brand) => {
    onBrandToggle(part, [brand])
    onToggle(false)
  }

  const handleClearBrands = () => {
    onBrandToggle(part, [])
    onToggle(false)
  }

  return (
    <div className="relative inline-block flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          onToggle(!isOpen)
        }}
        className={`
          w-9 h-9 rounded border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0
          ${isOpen 
            ? 'border-[#005691] bg-[#005691]/10 text-[#005691]' 
            : 'border-gray-300 hover:border-[#005691] text-gray-400 hover:text-[#005691]'
          }
          ${selectedCount > 0 ? 'border-[#005691] bg-[#005691]/5' : ''}
        `}
        title="Select a brand for this part"
      >
        <span className="material-symbols-outlined text-base">expand_more</span>
        {selectedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#005691] text-white text-[9px] font-bold flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </button>

      {isOpen && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] p-4 max-h-64 overflow-y-auto"
          style={{ top: position.top, left: position.left, width: DROPDOWN_WIDTH, minWidth: '220px' }}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700 truncate pr-2" title={part.name}>
              {part.name}
            </span>
            <button
              onClick={handleClearBrands}
              className="text-[11px] text-red-500 hover:underline font-medium"
            >
              Clear
            </button>
          </div>
          <div className="space-y-1.5">
            {brands.map((brand) => {
              const isSelected = selectedBrands && selectedBrands.includes(brand)
              return (
                <label
                  key={brand}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="radio"
                    name={`brand-${part.name}`}
                    checked={isSelected}
                    onChange={() => handleBrandSelect(brand)}
                    className="w-4 h-4 accent-[#005691] cursor-pointer"
                  />
                  <span className="text-sm text-gray-700">{brand}</span>
                </label>
              )
            })}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-[11px] text-gray-400">
              {selectedCount > 0 ? `${selectedCount} brand selected` : 'No brand selected'}
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ── MODEL DROPDOWN ─────────────────────────────────────────────────
function PartModelDropdown({ part, selectedBrands, selectedModels, onModelToggle, isOpen, onToggle }) {
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const getAvailableModels = () => {
    const models = new Set()
    if (selectedBrands && selectedBrands.length > 0) {
      selectedBrands.forEach(brand => {
        if (BRAND_MODELS[brand]) {
          BRAND_MODELS[brand].forEach(model => models.add(model))
        }
      })
    }
    return Array.from(models)
  }

  const availableModels = getAvailableModels()

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

  const selectedCount = selectedModels ? selectedModels.length : 0
  const hasBrands = selectedBrands && selectedBrands.length > 0

  return (
    <div className="relative inline-block flex-shrink-0">
      <button
        ref={buttonRef}
        onClick={(e) => {
          e.stopPropagation()
          if (hasBrands) {
            onToggle(!isOpen)
          }
        }}
        className={`
          w-9 h-9 rounded border-2 transition-all duration-200 flex items-center justify-center flex-shrink-0
          ${!hasBrands ? 'opacity-50 cursor-not-allowed' : ''}
          ${isOpen 
            ? 'border-[#005691] bg-[#005691]/10 text-[#005691]' 
            : 'border-gray-300 hover:border-[#005691] text-gray-400 hover:text-[#005691]'
          }
          ${selectedCount > 0 ? 'border-[#005691] bg-[#005691]/5' : ''}
        `}
        title={hasBrands ? "Select models for this part" : "Select a brand first"}
        disabled={!hasBrands}
      >
        <span className="material-symbols-outlined text-base">model_training</span>
        {selectedCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#005691] text-white text-[9px] font-bold flex items-center justify-center">
            {selectedCount}
          </span>
        )}
      </button>

      {isOpen && hasBrands && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] p-4 max-h-64 overflow-y-auto"
          style={{ top: position.top, left: position.left, width: DROPDOWN_WIDTH, minWidth: '220px' }}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700 truncate pr-2" title={part.name}>
              {part.name} Models
            </span>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onModelToggle(part, availableModels)
                }}
                className="text-[11px] text-[#005691] hover:underline font-medium"
              >
                All
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onModelToggle(part, [])
                }}
                className="text-[11px] text-red-500 hover:underline font-medium"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="space-y-1.5">
            {availableModels.length === 0 ? (
              <div className="text-sm text-gray-400 py-3 text-center">No models available for selected brands</div>
            ) : (
              availableModels.map((model) => {
                const isSelected = selectedModels && selectedModels.includes(model)
                return (
                  <label
                    key={model}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={(e) => {
                        e.stopPropagation()
                        onModelToggle(part, model)
                      }}
                      className="w-4 h-4 accent-[#005691] cursor-pointer"
                    />
                    <span className="text-sm text-gray-700">{model}</span>
                  </label>
                )
              })
            )}
          </div>
          <div className="mt-3 pt-2 border-t border-gray-200">
            <p className="text-[11px] text-gray-400">
              {selectedCount} model{selectedCount !== 1 ? 's' : ''} selected
            </p>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ── PRODUCT CARD ──────────────────────────────────────────────────
function ProductCard({ part, brands, onSelectPart, isSelected, selectedBrands, selectedModels, onBrandToggle, onModelToggle, isBrandDropdownOpen, isModelDropdownOpen, onBrandDropdownToggle, onModelDropdownToggle }) {
  return (
    <div className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col group">
      <div className="h-40 bg-[#eceef0] relative overflow-hidden flex items-center justify-center border-b border-[#c5c6cd]">
        <div className="w-full h-full flex items-center justify-center text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
          🔧
        </div>
        {isSelected && (
          <div className="absolute top-2 right-2">
            <span className="material-symbols-outlined text-yellow-400 text-4xl">check_circle</span>
          </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-medium text-[#191c1e] text-sm leading-tight line-clamp-2">{part.name}</h3>
        </div>
        <div className="mb-2">
          <span className="text-[10px] font-mono bg-[#eceef0] px-1.5 py-0.5 rounded">PN: {part.partNo}</span>
        </div>
        <div className="mb-2 text-xs text-[#45474c]">
          <span className="font-medium text-[#191c1e]">MOQ:</span> {part.moq} units
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#c5c6cd] pt-2">
          <div className="flex items-center gap-2">
            {brands && brands.length > 0 && (
              <PartBrandDropdown 
                part={part}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandToggle={onBrandToggle}
                isOpen={isBrandDropdownOpen}
                onToggle={onBrandDropdownToggle}
              />
            )}
            <PartModelDropdown 
              part={part}
              selectedBrands={selectedBrands}
              selectedModels={selectedModels}
              onModelToggle={onModelToggle}
              isOpen={isModelDropdownOpen}
              onToggle={onModelDropdownToggle}
            />
            <span className="text-[10px] text-[#505f76] max-w-[80px] truncate">
              {selectedBrands && selectedBrands.length > 0 ? selectedBrands[0] : 'Select Brand'}
              {selectedModels && selectedModels.length > 0 && `, ${selectedModels.length} models`}
            </span>
          </div>
          <button
            onClick={() => onSelectPart(part)}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
              isSelected 
                ? 'bg-yellow-400 text-gray-800 hover:bg-yellow-500' 
                : 'bg-[#005691] text-white hover:brightness-110'
            }`}
          >
            <span className="material-symbols-outlined text-base">
              {isSelected ? 'check' : 'add'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── CATEGORY SECTION ──────────────────────────────────────────────
function CategorySection({ 
  category, 
  parts, 
  brands,
  onSelectPart,
  selectedParts,
  onBrandToggle,
  onModelToggle,
  openBrandDropdownPart,
  openModelDropdownPart,
  onBrandDropdownToggle,
  onModelDropdownToggle
}) {
  const selectedCount = parts.filter(p => selectedParts.some(sp => sp.name === p.name)).length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-[#005691] flex items-center gap-2">
          <span className="w-1 h-6 bg-[#005691] rounded-full inline-block" />
          {category}
          {selectedCount > 0 && (
            <span className="bg-yellow-400 text-gray-800 text-xs px-2 py-0.5 rounded-full font-bold ml-2">
              {selectedCount} selected
            </span>
          )}
        </h3>
        <button
          onClick={() => {
            parts.forEach(part => {
              if (!selectedParts.some(p => p.name === part.name)) {
                onSelectPart(part)
              }
            })
          }}
          className="text-xs text-[#005691] hover:text-[#0077be] font-medium px-3 py-1 border border-[#005691] rounded-lg hover:bg-[#005691]/5 transition-all"
        >
          Select All
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3">
        {parts.map((part) => {
          const partSelected = selectedParts.find(p => p.name === part.name)
          const selectedBrands = partSelected ? partSelected.selectedBrands || [] : []
          const selectedModels = partSelected ? partSelected.selectedModels || [] : []
          return (
            <ProductCard 
              key={part.name}
              part={part}
              brands={brands}
              onSelectPart={onSelectPart}
              isSelected={!!partSelected}
              selectedBrands={selectedBrands}
              selectedModels={selectedModels}
              onBrandToggle={onBrandToggle}
              onModelToggle={onModelToggle}
              isBrandDropdownOpen={openBrandDropdownPart === part.name}
              isModelDropdownOpen={openModelDropdownPart === part.name}
              onBrandDropdownToggle={(state) => onBrandDropdownToggle(part, state)}
              onModelDropdownToggle={(state) => onModelDropdownToggle(part, state)}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── REVIEW ORDER MODAL ────────────────────────────────────────────
function ReviewOrderModal({ 
  isOpen, 
  onClose, 
  basketItems, 
  onRemoveItem, 
  onClearAll, 
  onConfirmOrder, 
  onContinueShopping,
  onUpdateBasketItems 
}) {
  const [localBasketItems, setLocalBasketItems] = useState([])

  useEffect(() => {
    if (isOpen) {
      setLocalBasketItems(JSON.parse(JSON.stringify(basketItems)))
    }
  }, [isOpen, basketItems])

  if (!isOpen) return null

  const totalItems = localBasketItems.reduce((sum, item) => sum + (item.selectedModels?.length || 0), 0)

  const toggleModelSelection = (partName, model) => {
    setLocalBasketItems(prev => {
      return prev.map(item => {
        if (item.name === partName) {
          const currentModels = item.selectedModels || []
          let newModels
          if (currentModels.includes(model)) {
            newModels = currentModels.filter(m => m !== model)
          } else {
            newModels = [...currentModels, model]
          }
          return { ...item, selectedModels: newModels }
        }
        return item
      })
    })
  }

  const handleRemovePart = (partName) => {
    setLocalBasketItems(prev => prev.filter(item => item.name !== partName))
    onRemoveItem(partName)
  }

  const handleClearAll = () => {
    setLocalBasketItems([])
    onClearAll()
  }

  const handleConfirm = () => {
    // Update parent with modified items
    onUpdateBasketItems(localBasketItems)
    onConfirmOrder(localBasketItems)
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-[#005691] to-[#0077be] rounded-t-2xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-white text-2xl">shopping_basket</span>
            <div>
              <h2 className="text-white font-bold text-lg">Review Order</h2>
              <p className="text-white/70 text-sm">{totalItems} items from {localBasketItems.length} parts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90 duration-300"
          >
            <span className="material-symbols-outlined text-white text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {localBasketItems.length === 0 ? (
            <div className="text-center py-8">
              <span className="material-symbols-outlined text-5xl text-gray-300">shopping_basket</span>
              <p className="text-gray-500 mt-3 text-sm">Your order is empty</p>
              <button
                onClick={onContinueShopping}
                className="mt-4 bg-[#005691] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {localBasketItems.map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-white border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-xs font-bold flex-shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-sm font-medium text-gray-800">{item.name}</span>
                      <span className="text-xs text-gray-400 font-mono">{item.partNo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{item.selectedModels?.length || 0} models</span>
                      <button
                        onClick={() => handleRemovePart(item.name)}
                        className="text-gray-400 hover:text-red-500 transition-all p-1"
                        title="Remove this part"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span>
                      </button>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs font-medium text-[#005691]">Brand:</span>
                      <span className="text-xs text-gray-700">{item.selectedBrands?.join(', ') || 'N/A'}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-medium text-[#005691]">Models:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {item.selectedModels?.map((model, mi) => (
                          <span 
                            key={mi} 
                            className="text-xs bg-blue-50 text-gray-700 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer hover:bg-blue-100 transition-colors"
                            onClick={() => toggleModelSelection(item.name, model)}
                          >
                            {model}
                            <span className="text-gray-400 hover:text-red-500 text-xs ml-0.5">×</span>
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">
                      MOQ: {item.moq} units
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-3.5 flex items-center justify-between bg-gray-50 rounded-b-2xl">
          <button
            onClick={handleClearAll}
            className="text-sm text-red-500 hover:text-red-600 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">delete_forever</span>
            Clear All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onContinueShopping}
              className="text-gray-500 hover:text-gray-700 transition-all flex items-center gap-2 text-sm font-medium"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Continue Shopping
            </button>
            <button
              onClick={handleConfirm}
              disabled={localBasketItems.length === 0 || totalItems === 0}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 shadow-md ${
                localBasketItems.length > 0 && totalItems > 0
                  ? 'bg-[#005691] text-white hover:brightness-110 hover:scale-105'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="material-symbols-outlined text-sm">check_circle</span>
              Confirm Order
            </button>
          </div>
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
  onAddToCart 
}) {
  let totalItems = 0
  const allBrandsSet = new Set()
  const allModelsSet = new Set()
  
  selectedParts.forEach(part => {
    if (part.selectedModels && part.selectedModels.length > 0) {
      totalItems += part.selectedModels.length
      part.selectedModels.forEach(m => allModelsSet.add(m))
    }
    if (part.selectedBrands && part.selectedBrands.length > 0) {
      part.selectedBrands.forEach(b => allBrandsSet.add(b))
    }
  })
  
  const uniqueBrandCount = allBrandsSet.size
  const uniqueModelCount = allModelsSet.size

  if (selectedParts.length === 0 || totalItems === 0) return null

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-white rounded-2xl shadow-2xl border-2 border-[#005691] px-6 py-4 animate-fadeInUp max-w-[90%]">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#005691]">shopping_cart</span>
          <span className="font-bold text-[#005691]">{selectedParts.length}</span>
          <span className="text-gray-600 text-sm">part{selectedParts.length > 1 ? 's' : ''}</span>
          <span className="text-gray-400 text-sm">×</span>
          <span className="font-bold text-[#005691]">{uniqueBrandCount}</span>
          <span className="text-gray-600 text-sm">brand{uniqueBrandCount > 1 ? 's' : ''}</span>
          <span className="text-gray-400 text-sm">×</span>
          <span className="font-bold text-[#005691]">{uniqueModelCount}</span>
          <span className="text-gray-600 text-sm">model{uniqueModelCount > 1 ? 's' : ''}</span>
          <span className="text-gray-400 text-sm">=</span>
          <span className="font-bold text-[#005691]">{totalItems}</span>
          <span className="text-gray-600 text-sm">total items</span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClearAll}
            className="text-sm text-gray-500 hover:text-red-600 transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">clear</span>
            Clear All
          </button>
          <button
            onClick={onAddToCart}
            className="bg-[#005691] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:scale-105 duration-200"
          >
            <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
            Add to Cart
          </button>
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
  onAddToCart,
  onBrandToggle,
  onModelToggle,
  openBrandDropdownPart,
  openModelDropdownPart,
  onBrandDropdownToggle,
  onModelDropdownToggle
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

  let totalItems = 0
  const totalBrandsSet = new Set()
  const totalModelsSet = new Set()
  selectedParts.forEach(part => {
    if (part.selectedModels && part.selectedModels.length > 0) {
      totalItems += part.selectedModels.length
      part.selectedModels.forEach(m => totalModelsSet.add(m))
    }
    if (part.selectedBrands && part.selectedBrands.length > 0) {
      part.selectedBrands.forEach(b => totalBrandsSet.add(b))
    }
  })
  const brandCount = totalBrandsSet.size
  const modelCount = totalModelsSet.size

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <div className="rounded-xl overflow-hidden h-64 bg-[#eceef0] relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => { e.target.style.background = '#eceef0' }}
          />
          <div className="absolute top-3 right-3 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-md text-2xl">
            {product.icon}
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-[#005691] mb-1">{product.name}</h2>
          <p className="text-[#005691] font-semibold text-xs mb-3 uppercase tracking-widest">
            {product.tagline}
          </p>
          <p className="text-[#505f76] text-sm leading-relaxed mb-4">{product.description}</p>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Categories</div>
              <div className="text-xl font-bold text-[#005691]">{uniqueCategories.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">Brands</div>
              <div className="text-xl font-bold text-[#005691]">{brands.length}</div>
            </div>
            <div className="bg-gray-50 rounded-lg px-4 py-2 border border-gray-200">
              <div className="text-[10px] text-gray-500 uppercase tracking-wider">MOQ</div>
              <div className="text-xl font-bold text-[#005691]">Flexible</div>
            </div>
          </div>
          
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => onNavigate('Contact Us')}
              className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:scale-105 duration-200"
            >
              <span className="material-symbols-outlined text-sm">request_quote</span>
              Request Quote
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-[#45474c]">Active Filters:</span>
          <span className="bg-[#eceef0] px-3 py-1 rounded-full text-xs flex items-center gap-1">
            {product.name} <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-red-500">close</span>
          </span>
          {selectedCategory !== 'all' && (
            <span className="bg-[#eceef0] px-3 py-1 rounded-full text-xs flex items-center gap-1">
              {selectedCategory} <span className="material-symbols-outlined text-[16px] cursor-pointer hover:text-red-500" onClick={() => setSelectedCategory('all')}>close</span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#45474c]">Sort by:</span>
          <select className="border border-[#c5c6cd] rounded-lg bg-white text-sm py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[#005691]">
            <option>Part Number (A-Z)</option>
            <option>Most Popular</option>
            <option>Newest Additions</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-[#c5c6cd] rounded-xl p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">search</span>
            <input
              type="text"
              placeholder={`Search ${product.name} parts...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005691] focus:bg-white transition-all duration-300"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#005691] transition-all duration-300 bg-gray-50 hover:bg-white min-w-[160px]"
          >
            <option value="all">📋 All Categories</option>
            {uniqueCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        {searchTerm && (
          <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">info</span>
            Found <span className="font-semibold text-[#005691]">{filteredParts.length}</span> results
          </div>
        )}
      </div>

      <div className="space-y-4">
        {Object.entries(groupedParts).map(([category, parts]) => (
          <CategorySection 
            key={category}
            category={category}
            parts={parts}
            brands={brands}
            onSelectPart={onSelectPart}
            selectedParts={selectedParts}
            onBrandToggle={onBrandToggle}
            onModelToggle={onModelToggle}
            openBrandDropdownPart={openBrandDropdownPart}
            openModelDropdownPart={openModelDropdownPart}
            onBrandDropdownToggle={onBrandDropdownToggle}
            onModelDropdownToggle={onModelDropdownToggle}
          />
        ))}
        {filteredParts.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl border border-[#c5c6cd]">
            <span className="material-symbols-outlined text-4xl text-gray-300">search_off</span>
            <p className="text-gray-500 mt-2 text-sm">No parts found matching your search.</p>
          </div>
        )}
      </div>

      <SelectionSummary 
        selectedParts={selectedParts}
        onClearAll={onClearAllParts}
        onAddToCart={onAddToCart}
      />

      <div className="bg-gradient-to-r from-[#005691] to-[#0077be] text-white rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Need Custom Specifications?</h3>
          <p className="text-white/80 text-sm">We source bespoke components to your exact requirements.</p>
        </div>
        <button
          onClick={() => onNavigate('Contact Us')}
          className="bg-white text-[#005691] px-6 py-2.5 rounded-lg font-semibold text-sm hover:shadow-xl transition-all whitespace-nowrap flex items-center gap-2 hover:scale-105 duration-200"
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
  const [basketItems, setBasketItems] = useState([])
  const [isReviewOrderOpen, setIsReviewOrderOpen] = useState(false)
  const [openBrandDropdownPart, setOpenBrandDropdownPart] = useState(null)
  const [openModelDropdownPart, setOpenModelDropdownPart] = useState(null)

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
        : [...currentList, { ...part, selectedBrands: [], selectedModels: [] }]
      
      saveToStorage(newList, active)
      
      return { ...prev, [active]: newList }
    })
  }

  const handleClearAllParts = () => {
    setSelectedPartsByTab(prev => {
      const updated = { ...prev, [active]: [] }
      const storageKey = `selectedParts_${active}`
      localStorage.removeItem(storageKey)
      localStorage.removeItem(`productCategory_${active}`)
      sessionStorage.removeItem(storageKey)
      sessionStorage.removeItem(`productCategory_${active}`)
      setOpenBrandDropdownPart(null)
      setOpenModelDropdownPart(null)
      window.dispatchEvent(new Event('selectedPartsUpdated'))
      return updated
    })
  }

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
    } else {
      localStorage.removeItem(storageKey)
      localStorage.removeItem(categoryKey)
      sessionStorage.removeItem(storageKey)
      sessionStorage.removeItem(categoryKey)
    }
    window.dispatchEvent(new Event('selectedPartsUpdated'))
  }

  const saveBasketToStorage = (items) => {
    try {
      localStorage.setItem('basketItems', JSON.stringify(items))
      sessionStorage.setItem('basketItems', JSON.stringify(items))
      console.log('💾 [Products] Basket saved to storage:', items.length, 'items')
    } catch (err) {
      console.error('Failed to save basket to storage:', err)
    }
  }

  const handleAddToCart = () => {
    const currentParts = selectedPartsByTab[active] || []
    const hasModels = currentParts.some(p => p.selectedModels && p.selectedModels.length > 0)
    
    if (currentParts.length > 0 && hasModels) {
      // Add to basket - merge items with same part name
      const updatedBasket = [...basketItems]
      currentParts.forEach(part => {
        const existingIndex = updatedBasket.findIndex(item => item.name === part.name)
        if (existingIndex !== -1) {
          // Merge models if part exists
          const existingModels = updatedBasket[existingIndex].selectedModels || []
          const newModels = part.selectedModels || []
          const mergedModels = [...new Set([...existingModels, ...newModels])]
          updatedBasket[existingIndex] = {
            ...updatedBasket[existingIndex],
            selectedModels: mergedModels,
            selectedBrands: part.selectedBrands || updatedBasket[existingIndex].selectedBrands
          }
        } else {
          updatedBasket.push({ ...part })
        }
      })
      
      setBasketItems(updatedBasket)
      saveBasketToStorage(updatedBasket)
      
      // Clear selected parts
      setSelectedPartsByTab(prev => {
        const updated = { ...prev, [active]: [] }
        const storageKey = `selectedParts_${active}`
        localStorage.removeItem(storageKey)
        localStorage.removeItem(`productCategory_${active}`)
        sessionStorage.removeItem(storageKey)
        sessionStorage.removeItem(`productCategory_${active}`)
        return updated
      })
      
      setOpenBrandDropdownPart(null)
      setOpenModelDropdownPart(null)
      
      // Open Review Order modal
      setIsReviewOrderOpen(true)
    } else {
      alert('Please select at least one part with models before adding to cart.')
    }
  }

  const handleRemoveFromBasket = (partName) => {
    const updated = basketItems.filter(item => item.name !== partName)
    setBasketItems(updated)
    saveBasketToStorage(updated)
  }

  const handleClearBasket = () => {
    setBasketItems([])
    saveBasketToStorage([])
  }

  const handleUpdateBasketItems = (updatedItems) => {
    setBasketItems(updatedItems)
    saveBasketToStorage(updatedItems)
  }

  const handleConfirmOrder = (finalItems) => {
    if (!finalItems || finalItems.length === 0) return
    
    console.log('Confirming order with items:', finalItems)
    
    // Save to storage for ContactUs page
    saveBasketToStorage(finalItems)
    
    // Also save as selected parts for the form
    const category = active === 'motorcycle' ? 'Motorcycle Parts & Accessories' : 
                    active === 'e-bike' ? 'E-Bike Parts & Components' : 
                    'Industrial Sealing Solutions'
    
    // Save to the format ContactUs expects
    localStorage.setItem('selectedParts', JSON.stringify(finalItems))
    localStorage.setItem('productCategory', category)
    sessionStorage.setItem('selectedParts', JSON.stringify(finalItems))
    sessionStorage.setItem('productCategory', category)
    
    setIsReviewOrderOpen(false)
    onNavigate('Contact Us')
  }

  const handleContinueShopping = () => {
    setIsReviewOrderOpen(false)
  }

  const handleBrandToggle = (part, brandOrBrands) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)
      let updatedList = exists ? currentList : [...currentList, { ...part, selectedBrands: [], selectedModels: [] }]

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

          return { ...p, selectedBrands: newBrands, selectedModels: [] }
        }
        return p
      })

      saveToStorage(updatedList, active)
      
      return { ...prev, [active]: updatedList }
    })
  }

  const handleModelToggle = (part, modelOrModels) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)
      let updatedList = exists ? currentList : [...currentList, { ...part, selectedBrands: [], selectedModels: [] }]

      updatedList = updatedList.map(p => {
        if (p.name === part.name) {
          let newModels = [...(p.selectedModels || [])]

          if (Array.isArray(modelOrModels)) {
            newModels = modelOrModels.length === 0 ? [] : [...modelOrModels]
          } else if (modelOrModels === null) {
            return p
          } else {
            if (newModels.includes(modelOrModels)) {
              newModels = newModels.filter(m => m !== modelOrModels)
            } else {
              newModels = [...newModels, modelOrModels]
            }
          }

          return { ...p, selectedModels: newModels }
        }
        return p
      })

      saveToStorage(updatedList, active)
      
      return { ...prev, [active]: updatedList }
    })
  }

  const handleBrandDropdownToggle = (part, isOpen) => {
    if (isOpen === false) {
      setOpenBrandDropdownPart(null)
    } else {
      setOpenBrandDropdownPart(openBrandDropdownPart === part.name ? null : part.name)
      setOpenModelDropdownPart(null)
    }
  }

  const handleModelDropdownToggle = (part, isOpen) => {
    if (isOpen === false) {
      setOpenModelDropdownPart(null)
    } else {
      setOpenModelDropdownPart(openModelDropdownPart === part.name ? null : part.name)
      setOpenBrandDropdownPart(null)
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
      if (part.selectedModels && part.selectedModels.length > 0) {
        totalItems += part.selectedModels.length
      }
    })
    return totalItems
  }

  const getTotalBasketItems = () => {
    let total = 0
    basketItems.forEach(item => {
      if (item.selectedModels && item.selectedModels.length > 0) {
        total += item.selectedModels.length
      }
    })
    return total
  }

  const totalBasketItems = getTotalBasketItems()

  // Load basket from storage on mount
  useEffect(() => {
    const loadBasketFromStorage = () => {
      try {
        const stored = localStorage.getItem('basketItems') || sessionStorage.getItem('basketItems')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setBasketItems(parsed)
            console.log('📥 [Products] Loaded basket from storage:', parsed.length, 'items')
          }
        }
      } catch (err) {
        console.error('Failed to load basket from storage:', err)
      }
    }
    
    loadBasketFromStorage()
  }, [])

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

      <ReviewOrderModal 
        isOpen={isReviewOrderOpen}
        onClose={() => setIsReviewOrderOpen(false)}
        basketItems={basketItems}
        onRemoveItem={handleRemoveFromBasket}
        onClearAll={handleClearBasket}
        onConfirmOrder={handleConfirmOrder}
        onContinueShopping={handleContinueShopping}
        onUpdateBasketItems={handleUpdateBasketItems}
      />

      <section className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden">
        <img
          src="/assets/vvv.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest">
            Our Products
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Industrial Product Catalogue</h1>
          <p className="text-white/80 text-base max-w-2xl">
            Quality-verified sealing components sourced from certified partner manufacturers, supplied for demanding industrial applications worldwide.
          </p>
        </div>
      </section>

      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex gap-6 overflow-x-auto py-3">
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
                    setOpenBrandDropdownPart(null)
                    setOpenModelDropdownPart(null)
                  }}
                  className={`
                    px-5 py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2
                    ${active === p.id 
                      ? 'bg-[#005691] text-white shadow-lg transform scale-105' 
                      : 'text-[#505f76] hover:text-[#005691] hover:bg-[#005691]/10'
                    }
                    transform transition-all duration-300 ease-in-out
                    hover:scale-105
                  `}
                >
                  <span className="text-lg">{p.icon || '📦'}</span>
                  {p.name}
                  {p.id !== 'industrial-seals' && tabHasSelection && (
                    <span className="bg-yellow-400 text-gray-800 text-xs px-2 py-0.5 rounded-full ml-1">
                      {tabTotalItems}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Review Order Button */}
      {active !== 'industrial-seals' && (
        <div className="max-w-[1280px] mx-auto px-8 py-3">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#005691] text-xl">shopping_basket</span>
              <div>
                <span className="font-semibold text-sm text-gray-700">Review Order</span>
                <span className="text-xs text-gray-500 ml-2">
                  {basketItems.length > 0 ? (
                    <>{totalBasketItems} item{totalBasketItems > 1 ? 's' : ''} in cart</>
                  ) : (
                    'Empty'
                  )}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsReviewOrderOpen(true)}
              className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2 ${
                basketItems.length > 0 
                  ? 'bg-[#005691] text-white hover:brightness-110 hover:scale-105' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
              disabled={basketItems.length === 0}
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              View Order
              {basketItems.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full ml-1">
                  {totalBasketItems}
                </span>
              )}
            </button>
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-8 py-6">
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
          onAddToCart={handleAddToCart}
          onBrandToggle={handleBrandToggle}
          onModelToggle={handleModelToggle}
          openBrandDropdownPart={openBrandDropdownPart}
          openModelDropdownPart={openModelDropdownPart}
          onBrandDropdownToggle={handleBrandDropdownToggle}
          onModelDropdownToggle={handleModelDropdownToggle}
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
      `}</style>
    </div>
  )
}