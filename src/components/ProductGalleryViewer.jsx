import { useState, useRef, useEffect } from 'react'

/**
 * Product Gallery Viewer with Data Sheet Technical Diagrams & Magnifying Lens
 * Shows the Product Master Photo, Technical Structure Diagram, and Sealing/Operating Theory Diagram
 * from each product's official technical data sheet.
 */

// Fallback technical data sheet diagram mapping for all 9 core products
const DATA_SHEETS_FALLBACK = {
  'valve-stem': {
    structureImage: '/assets/cylinder.png',
    structureCaption: 'Valve Stem Seal Cross-Section Structure Diagram',
    theoryImage: '/assets/cyy.png',
    theoryCaption: 'Valve Stem Seal Sealing Theory Diagram',
  },
  'o-rings': {
    structureImage: '/assets/il2.png',
    structureCaption: 'O-Ring Cross-Section & Groove Dimension Diagram',
    theoryImage: '/assets/oo.png',
    theoryCaption: 'O-Ring Pressure Sealing Theory Diagram',
  },
  'oil-seals': {
    structureImage: '/assets/il.png',
    structureCaption: 'Oil Seal Component Anatomy & Installation Diagram',
    theoryImage: '/assets/oo1.png',
    theoryCaption: 'Oil Seal Hydrodynamic Sealing Theory Diagram',
  },
  'moto-engine': {
    structureImage: '/assets/pdf_diagrams/crankshaft_structure.png',
    structureCaption: 'Motorcycle Crankshaft Assembly & Component Structure Diagram',
    theoryImage: '/assets/pdf_diagrams/crankshaft_theory.png',
    theoryCaption: 'Crankshaft Reciprocating Motion & Primary Drive Transfer Diagram',
  },
  'moto-clutch': {
    structureImage: '/assets/pdf_diagrams/cylinder_head_structure.png',
    structureCaption: 'Motorcycle Cylinder Head Component & Sealing Layout Diagram',
    theoryImage: '/assets/pdf_diagrams/cylinder_head_theory.png',
    theoryCaption: 'Combustion Chamber Sealing & Air/Fuel Gas Flow Diagram',
  },
  'moto-seals': {
    structureImage: '/assets/pdf_diagrams/cylinder_structure.png',
    structureCaption: 'Motorcycle Cylinder Barrel, Bore & Gasket Mounting Structure Diagram',
    theoryImage: '/assets/pdf_diagrams/cylinder_theory.png',
    theoryCaption: 'Piston Movement, Ring Sealing & Heat Dissipation Principle',
  },
  'ebike-motor': {
    structureImage: '/assets/pdf_diagrams/ebike_motor_structure.png',
    structureCaption: 'BLDC Hub Motor Stator, Rotor & Planetary Gear Assembly Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_motor_theory.png',
    theoryCaption: 'Direct-Drive vs Geared Hub Motor Commutation & Torque Comparison',
  },
  'ebike-battery': {
    structureImage: '/assets/pdf_diagrams/ebike_controller_structure.png',
    structureCaption: 'E-Bike Motor Controller Circuit Board & Terminal Architecture Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_controller_theory.png',
    theoryCaption: 'Rider Input Signal Processing & Motor Phase Switching Diagram',
  },
  'ebike-drive': {
    structureImage: '/assets/pdf_diagrams/ebike_charger_structure.png',
    structureCaption: 'Li-ion Battery Charger Circuitry & Outer Housing Anatomy Diagram',
    theoryImage: '/assets/pdf_diagrams/ebike_charger_theory.png',
    theoryCaption: 'Constant-Current / Constant-Voltage (CC-CV) Charging Stage Graph',
  },
}

export default function ProductGalleryViewer({ subProduct, dataSheet }) {
  const [activeAngleIndex, setActiveAngleIndex] = useState(0)
  const [isZooming, setIsZooming] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 })
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const containerRef = useRef(null)

  // Curate views from product master photo and official data sheet diagrams
  const getAnglesForProduct = (sub, sheet) => {
    if (!sub) return []
    const baseImg = sub.image || '/assets/clean_product_images/clean_aaa.png'
    const ds = sheet || DATA_SHEETS_FALLBACK[sub.id] || {}

    const anglesList = [
      {
        label: 'Product Overview',
        tag: 'Master Spec',
        url: baseImg,
        caption: `${sub.name || 'Product'} Overview Photo`
      }
    ]

    // 1. Technical Structure Diagram from Data Sheet
    if (ds.structureImage) {
      anglesList.push({
        label: 'Structure Diagram',
        tag: 'Data Sheet Structure',
        url: ds.structureImage,
        caption: ds.structureCaption || 'Technical Structure Diagram'
      })
    }

    // 2. Sealing / Operating Theory Diagram from Data Sheet
    if (ds.theoryImage) {
      const isSealing = sub.id?.includes('seal') || sub.id === 'valve-stem' || sub.id === 'o-rings'
      anglesList.push({
        label: isSealing ? 'Sealing Theory' : 'Operating Principle',
        tag: 'Data Sheet Theory',
        url: ds.theoryImage,
        caption: ds.theoryCaption || 'Engineering Operating Principle'
      })
    }

    return anglesList
  }

  const angles = getAnglesForProduct(subProduct, dataSheet)

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

        {/* Caption Pill Bottom-Left */}
        {currentAngle?.caption && (
          <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none max-w-[55%] sm:max-w-[65%]">
            <span className="px-2.5 py-1 bg-white/90 text-gray-700 text-[10px] sm:text-[11px] font-medium rounded-lg shadow-sm border border-gray-200/80 truncate block backdrop-blur-xs">
              {currentAngle.caption}
            </span>
          </div>
        )}

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

      {/* Angle Thumbnails Carousel Switcher showing Data Sheet Images */}
      <div className={`grid gap-2 sm:gap-3 ${angles.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
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
