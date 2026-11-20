import { useState, useMemo } from 'react'

/**
 * Visual Component Showcase
 * Replaces plain text sub-component list with an interactive, picture-rich visual card grid.
 * Conforms to Section 03-D & Section 04 of Website Improvement & Redesign Plan.
 */

// Mapping dictionary from keyword or exact name to curated high-resolution component picture
const COMPONENT_IMAGE_MAP = [
  // Engine Block & Crankshaft
  { regex: /crankshaft.*assembly|crankshaft.*main/i, img: '/assets/parts/engine_crankshaft.png' },
  { regex: /crankshaft/i, img: '/assets/parts/engine_crankshaft.png' },
  { regex: /connecting\s*rod/i, img: '/assets/parts/engine_connecting_rod.png' },
  { regex: /crankcase/i, img: '/assets/parts/Crankcase.png' },
  { regex: /cylinder\s*head/i, img: '/assets/parts/engine_cylinder_head.png' },
  { regex: /cylinder\s*block|cylinder/i, img: '/assets/parts/engine_cylinder_block.png' },
  { regex: /piston\s*ring/i, img: '/assets/parts/engine_piston_rings.png' },
  { regex: /piston\s*pin|wristpin/i, img: '/assets/parts/engine_piston_pin.png' },
  { regex: /piston/i, img: '/assets/parts/engine_piston.png' },
  { regex: /camshaft/i, img: '/assets/parts/engine_camshaft.png' },
  { regex: /rocker\s*arm/i, img: '/assets/parts/engine_rocker_arms.png' },
  { regex: /valve\s*stem\s*seal/i, img: '/assets/parts/engine_valve_stem_seals.png' },
  { regex: /valve\s*guide/i, img: '/assets/parts/engine_valve_guides.png' },
  { regex: /valve\s*spring/i, img: '/assets/parts/engine_valve_springs.png' },
  { regex: /valve/i, img: '/assets/parts/engine_valves.png' },

  // Clutch & Transmission
  { regex: /clutch\s*friction/i, img: '/assets/parts/Clutch Friction Plates.png' },
  { regex: /clutch\s*plate/i, img: '/assets/parts/Clutch Plates.png' },
  { regex: /clutch\s*basket/i, img: '/assets/parts/Clutch Basket.png' },
  { regex: /clutch\s*cover/i, img: '/assets/parts/Clutch Cover.png' },
  { regex: /clutch\s*hub/i, img: '/assets/parts/Clutch Hub.png' },
  { regex: /clutch\s*spring/i, img: '/assets/parts/Clutch Springs.png' },
  { regex: /clutch\s*cable/i, img: '/assets/parts/Clutch Cable.png' },
  { regex: /transmission|gear/i, img: '/assets/parts/Transmission Gears.png' },
  { regex: /drive\s*shaft/i, img: '/assets/parts/Drive Shaft.png' },
  { regex: /counter\s*shaft/i, img: '/assets/parts/Counter Shaft.png' },
  { regex: /gear\s*lever/i, img: '/assets/parts/Gear Lever.png' },
  { regex: /gear\s*shift\s*drum/i, img: '/assets/parts/Gear Shift Drum.png' },
  { regex: /gear\s*shift\s*fork/i, img: '/assets/parts/Gear Shift Fork.png' },
  { regex: /kick\s*start/i, img: '/assets/parts/Kick Starter.png' },

  // Timing & Chain
  { regex: /timing\s*chain\s*tensioner/i, img: '/assets/parts/Timing Chain Tensioner.png' },
  { regex: /cam\s*chain\s*guide|chain\s*guide/i, img: '/assets/parts/Cam Chain Guide.png' },
  { regex: /timing\s*chain|drive\s*chain/i, img: '/assets/parts/Timing Chain.png' },

  // Bearings, Seals, Gaskets & Pumps
  { regex: /bearing/i, img: '/assets/parts/Engine Bearings.png' },
  { regex: /o-ring|oring/i, img: '/assets/parts/O-Rings.png' },
  { regex: /oil\s*seal/i, img: '/assets/parts/Oil Seals.png' },
  { regex: /gasket/i, img: '/assets/parts/Gaskets.png' },
  { regex: /oil\s*filter/i, img: '/assets/parts/Oil Filter.png' },
  { regex: /oil\s*pump/i, img: '/assets/parts/Oil Pump.png' },

  // E-Bike Components
  { regex: /hub\s*motor|bldc|motor/i, img: '/assets/clean_product_images/ebike_motor_main.png' },
  { regex: /controller|sine\s*wave/i, img: '/assets/clean_product_images/ebike_controller_main.png' },
  { regex: /charger|fast\s*charger/i, img: '/assets/clean_product_images/ebike_charger_main.png' },
  { regex: /battery|bms|power\s*pack/i, img: '/assets/ebike_battery_sealing.png' },
  { regex: /harness|wiring|cable/i, img: '/assets/homepage_bento_ebike_clean.png' },

  // Sealing Products
  { regex: /fkm|viton|valve\s*seal/i, img: '/assets/clean_product_images/clean_aaa.png' },
  { regex: /rotary|shaft\s*seal/i, img: '/assets/clean_product_images/clean_bbb.png' },
]

function getComponentImage(item, subProductName, categoryName) {
  const searchStr = `${item.name || ''} ${item.part || ''} ${item.material || ''} ${item.category || ''} ${subProductName || ''}`
  for (const mapping of COMPONENT_IMAGE_MAP) {
    if (mapping.regex.test(searchStr)) {
      return mapping.img
    }
  }

  // Fallbacks based on category/parent
  if (categoryName && categoryName.toLowerCase().includes('motorcycle')) {
    return '/assets/parts/engine_crankshaft.png'
  }
  if (categoryName && categoryName.toLowerCase().includes('e-bike')) {
    return '/assets/clean_product_images/ebike_motor_main.png'
  }
  return '/assets/parts/O-Rings.png'
}

export default function VisualComponentShowcase({ specs = [], subProductName = '', categoryName = '', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'
  const [selectedSpec, setSelectedSpec] = useState(null)

  // Derive unique categories from specs if available
  const availableCategories = useMemo(() => {
    const cats = new Set(['All'])
    specs.forEach((item) => {
      if (item.category) cats.add(item.category)
      else if (item.material) cats.add(item.material.split(' ')[0])
    })
    return Array.from(cats)
  }, [specs])

  // Filter specs based on search and category tab
  const filteredSpecs = useMemo(() => {
    return specs.filter((item) => {
      const matchSearch =
        !searchTerm ||
        (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.part && item.part.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.material && item.material.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchFilter =
        selectedFilter === 'All' ||
        item.category === selectedFilter ||
        (item.material && item.material.startsWith(selectedFilter))

      return matchSearch && matchFilter
    })
  }, [specs, searchTerm, selectedFilter])

  const handleQuoteClick = (item) => {
    try {
      sessionStorage.setItem('preferredPartInquiry', JSON.stringify({
        part: item.part,
        name: item.name || item.material,
        subProduct: subProductName,
        category: categoryName,
        moq: item.moq
      }))
    } catch {
      // Storage fallback
    }
    if (onNavigate) {
      onNavigate('Contact Us')
    }
  }

  return (
    <div className="mt-10 pt-8 border-t border-[#e2effa]">
      {/* Header bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full inline-block" />
            <h4 className="font-extrabold text-[#005691] text-xl sm:text-2xl tracking-tight">
              Visual Component & Spare Parts Catalogue
            </h4>
            <span className="ml-2 px-2.5 py-0.5 bg-[#005691]/10 text-[#005691] font-bold text-xs rounded-full">
              {filteredSpecs.length} of {specs.length} Items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#505f76]">
            Every sub-component photographed with export specifications, material grade, and MOQ.
          </p>
        </div>

        {/* View Toggle & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search part name, code..."
              className="w-full pl-9 pr-3 py-2 bg-[#f4f7fa] border border-[#c5c6cd] rounded-xl text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#005691] focus:bg-white transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Toggle View Mode */}
          <div className="flex items-center bg-[#f4f7fa] border border-[#c5c6cd] rounded-xl p-1">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-[#005691] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Visual Cards View"
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
              <span className="hidden sm:inline">Visual Cards</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-[#005691] shadow-xs'
                  : 'text-gray-500 hover:text-gray-800'
              }`}
              title="Technical Table View"
            >
              <span className="material-symbols-outlined text-base">table_rows</span>
              <span className="hidden sm:inline">Spec Table</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Tabs if multiple categories exist */}
      {availableCategories.length > 2 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedFilter === cat
                  ? 'bg-[#005691] text-white shadow-sm'
                  : 'bg-white border border-[#c5c6cd] text-[#505f76] hover:border-[#005691] hover:text-[#005691]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* ── VIEW MODE 1: VISUAL CARD GRID ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSpecs.map((item, idx) => {
            const itemImg = getComponentImage(item, subProductName, categoryName)
            return (
              <div
                key={idx}
                className="bg-white border border-[#cbe3f7] rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[11px] font-bold text-[#005691] bg-[#e6f1fb] px-2.5 py-1 rounded-md border border-[#cbe3f7]">
                      {item.part || `ATI-PART-${idx + 101}`}
                    </span>
                    {item.category && (
                      <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[120px]">
                        {item.category}
                      </span>
                    )}
                  </div>

                  {/* Component Picture Frame with Hover Zoom */}
                  <div 
                    onClick={() => setSelectedSpec({ item, img: itemImg })}
                    className="relative w-full h-36 bg-gradient-to-b from-gray-50 to-white rounded-xl border border-gray-100 p-3 mb-3 flex items-center justify-center overflow-hidden cursor-pointer"
                  >
                    <img
                      src={itemImg}
                      alt={item.name || item.material || 'Part thumbnail'}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md group-hover:scale-115 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        e.target.src = '/assets/parts/engine_crankshaft.png'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-[#005691]/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-lg transition-opacity duration-300 flex items-center gap-1 backdrop-blur-xs">
                        <span className="material-symbols-outlined text-xs">zoom_in</span>
                        Inspect
                      </span>
                    </div>
                  </div>

                  {/* Part Title */}
                  <h5 className="font-bold text-gray-900 text-sm mb-2 group-hover:text-[#005691] transition-colors line-clamp-2">
                    {item.name || item.material}
                  </h5>

                  {/* Quick Specs Pills */}
                  <div className="space-y-1.5 text-xs text-[#505f76] mb-4">
                    {item.material && (
                      <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1 rounded-md">
                        <span className="text-gray-400 text-[11px]">Material:</span>
                        <span className="font-semibold text-gray-800 text-[11px] truncate max-w-[140px]">{item.material}</span>
                      </div>
                    )}
                    {item.dim && (
                      <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1 rounded-md font-mono">
                        <span className="text-gray-400 text-[11px]">Size / Fit:</span>
                        <span className="font-semibold text-gray-800 text-[11px] truncate max-w-[140px]">{item.dim}</span>
                      </div>
                    )}
                    {item.temp && (
                      <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1 rounded-md">
                        <span className="text-gray-400 text-[11px]">Temp:</span>
                        <span className="font-semibold text-amber-700 text-[11px]">{item.temp}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Card Action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div className="text-[11px] text-gray-500">
                    MOQ: <strong className="text-gray-900 font-bold">{item.moq || '500'} PCS</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuoteClick(item)}
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all hover:scale-105 active:scale-95 duration-200 flex items-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer"
                  >
                    <span>Quote</span>
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* ── VIEW MODE 2: SPECIFICATION TABLE WITH THUMBNAILS ── */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-[#c5c6cd] shadow-xs bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#005691] text-white uppercase text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-3 font-bold text-center w-16">Preview</th>
                <th className="py-3.5 px-4 font-bold">Part Code</th>
                <th className="py-3.5 px-4 font-bold">Component Name</th>
                <th className="py-3.5 px-4 font-bold">Material Grade</th>
                <th className="py-3.5 px-4 font-bold">Dimensions</th>
                <th className="py-3.5 px-4 font-bold">Operating Temp</th>
                <th className="py-3.5 px-4 font-bold text-right">MOQ</th>
                <th className="py-3.5 px-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSpecs.map((item, idx) => {
                const itemImg = getComponentImage(item, subProductName, categoryName)
                return (
                  <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-2.5 px-3 text-center">
                      <div 
                        onClick={() => setSelectedSpec({ item, img: itemImg })}
                        className="w-12 h-12 mx-auto rounded-lg bg-gray-50 border border-gray-200 p-1 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
                      >
                        <img
                          src={itemImg}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => { e.target.src = '/assets/parts/engine_crankshaft.png' }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#005691] whitespace-nowrap">
                      {item.part || `ATI-PART-${idx + 101}`}
                    </td>
                    <td className="py-3 px-4 text-gray-900 font-bold whitespace-nowrap">
                      {item.name || item.material}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-xs">
                      {item.material || 'Standard Alloy / Elastomer'}
                    </td>
                    <td className="py-3 px-4 font-mono text-xs text-gray-600 whitespace-nowrap">
                      {item.dim || 'OEM Fit'}
                    </td>
                    <td className="py-3 px-4 text-xs text-amber-700 whitespace-nowrap font-medium">
                      {item.temp || 'Standard'}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-gray-900 whitespace-nowrap">
                      {item.moq || '500'} PCS
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => handleQuoteClick(item)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                      >
                        Request Quote
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MODAL: HIGH RESOLUTION COMPONENT INSPECTION ── */}
      {selectedSpec && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setSelectedSpec(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-gray-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedSpec(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors text-sm font-bold"
            >
              ✕
            </button>

            <span className="font-mono text-xs font-bold text-[#005691] bg-[#e6f1fb] px-3 py-1 rounded-md border border-[#cbe3f7]">
              {selectedSpec.item.part || 'ATI Verified Component'}
            </span>
            <h4 className="text-xl font-extrabold text-gray-900 mt-2 mb-4">
              {selectedSpec.item.name || selectedSpec.item.material}
            </h4>

            <div className="w-full h-56 bg-gradient-to-b from-gray-50 to-white rounded-2xl border border-gray-200 p-4 flex items-center justify-center mb-5">
              <img
                src={selectedSpec.img}
                alt={selectedSpec.item.name}
                className="max-h-full max-w-full object-contain filter drop-shadow-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs mb-6">
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Material</span>
                <span className="font-semibold text-gray-800">{selectedSpec.item.material || 'Standard Alloy'}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Dimensions</span>
                <span className="font-semibold text-gray-800 font-mono">{selectedSpec.item.dim || 'OEM Fit'}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Temp Range</span>
                <span className="font-semibold text-amber-700">{selectedSpec.item.temp || 'N/A'}</span>
              </div>
              <div className="p-2.5 bg-gray-50 rounded-xl">
                <span className="text-gray-400 block text-[10px] uppercase font-bold">Standard MOQ</span>
                <span className="font-semibold text-gray-800">{selectedSpec.item.moq || '500'} PCS</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => {
                  setSelectedSpec(null)
                  handleQuoteClick(selectedSpec.item)
                }}
                className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold py-3 px-4 rounded-xl text-xs uppercase tracking-wider transition-all hover:scale-105 active:scale-95 shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Request Quote for this Item</span>
                <span className="material-symbols-outlined text-sm">north_east</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
