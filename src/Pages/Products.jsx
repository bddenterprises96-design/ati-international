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
    title: 'Motorcycle Crankshaft',
    subtitle: 'Converts the reciprocating motion of the piston into rotational motion, transferring engine power through the primary drive system.',
    structureImage: '/assets/pdf_diagrams/crankshaft_structure.png',
    structureCaption: 'Motorcycle Crankshaft Assembly & Component Structure Diagram',
    theoryImage: '/assets/pdf_diagrams/crankshaft_theory.png',
    theoryCaption: 'Crankshaft Reciprocating Motion & Primary Drive Transfer Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: "The crankshaft is a critical engine component that converts the piston's reciprocating motion into rotational motion through the connecting rod. It transfers the resulting rotational power through the engine's primary drive system to the clutch and transmission, while its crank webs and counterweights help maintain smooth and balanced engine operation. Through its network of verified partner manufacturers, ATI supplies motorcycle crankshaft assemblies for a wide range of motorcycle and small-engine applications."
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Manufactured from suitable high-strength steel materials selected according to the specific engine application for strength, durability, and fatigue resistance.',
          'Precision-machined journals and crankshaft components support accurate bearing fit, smooth rotation, and reliable engine operation.',
          'Balanced crankshaft construction helps minimize vibration and reduces mechanical stress during engine operation.',
          'Precision-finished bearing surfaces provide improved wear resistance and support long-term service performance.',
          'Quality inspection can include dimensional, visual, and balancing checks according to the applicable product and customer requirements.',
          'Sourced through verified partner manufacturers whose crankshaft production and balancing processes are governed by established quality-control and quality management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical motorcycle crankshaft assembly may consist of two crank webs, a crank pin, a connecting rod, connecting-rod bearing components, main journals, crankshaft bearings, a primary drive gear, and a Woodruff key or other locating component, depending on the engine design. The exact configuration varies according to the motorcycle model and engine application.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: "During engine operation, combustion force drives the piston downward. The connecting rod transfers this force to the crank pin, causing the crankshaft to rotate around its main journals. The crank webs and counterweights help manage the reciprocating and rotating masses, contributing to smoother engine operation and reduced vibration. The crankshaft's rotational output is then transferred through the primary drive gear and related primary-drive components to the clutch and transmission.",
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store the crankshaft in a clean, dry environment to protect machined surfaces from moisture, contamination, and corrosion.',
          'Handle carefully and use suitable support points to prevent impact or damage to the crank pin, journals, threads, and gear surfaces.',
          'Inspect all machined surfaces, bearing areas, threads, and drive components for damage, contamination, or corrosion before installation.',
          "Follow the motorcycle manufacturer's recommended installation procedures, torque specifications, and alignment requirements.",
          'Ensure that the crankshaft, bearings, connecting rod, and related components are compatible with the intended engine application.',
          'Where applicable, verify the required crankshaft balancing and assembly specifications before installation.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This crankshaft type supports commuter, touring, sport, performance, scooter, and other small-displacement motorcycle engines where reliable conversion of reciprocating piston motion into rotational power is required.'
      }
    ]
  },
  'moto-clutch': {
    title: 'Motorcycle Cylinder Head',
    subtitle: 'Forms the upper part of the combustion chamber and supports the valves, spark plug, and related engine components essential to efficient engine operation.',
    structureImage: '/assets/pdf_diagrams/cylinder_head_structure.png',
    structureCaption: 'Motorcycle Cylinder Head Component & Sealing Layout Diagram',
    theoryImage: '/assets/pdf_diagrams/cylinder_head_theory.png',
    theoryCaption: 'Combustion Chamber Sealing & Air/Fuel Gas Flow Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: 'The cylinder head forms the upper section of the combustion chamber and provides the mounting and sealing surfaces required for critical engine components. It houses the intake and exhaust valve assemblies, valve seats and guides, spark plug, and related valve-train components according to the engine design. Depending on the cooling system, the cylinder head may incorporate cooling fins for air cooling or internal passages for coolant circulation. ATI works with verified partner manufacturers to supply motorcycle cylinder head assemblies for a wide range of motorcycle and small-engine applications.'
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Commonly manufactured from aluminum alloy to provide a combination of low weight, strength, and effective heat dissipation for motorcycle engine applications.',
          'Precision-machined valve seats and guides support proper valve alignment, sealing, and reliable valve-train operation.',
          'Air-cooled designs may incorporate cooling fins that increase surface area for heat dissipation, while liquid-cooled designs may incorporate internal coolant passages.',
          'Precision-machined combustion chamber, valve, spark-plug, and mounting areas support reliable engine assembly and operation.',
          'Quality inspection can include dimensional, visual, and pressure or leak testing according to the applicable product and customer requirements.',
          'Sourced through verified partner manufacturers whose casting and machining processes are governed by established quality-control and quality management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical motorcycle cylinder head assembly may include the cylinder-head casting, combustion chamber, intake and exhaust ports, valve seats, valve guides, spark-plug bore, mounting holes or studs, and sealing surfaces. Depending on the engine design, it may also accommodate components such as camshaft supports, valve springs, valve stem seals, O-rings, and other valve-train or sealing components.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: "The cylinder head works with the cylinder, piston, valves, and head gasket to form and seal the combustion chamber. During the intake stroke, the intake valve opens to allow air, or an air-fuel mixture depending on the fuel delivery system, to enter the combustion chamber. The valves then close during compression and combustion. Following combustion, the exhaust valve opens to allow combustion gases to leave through the exhaust port. The valve seats provide sealing surfaces for the closed valves, while the valve guides support accurate valve movement. The cylinder head also transfers combustion heat to the engine's cooling system through cooling fins or coolant passages, depending on the design.",
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store in a clean, dry environment to protect machined surfaces, valve seats, and other precision areas from moisture, dust, and corrosion.',
          'Handle carefully to prevent damage to cooling fins, machined sealing surfaces, valve seats, valve guides, and spark-plug threads.',
          'Inspect the gasket surface, combustion chamber, valve seats, mounting holes, and other machined areas for damage or contamination before installation.',
          "Follow the motorcycle manufacturer's specified installation procedure, bolt sequence, torque values, and tightening stages when installing the cylinder head.",
          'Use the correct head gasket and sealing components specified for the intended engine application.',
          'Confirm compatibility with the applicable motorcycle model, engine type, and related valve-train components before installation.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This cylinder head type is suited to commuter, touring, sport, performance, scooter, and other small-displacement motorcycle engines where reliable combustion-chamber sealing, valve operation, and heat management are required.'
      }
    ]
  },
  'moto-seals': {
    title: 'Motorcycle Cylinder',
    subtitle: 'Houses the piston and provides the cylinder bore in which compression and combustion take place during engine operation.',
    structureImage: '/assets/pdf_diagrams/cylinder_structure.png',
    structureCaption: 'Motorcycle Cylinder Barrel, Bore & Gasket Mounting Structure Diagram',
    theoryImage: '/assets/pdf_diagrams/cylinder_theory.png',
    theoryCaption: 'Piston Movement, Ring Sealing & Heat Dissipation Principle',
    sections: [
      {
        heading: 'Product Description',
        content: 'The motorcycle cylinder, also referred to as a cylinder barrel or cylinder block in some engine designs, houses the piston and provides the precision-machined bore in which the piston moves during engine operation. The cylinder bore works together with the piston rings to contain combustion pressure, control lubricating oil, and support efficient engine operation. Its dimensional accuracy and surface finish are critical to proper piston-ring sealing, controlled friction, and reliable wear performance. ATI sources motorcycle cylinder assemblies through its network of verified partner manufacturers, supporting a wide range of motorcycle and small-engine applications.'
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Manufactured from materials and with cylinder-wall constructions selected according to the engine design, including aluminum alloy cylinders, cast-iron cylinders, and aluminum cylinders incorporating cast-iron or specially treated cylinder running surfaces.',
          'Precision-bored and honed cylinder surfaces support proper piston-ring seating, effective sealing, controlled friction, and appropriate oil retention.',
          'Air-cooled designs may incorporate external cooling fins to increase surface area and assist heat dissipation, while liquid-cooled designs may incorporate coolant passages.',
          'Precision-machined mounting and gasket surfaces support proper alignment and reliable sealing between the cylinder, cylinder head, and crankcase.',
          'Quality inspection can include bore-diameter and dimensional checks, surface-finish verification, and visual inspection according to applicable product and customer requirements.',
          'Sourced through verified partner manufacturers whose boring, honing, and finishing processes are governed by established quality-control and quality management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical motorcycle cylinder assembly may include the cylinder body with an internal piston bore, external cooling fins for air-cooled designs or coolant passages for liquid-cooled designs, mounting and sealing surfaces, and locating features such as dowel-pin holes. Depending on the engine design, the assembly may also incorporate or be supplied with a cylinder liner, sealing components, or other application-specific components.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: "The piston moves up and down within the cylinder bore as the engine completes its operating cycle. The piston rings maintain contact with the cylinder wall to help contain combustion pressure and regulate the movement of lubricating oil along the cylinder surface. The bore's dimensional accuracy, geometry, and honed surface finish provide the conditions required for proper piston-ring seating, effective sealing, controlled friction, and reliable operation. In air-cooled designs, heat from the cylinder and combustion process is transferred through the cylinder walls to the external cooling fins and dissipated into the surrounding air. In liquid-cooled designs, heat is transferred through the cylinder to the coolant flowing through the designated cooling passages.",
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store in a clean, dry environment to protect the cylinder bore, machined sealing surfaces, and mounting areas from moisture, dust, and corrosion.',
          'Handle carefully to prevent damage to the bore surface, cooling fins, gasket surfaces, and mounting areas.',
          'Keep the cylinder bore clean and free from dirt, abrasive particles, and other contamination before and during installation.',
          'Inspect the bore, gasket surfaces, dowel-pin holes, and mounting points for damage, contamination, or abnormal wear before installation.',
          'Use the correct gasket, sealing components, and locating dowel pins specified for the intended engine application.',
          "Follow the motorcycle manufacturer's recommended installation procedure, tightening sequence, and torque specifications when mounting the cylinder.",
          'Confirm compatibility among the cylinder bore, piston, and piston rings, including the specified bore size and any applicable dimensional grade or clearance requirements.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This cylinder type is applicable to commuter, touring, sport, performance, scooter, and other small-displacement motorcycle engines where reliable piston guidance, combustion-pressure sealing, heat dissipation, and durable cylinder-wall performance are required.'
      }
    ]
  },
  'ebike-motor': {
    title: 'E-Bike BLDC Hub Motor',
    subtitle: 'Integrated into the wheel hub to convert electrical energy into mechanical rotation, providing propulsion for the e-bike.',
    structureImage: '/assets/pdf_diagrams/ebike_motor_structure.png',
    structureCaption: 'BLDC Hub Motor Stator, Rotor & Planetary Gear Assembly Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_motor_theory.png',
    theoryCaption: 'Direct-Drive vs Geared Hub Motor Commutation & Torque Comparison',
    sections: [
      {
        heading: 'Product Description',
        content: 'The BLDC (Brushless DC) hub motor is an electric drive unit integrated into the wheel hub, converting electrical energy from the battery into mechanical rotation that propels the e-bike. Using electronic commutation instead of mechanical brushes, it can provide efficient power delivery, reduced maintenance requirements, and long service life. Through its network of verified partner manufacturers, ATI supplies e-bike BLDC hub motor assemblies for a wide range of e-bike and light electric vehicle applications.'
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Brushless design eliminates brush-related wear, supporting longer service life and reduced maintenance compared with brushed motor designs.',
          'Available in geared and direct-drive (gearless) configurations, allowing selection based on torque, efficiency, weight, and application requirements.',
          'Hall sensor-based position detection, where specified, provides rotor position feedback to support controlled motor commutation and operation.',
          'Sealed motor housing designs help protect internal windings and electrical components from dust and moisture exposure, depending on the specified ingress protection (IP) rating.',
          'Quality inspection can include electrical performance testing, winding resistance checks, and sealing or IP-rating verification according to the applicable product and customer requirements.',
          'Sourced through verified partner manufacturers whose motor winding, assembly, and testing processes are governed by established quality-control and quality-management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical BLDC hub motor assembly consists of a stator with copper windings fixed to a central axle, a rotor fitted with permanent magnets that rotates around or within the stator depending on the motor type, Hall sensors for rotor position detection where specified, a motor housing, phase and sensor wiring, and mounting components for integration into the wheel. Geared variants may additionally incorporate an internal planetary gear set and a freewheel clutch mechanism.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: "Electrical current from the controller energizes the stator windings in a controlled sequence, generating magnetic fields that interact with the permanent magnets in the rotor and produce rotation. Where Hall sensors are used, they detect rotor position and provide feedback to the controller, which uses this information to switch current between the motor phases at the appropriate intervals. Sensorless configurations can instead estimate rotor position using the motor's electrical characteristics, such as back electromotive force (back-EMF). In direct-drive hub motors, the motor operates without an internal reduction gear, and the motor's rotational speed corresponds directly to the wheel's rotational speed. In geared hub motors, a higher-speed motor drives an internal reduction gear system, commonly using planetary gears, to reduce rotational speed and increase the torque delivered to the wheel. Geared hub motors commonly incorporate a freewheel mechanism that allows the wheel to rotate without driving the motor when the motor is not providing propulsion, although the exact mechanism varies by design.",
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store the motor in a clean, dry environment to protect windings, wiring connections, and housing surfaces from moisture and contamination.',
          'Handle carefully to avoid impact damage to the motor housing, axle, or phase and sensor wiring.',
          'Inspect wiring connectors, phase leads, and housing seals for damage before installation.',
          "Follow the e-bike manufacturer's specified torque values and mounting procedures when installing the motor into the wheel and frame.",
          "Confirm the motor's voltage, rated power, and controller compatibility before installation.",
          'Avoid exposing the motor to conditions beyond its specified IP rating during use, cleaning, or storage.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This hub motor type supports commuter, cargo, folding, and off-road e-bikes, as well as other light electric vehicle applications, where reliable propulsion, efficient power delivery, and low-maintenance operation are required.'
      }
    ]
  },
  'ebike-battery': {
    title: 'E-Bike Motor Controller',
    subtitle: 'Regulates electrical power between the battery and hub motor, controlling motor operation and supporting responsive e-bike performance.',
    structureImage: '/assets/pdf_diagrams/ebike_controller_structure.png',
    structureCaption: 'E-Bike Motor Controller Circuit Board & Terminal Architecture Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_controller_theory.png',
    theoryCaption: 'Rider Input Signal Processing & Motor Phase Switching Diagram',
    sections: [
      {
        heading: 'Product Description',
        content: 'The e-bike motor controller is the electronic control unit that regulates electrical power between the battery and the BLDC hub motor. It processes signals from rider inputs and motor feedback, such as the throttle, pedal-assist sensor (PAS), brake-cutoff signals, and Hall sensors where specified, and controls current switching through the motor phases to manage motor operation. ATI works with verified partner manufacturers to supply e-bike motor controller assemblies for a wide range of e-bike and light electric vehicle applications.'
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Electronic commutation circuitry enables controlled and efficient operation of BLDC hub motors.',
          'Supports Hall sensor-based and, where specified, sensorless motor feedback configurations for compatibility with different motor-control systems.',
          'Configurable inputs can support throttle, pedal-assist sensor (PAS), brake-cutoff, and other control signals, depending on the e-bike system design.',
          'Power switching components, commonly including MOSFETs, control the current supplied to the motor phases for responsive motor operation.',
          'Enclosed housing designs can help protect internal circuitry from dust and moisture exposure, depending on the specified ingress protection (IP) rating.',
          'Quality inspection can include electrical performance, functional, load, and sealing or IP-rating tests according to the applicable product and customer requirements.',
          'Sourced through verified partner manufacturers whose circuit assembly, programming, and testing processes are governed by established quality-control and quality-management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical e-bike motor controller assembly may consist of a printed circuit board with power switching components such as MOSFETs, a microcontroller unit (MCU) for signal processing and control logic, a three-phase inverter or switching stage, battery input terminals, motor phase outputs, and connectors for throttle, PAS, brake, Hall sensor, display, or other system signals, depending on the controller design. Battery and motor connections may use labels such as B+/B− and U/V/W, although terminal identification varies by manufacturer and application. The assembly is typically enclosed within a protective housing designed for the intended operating environment.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: 'The controller receives direct-current (DC) power from the e-bike battery and converts it into controlled electrical current for the motor through its power-switching stage. Based on rider input signals and, where applicable, rotor-position feedback from Hall sensors, the controller determines the appropriate motor-control sequence and switches current through the motor phases. In sensorless systems, the controller can estimate rotor position from electrical characteristics such as back electromotive force (back-EMF). These control processes regulate motor operation in response to rider input and programmed system parameters.',
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store the controller in a clean, dry environment to protect the circuit board, connectors, terminals, and housing from moisture and contamination.',
          'Handle carefully to avoid impact damage to connectors, terminals, wiring, and the protective housing.',
          'Inspect wiring connectors, terminal connections, and housing seals for damage before installation.',
          "Confirm the controller's rated voltage, current capacity, motor compatibility, and required signal connections before connecting it to the motor and battery.",
          "Follow the manufacturer's specified wiring diagram and terminal connections during installation, as connector layouts and labeling vary by controller design.",
          'Ensure that Hall sensor, sensorless, PAS, throttle, brake-cutoff, display, and other signal connections are compatible with the intended e-bike system where applicable.',
          'Avoid exposing the controller to conditions beyond its specified IP rating during use, cleaning, or storage.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This motor controller type is suited to commuter, cargo, folding, and off-road e-bikes, as well as other light electric vehicle applications, where reliable BLDC motor control, responsive power management, and compatibility with rider-input systems are required.'
      }
    ]
  },
  'ebike-drive': {
    title: 'E-Bike Li-ion Battery Charger',
    subtitle: 'Converts AC power from a wall outlet into regulated DC power for controlled and reliable charging of an e-bike lithium-ion battery pack.',
    structureImage: '/assets/pdf_diagrams/ebike_charger_structure.png',
    structureCaption: 'Li-ion Battery Charger Circuitry & Outer Housing Anatomy Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_charger_theory.png',
    theoryCaption: 'Constant-Current / Constant-Voltage (CC-CV) Charging Stage Graph',
    sections: [
      {
        heading: 'Product Description',
        content: 'The e-bike Li-ion battery charger converts alternating current (AC) from a standard power source into regulated direct current (DC) suitable for charging a compatible lithium-ion battery pack. It uses controlled charging stages, typically based on a constant-current/constant-voltage (CC-CV) charging profile, to regulate charging current and voltage as the battery approaches its specified full-charge level. When used with a compatible battery pack and its battery management system (BMS), where applicable, the charger supports controlled and safe battery charging. ATI sources e-bike Li-ion battery charger assemblies through its network of verified partner manufacturers, supporting a wide range of e-bike and light electric vehicle applications.'
      },
      {
        heading: 'Features & Benefits',
        list: [
          'Constant-current/constant-voltage (CC-CV) charging supports controlled and efficient charging of compatible lithium-ion battery packs.',
          'Built-in protection features, where specified, may include over-voltage, over-current, short-circuit, and over-temperature protection to support safe charging operation.',
          'Charging-status indicators, where specified, provide a visual reference for charging progress and charger status.',
          'Enclosed housing designs help protect internal electrical components from dust and moisture exposure, depending on the specified enclosure and ingress-protection rating.',
          'Output voltage and current are configured according to the intended battery-pack requirements, helping ensure compatibility with the specified e-bike battery system.',
          'Quality inspection can include electrical performance testing, output-voltage and current verification, functional testing, and applicable safety or compliance checks according to the product and customer requirements.',
          'Sourced through verified partner manufacturers whose circuit assembly, testing, and safety-control processes are governed by established quality-control and quality management systems.'
        ]
      },
      {
        heading: 'Basic Structure',
        content: 'A typical e-bike Li-ion battery charger assembly may consist of an AC input plug and cable, input protection and rectification circuitry, a switching power-conversion stage, voltage and current regulation circuitry, control and protection circuitry, a DC output cable with a battery-compatible connector, status indicators where specified, and a protective outer housing. The exact internal configuration varies according to the charger design. Input-voltage range, output voltage, output current, connector type, charging protocol, enclosure design, and protection functions are selected according to the intended battery pack and e-bike application.',
        showImageAfter: 'structure'
      },
      {
        heading: 'Working Principle',
        content: "The charger receives AC power through its input connection and converts it into regulated DC power through an internal rectification and power-conversion stage. During the constant-current (CC) stage, the charger supplies a controlled charging current while the battery voltage increases. As the battery reaches its specified charging-voltage limit, the charger transitions to the constant-voltage (CV) stage, maintaining the specified voltage while the charging current gradually decreases. The charging-voltage limit must match the battery manufacturer's specified requirements because different lithium-ion battery chemistries and pack configurations can have different charging-voltage requirements. The battery management system (BMS), where incorporated into the battery pack, can provide additional monitoring and protection functions such as cell-voltage, current, and temperature monitoring. The exact interaction between the charger and BMS depends on the battery and charging-system design.",
        showImageAfter: 'theory'
      },
      {
        heading: 'Handling Instructions',
        list: [
          'Store the charger in a clean, dry environment away from excessive heat, moisture, direct sunlight, and sources of contamination.',
          'Use the charger only under the environmental conditions specified by the manufacturer and avoid exposure to rain, water, or excessive humidity unless the charger is specifically designed for such conditions.',
          'Inspect the power cord, DC cable, connector, housing, and other external components for visible damage before use.',
          "Confirm that the charger's output voltage, output current, connector, polarity, and charging requirements are compatible with the intended battery pack before connection.",
          'Use the charger specified or approved for the applicable e-bike battery system; do not substitute a charger with an incompatible voltage or charging specification.',
          "Follow the battery and charger's manufacturer's specified sequence for connecting and disconnecting the charger and battery.",
          'Do not open, modify, or repair the charger unless this work is performed by appropriately qualified personnel, as the charger contains potentially hazardous electrical components.',
          'Provide adequate ventilation around the charger during operation and do not cover the charger while it is charging.',
          'Stop using the charger if the housing, cable, connector, or battery shows abnormal heating, damage, unusual odor, smoke, or other signs of malfunction, and follow the applicable manufacturer\'s safety instructions.'
        ]
      },
      {
        heading: 'Usage Examples',
        content: 'This charger type is applicable to commuter, cargo, folding, and off-road e-bikes, as well as other light electric vehicle applications, where controlled and reliable battery charging with compatible lithium-ion battery packs is required.'
      }
    ]
  },
}

// ── MOTORCYCLE PARTS CATEGORIES (PDF Real-World Parts List) ────────
const MOTORCYCLE_PARTS = {
  'Engine Parts': [
    'Cylinder kits',
    'Cylinder heads',
    'Pistons',
    'Piston rings',
    'Piston pins',
    'Connecting rods',
    'Crankshafts',
    'Camshafts',
    'Rocker arms',
    'Valves',
    'Valve springs',
    'Valve guides',
    'Timing chains',
    'Timing sprockets',
    'Gasket sets',
    'Oil seals'
  ],
  'Fuel System Parts': [
    'Carburetors',
    'Fuel pumps',
    'Fuel tanks',
    'Fuel caps',
    'Air filters',
    'Intake manifolds',
    'Throttle cables',
    'Choke cables'
  ],
  'Ignition & Electrical Parts': [
    'Spark plugs',
    'Ignition coils',
    'CDI units',
    'Stators',
    'Rotors',
    'Rectifier regulators',
    'Wiring harnesses',
    'Switches',
    'Relays',
    'Fuses',
    'Horns',
    'Batteries'
  ],
  'Transmission & Drive Parts': [
    'Gearboxes',
    'Shift drums',
    'Shift forks',
    'Drive chains',
    'Sprockets',
    'Chain tensioners'
  ],
  'Braking Parts': [
    'Brake pads',
    'Brake shoes',
    'Brake discs / rotors',
    'Brake calipers',
    'Brake master cylinders',
    'Brake hoses',
    'Brake levers',
    'Brake pedals'
  ],
  'Suspension & Steering Parts': [
    'Front forks',
    'Fork seals',
    'Fork springs',
    'Rear shock absorbers',
    'Swing arms',
    'Steering bearings',
    'Handlebars',
    'Grips',
    'Foot pegs'
  ],
  'Wheel & Tire Parts': [
    'Rims',
    'Spokes',
    'Hubs',
    'Axles',
    'Bearings',
    'Tires',
    'Tubes',
    'Valve stems'
  ],
  'Body & Frame Parts': [
    'Fuel tanks',
    'Side covers',
    'Seats',
    'Fairings',
    'Mudguards / fenders',
    'Chain guards',
    'Engine guards',
    'Frame parts',
    'Bolts, nuts, fasteners'
  ],
  'Lighting & Signal Parts': [
    'Headlights',
    'Tail lights',
    'Brake lights',
    'Turn signals',
    'Reflectors'
  ],
  'Exhaust Parts': [
    'Exhaust pipes',
    'Mufflers / silencers',
    'Exhaust gaskets',
    'Heat shields'
  ],
  'Lubrication & Cooling Parts': [
    'Oil pumps',
    'Oil filters',
    'Radiators',
    'Water pumps',
    'Coolant hoses',
    'Thermostats'
  ],
  'Accessories & Small Parts': [
    'Mirrors',
    'Instrument clusters',
    'Cables (throttle, clutch, brake, speedo)',
    'Levers (brake, clutch)',
    'Kick stands',
    'Center stands'
  ]
}

// ── E-BIKE PARTS CATEGORIES (PDF Real-World Parts List) ──────────
const EBIKE_PARTS = {
  'Motor & Drive Parts': [
    'Hub motors (front & rear)',
    'Mid-drive motors',
    'Motor controllers',
    'Motor sensors',
    'Motor mounts',
    'Drive belts',
    'Drive chains',
    'Freewheels',
    'Cassettes'
  ],
  'Battery & Power Parts': [
    'E-bike batteries',
    'Battery cells',
    'Battery management systems (BMS)',
    'Battery cases',
    'Battery mounts',
    'Battery racks',
    'Battery connectors',
    'Battery locks'
  ],
  'Charging Parts': [
    'Battery chargers',
    'Charging ports',
    'Charging sockets',
    'Charging cables',
    'Adapters'
  ],
  'Control & Display Parts': [
    'E-bike displays / LCD panels',
    'Control units / ECUs',
    'Throttles (twist & thumb)',
    'Pedal assist sensors (PAS)',
    'Speed sensors',
    'Brake sensors',
    'Control cables',
    'Wiring harnesses'
  ],
  'Braking Parts': [
    'Hydraulic disc brakes',
    'Mechanical disc brakes',
    'Brake levers (with motor cut-off)',
    'Brake rotors',
    'Brake pads',
    'Brake calipers'
  ],
  'Drivetrain & Transmission Parts': [
    'Chains',
    'Sprockets',
    'Cassettes',
    'Derailleurs',
    'Shifters',
    'Cranksets',
    'Bottom brackets',
    'Pedals'
  ],
  'Wheel & Tire Parts': [
    'Rims',
    'Hubs (motor & non-motor)',
    'Spokes',
    'Tires (e-bike rated)',
    'Tubes',
    'Valve stems'
  ],
  'Frame & Structural Parts': [
    'E-bike frames',
    'Battery-integrated frames',
    'Rear racks',
    'Frame mounts',
    'Kick stands'
  ],
  'Electrical & Wiring Parts': [
    'Wiring harnesses',
    'Connectors',
    'Switches',
    'Fuses',
    'Circuit protection'
  ],
  'Lighting & Signal Parts': [
    'LED headlights',
    'Tail lights',
    'Brake lights',
    'Turn signals',
    'Reflectors'
  ],
  'Suspension & Steering Parts': [
    'Front forks',
    'Rear shocks',
    'Handlebars',
    'Grips',
    'Stems'
  ],
  'Accessories': [
    'Mirrors',
    'Bell / horn',
    'Phone holders',
    'Bottle cages',
    'Fenders / mudguards',
    'Chain guards',
    'Luggage racks',
    'Child seats',
    'E-bike covers'
  ],
  'Safety & Security Parts': [
    'E-bike locks',
    'Alarm systems',
    'GPS trackers'
  ]
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
        image: '/assets/clean_product_images/clean_aaa.png',
        hasDataSheet: true,
        description: 'ATI supplies Valve Stem Seals produced from high-grade Viton (FKM) and Silicone (VMQ) elastomers.',
        features: ['Operating temperature: -60°C to +230°C', 'Pressure resistance: up to 10 bar'],
        specs: [
          { part: 'ATI-VS-5022', material: 'Viton-75 (FKM)', dim: '22.0 × 3.5', temp: '-20 to +200°C', moq: '5,000' },
          { part: 'ATI-VS-7822', material: 'Silicone VMQ', dim: '18.0 × 2.0', temp: '-60 to +230°C', moq: '10,000' },
          { part: 'ATI-VS-4418', material: 'NBR-70', dim: '14.0 × 2.5', temp: '-40 to +120°C', moq: '5,000' },
        ],
        applications: ['Motorcycles', 'E-Bikes', 'Industrial Engines'],
      },
      {
        id: 'o-rings',
        name: 'O-Rings',
        tagline: 'Comprehensive material range for universal sealing',
        image: '/assets/clean_product_images/clean_ccc.png',
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
        image: '/assets/clean_product_images/clean_bbb.png',
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
    tagline: 'High-precision motorcycle engine parts & sealing assemblies',
    image: '/assets/homepage_3d_bento_motorcycle.png',
    hasDataSheet: false,
    icon: 'two_wheeler',
    color: '#FF6B35',
    gradient: 'from-orange-500 to-red-600',
    description: 'ATI supplies a wide range of motorcycle parts, sourced from trusted partners to meet diverse procurement needs worldwide.',
    subProducts: [
      {
        id: 'moto-engine',
        name: 'Motorcycle Crankshaft',
        tagline: 'Reciprocating-to-rotational motion conversion & primary drive transfer',
        image: '/assets/clean_product_images/crankshaft_main.png',
        hasDataSheet: true,
        description: 'ATI supplies motorcycle crankshaft assemblies designed for smooth rotational power transfer, balanced engine operation, and high fatigue resistance.',
        features: [
          'High-strength steel materials selected for fatigue resistance and durability',
          'Precision-machined journals support accurate bearing fit and smooth rotation',
          'Balanced construction minimizes engine vibration and mechanical stress'
        ],
        includedParts: [
          'Crankshaft Main Body',
          'Connecting Rod Assembly',
          'Case-Hardened Crankpin',
          'Big End Needle Roller Bearing',
          'Main Crankshaft Journal Bearings',
          'Left & Right Crankshaft Oil Seals',
          'Primary Drive Woodruff Key',
          'Primary Drive Shaft Gear',
          'Crankshaft Thrust Washer Set',
          'Cam Chain Drive Sprocket',
          'Crankshaft Web Counterweights',
          'Flywheel Rotor Mounting Hub'
        ],
        specs: [
          { part: 'ATI-CS-1001', name: 'Crankshaft Main Body', category: 'Crankshaft & Rod', material: 'Forged 4340 Alloy Steel', dim: 'Stroke 54.5mm / Pin 28mm', temp: '-40 to +180°C', moq: '500' },
          { part: 'ATI-CS-1002', name: 'Connecting Rod Assembly', category: 'Crankshaft & Rod', material: 'Forged 20CrMo Alloy Steel', dim: 'Center Distance 104mm', temp: '-40 to +200°C', moq: '1,000' },
          { part: 'ATI-CS-1003', name: 'Case-Hardened Crankpin', category: 'Crankshaft & Rod', material: '20Cr Alloy Carbon Steel', dim: 'Ø 28mm × L 48mm', temp: '-40 to +200°C', moq: '2,000' },
          { part: 'ATI-CS-1004', name: 'Big End Needle Roller Bearing', category: 'Bearings & Retainers', material: 'SUJ2 Chrome Steel', dim: '28 × 36 × 16mm', temp: '-30 to +180°C', moq: '2,000' },
          { part: 'ATI-CS-1005', name: 'Main Crankshaft Journal Bearings', category: 'Bearings & Retainers', material: 'SUJ2 High Precision Steel', dim: '63/22 C3 Precision', temp: '-30 to +160°C', moq: '1,000' },
          { part: 'ATI-CS-1006', name: 'Left & Right Crankshaft Oil Seals', category: 'Seals & Gaskets', material: 'Viton (FKM) Double Lip', dim: '20 × 35 × 7mm / 22 × 35 × 7mm', temp: '-20 to +220°C', moq: '5,000' },
          { part: 'ATI-CS-1007', name: 'Primary Drive Woodruff Key', category: 'Fasteners & Keys', material: 'Hardened Carbon Steel', dim: '4mm × 16mm', temp: '-40 to +250°C', moq: '5,000' },
          { part: 'ATI-CS-1008', name: 'Primary Drive Shaft Gear', category: 'Drive & Timing', material: 'Sintered Powder Metal', dim: '18 Tooth / Module 1.5', temp: '-30 to +180°C', moq: '1,000' },
          { part: 'ATI-CS-1009', name: 'Crankshaft Thrust Washer Set', category: 'Bearings & Retainers', material: 'Phosphor Bronze Alloy', dim: 'ID 22mm × OD 34mm', temp: '-40 to +200°C', moq: '3,000' },
          { part: 'ATI-CS-1010', name: 'Cam Chain Drive Sprocket', category: 'Drive & Timing', material: 'Carburized 16MnCr5 Steel', dim: '16 Tooth Pitch 6.35mm', temp: '-30 to +180°C', moq: '1,000' },
          { part: 'ATI-CS-1011', name: 'Crankshaft Web Counterweights', category: 'Crankshaft & Rod', material: 'Ductile Cast Iron', dim: 'Precision Balanced', temp: '-40 to +200°C', moq: '500' },
          { part: 'ATI-CS-1012', name: 'Flywheel Rotor Mounting Hub', category: 'Crankshaft & Rod', material: 'Forged Medium Carbon Steel', dim: 'Taper Bore 1:10', temp: '-40 to +200°C', moq: '1,000' },
        ],
        applications: ['Commuter Motorcycles', 'Touring Bikes', 'Sport Motorcycles', 'Scooters & Small Engines'],
      },
      {
        id: 'moto-clutch',
        name: 'Motorcycle Cylinder Head',
        tagline: 'Upper combustion chamber sealing, valve-train & spark-plug mounting',
        image: '/assets/clean_product_images/cylinder_head_main.png',
        hasDataSheet: true,
        description: 'ATI Motorcycle Cylinder Heads provide precision-machined combustion chambers, valve guides, and sealing surfaces for air-cooled and liquid-cooled engines.',
        features: [
          'Lightweight aluminum alloy construction for superior heat dissipation',
          'Precision-machined valve seats and guides ensure tight combustion sealing',
          'Compatible with air-cooled cooling fins or internal liquid passages'
        ],
        includedParts: [
          'Cylinder Head Die-Cast Body',
          'Intake Valve Assembly',
          'Exhaust Valve Assembly',
          'Valve Stem Seal Set',
          'Valve Stem Guide Inserts',
          'Valve Seat Insert Rings',
          'Progressive Valve Springs Inner/Outer',
          'Valve Spring Retainers & Split Cotters',
          'Rocker Arm & Pivot Shaft Assembly',
          'Overhead Camshaft (OHC) Assembly',
          'Multi-Layer Steel Head Gasket',
          'Spark Plug Threaded Boss Insert'
        ],
        specs: [
          { part: 'ATI-CH-2001', name: 'Cylinder Head Die-Cast Body', category: 'Cylinder Head Body', material: 'A356.2 Aluminum Alloy', dim: 'OEM Bore 52.4mm / Air Cooled', temp: '-40 to +280°C', moq: '500' },
          { part: 'ATI-CH-2002', name: 'Intake Valve Assembly', category: 'Valvetrain Components', material: 'SUH3 Stainless Steel', dim: 'Head Ø 26mm / Stem Ø 5mm', temp: '-40 to +300°C', moq: '2,000' },
          { part: 'ATI-CH-2003', name: 'Exhaust Valve Assembly', category: 'Valvetrain Components', material: 'SUH35 High-Temp Steel', dim: 'Head Ø 22mm / Stem Ø 5mm', temp: '-40 to +700°C', moq: '2,000' },
          { part: 'ATI-CH-2004', name: 'Valve Stem Seal Set', category: 'Seals & Gaskets', material: 'Viton FKM Fluororubber', dim: '5mm Stem / 8.3mm Guide', temp: '-20 to +230°C', moq: '5,000' },
          { part: 'ATI-CH-2005', name: 'Valve Stem Guide Inserts', category: 'Valvetrain Components', material: 'CuZnAl Bronze Alloy', dim: 'ID 5.0mm × OD 10.0mm', temp: '-40 to +260°C', moq: '3,000' },
          { part: 'ATI-CH-2006', name: 'Valve Seat Insert Rings', category: 'Valvetrain Components', material: 'Sintered Iron-Copper', dim: 'Intake Ø 27mm / Exhaust Ø 23mm', temp: '-40 to +650°C', moq: '3,000' },
          { part: 'ATI-CH-2007', name: 'Progressive Valve Springs Inner/Outer', category: 'Springs & Hardware', material: 'SWOSC-V Oil Tempered Steel', dim: 'Free Length 35.5mm', temp: '-30 to +180°C', moq: '2,000' },
          { part: 'ATI-CH-2008', name: 'Valve Spring Retainers & Split Cotters', category: 'Springs & Hardware', material: 'Case-Hardened Carbon Steel', dim: 'Standard 5mm Stem Fit', temp: '-30 to +200°C', moq: '5,000' },
          { part: 'ATI-CH-2009', name: 'Rocker Arm & Pivot Shaft Assembly', category: 'Valvetrain Components', material: 'Forged 20Cr Alloy Steel', dim: 'Ratio 1:1.15 / Shaft Ø 10mm', temp: '-30 to +200°C', moq: '1,000' },
          { part: 'ATI-CH-2010', name: 'Overhead Camshaft (OHC) Assembly', category: 'Valvetrain Components', material: 'Chilled Cast Alloy Iron', dim: 'Lift 5.8mm / Intake 230°', temp: '-30 to +200°C', moq: '500' },
          { part: 'ATI-CH-2011', name: 'Multi-Layer Steel Head Gasket', category: 'Seals & Gaskets', material: 'MLS Stainless Steel', dim: 'Bore 52.5mm / 0.5mm Thickness', temp: '-40 to +250°C', moq: '5,000' },
          { part: 'ATI-CH-2012', name: 'Spark Plug Threaded Boss Insert', category: 'Cylinder Head Body', material: 'Hardened Steel Sleeve', dim: 'M10 × 1.0 Thread', temp: '-40 to +300°C', moq: '2,000' },
        ],
        applications: ['4-Stroke Engines', 'Performance Motorcycles', 'Scooters', 'Small Displacement Engines'],
      },
      {
        id: 'moto-seals',
        name: 'Motorcycle Cylinder',
        tagline: 'Precision-bored cylinder barrel & piston-ring sealing assembly',
        image: '/assets/clean_product_images/cylinder_main.png',
        hasDataSheet: true,
        description: 'ATI Motorcycle Cylinders feature precision-honed bores for optimal piston-ring seating, controlled friction, and reliable oil retention.',
        features: [
          'Precision-bored and honed cylinder walls for low friction and tight sealing',
          'Air-cooled cooling fins or liquid-cooled passages for thermal stability',
          'Machined mounting and gasket surfaces ensure zero blow-by leakage'
        ],
        includedParts: [
          'Cylinder Barrel Casting',
          'Cast Iron Cylinder Sleeve Liner',
          'Forged Aluminum Piston',
          'Top Compression Piston Ring',
          'Second Scraper Compression Ring',
          '3-Piece Oil Control Ring Set',
          'Gudgeon Pin / Piston Wrist Pin',
          'Piston Pin Retaining Circlips',
          'Cylinder Base Gasket',
          'Cylinder Dowel Alignment Pins',
          'Cooling Fin Rubber Dampers',
          'Cylinder Head Stud Bolts'
        ],
        specs: [
          { part: 'ATI-CB-3001', name: 'Cylinder Barrel Casting', category: 'Cylinder & Liner', material: 'ADC12 High-Grade Aluminum', dim: 'Bore 54mm / Height 98mm', temp: '-40 to +250°C', moq: '500' },
          { part: 'ATI-CB-3002', name: 'Cast Iron Cylinder Sleeve Liner', category: 'Cylinder & Liner', material: 'FC25 Centrifugal Cast Iron', dim: 'ID 54mm × OD 59mm', temp: '-40 to +300°C', moq: '1,000' },
          { part: 'ATI-CB-3003', name: 'Forged Aluminum Piston', category: 'Piston Assembly', material: 'High-Silicon AC8A Alloy', dim: 'Ø 53.95mm / Pin 14mm', temp: '-40 to +260°C', moq: '1,000' },
          { part: 'ATI-CB-3004', name: 'Top Compression Piston Ring', category: 'Piston Assembly', material: 'Nitrided Ductile Iron Chrome', dim: '1.0mm Thickness / Nitrided', temp: '-30 to +280°C', moq: '3,000' },
          { part: 'ATI-CB-3005', name: 'Second Scraper Compression Ring', category: 'Piston Assembly', material: 'Taper-Faced Gray Cast Iron', dim: '1.0mm Thickness', temp: '-30 to +250°C', moq: '3,000' },
          { part: 'ATI-CB-3006', name: '3-Piece Oil Control Ring Set', category: 'Piston Assembly', material: 'Stainless Steel Expander Rails', dim: '2.0mm Thickness / 3-Piece', temp: '-30 to +220°C', moq: '3,000' },
          { part: 'ATI-CB-3007', name: 'Gudgeon Pin / Piston Wrist Pin', category: 'Piston Assembly', material: 'Case-Hardened 20Cr Steel', dim: 'Ø 14mm × L 41mm', temp: '-40 to +220°C', moq: '2,000' },
          { part: 'ATI-CB-3008', name: 'Piston Pin Retaining Circlips', category: 'Fasteners & Retainers', material: 'Spring Steel 65Mn', dim: 'Wire Ø 1.2mm for 14mm Pin', temp: '-40 to +200°C', moq: '10,000' },
          { part: 'ATI-CB-3009', name: 'Cylinder Base Gasket', category: 'Seals & Gaskets', material: 'Non-Asbestos Fiber Interface Board', dim: '0.5mm Thickness', temp: '-40 to +180°C', moq: '5,000' },
          { part: 'ATI-CB-3010', name: 'Cylinder Dowel Alignment Pins', category: 'Fasteners & Retainers', material: 'Hardened Ground Steel', dim: 'Ø 8mm × L 14mm', temp: '-40 to +250°C', moq: '5,000' },
          { part: 'ATI-CB-3011', name: 'Cooling Fin Rubber Dampers', category: 'Seals & Gaskets', material: 'Vibration-Damping EPDM Rubber', dim: 'Universal Fin Fit', temp: '-40 to +150°C', moq: '5,000' },
          { part: 'ATI-CB-3012', name: 'Cylinder Head Stud Bolts', category: 'Fasteners & Retainers', material: 'Grade 10.9 Alloy Steel', dim: 'M8 × 140mm', temp: '-40 to +300°C', moq: '2,000' },
        ],
        applications: ['Crankcases & Cylinders', 'Commuter Bikes', 'Racing & Sport Motorcycles', 'Engine Overhauls'],
      },
    ],
  },
  {
    id: 'e-bike',
    name: 'E-Bike',
    tagline: 'High-precision electric bicycle powertrain sealing & battery enclosure gaskets',
    image: '/assets/ebike.png',
    hasDataSheet: false,
    icon: 'electric_bike',
    color: '#10B981',
    gradient: 'from-emerald-500 to-teal-600',
    description: 'AT International supplies versatile e-bike parts for mid-drive and hub-drive systems, helping buyers source the right parts with confidence through a reliable global supply network.',
    subProducts: [
      {
        id: 'ebike-motor',
        name: 'E-Bike BLDC Hub Motor',
        tagline: 'Brushless wheel hub electric drive propulsion & planetary gear assembly',
        image: '/assets/clean_product_images/ebike_motor_main.png',
        hasDataSheet: true,
        description: 'ATI supplies BLDC hub motors converting electrical energy into smooth mechanical rotation with high torque density and low maintenance.',
        features: [
          'Brushless electronic commutation for long service life and zero brush wear',
          'Geared & direct-drive options tailored for high torque or high speed',
          'Sealed IP-rated motor housing protects internal copper windings'
        ],
        includedParts: [
          'Stator Core & Copper Windings',
          'Permanent Magnet Rotor Shell',
          'High-Precision Sealed Hub Bearings',
          'Internal Planetary Reduction Gears',
          'Threaded Motor Axle Shaft',
          'Hall Sensor Assembly PCB Module',
          'Motor Phase & Signal Wiring Cable',
          'Cast Aluminum Motor Hub Shell',
          'Waterproof Shaft Lip Seals',
          'Torque Washer & M12 Axle Nut Kit',
          'Internal One-Way Freewheel Clutch',
          'Motor Housing Perimeter Gasket'
        ],
        specs: [
          { part: 'ATI-EBM-4001', name: 'Stator Core & Copper Windings', category: 'Electric Motor Core', material: 'Silicon Steel Lamination / Pure Copper', dim: 'Ø 120mm / 48V 500W', temp: '-40 to +150°C', moq: '500' },
          { part: 'ATI-EBM-4002', name: 'Permanent Magnet Rotor Shell', category: 'Electric Motor Core', material: 'NdFeB Neodymium Magnets N35H', dim: '30 Pole Pairs / High Torque', temp: '-40 to +120°C', moq: '500' },
          { part: 'ATI-EBM-4003', name: 'High-Precision Sealed Hub Bearings', category: 'Bearings & Bushings', material: 'AISI 52100 Chrome Steel 6002-2RS', dim: '15 × 32 × 9mm', temp: '-30 to +140°C', moq: '2,000' },
          { part: 'ATI-EBM-4004', name: 'Internal Planetary Reduction Gears', category: 'Drivetrain & Gears', material: 'Glass-Reinforced Nylon 66', dim: 'Mod 1.25 / 36 Teeth', temp: '-20 to +120°C', moq: '1,000' },
          { part: 'ATI-EBM-4005', name: 'Threaded Motor Axle Shaft', category: 'Shafts & Hardware', material: 'High-Tensile 40Cr Steel', dim: 'Ø 12mm Threaded / L 200mm', temp: '-40 to +200°C', moq: '1,000' },
          { part: 'ATI-EBM-4006', name: 'Hall Sensor Assembly PCB Module', category: 'Electronics & Sensors', material: 'FR4 PCB / Honeywell Digital ICs', dim: '120° Phase Angle PCB', temp: '-40 to +125°C', moq: '2,000' },
          { part: 'ATI-EBM-4007', name: 'Motor Phase & Signal Wiring Cable', category: 'Electrical Wiring', material: 'Tinned Copper / Silicone Insulation', dim: '9-Pin Waterproof Julet Plug', temp: '-40 to +180°C', moq: '1,000' },
          { part: 'ATI-EBM-4008', name: 'Cast Aluminum Motor Hub Shell', category: 'Housing & Enclosure', material: 'A356 Aluminum Alloy Disc Mount', dim: '36-Hole Spoke Pattern', temp: '-40 to +180°C', moq: '500' },
          { part: 'ATI-EBM-4009', name: 'Waterproof Shaft Lip Seals', category: 'Seals & Gaskets', material: 'NBR 70A Double Lip Spring-Loaded', dim: '15 × 24 × 5mm', temp: '-30 to +120°C', moq: '5,000' },
          { part: 'ATI-EBM-4010', name: 'Torque Washer & M12 Axle Nut Kit', category: 'Shafts & Hardware', material: 'Hardened Carbon Steel Zinc Plated', dim: 'M12 Anti-Rotation Washer', temp: '-40 to +200°C', moq: '5,000' },
          { part: 'ATI-EBM-4011', name: 'Internal One-Way Freewheel Clutch', category: 'Drivetrain & Gears', material: 'Case-Hardened Roller Assembly', dim: 'High Torque Clutch', temp: '-30 to +140°C', moq: '1,000' },
          { part: 'ATI-EBM-4012', name: 'Motor Housing Perimeter Gasket', category: 'Seals & Gaskets', material: 'VMQ Molded Silicone Seal', dim: 'Custom Profile IP67', temp: '-40 to +180°C', moq: '3,000' },
        ],
        applications: ['Commuter E-Bikes', 'Cargo E-Bikes', 'Folding E-Bikes', 'Light Electric Vehicles'],
      },
      {
        id: 'ebike-battery',
        name: 'E-Bike Motor Controller',
        tagline: 'Electronic power regulation, rider input processing & MOSFET inverter',
        image: '/assets/clean_product_images/ebike_controller_main.png',
        hasDataSheet: true,
        description: 'ATI E-Bike Motor Controllers regulate battery power flow to the motor, processing throttle, PAS, brake cutoff, and Hall sensor signals.',
        features: [
          '3-phase MOSFET inverter stage for precise phase current control',
          'Supports Hall-sensor feedback and sensorless motor commutation',
          'Protected housing enclosure safeguards circuitry against moisture and dust'
        ],
        includedParts: [
          'Extruded Aluminum Heatsink Enclosure',
          'Main Controller Circuit Board PCB',
          'High-Power MOSFET Switch Stage',
          'Low-ESR Bulk Filter Capacitors',
          'Precision Current Sense Shunt Resistor',
          '32-Bit ARM Microcontroller Unit',
          'Waterproof Cable Lead Harness Set',
          'Thermal Conductive Interface Pad',
          'Perimeter Silicone Seal Gasket',
          'Stainless Case Fasteners & Brackets',
          'Step-Down DC Regulator Circuit',
          'Signal Filtering Inductor Choke'
        ],
        specs: [
          { part: 'ATI-EBC-5001', name: 'Extruded Aluminum Heatsink Enclosure', category: 'Housing & Cooling', material: 'Aluminum 6063-T5 Anodized', dim: '110 × 52 × 30mm / Anodized', temp: '-40 to +120°C', moq: '500' },
          { part: 'ATI-EBC-5002', name: 'Main Controller Circuit Board PCB', category: 'Electronics & Hardware', material: '4-Layer FR4 Heavy Copper', dim: '100 × 48mm / 2oz Copper', temp: '-40 to +105°C', moq: '1,000' },
          { part: 'ATI-EBC-5003', name: 'High-Power MOSFET Switch Stage', category: 'Power Electronics', material: 'N-Channel Power MOSFET 100V 80A', dim: 'TO-220 Package / 6-FET Stage', temp: '-55 to +175°C', moq: '6,000' },
          { part: 'ATI-EBC-5004', name: 'Low-ESR Bulk Filter Capacitors', category: 'Power Electronics', material: '63V 470µF High-Temp Electrolytic', dim: 'Ø 10mm × L 20mm', temp: '-40 to +105°C', moq: '5,000' },
          { part: 'ATI-EBC-5005', name: 'Precision Current Sense Shunt Resistor', category: 'Electronics & Sensors', material: 'Manganin Alloy 0.005 Ohm 5W', dim: '5W Precision Shunt', temp: '-55 to +170°C', moq: '3,000' },
          { part: 'ATI-EBC-5006', name: '32-Bit ARM Microcontroller Unit', category: 'Electronics & Sensors', material: 'ARM Cortex-M0 MCU IC LQFP-32', dim: 'LQFP-32 Pin Package', temp: '-40 to +85°C', moq: '1,000' },
          { part: 'ATI-EBC-5007', name: 'Waterproof Cable Lead Harness Set', category: 'Electrical Wiring', material: 'Tinned Copper Julet Connectors', dim: 'Multi-Connector Harness', temp: '-40 to +105°C', moq: '1,000' },
          { part: 'ATI-EBC-5008', name: 'Thermal Conductive Interface Pad', category: 'Housing & Cooling', material: 'Silicone Thermal Pad 1.5W/m-K', dim: '0.5mm Thickness', temp: '-50 to +200°C', moq: '5,000' },
          { part: 'ATI-EBC-5009', name: 'Perimeter Silicone Seal Gasket', category: 'Seals & Gaskets', material: 'VMQ Molded Silicone IP67', dim: 'Custom Profile IP67', temp: '-40 to +180°C', moq: '3,000' },
          { part: 'ATI-EBC-5010', name: 'Stainless Case Fasteners & Brackets', category: 'Housing & Cooling', material: 'AISI 304 Stainless Steel', dim: 'M4 Thread Screws', temp: '-40 to +200°C', moq: '5,000' },
          { part: 'ATI-EBC-5011', name: 'Step-Down DC Regulator Circuit', category: 'Power Electronics', material: 'Integrated Buck Converter 12V Output', dim: '12V 1A Auxiliary Output', temp: '-40 to +105°C', moq: '1,000' },
          { part: 'ATI-EBC-5012', name: 'Signal Filtering Inductor Choke', category: 'Power Electronics', material: 'Ferrite Core Power Inductor', dim: '100µH High Current', temp: '-40 to +125°C', moq: '2,000' },
        ],
        applications: ['Mid-Drive Systems', 'Hub Motor Drives', 'Pedal-Assist E-Bikes', 'Electric Cargo Vehicles'],
      },
      {
        id: 'ebike-drive',
        name: 'E-Bike Li-ion Battery Charger',
        tagline: 'Regulated AC-to-DC constant-current constant-voltage (CC-CV) charger',
        image: '/assets/clean_product_images/ebike_charger_main.png',
        hasDataSheet: true,
        description: 'ATI Li-ion Battery Chargers deliver controlled CC-CV charging stages with over-voltage, over-current, and thermal protection for e-bike powerpacks.',
        features: [
          'Controlled CC-CV charging profile optimizes battery life and safety',
          'Integrated protection against short-circuit, over-current, and over-temp',
          'LED status indicators provide visual feedback during charge cycles'
        ],
        includedParts: [
          'Flame-Retardant ABS Plastic Enclosure',
          'High-Frequency Power Transformer',
          'Heavy-Duty AC Input Power Cable',
          'DC Output Charging Cable Harness',
          'Brushless DC Cooling Fan Module',
          'Dual Red/Green LED Status Indicator',
          'AC Input EMI/RFI Filter Board',
          'Schottky High-Fast Output Rectifier Diodes',
          'CC-CV Charge Control Circuit Board',
          'Anti-Vibration Synthetic Rubber Feet',
          'Over-Temperature Cutoff Thermistor',
          'Output Short-Circuit Protection Relay'
        ],
        specs: [
          { part: 'ATI-EBC-6001', name: 'Flame-Retardant ABS Plastic Enclosure', category: 'Enclosure & Frame', material: 'PC + ABS Flame Retardant UL94-V0', dim: '165 × 75 × 45mm', temp: '-20 to +80°C', moq: '500' },
          { part: 'ATI-EBC-6002', name: 'High-Frequency Power Transformer', category: 'Power Electronics', material: 'Ferrite Core EE28 Triple Insulated Wire', dim: '48V 2A / 36V 3A Rating', temp: '-30 to +130°C', moq: '1,000' },
          { part: 'ATI-EBC-6003', name: 'Heavy-Duty AC Input Power Cable', category: 'Cables & Connectors', material: '3-Pin Standard Copper Core PVC', dim: '1.2m Cable Length', temp: '-20 to +75°C', moq: '1,000' },
          { part: 'ATI-EBC-6004', name: 'DC Output Charging Cable Harness', category: 'Cables & Connectors', material: '18AWG Pure Copper XLR/GX16/DC', dim: '1.0m Output Harness', temp: '-20 to +90°C', moq: '1,000' },
          { part: 'ATI-EBC-6005', name: 'Brushless DC Cooling Fan Module', category: 'Cooling & Hardware', material: 'PBT Thermoplastic 40x40x10mm 12V', dim: '40 × 40 × 10mm', temp: '-10 to +70°C', moq: '2,000' },
          { part: 'ATI-EBC-6006', name: 'Dual Red/Green LED Status Indicator', category: 'Electronics & Display', material: 'Dual Chip 3mm Thru-Hole LED', dim: 'Dual Color Indicator', temp: '-20 to +85°C', moq: '5,000' },
          { part: 'ATI-EBC-6007', name: 'AC Input EMI/RFI Filter Board', category: 'Power Electronics', material: 'X2 Safety Capacitor + Common Mode Choke', dim: '250VAC 2.5A Filter', temp: '-40 to +100°C', moq: '2,000' },
          { part: 'ATI-EBC-6008', name: 'Schottky High-Fast Output Rectifier Diodes', category: 'Power Electronics', material: 'Dual Schottky 20A 200V TO-220', dim: 'TO-220 Package', temp: '-55 to +175°C', moq: '4,000' },
          { part: 'ATI-EBC-6009', name: 'CC-CV Charge Control Circuit Board', category: 'Electronics & Protection', material: 'TL431 + LM358 Integrated Controller', dim: 'Integrated CC-CV Stage', temp: '-40 to +105°C', moq: '1,000' },
          { part: 'ATI-EBC-6010', name: 'Anti-Vibration Synthetic Rubber Feet', category: 'Seals & Hardware', material: 'NBR Synthetic Rubber Dampers', dim: 'Ø 10mm × 3mm', temp: '-30 to +100°C', moq: '10,000' },
          { part: 'ATI-EBC-6011', name: 'Over-Temperature Cutoff Thermistor', category: 'Electronics & Protection', material: 'NTC 10K Precision Sensor', dim: 'Thermal Sensor Probe', temp: '-40 to +125°C', moq: '2,000' },
          { part: 'ATI-EBC-6012', name: 'Output Short-Circuit Protection Relay', category: 'Electronics & Protection', material: 'Subminiature 12V DC Relay', dim: 'Fast Actuating Relay', temp: '-40 to +85°C', moq: '2,000' },
        ],
        applications: ['Lithium Battery Packs', 'E-Bike Charging Stations', 'Commercial Fleets', 'Personal Mobility'],
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
    <div className="w-full my-4 text-center">
      <img
        src={src}
        alt={caption}
        onError={() => setFailed(true)}
        className="max-w-full h-auto max-h-[440px] object-contain mx-auto"
      />
      {caption && (
        <p className="text-xs text-center text-[#505f76] mt-2.5 font-semibold italic">
          {caption}
        </p>
      )}
    </div>
  )
}

// ── Technical Data Sheet Modal ─────────────────────────────────────
function DataSheetModal({ productId, onClose }) {
  const sheet = DATA_SHEETS[productId]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

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

// ── Full Parts Directory Component (PDF Specification Categories) ───
function FullPartsDirectory({ partsData, title, totalCount, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = Object.keys(partsData)
  const totalCategoriesCount = categories.length

  // Filter categories and items
  const categoryEntries = Object.entries(partsData).filter(([catName, items]) => {
    if (selectedCategory !== 'All' && catName !== selectedCategory) {
      return false
    }
    if (!searchQuery.trim()) return true
    
    // Check if category name matches or any item inside matches
    const catMatches = catName.toLowerCase().includes(searchQuery.toLowerCase())
    const hasMatchingItem = items.some((item) =>
      item.toLowerCase().includes(searchQuery.toLowerCase())
    )
    return catMatches || hasMatchingItem
  })

  return (
    <div className="mt-14 bg-white border border-[#c5c6cd] rounded-2xl p-6 sm:p-8 shadow-sm animate-fadeIn">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 mb-1.5 flex-wrap">
            <h3 className="text-2xl font-bold text-[#005691]">
              {title} Parts Categories
            </h3>
            <span className="px-3 py-1 bg-[#005691]/10 text-[#005691] font-bold text-xs rounded-full border border-[#005691]/20">
              {totalCount} Items
            </span>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 font-bold text-xs rounded-full border border-emerald-200">
              {totalCategoriesCount} Categories
            </span>
          </div>
          <p className="text-[#505f76] text-sm">
            All {title.toLowerCase()} items and categories extracted directly from the official specification.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
            search
          </span>
          <input
            type="text"
            placeholder={`Search ${title} items...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2.5 bg-[#f7f9fb] border border-gray-300 rounded-lg text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#005691] focus:ring-1 focus:ring-[#005691]"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 mb-8 max-h-40 overflow-y-auto pr-2">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`
            px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer
            ${selectedCategory === 'All'
              ? 'bg-[#005691] text-white shadow-md'
              : 'bg-[#f7f9fb] text-[#505f76] hover:bg-blue-50 hover:text-[#005691] border border-gray-200'
            }
          `}
        >
          <span>All Categories</span>
          <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedCategory === 'All' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
            {totalCount}
          </span>
        </button>

        {categories.map((cat) => {
          const count = partsData[cat] ? partsData[cat].length : 0
          const isActive = selectedCategory === cat
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 cursor-pointer
                ${isActive 
                  ? 'bg-[#005691] text-white shadow-md' 
                  : 'bg-[#f7f9fb] text-[#505f76] hover:bg-blue-50 hover:text-[#005691] border border-gray-200'
                }
              `}
            >
              <span>{cat}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-700'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* PDF Category Boxes */}
      {categoryEntries.length > 0 ? (
        <div className="space-y-4">
          {categoryEntries.map(([catName, items], catIdx) => {
            const filteredCatItems = searchQuery.trim()
              ? items.filter((item) =>
                  item.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  catName.toLowerCase().includes(searchQuery.toLowerCase())
                )
              : items

            if (filteredCatItems.length === 0) return null

            return (
              <div
                key={catName}
                className="bg-[#f8fafc] border border-[#dce3ec] rounded-xl p-4 sm:p-5 shadow-2xs"
              >
                {/* Category Box Header */}
                <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-gray-200/80">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-[#005691]/10 text-[#005691] flex items-center justify-center font-bold text-xs">
                      {catIdx + 1}
                    </span>
                    <h4 className="text-base font-bold text-[#005691]">{catName}</h4>
                  </div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 bg-white border border-gray-200 text-[#505f76] rounded">
                    {filteredCatItems.length} {filteredCatItems.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>

                {/* PDF Category Items Grid Boxes */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
                  {filteredCatItems.map((item, itemIdx) => (
                    <div
                      key={itemIdx}
                      className="px-2.5 py-1.5 bg-white border border-gray-200 rounded-md transition-all duration-200 flex items-center"
                    >
                      <span className="text-xs font-semibold text-gray-800 leading-tight">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-[#f7f9fb] rounded-xl border border-dashed border-gray-300">
          <span className="material-symbols-outlined text-gray-400 text-4xl mb-2">search_off</span>
          <p className="text-gray-600 font-medium text-sm">No items found matching "{searchQuery}"</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('All') }}
            className="mt-3 text-xs font-semibold text-[#005691] hover:underline cursor-pointer"
          >
            Reset Search & Filters
          </button>
        </div>
      )}
    </div>
  )
}

// ── Sub-Product Navigation Bar ──────────────────────────────────
function SubProductNav({ subProducts, activeSub, onSelect, onBack }) {
  return (
    <div className="sticky top-20 z-30 bg-gradient-to-r from-[#005691] to-[#0077be] shadow-sm transition-all duration-300 rounded-xl mb-6">
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
            <div className="h-72 overflow-hidden rounded-xl bg-white relative border border-[#c5c6cd] p-4 flex items-center justify-center">
              <img
                src={sub.image}
                alt={sub.name}
                className="w-full h-full object-contain"
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
              <div className="h-52 overflow-hidden bg-white relative p-4 border-b border-[#e2effa] flex items-center justify-center">
                <img
                  src={subItem.image}
                  alt={subItem.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { e.target.style.background = '#eceef0' }}
                />
              </div>
              <div className="p-6 bg-[#f0f7ff]">
                <h3 className="text-lg font-bold text-[#005691] mb-2">{subItem.name}</h3>
                <p className="text-sm text-[#505f76] leading-relaxed mb-4">{subItem.tagline}</p>
              </div>
            </div>

            <div className="p-6 pt-0 bg-[#f0f7ff]">
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
                    className="flex-1 bg-white text-[#005691] border border-[#cbe3f7] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/10 transition-all hover:scale-105 duration-200"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectSubProduct(subItem.id)
                    }}
                  >
                    View Details
                  </button>
                  {subItem.hasDataSheet && (
                    <button
                      className="border border-[#005691] bg-white text-[#005691] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#005691]/10 transition-all hover:scale-105 duration-200"
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

      {/* Complete Parts Directory (97 Motorcycle PDF Items / 82 E-Bike PDF Items) */}
      {product.id === 'motorcycle' && (
        <FullPartsDirectory
          partsData={MOTORCYCLE_PARTS}
          title="Motorcycle"
          totalCount={97}
          onNavigate={onNavigate}
        />
      )}

      {product.id === 'e-bike' && (
        <FullPartsDirectory
          partsData={EBIKE_PARTS}
          title="E-Bike"
          totalCount={82}
          onNavigate={onNavigate}
        />
      )}

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
    document.title = 'Products | AT International'
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
    window.scrollTo({ top: 180, behavior: 'smooth' })
  }

  const handleBackToMain = () => {
    setActiveSubProduct(null)
    window.scrollTo({ top: 180, behavior: 'smooth' })
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
      <section className="relative -mt-20 pt-44 sm:pt-48 pb-16 px-4 sm:px-8 overflow-hidden">
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
            Looking for the right parts without the sourcing hassle? From Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions, AT International brings quality-verified products together under one trusted roof — helping buyers source with confidence and keep their businesses moving forward.
          </p>
        </div>
      </section>

      {/* Sticky Products Sub-Navigation Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
          <div className="flex gap-4 sm:gap-6 overflow-x-auto h-16 items-center">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => { 
                  setActive(p.id)
                  setActiveSubProduct(null)
                  setSheetOpen(false)
                }}
                className={`
                  px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-semibold text-xs sm:text-sm tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2
                  ${active === p.id 
                    ? 'bg-[#005691] text-white shadow-lg transform scale-105' 
                    : 'text-[#505f76] hover:text-[#005691] hover:bg-[#005691]/10'
                  }
                  transform transition-all duration-300 ease-in-out hover:scale-105
                `}
              >
                <span className="material-symbols-outlined text-base sm:text-lg">{p.icon || 'inventory_2'}</span>
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
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