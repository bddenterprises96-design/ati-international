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

// ── MOTORCYCLE PARTS IMAGES ───────────────────────────────────────────
const MOTORCYCLE_PARTS_IMAGES = {
  // Engine Parts
  'Cylinder Head':          '/assets/parts/engine_cylinder_head.png',
  'Cylinder Block':         '/assets/parts/engine_cylinder_block.png',
  'Piston':                 '/assets/parts/engine_piston.png',
  'Piston Rings':           '/assets/parts/engine_piston_rings.png',
  'Piston Pin':             '/assets/parts/engine_piston_pin.png',
  'Connecting Rod':         '/assets/parts/engine_connecting_rod.png',
  'Crankshaft':             '/assets/parts/engine_crankshaft.png',
  'Camshaft':              '/assets/parts/engine_camshaft.png',
  'Valves':                '/assets/parts/engine_valves.png',
  'Valve Stem Seals':      '/assets/parts/engine_valve_stem_seals.png',
  'Valve Guides':          '/assets/parts/engine_valve_guides.png',
  'Valve Springs':         '/assets/parts/engine_valve_springs.png',
  'Rocker Arms':            '/assets/parts/engine_rocker_arms.png',
  'Timing Chain':           '/assets/parts/Timing Chain.png',
  'Timing Chain Tensioner': '/assets/parts/Timing Chain Tensioner.png',
  'Cam Chain Guide':        '/assets/parts/Cam Chain Guide.png',
  'Oil Pump':               '/assets/parts/Oil Pump.png',
  'Oil Filter':             '/assets/parts/Oil Filter.png',
  'Oil Seals':              '/assets/parts/Oil Seals.png',
  'O-Rings':                '/assets/parts/O-Rings.png',
  'Gaskets':                '/assets/parts/Gaskets.png',
  'Engine Bearings':        '/assets/parts/Engine Bearings.png',
  'Crankcase':              '/assets/parts/Crankcase.png',
  'Clutch Cover':           '/assets/parts/Clutch Cover.png',

  // Transmission & Clutch
  'Clutch Plates':          '/assets/parts/Clutch Plates.png',
  'Clutch Friction Plates': '/assets/parts/Clutch Friction Plates.png',
  'Clutch Basket':          '/assets/parts/Clutch Basket.png',
  'Clutch Hub':             '/assets/parts/Clutch Hub.png',
  'Clutch Springs':         '/assets/parts/Clutch Springs.png',
  'Clutch Cable':           '/assets/parts/Clutch Cable.png',
  'Gear Shift Drum':        '/assets/parts/Gear Shift Drum.png',
  'Gear Shift Fork':        '/assets/parts/Gear Shift Fork.png',
  'Transmission Gears':     '/assets/parts/Transmission Gears.png',
  'Drive Shaft':            '/assets/parts/Drive Shaft.png',
  'Counter Shaft':          '/assets/parts/Counter Shaft.png',
  'Kick Starter':           '/assets/parts/Kick Starter.png',
  'Gear Lever':             '/assets/parts/Gear Lever.png'
}

function getDeterministicHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// ── GENERATE PRODUCT PARTS WITH CATEGORIES ────────────────────────
function generatePartsWithCategories(partsData, customImages = {}) {
  const result = []
  Object.entries(partsData).forEach(([category, items]) => {
    items.forEach(item => {
      const hash = getDeterministicHash(item)
      const moqOptions = [500, 1000, 2000, 5000]
      const partNumSuffix = 100 + (hash % 900)
      const moq = moqOptions[hash % moqOptions.length]

      result.push({
        name: item,
        category: category,
        image: customImages[item] || null,
        partNo: `ATI-${item.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X')}-${partNumSuffix}`,
        moq: moq,
        selectedBrands: [],
        selectedModels: [],
        modelQuantities: {},
        quantity: 0
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
    icon: 'precision_manufacturing',
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
    icon: 'two_wheeler',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600',
    description: 'ATI supplies a comprehensive range of sealing components specifically sourced for motorcycle engines.',
    parts: generatePartsWithCategories(MOTORCYCLE_PARTS, MOTORCYCLE_PARTS_IMAGES),
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
    icon: 'electric_bike',
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

  const hasBrand = selectedBrands && selectedBrands.length > 0

  return (
    <div className="relative inline-block flex-1 min-w-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          onToggle(!isOpen)
        }}
        className={`
          w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-between gap-1 transition-all duration-200 cursor-pointer group
          ${isOpen 
            ? 'border-[#005691] bg-[#005691]/10 text-[#005691] ring-2 ring-[#005691]/20 font-semibold' 
            : hasBrand
              ? 'border-[#005691]/40 bg-[#005691]/8 text-[#005691] hover:bg-[#005691]/15 hover:border-[#005691] font-semibold'
              : 'border-blue-200 bg-blue-50/60 text-gray-700 hover:border-[#005691] hover:bg-blue-100/60 hover:text-[#005691]'
          }
        `}
        title="Click to select brand"
      >
        <div className="flex items-center gap-1 min-w-0 truncate">
          <span className="material-symbols-outlined text-[14px] text-[#005691] flex-shrink-0">apartment</span>
          <span className="truncate leading-tight">
            {hasBrand ? selectedBrands[0] : 'Brand'}
          </span>
        </div>
        <span className={`material-symbols-outlined text-[15px] text-gray-400 group-hover:text-[#005691] transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180 text-[#005691]' : ''}`}>
          expand_more
        </span>
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

// ── E-BIKE BRAND MODELS DATA ─────────────────────────────────────────────
const EBIKE_BRAND_MODELS = {
  'Bafang': [
    'Bafang M400 (MM G330)', 'Bafang M500 (MM G520)', 'Bafang M600 (MM G521)', 'Bafang M510 (MM G522)', 
    'Bafang M820 Mid Drive', 'Bafang H400 Rear Hub', 'Bafang H600 Front Hub', 'Bafang H700 Rear Hub', 
    'Bafang BBS01B 250W', 'Bafang BBS02B 750W', 'Bafang BBSHD 1000W'
  ],
  'Bosch': [
    'Bosch Performance Line CX Gen 4', 'Bosch Performance Line CX Race', 'Bosch Active Line Plus', 
    'Bosch Cargo Line', 'Bosch Performance Line SX', 'Bosch PowerTube 500Wh', 'Bosch PowerTube 625Wh', 
    'Bosch PowerTube 750Wh', 'Bosch Kiox 300 / Intuvia 100 Display'
  ],
  'Shimano Steps': [
    'Shimano Steps E8000', 'Shimano EP8 (EP800)', 'Shimano EP6 (EP600)', 'Shimano Steps E6100', 
    'Shimano Steps E5000', 'Shimano BT-E8036 630Wh Battery', 'Shimano EW-SD300 Di2 Wire'
  ],
  'Shimano': [
    'Shimano Steps E8000', 'Shimano EP8 (EP800)', 'Shimano EP6 (EP600)', 'Shimano Steps E6100', 
    'Shimano Steps E5000', 'Shimano BT-E8036 630Wh Battery', 'Shimano EW-SD300 Di2 Wire'
  ],
  'Yamaha': [
    'Yamaha PW-X3', 'Yamaha PW-S2', 'Yamaha PW-ST', 'Yamaha PW-CE', 
    'Yamaha CrossCore RC', 'Yamaha Wabash RT', 'Yamaha Moro 07', 'Yamaha 500Wh Crossover Battery'
  ],
  'Panasonic': [
    'Panasonic GX Ultimate', 'Panasonic GX Power Plus', 'Panasonic GX Option', 
    'Panasonic GX Drive Unit', 'Panasonic 630Wh Integrated Battery'
  ],
  'Trek': [
    'Trek Fuel EXe (TQ HPR50)', 'Trek Rail 9.8 (Bosch CX)', 'Trek Powerfly 5', 
    'Trek Allant+ 7', 'Trek FX+ 2', 'Trek Marlin+ 8'
  ],
  'Specialized': [
    'Specialized Turbo Levo Comp', 'Specialized Turbo Kenevo Expert', 'Specialized Turbo Vado 4.0', 
    'Specialized Turbo Como SL', 'Specialized SL 1.1 Motor', 'Specialized SL 1.2 Motor'
  ],
  'Giant': [
    'Giant Trance X E+ (SyncDrive Pro2)', 'Giant Reign E+ 1', 'Giant Stance E+ 2', 
    'Giant Explore E+ 1', 'Giant EnergyPak Smart 800 Battery'
  ],
  'Cannondale': [
    'Cannondale Moterra Neo Carbon', 'Cannondale Habit Neo', 'Cannondale Tesoro Neo X', 
    'Cannondale Adventure Neo Allroad', 'Cannondale Topstone Neo SL'
  ],
  'Cube': [
    'Cube Stereo Hybrid 140 HPC', 'Cube Reaction Hybrid Pro 750', 'Cube Kathmandu Hybrid EXC', 
    'Cube Supreme Hybrid Pro', 'Cube Touring Hybrid ONE'
  ],
  'Haibike': [
    'Haibike AllMtn 7 (Yamaha PW-X3)', 'Haibike Nduro 6 (Bosch CX)', 'Haibike Adventr FS 9', 
    'Haibike Trekking 4 High', 'Haibike SDURO FullSeven'
  ],
  'Riese & Müller': [
    'Riese & Müller Superdelite GT', 'Riese & Müller Delite Mountain', 'Riese & Müller Charger4 GT', 
    'Riese & Müller Load 75 Cargo', 'Riese & Müller Nevo4'
  ],
  'Gazelle': [
    'Gazelle Ultimate C380 HMB', 'Gazelle Medeo T10+ HMB', 'Gazelle Arroyo C8 HMB', 
    'Gazelle Bloom C380 HMS', 'Gazelle Avignon C380 HMB'
  ],
  'KTM': [
    'KTM Macina Kapoho 791', 'KTM Macina Lycan 271', 'KTM Macina Team 691', 
    'KTM Macina Cross LFC', 'KTM Macina City 610'
  ],
  'Bulls': [
    'Bulls Copperhead EVO AM 3', 'Bulls E-Stream EVO AM 4 (Brose Mag S)', 'Bulls Desert Falcon EVO', 
    'Bulls Urban EVO 10', 'Bulls Lacuba EVO Lite'
  ]
}

// DEFAULT MODELS PRESETS FOR FALLBACK
const DEFAULT_MOTORCYCLE_MODELS = ['Honda CG125', 'Honda CD70', 'Yamaha YBR125', 'Suzuki GS150', 'Bajaj Pulsar 150', 'TVS Apache RTR 160', 'Hero Splendor Plus', 'Kawasaki Ninja 250']
const DEFAULT_EBIKE_MODELS = ['Bafang M400 / M500 / M600', 'Bosch Performance Line CX', 'Shimano Steps E8000', 'Yamaha PW-X3', 'Ananda M230', 'TongSheng TSDZ2', 'Generic 250W-1000W Hub Motor']

// ── MODEL DROPDOWN ─────────────────────────────────────────────────
function PartModelDropdown({ part, selectedBrands, selectedModels, onModelToggle, isOpen, onToggle }) {
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })

  const getAvailableModels = () => {
    const models = new Set()

    if (part.applicableModels && part.applicableModels.length > 0) {
      part.applicableModels.forEach(m => models.add(m))
    }

    if (selectedBrands && selectedBrands.length > 0) {
      selectedBrands.forEach(brand => {
        if (BRAND_MODELS[brand]) {
          BRAND_MODELS[brand].forEach(model => models.add(model))
        }
        if (EBIKE_BRAND_MODELS[brand]) {
          EBIKE_BRAND_MODELS[brand].forEach(model => models.add(model))
        }
      })
    }

    if (models.size === 0) {
      const isEbike = part.category && part.category.toLowerCase().includes('e-bike')
      const fallbackList = isEbike ? DEFAULT_EBIKE_MODELS : DEFAULT_MOTORCYCLE_MODELS
      fallbackList.forEach(m => models.add(m))
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

  const hasModels = selectedCount > 0

  return (
    <div className="relative inline-block flex-1 min-w-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (hasBrands) {
            onToggle(!isOpen)
          }
        }}
        className={`
          w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-between gap-1 transition-all duration-200 group
          ${!hasBrands 
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-75' 
            : isOpen 
              ? 'border-[#005691] bg-[#005691]/10 text-[#005691] ring-2 ring-[#005691]/20 font-semibold cursor-pointer' 
              : hasModels
                ? 'border-[#005691]/40 bg-[#005691]/8 text-[#005691] hover:bg-[#005691]/15 hover:border-[#005691] font-semibold cursor-pointer'
                : 'border-blue-200 bg-blue-50/60 text-gray-700 hover:border-[#005691] hover:bg-blue-100/60 hover:text-[#005691] cursor-pointer'
          }
        `}
        title={hasBrands ? "Click to select models" : "Select a brand first"}
        disabled={!hasBrands}
      >
        <div className="flex items-center gap-1 min-w-0 truncate">
          <span className={`material-symbols-outlined text-[14px] flex-shrink-0 ${hasBrands ? 'text-[#005691]' : 'text-gray-400'}`}>two_wheeler</span>
          <span className="truncate leading-tight">
            {hasModels 
              ? `${selectedCount} model${selectedCount > 1 ? 's' : ''}` 
              : 'Model'}
          </span>
        </div>
        <span className={`material-symbols-outlined text-[15px] transition-transform duration-200 flex-shrink-0 ${
          !hasBrands ? 'text-gray-300' : 'text-gray-400 group-hover:text-[#005691]'
        } ${isOpen ? 'rotate-180 text-[#005691]' : ''}`}>
          expand_more
        </span>
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

// ── QUANTITY DROPDOWN ─────────────────────────────────────────────────
function PartQuantityDropdown({ part, selectedModels, onModelQuantityChange, isOpen, onToggle }) {
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const [modelQuantities, setModelQuantities] = useState({})
  const [totalQtyError, setTotalQtyError] = useState('')

  const moq = part.moq || 1000

  // Initialize quantities for selected models
  useEffect(() => {
    if (selectedModels && selectedModels.length > 0) {
      const newQuantities = {}
      // Distribute MOQ evenly among selected models
      const baseQty = Math.floor(moq / selectedModels.length)
      const remainder = moq % selectedModels.length
      
      selectedModels.forEach((model, index) => {
        const extra = index < remainder ? 1 : 0
        const qty = modelQuantities[model] || (baseQty + extra)
        newQuantities[model] = qty
      })
      setModelQuantities(prev => ({ ...prev, ...newQuantities }))
      
      // Notify parent of initial quantities
      selectedModels.forEach(model => {
        const qty = newQuantities[model] || (baseQty + (selectedModels.indexOf(model) < remainder ? 1 : 0))
        onModelQuantityChange(part, model, qty)
      })
    }
  }, [selectedModels, moq])

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

      const dropdownHeight = Math.min(400, selectedModels.length * 60 + 140)
      if (top + dropdownHeight > window.innerHeight - 8) {
        const above = rect.top - dropdownHeight - 4
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
  }, [isOpen, selectedModels.length])

  const hasModels = selectedModels && selectedModels.length > 0
  const totalModels = selectedModels ? selectedModels.length : 0

  const handleQuantityChange = (model, value) => {
    // Allow empty string for manual typing
    if (value === '') {
      setModelQuantities(prev => ({ ...prev, [model]: '' }))
      return
    }
    
    const qty = parseInt(value)
    if (isNaN(qty) || qty < 0) {
      setModelQuantities(prev => ({ ...prev, [model]: 0 }))
      return
    }
    
    setModelQuantities(prev => ({ ...prev, [model]: qty }))
    
    // Calculate total quantity across all selected models
    const allQuantities = { ...modelQuantities, [model]: qty }
    let total = 0
    selectedModels.forEach(m => {
      total += (allQuantities[m] || 0)
    })
    
    // Check if total meets MOQ
    if (total >= moq && total > 0) {
      setTotalQtyError('')
      // Only notify parent if total meets MOQ
      onModelQuantityChange(part, model, qty)
    } else if (total === 0) {
      setTotalQtyError('Total quantity cannot be zero')
      onModelQuantityChange(part, model, qty)
    } else {
      setTotalQtyError(`Total quantity must be at least ${moq.toLocaleString()} units`)
      // Still update parent but with a flag
      onModelQuantityChange(part, model, qty)
    }
  }

  const handleBlur = (model, value) => {
    // If empty or 0, set to minimum MOQ distribution
    if (value === '' || parseInt(value) === 0) {
      const baseQty = Math.floor(moq / selectedModels.length)
      const remainder = moq % selectedModels.length
      const index = selectedModels.indexOf(model)
      const extra = index < remainder ? 1 : 0
      const defaultQty = baseQty + extra
      
      setModelQuantities(prev => ({ ...prev, [model]: defaultQty }))
      
      // Check if total meets MOQ
      let total = 0
      const updatedQuantities = { ...modelQuantities, [model]: defaultQty }
      selectedModels.forEach(m => {
        total += (updatedQuantities[m] || 0)
      })
      
      if (total >= moq) {
        setTotalQtyError('')
      }
      onModelQuantityChange(part, model, defaultQty)
    }
  }

  const formatNumber = (num) => {
    if (num === '' || num === undefined || num === null) return ''
    return num.toLocaleString()
  }

  const getTotalQuantity = () => {
    let total = 0
    if (selectedModels) {
      selectedModels.forEach(model => {
        const qty = modelQuantities[model]
        if (qty !== '' && !isNaN(qty)) {
          total += parseInt(qty) || 0
        }
      })
    }
    return total
  }

  const totalQuantity = getTotalQuantity()
  const isValidTotal = totalQuantity >= moq && totalQuantity > 0

  return (
    <div className="relative inline-block flex-1 min-w-0">
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          if (hasModels) {
            onToggle(!isOpen)
          }
        }}
        className={`
          w-full px-2.5 py-1.5 rounded-lg border text-[11px] font-medium flex items-center justify-between gap-1 transition-all duration-200 group
          ${!hasModels 
            ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed opacity-75' 
            : isOpen 
              ? 'border-[#005691] bg-[#005691]/10 text-[#005691] ring-2 ring-[#005691]/20 font-semibold' 
              : totalQuantity > 0 && isValidTotal
                ? 'border-[#005691]/40 bg-[#005691]/8 text-[#005691] hover:bg-[#005691]/15 hover:border-[#005691] font-semibold'
                : totalQuantity > 0 && !isValidTotal
                  ? 'border-yellow-400 bg-yellow-50 text-yellow-600 hover:bg-yellow-100/60 hover:border-yellow-500'
                  : 'border-blue-200 bg-blue-50/60 text-gray-700 hover:border-[#005691] hover:bg-blue-100/60 hover:text-[#005691]'
          }
        `}
        title={hasModels ? "Set quantities for each model" : "Select models first"}
        disabled={!hasModels}
      >
        <div className="flex items-center gap-1 min-w-0 truncate">
          <span className={`material-symbols-outlined text-[14px] flex-shrink-0 ${hasModels ? 'text-[#005691]' : 'text-gray-400'}`}>numbers</span>
          <span className="truncate leading-tight">
            {hasModels ? `${formatNumber(totalQuantity)} units` : 'Qty'}
          </span>
        </div>
        <span className={`material-symbols-outlined text-[15px] transition-transform duration-200 flex-shrink-0 ${
          !hasModels ? 'text-gray-300' : 'text-gray-400 group-hover:text-[#005691]'
        } ${isOpen ? 'rotate-180 text-[#005691]' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && hasModels && createPortal(
        <div 
          ref={dropdownRef}
          className="fixed bg-white rounded-xl shadow-2xl border border-gray-200 z-[9999] p-4"
          style={{ top: position.top, left: position.left, width: DROPDOWN_WIDTH, minWidth: '280px', maxHeight: '400px', overflowY: 'auto' }}
        >
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
            <span className="text-sm font-semibold text-gray-700 truncate pr-2" title={part.name}>
              {part.name} - Quantities
            </span>
            <div className="flex flex-col items-end">
              <span className={`text-[11px] font-bold ${isValidTotal ? 'text-emerald-600' : 'text-red-500'}`}>
                Total: {formatNumber(totalQuantity)}
              </span>
              {totalQuantity > 0 && (
                <span className={`text-[9px] font-medium ${isValidTotal ? 'text-emerald-500' : 'text-red-400'}`}>
                  {isValidTotal ? '✓ MOQ met' : `Need ${(moq - totalQuantity).toLocaleString()} more`}
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">
              Per Model (min total {formatNumber(moq)} across all models)
            </p>
            {selectedModels.map((model) => {
              const currentQty = modelQuantities[model] !== undefined ? modelQuantities[model] : ''
              return (
                <div key={model} className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <span className="text-xs text-gray-700 flex-1 truncate">{model}</span>
                  <input
                    type="number"
                    value={currentQty}
                    onChange={(e) => handleQuantityChange(model, e.target.value)}
                    onBlur={(e) => handleBlur(model, e.target.value)}
                    min={0}
                    step={1}
                    className="w-20 px-2 py-1 rounded-lg border border-gray-300 text-xs focus:outline-none focus:border-[#005691] focus:ring-1 focus:ring-[#005691] text-right"
                    placeholder="0"
                  />
                  <span className="text-[9px] text-gray-400 whitespace-nowrap">units</span>
                </div>
              )
            })}
          </div>

          {totalQtyError && (
            <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-[10px] text-red-600">{totalQtyError}</p>
            </div>
          )}

          <div className="mt-3 pt-2 border-t border-gray-200 flex justify-between items-center">
            <p className="text-[10px] text-gray-400">
              {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  // Distribute MOQ evenly among selected models
                  const baseQty = Math.floor(moq / selectedModels.length)
                  const remainder = moq % selectedModels.length
                  const newQuantities = {}
                  selectedModels.forEach((model, index) => {
                    const extra = index < remainder ? 1 : 0
                    newQuantities[model] = baseQty + extra
                  })
                  setModelQuantities(newQuantities)
                  setTotalQtyError('')
                  selectedModels.forEach(model => {
                    onModelQuantityChange(part, model, newQuantities[model])
                  })
                }}
                className="text-[10px] text-[#005691] hover:underline font-medium"
              >
                Distribute evenly
              </button>
              <button
                onClick={() => {
                  // Set all to 0
                  const zeroQuantities = {}
                  selectedModels.forEach(model => {
                    zeroQuantities[model] = 0
                  })
                  setModelQuantities(zeroQuantities)
                  setTotalQtyError(`Total quantity must be at least ${moq.toLocaleString()} units`)
                  selectedModels.forEach(model => {
                    onModelQuantityChange(part, model, 0)
                  })
                }}
                className="text-[10px] text-red-500 hover:underline font-medium"
              >
                Reset all
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

// ── CATEGORY ICON MAP ───────────────────────────────────────────
const CATEGORY_ICONS = {
  'Engine Parts':                'settings',
  'Transmission & Clutch':      'cycle',
  'Fuel System':                'local_gas_station',
  'Air Intake System':          'air',
  'Exhaust System':             'heat',
  'Cooling System':             'ac_unit',
  'Brake System':               'emergency_heat',
  'Suspension & Steering':      'tune',
  'Wheels & Tires':             'tire_repair',
  'Chain Drive':                'link',
  'Electrical Parts':           'bolt',
  'Lighting':                   'light_mode',
  'Controls':                   'tune',
  'Body Parts':                 'directions_bike',
  'Rubber & Sealing Components':'circle',
  'Motorcycle Accessories':     'backpack',
  'Electric Drive System':      'electric_bolt',
  'Battery System':             'battery_charging_full',
  'Electrical Components':      'power',
  'Drivetrain':                 'settings_applications',
  'Frame & Body Parts':         'pedal_bike',
  'Lighting & Safety':          'lightbulb',
  'Fasteners & Hardware':       'hardware',
  'E-Bike Accessories':         'backpack',
}

// Returns a Material Symbols icon name string for a given category
function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || 'inventory_2'
}

// ── PRODUCT CARD (horizontal layout) ───────────────────────────────────
function ProductCard({ part, brands, onSelectPart, onUpdatePart, isSelected, selectedPart, openBrandDropdownPart, openModelDropdownPart, openQuantityDropdownPart, onBrandDropdownToggle, onModelDropdownToggle, onQuantityDropdownToggle }) {
  // Local state — initialised from selectedPart when card is already in the order
  const [localBrands, setLocalBrands] = useState(() => selectedPart?.selectedBrands || [])
  const [localModels, setLocalModels] = useState(() => selectedPart?.selectedModels || [])
  const [localQuantity, setLocalQuantity] = useState(() => selectedPart?.quantity || part.moq || 1000)
  const [localModelQuantities, setLocalModelQuantities] = useState(() => selectedPart?.modelQuantities || {})
  const [shake, setShake]             = useState(false)
  const [showHint, setShowHint]       = useState('')

  const hasBrand  = localBrands.length > 0
  const hasModels = localModels.length > 0
  const hasQuantity = localQuantity > 0
  const canAdd    = hasBrand && hasModels && hasQuantity

  // When the card goes from selected → unselected (removed), clear local state
  const prevSelected = useRef(isSelected)
  useEffect(() => {
    if (prevSelected.current && !isSelected) {
      setLocalBrands([])
      setLocalModels([])
      setLocalQuantity(part.moq || 1000)
      setLocalModelQuantities({})
    }
    prevSelected.current = isSelected
  }, [isSelected, part.moq])

  // Brand selection — always local; if already in order, also update cart live
  const handleLocalBrandToggle = (_part, brandOrBrands) => {
    const next = Array.isArray(brandOrBrands)
      ? brandOrBrands
      : localBrands.includes(brandOrBrands)
        ? localBrands.filter(b => b !== brandOrBrands)
        : [brandOrBrands]
    setLocalBrands(next)
    setLocalModels([])  // reset models whenever brand changes
    setLocalModelQuantities({})
    if (isSelected) onUpdatePart(part, next, localModels, localQuantity, {})
  }

  // Model selection — local + live update if in order
  const handleLocalModelToggle = (_part, modelOrModels) => {
    const next = Array.isArray(modelOrModels)
      ? modelOrModels
      : localModels.includes(modelOrModels)
        ? localModels.filter(m => m !== modelOrModels)
        : [...localModels, modelOrModels]
    setLocalModels(next)
    if (isSelected) onUpdatePart(part, localBrands, next, localQuantity, localModelQuantities)
  }

  // Handle model quantity change
  const handleModelQuantityChange = (_part, model, quantity) => {
    setLocalModelQuantities(prev => {
      const next = { ...prev, [model]: quantity }
      if (isSelected) {
        onUpdatePart(part, localBrands, localModels, localQuantity, next)
      }
      return next
    })
  }

  const handleAddClick = () => {
    if (isSelected) {
      // Remove from order AND clear local selections
      onSelectPart(part, null, null, null, null)
      setLocalBrands([])
      setLocalModels([])
      setLocalQuantity(part.moq || 1000)
      setLocalModelQuantities({})
      return
    }
    if (!hasBrand) {
      setShake(true); setShowHint('Select a brand first')
      setTimeout(() => { setShake(false); setShowHint('') }, 2000)
      return
    }
    if (!hasModels) {
      setShake(true); setShowHint('Select at least one model')
      setTimeout(() => { setShake(false); setShowHint('') }, 2000)
      return
    }
    if (!hasQuantity) {
      setShake(true); setShowHint('Set quantity (min MOQ)')
      setTimeout(() => { setShake(false); setShowHint('') }, 2000)
      return
    }
    onSelectPart(part, localBrands, localModels, localQuantity, localModelQuantities)
  }

  const isBrandOpen = openBrandDropdownPart === part.name
  const isModelOpen = openModelDropdownPart === part.name
  const isQuantityOpen = openQuantityDropdownPart === part.name

  return (
    <div className={`bg-white rounded-xl flex flex-row overflow-hidden transition-all duration-200 ${
      isSelected
        ? 'ring-1 ring-[#005691] shadow-md'
        : 'border border-gray-200 hover:border-gray-300 hover:shadow-sm'
    } ${shake ? 'animate-cardShake' : ''}`}>

      {/* ── LEFT: Image ────────────────────────────────────────── */}
      <div className={`relative w-28 flex-shrink-0 flex items-center justify-center overflow-hidden ${
        isSelected ? 'bg-gradient-to-b from-[#005691]/8 to-[#005691]/5' : 'bg-gradient-to-b from-gray-50 to-gray-100'
      }`}>
        <div className={`absolute left-0 top-0 bottom-0 w-0.5 ${isSelected ? 'bg-[#005691]' : 'bg-transparent'}`} />
        {part.image ? (
          <img src={part.image} alt={part.name} className="w-full h-full object-cover" />
        ) : (
          <span className="material-symbols-outlined text-gray-300" style={{fontSize:'36px'}}>
            {getCategoryIcon(part.category)}
          </span>
        )}
        {isSelected && (
          <div className="absolute top-2 right-2 w-5 h-5 bg-[#005691] rounded-full flex items-center justify-center shadow">
            <span className="material-symbols-outlined text-white" style={{fontSize:'12px'}}>check</span>
          </div>
        )}
      </div>

      {/* ── RIGHT: Content ────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 p-3 flex flex-col gap-2">

        {/* Row 1: Part number + name + MOQ */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-[9px] font-mono text-gray-400 tracking-wider mb-0.5">{part.partNo}</p>
            <h3 className="text-[12px] font-bold text-gray-900 leading-snug line-clamp-2">{part.name}</h3>
          </div>
          <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded whitespace-nowrap flex-shrink-0 font-medium">
            MOQ {part.moq.toLocaleString()}
          </span>
        </div>

        {/* Row 2: Brand + Model + Quantity + Add/Remove — single line */}
        <div className="flex items-center gap-1.5 mt-0.5">
          <PartBrandDropdown
            part={part} brands={brands} selectedBrands={localBrands}
            onBrandToggle={handleLocalBrandToggle}
            isOpen={isBrandOpen} onToggle={onBrandDropdownToggle}
          />

          <PartModelDropdown
            part={part} selectedBrands={localBrands} selectedModels={localModels}
            onModelToggle={handleLocalModelToggle}
            isOpen={isModelOpen} onToggle={onModelDropdownToggle}
          />

          <PartQuantityDropdown
            part={part} 
            selectedModels={localModels}
            onModelQuantityChange={handleModelQuantityChange}
            isOpen={isQuantityOpen} 
            onToggle={onQuantityDropdownToggle}
          />

          {/* ─ Cart icon (add) or × (remove) ──────────────────────── */}
          {isSelected ? (
            <button
              onClick={handleAddClick}
              title="Remove from order"
              className="flex-shrink-0 w-7 h-7 rounded-full bg-red-50 border border-red-200 text-red-500 hover:bg-red-100 hover:border-red-300 flex items-center justify-center transition-all"
            >
              <span className="material-symbols-outlined" style={{fontSize:'16px'}}>close</span>
            </button>
          ) : canAdd ? (
            <button
              onClick={handleAddClick}
              title="Add to order"
              className="flex-shrink-0 w-7 h-7 rounded-full bg-[#005691] text-white hover:bg-[#004a7c] flex items-center justify-center transition-all shadow-sm"
            >
              <span className="material-symbols-outlined" style={{fontSize:'15px'}}>shopping_cart</span>
            </button>
          ) : (
            <button
              onClick={handleAddClick}
              title={!hasBrand ? 'Select a brand first' : !hasModels ? 'Select at least one model' : 'Set quantity (min MOQ)'}
              className="flex-shrink-0 w-7 h-7 rounded-full border border-dashed border-gray-300 text-gray-300 flex items-center justify-center"
            >
              <span className="material-symbols-outlined" style={{fontSize:'15px'}}>shopping_cart</span>
            </button>
          )}
        </div>

        {/* Error hint */}
        {showHint && (
          <p className="text-[10px] text-red-500 flex items-center gap-1">
            <span className="material-symbols-outlined" style={{fontSize:'12px'}}>info</span>{showHint}
          </p>
        )}
      </div>
    </div>
  )
}

// ── CATEGORY SECTION ──────────────────────────────────────────────
function CategorySection({ 
  category, parts, brands, onSelectPart, onUpdatePart, selectedParts,
  openBrandDropdownPart, openModelDropdownPart, openQuantityDropdownPart,
  onBrandDropdownToggle, onModelDropdownToggle, onQuantityDropdownToggle, categoryId
}) {
  const [collapsed, setCollapsed] = useState(false)
  const selectedCount = parts.filter(p => selectedParts.some(sp => sp.name === p.name)).length

  return (
    <div id={categoryId} className="mb-8">
      {/* Category header — blue background stripe */}
      <div
        className="flex items-center gap-3 cursor-pointer group mb-4 bg-[#005691] rounded-lg px-4 py-2.5"
        onClick={() => setCollapsed(c => !c)}
      >
        <span className="material-symbols-outlined text-white/80" style={{fontSize:'18px'}}>{getCategoryIcon(category)}</span>
        <div>
          <h3 className="text-[13px] font-bold text-white leading-none tracking-tight">{category}</h3>
          <span className="text-[11px] text-white/60 font-normal">{parts.length} parts</span>
        </div>
        {selectedCount > 0 && (
          <span className="text-[10px] font-semibold text-[#005691] bg-white px-2 py-0.5 rounded-full">
            {selectedCount}/{parts.length} in order
          </span>
        )}
        <span className={`material-symbols-outlined text-white/50 text-lg ml-auto transition-transform duration-200 group-hover:text-white/80 ${collapsed ? '' : 'rotate-180'}`}>
          expand_more
        </span>
      </div>

      {/* Cards — 2-column grid of horizontal cards */}
      {!collapsed && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {parts.map(part => {
            const partSelected = selectedParts.find(p => p.name === part.name)
            return (
              <ProductCard
                key={part.name}
                part={part}
                brands={brands}
                onSelectPart={onSelectPart}
                onUpdatePart={onUpdatePart}
                isSelected={!!partSelected}
                selectedPart={partSelected || null}
                openBrandDropdownPart={openBrandDropdownPart}
                openModelDropdownPart={openModelDropdownPart}
                openQuantityDropdownPart={openQuantityDropdownPart}
                onBrandDropdownToggle={state => onBrandDropdownToggle(part, state)}
                onModelDropdownToggle={state => onModelDropdownToggle(part, state)}
                onQuantityDropdownToggle={state => onQuantityDropdownToggle(part, state)}
              />
            )
          })}
        </div>
      )}
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

  // MOQ validation across all items
  const moqErrors = []
  localBasketItems.forEach(item => {
    const selectedModels = item.selectedModels || []
    const moq = item.moq || 1000
    const partTotal = selectedModels.reduce((sum, m) => {
      const q = item.modelQuantities?.[m] ?? item.quantity ?? Math.floor(moq / (selectedModels.length || 1))
      return sum + (q !== '' && !isNaN(q) ? Number(q) : 0)
    }, 0)

    if (partTotal < moq) {
      moqErrors.push({
        name: item.name,
        total: partTotal,
        moq: moq,
        shortage: moq - partTotal
      })
    }
  })

  const hasMoqErrors = moqErrors.length > 0

  const toggleModelSelection = (partName, modelToRemove) => {
    setLocalBasketItems(prev => {
      const updated = prev.map(item => {
        if (item.name === partName) {
          const currentModels = item.selectedModels || []
          const updatedModels = currentModels.filter(m => m !== modelToRemove)
          return { ...item, selectedModels: updatedModels }
        }
        return item
      })
      return updated.filter(item => (item.selectedModels && item.selectedModels.length > 0) || (item.selectedBrands && item.selectedBrands.length > 0))
    })
  }

  const handleRemovePart = (cartItemId, idx) => {
    const updated = localBasketItems.filter((item, index) => {
      if (item.cartItemId && cartItemId) return item.cartItemId !== cartItemId
      return index !== idx
    })
    setLocalBasketItems(updated)
    onRemoveItem(cartItemId, idx)
  }

  const handleClearAll = () => {
    setLocalBasketItems([])
    onClearAll()
  }

  const handleConfirm = () => {
    if (hasMoqErrors) return
    onUpdateBasketItems(localBasketItems)
    onConfirmOrder(localBasketItems)
  }

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-scaleIn" onClick={e => e.stopPropagation()}>
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#005691] via-[#004f87] to-[#003861] rounded-t-2xl px-6 py-4 flex items-center justify-between text-white border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <span className="material-symbols-outlined text-white text-xl">shopping_basket</span>
            </div>
            <div>
              <h2 className="font-bold text-lg leading-tight">Review Order & Selected Models</h2>
              <p className="text-white/80 text-xs mt-0.5">
                {totalItems} selected model{totalItems !== 1 ? 's' : ''} across {localBasketItems.length} part{localBasketItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300"
          >
            <span className="material-symbols-outlined text-white text-lg">close</span>
          </button>
        </div>

        {/* Modal Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
          {localBasketItems.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200 p-8">
              <span className="material-symbols-outlined text-5xl text-gray-300">shopping_basket</span>
              <p className="text-gray-600 mt-3 text-sm font-semibold">Your order cart is currently empty</p>
              <button
                onClick={onContinueShopping}
                className="mt-4 bg-[#005691] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:brightness-110 transition-all shadow"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            localBasketItems.map((item, idx) => {
              const selectedModels = item.selectedModels || []
              const moq = item.moq || 1000

              return (
                <div key={`${item.name}-${idx}`} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:border-[#005691]/40 transition-colors">
                  
                  {/* Part Header */}
                  <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#005691] text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm">
                        {idx + 1}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{item.name}</span>
                          {item.partNo && <span className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded font-mono border border-gray-200">{item.partNo}</span>}
                        </div>
                        {item.selectedBrands && item.selectedBrands.length > 0 && (
                          <p className="text-xs text-[#005691] font-semibold mt-0.5">
                            Brand: {item.selectedBrands.join(', ')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-3 py-1 rounded-full border border-emerald-200">
                        {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''}
                      </span>
                      <button
                        onClick={() => handleRemovePart(item.cartItemId, idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Remove item entry"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  </div>

                  {/* Selected Models with Editable Quantities */}
                  <div className="p-4 bg-white">
                    {(() => {
                      const partTotal = selectedModels.reduce((sum, m) => {
                        const q = item.modelQuantities?.[m] ?? item.quantity ?? moq
                        return sum + (q !== '' && !isNaN(q) ? Number(q) : 0)
                      }, 0)
                      const isMoqMet = partTotal >= moq

                      return (
                        <>
                          <div className="flex items-center justify-between mb-3 pb-1 border-b border-gray-100">
                            <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5">
                              <span className="material-symbols-outlined text-sm text-[#005691]">check_circle</span>
                              Selected Models & Quantities ({selectedModels.length}):
                            </span>
                            <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                              isMoqMet ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}>
                              Total: {partTotal.toLocaleString()} units {isMoqMet ? '✓ (MOQ met)' : `(min MOQ ${moq.toLocaleString()})`}
                            </span>
                          </div>

                          {selectedModels.length > 0 ? (
                            <div className="space-y-2">
                              {selectedModels.map((model) => {
                                const currentQty = item.modelQuantities?.[model] ?? item.quantity ?? Math.floor(moq / selectedModels.length)
                                return (
                                  <div
                                    key={model}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl bg-blue-50/80 border border-blue-200 hover:border-[#005691] transition-all"
                                  >
                                    <span className="material-symbols-outlined text-xs text-[#005691]">check</span>
                                    <span className="text-xs font-semibold text-gray-800 flex-1 truncate">{model}</span>
                                    <div className="flex items-center gap-1.5">
                                      <input
                                        type="number"
                                        value={currentQty === '' ? '' : currentQty}
                                        onChange={(e) => {
                                          const rawVal = e.target.value
                                          const val = rawVal === '' ? '' : parseInt(rawVal)
                                          const updatedItems = localBasketItems.map((i, index) => {
                                            const isMatch = item.cartItemId ? i.cartItemId === item.cartItemId : index === idx
                                            if (isMatch) {
                                              return {
                                                ...i,
                                                modelQuantities: {
                                                  ...(i.modelQuantities || {}),
                                                  [model]: val
                                                }
                                              }
                                            }
                                            return i
                                          })
                                          setLocalBasketItems(updatedItems)
                                          saveBasketToStorage(updatedItems)
                                        }}
                                        onBlur={(e) => {
                                          if (e.target.value === '' || parseInt(e.target.value) < 0) {
                                            const fallbackQty = Math.floor(moq / (selectedModels.length || 1))
                                            const updatedItems = localBasketItems.map((i, index) => {
                                              const isMatch = item.cartItemId ? i.cartItemId === item.cartItemId : index === idx
                                              if (isMatch) {
                                                return {
                                                  ...i,
                                                  modelQuantities: {
                                                    ...(i.modelQuantities || {}),
                                                    [model]: fallbackQty
                                                  }
                                                }
                                              }
                                              return i
                                            })
                                            setLocalBasketItems(updatedItems)
                                            saveBasketToStorage(updatedItems)
                                          }
                                        }}
                                        min={0}
                                        className="w-24 px-2 py-1 rounded-lg border border-gray-300 text-xs font-bold text-gray-800 focus:outline-none focus:border-[#005691] focus:ring-1 focus:ring-[#005691] text-right bg-white shadow-xs"
                                        placeholder="Qty"
                                      />
                                      <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">units</span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => toggleModelSelection(item.cartItemId || item.name, model)}
                                      className="text-gray-400 hover:text-red-500 ml-1 transition-colors flex items-center p-0.5"
                                      title={`Remove ${model}`}
                                    >
                                      <span className="material-symbols-outlined text-sm">close</span>
                                    </button>
                                  </div>
                                )
                              })}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-400 italic">No specific models selected for this part</p>
                          )}
                        </>
                      )
                    })()}
                  </div>

                </div>
              )
            })
          )}
        </div>

        {/* MOQ Warning Banner if any item is under MOQ */}
        {hasMoqErrors && (
          <div className="mx-6 mb-3 p-3 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5">
            <span className="material-symbols-outlined text-red-500 text-lg flex-shrink-0 mt-0.5">warning</span>
            <div className="text-xs text-red-700">
              <span className="font-bold block text-red-800">MOQ Requirement Not Met — Cannot Proceed:</span>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {moqErrors.map((err, i) => (
                  <li key={i}>
                    <strong>{err.name}</strong>: {err.total.toLocaleString()} units selected (Minimum MOQ is {err.moq.toLocaleString()} units — Need {err.shortage.toLocaleString()} more)
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Modal Bottom Action Footer */}
        <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-white rounded-b-2xl">
          <button
            onClick={handleClearAll}
            className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">delete_forever</span>
            Clear Order Cart
          </button>
          <div className="flex gap-3">
            <button
              onClick={onContinueShopping}
              className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200"
            >
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Continue Shopping
            </button>
            <button
              onClick={handleConfirm}
              disabled={localBasketItems.length === 0 || totalItems === 0 || hasMoqErrors}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-lg uppercase tracking-wider ${
                localBasketItems.length > 0 && totalItems > 0 && !hasMoqErrors
                  ? 'bg-[#005691] text-white hover:bg-[#003e69] hover:scale-105 active:scale-95 cursor-pointer'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              }`}
              title={hasMoqErrors ? 'Increase quantities to meet MOQ for all items before proceeding' : 'Proceed to Procurement Inquiry'}
            >
              <span className="material-symbols-outlined text-base">request_quote</span>
              {hasMoqErrors ? 'MOQ Not Met' : 'Confirm Order & Proceed to Inquiry'}
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
  onUpdatePart,
  onClearAllParts,
  onAddToCart,
  openBrandDropdownPart,
  openModelDropdownPart,
  openQuantityDropdownPart,
  onBrandDropdownToggle,
  onModelDropdownToggle,
  onQuantityDropdownToggle
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
                      View Details                    </button>
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

  const scrollToCategory = (cat) => {
    const el = document.getElementById(`cat-${cat.replace(/[^a-z0-9]/gi, '-')}`)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setSelectedCategory(cat)
  }

  return (
    <div>

      {/* ── Page Header ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-2xl text-[#005691]">{product.icon}</span>
            <h2 className="text-xl font-bold text-gray-900">{product.name} Parts Catalogue</h2>
          </div>
          <p className="text-sm text-gray-500 max-w-lg">{product.description}</p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{uniqueCategories.length}</span> categories</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{allParts.length}</span> parts</span>
            <span className="text-gray-300">·</span>
            <span className="text-sm text-gray-600"><span className="font-semibold text-gray-900">{brands.length}</span> brands</span>
            {selectedParts.length > 0 && (
              <>
                <span className="text-gray-300">·</span>
                <span className="text-sm font-semibold text-[#005691]">{selectedParts.length} selected</span>
              </>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {selectedParts.length > 0 && (
            <button onClick={onAddToCart}
              className="bg-[#005691] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#004a7c] transition-all flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
              Add {selectedParts.length} to Cart
            </button>
          )}
          <button onClick={() => onNavigate('Contact Us')}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:border-gray-400 transition-all flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">request_quote</span>
            Request a Quote
          </button>
        </div>
      </div>

      {/* ── How-to steps (inline, minimal) ────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6 px-4 py-3 bg-gray-50 rounded-lg border border-gray-200">
        <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">How to order:</span>
        {['Find a part', 'Select brand', 'Select models', 'Set quantities per model', 'Add to order', 'Add to cart'].map((s, i) => (
          <div key={i} className="flex items-center gap-1.5">
            {i > 0 && <span className="material-symbols-outlined text-gray-300 text-sm">chevron_right</span>}
            <span className="text-[11px] text-gray-600 font-medium">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-[9px] font-bold text-gray-600 mr-1">{i+1}</span>
              {s}
            </span>
          </div>
        ))}
      </div>

      {/* ── MAIN TWO-COLUMN LAYOUT ──────────────────────────────────────── */}
      <div className="flex gap-6 items-start">

        {/* ── LEFT SIDEBAR ────────────────────────────────────────── */}
        <div className="w-52 flex-shrink-0 sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto space-y-3">

          {/* Search */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">search</span>
            <input
              type="text"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-8 py-2 border border-gray-200 rounded-lg text-[12px] text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-all bg-white"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>

          {/* Category list */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="px-3 py-2 border-b border-gray-100 bg-[#005691]">
              <span className="text-[10px] font-semibold text-white uppercase tracking-wider">Categories</span>
            </div>

            {/* All */}
            <button
              onClick={() => setSelectedCategory('all')}
              className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors border-b border-gray-100 ${
                selectedCategory === 'all' ? 'bg-gray-50 text-[#005691]' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <span className="text-[12px] font-medium">All parts</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                selectedCategory === 'all' ? 'bg-[#005691]/10 text-[#005691]' : 'bg-gray-100 text-gray-500'
              }`}>{allParts.length}</span>
            </button>

            {uniqueCategories.map(cat => {
              const catCount = allParts.filter(p => p.category === cat).length
              const isActive = selectedCategory === cat
              const selCount = selectedParts.filter(p => p.category === cat).length
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(isActive ? 'all' : cat)
                    const el = document.getElementById(`cat-${cat.replace(/[^a-z0-9]/gi, '-')}`)
                    if (el && !isActive) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left transition-colors border-b border-gray-100 last:border-b-0 ${
                    isActive ? 'bg-gray-50 text-[#005691]' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="material-symbols-outlined text-gray-400" style={{fontSize:'15px'}}>{getCategoryIcon(cat)}</span>
                  <span className={`text-[11px] flex-1 truncate leading-tight ${ isActive ? 'font-semibold' : 'font-normal' }`}>{cat}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0 ${
                    selCount > 0 ? 'bg-[#005691] text-white' :
                    isActive ? 'bg-[#005691]/10 text-[#005691]' : 'bg-gray-100 text-gray-500'
                  }`}>{selCount > 0 ? selCount : catCount}</span>
                </button>
              )
            })}
          </div>

          {/* Selection summary */}
          {selectedParts.length > 0 && (
            <div className="border border-gray-200 rounded-xl p-3 bg-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-gray-700">{selectedParts.length} part{selectedParts.length !== 1 ? 's' : ''} selected</span>
                <button onClick={onClearAllParts} className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors">Clear</button>
              </div>
              <button
                onClick={onAddToCart}
                className="w-full bg-[#005691] text-white py-2 rounded-lg text-[12px] font-semibold hover:bg-[#004a7c] transition-all flex items-center justify-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                Add to Cart
              </button>
            </div>
          )}
        </div>

        {/* ── RIGHT CONTENT ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          {searchTerm && (
            <p className="text-sm text-gray-500 mb-4">
              <span className="font-semibold text-gray-800">{filteredParts.length}</span> results for “{searchTerm}”
            </p>
          )}

          {Object.entries(groupedParts).map(([category, parts]) => (
            <CategorySection
              key={category} category={category} parts={parts} brands={brands}
              onSelectPart={onSelectPart}
              onUpdatePart={onUpdatePart}
              selectedParts={selectedParts}
              openBrandDropdownPart={openBrandDropdownPart} 
              openModelDropdownPart={openModelDropdownPart}
              openQuantityDropdownPart={openQuantityDropdownPart}
              onBrandDropdownToggle={onBrandDropdownToggle} 
              onModelDropdownToggle={onModelDropdownToggle}
              onQuantityDropdownToggle={onQuantityDropdownToggle}
              categoryId={`cat-${category.replace(/[^a-z0-9]/gi, '-')}`}
            />
          ))}

          {filteredParts.length === 0 && (
            <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl">
              <span className="material-symbols-outlined text-3xl text-gray-300">search_off</span>
              <p className="text-gray-500 mt-2 text-sm">No parts found</p>
              <button onClick={() => { setSearchTerm(''); setSelectedCategory('all') }}
                className="mt-3 text-[#005691] text-sm font-medium hover:underline">Clear filters</button>
            </div>
          )}

          {/* Bottom CTA — Clean Solid Color */}
          <div className="mt-8 bg-[#005691] text-white rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Need custom specifications?</h3>
              <p className="text-white/80 text-sm">We source components to your exact requirements from verified suppliers.</p>
            </div>
            <button onClick={() => onNavigate('Contact Us')}
              className="flex-shrink-0 bg-white text-[#005691] px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-all flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">mail</span>
              Contact Us
            </button>
          </div>
        </div>
      </div>

      <SelectionSummary
        selectedParts={selectedParts}
        onClearAll={onClearAllParts}
        onAddToCart={onAddToCart}
      />
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
  const [openQuantityDropdownPart, setOpenQuantityDropdownPart] = useState(null)

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

  // Called from ProductCard: brands/models = null means remove, else add with those values
  const handleSelectPart = (part, brands, models, quantity, modelQuantities) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)

      let newList
      if (brands === null || exists) {
        // Remove
        newList = currentList.filter(p => p.name !== part.name)
      } else {
        // Add with the brand+model selections made locally in the card
        newList = [...currentList, { 
          ...part, 
          selectedBrands: brands || [], 
          selectedModels: models || [], 
          quantity: quantity || part.moq || 1000,
          modelQuantities: modelQuantities || {}
        }]
      }

      saveToStorage(newList, active)
      return { ...prev, [active]: newList }
    })
  }

  // Called when user edits brand/model on a card that is already in the order
  const handleUpdatePart = (part, brands, models, quantity, modelQuantities) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const newList = currentList.map(p =>
        p.name === part.name
          ? { 
              ...p, 
              selectedBrands: brands, 
              selectedModels: models, 
              quantity: quantity || p.quantity || p.moq || 1000,
              modelQuantities: modelQuantities || p.modelQuantities || {}
            }
          : p
      )
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
      setOpenQuantityDropdownPart(null)
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
      localStorage.setItem('selectedParts', JSON.stringify(items))
      sessionStorage.setItem('selectedParts', JSON.stringify(items))
      window.dispatchEvent(new Event('selectedPartsUpdated'))
      console.log('💾 [Products] Basket saved to storage & event dispatched:', items.length, 'items')
    } catch (err) {
      console.error('Failed to save basket to storage:', err)
    }
  }

  const handleAddToCart = () => {
    const currentParts = selectedPartsByTab[active] || []
    const hasSelections = currentParts.some(p => (p.selectedModels && p.selectedModels.length > 0) || (p.selectedBrands && p.selectedBrands.length > 0))
    
    if (currentParts.length > 0 && hasSelections) {
      const updatedBasket = [...basketItems]

      currentParts.forEach(part => {
        const brands = part.selectedBrands || []
        const models = part.selectedModels || []
        const quantity = part.quantity || part.moq || 1000
        const modelQuantities = part.modelQuantities || {}
        
        if (brands.length > 0) {
          brands.forEach(brand => {
            const brandSpecificModels = models.filter(m => m.toLowerCase().includes(brand.toLowerCase()))
            const assignedModels = brandSpecificModels.length > 0 ? brandSpecificModels : [...models]
            
            const newItem = {
              cartItemId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
              name: part.name,
              partNo: part.partNo,
              category: part.category,
              moq: part.moq,
              quantity: quantity,
              applicableModels: part.applicableModels,
              selectedBrands: [brand],
              selectedModels: assignedModels,
              modelQuantities: modelQuantities
            }
            updatedBasket.push(newItem)
          })
        } else if (models.length > 0) {
          const newItem = {
            cartItemId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
            name: part.name,
            partNo: part.partNo,
            category: part.category,
            moq: part.moq,
            quantity: quantity,
            applicableModels: part.applicableModels,
            selectedBrands: [],
            selectedModels: [...models],
            modelQuantities: modelQuantities
          }
          updatedBasket.push(newItem)
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
      setOpenQuantityDropdownPart(null)
      
      // Open Review Order modal
      setIsReviewOrderOpen(true)
    } else {
      alert('Please select at least one brand or model before adding to cart.')
    }
  }

  const handleRemoveFromBasket = (cartItemId, index) => {
    const updated = basketItems.filter((item, idx) => {
      if (item.cartItemId && cartItemId) return item.cartItemId !== cartItemId
      return idx !== index
    })
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
      let updatedList = exists ? currentList : [...currentList, { ...part, selectedBrands: [], selectedModels: [], quantity: part.moq || 1000, modelQuantities: {} }]

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
      let updatedList = exists ? currentList : [...currentList, { ...part, selectedBrands: [], selectedModels: [], quantity: part.moq || 1000, modelQuantities: {} }]

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

  const handleModelQuantityChange = (part, model, quantity) => {
    setSelectedPartsByTab(prev => {
      const currentList = prev[active] || []
      const exists = currentList.some(p => p.name === part.name)
      if (!exists) return prev

      const updatedList = currentList.map(p => {
        if (p.name === part.name) {
          const currentModelQuantities = p.modelQuantities || {}
          return {
            ...p,
            modelQuantities: {
              ...currentModelQuantities,
              [model]: quantity
            }
          }
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
      setOpenQuantityDropdownPart(null)
    }
  }

  const handleModelDropdownToggle = (part, isOpen) => {
    if (isOpen === false) {
      setOpenModelDropdownPart(null)
    } else {
      setOpenModelDropdownPart(openModelDropdownPart === part.name ? null : part.name)
      setOpenBrandDropdownPart(null)
      setOpenQuantityDropdownPart(null)
    }
  }

  const handleQuantityDropdownToggle = (part, isOpen) => {
    if (isOpen === false) {
      setOpenQuantityDropdownPart(null)
    } else {
      setOpenQuantityDropdownPart(openQuantityDropdownPart === part.name ? null : part.name)
      setOpenBrandDropdownPart(null)
      setOpenModelDropdownPart(null)
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

  // Load basket from storage on mount AND listen for selectedPartsUpdated in real-time
  useEffect(() => {
    const syncBasketFromStorage = () => {
      try {
        const stored = localStorage.getItem('basketItems') || sessionStorage.getItem('basketItems') ||
                       localStorage.getItem('selectedParts') || sessionStorage.getItem('selectedParts')
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed)) {
            setBasketItems(parsed)
            console.log('📥 [Products] Synced basket from storage:', parsed.length, 'items')
          }
        } else {
          setBasketItems([])
        }

        // Also sync tab-specific parts
        const activeKey = `selectedParts_${active}`
        const activeStored = localStorage.getItem(activeKey) || sessionStorage.getItem(activeKey)
        if (activeStored) {
          const parsedActive = JSON.parse(activeStored)
          if (Array.isArray(parsedActive)) {
            setSelectedPartsByTab(prev => ({
              ...prev,
              [active]: parsedActive
            }))
          }
        } else if (!stored) {
          setSelectedPartsByTab(prev => ({
            ...prev,
            [active]: []
          }))
        }
      } catch (err) {
        console.error('Failed to sync basket from storage:', err)
      }
    }
    
    syncBasketFromStorage()

    window.addEventListener('selectedPartsUpdated', syncBasketFromStorage)
    window.addEventListener('storage', syncBasketFromStorage)

    return () => {
      window.removeEventListener('selectedPartsUpdated', syncBasketFromStorage)
      window.removeEventListener('storage', syncBasketFromStorage)
    }
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
                    setOpenQuantityDropdownPart(null)
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
                  <span className="material-symbols-outlined text-lg">{p.icon || 'inventory_2'}</span>
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

      {/* Review Order Cart Bar */}
      {active !== 'industrial-seals' && basketItems.length > 0 && (
        <div className="max-w-[1280px] mx-auto px-8 pt-3 pb-0">
          <div className="bg-gradient-to-r from-[#003a5e] to-[#005691] rounded-xl shadow-lg p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined text-white text-2xl">shopping_cart</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 text-gray-900 text-[10px] font-black rounded-full flex items-center justify-center shadow">
                  {basketItems.length}
                </span>
              </div>
              <div>
                <span className="font-bold text-sm text-white">Your Cart</span>
                <span className="text-white/70 text-xs ml-2">
                  {totalBasketItems} item{totalBasketItems !== 1 ? 's' : ''} across {basketItems.length} part{basketItems.length !== 1 ? 's' : ''}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsReviewOrderOpen(true)}
                className="bg-yellow-400 text-gray-900 px-5 py-2 rounded-lg text-sm font-bold hover:bg-yellow-300 hover:scale-105 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">receipt_long</span>
                Review & Confirm Order
              </button>
            </div>
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
          onUpdatePart={handleUpdatePart}
          onClearAllParts={handleClearAllParts}
          onAddToCart={handleAddToCart}
          openBrandDropdownPart={openBrandDropdownPart}
          openModelDropdownPart={openModelDropdownPart}
          openQuantityDropdownPart={openQuantityDropdownPart}
          onBrandDropdownToggle={handleBrandDropdownToggle}
          onModelDropdownToggle={handleModelDropdownToggle}
          onQuantityDropdownToggle={handleQuantityDropdownToggle}
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
        @keyframes cardShake {
          0%, 100% { transform: translateX(0); }
          15% { transform: translateX(-6px) rotate(-0.5deg); }
          30% { transform: translateX(6px) rotate(0.5deg); }
          45% { transform: translateX(-5px); }
          60% { transform: translateX(5px); }
          75% { transform: translateX(-3px); }
          90% { transform: translateX(3px); }
        }
        .animate-cardShake { animation: cardShake 0.5s ease-in-out; border-color: #ef4444 !important; box-shadow: 0 0 0 2px rgba(239,68,68,0.3) !important; }
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