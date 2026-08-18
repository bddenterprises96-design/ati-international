import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

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
  'moto-engine': {
    title: 'Motorcycle Engine & Cylinder Components',
    subtitle: 'High-precision cylinder blocks, pistons, valve stem seals, and head gaskets engineered for OEM & replacement motorcycle engines.',
    structureImage: '/assets/cylinder.png',
    structureCaption: 'Cylinder Block & Piston Assembly Cross-Section Diagram',
    theoryImage: '/assets/cyy.png',
    theoryCaption: 'Combustion Chamber & Valve Sealing Heat Flow Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI supplies comprehensive engine components including precision cylinder blocks, forged/cast pistons, piston rings, valve stem seals, and head gaskets engineered for high-RPM motorcycle engines.' },
      { heading: 'Features & Benefits', list: ['High thermal resistance withstands continuous operating temperatures up to 280°C.', 'Precision ground manufacturing tolerances within ±0.01mm for optimal compression ratio.', 'Compatible with major OEM motorcycle brands including Honda, Yamaha, Kawasaki, Suzuki, BMW, and KTM.'] },
      { heading: 'Basic Structure', content: 'The cylinder and piston assembly consists of a high-grade aluminum alloy cylinder wall coated with NikaSil or cast iron sleeve, fitted with multi-ring piston configurations to maintain cylinder compression.', showImageAfter: 'structure' },
      { heading: 'Sealing & Thermal Control', content: 'Engine head gaskets and valve stem seals prevent high-pressure combustion gas blow-by while metering essential lubricant to valve stems, preventing oil burning and power loss.', showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Store in original rust-inhibiting packaging until installation.', 'Clean cylinder bore and crankcase surfaces with solvent before assembly.', 'Coat piston rings and cylinder walls with clean engine oil prior to fitting.', 'Torque cylinder head bolts in proper sequence to manufacturer specs.'] },
      { heading: 'Usage Example', content: 'Street motorcycles, off-road dirt bikes, scooters, racing motorcycles, and commercial delivery fleets.' }
    ]
  },
  'moto-clutch': {
    title: 'Motorcycle Transmission & Clutch Assemblies',
    subtitle: 'Heavy-duty clutch friction plates, steel plates, clutch baskets, and gear shift components built for high-torque motorcycle drivetrains.',
    structureImage: '/assets/il.png',
    structureCaption: 'Multi-Plate Motorcycle Clutch Pack Explosion Diagram',
    theoryImage: '/assets/oo1.png',
    theoryCaption: 'Clutch Engagement & Friction Coefficient Analysis Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI Transmission & Clutch Assemblies feature high-coefficient friction plates, heat-treated steel drive plates, reinforced clutch springs, and precision shift forks designed for seamless gear shifting and maximum torque transfer.' },
      { heading: 'Features & Benefits', list: ['Advanced aramid/paper friction lining delivers high static and dynamic friction coefficients.', 'Heat-treated alloy steel drive plates resist warping under extreme temperature spikes.', 'Provides smooth clutch engagement with zero slippage under full acceleration.'] },
      { heading: 'Basic Structure', content: 'A multi-plate wet motorcycle clutch consists of alternating friction discs and steel drive plates stacked inside an aluminum clutch basket, compressed by heavy-duty coil springs.', showImageAfter: 'structure' },
      { heading: 'Transmission Dynamics', content: 'When the clutch lever is pulled, the pressure plate lifts, releasing compression on the friction pack so power flow from the crankshaft to the transmission main shaft is temporarily disengaged.', showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Pre-soak wet clutch friction plates in recommended motorcycle engine oil for 40 minutes before installation.', 'Inspect clutch basket fingers for notch wear before installing new plates.', 'Replace clutch springs as a set to ensure even clamping pressure across the pack.'] },
      { heading: 'Usage Example', content: 'Cruisers, adventure touring motorcycles, sports bikes, and high-load commercial tricycles.' }
    ]
  },
  'moto-seals': {
    title: 'Motorcycle Rubber & Oil Sealing Kits',
    subtitle: 'Complete rotary shaft oil seal kits, front fork seals, FKM Viton O-rings, and full engine gasket kits.',
    structureImage: '/assets/il2.png',
    structureCaption: 'Motorcycle Engine Oil Seal & O-Ring Placement Diagram',
    theoryImage: '/assets/oo.png',
    theoryCaption: 'Dual-Lip Rotary Shaft Oil Seal Contamination Barrier Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI Motorcycle Rubber & Oil Sealing Kits contain high-grade Fluororubber (FKM) and Nitrile (NBR) seals formulated specifically to withstand motorcycle engine oil additives, high RPM shaft rotation, and harsh road dirt.' },
      { heading: 'Features & Benefits', list: ['Double-lip oil seals with stainless steel garter spring ensure zero fluid leakage and dust exclusion.', 'FKM Viton O-rings maintain elasticity from -20°C to +220°C.', 'Complete engine overhaul sets include crankshaft seals, countershaft seals, shift shaft seals, and valve stem seals.'] },
      { heading: 'Basic Structure', content: 'Radial shaft seals incorporate an elastomeric sealing lip held firmly against the shaft surface by a steel garter spring, enclosed within a rigid steel reinforcement casing.', showImageAfter: 'structure' },
      { heading: 'Sealing Mechanism', content: 'The primary sealing lip forms a microscopic oil lubricant film against the rotating shaft surface while the secondary dust lip blocks dirt, grit, and water from entering the crankcase.', showImageAfter: 'theory' },
      { heading: 'Handling Instructions', list: ['Verify shaft surface finish is smooth and free of burrs before pressing seals.', 'Apply a thin coat of multi-purpose grease to the sealing lip before assembly.', 'Use dedicated installation drivers to prevent cocking or lip damage during press-fitting.'] },
      { heading: 'Usage Example', content: 'Engine crankcases, gearbox output shafts, front suspension forks, and wheel hub bearings.' }
    ]
  },
  'ebike-motor': {
    title: 'E-Bike Mid-Drive & Motor Sealing Assemblies',
    subtitle: 'High-speed rotary shaft seals, motor casing O-rings, and IP67 barrier gaskets engineered for electric bicycle motors.',
    structureImage: '/assets/ebike_motor_sealing.png',
    structureCaption: 'E-Bike Motor Shaft & Casing Sealing Cross-Section',
    theoryImage: '/assets/il2.png',
    theoryCaption: 'IP67 Water & Dust Barrier Hydrodynamic Sealing Diagram',
    sections: [
      { heading: 'Product Description', content: 'ATI supplies high-precision rotary shaft seals, motor casing gaskets, and NBR/FKM O-rings engineered specifically for electric bicycle mid-drive and hub motors.' },
      { heading: 'Features & Benefits', list: ['Low-friction sealing lip minimizes motor torque loss and drag.', 'IP67 dust and water ingress protection for off-road and rain riding.', 'Compatible with Bafang, Bosch, Shimano Steps, Yamaha, and Panasonic drive units.'] },
      { heading: 'Basic Structure', content: 'Precision molded elastomer lip with stainless steel garter spring enclosed in a lightweight aluminum or composite outer casing.', showImageAfter: 'structure' },
      { heading: 'Handling Instructions', list: ['Handle with care to preserve seal lip integrity.', 'Apply lithium-compatible grease prior to motor assembly.'] }
    ]
  },
  'ebike-battery': {
    title: 'E-Bike Battery Enclosure & Powerpack Gaskets',
    subtitle: 'UL94-V0 flame-retardant silicone seals, IP68 battery case gaskets, and thermal interface barrier strips.',
    structureImage: '/assets/ebike_battery_sealing.png',
    structureCaption: 'E-Bike Battery Pack Perimeter Sealing Gasket Diagram',
    theoryImage: '/assets/il.png',
    theoryCaption: 'Thermal Management & Moisture Exclusion Sealing Theory',
    sections: [
      { heading: 'Product Description', content: 'ATI supplies custom-molded flame-retardant silicone and EPDM gaskets for e-bike battery enclosures, protecting lithium-ion cells against moisture, vibration, and thermal runaway.' },
      { heading: 'Features & Benefits', list: ['UL94-V0 fire resistance for battery safety compliance.', 'IP68 waterproof rating prevents moisture ingress into cell chambers.', 'High compressibility compensates for aluminum frame extrusion tolerances.'] },
      { heading: 'Basic Structure', content: 'Die-cut or liquid-injected silicone foam profiles with pressure-sensitive adhesive backing for rapid pack assembly.', showImageAfter: 'structure' },
      { heading: 'Handling Instructions', list: ['Clean housing mating channels before laying perimeter gaskets.', 'Torque enclosure screws evenly to ensure uniform compression.'] }
    ]
  },
  'ebike-drive': {
    title: 'E-Bike Powertrain & Drive System Components',
    subtitle: 'Controller housing seals, planetary gear seals, torque sensor O-rings, and cable entry grommets.',
    structureImage: '/assets/homepage_3d_bento_ebike.png',
    structureCaption: 'E-Bike Drive System & Controller Sealing Overview',
    theoryImage: '/assets/oo.png',
    theoryCaption: 'Multi-Cable Entry Sealing & Strain Relief Mechanism',
    sections: [
      { heading: 'Product Description', content: 'ATI supplies complete powertrain sealing components including speed sensor seals, planetary reduction gear seals, controller box gaskets, and multi-wire rubber grommets.' },
      { heading: 'Features & Benefits', list: ['Resists synthetic gear grease, UV exposure, and road salt corrosion.', 'Integrated wire grommets prevent moisture wicking along power cables.', 'Long service life tested to 50,000 km operating durability.'] },
      { heading: 'Basic Structure', content: 'Multi-ribbed elastomeric grommets and molded housing gaskets engineered for toolless snap-in installation.', showImageAfter: 'structure' },
      { heading: 'Handling Instructions', list: ['Ensure cables pass through grommets smoothly without tearing sealing ribs.', 'Store in cool dry conditions away from direct sunlight.'] }
    ]
  },
}

// ── MOTORCYCLE PARTS CATEGORIES ────────────────────────────────────
const MOTORCYCLE_PARTS = {
  'Engine Parts': [
    'Cylinder Head', 'Cylinder Block', 'Piston', 'Piston Rings', 'Piston Pin',
    'Connecting Rod', 'Crankshaft', 'Camshaft', 'Valves', 'Valve Stem Seals',
    'Valve Guides', 'Valve Springs', 'Rocker Arms', 'Timing Chain',
    'Timing Chain Tensioner', 'Cam Chain Guide', 'Oil Pump', 'Oil Filter',
    'Oil Seals', 'O-Rings', 'Gaskets', 'Engine Bearings', 'Crankcase', 'Clutch Cover'
  ],
  'Transmission & Clutch': [
    'Clutch Plates', 'Clutch Friction Plates', 'Clutch Basket', 'Clutch Hub',
    'Clutch Springs', 'Clutch Cable', 'Gear Shift Drum', 'Gear Shift Fork',
    'Transmission Gears', 'Drive Shaft', 'Counter Shaft', 'Kick Starter', 'Gear Lever'
  ],
  'Fuel System': ['Fuel Tank', 'Fuel Pump', 'Carburetor', 'Fuel Injector', 'Throttle Body', 'Fuel Filter', 'Fuel Hose', 'Fuel Cap'],
  'Air Intake System': ['Air Filter', 'Air Filter Element', 'Air Cleaner Box', 'Intake Manifold', 'Throttle Cable'],
  'Exhaust System': ['Exhaust Pipe', 'Muffler', 'Silencer', 'Exhaust Gasket', 'Exhaust Heat Shield'],
  'Cooling System': ['Radiator', 'Cooling Fan', 'Water Pump', 'Thermostat', 'Radiator Hose', 'Coolant Reservoir'],
  'Brake System': ['Brake Disc (Rotor)', 'Brake Drum', 'Brake Pads', 'Brake Shoes', 'Brake Caliper', 'Brake Master Cylinder', 'Brake Lever', 'Brake Pedal', 'Brake Hose', 'Brake Fluid Reservoir'],
  'Suspension & Steering': ['Front Fork', 'Rear Shock Absorber', 'Triple Clamp', 'Steering Stem', 'Swing Arm', 'Swing Arm Bush', 'Suspension Linkage'],
  'Wheels & Tires': ['Alloy Wheel', 'Spoked Wheel', 'Wheel Hub', 'Wheel Bearing', 'Tire', 'Tube', 'Rim', 'Spokes', 'Axle Shaft'],
  'Chain Drive': ['Drive Chain', 'Front Sprocket', 'Rear Sprocket', 'Chain Tensioner', 'Chain Guard'],
  'Electrical Parts': ['Battery', 'Stator', 'Magneto', 'CDI Unit', 'ECU', 'Ignition Coil', 'Spark Plug', 'Starter Motor', 'Starter Relay', 'Regulator Rectifier', 'Wiring Harness', 'Fuse Box'],
  'Lighting': ['LED Headlight', 'Tail Light', 'Brake Light', 'Turn Signal', 'Indicator Relay', 'Number Plate Light'],
  'Controls': ['Handlebar', 'Handle Grips', 'Throttle Grip', 'Brake Lever', 'Clutch Lever', 'Foot Peg', 'Side Stand', 'Center Stand', 'Mirrors'],
  'Body Parts': ['Fuel Tank Cover', 'Front Fender', 'Rear Fender', 'Side Covers', 'Fairings', 'Seat', 'Seat Cover', 'Rear Carrier', 'Chain Cover'],
  'Rubber & Sealing Components': ['Oil Seals', 'Valve Stem Seals', 'O-Rings', 'Gaskets', 'Rubber Bushes', 'Dust Seals', 'Rubber Mounts', 'Rubber Grommets', 'Rubber Dampers'],
  'Motorcycle Accessories': ['Phone Holder', 'USB Charger', 'Top Box', 'Side Box', 'Crash Guard', 'Engine Guard', 'Windshield', 'Luggage Rack', 'LED Auxiliary Lights', 'Helmet Lock', 'Hand Guards', 'Tank Pad', 'Frame Sliders']
}

// ── E-BIKE PARTS CATEGORIES ────────────────────────────────────────
const EBIKE_PARTS = {
  'Electric Drive System': ['Hub Motor', 'Mid-Drive Motor', 'Motor Controller', 'Motor Stator', 'Motor Rotor', 'Motor Housing', 'Motor Bearings', 'Motor Shaft', 'Motor Gears', 'Torque Sensor', 'Cadence Sensor'],
  'Battery System': ['Lithium-Ion Battery Pack', 'Battery Cells', 'Battery Management System (BMS)', 'Battery Charger', 'Charging Port', 'Battery Holder', 'Battery Mount', 'Battery Lock', 'Battery Case'],
  'Electrical Components': ['LCD Display', 'LED Display', 'Wiring Harness', 'Main Cable', 'Controller Cable', 'Throttle', 'Thumb Throttle', 'Twist Throttle', 'PAS (Pedal Assist Sensor)', 'Brake Sensor', 'Speed Sensor', 'DC Converter', 'Fuse', 'Connectors'],
  'Brake System': ['Hydraulic Brake Set', 'Mechanical Brake Set', 'Brake Caliper', 'Brake Pads', 'Brake Disc (Rotor)', 'Brake Lever', 'Brake Cable', 'Brake Hose'],
  'Drivetrain': ['Crankset', 'Crank Arm', 'Chain', 'Chainring', 'Cassette', 'Freewheel', 'Bottom Bracket', 'Derailleur', 'Gear Shifter', 'Pedals'],
  'Suspension & Steering': ['Front Fork', 'Rear Suspension', 'Shock Absorber', 'Handlebar', 'Stem', 'Headset', 'Steering Bearings'],
  'Wheels & Tires': ['Front Wheel', 'Rear Wheel', 'Rim', 'Tire', 'Tube', 'Tubeless Tire', 'Wheel Hub', 'Spokes', 'Wheel Bearings', 'Axle'],
  'Frame & Body Parts': ['Aluminum Frame', 'Carbon Frame', 'Rear Rack', 'Front Basket', 'Mudguards', 'Chain Guard', 'Kickstand', 'Seat Post', 'Saddle', 'Seat Clamp'],
  'Lighting & Safety': ['LED Headlight', 'Tail Light', 'Brake Light', 'Turn Indicators', 'Reflectors', 'Horn', 'Bell'],
  'Rubber & Sealing Components': ['O-Rings', 'Oil Seals', 'Dust Seals', 'Rubber Bushes', 'Rubber Grommets', 'Rubber Dampers', 'Cable Boots', 'Rubber Mounts', 'Silicone Seals', 'Protective Rubber Covers'],
  'Fasteners & Hardware': ['Bolts', 'Nuts', 'Washers', 'Screws', 'Clamps', 'Mounting Brackets', 'Frame Fasteners'],
  'E-Bike Accessories': ['Phone Holder', 'Mobile Charging Port', 'Rear Carrier', 'Front Basket', 'Water Bottle Holder', 'Rear View Mirror', 'Child Seat', 'Side Bag', 'Pannier Bag', 'GPS Tracker', 'Security Lock', 'Helmet', 'Mud Flaps']
}

function getDeterministicHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

function generateSpecsFromCategories(categoriesList) {
  const specs = []
  categoriesList.forEach(catName => {
    const items = MOTORCYCLE_PARTS[catName] || []
    items.forEach(item => {
      const hash = getDeterministicHash(item)
      const partNumSuffix = 100 + (hash % 900)
      const moqOptions = [500, 1000, 2000, 5000]
      const moq = moqOptions[hash % moqOptions.length]
      
      const materials = ['Viton (FKM)', 'Cast Iron / Nikasil', 'High-Grade NBR', 'Forged Aluminum', 'Aramid Friction Matrix', 'High-Tensile Alloy Steel', 'Silicone VMQ', 'Stainless Steel AISI 304']
      const temps = ['-40 to +230°C', '-20 to +280°C', '-30 to +180°C', '-40 to +120°C', '-50 to +200°C']
      
      specs.push({
        part: `ATI-M-${item.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X')}-${partNumSuffix}`,
        name: item,
        category: catName,
        material: materials[hash % materials.length],
        dim: `Standard OEM (${(hash % 40) + 10}mm)`,
        temp: temps[hash % temps.length],
        moq: moq.toLocaleString()
      })
    })
  })
  return specs
}

function getIncludedPartsList(categoriesList) {
  const list = []
  categoriesList.forEach(catName => {
    const items = MOTORCYCLE_PARTS[catName] || []
    items.forEach(item => list.push(item))
  })
  return list
}

function generateEBikeSpecsFromCategories(categoriesList) {
  const specs = []
  categoriesList.forEach(catName => {
    const items = EBIKE_PARTS[catName] || []
    items.forEach(item => {
      const hash = getDeterministicHash(item)
      const partNumSuffix = 100 + (hash % 900)
      const moqOptions = [500, 1000, 2000, 5000]
      const moq = moqOptions[hash % moqOptions.length]
      
      const materials = ['Silicone (VMQ)', 'NBR 70A High-Grade', 'Viton (FKM)', 'UL94-V0 Flame-Retardant EPDM', 'Forged Aluminum 6061-T6', 'Polycarbonate / ABS', 'Stainless Steel AISI 316']
      const temps = ['-40 to +180°C', '-20 to +150°C', '-30 to +120°C', '-50 to +200°C']
      
      specs.push({
        part: `ATI-EB-${item.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'X')}-${partNumSuffix}`,
        name: item,
        category: catName,
        material: materials[hash % materials.length],
        dim: `Standard OEM (${(hash % 30) + 10}mm)`,
        temp: temps[hash % temps.length],
        moq: moq.toLocaleString()
      })
    })
  })
  return specs
}

function getEBikeIncludedPartsList(categoriesList) {
  const list = []
  categoriesList.forEach(catName => {
    const items = EBIKE_PARTS[catName] || []
    items.forEach(item => list.push(item))
  })
  return list
}

const PRODUCTS = [
  {
    id: 'industrial-seals',
    name: 'Industrial Seals',
    tagline: 'Complete industrial sealing solutions for demanding applications',
    image: '/assets/industrial-seals.png',
    hasDataSheet: false,
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
    name: 'Motorcycle',
    tagline: 'High-precision motorcycle engine components & sealing assemblies',
    image: '/assets/homepage_3d_bento_motorcycle.png',
    hasDataSheet: false,
    icon: 'two_wheeler',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600',
    description: 'ATI supplies a wide range of motorcycle parts and components, sourced from trusted partners to meet diverse procurement needs worldwide.',
    subProducts: [
      {
        id: 'moto-engine',
        name: 'Motorcycle Engine & Cylinder Components',
        tagline: 'Precision cylinder blocks, pistons, valve stems & head gaskets',
        image: '/assets/motorcycle_engine_sealing.png',
        hasDataSheet: false,
        description: 'ATI supplies high-precision cylinder blocks, forged/cast pistons, piston rings, valve stem seals, and head gaskets engineered for high-RPM motorcycle engines.',
        features: [
          'High thermal resistance withstands continuous operating temperatures up to 280°C',
          'Precision ground manufacturing tolerances within ±0.01mm for high compression',
          'OEM spec compatibility across Honda, Yamaha, Kawasaki, Suzuki, BMW, KTM, etc.'
        ],
        includedParts: getIncludedPartsList(['Engine Parts', 'Fuel System', 'Air Intake System', 'Exhaust System', 'Cooling System']),
        specs: generateSpecsFromCategories(['Engine Parts', 'Fuel System', 'Air Intake System', 'Exhaust System', 'Cooling System']),
        applications: ['4-Stroke Engines', '2-Stroke Engines', 'Performance Racing', 'OEM Replacements'],
      },
      {
        id: 'moto-clutch',
        name: 'Transmission & Clutch Assemblies',
        tagline: 'Heavy-duty clutch friction plates, baskets & shift drums',
        image: '/assets/motorcycle_clutch_parts.png',
        hasDataSheet: false,
        description: 'ATI Transmission & Clutch Assemblies feature high-coefficient friction plates, heat-treated steel drive plates, and precision shift forks designed for seamless gear shifting.',
        features: [
          'Advanced aramid/paper friction lining delivers high static & dynamic friction',
          'Heat-treated alloy steel drive plates resist warping under extreme loads',
          'Provides smooth clutch engagement with zero slippage under full acceleration'
        ],
        includedParts: getIncludedPartsList(['Transmission & Clutch', 'Chain Drive', 'Brake System', 'Suspension & Steering', 'Wheels & Tires']),
        specs: generateSpecsFromCategories(['Transmission & Clutch', 'Chain Drive', 'Brake System', 'Suspension & Steering', 'Wheels & Tires']),
        applications: ['Sport Bikes', 'Cruisers', 'Off-Road / Enduro', 'Commuter Motorcycles'],
      },
      {
        id: 'moto-seals',
        name: 'Motorcycle Rubber & Oil Sealing Kits',
        tagline: 'Engine oil seal kits, front fork seals & FKM O-ring sets',
        image: '/assets/rotary_oil_seals.png',
        hasDataSheet: false,
        description: 'ATI Motorcycle Rubber & Oil Sealing Kits contain high-grade Fluororubber (FKM) and Nitrile (NBR) seals formulated to withstand engine oil additives and high RPM shaft rotation.',
        features: [
          'Double-lip oil seals with garter spring ensure zero fluid leakage and dust exclusion',
          'FKM Viton O-rings maintain elasticity from -20°C to +220°C',
          'Complete engine overhaul sets include crankshaft, countershaft & valve seals'
        ],
        includedParts: getIncludedPartsList(['Rubber & Sealing Components', 'Electrical Parts', 'Lighting', 'Controls', 'Body Parts', 'Motorcycle Accessories']),
        specs: generateSpecsFromCategories(['Rubber & Sealing Components', 'Electrical Parts', 'Lighting', 'Controls', 'Body Parts', 'Motorcycle Accessories']),
        applications: ['Crankcases & Gearboxes', 'Front Fork Suspension', 'Wheel Hubs', 'Valve Train'],
      },
    ],
  },
  {
    id: 'e-bike',
    name: 'E-Bike',
    tagline: 'High-precision electric bicycle powertrain sealing & battery enclosure gaskets',
    image: '/assets/homepage_3d_bento_ebike.png',
    hasDataSheet: false,
    icon: 'electric_bike',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'AT International supplies versatile e-bike parts and components for mid-drive and hub-drive systems, helping buyers source the right components with confidence through a reliable global supply network.',
    subProducts: [
      {
        id: 'ebike-motor',
        name: 'E-Bike Mid-Drive & Motor Sealing Assemblies',
        tagline: 'High-speed rotary shaft seals, motor casing O-rings & IP67 water barrier gaskets',
        image: '/assets/ebike_motor_sealing.png',
        hasDataSheet: false,
        description: 'ATI supplies precision rotary shaft seals, motor casing gaskets, and NBR/FKM O-rings engineered specifically for electric bicycle mid-drive and hub motors.',
        features: [
          'Low-friction sealing lip minimizes motor torque loss and drag',
          'IP67 dust and water ingress protection for off-road and rain riding',
          'Compatible with Bafang, Bosch, Shimano Steps, Yamaha, and Panasonic drive units'
        ],
        includedParts: getEBikeIncludedPartsList(['Electric Drive System', 'Rubber & Sealing Components', 'Fasteners & Hardware', 'Drivetrain']),
        specs: generateEBikeSpecsFromCategories(['Electric Drive System', 'Rubber & Sealing Components', 'Fasteners & Hardware', 'Drivetrain']),
        applications: ['Mid-Drive Motors', 'Hub Motors', 'Planetary Gearboxes', 'E-Cargo Bikes'],
      },
      {
        id: 'ebike-battery',
        name: 'E-Bike Battery Enclosure & Powerpack Gaskets',
        tagline: 'UL94-V0 flame-retardant silicone seals, IP68 case gaskets & thermal barrier pads',
        image: '/assets/ebike_battery_sealing.png',
        hasDataSheet: false,
        description: 'ATI supplies custom-molded flame-retardant silicone and EPDM gaskets for e-bike battery enclosures, protecting lithium-ion cells against moisture, vibration, and thermal runaway.',
        features: [
          'UL94-V0 fire resistance for battery safety compliance',
          'IP68 waterproof rating prevents moisture ingress into cell chambers',
          'High compressibility compensates for aluminum frame extrusion tolerances'
        ],
        includedParts: getEBikeIncludedPartsList(['Battery System', 'Electrical Components', 'Lighting & Safety']),
        specs: generateEBikeSpecsFromCategories(['Battery System', 'Electrical Components', 'Lighting & Safety']),
        applications: ['Integrated Frame Batteries', 'External Powerpacks', 'BMS Enclosures', 'Charging Ports'],
      },
      {
        id: 'ebike-drive',
        name: 'E-Bike Powertrain & Drive System Components',
        tagline: 'Controller housing seals, brake sensors & wiring harness entry grommets',
        image: '/assets/homepage_3d_bento_ebike.png',
        hasDataSheet: false,
        description: 'ATI supplies complete powertrain sealing components including speed sensor seals, planetary reduction gear seals, controller box gaskets, and multi-wire rubber grommets.',
        features: [
          'Resists synthetic gear grease, UV exposure, and road salt corrosion',
          'Integrated wire grommets prevent moisture wicking along power cables',
          'Long service life tested to 50,000 km operating durability'
        ],
        includedParts: getEBikeIncludedPartsList(['Brake System', 'Suspension & Steering', 'Wheels & Tires', 'Frame & Body Parts', 'E-Bike Accessories']),
        specs: generateEBikeSpecsFromCategories(['Brake System', 'Suspension & Steering', 'Wheels & Tires', 'Frame & Body Parts', 'E-Bike Accessories']),
        applications: ['Hydraulic Disc Brakes', 'Front Suspension Forks', 'Display Units', 'Controller Modules'],
      },
    ],
  },
]

// ── Structure Image Block ─────────────────────────────────────────
function StructureImage({ src, caption }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return (
      <div className="w-full text-center py-2">
        <span className="text-xs font-bold text-[#005691]/60 uppercase tracking-wider">{caption}</span>
      </div>
    )
  }
  return (
    <div className="w-full my-3 text-center">
      <img
        src={src}
        alt={caption}
        onError={() => setFailed(true)}
        className="w-full h-auto max-h-80 object-contain mx-auto"
      />
      {caption && (
        <p className="text-xs text-center text-[#505f76] mt-2 font-medium italic">
          {caption}
        </p>
      )}
    </div>
  )
}

// ── Technical Data Sheet Modal ─────────────────────────────────────
function DataSheetModal({ productId, onClose }) {
  const sheet = DATA_SHEETS[productId]
  if (!sheet) return null

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#c5c6cd] animate-modalFade">
        <div className="bg-[#005691] text-white px-8 py-6 rounded-t-2xl flex items-start justify-between gap-4">
          <div>
            <div className="inline-block px-2.5 py-0.5 bg-white/20 text-white text-xs font-semibold rounded mb-2 uppercase tracking-widest">
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
    <div className="sticky top-40 z-30 bg-gradient-to-r from-[#005691]/100 to-[#0077be]/0 shadow-sm transition-all duration-300 rounded-xl mb-6">
      <div className="max-w-[1280px] mx-auto px-6 py-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 text-white hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-105 transform"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
            <span className="text-sm font-semibold hidden sm:inline">Back</span>
          </button>
          <div className="w-px h-6 bg-white/30 mx-2 hidden sm:block"></div>
          {subProducts.map((sub) => (
            <button
              key={sub.id}
              onClick={() => onSelect(sub.id)}
              className={`
                relative px-4 py-1.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300
                ${activeSub === sub.id 
                  ? 'bg-white text-[#005691] shadow-lg transform scale-105' 
                  : 'text-white/80 hover:text-white hover:bg-white/20 hover:scale-105'
                }
                transform transition-all duration-300 ease-in-out group
              `}
            >
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                {activeSub === sub.id && (
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                )}
                {sub.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Product Detail Component ─────────────────────────────────────
function ProductDetail({
  product,
  onNavigate,
  setSheetOpen,
  selectedSubProduct,
  onSelectSubProduct,
  onBackToMain
}) {
  const sub = product.subProducts ? product.subProducts.find((s) => s.id === selectedSubProduct) : null

  if (sub) {
    return (
      <div className="space-y-8 animate-fadeIn">
        <SubProductNav
          subProducts={product.subProducts}
          activeSub={selectedSubProduct}
          onSelect={onSelectSubProduct}
          onBack={onBackToMain}
        />

        <div className="bg-white border border-[#c5c6cd] rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
            <div className="h-72 overflow-hidden rounded-xl bg-[#f7f9fb] relative border border-[#c5c6cd]">
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.background = '#eceef0' }}
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-[#005691] mb-2">{sub.name}</h3>
              <p className="text-sm font-semibold text-[#005691] uppercase tracking-wider mb-4">{sub.tagline}</p>
              <p className="text-[#505f76] text-sm leading-relaxed mb-6">{sub.description}</p>
              
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('Contact Us')}
                  className="bg-[#005691] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:brightness-110 transition-all hover:scale-105 duration-200 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">request_quote</span>
                  Request Quote
                </button>
                {sub.hasDataSheet && (
                  <button
                    onClick={() => setSheetOpen(sub.id)}
                    className="border border-[#005691] text-[#005691] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all hover:scale-105 duration-200 flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">description</span>
                    View Data Sheet
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Features & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200">
            {sub.features && (
              <div>
                <h4 className="font-bold text-[#005691] text-base mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                  Key Features & Advantages
                </h4>
                <ul className="space-y-2">
                  {sub.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[#505f76]">
                      <span className="material-symbols-outlined text-emerald-600 text-sm mt-0.5">check_circle</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {sub.applications && (
              <div>
                <h4 className="font-bold text-[#005691] text-base mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                  Primary Applications
                </h4>
                <div className="flex flex-wrap gap-2">
                  {sub.applications.map((app, idx) => (
                    <span key={idx} className="px-3 py-1 bg-[#005691]/10 text-[#005691] font-semibold text-xs rounded-full">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Included Parts & Specifications */}
          {sub.specs && sub.specs.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-bold text-[#005691] text-base mb-4 flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#005691] rounded-full inline-block" />
                {sub.specs[0]?.part && sub.specs[0]?.material ? 'Technical Specifications' : 'Included Parts Catalogue'} ({sub.specs.length} Items)
              </h4>

              {sub.specs[0]?.part && sub.specs[0]?.material ? (
                /* Industrial Seals Full Written Technical Specifications Table */
                <div className="overflow-x-auto rounded-xl border border-[#c5c6cd]">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#005691] text-white uppercase text-xs tracking-wider">
                      <tr>
                        <th className="py-3.5 px-4 font-bold">Part Code</th>
                        <th className="py-3.5 px-4 font-bold">Material Grade</th>
                        <th className="py-3.5 px-4 font-bold">Dimensions (mm)</th>
                        <th className="py-3.5 px-4 font-bold">Temp Range</th>
                        <th className="py-3.5 px-4 font-bold text-right">MOQ (PCS)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {sub.specs.map((item, idx) => (
                        <tr key={idx} className="hover:bg-blue-50/50 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-[#005691]">{item.part}</td>
                          <td className="py-3.5 px-4 text-gray-700 font-medium">{item.material}</td>
                          <td className="py-3.5 px-4 text-gray-600 font-mono">{item.dim}</td>
                          <td className="py-3.5 px-4 text-gray-600">{item.temp}</td>
                          <td className="py-3.5 px-4 font-semibold text-gray-900 text-right">{item.moq}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                /* Motorcycle & E-Bike Included Parts Columns & Rows Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {sub.specs.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-3.5 bg-[#f7f9fb] border border-gray-200 rounded-lg hover:border-[#005691] hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <span className="text-sm font-semibold text-gray-800">{item.name}</span>
                      <span className="text-xs px-2.5 py-1 bg-[#005691]/10 text-[#005691] font-bold rounded-md whitespace-nowrap">
                        {item.category}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <div className="mb-12 animate-fadeIn">
        <h2 className="text-3xl font-bold text-[#005691] mb-2">{product.name}</h2>
        <p className="text-[#005691] font-semibold text-sm mb-4 uppercase tracking-widest">{product.tagline}</p>
        <p className="text-[#505f76] leading-relaxed max-w-4xl">{product.description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {product.subProducts.map((subItem, index) => (
          <div 
            key={subItem.id} 
            className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-lg transition-all hover:scale-105 duration-300 cursor-pointer group animate-scaleIn flex flex-col justify-between"
            style={{ animationDelay: `${index * 0.15}s` }}
            onClick={() => onSelectSubProduct(subItem.id)}
          >
            <div>
              <div className="h-48 overflow-hidden bg-[#f7f9fb] relative">
                <img
                  src={subItem.image}
                  alt={subItem.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => { e.target.style.background = '#eceef0' }}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-[#005691] mb-2">{subItem.name}</h3>
                <p className="text-sm text-[#505f76] leading-relaxed mb-4">{subItem.tagline}</p>
              </div>
            </div>

            <div className="p-6 pt-0">
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
                      onSelectSubProduct(subItem.id)
                    }}
                  >
                    View Details
                  </button>
                  {subItem.hasDataSheet && (
                    <button
                      className="border border-[#005691] text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/5 transition-all hover:scale-105 duration-200"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSheetOpen(subItem.id)
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

// ── Main Products Page ────────────────────────────────────────────
export default function Products({ onNavigate }) {
  const location = useLocation()
  const [active, setActive] = useState('industrial-seals')
  const [sheetOpen, setSheetOpen] = useState(false)
  const [activeSubProduct, setActiveSubProduct] = useState(null)

  // Listen to hash or search parameters (e.g. #motorcycle, #e-bike, #industrial-seals)
  useEffect(() => {
    const rawHash = location.hash ? location.hash.replace('#', '') : ''
    const params = new URLSearchParams(location.search)
    const targetTab = params.get('tab') || rawHash

    if (targetTab) {
      if (targetTab.includes('e-bike') || targetTab.includes('ebike')) {
        setActive('e-bike')
      } else if (targetTab.includes('motorcycle')) {
        setActive('motorcycle')
      } else if (targetTab.includes('industrial') || targetTab.includes('seal') || targetTab.includes('valve') || targetTab.includes('o-ring')) {
        setActive('industrial-seals')
      }
    }
  }, [location.hash, location.search])

  const product = PRODUCTS.find((p) => p.id === active) || PRODUCTS[0]

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

  return (
    <div className="bg-[#f7f9fb] min-h-screen">
      {sheetOpen && (
        <DataSheetModal 
          productId={activeSubProduct} 
          onClose={() => setSheetOpen(false)} 
        />
      )}

      {/* Hero Banner */}
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
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Everything You Need</h1>
          <p className="text-white/80 text-base max-w-1xl">
            Looking for the right parts without the sourcing hassle? From industrial sealing solutions to motorcycle and e-bike components, AT International brings quality-verified products together under one trusted roof — helping buyers source with confidence and keep their businesses moving forward.
          </p>
        </div>
      </section>

      {/* Sticky Products Sub-Navigation Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex gap-6 overflow-x-auto py-3">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => { 
                  setActive(p.id)
                  setActiveSubProduct(null)
                  setSheetOpen(false)
                }}
                className={`
                  px-5 py-2.5 rounded-lg font-semibold text-sm tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2
                  ${active === p.id 
                    ? 'bg-[#005691] text-white shadow-lg transform scale-105' 
                    : 'text-[#505f76] hover:text-[#005691] hover:bg-[#005691]/10'
                  }
                  transform transition-all duration-300 ease-in-out hover:scale-105
                `}
              >
                <span className="material-symbols-outlined text-lg">{p.icon || 'inventory_2'}</span>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-8 py-8">
        <ProductDetail 
          key={product.id}
          product={product} 
          onNavigate={onNavigate} 
          setSheetOpen={handleSheetOpen}
          selectedSubProduct={activeSubProduct}
          onSelectSubProduct={handleSelectSubProduct}
          onBackToMain={handleBackToMain}
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
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
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
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
        .animate-fadeInUp { animation: fadeInUp 0.5s ease-out forwards; }
        .animate-scaleIn { animation: scaleIn 0.4s ease-out forwards; }
        .animate-modalFade { animation: modalFade 0.3s ease-out forwards; }
        .animate-sectionFade { animation: sectionFade 0.4s ease-out forwards; opacity: 0; }
        .animate-listItem { animation: listItem 0.3s ease-out forwards; opacity: 0; }
        .animate-imageFade { animation: imageFade 0.4s ease-out forwards; opacity: 0; }
      `}</style>
    </div>
  )
}