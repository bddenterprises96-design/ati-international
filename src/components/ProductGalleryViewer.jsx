import { useState, useRef, useEffect } from 'react'

/**
 * Multiple Product Angles & Hover-to-Zoom Magnifying Lens
 * Conforms to Section 03-D & 04 of Website Improvement & Redesign Plan
 */
export default function ProductGalleryViewer({ subProduct }) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const containerRef = useRef(null)

  // Curate 3-4 specialized angle/detail views per product from verified assets
  const getAnglesForProduct = (sub) => {
    if (!sub) return []
    const baseImg = sub.image || '/assets/clean_product_images/clean_aaa.png'
    const id = sub.id || ''

    if (id === 'valve-stem') {
      return [
        { label: 'Studio Front Angle', tag: 'Primary Specification', url: baseImg },
        { label: 'Internal Lip & Spring Detail', tag: 'Microscopic Sealing Lip', url: '/assets/cylinder.png' },
        { label: 'Dynamic Sealing Theory View', tag: 'Combustion Chamber Fit', url: '/assets/cyy.png' },
        { label: 'Bulk Export Packaging', tag: 'OEM Protective Crate', url: '/assets/valve-section1.jpg' },
      ]
    }
    if (id === 'o-rings') {
      return [
        { label: 'Studio Precision Angle', tag: '70-90 Shore Durometer', url: baseImg },
        { label: 'Groove Dimensional View', tag: 'AS568 / Metric Section', url: '/assets/il2.png' },
        { label: 'High-Pressure Theory View', tag: 'Extrusion & Gap Resistance', url: '/assets/oo.png' },
        { label: 'Material Assortment Batch', tag: 'Fluorocarbon / Viton & NBR', url: '/assets/ringss.jpg' },
      ]
    }
    if (id === 'oil-seals') {
      return [
        { label: 'Dual-Lip Studio View', tag: 'Hydrodynamic Spiral Profile', url: baseImg },
        { label: 'Garter Spring & Casing', tag: 'Carbon / Stainless Reinforcement', url: '/assets/rotary_oil_seals.png' },
        { label: 'High-RPM Shaft Fit', tag: '10,000 RPM Dynamic Test', url: '/assets/oilseals.png' },
        { label: 'Bulk Industrial Pack', tag: 'Moisture-Proof Export Bag', url: '/assets/12.jpg' },
      ]
    }
    if (id === 'moto-engine') {
      return [
        { label: 'Forged Crankshaft Assembly', tag: 'Balanced 4340 Alloy Steel', url: baseImg },
        { label: 'Precision Ground Journal', tag: 'Micron Precision Tolerance', url: '/assets/parts/engine_crankshaft.png' },
        { label: 'Heavy-Duty Connecting Rod', tag: 'Forged 20CrMo Alloy Steel', url: '/assets/parts/engine_connecting_rod.png' },
        { label: 'Complete Overhaul Box', tag: 'Anti-Corrosion Sealed Pack', url: '/assets/crankshaft_main.png' },
      ]
    }
    if (id === 'moto-clutch') {
      return [
        { label: 'Precision Cylinder Head', tag: 'A356.2 Die-Cast Aluminum', url: baseImg },
        { label: 'Combustion Chamber & Seats', tag: 'CNC Milled Combustion Bowl', url: '/assets/parts/engine_cylinder_head.png' },
        { label: 'SUH3/35 Valvetrain Set', tag: 'High-Temp Heat Treatment', url: '/assets/parts/engine_valves.png' },
        { label: 'Machined Gasket Surface', tag: 'Zero-Defect Flatness Check', url: '/assets/cylinder.png' },
      ]
    }
    if (id === 'moto-gasket') {
      return [
        { label: 'Cylinder Block Profile', tag: 'Cast-Iron / NikaSil Bore', url: baseImg },
        { label: 'Honed Cylinder Sleeve', tag: 'Cross-Hatch Plateau Finish', url: '/assets/parts/engine_cylinder_block.png' },
        { label: 'Forged Piston & Wristpin', tag: 'Thermal Expansion Control', url: '/assets/parts/engine_piston.png' },
        { label: 'Nitride Piston Rings Set', tag: 'Oil Scraper & Compression', url: '/assets/parts/engine_piston_rings.png' },
      ]
    }
    if (id === 'ebike-powertrain') {
      return [
        { label: 'BLDC Hub Motor Studio View', tag: 'Waterproof IP67 Rating', url: baseImg },
        { label: 'Internal Rotor & Stator Core', tag: 'Pure Copper Windings / Neodymium', url: '/assets/ebike_motor_main.png' },
        { label: 'Rotary Double Lip Shaft Seal', tag: 'Dirt & Water Exclusion', url: '/assets/ebike_motor_sealing.png' },
        { label: 'Heavy-Duty Wheel Hub Fit', tag: 'Reinforced Spoke Flange', url: '/assets/ebike.png' },
      ]
    }
    if (id === 'ebike-battery') {
      return [
        { label: 'Sine-Wave Motor Controller', tag: 'Regenerative Braking Unit', url: baseImg },
        { label: 'Anodized Heat-Sink Casing', tag: 'Thermal Dissipation Fins', url: '/assets/ebike_drive_system_sealing.png' },
        { label: 'Multi-Wire Sealed Harness', tag: 'Flame-Retardant Grommets', url: '/assets/homepage_bento_ebike_clean.png' },
        { label: 'Shockproof Testing Setup', tag: 'UL94-V0 Vibration Tested', url: '/assets/chat.png' },
      ]
    }
    if (id === 'ebike-accessories') {
      return [
        { label: 'Smart Fast Charger Studio View', tag: 'CC/CV 48V-72V Auto-Detect', url: baseImg },
        { label: 'Flame-Resistant Battery Pack', tag: 'UL94-V0 Silicone Enclosure', url: '/assets/ebike_battery_sealing.png' },
        { label: 'Active Cooling Vent & Fan', tag: 'Short-Circuit Protection IC', url: '/assets/clean_product_images/fast_bbb.png' },
        { label: 'Waterproof DC Charging Port', tag: 'Spring-Loaded Sealed Cap', url: '/assets/homepage_3d_bento_ebike.png' },
      ]
    }

    // Default fallback to 3 crisp visual angles
    return [
      { label: 'Standard Export Profile', tag: 'Primary View', url: baseImg },
      { label: 'Material & Machining Detail', tag: 'Macro Angle', url: sub.image || '/assets/clean_product_images/clean_aaa.png' },
      { label: 'Quality Verification Inspection', tag: 'ISO 9001 Tested', url: '/assets/quality_compliance_bg.jpg' },
    ]
  }

  const angles = getAnglesForProduct(subProduct)

  // Reset angle to 0 whenever the selected product changes
  useEffect(() => {
    setActiveAngleIndex(0)
    setIsZooming(false)
  }, [subProduct?.id])

  // Mouse move handler for magnifying zoom
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100))
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100))
    setZoomPos({ x, y })
  }

  // Mobile Swipe handlers
  const minSwipeDistance = 50
  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX)
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      setActiveAngleIndex((prev) => (prev + 1) % angles.length)
    } else if (isRightSwipe) {
      setActiveAngleIndex((prev) => (prev - 1 + angles.length) % angles.length)
    }
  }

  const currentAngle = angles[activeAngleIndex] || angles[0]

  return (
    <div className="space-y-4 select-none">
      {/* Main Image Box with Magnifying Zoom Effect */}
      <div
        ref={containerRef}
        onMouseEnter={() => setIsZooming(true)}
        onMouseLeave={() => setIsZooming(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onClick={() => setIsZooming(!isZooming)}
        className="relative h-80 sm:h-96 w-full bg-gradient-to-b from-white via-[#f8fafc] to-[#edf3f8] border border-[#c5c6cd] rounded-2xl overflow-hidden shadow-inner cursor-crosshair group flex items-center justify-center"
      >
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#005691_0.75px,transparent_0.75px)] [background-size:16px_16px] opacity-15 pointer-events-none" />

        {/* Dynamic Image with Smooth Scale Zoom */}
        <img
          src={currentAngle?.url}
          alt={`${subProduct?.name} - ${currentAngle?.label}`}
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZooming ? 'scale(2.4)' : 'scale(1)',
          }}
          className="w-full h-full object-contain p-6 transition-transform duration-150 ease-out pointer-events-none will-change-transform"
          onError={(e) => {
            e.target.src = '/assets/clean_product_images/clean_aaa.png'
          }}
        />

        {/* Angle Badge Pill Top-Left */}
        <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2">
          <span className="px-3 py-1 bg-[#005691] text-white text-[11px] font-bold rounded-lg shadow-md uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm">
            <span className="material-symbols-outlined text-xs">view_in_ar</span>
            {currentAngle?.tag || 'View Angle'}
          </span>
          <span className="hidden sm:inline-block px-2.5 py-1 bg-white/90 border border-gray-300 text-gray-700 text-[11px] font-semibold rounded-lg shadow-xs">
            {activeAngleIndex + 1} / {angles.length}
          </span>
        </div>

        {/* Zoom Instructions Pill Bottom-Right */}
        <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none">
          <span className="px-3 py-1 bg-black/70 text-white text-[10px] sm:text-xs font-semibold rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-opacity duration-300 group-hover:opacity-90 opacity-75">
            <span className="material-symbols-outlined text-xs sm:text-sm text-amber-400">zoom_in</span>
            {isZooming ? '2.4x Zoom Active' : 'Hover to Zoom · Swipe on Phone'}
          </span>
        </div>

        {/* Swipe Chevrons on Mobile & Hover Chevrons on Desktop */}
        {angles.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setActiveAngleIndex((prev) => (prev - 1 + angles.length) % angles.length)
              }}
              aria-label="Previous view angle"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-[#005691] text-[#005691] hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 z-20 cursor-pointer opacity-70 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                setActiveAngleIndex((prev) => (prev + 1) % angles.length)
              }}
              aria-label="Next view angle"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 hover:bg-[#005691] text-[#005691] hover:text-white border border-gray-200 shadow-md flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-90 z-20 cursor-pointer opacity-70 group-hover:opacity-100"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </>
        )}
      </div>

      {/* Angle Thumbnails Carousel Switcher */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {angles.map((ang, idx) => {
          const isActive = idx === activeAngleIndex
          return (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveAngleIndex(idx)}
              className={`
                relative rounded-xl p-1.5 sm:p-2 bg-white border-2 text-left transition-all duration-200 flex flex-col items-center cursor-pointer group
                ${isActive
                  ? 'border-amber-500 shadow-md shadow-amber-500/20 ring-2 ring-amber-500/20 scale-[1.02]'
                  : 'border-[#c5c6cd] hover:border-[#005691] opacity-75 hover:opacity-100'
                }
              `}
            >
              <div className="w-full aspect-square rounded-lg bg-[#f8fafc] overflow-hidden flex items-center justify-center mb-1">
                <img
                  src={ang.url}
                  alt={ang.label}
                  className="w-full h-full object-contain p-1 group-hover:scale-110 transition-transform duration-200 pointer-events-none"
                  onError={(e) => {
                    e.target.src = '/assets/clean_product_images/clean_aaa.png'
                  }}
                />
              </div>
              <span className={`text-[10px] sm:text-[11px] font-bold truncate max-w-full text-center ${isActive ? 'text-[#005691]' : 'text-gray-600'}`}>
                {ang.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
