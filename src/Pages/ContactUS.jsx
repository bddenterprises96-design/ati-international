import { useState, useEffect } from 'react'

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://instagram.com/atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <defs>
          <radialGradient id="ig1" cx="19%" cy="99%" r="128%">
            <stop offset="0%" stopColor="#ffd676"/>
            <stop offset="25%" stopColor="#f2a454"/>
            <stop offset="50%" stopColor="#f05c35"/>
            <stop offset="75%" stopColor="#c62a8a"/>
            <stop offset="100%" stopColor="#6a35b5"/>
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ig1)"/>
        <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2.8" fill="none"/>
        <circle cx="33.5" cy="14.5" r="2" fill="white"/>
        <rect x="8" y="8" width="32" height="32" rx="9" stroke="white" strokeWidth="2.8" fill="none"/>
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://facebook.com/atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#1877F2"/>
        <path d="M32 8h-4a8 8 0 00-8 8v4h-4v6h4v14h6V26h4l1-6h-5v-4a2 2 0 012-2h3V8z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'WhatsApp',
    href: 'https://wa.me/8618523210975',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#25D366"/>
        <path d="M24 8C15.163 8 8 15.163 8 24c0 2.813.729 5.463 2.006 7.769L8 40l8.48-2.218A15.934 15.934 0 0024 40c8.837 0 16-7.163 16-16S32.837 8 24 8zm0 29.333a13.29 13.29 0 01-6.777-1.856l-.486-.29-5.03 1.316 1.34-4.897-.317-.502A13.29 13.29 0 0110.667 24C10.667 16.636 16.636 10.667 24 10.667S37.333 16.636 37.333 24 31.364 37.333 24 37.333zm7.293-9.946c-.4-.2-2.368-1.167-2.734-1.3-.367-.133-.633-.2-.9.2-.267.4-1.033 1.3-1.267 1.567-.233.267-.467.3-.867.1-.4-.2-1.686-.621-3.21-1.978-1.186-1.057-1.987-2.363-2.22-2.763-.233-.4-.025-.616.175-.816.18-.18.4-.467.6-.7.2-.233.267-.4.4-.667.133-.267.067-.5-.033-.7-.1-.2-.9-2.167-1.233-2.967-.325-.779-.656-.674-.9-.686l-.767-.016c-.267 0-.7.1-1.067.5-.367.4-1.4 1.367-1.4 3.333 0 1.967 1.433 3.867 1.633 4.133.2.267 2.82 4.307 6.833 6.033.955.412 1.7.658 2.28.842.958.305 1.831.262 2.52.159.769-.115 2.368-.967 2.701-1.9.333-.933.333-1.733.233-1.9-.1-.167-.367-.267-.767-.467z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'WeChat',
    href: 'https://weixin.qq.com/',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#07C160"/>
        <ellipse cx="18" cy="21" rx="9" ry="7" stroke="white" strokeWidth="2.5" fill="none"/>
        <ellipse cx="30" cy="25" rx="9" ry="7" stroke="white" strokeWidth="2.5" fill="none"/>
        <circle cx="15" cy="21" r="1.5" fill="white"/>
        <circle cx="21" cy="21" r="1.5" fill="white"/>
        <circle cx="27" cy="25" r="1.5" fill="white"/>
        <circle cx="33" cy="25" r="1.5" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#000000"/>
        <path d="M26.244 21.956L35.5 11h-2.18l-8.019 9.323L18.93 11H11.5l9.709 14.129L11.5 37h2.18l8.489-9.869L28.93 37h7.43L26.244 21.956zm-3.006 3.494l-.984-1.408L14.548 12.64h3.368l6.318 9.039.984 1.408 8.214 11.75h-3.368l-6.826-9.387z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#010101"/>
        <path d="M34.2 16.533a7.653 7.653 0 01-7.644-7.644V8h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V21.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V19.4a12.6 12.6 0 007.644 2.578V17a7.67 7.67 0 01-4-.467z" fill="white"/>
        <path d="M33.2 15.533a7.653 7.653 0 01-7.644-7.644V7h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V20.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V18.4a12.6 12.6 0 007.644 2.578V16a7.67 7.67 0 01-4-.467z" fill="#EE1D52" opacity="0.8"/>
        <path d="M35.2 17.533a7.653 7.653 0 01-7.644-7.644V9h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V22.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V20.4a12.6 12.6 0 007.644 2.578V18a7.67 7.67 0 01-4-.467z" fill="#69C9D0" opacity="0.8"/>
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#FF0000"/>
        <path d="M37.41 17.26a3.5 3.5 0 00-2.46-2.47C32.76 14.2 24 14.2 24 14.2s-8.76 0-10.95.59a3.5 3.5 0 00-2.46 2.47A36.26 36.26 0 0010 24a36.26 36.26 0 00.59 6.74 3.5 3.5 0 002.46 2.47C15.24 33.8 24 33.8 24 33.8s8.76 0 10.95-.59a3.5 3.5 0 002.46-2.47A36.26 36.26 0 0038 24a36.26 36.26 0 00-.59-6.74zM21.2 28.4V19.6l7.33 4.4-7.33 4.4z" fill="white"/>
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/atiinternational',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#0A66C2"/>
        <path d="M14 19h4v15h-4V19zm2-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 6h3.6v2h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 5 2.8 5 6.3V34h-4v-8c0-1.9 0-4.3-2.6-4.3-2.7 0-3.1 2.1-3.1 4.2V34h-3.9V19z" fill="white"/>
      </svg>
    ),
  },
]

const INQUIRY_MODES = [
  { id: 'standard', label: 'Catalog & Spare Parts Quote', icon: 'inventory_2' },
  { id: 'custom', label: 'Custom Drawing & CAD Request', icon: 'engineering' },
  { id: 'distribution', label: 'Distributor & Trade Inquiry', icon: 'handshake' },
]

const PRODUCT_CATEGORIES = [
  { id: 'Motorcycle Parts & Engine Components', label: 'Motorcycle Parts', icon: 'two_wheeler', tag: 'Valves, Pistons, Clutch' },
  { id: 'E-Bike Drive Systems & Electronics', label: 'E-Bike Components', icon: 'electric_bike', tag: 'Motors, Battery Seals' },
  { id: 'Industrial Sealing Solutions (Valve Stem Seals, O-Rings, Oil Seals)', label: 'Industrial Seals', icon: 'settings', tag: 'Valve Stem,Oil Seals, O Rings' },
  { id: 'Custom Sourcing to Technical Drawing', label: 'Request Custom Sourcing', icon: 'build', tag: 'Custom Specification Sourcing' },
]

export default function ContactUS({ onNavigate }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', product: '', quantity: '', message: ''
  })
  const [inquiryMode, setInquiryMode] = useState('standard')
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [copiedField, setCopiedField] = useState(null)

  // ── SELECTED PARTS FROM PRODUCTS PAGE ─────────────────────────
  const [selectedParts, setSelectedParts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [motorcycleItems, setMotorcycleItems] = useState([])
  const [ebikeItems, setEbikeItems] = useState([])
  const [motorcycleCount, setMotorcycleCount] = useState(0)
  const [ebikeCount, setEbikeCount] = useState(0)
  const [totalItems, setTotalItems] = useState(0)

  const loadSelectedParts = () => {
    try {
      let allParts = []
      let storedCategory = 'Selected Items'
      
      const motorcycleKey = 'selectedParts_motorcycle'
      const ebikeKey = 'selectedParts_e-bike'
      const motorcycleCategoryKey = 'productCategory_motorcycle'
      const ebikeCategoryKey = 'productCategory_e-bike'
      
      const motorcycleData = localStorage.getItem(motorcycleKey) || sessionStorage.getItem(motorcycleKey)
      const ebikeData = localStorage.getItem(ebikeKey) || sessionStorage.getItem(ebikeKey)
      
      if (motorcycleData) {
        const parsed = JSON.parse(motorcycleData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          allParts = [...allParts, ...parsed]
          storedCategory = localStorage.getItem(motorcycleCategoryKey) || sessionStorage.getItem(motorcycleCategoryKey) || 'Motorcycle Parts'
        }
      }
      
      if (ebikeData) {
        const parsed = JSON.parse(ebikeData)
        if (Array.isArray(parsed) && parsed.length > 0) {
          allParts = [...allParts, ...parsed]
          if (!storedCategory || storedCategory === 'Selected Items') {
            storedCategory = localStorage.getItem(ebikeCategoryKey) || sessionStorage.getItem(ebikeCategoryKey) || 'E-Bike Parts'
          } else {
            storedCategory = 'Motorcycle & E-Bike Parts'
          }
        }
      }
      
      if (allParts.length === 0) {
        const oldData = localStorage.getItem('selectedParts') || sessionStorage.getItem('selectedParts')
        if (oldData) {
          const parsed = JSON.parse(oldData)
          if (Array.isArray(parsed) && parsed.length > 0) {
            allParts = parsed
            storedCategory = localStorage.getItem('productCategory') || sessionStorage.getItem('productCategory') || 'Selected Items'
          }
        }
      }
      
      if (allParts.length > 0) {
        setSelectedParts(allParts)
        setSelectedCategory(storedCategory)
        setForm((prev) => ({ ...prev, product: storedCategory }))
        
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
        
        const remaining = allParts.filter(p => 
          !motorcycle.includes(p) && !ebike.includes(p)
        )
        
        remaining.forEach(p => {
          if (p.category && p.category.includes('Motorcycle')) {
            motorcycle.push(p)
          } else if (p.category && p.category.includes('E-Bike')) {
            ebike.push(p)
          } else {
            motorcycle.push(p)
          }
        })
        
        setMotorcycleItems(motorcycle)
        setEbikeItems(ebike)
        
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
        
        let count = 0
        allParts.forEach(part => {
          if (part.selectedBrands && part.selectedBrands.length > 0) {
            count += part.selectedBrands.length
          }
        })
        setTotalItems(count)
      } else {
        setSelectedParts([])
        setSelectedCategory('')
        setMotorcycleItems([])
        setEbikeItems([])
        setMotorcycleCount(0)
        setEbikeCount(0)
        setTotalItems(0)
      }
    } catch (err) {
      console.error('Failed to load selected parts:', err)
    }
  }

  useEffect(() => {
    document.title = 'Contact Us | AT International'
    loadSelectedParts()
    window.addEventListener('selectedPartsUpdated', loadSelectedParts)
    window.addEventListener('storage', loadSelectedParts)
    window.addEventListener('focus', loadSelectedParts)

    return () => {
      window.removeEventListener('selectedPartsUpdated', loadSelectedParts)
      window.removeEventListener('storage', loadSelectedParts)
      window.removeEventListener('focus', loadSelectedParts)
    }
  }, [])

  // ── HANDLE REMOVE SPECIFIC BRAND / ITEM FROM ORDER SUMMARY ─────────
  const handleRemoveBrandFromPart = (uniqueId, partName, brandToRemove) => {
    let updatedParts = selectedParts.filter((p, idx) => {
      if (uniqueId && p.cartItemId) {
        return p.cartItemId !== uniqueId
      }
      if (uniqueId && p.uniqueId) {
        return p.uniqueId !== uniqueId
      }
      if (partName) {
        if (brandToRemove && p.selectedBrands && p.selectedBrands.includes(brandToRemove)) {
          p.selectedBrands = p.selectedBrands.filter(b => b !== brandToRemove)
          return p.selectedBrands.length > 0
        }
        return p.name !== partName
      }
      return idx !== uniqueId
    })

    setSelectedParts(updatedParts)

    const updatedMotorcycle = updatedParts.filter(p => !p.category || !p.category.toLowerCase().includes('e-bike'))
    const updatedEbike = updatedParts.filter(p => p.category && p.category.toLowerCase().includes('e-bike'))

    setMotorcycleItems(updatedMotorcycle)
    setEbikeItems(updatedEbike)

    let mCount = 0
    updatedMotorcycle.forEach(p => {
      if (p.selectedModels && p.selectedModels.length > 0) {
        mCount += p.selectedModels.length
      } else if (p.selectedBrands && p.selectedBrands.length > 0) {
        mCount += p.selectedBrands.length
      }
    })
    setMotorcycleCount(mCount)

    let eCount = 0
    updatedEbike.forEach(p => {
      if (p.selectedModels && p.selectedModels.length > 0) {
        eCount += p.selectedModels.length
      } else if (p.selectedBrands && p.selectedBrands.length > 0) {
        eCount += p.selectedBrands.length
      }
    })
    setEbikeCount(eCount)

    let count = 0
    updatedParts.forEach(p => {
      if (p.selectedModels && p.selectedModels.length > 0) {
        count += p.selectedModels.length
      } else if (p.selectedBrands && p.selectedBrands.length > 0) {
        count += p.selectedBrands.length
      }
    })
    setTotalItems(count)

    // Save back to ALL storage keys so every cart updates in real time
    localStorage.setItem('basketItems', JSON.stringify(updatedParts))
    sessionStorage.setItem('basketItems', JSON.stringify(updatedParts))
    localStorage.setItem('selectedParts', JSON.stringify(updatedParts))
    sessionStorage.setItem('selectedParts', JSON.stringify(updatedParts))
    localStorage.setItem('selectedParts_motorcycle', JSON.stringify(updatedMotorcycle))
    sessionStorage.setItem('selectedParts_motorcycle', JSON.stringify(updatedMotorcycle))
    localStorage.setItem('selectedParts_e-bike', JSON.stringify(updatedEbike))
    sessionStorage.setItem('selectedParts_e-bike', JSON.stringify(updatedEbike))

    window.dispatchEvent(new Event('selectedPartsUpdated'))
  }

  const handleClearSelectedParts = () => {
    setSelectedParts([])
    setMotorcycleItems([])
    setEbikeItems([])
    setMotorcycleCount(0)
    setEbikeCount(0)
    setTotalItems(0)
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

  const handleNavigate = (page) => {
    if (onNavigate && typeof onNavigate === 'function') {
      onNavigate(page)
    }
  }

  const handle = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    
    if (errors[name]) {
      const newErrors = { ...errors }
      delete newErrors[name]
      setErrors(newErrors)
    }
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim())  newErrors.name  = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email'
    return newErrors
  }

  const submit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
    handleClearSelectedParts()
  }

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    setTimeout(() => setCopiedField(null), 2500)
  }

  const getFlattenedPartsForCategory = (parts) => {
    const flattened = []
    parts.forEach((part, idx) => {
      const brands = part.selectedBrands || []
      const models = part.selectedModels || []
      if (brands.length === 0) {
        flattened.push({
          ...part,
          brand: null,
          selectedModels: models,
          displayName: part.name,
          uniqueId: part.cartItemId || `${part.name}-no-brand-${idx}`
        })
      } else {
        brands.forEach(brand => {
          flattened.push({
            ...part,
            brand: brand,
            selectedModels: models,
            displayName: `${part.name} (${brand})`,
            uniqueId: part.cartItemId || `${part.name}-${brand}-${idx}`
          })
        })
      }
    })
    return flattened
  }

  const flattenedMotorcycle = getFlattenedPartsForCategory(motorcycleItems)
  const flattenedEbike = getFlattenedPartsForCategory(ebikeItems)

  const renderSegment = (title, items, icon, count, badgeBg) => {
    if (items.length === 0) return null
    return (
      <div className="mb-3">
        <div className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-gray-100/70 border border-gray-200 text-xs font-bold text-[#005691] mb-2">
          <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-sm flex-shrink-0">{icon}</span> {title}</span>
          <span className={`px-2 py-0.5 rounded-full text-[10px] text-white font-bold ${badgeBg}`}>{count} items</span>
        </div>
        <div className="space-y-2">
          {items.map((item, idx) => (
            <div key={item.uniqueId || `${item.name}-${item.brand}-${idx}`} className="bg-white p-3 rounded-xl border border-gray-200 text-xs shadow-sm hover:border-[#005691] transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-5 h-5 rounded-full bg-[#005691]/10 text-[#005691] flex items-center justify-center text-[10px] font-bold flex-shrink-0">{idx + 1}</span>
                  <span className="font-semibold text-gray-800 truncate">{item.name}</span>
                  {item.brand && <span className="bg-blue-50 text-[#005691] px-2 py-0.5 rounded text-[10px] font-bold border border-blue-100">{item.brand}</span>}
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveBrandFromPart(item.uniqueId, item.name, item.brand)}
                  className="text-gray-400 hover:text-red-500 p-1 transition-colors flex-shrink-0"
                  title="Remove item"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>

              {/* Models & Quantities List Display */}
              {item.selectedModels && item.selectedModels.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-100 space-y-1.5 pl-7">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Models & Quantities:</span>
                    {(() => {
                      const totalPartQty = item.selectedModels.reduce((sum, m) => {
                        return sum + (Number(item.modelQuantities?.[m]) || Number(item.quantity) || Number(item.moq) || 1000)
                      }, 0)
                      return (
                        <span className="text-[10px] bg-blue-100 text-[#005691] font-bold px-2 py-0.5 rounded">
                          Total: {totalPartQty.toLocaleString()} units
                        </span>
                      )
                    })()}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {item.selectedModels.map((m, mIdx) => {
                      const modelQty = item.modelQuantities?.[m] || item.quantity || item.moq || 1000
                      return (
                        <span key={mIdx} className="bg-emerald-50 text-emerald-800 px-2 py-1 rounded-md text-[10px] font-semibold border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                          <span className="material-symbols-outlined text-[11px] text-emerald-600">check_circle</span>
                          <span>{m}</span>
                          <span className="bg-emerald-700 text-white px-1.5 py-0.2 rounded text-[9px] font-mono font-bold">
                            {Number(modelQty).toLocaleString()} units
                          </span>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#f2f5f8] min-h-screen pb-24">

      {/* Hero */}
      <section className="relative -mt-20 pt-40 pb-16 px-8 overflow-hidden">
        <img
          src="/assets/icccc.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-4 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Contact & Procurement Inquiry</h1>
          <p className="text-white/80 text-base max-w-2xl">
            Submit your requirements and our team will respond with a detailed proposal within 24 business hours.
          </p>
        </div>
      </section>

      {/* ── TOP BANNER: "CAN'T FIND YOUR EXACT PRODUCT?" (PLACED BEFORE INQUIRY FORM & INFORMATION BOX) ── */}
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 mt-10 mb-8">
        <div className="bg-gradient-to-r from-[#005691]/100 via-[#004b7f] to-[#003861] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-contain bg-no-repeat bg-right pointer-events-none" style={{ backgroundImage: 'url(/assets/facto.png)' }} />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center flex-shrink-0 border border-white/20">
                <span className="material-symbols-outlined text-white text-2xl">troubleshoot</span>
              </div>
              <div>
                <span className="inline-block px-2.5 py-0.5 rounded bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase mb-1">Custom Sourcing Desk</span>
                <h3 className="text-xl font-bold text-white mb-1">Can't Find Your Exact Product?</h3>
                <p className="text-white/85 text-xs sm:text-sm leading-relaxed">
                  Beyond our online catalogue, AT International sources motorcycle parts, e-bike components, and industrial sealing products to your drawings, specifications, or samples.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setInquiryMode('custom')
                setForm((prev) => ({ ...prev, product: 'Custom Sourcing to Technical Drawing' }))
                const formEl = document.getElementById('inquiry-form-section')
                if (formEl) formEl.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white text-[#005691] px-6 py-3.5 rounded-xl text-xs font-bold hover:bg-gray-100 transition-all shadow-lg hover:scale-105 active:scale-95 duration-200 whitespace-nowrap cursor-pointer"
            >
              Request Custom Sourcing
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN LAYOUT: LEFT SIDE = CONTACT INFO & SOCIAL | RIGHT SIDE = PROCUREMENT FORM ── */}
      <section className="max-w-[1280px] mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* 👈 LEFT SIDE (5 COLS): CONTACT INFORMATION BOX + FOLLOW US SOCIAL BOX */}
          <div className="lg:col-span-5 space-y-8">

            {/* BOX 1: CONTACT INFORMATION */}
            <div className="bg-white border border-[#c5c6cd] rounded-3xl p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <div>
                  <h3 className="font-bold text-[#005691] text-xl">Contact Information</h3>
                  <p className="text-xs text-gray-500 mt-0.5">Reach our Guangzhou export desk directly</p>
                </div>
                <span className="material-symbols-outlined text-[#005691] text-3xl opacity-40">business_center</span>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: 'location_on',
                    label: 'Head Office',
                    value: 'Liwan District, Guangzhou City, China',
                    action: null
                  },
                  {
                    icon: 'mail',
                    label: 'Email',
                    value: 'theatinternational@gmail.com',
                    action: () => copyToClipboard('theatinternational@gmail.com', 'email'),
                    actionLabel: copiedField === 'email' ? '✓ Copied' : 'Copy'
                  },
                  {
                    icon: 'phone',
                    label: 'Phone / WhatsApp',
                    value: '+86 185 2321 0975',
                    action: () => copyToClipboard('+8618523210975', 'phone'),
                    actionLabel: copiedField === 'phone' ? '✓ Copied' : 'Copy'
                  },
                  {
                    icon: 'schedule',
                    label: 'Business Hours',
                    value: 'Mon–Sat: 9:00 AM – 6:00 PM (China Standard Time, GMT+8)',
                    action: null
                  },
                ].map((c) => (
                  <div key={c.label} className="flex items-start gap-4 group">
                    <div className="w-10 h-10 bg-[#005691]/10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[#005691] text-xl">{c.icon}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-[#005691] uppercase tracking-widest">{c.label}</span>
                        {c.action && (
                          <button
                            type="button"
                            onClick={c.action}
                            className="text-[#005691] text-[11px] font-bold hover:underline"
                          >
                            {c.actionLabel}
                          </button>
                        )}
                      </div>
                      <div className="text-sm font-medium text-[#505f76] mt-0.5 leading-snug break-words">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BOX 2: FOLLOW US / REAL BRAND SOCIAL ICONS */}
            <div className="bg-white border border-[#c5c6cd] rounded-3xl p-8 shadow-sm">
              <div className="mb-2">
                <h3 className="font-bold text-[#005691] text-xl mb-1">Follow Us</h3>
                <p className="text-[#505f76] text-xs">Find us on social media for company updates and product videos</p>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-6">
                {SOCIAL.map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.name}
                    className="flex flex-col items-center gap-2 group cursor-pointer"
                  >
                    <div className="w-14 h-14 rounded-[16px] flex items-center justify-center group-hover:scale-110 group-hover:brightness-110 transition-all duration-200 shadow-md">
                      {s.icon}
                    </div>
                    <span className="text-[11px] text-[#505f76] group-hover:text-[#005691] transition-colors text-center font-medium">
                      {s.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* 👉 RIGHT SIDE (7 COLS): PROCUREMENT INQUIRY FORM */}
          <div id="inquiry-form-section" className="lg:col-span-7">
            {submitted ? (
              <div className="bg-white rounded-3xl p-10 sm:p-14 text-center shadow-xl border border-gray-200">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <span className="material-symbols-outlined text-5xl">verified</span>
                </div>
                <h3 className="text-3xl font-bold text-[#005691] mb-3">Inquiry Sent Successfully!</h3>
                <p className="text-gray-600 text-base max-w-md mx-auto mb-8 leading-relaxed">
                  Thank you, <strong className="text-gray-900">{form.name}</strong>. Our Guangzhou sales engineering team has received your request and will follow up within <strong>24 business hours</strong> with pricing and lead times.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', company: '', email: '', phone: '', country: '', product: '', quantity: '', message: '' })
                  }}
                  className="bg-[#005691] text-white px-8 py-3.5 rounded-xl font-bold text-sm hover:bg-[#004370] transition-all shadow-lg hover:scale-105"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-200/90">
                
                {/* Form Header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#005691] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                        B2B Procurement Portal
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-[#005691] mt-2">Procurement Inquiry Form</h2>
                      <p className="text-xs text-gray-500 mt-1">Direct inquiries receive prioritized response from our sourcing team</p>
                    </div>
                    <span className="material-symbols-outlined text-4xl text-[#005691]/20">edit_square</span>
                  </div>

                  {/* Mode Selector Tabs */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-gray-100 rounded-2xl border border-gray-200">
                    {INQUIRY_MODES.map((mode) => {
                      const active = inquiryMode === mode.id
                      return (
                        <button
                          key={mode.id}
                          type="button"
                          onClick={() => {
                            setInquiryMode(mode.id)
                            if (mode.id === 'custom') setForm((prev) => ({ ...prev, product: 'Custom Sourcing to Technical Drawing' }))
                          }}
                          className={`p-2.5 rounded-xl text-left transition-all flex items-center gap-2.5 ${
                            active
                              ? 'bg-white text-[#005691] shadow-md border border-gray-200 font-bold'
                              : 'text-gray-600 hover:text-[#005691] font-medium'
                          }`}
                        >
                          <span className={`material-symbols-outlined text-lg ${active ? 'text-[#005691]' : 'text-gray-400'}`}>
                            {mode.icon}
                          </span>
                          <span className="text-xs leading-tight truncate">{mode.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Validation Errors */}
                {Object.keys(errors).length > 0 && (
                  <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                    <span className="material-symbols-outlined text-red-500 text-lg flex-shrink-0 mt-0.5">error</span>
                    <div>
                      <p className="text-red-700 text-xs font-bold mb-1">Please fix the highlighted inputs:</p>
                      {Object.values(errors).map((err) => (
                        <p key={err} className="text-red-600 text-xs">• {err}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* ORDER CART SUMMARY BOX (if items selected from Products page) */}
                {(flattenedMotorcycle.length > 0 || flattenedEbike.length > 0) && (
                  <div className="mb-8 bg-gradient-to-br from-blue-50/90 via-indigo-50/40 to-white border-2 border-[#005691]/25 rounded-2xl overflow-hidden shadow-sm">
                    
                    {/* Header */}
                    <div className="bg-[#005691] text-white px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-yellow-400 text-lg">shopping_cart</span>
                        <p className="font-bold text-xs sm:text-sm">
                          Order Summary ({selectedParts.length} Parts · {totalItems} Items)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleClearSelectedParts}
                        className="text-white/80 hover:text-white text-xs flex items-center gap-1 font-semibold transition-colors"
                      >
                        <span className="material-symbols-outlined text-sm">delete</span> Clear
                      </button>
                    </div>

                    {/* Segmented Items List */}
                    <div className="p-4 max-h-64 overflow-y-auto space-y-3">
                      {renderSegment('Motorcycle Spare Parts', flattenedMotorcycle, 'two_wheeler', motorcycleCount, 'bg-orange-500')}
                      {renderSegment('E-Bike Drive Parts', flattenedEbike, 'electric_bike', ebikeCount, 'bg-emerald-500')}
                    </div>

                    {/* Footer */}
                    <div className="bg-white px-4 py-2.5 border-t border-gray-200 flex items-center justify-between">
                      <span className="text-xs text-gray-500">Selected from Products Catalog</span>
                      <button
                        type="button"
                        onClick={() => handleNavigate('Products')}
                        className="bg-[#005691] text-white px-3.5 py-1.5 rounded-lg text-xs font-bold hover:bg-[#003e69] transition-colors"
                      >
                        + Add More
                      </button>
                    </div>
                  </div>
                )}

                {/* FORM FIELDS */}
                <div className="space-y-6">
                  
                  {/* Personal & Business Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handle}
                        placeholder="Your full name"
                        className={`w-full px-4 py-3 bg-[#f2f4f6] border rounded-xl text-sm outline-none transition-all ${
                          errors.name
                            ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20'
                            : 'border-[#c5c6cd] focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white'
                        }`}
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handle}
                        placeholder="your@email.com"
                        className={`w-full px-4 py-3 bg-[#f2f4f6] border rounded-xl text-sm outline-none transition-all ${
                          errors.email
                            ? 'border-red-400 focus:ring-2 focus:ring-red-200 bg-red-50/20'
                            : 'border-[#c5c6cd] focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white'
                        }`}
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">Company Name</label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handle}
                        placeholder="Your company"
                        className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm outline-none focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handle}
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm outline-none focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">Country of Delivery</label>
                      <input
                        type="text"
                        name="country"
                        value={form.country}
                        onChange={handle}
                        placeholder="Country of delivery"
                        className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm outline-none focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  {/* Product Category Selection Cards */}
                  <div>
                    <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-2">
                      Product Required
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
                      {PRODUCT_CATEGORIES.map((cat) => {
                        const isSelected = form.product === cat.id
                        return (
                          <div
                            key={cat.id}
                            onClick={() => setForm((prev) => ({ ...prev, product: cat.id }))}
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                              isSelected
                                ? 'bg-[#005691] text-white border-[#005691] shadow-md scale-[1.02]'
                                : 'bg-[#f2f4f6] text-gray-800 border-[#c5c6cd] hover:border-[#005691] hover:bg-blue-50/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-xl flex-shrink-0">{cat.icon}</span>
                              <div>
                                <div className="text-xs font-bold leading-snug">{cat.label}</div>
                                <div className={`text-[10px] ${isSelected ? 'text-white/80' : 'text-gray-400'}`}>{cat.tag}</div>
                              </div>
                            </div>
                            {isSelected && <span className="material-symbols-outlined text-sm text-yellow-300">check_circle</span>}
                          </div>
                        )
                      })}
                    </div>

                    <select
                      name="product"
                      value={form.product}
                      onChange={handle}
                      className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm font-medium focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white outline-none transition-all"
                    >
                      <option value="">Select a product category</option>
                      <option value="Motorcycle Parts & Engine Components">Motorcycle Parts & Accessories</option>
                      <option value="E-Bike Drive Systems & Electronics">E-Bike Parts & Components</option>
                      <option value="Industrial Sealing Solutions (Valve Stem Seals, O-Rings, Oil Seals)">Industrial Sealing Solutions</option>
                      <option value="Custom Sourcing to Technical Drawing">Custom Sourcing Request</option>
                      <option value="Other Specialized Industrial Product">Other Products ( Please Specify )</option>
                    </select>
                  </div>

                  {/* Quantity Required */}
                  <div>
                    <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">Quantity Required</label>
                    <input
                      type="text"
                      name="quantity"
                      value={form.quantity}
                      onChange={handle}
                      placeholder="e.g. 5,000 units"
                      className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm outline-none focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white transition-all mb-2"
                    />

                    {/* Presets */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Quick Fill:</span>
                      {['1,000 pcs', '5,000 pcs', '10,000 pcs', '20,000+ pcs', '1 Container Load'].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setForm((prev) => ({ ...prev, quantity: preset }))}
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            form.quantity === preset
                              ? 'bg-[#005691] text-white shadow'
                              : 'bg-white border border-[#c5c6cd] text-gray-600 hover:border-[#005691] hover:text-[#005691]'
                          }`}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specifications / Message Textarea */}
                  <div>
                    <label className="block text-xs font-bold text-[#005691] uppercase tracking-wider mb-1.5">
                      Technical Requirements / Message
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handle}
                      rows={5}
                      placeholder="Include dimensions, material specifications, tolerances, application details..."
                      className="w-full px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded-xl text-sm outline-none focus:border-[#005691] focus:ring-2 focus:ring-[#005691]/20 focus:bg-white transition-all resize-none"
                    />
                  </div>

                </div>

                {/* Submit Action */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={submit}
                    className="w-full bg-[#005691] hover:brightness-110 text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg hover:scale-[1.01] active:scale-[0.99] duration-200 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-xl">send</span>
                    Submit Inquiry
                    {selectedParts.length > 0 && (
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">
                        {selectedParts.length} parts · {totalItems} items
                      </span>
                    )}
                  </button>
                  <p className="text-xs text-[#505f76] text-center mt-4">
                    We respond within 24 business hours. Your information is kept strictly confidential.
                  </p>
                </div>

              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  )
}