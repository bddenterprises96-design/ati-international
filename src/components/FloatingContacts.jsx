import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function FloatingContacts() {
  const [showWeChat, setShowWeChat] = useState(false)
  const [showCart, setShowCart] = useState(false)
  const [selectedParts, setSelectedParts] = useState([])
  const [totalItems, setTotalItems] = useState(0)
  const [totalParts, setTotalParts] = useState(0)
  const [category, setCategory] = useState('Selected Items')
  const [motorcycleItems, setMotorcycleItems] = useState([])
  const [ebikeItems, setEbikeItems] = useState([])
  const [motorcycleCount, setMotorcycleCount] = useState(0)
  const [ebikeCount, setEbikeCount] = useState(0)

  // Load selected parts from storage
  const loadSelectedParts = () => {
    console.log('🔄 [FloatingContacts] Loading selected parts...')
    try {
      let allParts = []
      let storedCategory = 'Selected Items'
      
      // Try to load from tab-specific keys first (new format)
      const motorcycleKey = 'selectedParts_motorcycle'
      const ebikeKey = 'selectedParts_e-bike'
      const motorcycleCategoryKey = 'productCategory_motorcycle'
      const ebikeCategoryKey = 'productCategory_e-bike'
      
      const motorcycleData = localStorage.getItem(motorcycleKey) || sessionStorage.getItem(motorcycleKey)
      const ebikeData = localStorage.getItem(ebikeKey) || sessionStorage.getItem(ebikeKey)
      
      console.log('📦 [FloatingContacts] Motorcycle data:', motorcycleData)
      console.log('📦 [FloatingContacts] E-Bike data:', ebikeData)
      
      // Load motorcycle parts
      if (motorcycleData) {
        const parsed = JSON.parse(motorcycleData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          allParts = [...allParts, ...parsed]
          storedCategory = localStorage.getItem(motorcycleCategoryKey) || sessionStorage.getItem(motorcycleCategoryKey) || 'Motorcycle Parts'
          console.log('✅ [FloatingContacts] Loaded motorcycle parts:', parsed.length)
        }
      }
      
      // Load e-bike parts
      if (ebikeData) {
        const parsed = JSON.parse(ebikeData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          allParts = [...allParts, ...parsed]
          if (!storedCategory || storedCategory === 'Selected Items') {
            storedCategory = localStorage.getItem(ebikeCategoryKey) || sessionStorage.getItem(ebikeCategoryKey) || 'E-Bike Parts'
          } else {
            storedCategory = 'Motorcycle & E-Bike Parts'
          }
          console.log('✅ [FloatingContacts] Loaded e-bike parts:', parsed.length)
        }
      }
      
      // If no tab-specific data, try old format
      if (allParts.length === 0) {
        const oldData = localStorage.getItem('selectedParts') || sessionStorage.getItem('selectedParts')
        if (oldData) {
          const parsed = JSON.parse(oldData)
          if (Array.isArray(parsed) && parsed.length > 0) {
            allParts = parsed
            storedCategory = localStorage.getItem('productCategory') || sessionStorage.getItem('productCategory') || 'Selected Items'
            console.log('✅ [FloatingContacts] Loaded from old format:', parsed.length)
          }
        }
      }
      
      console.log('📦 [FloatingContacts] Total parts loaded:', allParts.length)
      
      if (allParts.length > 0) {
        setSelectedParts(allParts)
        setCategory(storedCategory)
        
        // Separate motorcycle and e-bike items based on category
        const motorcycle = allParts.filter(p => p.category && (
          p.category === 'Engine Parts' || p.category === 'Transmission & Clutch' || 
          p.category === 'Fuel System' || p.category === 'Air Intake System' ||
          p.category === 'Exhaust System' || p.category === 'Cooling System' ||
          p.category === 'Brake System' || p.category === 'Suspension & Steering' ||
          p.category === 'Wheels & Tires' || p.category === 'Chain Drive' ||
          p.category === 'Electrical Parts' || p.category === 'Lighting' ||
          p.category === 'Controls' || p.category === 'Body Parts' ||
          p.category === 'Rubber & Sealing Components' || p.category === 'Accessories'
        ))
        
        const ebike = allParts.filter(p => p.category && (
          p.category === 'Electric Drive System' || p.category === 'Battery System' ||
          p.category === 'Electrical Components' || p.category === 'Drivetrain' ||
          p.category === 'Suspension & Steering' || p.category === 'Frame & Body Parts' ||
          p.category === 'Lighting & Safety' || p.category === 'Fasteners & Hardware' ||
          p.category === 'E-Bike Accessories'
        ))
        
        // Also catch any that might have been mis-categorized
        const remaining = allParts.filter(p => 
          !motorcycle.includes(p) && !ebike.includes(p)
        )
        
        // If there are remaining items, try to guess their category
        remaining.forEach(p => {
          if (p.category && p.category.includes('Motorcycle')) {
            motorcycle.push(p)
          } else if (p.category && p.category.includes('E-Bike')) {
            ebike.push(p)
          } else {
            // Default to motorcycle if we can't determine
            motorcycle.push(p)
          }
        })
        
        setMotorcycleItems(motorcycle)
        setEbikeItems(ebike)
        
        // Calculate counts
        let mCount = 0
        motorcycle.forEach(part => {
          if (part.selectedBrands && part.selectedBrands.length > 0) {
            mCount += part.selectedBrands.length
          }
        })
        setMotorcycleCount(mCount)
        
        let eCount = 0
        ebike.forEach(part => {
          if (part.selectedBrands && part.selectedBrands.length > 0) {
            eCount += part.selectedBrands.length
          }
        })
        setEbikeCount(eCount)
        
        // Calculate total items
        let count = 0
        let partsCount = 0
        allParts.forEach(part => {
          if (part.selectedBrands && part.selectedBrands.length > 0) {
            count += part.selectedBrands.length
            partsCount++
          }
        })
        setTotalItems(count)
        setTotalParts(partsCount)
        console.log('✅ [FloatingContacts] Loaded:', allParts.length, 'parts,', count, 'total items')
      } else {
        console.log('⚠️ [FloatingContacts] No parts found')
        setSelectedParts([])
        setTotalItems(0)
        setTotalParts(0)
        setCategory('Selected Items')
        setMotorcycleItems([])
        setEbikeItems([])
        setMotorcycleCount(0)
        setEbikeCount(0)
      }
    } catch (err) {
      console.error('❌ [FloatingContacts] Failed to load selected parts:', err)
      setSelectedParts([])
      setTotalItems(0)
      setTotalParts(0)
      setMotorcycleItems([])
      setEbikeItems([])
      setMotorcycleCount(0)
      setEbikeCount(0)
    }
  }

  useEffect(() => {
    // Initial load
    loadSelectedParts()
    
    // Listen for updates - multiple event types for reliability
    const handleUpdate = () => {
      console.log('🔄 [FloatingContacts] Update event triggered')
      loadSelectedParts()
    }
    
    window.addEventListener('selectedPartsUpdated', handleUpdate)
    window.addEventListener('storage', handleUpdate)
    window.addEventListener('focus', handleUpdate)
    
    // Also listen for custom navigation events
    const handleNavigate = (e) => {
      if (e.detail?.page === 'Products') {
        setTimeout(loadSelectedParts, 100)
      }
    }
    window.addEventListener('navigateTo', handleNavigate)
    
    return () => {
      window.removeEventListener('selectedPartsUpdated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
      window.removeEventListener('focus', handleUpdate)
      window.removeEventListener('navigateTo', handleNavigate)
    }
  }, [])

  // Get flattened parts with brands for a specific category
  const getFlattenedPartsForCategory = (parts) => {
    const flattened = []
    parts.forEach(part => {
      const brands = part.selectedBrands || []
      if (brands.length === 0) {
        flattened.push({
          ...part,
          brand: null,
          displayName: part.name
        })
      } else {
        brands.forEach(brand => {
          flattened.push({
            ...part,
            brand: brand,
            displayName: `${part.name} (${brand})`
          })
        })
      }
    })
    return flattened
  }

  const flattenedMotorcycle = getFlattenedPartsForCategory(motorcycleItems)
  const flattenedEbike = getFlattenedPartsForCategory(ebikeItems)

  // Navigate to Products page
  const navigateToProducts = () => {
    setShowCart(false)
    const productsLink = document.querySelector('a[href="/products"], button[data-page="Products"]')
    if (productsLink) {
      productsLink.click()
    } else {
      window.dispatchEvent(new CustomEvent('navigateTo', { detail: { page: 'Products' } }))
    }
  }

  // Navigate to Contact Us page
  const navigateToContactUs = () => {
    setShowCart(false)
    console.log('🔍 [FloatingContacts] Navigating to Contact Us...')
    
    const contactLink = document.querySelector('a[href="/contact"], button[data-page="Contact Us"], a[href="/contact-us"]')
    if (contactLink) {
      console.log('🔍 [FloatingContacts] Found Contact Us link, clicking...')
      contactLink.click()
      return
    }
    
    const allButtons = document.querySelectorAll('button, a')
    for (const el of allButtons) {
      if (el.textContent && el.textContent.toLowerCase().includes('contact')) {
        console.log('🔍 [FloatingContacts] Found Contact button by text, clicking...')
        el.click()
        return
      }
    }
    
    console.log('🔍 [FloatingContacts] Dispatching navigateTo event...')
    window.dispatchEvent(new CustomEvent('navigateTo', { detail: { page: 'Contact Us' } }))
    window.location.href = '/contact'
  }

  // Handle removing a part
  const handleRemovePart = (partName) => {
    // Check which tab this part belongs to
    const isMotorcycle = motorcycleItems.some(p => p.name === partName)
    const isEbike = ebikeItems.some(p => p.name === partName)
    
    const updated = selectedParts.filter((p) => p.name !== partName)
    setSelectedParts(updated)
    
    // Save back to the appropriate storage
    if (isMotorcycle) {
      const motorParts = updated.filter(p => 
        motorcycleItems.some(m => m.name === p.name)
      )
      localStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts))
      sessionStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts))
    } else if (isEbike) {
      const ebikeParts = updated.filter(p => 
        ebikeItems.some(e => e.name === p.name)
      )
      localStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts))
      sessionStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts))
    }
    
    window.dispatchEvent(new Event('selectedPartsUpdated'))
    loadSelectedParts()
  }

  // Handle clearing all parts
  const handleClearAll = () => {
    setSelectedParts([])
    setTotalItems(0)
    setTotalParts(0)
    setMotorcycleItems([])
    setEbikeItems([])
    setMotorcycleCount(0)
    setEbikeCount(0)
    
    // Clear all storage keys
    localStorage.removeItem('selectedParts')
    localStorage.removeItem('selectedParts_motorcycle')
    localStorage.removeItem('selectedParts_e-bike')
    localStorage.removeItem('productCategory')
    localStorage.removeItem('productCategory_motorcycle')
    localStorage.removeItem('productCategory_e-bike')
    localStorage.removeItem('selectedBrandsByCategory')
    
    sessionStorage.removeItem('selectedParts')
    sessionStorage.removeItem('selectedParts_motorcycle')
    sessionStorage.removeItem('selectedParts_e-bike')
    sessionStorage.removeItem('productCategory')
    sessionStorage.removeItem('productCategory_motorcycle')
    sessionStorage.removeItem('productCategory_e-bike')
    sessionStorage.removeItem('selectedBrandsByCategory')
    
    window.dispatchEvent(new Event('selectedPartsUpdated'))
  }

  // Render a segment of items with colored header
  const renderSegment = (title, items, icon, count, bgColor, textColor, borderColor) => {
    if (items.length === 0) return null
    
    return (
      <div className="mb-4">
        <div className={`flex items-center gap-2 mb-2 px-3 py-2 rounded-lg ${bgColor} border ${borderColor}`}>
          <span className="text-lg">{icon}</span>
          <h3 className={`font-semibold ${textColor} text-sm`}>{title}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full ${bgColor} ${textColor} border ${borderColor} ml-auto`}>
            {count} items
          </span>
        </div>
        <div className="space-y-1">
          {items.map((item, idx) => (
            <div key={`${item.name}-${item.brand || 'no-brand'}-${idx}`} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-50/50 border-b border-gray-100">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="w-6 h-6 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{item.name}</span>
                  <span className="text-xs text-gray-400 font-mono">{item.partNo}</span>
                  {item.brand && (
                    <span className="text-xs bg-[#005691]/10 text-[#005691] px-2 py-0.5 rounded-full font-medium">
                      {item.brand}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleRemovePart(item.name)}
                  className="text-gray-400 hover:text-red-500 transition-all p-1"
                  title="Remove this part"
                >
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
              </div>
              <div className="px-4 py-2 flex items-center gap-4 text-xs text-gray-400">
                <span>MOQ: {item.moq || 'N/A'}</span>
                {item.brand && (
                  <span className="text-green-600 font-medium">✓ Brand selected</span>
                )}
                {item.category && (
                  <span className="text-blue-600">Category: {item.category}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">

      {/* Cart Popup - Review Order Box */}
      {showCart && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col animate-modalFade" onClick={e => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-[#005691] to-[#0077be] rounded-t-2xl px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-white text-2xl">shopping_cart</span>
                <div>
                  <h2 className="text-white font-bold text-lg">Review Order</h2>
                  <p className="text-white/70 text-sm">{category} ({totalItems} total items)</p>
                </div>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all hover:rotate-90 duration-300"
              >
                <span className="material-symbols-outlined text-white text-lg">close</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {flattenedMotorcycle.length > 0 || flattenedEbike.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex gap-2">
                      <button
                        onClick={handleClearAll}
                        className="text-xs text-gray-500 hover:text-red-600 font-medium px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                      >
                        Clear All
                      </button>
                    </div>
                    <span className="text-xs text-gray-500">
                      <span className="font-semibold text-[#005691]">{totalItems}</span> items selected
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                      <div className="text-2xl font-bold text-[#005691]">{totalParts}</div>
                      <div className="text-xs text-gray-500">Parts with Brands</div>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                      <div className="text-2xl font-bold text-green-600">{selectedParts.length}</div>
                      <div className="text-xs text-gray-500">Total Parts</div>
                    </div>
                    <div className="bg-yellow-50 rounded-xl p-4 text-center border border-yellow-100">
                      <div className="text-2xl font-bold text-yellow-600">{totalItems}</div>
                      <div className="text-xs text-gray-500">Total Items</div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-700">Selected Items</span>
                      <span className="text-xs text-gray-400">{totalItems} items</span>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-3">
                      {/* Motorcycle Segment - Orange Theme */}
                      {renderSegment(
                        'Motorcycle Parts', 
                        flattenedMotorcycle, 
                        '🏍️', 
                        motorcycleCount,
                        'bg-orange-50',
                        'text-orange-700',
                        'border-orange-200'
                      )}
                      
                      {/* E-Bike Segment - Green Theme */}
                      {renderSegment(
                        'E-Bike Parts', 
                        flattenedEbike, 
                        '⚡', 
                        ebikeCount,
                        'bg-emerald-50',
                        'text-emerald-700',
                        'border-emerald-200'
                      )}
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-[#005691]">{selectedParts.length}</span> part{selectedParts.length > 1 ? 's' : ''} · 
                      {motorcycleCount > 0 && (
                        <span className="ml-1">🏍️ <span className="font-semibold text-orange-600">{motorcycleCount}</span> motorcycle</span>
                      )}
                      {motorcycleCount > 0 && ebikeCount > 0 && <span className="mx-1">·</span>}
                      {ebikeCount > 0 && (
                        <span className="ml-1">⚡ <span className="font-semibold text-emerald-600">{ebikeCount}</span> e-bike</span>
                      )}
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <span className="material-symbols-outlined text-6xl text-gray-300 block mx-auto mb-4">shopping_bag</span>
                  <p className="text-gray-500 text-lg">No items selected</p>
                  <p className="text-gray-400 text-sm mt-1">Select parts and brands from the Products page</p>
                  <button
                    onClick={navigateToProducts}
                    className="mt-4 bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 mx-auto hover:scale-105 duration-200"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Go to Products
                  </button>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-between bg-gray-50 rounded-b-2xl">
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 transition-all flex items-center gap-2 text-sm font-medium"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Close
              </button>
              <div className="flex gap-3">
                {(flattenedMotorcycle.length > 0 || flattenedEbike.length > 0) && (
                  <>
                    <button
                      onClick={handleClearAll}
                      className="text-sm text-red-500 hover:text-red-700 transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">clear</span>
                      Clear All
                    </button>
                    <button
                      onClick={navigateToContactUs}
                      className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110 transition-all flex items-center gap-2 hover:scale-105 duration-200"
                    >
                      <span className="material-symbols-outlined text-sm">request_quote</span>
                      Proceed to Quote ({totalItems} items)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Basket/Cart Button */}
      <button
        onClick={() => {
          console.log('🛒 [FloatingContacts] Basket clicked, loading parts...')
          loadSelectedParts()
          setShowCart(true)
        }}
        title="Review Order"
        className="relative w-14 h-14 rounded-lg bg-[#005691] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl">shopping_cart</span>
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-yellow-400 text-gray-800 text-xs font-bold flex items-center justify-center border-2 border-white animate-pulse">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      {/* WeChat Popup */}
      {showWeChat && (
        <div className="bg-white border border-[#c5c6cd] rounded-xl shadow-2xl p-5 w-52 text-center mb-2 animate-fadeInUp">
          <div className="font-bold text-[#005691] text-sm mb-2">Scan to Add on WeChat</div>
            <div className="w-32 h-32 bg-[#f2f4f6] border border-[#c5c6cd] rounded-lg mx-auto flex items-center justify-center overflow-hidden">
              <img
                src="/assets/wechat.jpeg"
                alt="WeChat QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          <button
            onClick={() => setShowWeChat(false)}
            className="mt-3 text-xs text-[#505f76] hover:text-[#005691]"
          >
            Close
          </button>
        </div>
      )}

      {/* WeChat Button - Real App Icon */}
      <button
        onClick={() => setShowWeChat(!showWeChat)}
        title="WeChat"
        className="w-14 h-14 rounded-lg bg-[#07C160] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.5 2C4.364 2 1 4.998 1 8.5c0 1.816.905 3.459 2.337 4.545a.5.5 0 0 1 .181.56l-.318 1.174a.25.25 0 0 0 .386.267l1.66-.97a.5.5 0 0 1 .412-.064 8.3 8.3 0 0 0 2.342.336c.177 0 .352-.008.526-.022-.507-1.583.153-3.142 1.258-4.123 1.291-1.147 3.07-1.615 4.715-1.481C13.416 4.985 10.982 2 8.5 2zM5.5 5.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm4.5 2.5c-2.69 0-5 2.014-5 4.5s2.31 4.5 5 4.5c.805 0 1.572-.17 2.254-.478a.5.5 0 0 1 .497.049l1.358.793a.25.25 0 0 0 .386-.267l-.349-1.29a.5.5 0 0 1 .096-.483C19.597 14.322 20 12.938 20 12c0-2.486-2.31-4.5-5-4.5zM11.5 12.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0zm4 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0z"/>
        </svg>
      </button>

      {/* WhatsApp Button - Square Shape */}
      <a
        href="https://wa.me/+8618523210975"
        target="_blank"
        rel="noreferrer"
        title="WhatsApp"
        className="w-14 h-14 rounded-lg bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform"
      >
        <svg width="30" height="30" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.813.729 5.463 2.006 7.769L0 32l8.48-2.218A15.934 15.934 0 0016 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm0 29.333a13.29 13.29 0 01-6.777-1.856l-.486-.29-5.03 1.316 1.34-4.897-.317-.502A13.29 13.29 0 012.667 16C2.667 8.636 8.636 2.667 16 2.667S29.333 8.636 29.333 16 23.364 29.333 16 29.333zm7.293-9.946c-.4-.2-2.368-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.686-.621-3.21-1.978-1.186-1.057-1.987-2.363-2.22-2.763-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.779-.656-.674-.9-.686-.233-.013-.5-.016-.767-.016-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.831.262 2.52.159.769-.115 2.368-.967 2.701-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z"/>
        </svg>
      </a>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes modalFade {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.25s ease-out forwards;
        }
        .animate-modalFade {
          animation: modalFade 0.3s ease-out forwards;
        }
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}