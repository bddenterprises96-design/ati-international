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
        includedParts: getIncludedPartsList(['Engine Parts', 'Fuel System', 'Air Intake System', 'Exhaust System', 'Cooling System']),
        specs: generateSpecsFromCategories(['Engine Parts', 'Fuel System', 'Air Intake System', 'Exhaust System', 'Cooling System']),
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
        includedParts: getIncludedPartsList(['Transmission & Clutch', 'Chain Drive', 'Brake System', 'Suspension & Steering', 'Wheels & Tires']),
        specs: generateSpecsFromCategories(['Transmission & Clutch', 'Chain Drive', 'Brake System', 'Suspension & Steering', 'Wheels & Tires']),
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
        includedParts: getIncludedPartsList(['Rubber & Sealing Components', 'Electrical Parts', 'Lighting', 'Controls', 'Body Parts', 'Motorcycle Accessories']),
        specs: generateSpecsFromCategories(['Rubber & Sealing Components', 'Electrical Parts', 'Lighting', 'Controls', 'Body Parts', 'Motorcycle Accessories']),
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
    description: 'AT International supplies versatile e-bike parts and components for mid-drive and hub-drive systems, helping buyers source the right components with confidence through a reliable global supply network.',
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
        includedParts: getEBikeIncludedPartsList(['Electric Drive System', 'Rubber & Sealing Components', 'Fasteners & Hardware', 'Drivetrain']),
        specs: generateEBikeSpecsFromCategories(['Electric Drive System', 'Rubber & Sealing Components', 'Fasteners & Hardware', 'Drivetrain']),
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
        includedParts: getEBikeIncludedPartsList(['Battery System', 'Electrical Components', 'Lighting & Safety']),
        specs: generateEBikeSpecsFromCategories(['Battery System', 'Electrical Components', 'Lighting & Safety']),
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
        includedParts: getEBikeIncludedPartsList(['Brake System', 'Suspension & Steering', 'Wheels & Tires', 'Frame & Body Parts', 'E-Bike Accessories']),
        specs: generateEBikeSpecsFromCategories(['Brake System', 'Suspension & Steering', 'Wheels & Tires', 'Frame & Body Parts', 'E-Bike Accessories']),
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
    <div className="sticky top-36 z-30 bg-gradient-to-r from-[#005691]/100 to-[#0077be]/100 shadow-sm transition-all duration-300 rounded-xl mb-6">
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
            Looking for the right parts without the sourcing hassle? From Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions, AT International brings quality-verified products together under one trusted roof — helping buyers source with confidence and keep their businesses moving forward.
          </p>
        </div>
      </section>

      {/* Sticky Products Sub-Navigation Bar */}
      <div className="bg-white shadow-md sticky top-20 z-40 border-b border-[#c5c6cd]">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="flex gap-6 overflow-x-auto h-16 items-center">
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