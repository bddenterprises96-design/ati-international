import { useState, useMemo } from 'react'

/**
 * Component & Spare Parts Catalogue
 * Clean, technical specifications and parts list without uninstructed imagery.
 */

export default function VisualComponentShowcase({ specs = [], subProductName = '', categoryName = '', onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'

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
            <span className="w-2 h-6 bg-[#005691] rounded-full inline-block" />
            <h4 className="font-extrabold text-[#005691] text-xl sm:text-2xl tracking-tight">
              Component & Spare Parts Catalogue
            </h4>
            <span className="ml-2 px-2.5 py-0.5 bg-[#005691]/10 text-[#005691] font-bold text-xs rounded-full">
              {filteredSpecs.length} of {specs.length} Items
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#505f76]">
            Export specifications, material grade, dimensions, and MOQ for all sub-components.
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
                type="button"
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
              title="Cards View"
            >
              <span className="material-symbols-outlined text-base">grid_view</span>
              <span className="hidden sm:inline">Cards</span>
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

      {/* ── VIEW MODE 1: COMPACT TECHNICAL CARD GRID (NO IMAGES) ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredSpecs.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-[#cbe3f7] rounded-2xl p-4 flex flex-col justify-between shadow-xs hover:shadow-lg hover:border-[#005691] hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div>
                {/* Top Header Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#005691] bg-[#e6f1fb] px-2.5 py-1 rounded-md border border-[#cbe3f7]">
                    {item.part || `ATI-PART-${idx + 101}`}
                  </span>
                  {item.category && (
                    <span className="text-[11px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                      {item.category}
                    </span>
                  )}
                </div>

                {/* Part Title */}
                <h5 className="font-bold text-gray-900 text-sm mb-3 group-hover:text-[#005691] transition-colors line-clamp-2">
                  {item.name || item.material}
                </h5>

                {/* Quick Specs Pills */}
                <div className="space-y-1.5 text-xs text-[#505f76] mb-4">
                  {item.material && (
                    <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1.5 rounded-md">
                      <span className="text-gray-400 text-[11px]">Material:</span>
                      <span className="font-semibold text-gray-800 text-[11px] truncate max-w-[150px]">{item.material}</span>
                    </div>
                  )}
                  {item.dim && (
                    <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1.5 rounded-md font-mono">
                      <span className="text-gray-400 text-[11px]">Size / Fit:</span>
                      <span className="font-semibold text-gray-800 text-[11px] truncate max-w-[150px]">{item.dim}</span>
                    </div>
                  )}
                  {item.temp && (
                    <div className="flex items-center justify-between bg-[#f8fafc] px-2.5 py-1.5 rounded-md">
                      <span className="text-gray-400 text-[11px]">Temp:</span>
                      <span className="font-semibold text-amber-700 text-[11px]">{item.temp}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto">
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
          ))}
        </div>
      )}

      {/* ── VIEW MODE 2: SPECIFICATION TABLE (NO IMAGES) ── */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto rounded-2xl border border-[#c5c6cd] shadow-xs bg-white">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-[#005691] text-white uppercase text-[11px] tracking-wider">
              <tr>
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
              {filteredSpecs.map((item, idx) => (
                <tr key={idx} className="hover:bg-blue-50/40 transition-colors">
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
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-[11px] px-3.5 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-xs cursor-pointer"
                    >
                      Request Quote
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
