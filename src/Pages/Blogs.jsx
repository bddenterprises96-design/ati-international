import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

// Inject Cloudinary transformations for fast delivery (auto format, auto quality, width-capped)
const optimizeCloudinaryUrl = (url) => {
  if (!url || !url.includes('res.cloudinary.com')) return url
  return url.replace('/upload/', '/upload/w_600,q_auto,f_auto/')
}

// Card image with skeleton shimmer + fade-in on load
function BlogImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const optimized = optimizeCloudinaryUrl(src)

  return (
    <div className="relative w-full h-full bg-white overflow-hidden p-2 flex items-center justify-center">
      {!loaded && !error && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#e8edf2] via-[#f2f4f6] to-[#e8edf2] animate-pulse" />
      )}
      {!error ? (
        <img
          src={optimized}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`w-full h-full object-contain group-hover:scale-105 transition-all duration-500 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-[#005691]/10 text-[#005691]">
          <span className="material-symbols-outlined text-5xl">article</span>
        </div>
      )}
    </div>
  )
}

const POSTS = [
  // ── CATEGORY 1: INDUSTRIAL SEALING SOLUTIONS (4 ARTICLES) ──────────────────
  {
    id: 1,
    featured: true,
    category: 'Industrial Sealing Solutions',
    title: 'Understanding Valve Stem Seal Materials: FKM vs VMQ vs NBR',
    excerpt: 'A practical comparison of three widely used elastomers, covering temperature capability, oil and chemical resistance, wear performance, and material-selection considerations for engine sealing applications.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'science',
    image: '/assets/blog_diagrams/blog_1_valve_stem_seal_materials.png',
    summary: 'Valve stem seals operate in demanding engine environments where temperature, lubricant exposure, reciprocating motion, friction, and long-term aging can all affect sealing performance. The elastomer selected for the sealing lip plays an important role in controlling lubricant flow between the valve stem and valve guide.',
    sections: [
      {
        heading: '1. Introduction to Valve Stem Seal Elastomers',
        text: 'In internal combustion engines, valve stem seals help regulate the amount of lubricant reaching the interface between the valve stem and valve guide. Maintaining controlled lubrication is important because excessive oil flow can contribute to oil consumption and deposits, while insufficient lubrication can increase friction and wear. The elastomer forming the sealing lip is exposed to repeated movement, engine heat, lubricants, and combustion-related environmental conditions.',
      },
      {
        heading: '2. Material Comparison: FKM vs VMQ vs NBR',
        table: {
          headers: ['Property', 'FKM (Fluoroelastomer)', 'VMQ (Silicone Rubber)', 'NBR (Nitrile Rubber)'],
          rows: [
            ['Typical Temperature Capability', 'Approx -20°C to +200°C', 'Approx -60°C to +200°C+', 'Approx -30°C to +100°C'],
            ['Oil Resistance', 'Very good to excellent', 'Moderate; application-dependent', 'Good with petroleum oils & fuels'],
            ['High-Temperature Performance', 'Excellent for demanding applications', 'Excellent flexibility, check fluids', 'Limited at elevated temps'],
            ['Low-Temperature Flexibility', 'Moderate; depends on compound', 'Excellent', 'Good to moderate'],
            ['Wear & Abrasion Resistance', 'Generally good to very good', 'Generally lower in dynamic uses', 'Generally good'],
            ['Typical Selection Role', 'High-temp, oil-exposed seals', 'Wide-temperature flexibility', 'Cost-sensitive, standard-temp'],
            ['Key Consideration', 'Higher material cost justified by conditions', 'Temp capability ≠ oil dynamic suitability', 'High-temp limits must be considered'],
          ],
        },
      },
      {
        heading: '3. FKM: A Strong Choice for High-Temperature, Oil-Exposed Applications',
        text: 'FKM fluoroelastomers are widely selected for sealing applications that combine elevated temperatures with exposure to oils, fuels, and other demanding fluids. For engine applications, FKM can provide a strong balance of temperature resistance, fluid compatibility, and long-term sealing performance. These characteristics make suitable FKM compounds particularly attractive for high-performance automotive and motorcycle applications.',
      },
      {
        heading: '4. VMQ: Excellent Temperature Flexibility, but Application-Specific',
        text: 'VMQ silicone rubber is well known for its broad temperature range and excellent flexibility at low temperatures. However, VMQ generally has lower mechanical strength and wear resistance than several other elastomers, and its resistance to oils and chemicals is more limited or formulation-dependent. For this reason, a high temperature rating alone should not be used as the basis for selecting VMQ for a valve stem seal.',
      },
      {
        heading: '5. NBR: A Practical Option for Standard-Duty Applications',
        text: 'NBR is a widely used sealing elastomer valued for its good resistance to many petroleum-based oils and its favorable balance of performance and cost. For standard-temperature sealing applications, an appropriate NBR compound can provide reliable oil sealing and good wear performance. However, NBR has a more limited high-temperature capability than FKM, making compound selection particularly important when operating temperatures are elevated.',
      },
      {
        heading: '6. How to Select the Right Valve Stem Seal Material',
        list: [
          'Operating Temperature: Determine both normal continuous temperature and short-term peaks.',
          'Lubricant & Fluid Compatibility: Identify exact engine oil, lubricant, fuel, additives, or fluids contacting the seal.',
          'Dynamic Movement & Wear: Ensure the material provides suitable wear resistance across expected service life.',
          'Seal Design & Hardware: Evaluate lip geometry, spring design, retaining components, and surface finish together.',
          'Service Life & Cost: Match compound cost to actual operating demands and expected replacement intervals.',
        ],
      },
      {
        heading: '7. Practical Material Selection Guide',
        text: 'Confirm final material selection using the seal manufacturer’s compound data, lubricant compatibility information, operating temperature, and actual service requirements rather than generic material designations alone.',
      },
      {
        heading: '8. Why Material Selection Matters for Procurement',
        text: 'For procurement teams, choosing a valve stem seal based only on material name or nominal temperature range can create unnecessary performance and replacement risks. A reliable sourcing process considers the complete application specification—including engine type, operating temperature, lubricant, seal dimensions, material compound, expected service life, and required documentation.',
      },
    ],
  },
  {
    id: 2,
    featured: false,
    category: 'Industrial Sealing Solutions',
    title: 'O-Ring Failure Analysis: Common Causes and How to Prevent Them',
    excerpt: 'A practical engineering guide to identifying common O-ring failure modes, understanding their root causes, and selecting the right material, design, and installation approach to prevent repeat failures.',
    date: 'May 15, 2026',
    readTime: '10 min read',
    author: 'AT International Insights',
    icon: 'build',
    image: '/assets/blog_diagrams/blog_2_oring_failure_analysis.png',
    summary: 'O-rings are simple in design but critical to the reliability of many fluid and gas sealing systems. A failed O-ring can result in leakage, pressure loss, contamination, reduced equipment performance, or unplanned downtime. Premature failure can result from the interaction of material selection, gland design, pressure, temperature, fluid compatibility, and installation conditions.',
    sections: [
      {
        heading: '1. Compression Set',
        text: 'What it looks like: The O-ring develops a flattened or permanently deformed cross-section and does not adequately recover its original shape after compression is removed.\n\nCommon causes: Prolonged compression, elevated temperature, excessive squeeze, unsuitable elastomer selection, fluid-related degradation, or inadequate curing.\n\nPrevention: Confirm correct cross-section, gland dimensions, and squeeze. Select a compound with verified compression-set resistance for the actual temperature and fluid environment.',
      },
      {
        heading: '2. Extrusion and Nibbling',
        text: 'What it looks like: Ragged, chipped, or "nibbled" edges, typically toward the low-pressure side of the seal—in severe cases, elastomer forced into the clearance gap.\n\nCommon causes: Excessive extrusion gaps, high system pressure, insufficient material hardness, eccentricity, or material softening.\n\nPrevention: Control extrusion gaps and verify gland dimensions. Select appropriate Shore A hardness or use back-up rings where pressure requires additional support.',
      },
      {
        heading: '3. Spiral Failure',
        text: 'What it looks like: Diagonal cuts, nicks, or spiral-shaped marks around the circumference, often at an angle to the direction of movement.\n\nCommon causes: Associated with dynamic applications where the O-ring twists or rotates within the gland—contributed to by inadequate lubrication, excessive friction, or incorrect installation leaving the seal twisted.\n\nPrevention: Review dynamic seal design, lubrication conditions, and gland geometry. Ensure installation without twist.',
      },
      {
        heading: '4. Explosive Decompression (ED)',
        text: 'What it looks like: Internal blisters, pits, splits, fissures, or craters—severe damage can extend from interior to external surface.\n\nCommon causes: Occurs primarily in high-pressure gas service where gas permeates the elastomer under pressure and expands rapidly during decompression.\n\nPrevention: Specify ED-resistant compounds qualified to standards such as NORSOK M-710 or ISO 23936-2 where applicable.',
      },
      {
        heading: '5. Abrasion and Dynamic Wear',
        text: 'What it looks like: A flattened or worn running surface, scuffing, or wear tracks corresponding to movement direction.\n\nCommon causes: Poor surface finish, inadequate lubrication, excessive contact stress, contamination, or excessive speed.\n\nPrevention: Evaluate mating-surface finish, lubrication regime, and speed. Control contamination with proper filtration.',
      },
      {
        heading: '6. Installation Damage',
        text: 'What it looks like: Localized cuts, nicks, gashes, or peeled sections—often concentrated in one area.\n\nCommon causes: Sharp edges, threads, burrs, inadequate lead-in chamfers, incorrect tools, or excessive stretching.\n\nPrevention: Inspect mating components for sharp edges. Use appropriate lead-in chamfers, installation tools, and compatible lubricant.',
      },
      {
        heading: '7. Chemical and Thermal Degradation',
        text: 'What it looks like: Swelling, softening, hardening, cracking, blistering, or dimensional distortion.\n\nCommon causes: Chemical exposure incompatible with compound, or operating above compound temperature limits.\n\nPrevention: Identify actual fluid, concentration, and peak temperature at the seal interface before selecting material.',
      },
      {
        heading: '8. Root-Cause Framework and Why It Matters for Procurement',
        text: 'Replacing a failed O-ring with an identical part does not solve the underlying problem if the original failure resulted from incorrect material, gland design, installation, or operating conditions. A systematic investigation should document failure, identify pattern, review service conditions, verify gland dimensions, and examine installation.',
      },
    ],
  },
  {
    id: 3,
    featured: false,
    category: 'Industrial Sealing Solutions',
    title: 'Rotary Oil Seal Selection for Heavy-Duty Gearboxes & Pumps',
    excerpt: 'A practical guide to lip design, materials, and selection considerations for radial shaft (rotary) oil seals used in gearboxes, pumps, and rotating machinery.',
    date: 'May 08, 2026',
    readTime: '10 min read',
    author: 'AT International Insights',
    icon: 'cached',
    image: '/assets/blog_diagrams/blog_3_rotary_oil_seal_selection.png',
    summary: 'Rotary shaft (radial lip) oil seals retain lubricating oil or grease within rotating equipment while excluding dust, dirt, and moisture from the shaft interface. Selecting the correct seal configuration for a given shaft speed, lubricant, temperature, pressure, and contamination environment is essential for preventing premature failure.',
    sections: [
      {
        heading: '1. How a Rotary Oil Seal Works',
        text: 'A rotary shaft seal typically consists of a rigid outer casing (metal shell or rubber-covered case), an elastomeric sealing lip, and a garter spring that maintains radial load between lip and rotating shaft. A thin lubricant film is present at the lip-to-shaft interface to manage friction and heat generation.',
      },
      {
        heading: '2. Hydrodynamic Wave Lip Seals',
        text: 'Hydrodynamic sealing lips feature a wave-like profile that generates pumping action as the shaft rotates, returning lubricant toward the sealed side. Wave geometry must be evaluated together with shaft speed, lubricant viscosity, and rotational direction (unidirectional vs bidirectional).',
      },
      {
        heading: '3. Single-Lip vs. Double-Lip Configurations',
        text: 'Single-lip seals use one primary sealing lip for lubricant retention in clean environments. Double-lip seals add a secondary exclusion (dust) lip to prevent dirt, dust, water, and grit from reaching the primary sealing lip in contaminated operating environments.',
      },
      {
        heading: '4. Garter Spring Function and Selection',
        text: 'The garter spring maintains the radial lip load required to keep the sealing lip in contact with the shaft as the elastomer wears or relaxes over time. Spring material (carbon steel vs AISI 304 stainless steel) must match the chemical and temperature environment.',
      },
      {
        heading: '5. Material Selection for Rotary Oil Seals',
        table: {
          headers: ['Material', 'Typical Characteristics', 'Common Applications'],
          rows: [
            ['NBR (Nitrile)', 'Good general-purpose oil resistance & cost-effectiveness', 'Standard-duty gearboxes, pumps, general machinery'],
            ['FKM (Fluoroelastomer)', 'Broad temp capability & strong resistance to oils/fuels/synthetics', 'Higher-temperature or demanding lubricant applications'],
            ['HNBR (Hydrogenated Nitrile)', 'Improved heat, ozone, and wear resistance vs standard NBR', 'Heavy-duty & higher-temperature applications'],
            ['ACM (Polyacrylate)', 'Good resistance to hot oils & selected automotive fluids', 'Automotive, transmission, & elevated-temp uses'],
            ['VMQ (Silicone)', 'Wide temperature flexibility & good low-temp capability', 'Specialized applications with confirmed fluid compatibility'],
          ],
        },
      },
      {
        heading: '6. Operating Parameters That Affect Seal Selection',
        list: [
          'Shaft Surface Speed: Higher speeds increase friction and thermal loading at the lip.',
          'Operating Pressure: Standard seals suit low pressure; positive pressure requires pressure-rated designs.',
          'Temperature Range: Continuous and peak temperature excursions affect elastomer properties and fluid film.',
          'Shaft Finish & Runout: Hardness (55–65 HRC), Ra 0.2–0.8 μm finish, and low runout are essential.',
          'Lubricant Characteristics: Viscosity, additive packages, and synthetic formulations must be verified.',
        ],
      },
      {
        heading: '7. Selection Framework for Procurement Managers',
        text: 'Structure selection around actual application conditions: NBR single-lip for standard mineral oil baseline, FKM/HNBR for synthetic lubricants/high heat, double-lip for dusty/wet sites, and hydrodynamic wave-lip for high-speed continuous machinery.',
      },
      {
        heading: '8. Why Seal Specification Matters for Procurement',
        text: 'Sourcing a rotary oil seal based only on shaft diameter and housing bore size can overlook critical variables such as lubricant compatibility, contamination, speed, pressure, and temperature. A reliable sourcing process reviews the complete application profile.',
      },
    ],
  },
  {
    id: 4,
    featured: false,
    category: 'Industrial Sealing Solutions',
    title: 'Custom Component Sourcing: From Drawing to First Article',
    excerpt: 'A practical guide to how custom sealing and rubber components move from a technical drawing through tooling, sample production, and first article approval.',
    date: 'April 28, 2026',
    readTime: '9 min read',
    author: 'AT International Insights',
    icon: 'design_services',
    image: '/assets/blog_diagrams/blog_4_custom_component_sourcing.png',
    summary: 'Standard catalog parts do not always meet specialized engineering demands. When a project requires custom cross-sections, non-standard dimensions, or a specific material formulation, moving from a technical drawing to an approved, production-ready part involves several distinct stages—technical review, tooling and compound selection, sample production, and first article verification.',
    sections: [
      {
        heading: 'Step 1: Technical Review & Application Analysis',
        text: 'Before tooling begins, drawings (2D/3D CAD) and application requirements are reviewed against intended operating conditions. Critical dimensions, cross-sections, tolerances, sealing pressure, temperature range, and fluid exposure are verified. Where CAD data is available, a Design for Manufacturability (DFM) review identifies potential mold filling or part ejection challenges.',
      },
      {
        heading: 'Step 2: Tooling Coordination & Compound Selection',
        text: 'Tooling is engineered to produce the required mold cavities while the elastomeric compound is formulated to meet target hardness (Shore A ASTM D2240 / ISO 48-4), tensile strength, and fluid resistance. Specific compound designations should be agreed rather than relying on generic hardness numbers alone.',
      },
      {
        heading: 'Step 3: Sample Verification & First Article Review',
        list: [
          'Dimensional Inspection: Critical dimensions verified using calibrated CMM or optical measuring equipment.',
          'Hardness Verification: Shore A durometer testing confirms compound compliance.',
          'Mechanical Testing: Tensile strength and elongation (ASTM D412) and compression set (ASTM D395).',
          'Fluid Compatibility Testing: Fluid immersion and volume-change testing (ASTM D471).',
        ],
      },
      {
        heading: 'What to Request Before Approving a Custom Component',
        text: 'Procurement teams should confirm the controlled drawing revision, specific compound specification, FAIR (First Article Inspection Report) or PPAP documentation package, tooling cavity numbers, and change-control procedures for future drawing or material modifications.',
      },
      {
        heading: 'Why This Process Matters for Procurement',
        text: 'Skipping structured technical review or first article verification can lead to costly rework if a custom component fails after production tooling is cut. A well-documented process ensures clear communication between buyer, sourcing team, and factory before volume production.',
      },
    ],
  },

  // ── CATEGORY 2: MOTORCYCLE PARTS (5 ARTICLES) ──────────────────────────────
  {
    id: 5,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Engine Sealing: Key Failure Points & Sourcing Standards',
    excerpt: 'High RPM, thermal cycling, vibration, and oil-pressure conditions place demanding requirements on motorcycle engine sealing components. Here is how to identify common sealing failure points and what to confirm when sourcing replacement components.',
    date: 'April 20, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'two_wheeler',
    image: '/assets/blog_diagrams/blog_5_motorcycle_engine_sealing.png',
    summary: 'Motorcycle engines operate under demanding combinations of speed, temperature, vibration, and lubrication conditions. Reliable sealing around cylinder heads, valve stems, crankshafts, transmission shafts, and engine covers is essential for controlling oil leakage and maintaining engine performance.',
    sections: [
      {
        heading: '1. The Sealing Demands of Motorcycle Powertrains',
        text: 'Motorcycle sealing components must maintain reliable contact despite repeated thermal cycles, vibration, shaft rotation, and oil pressure fluctuations. In integrated engine-clutch-transmission architectures, oil escaping from one point can migrate across adjacent cases, making leak diagnosis vital.',
      },
      {
        heading: '2. Common Motorcycle Engine Sealing Failure Points',
        list: [
          'Valve Stem Seal Wear/Hardening: Heat exposure causes lip shrinkage, leading to blue exhaust smoke and high oil consumption.',
          'Crankshaft & Rotating-Shaft Seal Wear: Leakage from lip wear, shaft scoring, blow-by pressure, or installation misalignment.',
          'Cylinder Head Gasket Leakage: Combustion gas loss, oil weeping, or coolant contamination due to thermal distortion or clamping loss.',
          'Clutch & Stator Cover Gasket/O-Ring Failure: Aging, compression set, or improper refitting compromise case joint seals.',
        ],
      },
      {
        heading: '3. How Motorcycle Engine Oil Leaks Are Typically Diagnosed',
        list: [
          '1. Identify the Fluid: Confirm engine oil vs hydraulic fluid or coolant.',
          '2. Clean Surrounding Area: Remove oil residue to reveal fresh leakage paths.',
          '3. Bring Engine to Operating Temp: Observe leaks under normal pressure and temperature.',
          '4. Inspect Highest Fresh-Wet Point: Trace oil path back to its highest origin point.',
          '5. Check Nearby Sealing Interfaces: Inspect shaft seals, gaskets, O-rings, and drain plugs.',
        ],
      },
      {
        heading: '4. ATI Sourcing & Quality Review for Motorcycle Parts',
        text: 'ATI sources motorcycle sealing components, gasket sets, and engine parts through verified supplier partners according to customer requirements. Before supply, specifications including dimensions, material grades (NBR/FKM), temperature ratings, and OEM part cross-references are confirmed.',
      },
      {
        heading: 'What to Confirm Before Ordering Replacement Seals',
        text: 'Confirm exact motorcycle model, production year, engine generation, leak location, material specification, OEM part number, and shaft/housing condition before placing orders.',
      },
    ],
  },
  {
    id: 6,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Sourcing High-Performance Motorcycle Clutch & Transmission Components',
    excerpt: 'A comprehensive buyer guide to evaluating friction plates, steel drive plates, clutch springs, and transmission shaft seals for motorcycle clutch and drivetrain applications.',
    date: 'April 12, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'settings_bipolar',
    image: '/assets/blog_diagrams/blog_6_motorcycle_clutch_components.png',
    summary: 'A motorcycle clutch must transmit engine torque reliably while managing friction, heat, repeated engagement cycles, and, in many applications, continuous oil immersion. The friction plates, steel drive plates, clutch springs, and related sealing components need to work as a matched system.',
    sections: [
      {
        heading: '1. Friction Plate Materials: Cork, Paper-Composite & Performance Options',
        text: 'Cork-based friction plates offer an established solution for standard replacement. Paper-composite friction materials provide controlled friction and smooth engagement in wet clutch systems. Reinforced performance friction linings deliver high thermal stability under competition or heavy load.',
      },
      {
        heading: '2. Steel Drive Plates & Clutch Springs',
        text: 'Steel drive plates must maintain flatness and surface condition without warping or glazing. Clutch springs provide the clamping force required to prevent slippage; fatigued springs cause clutch slip even when friction plate thickness remains within service limits.',
      },
      {
        heading: '3. Essential Drivetrain Sealing Components',
        list: [
          'Countershaft / Output-Shaft Oil Seals: Prevent gear oil leakage around the drive sprocket shaft.',
          'Gear-Shift Shaft Seals: Retain lubricant where the shift selector shaft exits the crankcase.',
          'Clutch Pushrod Seals: Seal around the clutch actuator pushrod passing through the engine casing.',
        ],
      },
      {
        heading: '4. Key Selection Considerations for Buyers',
        text: 'Consider friction requirements under JASO T 903 classifications (MA/MA2 for wet clutch friction vs MB for low-friction scooter automatics). Verify clutch stack height, spring tension, and oil compatibility.',
      },
      {
        heading: '5. ATI Motorcycle Clutch & Transmission Sourcing',
        text: 'ATI evaluates clutch plates, springs, and seals against motorcycle make, model, displacement, engine year, and OEM cross-reference part numbers to supply reliable components for global buyers.',
      },
    ],
  },
  {
    id: 7,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Crankshaft: Buyer’s Guide to Material, Balancing & Failure Signs',
    excerpt: 'A practical guide to forged and cast crankshaft construction, common wear and failure indicators, balancing requirements, and what to verify when sourcing a replacement or performance crankshaft.',
    date: 'April 04, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'engineering',
    image: '/assets/blog_diagrams/blog_7_motorcycle_crankshaft_guide.png',
    summary: 'The crankshaft is one of the most highly loaded components in a motorcycle engine. It converts the reciprocating motion of the piston and connecting rod into rotational output while continuously experiencing cyclic bending, torsional loading, and bearing forces.',
    sections: [
      {
        heading: '1. Forged vs. Cast Crankshaft Construction',
        text: 'Forged steel crankshafts are produced by mechanically forming heated steel, creating superior fatigue strength for high-output engines. Spheroidal-graphite (nodular) cast iron crankshafts offer effective strength, vibration damping, and machinability for standard utility applications.',
      },
      {
        heading: '2. Common Motorcycle Crankshaft Failure Modes',
        list: [
          'Journal Wear & Surface Damage: Caused by oil starvation, contamination, or incorrect bearing clearances.',
          'Fatigue Cracking or Fracture: Originating from stress concentrations at fillets, oil holes, or crankpins.',
          'Torsional Vibration Issues: Resulting from improper balance factors or modified reciprocating masses.',
          'Warning Symptoms: Knocking noises, excessive engine vibration, metallic oil debris, or journal runout.',
        ],
      },
      {
        heading: '3. Why Crankshaft Balancing Matters',
        text: 'Counterweights compensate for rotating masses and a specified percentage of reciprocating mass. Balance factors depend on engine layout (single-cylinder, parallel twin, V-twin). Replacement crankshafts must match exact engine balance specifications.',
      },
      {
        heading: '4. Selection Framework & Ordering Checklist',
        text: 'Confirm motorcycle make, model, engine code, stroke, journal dimensions, bearing specs, material heat treatment, balance factor, and whether supplied as bare shaft or complete assembly.',
      },
    ],
  },
  {
    id: 8,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Cylinder Head: Buyer’s Guide to Casting Quality, Flatness & Valve Seats',
    excerpt: 'A practical guide to aluminum cylinder head casting quality, flatness, cracking mechanisms, valve seat wear, and what to verify when sourcing a replacement or performance cylinder head.',
    date: 'March 26, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'hardware',
    image: '/assets/blog_diagrams/blog_8_motorcycle_cylinder_head_guide.png',
    summary: 'The cylinder head closes the top of the combustion chamber and houses critical engine components, including the valves, spark plug, valve guides, and valve seats. Aluminum cylinder heads are exposed to significant thermal cycling and can be sensitive to distortion, cracking, and casting-related defects.',
    sections: [
      {
        heading: '1. Why Aluminum Cylinder Heads Can Distort',
        text: 'Aluminum alloys expand thermally faster than cast iron. Overheating, improper head-bolt torque sequence, or uneven clamping can cause mating surface distortion, resulting in head gasket failure, loss of compression, or fluid leakage.',
      },
      {
        heading: '2. Casting Quality and Common Defects',
        list: [
          'Gas & Shrinkage Porosity: Voids during solidification causing leakage paths.',
          'Cold Shuts: Discontinuities where molten metal streams fail to fuse completely.',
          'Inclusions: Trapped mold sand or foreign material disrupting coolant/oil passages.',
          'Casting Cracks: Thermal stress cracks near valve seats or exhaust ports (inspected via dye-penetrant or pressure testing).',
        ],
      },
      {
        heading: '3. Valve Seat Recession and Wear',
        text: 'Valve seats suffer mechanical impact and intense heat. Seat recession alters valve clearance and sealing integrity. Casting integrity around interference-fitted seats must be verified during rebuilds.',
      },
      {
        heading: '4. Buyer Checklist & Quality Verification',
        text: 'Verify casting alloy, heat treatment, gasket surface flatness tolerances, valve guide/seat dimensions, bolt patterns, and pressure test documentation before sourcing.',
      },
    ],
  },
  {
    id: 9,
    featured: false,
    category: 'Motorcycle Parts',
    title: 'Motorcycle Cylinder: Buyer’s Guide to Bore Quality, Honing & Wear Limits',
    excerpt: 'A practical guide to cylinder bore precision, honing quality, cylinder-wall construction, common wear patterns, and what to verify when sourcing a replacement or rebored cylinder.',
    date: 'March 18, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'view_in_ar',
    image: '/assets/blog_diagrams/blog_9_motorcycle_cylinder_guide.png',
    summary: 'The cylinder houses the piston and provides the working bore in which compression and combustion take place. Its internal dimensional accuracy, surface condition, and compatibility with the piston and piston rings can significantly influence ring sealing, lubrication, friction, and long-term engine durability.',
    sections: [
      {
        heading: '1. Why Bore Precision and Surface Finish Matter',
        text: 'Honing produces a controlled cross-hatch pattern on the cylinder wall that retains lubricating oil while enabling proper piston ring seating. Bore geometry parameters (taper and out-of-roundness ovality) must be checked at multiple bore depths.',
      },
      {
        heading: '2. Cylinder-Wall Construction Options',
        list: [
          'Cast-Iron Cylinders & Liners: Durable wear surface suitable for standard machining and reboring.',
          'Aluminum Cylinders with Cast-Iron Liners: Combines lightweight aluminum body with wear-resistant liner.',
          'Aluminum Cylinders with Plated Bores: Uses Nikasil or ceramic electro-plated coatings for maximum heat transfer and low weight.',
        ],
      },
      {
        heading: '3. Common Wear Patterns & Procurement Checklist',
        text: 'Identify bore taper, ovality, scoring/scuffing, and glazing. Confirm exact bore diameter grade, piston-to-cylinder clearance, honing angle/roughness, and mounting interface dimensions before ordering.',
      },
    ],
  },

  // ── CATEGORY 3: E-BIKE PARTS & COMPONENTS (5 ARTICLES) ────────────────────
  {
    id: 10,
    featured: false,
    category: 'E-Bike Parts & Components',
    title: 'Waterproofing E-Bike Motors: Sealing Mid-Drive & Hub Systems to IP Standards',
    excerpt: 'A practical guide to IP ingress-protection ratings, sealing methods for mid-drive and hub motors, and what to verify when sourcing water-resistant e-bike drive components.',
    date: 'March 10, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'electric_bike',
    image: '/assets/blog_diagrams/blog_10_ebike_motor_waterproofing.png',
    summary: 'E-bike drive systems combine electric motors, mechanical components, sensors, wiring, and electronic controls within compact housings exposed to rain, road spray, mud, and temperature shifts. Ingress Protection (IP) ratings provide a defined method for classifying protection against solid foreign objects and water.',
    sections: [
      {
        heading: '1. Understanding IP Ratings for E-Bike Motors',
        text: 'IP ratings are defined by IEC 60529. IP65 indicates dust-tight enclosure with jet-water protection; IP67 covers temporary immersion; IP68 covers continuous specified immersion. Note that IP67 does not automatically include IPX6 high-pressure water jet resistance.',
      },
      {
        heading: '2. Sealing Methods for Mid-Drive and Hub Motors',
        list: [
          'Radial Shaft Seals: Low-friction double-lip PTFE/FKM seals protecting rotating pedal and motor axles.',
          'Housing Gaskets: Low-closure force silicone or molded EPDM static seals jointing aluminum motor covers.',
          'Cable & Connector Sealing: Overmolded rubber grommets and sealed connectors protecting wire entry points.',
        ],
      },
      {
        heading: '3. Material Selection & Compliance Standards',
        text: 'EPDM, VMQ silicone, FKM, and PTFE compounds suit different thermal and chemical requirements. Under European EN 15194:2017+A1:2023 standards, electrical system moisture resistance is mandatory.',
      },
    ],
  },
  {
    id: 11,
    featured: false,
    category: 'E-Bike Parts & Components',
    title: 'E-Bike Lithium Battery Pack Housings: Thermal Management & Moisture Sealing',
    excerpt: 'A practical guide to battery pack sealing methods, pressure-equalization and safety venting, and thermal-management considerations for e-bike lithium-ion battery housings.',
    date: 'March 02, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'battery_charging_full',
    image: '/assets/blog_diagrams/blog_11_ebike_battery_housing.png',
    summary: 'The lithium-ion battery pack is a central component of an e-bike, and its housing must protect sensitive cells and electrical components from moisture and environmental exposure while supporting appropriate thermal management during charging and discharging.',
    sections: [
      {
        heading: '1. Challenges in Battery Enclosure Sealing',
        text: 'Battery housings expand and contract thermally during charge/discharge cycles. The sealing system must maintain moisture protection despite repeated dimensional changes without creating destructive internal pressure differentials.',
      },
      {
        heading: '2. Gasket Compound Selection',
        list: [
          'Closed-Cell EPDM Foam: Cost-effective environmental and moisture seal with low compression set.',
          'Silicone Gaskets & LSR Foam: Broad temperature range (-50°C to +200°C) with high flame retardancy.',
          'Formed-in-Place Gasketing (FIPG): Dispensed silicone sealant for complex joint paths.',
        ],
      },
      {
        heading: '3. Pressure-Equalization vs. Emergency Safety Venting',
        text: 'Microporous ePTFE membranes provide routine pressure balance against altitude and ambient temp changes. Emergency safety vents serve a distinct function: releasing gas during abnormal thermal runaway events.',
      },
      {
        heading: '4. Regulatory Standards & Sourcing Requirements',
        text: 'Confirm compliance with China GB 43854-2024 / GB 17761 electric bicycle safety standards or destination market equivalents before ordering battery pack housings.',
      },
    ],
  },
  {
    id: 12,
    featured: false,
    category: 'E-Bike Parts & Components',
    title: 'E-Bike BLDC Hub Motor Buyer’s Guide: Torque, Thermal Performance & Quality Verification',
    excerpt: 'How to evaluate hub-motor torque, electrical characteristics, thermal behavior, sensor compatibility, mechanical construction, and supplier quality before sourcing.',
    date: 'February 24, 2026',
    readTime: '7 min read',
    author: 'AT International Insights',
    icon: 'bolt',
    image: '/assets/blog_diagrams/blog_12_ebike_bldc_hub_motor.png',
    summary: 'The BLDC hub motor is a common drive component in e-bikes, converting electrical energy into rotational force that propels the wheel. A motor’s wattage rating alone does not determine how it performs in real-world conditions. Torque delivery, thermal behavior under sustained load, and mechanical construction all influence performance.',
    sections: [
      {
        heading: '1. Why Wattage Alone Doesn’t Tell the Full Story',
        text: 'Motor power describes energy transfer rate, but torque delivery at low RPM governs hill climbing and acceleration. Two 250W motors can exhibit drastically different torque curves depending on copper winding configuration, magnet strength, and phase resistance.',
      },
      {
        heading: '2. Thermal Behavior Under Sustained Load',
        text: 'Current flow generates I²R copper heat losses. Winding insulation systems (Class B 130°C vs Class F 155°C) must be verified. European EN 15194 specifies 250W continuous rated power limits, whereas US Class 1-3 regulations permit up to 750W.',
      },
      {
        heading: '3. Geared vs. Direct-Drive Construction',
        list: [
          'Direct-Drive Hub Motors: No internal reduction gears; silent, highly durable, compatible with regenerative braking.',
          'Geared Hub Motors: Internal planetary reduction gears; higher low-speed torque, compact size, internal freewheel.',
        ],
      },
      {
        heading: '4. Buyer Quality Checklist',
        text: 'Verify phase resistance, Hall sensor alignment, axle dimensions, dropout spacing, continuous torque rating, efficiency maps, and waterproofing before sourcing.',
      },
    ],
  },
  {
    id: 13,
    featured: false,
    category: 'E-Bike Parts & Components',
    title: 'E-Bike Motor Controller Buyer’s Guide: Voltage Margins, MOSFET Ratings & Compatibility Verification',
    excerpt: 'A practical guide to voltage-margin sizing, MOSFET ratings, connector compatibility, and what to verify before sourcing an e-bike motor controller.',
    date: 'February 16, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'developer_board',
    image: '/assets/blog_diagrams/blog_13_ebike_motor_controller.png',
    summary: 'The motor controller regulates power between the battery and the BLDC motor, making its electrical ratings, thermal design, and system compatibility important factors in overall reliability. A controller that appears compatible on a datasheet can still be unsuitable if component ratings provide insufficient margin.',
    sections: [
      {
        heading: '1. Why Voltage Margin Matters More Than Nominal Voltage',
        text: 'A nominal 48V battery (13S Li-ion) reaches 54.6V fully charged; a nominal 52V pack (14S) reaches 58.8V. Power MOSFET VDS breakdown voltage must account for peak DC-bus voltage plus inductive switching voltage spikes.',
      },
      {
        heading: '2. MOSFET Ratings and Thermal Design',
        text: 'Controller current capacity depends on MOSFET RDS(on) resistance, gate drive current, PCB copper weight, and heat sink dissipation. Aluminum extruded housings and thermal potting improve environmental protection and heat transfer.',
      },
      {
        heading: '3. Connector and Pinout Compatibility',
        text: 'Physical connector matching does not guarantee identical pinouts. Hall sensor, throttle, PAS, display, and brake cut-off wiring diagrams must be cross-verified before connecting power.',
      },
    ],
  },
  {
    id: 14,
    featured: false,
    category: 'E-Bike Parts & Components',
    title: 'E-Bike Li-ion Battery Charger Buyer’s Guide: Voltage Matching, UL 2849 & Compatibility Verification',
    excerpt: 'A practical guide to voltage and chemistry matching, CC-CV charging verification, connector compatibility, and safety-standard documentation to check before sourcing.',
    date: 'February 08, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'power',
    image: '/assets/blog_diagrams/blog_14_ebike_battery_charger.png',
    summary: 'An e-bike lithium-ion battery charger is a safety-critical component, not simply an accessory. Because inappropriate charging conditions can contribute to battery damage, charger selection requires more than checking whether a plug fits or whether the voltage label appears similar.',
    sections: [
      {
        heading: '1. Voltage and Chemistry Matching',
        text: 'Match charger maximum output voltage to battery cell series count (e.g. 54.6V for 13S NMC vs 47.45V for 13S LiFePO4). Cell chemistry dictates maximum charging voltage per cell (4.2V NMC vs 3.65V LiFePO4).',
      },
      {
        heading: '2. CC-CV Charging Profile & BMS Interaction',
        text: 'Chargers supply Constant Current (CC) while battery voltage rises, then transition to Constant Voltage (CV) as current tapers off. The charger must operate in harmony with the battery pack’s internal BMS protection board.',
      },
      {
        heading: '3. UL 2849 System Compliance & Sourcing Checklist',
        text: 'Verify UL 2849 system-level electrical certification (required by laws such as NYC Local Law 39). Confirm connector polarity, output current limits, and temperature protection features before ordering.',
      },
    ],
  },

  // ── CATEGORY 4: QUALITY & COMPLIANCE (3 ARTICLES) ──────────────────────────
  {
    id: 15,
    featured: false,
    category: 'Quality & Compliance',
    title: 'What ISO 9001:2015 & REACH Compliance Mean for Sourcing Partners',
    excerpt: 'A practical guide to understanding quality management system certification and chemical compliance requirements when evaluating manufacturing partners for motorcycle, e-bike, and industrial components.',
    date: 'January 30, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'verified',
    image: '/assets/blog_diagrams/blog_15_iso_9001_reach_compliance.png',
    summary: 'Quality certifications and chemical-compliance frameworks are often listed on supplier profiles without explaining what they actually verify. ISO 9001:2015 specifies requirements for a quality management system, while REACH regulates chemical substances and establishes obligations for EU market placement.',
    sections: [
      {
        heading: '1. What ISO 9001:2015 Actually Certifies',
        text: 'ISO 9001:2015 certifies an organization’s quality management processes—not the physical dimensions of an individual product. (Note: ISO 9001:2026 6th edition is scheduled for publication in late 2026). Product conformity still requires drawing-level inspection.',
      },
      {
        heading: '2. What REACH Actually Requires',
        text: 'REACH (EU Regulation) governs chemical substances. SVHC Candidate List items exceeding 0.1% weight by weight (w/w) in articles trigger notification and SCIP database reporting duties, but do not represent a blanket prohibition.',
      },
      {
        heading: '3. Sourcing Verification Checklist',
        text: 'Request current accredited ISO 9001 certificates with valid scope, material-specific REACH SVHC declarations, Candidate List assessment dates, and destination market regulatory compliance documentation.',
      },
    ],
  },
  {
    id: 16,
    featured: false,
    category: 'Quality & Compliance',
    title: 'Pre-Shipment Inspection & Quality Documentation: What to Request from Your Supplier',
    excerpt: 'A practical guide to AQL sampling standards, defect classification, and the inspection documentation buyers should request before goods leave the factory.',
    date: 'January 22, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'fact_check',
    image: '/assets/blog_diagrams/blog_16_preshipment_inspection.png',
    summary: 'A pre-shipment inspection (PSI) is a final quality checkpoint before goods leave the factory. It provides a structured check that finished goods conform to the buyer’s agreed specifications before dispatch. Understanding AQL sampling and defect classification helps buyers ensure meaningful quality control.',
    sections: [
      {
        heading: '1. Where PSI Fits in the Quality Control Sequence',
        text: 'Pre-Shipment Inspection (PSI) occurs when 80%+ of an order is completed and packed. It builds upon earlier Pre-Production Inspections (PPI) and During-Production Inspections (DPI).',
      },
      {
        heading: '2. How AQL Sampling Works',
        text: 'Acceptance Quality Limit (AQL ISO 2859-1:2026 / ANSI/ASQ Z1.4) defines sample sizes. Defects are classified as Critical (0 acceptance), Major (commonly AQL 2.5), and Minor (commonly AQL 4.0).',
      },
      {
        heading: '3. What a PSI Report Must Include',
        list: [
          'Quantity & Packaging Check: Carton counts, shipping marks, barcode accuracy.',
          'Workmanship Inspection: Visual surface defects, burrs, flash, finish quality.',
          'Dimensional Verification: Critical gauge measurements against technical drawings.',
          'Functional & Material Testing: Hardness testing, fitment checks, electrical parameter tests.',
        ],
      },
    ],
  },
  {
    id: 17,
    featured: false,
    category: 'Quality & Compliance',
    title: 'RoHS vs REACH: Understanding Chemical Compliance for Motorcycle & E-Bike Components',
    excerpt: 'A practical guide to the scope, restricted substances, and applicability differences between RoHS and REACH—and why "RoHS compliant" is not a simple mechanical-vs-electrical question.',
    date: 'January 14, 2026',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'gavel',
    image: '/assets/blog_diagrams/blog_17_rohs_vs_reach_compliance.png',
    summary: 'RoHS and REACH are both important EU chemical-regulatory frameworks, but they are not interchangeable. They differ in legal scope, regulatory mechanisms, substance requirements, and product applicability. Sourcing teams must understand how vehicle type-approval affects RoHS transport exclusions.',
    sections: [
      {
        heading: '1. RoHS: Restricted Substances in Electrical Equipment',
        text: 'RoHS restricts 10 hazardous substances (lead, mercury, cadmium, hexavalent chromium, PBB, PBDE, and 4 phthalates) to 0.1% max weight in homogeneous materials (0.01% for cadmium). Non-electrical parts integrated into electrical assemblies must also comply.',
      },
      {
        heading: '2. Why Electric Two-Wheelers Require Scope Assessment',
        text: 'RoHS excludes type-approved transport vehicles. Non-type-approved e-bikes (EN 15194 EPACs ≤250W) fall under bicycle classification and are NOT exempt from RoHS, making electrical component verification essential.',
      },
      {
        heading: '3. Sourcing Guidance for Importers',
        text: 'Verify product-specific RoHS testing reports and REACH SVHC declarations per component category rather than accepting generic blanket compliance statements.',
      },
    ],
  },

  // ── CATEGORY 5: LOGISTICS & SOURCING (3 ARTICLES) ─────────────────────────
  {
    id: 18,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Global Sealing & Parts Market Trends 2026: Supply Chain Insights',
    excerpt: 'A practical overview of current supply chain shifts, material trends, and regional sourcing patterns shaping the industrial sealing, motorcycle, and e-bike component markets.',
    date: 'January 06, 2026',
    readTime: '5 min read',
    author: 'AT International Insights',
    icon: 'trending_up',
    image: '/assets/blog_diagrams/blog_18_global_market_trends.png',
    summary: 'Supply chains for industrial sealing components, motorcycle parts, and e-bike systems continue to evolve in response to regionalization pressures, electrification-driven demand shifts, and changing buyer expectations around sourcing transparency.',
    sections: [
      {
        heading: '1. Regionalization and Supply Chain Diversification',
        text: 'Global buyers increasingly weigh supplier responsiveness, warehousing options, and regional flexibility alongside unit pricing when evaluating China sourcing partners.',
      },
      {
        heading: '2. Electrification Reshaping Sealing Demand',
        text: 'Growth in e-mobility drives demand for specialized elastomer compounds combining high chemical resistance with electrical insulation and thermal management capabilities.',
      },
      {
        heading: '3. Material Innovation & Digital Procurement',
        text: 'Rising demand for compound-specific data (rather than generic "rubber") and digital procurement workflows with traceable test documentation across global supply chains.',
      },
    ],
  },
  {
    id: 19,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Exporting Industrial, Motorcycle & E-Bike Components: AT International Logistics Playbook',
    excerpt: 'A practical overview of export documentation, Incoterms selection, and container logistics for buyers sourcing sealing components, motorcycle parts, and e-bike systems internationally.',
    date: 'December 28, 2025',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'local_shipping',
    image: '/assets/blog_diagrams/blog_19_export_logistics_playbook.png',
    summary: 'International component sourcing involves more than agreeing on price and specification—it requires clarity on who is responsible for freight, insurance, customs clearance, and documentation at each stage of the shipment.',
    sections: [
      {
        heading: '1. Navigating Incoterms 2020 (FCA, FOB, CIF, DDP)',
        text: 'Select trade terms matching freight control preferences: FCA for containerized shipments handed to carriers; FOB for traditional ocean vessel loading; CIF for seller-paid freight/insurance; DDP for full destination delivery.',
      },
      {
        heading: '2. Core Export Documentation Checklist',
        list: [
          'Commercial Invoice: Product descriptions, values, HS codes, and trade terms.',
          'Packing List: Detailed weights, package counts, dimensions, and carton markings.',
          'Bill of Lading (B/L): Ocean transport title document matching commercial details.',
          'Certificate of Origin (C/O): Origin declaration for preferential tariff treatment.',
        ],
      },
      {
        heading: '3. Container Consolidation (LCL vs FCL)',
        text: 'Consolidate industrial seals, motorcycle parts, and e-bike items into shared LCL or full FCL containers to optimize logistics costs and streamline customs clearance.',
      },
    ],
  },
  {
    id: 20,
    featured: false,
    category: 'Logistics & Sourcing',
    title: 'Export Packaging for Industrial, Motorcycle & E-Bike Components: Protecting Seals, Metal Parts & Electronics in Transit',
    excerpt: 'A practical guide to packaging specifications for rubber sealing components, metal engine parts, and e-bike electrical systems during international ocean freight.',
    date: 'December 20, 2025',
    readTime: '6 min read',
    author: 'AT International Insights',
    icon: 'inventory_2',
    image: '/assets/blog_diagrams/blog_20_export_packaging_protection.png',
    summary: 'Industrial sealing products, motorcycle engine components, and e-bike electrical systems each face different risks during international transit. Metal parts face corrosion risks, elastomeric seals face deformation, and e-bike electronics face moisture and impact risks.',
    sections: [
      {
        heading: '1. Metal Motorcycle Components: The Corrosion Risk',
        text: 'Machined steel crankshafts and aluminum heads require VCI (Volatile Corrosion Inhibitor) film/bags, desiccants, and moisture-barrier packaging to prevent dew-point condensation rust during long ocean voyages.',
      },
      {
        heading: '2. Rubber & Elastomer Sealing Protection',
        text: 'O-rings and oil seals require compartmentalized trays or poly bags preventing lip crushing, deformation, UV exposure, and ozone degradation. Lot/batch labels ensure receiving inspection traceability.',
      },
      {
        heading: '3. E-Bike Electrical Components & Container Loading',
        text: 'Motor controllers and chargers require ESD-safe anti-static cushioning, connector caps, and heavy-duty double-wall master cartons stacked securely on heat-treated pallets.',
      },
    ],
  },
]

const CATEGORIES = [
  'All',
  'Industrial Sealing Solutions',
  'Motorcycle Parts',
  'E-Bike Parts & Components',
  'Quality & Compliance',
  'Logistics & Sourcing',
]

const CATEGORY_COLORS = {
  'Industrial Sealing Solutions': 'bg-blue-100 text-blue-700 border-blue-200',
  'Motorcycle Parts': 'bg-orange-100 text-orange-700 border-orange-200',
  'E-Bike Parts & Components': 'bg-emerald-100 text-emerald-700 border-emerald-200',
  'Quality & Compliance': 'bg-purple-100 text-purple-700 border-purple-200',
  'Logistics & Sourcing': 'bg-amber-100 text-amber-700 border-amber-200',
}

// ── FULL ARTICLE DETAIL MODAL ──────────────────────────────────────
function ArticleModal({ post, onClose, onSelectPost }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  if (!post) return null

  const related = POSTS.filter((p) => p.id !== post.id && (p.category === post.category || p.category === 'Industrial Sealing Solutions')).slice(0, 3)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      style={{ backgroundColor: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden animate-modalFade"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header Bar */}
        <div className="bg-[#005691] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_COLORS[post.category] || 'bg-white/20 text-white border-white/30'}`}>
              {post.category}
            </span>
            <span className="text-xs text-white/80 hidden sm:inline">• {post.readTime}</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300"
            title="Close Article"
          >
            <span className="material-symbols-outlined text-white text-xl">close</span>
          </button>
        </div>

        {/* Scrollable Article Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Article Header */}
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-[#005691] leading-tight mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#505f76] pb-4 border-b border-gray-200">
              <span className="font-semibold text-[#005691]">{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="h-64 sm:h-80 rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 p-3 flex items-center justify-center">
            <BlogImage src={post.image} alt={post.title} />
          </div>

          {/* Summary Callout Box */}
          {post.summary && (
            <div className="bg-[#f0f6fa] border-l-4 border-[#005691] p-5 rounded-r-xl">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#005691] mb-2 flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">lightbulb</span> Executive Summary
              </h4>
              <p className="text-sm text-[#334155] leading-relaxed italic">{post.summary}</p>
            </div>
          )}

          {/* Article Sections */}
          <div className="space-y-6 text-[#334155]">
            {post.sections &&
              post.sections.map((sec, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl font-bold text-[#005691] pt-2">{sec.heading}</h3>
                  {sec.text && <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{sec.text}</p>}

                  {/* List items if present */}
                  {sec.list && (
                    <ul className="space-y-2.5 my-3 pl-2">
                      {sec.list.map((li, lIdx) => (
                        <li key={lIdx} className="flex items-start gap-3 text-sm sm:text-base">
                          <span className="material-symbols-outlined text-[#005691] text-base mt-1 flex-shrink-0">check_circle</span>
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Table if present */}
                  {sec.table && (
                    <div className="overflow-x-auto my-4 border border-gray-200 rounded-xl">
                      <table className="w-full text-left text-xs sm:text-sm">
                        <thead className="bg-[#005691] text-white">
                          <tr>
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-semibold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {sec.table.rows.map((r, rIdx) => (
                            <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              {r.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-3 text-[#505f76] ${cIdx === 0 ? 'font-semibold text-[#005691]' : ''}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* CTA Box inside modal */}
          <div className="bg-gradient-to-r from-[#005691] to-[#003d66] text-white p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-bold text-lg mb-1">Planning Your Next International Shipment?</h4>
              <p className="text-xs sm:text-sm text-white/80">Share your product requirements, quantities, destination, and preferred shipping terms with ATI, and our team can help coordinate suitable sourcing and logistics options.</p>
            </div>
            <button
              onClick={onClose}
              className="bg-white text-[#005691] px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-100 whitespace-nowrap transition-all shadow-md cursor-pointer"
            >
              Discuss Your Requirements
            </button>
          </div>

          {/* Related Articles Section */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-bold text-lg text-[#005691] mb-4">Related Technical Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {related.map((rPost) => (
                  <div
                    key={rPost.id}
                    onClick={() => onSelectPost(rPost)}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md cursor-pointer transition-all hover:border-[#005691] group bg-white"
                  >
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold mb-2 ${CATEGORY_COLORS[rPost.category]}`}>
                      {rPost.category}
                    </span>
                    <h4 className="font-bold text-xs text-[#005691] line-clamp-2 group-hover:underline mb-2">{rPost.title}</h4>
                    <p className="text-[11px] text-[#505f76] line-clamp-2">{rPost.excerpt}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#f7f9fb] border-t border-gray-200 px-6 py-4 flex items-center justify-between text-xs text-[#505f76] flex-shrink-0">
          <span>AT International Knowledge Center</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#005691] text-white rounded-lg font-semibold text-xs hover:bg-[#004270] transition-colors"
          >
            Close Article
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Blogs() {
  useEffect(() => {
    document.title = 'Blogs & News | AT International'
  }, [])

  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedPost, setSelectedPost] = useState(null)
  const [subscribed, setSubscribed] = useState(false)
  const [emailInput, setEmailInput] = useState('')

  const featuredPost = POSTS.find((p) => p.featured) || POSTS[0]

  const filteredPosts = POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory
    const matchesSearch =
      searchQuery.trim() === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (emailInput.trim()) {
      const templateParams = {
        from_name: 'Newsletter Subscriber',
        to_name: 'AT International',
        to_email: 'usmankhalid1234@hotmail.com, theatinternational@gmail.com',
        reply_to: emailInput,
        user_email: emailInput,
        message: `New Technical Insights Newsletter subscription from: ${emailInput}`,
        title: `Newsletter Subscription: ${emailInput}`
      }

      emailjs.send(
        'service_hrbqaj9',
        'template_l94ixmr',
        templateParams,
        'l9K4E835PGcGZMP2Z'
      ).catch((err) => console.error('EmailJS Newsletter Error:', err))

      setSubscribed(true)
      setEmailInput('')
      setTimeout(() => setSubscribed(false), 5000)
    }
  }

  return (
    <div className="bg-[#f7f9fb] min-h-screen">
      {/* Detail Modal */}
      {selectedPost && (
        <ArticleModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onSelectPost={(post) => setSelectedPost(post)}
        />
      )}

      {/* Hero Section */}
      <section
        className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden"
        style={{
          backgroundImage: 'url(/assets/blogs_hero_bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/85 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest backdrop-blur-sm">
            Technical & Sourcing Knowledge Hub
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            AT International Insights
          </h1>
          <p className="text-white/80 text-base max-w-2xl">
            Practical technical guides, motorcycle and e-bike component insights, quality standards, and procurement knowledge from our China sourcing team.
          </p>
        </div>
      </section>

      {/* Filter Tabs Bar */}
      <div className="bg-white border-b border-[#c5c6cd] sticky top-20 z-30 shadow-sm">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-[#005691] text-white shadow-md'
                    : 'text-[#505f76] hover:bg-[#f2f4f6] hover:text-[#005691]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs text-[#505f76] font-medium whitespace-nowrap ml-auto">
            {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-8 py-14">
        {/* Featured Article Banner (Show only when on 'All' category and no search active) */}
        {activeCategory === 'All' && !searchQuery && featuredPost && (
          <div className="mb-14 bg-white border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow grid grid-cols-1 lg:grid-cols-12 group">
            <div className="lg:col-span-7 h-64 lg:h-[340px] overflow-hidden relative bg-white p-3 border-b lg:border-b-0 lg:border-r border-gray-200 flex items-center justify-center">
              <BlogImage src={featuredPost.image} alt={featuredPost.title} />
              <span className="absolute top-4 left-4 bg-[#005691] text-white text-[11px] font-bold px-3 py-1 rounded-md uppercase tracking-wider shadow">
                Featured Article
              </span>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-10 bg-[#f0f7ff] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${CATEGORY_COLORS[featuredPost.category]}`}>
                    {featuredPost.category}
                  </span>
                  <span className="text-xs text-[#505f76]">{featuredPost.readTime}</span>
                </div>

                <h2
                  onClick={() => setSelectedPost(featuredPost)}
                  className="text-2xl font-bold text-[#005691] hover:underline cursor-pointer leading-snug mb-3"
                >
                  {featuredPost.title}
                </h2>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">{featuredPost.excerpt}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="text-xs text-[#505f76]">
                  <span className="font-semibold text-[#005691]">{featuredPost.author}</span> • {featuredPost.date}
                </div>
                <button
                  onClick={() => setSelectedPost(featuredPost)}
                  className="bg-[#005691] text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#004270] transition-all flex items-center gap-1.5 group-hover:gap-2 shadow"
                >
                  Read Full Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-[#005691]">
              {activeCategory === 'All' ? 'Latest Technical Articles' : `${activeCategory} Articles`}
            </h2>
            <p className="text-xs sm:text-sm text-[#505f76] mt-1">
              Curated technical specs and sourcing guides for procurement managers and engineering teams.
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between hover:-translate-y-1"
            >
              <div>
                <div className="h-56 bg-white overflow-hidden relative border-b border-[#e2effa] p-2 flex items-center justify-center">
                  <BlogImage src={post.image} alt={post.title} />
                </div>
                <div className="p-6 bg-[#f0f7ff]">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${CATEGORY_COLORS[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="text-[11px] text-[#505f76] font-medium">{post.readTime}</span>
                  </div>

                  <h3 className="font-bold text-[#005691] text-base leading-snug mb-2 group-hover:text-[#003d66] group-hover:underline line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-[#505f76] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-3 bg-[#f0f7ff] border-t border-[#e2effa] flex items-center justify-between text-xs">
                <span className="text-[#505f76]">{post.date}</span>
                <span className="text-[#005691] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Empty Search Results State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <span className="material-symbols-outlined text-[#c5c6cd] text-6xl mb-3 block">article_off</span>
            <h3 className="text-lg font-bold text-[#005691] mb-1">No articles found</h3>
            <p className="text-sm text-[#505f76] mb-6">
              We couldn't find any articles matching "{searchQuery}" in category "{activeCategory}".
            </p>
            <button
              onClick={() => {
                setActiveCategory('All')
                setSearchQuery('')
              }}
              className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-xs font-semibold hover:bg-[#004270] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-20 bg-gradient-to-r from-[#005691] via-[#00487a] to-[#00365c] text-white rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <span className="material-symbols-outlined text-4xl mb-3 text-white/90">mark_email_unread</span>
            <h3 className="text-2xl sm:text-3xl font-bold mb-3">NEWSLETTER</h3>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              Get practical sourcing insights, motorcycle and e-bike component updates, quality guidance, and global procurement news delivered monthly.
            </p>

            {subscribed ? (
              <div className="bg-emerald-500/20 border border-emerald-400 text-white p-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">check_circle</span> Thank you! You have successfully subscribed to ATI Technical Insights.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="Enter your business email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg text-sm text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <button
                  type="submit"
                  className="bg-white text-[#005691] px-6 py-3 rounded-lg text-sm font-bold hover:bg-gray-100 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Subscribe Free
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
