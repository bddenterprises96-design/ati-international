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
      
      // Check basketItems / selectedParts first (canonical real-time cart data)
      const cartData = localStorage.getItem('basketItems') || sessionStorage.getItem('basketItems') ||
                       localStorage.getItem('selectedParts') || sessionStorage.getItem('selectedParts')
      
      if (cartData) {
        const parsed = JSON.parse(cartData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          allParts = parsed
          storedCategory = localStorage.getItem('productCategory') || sessionStorage.getItem('productCategory') || 'Selected Items'
          console.log('✅ [FloatingContacts] Loaded from cartData:', parsed.length)
        }
      }
      
      // Fallback to tab-specific keys if cartData is empty
      if (allParts.length === 0) {
        const motorcycleKey = 'selectedParts_motorcycle'
        const ebikeKey = 'selectedParts_e-bike'
        const motorcycleData = localStorage.getItem(motorcycleKey) || sessionStorage.getItem(motorcycleKey)
        const ebikeData = localStorage.getItem(ebikeKey) || sessionStorage.getItem(ebikeKey)
        
        if (motorcycleData) {
          const parsed = JSON.parse(motorcycleData)
          if (Array.isArray(parsed) && parsed.length > 0) {
            allParts = [...allParts, ...parsed]
          }
        }
        if (ebikeData) {
          const parsed = JSON.parse(ebikeData)
          if (Array.isArray(parsed) && parsed.length > 0) {
            allParts = [...allParts, ...parsed]
          }
        }
      }
      
      console.log('📦 [FloatingContacts] Total parts loaded:', allParts.length)
      
      if (allParts.length > 0) {
        setSelectedParts(allParts)
        setCategory(storedCategory)
        
        // Calculate motorcycle & ebike categories
        const motorcycle = allParts.filter(p => !p.category || !p.category.toLowerCase().includes('e-bike'))
        const ebike = allParts.filter(p => p.category && p.category.toLowerCase().includes('e-bike'))
        
        setMotorcycleItems(motorcycle)
        setEbikeItems(ebike)
        
        // Calculate model / brand counts
        let mCount = 0
        motorcycle.forEach(part => {
          if (part.selectedModels && part.selectedModels.length > 0) {
            mCount += part.selectedModels.length
          } else if (part.selectedBrands && part.selectedBrands.length > 0) {
            mCount += part.selectedBrands.length
          }
        })
        setMotorcycleCount(mCount)
        
        let eCount = 0
        ebike.forEach(part => {
          if (part.selectedModels && part.selectedModels.length > 0) {
            eCount += part.selectedModels.length
          } else if (part.selectedBrands && part.selectedBrands.length > 0) {
            eCount += part.selectedBrands.length
          }
        })
        setEbikeCount(eCount)
        
        // Calculate total items (sum of selected models across all parts)
        let totalModelItems = 0
        allParts.forEach(part => {
          if (part.selectedModels && part.selectedModels.length > 0) {
            totalModelItems += part.selectedModels.length
          } else if (part.selectedBrands && part.selectedBrands.length > 0) {
            totalModelItems += part.selectedBrands.length
          }
        })
        
        setTotalItems(totalModelItems)
        setTotalParts(allParts.length)
        console.log('✅ [FloatingContacts] Loaded:', allParts.length, 'parts,', totalModelItems, 'total items')
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

  // Save updated parts to storage
  const saveUpdatedPartsToStorage = (updatedParts) => {
    try {
      localStorage.setItem('selectedParts', JSON.stringify(updatedParts))
      localStorage.setItem('basketItems', JSON.stringify(updatedParts))
      sessionStorage.setItem('selectedParts', JSON.stringify(updatedParts))
      sessionStorage.setItem('basketItems', JSON.stringify(updatedParts))

      const motorParts = updatedParts.filter(p => 
        !p.category || !p.category.toLowerCase().includes('e-bike')
      )
      const ebikeParts = updatedParts.filter(p => 
        p.category && p.category.toLowerCase().includes('e-bike')
      )

      if (motorParts.length > 0) {
        localStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts))
        sessionStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts))
      }
      if (ebikeParts.length > 0) {
        localStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts))
        sessionStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts))
      }

      window.dispatchEvent(new Event('selectedPartsUpdated'))
    } catch (err) {
      console.error('Failed to save updated parts:', err)
    }
  }

  // Handle removing a part (supports both partName and cartItemId)
  const handleRemovePart = (identifier, index) => {
    // Check if called with partName (string) or cartItemId (any)
    const isPartName = typeof identifier === 'string';
    const partName = isPartName ? identifier : null;
    const cartItemId = !isPartName ? identifier : null;
    
    // For partName removal (from segment view)
    if (isPartName) {
      // Check which tab this part belongs to
      const isMotorcycle = motorcycleItems.some(p => p.name === partName);
      const isEbike = ebikeItems.some(p => p.name === partName);
      
      const updated = selectedParts.filter((p) => p.name !== partName);
      setSelectedParts(updated);
      
      // Save back to the appropriate storage
      if (isMotorcycle) {
        const motorParts = updated.filter(p => 
          motorcycleItems.some(m => m.name === p.name)
        );
        localStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts));
        sessionStorage.setItem('selectedParts_motorcycle', JSON.stringify(motorParts));
      } else if (isEbike) {
        const ebikeParts = updated.filter(p => 
          ebikeItems.some(e => e.name === p.name)
        );
        localStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts));
        sessionStorage.setItem('selectedParts_e-bike', JSON.stringify(ebikeParts));
      }
      
      window.dispatchEvent(new Event('selectedPartsUpdated'));
      loadSelectedParts();
    } 
    // For cart item removal (from cart popup)
    else {
      setSelectedParts(prev => {
        const updated = prev.filter((p, idx) => {
          if (p.cartItemId && cartItemId) return p.cartItemId !== cartItemId;
          return idx !== index;
        });
        saveUpdatedPartsToStorage(updated);
        return updated;
      });
    }
  };

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

  // Toggle model selection
  const toggleModelSelection = (cartItemId, idx, modelToRemove) => {
    setSelectedParts(prev => {
      const updated = prev.map((item, index) => {
        const isMatch = item.cartItemId ? item.cartItemId === cartItemId : index === idx;
        if (isMatch) {
          const currentModels = item.selectedModels || [];
          const updatedModels = currentModels.filter(m => m !== modelToRemove);
          return { ...item, selectedModels: updatedModels };
        }
        return item;
      }).filter(item => (item.selectedModels && item.selectedModels.length > 0) || (item.selectedBrands && item.selectedBrands.length > 0));
      saveUpdatedPartsToStorage(updated);
      return updated;
    });
  };

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

  // Default model presets for fallback
  const DEFAULT_MOTORCYCLE_MODELS = ['Honda CG125', 'Honda CD70', 'Yamaha YBR125', 'Suzuki GS150', 'Bajaj Pulsar 150', 'TVS Apache RTR 160', 'Hero Splendor Plus', 'Kawasaki Ninja 250']
  const DEFAULT_EBIKE_MODELS = ['Bafang M400 / M500 / M600', 'Bosch Performance Line CX', 'Shimano Steps E8000', 'Yamaha PW-X3', 'Ananda M230', 'TongSheng TSDZ2', 'Generic 250W-1000W Hub Motor']

  const getAvailableModelsForItem = (item) => {
    let baseModels = []
    if (item.applicableModels && item.applicableModels.length > 0) {
      baseModels = item.applicableModels
    } else if (item.category && item.category.toLowerCase().includes('e-bike')) {
      baseModels = DEFAULT_EBIKE_MODELS
    } else {
      baseModels = DEFAULT_MOTORCYCLE_MODELS
    }
    const currentSelected = item.selectedModels || []
    return [...new Set([...currentSelected, ...baseModels])]
  }

  const totalSelectedModels = selectedParts.reduce((sum, item) => sum + (item.selectedModels?.length || 0), 0)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">

      {/* Cart Popup - Review Order Box */}
      {showCart && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn" onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-modalFade" onClick={e => e.stopPropagation()}>
            
            {/* Header */}
            <div className="bg-gradient-to-r from-[#005691] via-[#004f87] to-[#003861] rounded-t-2xl px-6 py-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
                  <span className="material-symbols-outlined text-white text-xl">shopping_cart</span>
                </div>
                <div>
                  <h2 className="text-white font-bold text-lg leading-tight">Review Order & Selected Models</h2>
                  <p className="text-white/80 text-xs mt-0.5">{totalSelectedModels} selected model{totalSelectedModels !== 1 ? 's' : ''} across {selectedParts.length} part{selectedParts.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all hover:rotate-90 duration-300"
              >
                <span className="material-symbols-outlined text-white text-lg">close</span>
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-5 bg-gray-50 space-y-4">
              {selectedParts.length > 0 ? (
                selectedParts.map((item, idx) => {
                  const selectedModels = item.selectedModels || []

                  return (
                    <div key={item.cartItemId || `${item.name}-${idx}`} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:border-[#005691]/40 transition-colors">
                      
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
                            {selectedModels.length} model{selectedModels.length !== 1 ? 's' : ''} selected
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

                      {/* ONLY Selected Models Grid */}
                      <div className="p-4 bg-white">
                        <span className="text-xs font-bold text-gray-700 flex items-center gap-1.5 mb-2.5">
                          <span className="material-symbols-outlined text-sm text-[#005691]">check_circle</span>
                          Selected Models ({selectedModels.length}):
                        </span>

                        {selectedModels.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {selectedModels.map((model) => (
                              <div
                                key={model}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-[#005691] border border-blue-200 text-xs font-bold shadow-xs hover:border-[#005691] transition-all"
                              >
                                <span className="material-symbols-outlined text-xs text-[#005691]">check</span>
                                <span>{model}</span>
                                <button
                                  type="button"
                                  onClick={() => toggleModelSelection(item.cartItemId, idx, model)}
                                  className="text-gray-400 hover:text-red-500 ml-1 transition-colors flex items-center"
                                  title={`Remove ${model}`}
                                >
                                  <span className="material-symbols-outlined text-xs">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-400 italic">No specific models selected for this part</p>
                        )}
                      </div>

                    </div>
                  )
                })
              ) : (
                <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
                  <span className="material-symbols-outlined text-6xl text-gray-300 block mx-auto mb-4">shopping_bag</span>
                  <p className="text-gray-600 text-base font-bold">No items currently selected</p>
                  <p className="text-gray-400 text-xs mt-1">Select parts, brands and models from the Products page</p>
                  <button
                    onClick={navigateToProducts}
                    className="mt-4 bg-[#005691] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:brightness-110 transition-all flex items-center gap-2 mx-auto hover:scale-105 duration-200 shadow-md"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Browse Catalogue & Add Parts
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
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
                  onClick={() => setShowCart(false)}
                  className="text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 rounded-xl border border-gray-200"
                >
                  <span className="material-symbols-outlined text-sm">arrow_back</span>
                  Close
                </button>
                {selectedParts.length > 0 && (
                  <button
                    onClick={navigateToContactUs}
                    className="bg-[#005691] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#003e69] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-lg uppercase tracking-wider cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-base">request_quote</span>
                    Proceed to Quote ({totalSelectedModels} models)
                  </button>
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