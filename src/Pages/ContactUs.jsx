import { useState, useEffect, useRef } from 'react'
import emailjs from '@emailjs/browser'

const SOCIAL = [
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/theatinternational/',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <defs>
          <radialGradient id="ig1" cx="19%" cy="99%" r="128%">
            <stop offset="0%" stopColor="#ffd676" />
            <stop offset="25%" stopColor="#f2a454" />
            <stop offset="50%" stopColor="#f05c35" />
            <stop offset="75%" stopColor="#c62a8a" />
            <stop offset="100%" stopColor="#6a35b5" />
          </radialGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="url(#ig1)" />
        <circle cx="24" cy="24" r="9" stroke="white" strokeWidth="2.8" fill="none" />
        <circle cx="33.5" cy="14.5" r="2" fill="white" />
        <rect x="8" y="8" width="32" height="32" rx="9" stroke="white" strokeWidth="2.8" fill="none" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/share/1C3Acanq9d/?mibextid=wwXIfr',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#1877F2" />
        <path d="M32 8h-4a8 8 0 00-8 8v4h-4v6h4v14h6V26h4l1-6h-5v-4a2 2 0 012-2h3V8z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'X',
    href: 'https://x.com/ati_china?s=11&t=cTSAe3LIdfcsOj5pi9HOxg',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#000000" />
        <path d="M26.244 21.956L35.5 11h-2.18l-8.019 9.323L18.93 11H11.5l9.709 14.129L11.5 37h2.18l8.489-9.869L28.93 37h7.43L26.244 21.956zm-3.006 3.494l-.984-1.408L14.548 12.64h3.368l6.318 9.039.984 1.408 8.214 11.75h-3.368l-6.826-9.387z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://www.tiktok.com/@theatinternational?_r=1&_t=ZS-9AvpR64BX8g',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#010101" />
        <path d="M34.2 16.533a7.653 7.653 0 01-7.644-7.644V8h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V21.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V19.4a12.6 12.6 0 007.644 2.578V17a7.67 7.67 0 01-4-.467z" fill="white" />
        <path d="M33.2 15.533a7.653 7.653 0 01-7.644-7.644V7h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V20.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V18.4a12.6 12.6 0 007.644 2.578V16a7.67 7.67 0 01-4-.467z" fill="#EE1D52" opacity="0.8" />
        <path d="M35.2 17.533a7.653 7.653 0 01-7.644-7.644V9h-4.978v21.956a3.644 3.644 0 01-3.64 3.377 3.644 3.644 0 01-3.644-3.644 3.644 3.644 0 013.644-3.644c.356 0 .698.051 1.022.146V22.1a8.64 8.64 0 00-1.022-.062 8.622 8.622 0 00-8.622 8.622 8.622 8.622 0 008.622 8.622 8.622 8.622 0 008.618-8.622V20.4a12.6 12.6 0 007.644 2.578V18a7.67 7.67 0 01-4-.467z" fill="#69C9D0" opacity="0.8" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/channel/UCqJKf4oaUEoXJmGORXY6usQ',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#FF0000" />
        <path d="M37.41 17.26a3.5 3.5 0 00-2.46-2.47C32.76 14.2 24 14.2 24 14.2s-8.76 0-10.95.59a3.5 3.5 0 00-2.46 2.47A36.26 36.26 0 0010 24a36.26 36.26 0 00.59 6.74 3.5 3.5 0 002.46 2.47C15.24 33.8 24 33.8 24 33.8s8.76 0 10.95-.59a3.5 3.5 0 002.46-2.47A36.26 36.26 0 0038 24a36.26 36.26 0 00-.59-6.74zM21.2 28.4V19.6l7.33 4.4-7.33 4.4z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/144051252/admin/dashboard/',
    icon: (
      <svg width="32" height="32" viewBox="0 0 48 48" fill="none">
        <rect width="48" height="48" rx="12" fill="#0A66C2" />
        <path d="M14 19h4v15h-4V19zm2-6a2.5 2.5 0 110 5 2.5 2.5 0 010-5zm8 6h3.6v2h.1c.5-1 1.9-2.1 3.9-2.1 4.2 0 5 2.8 5 6.3V34h-4v-8c0-1.9 0-4.3-2.6-4.3-2.7 0-3.1 2.1-3.1 4.2V34h-3.9V19z" fill="white" />
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
  { id: 'Motorcycle Parts', label: 'Motorcycle Parts', icon: 'two_wheeler', tag: 'Crankshafts, Cylinder Heads, Cylinders' },
  { id: 'E-Bike Parts', label: 'E-Bike Parts', icon: 'electric_bike', tag: 'Hub Motors, Controllers, Chargers' },
  { id: 'Industrial Sealing Solutions (Valve Stem Seals, O-Rings, Oil Seals)', label: 'Industrial Sealing Solutions', icon: 'settings', tag: 'Valve Stem Seals, Oil Seals, O-Rings' },
  { id: 'Custom Sourcing to Technical Drawing', label: 'Request Custom Sourcing', icon: 'build', tag: 'Custom Specification Sourcing' },
]

export default function ContactUS({ onNavigate }) {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    country: '', product: '', quantity: '', message: ''
  })
  const [inquiryMode, setInquiryMode] = useState('standard')
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [uploadProgressText, setUploadProgressText] = useState('')
  const [emailError, setEmailError] = useState(null)
  const [errors, setErrors] = useState({})
  const [copiedField, setCopiedField] = useState(null)

  // ── FILE A COMPLAINT MODAL & FORM STATE ──────────────────────
  const [showComplaintModal, setShowComplaintModal] = useState(false)
  const [complaintForm, setComplaintForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    orderNumber: '',
    category: 'Product Quality Issue',
    subject: '',
    message: ''
  })
  const [complaintErrors, setComplaintErrors] = useState({})
  const [complaintSending, setComplaintSending] = useState(false)
  const [complaintSubmitted, setComplaintSubmitted] = useState(false)
  const [complaintTicket, setComplaintTicket] = useState('')
  const [complaintError, setComplaintError] = useState(null)

  // ── UPLOADED TECHNICAL DRAWINGS & CAD FILES ───────────────────
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null)

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

  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase()
    if (['dwg', 'dxf', 'step', 'stp', 'iges', 'igs', 'cad'].includes(ext)) return 'draft'
    if (['jpg', 'jpeg', 'png', 'webp', 'svg', 'bmp'].includes(ext)) return 'image'
    if (['pdf'].includes(ext)) return 'picture_as_pdf'
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext)) return 'folder_zip'
    return 'description'
  }

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
  }

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = Array.from(e.target.files)
      setUploadedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArray = Array.from(e.dataTransfer.files)
      setUploadedFiles((prev) => [...prev, ...filesArray])
    }
  }

  const removeFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const clearAllFiles = () => {
    setUploadedFiles([])
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const validate = () => {
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = 'Full name is required'
    if (!form.email.trim()) newErrors.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Please enter a valid email'
    return newErrors
  }

  const uploadSingleFile = async (file) => {
    // 1. Primary endpoint: Same-origin /api/upload.php
    // In production on Hostinger LiteSpeed, this saves directly to https://theatinternational.com/uploads/
    // In local dev, Vite dev server middleware intercepts and saves to public/uploads/
    try {
      const formData = new FormData()
      formData.append('file', file)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

      const res = await fetch('/api/upload.php', {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      if (res.ok) {
        const json = await res.json()
        if (json?.success && (json?.downloadUrl || json?.url)) {
          const downloadUrl = json.downloadUrl || json.url
          return {
            name: file.name,
            size: file.size,
            success: true,
            downloadUrl,
            previewUrl: json.previewUrl || downloadUrl,
          }
        }
      }
    } catch (primaryErr) {
      console.warn('Primary /api/upload.php endpoint error:', primaryErr)
    }

    // 2. Secondary endpoint: /api/upload (without .php)
    try {
      const formData = new FormData()
      formData.append('file', file)

      const controller2 = new AbortController()
      const timeoutId2 = setTimeout(() => controller2.abort(), 20000)

      const res2 = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        signal: controller2.signal,
      })
      clearTimeout(timeoutId2)

      if (res2.ok) {
        const json2 = await res2.json()
        if (json2?.success && (json2?.downloadUrl || json2?.url)) {
          const downloadUrl = json2.downloadUrl || json2.url
          return {
            name: file.name,
            size: file.size,
            success: true,
            downloadUrl,
            previewUrl: json2.previewUrl || downloadUrl,
          }
        }
      }
    } catch (secErr) {
      console.warn('Secondary /api/upload endpoint error:', secErr)
    }

    return {
      name: file.name,
      size: file.size,
      success: false,
    }
  }

  const submit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSending(true)
    setEmailError(null)

    const selectedItemsSummary =
      selectedParts && selectedParts.length > 0
        ? selectedParts.map((p) => `- ${p.displayName || p.name} (${p.category || 'General'})`).join('\n')
        : 'None'

    // 1. Primary Engine: Native Hostinger PHP mailer with REAL email file attachments
    // Files are attached directly as MIME attachments to the email received at info@theatinternational.com
    try {
      setUploadProgressText(
        uploadedFiles.length > 0
          ? `Attaching ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} to email...`
          : 'Dispatching inquiry...'
      )

      const nativeFormData = new FormData()
      nativeFormData.append('name', form.name)
      nativeFormData.append('from_name', form.name)
      nativeFormData.append('email', form.email)
      nativeFormData.append('from_email', form.email)
      nativeFormData.append('phone', form.phone || 'N/A')
      nativeFormData.append('company', form.company || 'N/A')
      nativeFormData.append('country', form.country || 'N/A')
      nativeFormData.append('product', form.product || 'Not Specified')
      nativeFormData.append('product_category', form.product || 'Not Specified')
      nativeFormData.append('quantity', form.quantity || 'Not Specified')
      nativeFormData.append('inquiry_mode', inquiryMode)
      nativeFormData.append('message', form.message || 'No additional message provided')
      nativeFormData.append('selected_parts', selectedItemsSummary)

      if (uploadedFiles && uploadedFiles.length > 0) {
        uploadedFiles.forEach((file, index) => {
          nativeFormData.append(`file_${index}`, file)
        })
      }

      // Check if running on production domain or server has send-inquiry.php
      const nativeRes = await fetch('/api/send-inquiry.php', {
        method: 'POST',
        body: nativeFormData,
      })

      if (nativeRes.ok) {
        const nativeJson = await nativeRes.json()
        if (nativeJson?.success) {
          console.log('Inquiry dispatched with native email attachments:', nativeJson)
          setSending(false)
          setUploadProgressText('')
          setSubmitted(true)
          handleClearSelectedParts()
          return
        }
      }
    } catch (nativeErr) {
      console.warn('Native mail endpoint unavailable, proceeding with EmailJS fallback:', nativeErr)
    }

    // 2. Secondary Engine: EmailJS Fallback (for static CDN / local dev without PHP)
    let uploadResults = []
    if (uploadedFiles && uploadedFiles.length > 0) {
      setUploadProgressText(`Uploading ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''} to storage...`)
      try {
        uploadResults = await Promise.all(uploadedFiles.map((f) => uploadSingleFile(f)))
      } catch (uploadErr) {
        console.warn('Batch upload warning:', uploadErr)
      }
    }

    setUploadProgressText('Dispatching inquiry email...')

    let filesSummary = ''
    let uploadedFilesListText = 'None'

    if (uploadResults && uploadResults.length > 0) {
      uploadedFilesListText = uploadResults
        .map((r, i) => {
          if (r.success) {
            return `${i + 1}. ${r.name} (${formatFileSize(r.size)}) -> ${r.downloadUrl}`
          }
          return `${i + 1}. ${r.name} (${formatFileSize(r.size)}) [Pending Direct Email]`
        })
        .join('\n')

      filesSummary =
        `\n\n` +
        `==================================================\n` +
        `📎 ATTACHED TECHNICAL DRAWINGS & CAD FILES (${uploadResults.length}):\n` +
        `==================================================\n` +
        uploadResults
          .map((r, i) => {
            if (r.success) {
              const link = r.downloadUrl || r.url
              return (
                `FILE ${i + 1}: ${r.name} (${formatFileSize(r.size)})\n` +
                `📥 DIRECT ACCESS & DOWNLOAD LINK:\n${link}\n`
              )
            } else {
              return (
                `FILE ${i + 1}: ${r.name} (${formatFileSize(r.size)})\n` +
                `⚠️ Upload connection error. Customer requested to email file directly.\n`
              )
            }
          })
          .join('\n') +
        `==================================================\n` +
        `NOTE: Click the DIRECT ACCESS & DOWNLOAD LINK above to immediately open or download the customer's drawing/document to your device.\n` +
        `==================================================`
    } else if (uploadedFiles && uploadedFiles.length > 0) {
      filesSummary =
        `\n\nUploaded Technical Drawings / CAD Files (${uploadedFiles.length}):\n` +
        uploadedFiles.map((f, i) => `  ${i + 1}. ${f.name} (${formatFileSize(f.size)})`).join('\n')
    }

    const adminTemplateParams = {
      from_name: form.name,
      name: form.name,
      to_name: 'AT International',
      to_email: 'info@theatinternational.com',
      recipient_email: 'info@theatinternational.com',
      email: form.email,
      from_email: form.email,
      reply_to: form.email,
      user_email: form.email,
      customer_email: form.email,
      client_email: form.email,
      sender_email: form.email,
      contact_email: form.email,
      company: form.company || 'N/A',
      phone: form.phone || 'N/A',
      country: form.country || 'N/A',
      inquiry_mode: inquiryMode,
      product_category: form.product || 'Not Specified',
      quantity: form.quantity || 'Not Specified',
      message: `Client Name: ${form.name}\nClient Email: ${form.email}\nPhone/WhatsApp: ${form.phone || 'N/A'}\nCompany: ${form.company || 'N/A'}\nCountry: ${form.country || 'N/A'}\nProduct: ${form.product || 'Not Specified'}\nQuantity: ${form.quantity || 'Not Specified'}\nInquiry Mode: ${inquiryMode}${filesSummary}\n\nTechnical Requirements / Message:\n${form.message || 'No additional message provided'}\n\nSelected Parts Summary:\n${selectedItemsSummary}`,
      selected_items: selectedItemsSummary,
      uploaded_files_count: uploadedFiles.length,
      uploaded_files_list: uploadedFilesListText,
      title: `Inquiry from ${form.name} (${form.company || 'B2B Client'})`,
      subject: `New Sourcing Inquiry from ${form.name}`,
    }

    const userConfirmationParams = {
      from_name: 'AT International Sourcing Desk',
      from_email: 'info@theatinternational.com',
      to_name: form.name,
      name: form.name,
      to_email: form.email,
      recipient_email: form.email,
      user_email: form.email,
      customer_email: form.email,
      client_email: form.email,
      email: form.email,
      reply_to: 'info@theatinternational.com',
      company: form.company || 'N/A',
      product_category: form.product || 'Not Specified',
      message: `Dear ${form.name},\n\nThank you for reaching out to AT International. We have successfully received your inquiry regarding ${form.product || 'our products'}${uploadedFiles.length > 0 ? ` along with your ${uploadedFiles.length} attached technical drawing/document(s)` : ''}.\n\nOur sourcing engineering team is reviewing your requirements and will follow up with you directly within 24 business hours.\n\nBest regards,\nAT International Sourcing Team\ninfo@theatinternational.com`,
      title: `Inquiry regarding ${form.product || 'Sourcing Products'}`,
      subject: 'Inquiry Received - AT International',
    }

    emailjs
      .send('service_cd7t4tp', 'template_wdsnb2r', adminTemplateParams, 'Wg55VCxLMsJxxjNy0')
      .then(
        (res) => {
          console.log('EmailJS Admin Notification Sent:', res.status, res.text)
          emailjs
            .send('service_cd7t4tp', 'template_g6j00fl', userConfirmationParams, 'Wg55VCxLMsJxxjNy0')
            .then((uRes) => console.log('EmailJS User Confirmation Sent:', uRes.status, uRes.text))
            .catch((uErr) => console.warn('EmailJS User Confirmation Error:', uErr))
          setSending(false)
          setUploadProgressText('')
          setSubmitted(true)
          handleClearSelectedParts()
        },
        (error) => {
          console.error('EmailJS Admin Notification Error:', error)
          setSending(false)
          setUploadProgressText('')
          const errDetail = error?.text || error?.message || 'Check EmailJS Dashboard Service & Public Key'
          setEmailError(`Email dispatch error (${errDetail}). Please verify EmailJS Dashboard setup or contact us directly via email.`)
        }
      )
  }

  const handleComplaintChange = (e) => {
    const { name, value } = e.target
    setComplaintForm((prev) => ({ ...prev, [name]: value }))
    if (complaintErrors[name]) {
      setComplaintErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  const validateComplaint = () => {
    const errs = {}
    if (!complaintForm.name.trim()) errs.name = 'Full name is required'
    if (!complaintForm.email.trim()) errs.email = 'Email address is required'
    else if (!/\S+@\S+\.\S+/.test(complaintForm.email)) errs.email = 'Please enter a valid email address'
    if (!complaintForm.subject.trim()) errs.subject = 'Subject is required'
    if (!complaintForm.message.trim()) errs.message = 'Please describe your complaint'
    return errs
  }

  const handleSendComplaint = () => {
    const errs = validateComplaint()
    if (Object.keys(errs).length > 0) {
      setComplaintErrors(errs)
      return
    }
    setComplaintErrors({})
    setComplaintSending(true)
    setComplaintError(null)

    const ticketId = 'CMP-' + Math.floor(100000 + Math.random() * 900000)
    setComplaintTicket(ticketId)

    const adminComplaintParams = {
      from_name: complaintForm.name,
      name: complaintForm.name,
      to_name: 'AT International Grievance Desk',
      to_email: 'info@theatinternational.com',
      recipient_email: 'info@theatinternational.com',
      email: complaintForm.email,
      from_email: complaintForm.email,
      reply_to: complaintForm.email,
      user_email: complaintForm.email,
      customer_email: complaintForm.email,
      client_email: complaintForm.email,
      sender_email: complaintForm.email,
      contact_email: complaintForm.email,
      company: complaintForm.company || 'N/A',
      phone: complaintForm.phone || 'N/A',
      country: 'N/A',
      inquiry_mode: 'Formal Customer Complaint',
      product_category: complaintForm.category,
      quantity: complaintForm.orderNumber ? `Order #${complaintForm.orderNumber}` : 'N/A',
      message: `[FORMAL CUSTOMER COMPLAINT - TICKET: ${ticketId}]\n\nComplainant: ${complaintForm.name}\nEmail: ${complaintForm.email}\nPhone: ${complaintForm.phone || 'N/A'}\nCompany: ${complaintForm.company || 'N/A'}\nOrder/PO #: ${complaintForm.orderNumber || 'N/A'}\nCategory: ${complaintForm.category}\nSubject: ${complaintForm.subject}\n\nComplaint Description:\n${complaintForm.message}`,
      selected_items: `Ticket: ${ticketId} | Order #: ${complaintForm.orderNumber || 'N/A'}`,
      uploaded_files_count: 0,
      uploaded_files_list: 'None',
      title: `[COMPLAINT ${ticketId}] ${complaintForm.subject}`,
      subject: `[COMPLAINT ${ticketId}] ${complaintForm.subject}`
    }

    const userConfirmationParams = {
      from_name: 'AT International Support & Grievance Desk',
      from_email: 'info@theatinternational.com',
      to_name: complaintForm.name,
      name: complaintForm.name,
      to_email: complaintForm.email,
      recipient_email: complaintForm.email,
      user_email: complaintForm.email,
      customer_email: complaintForm.email,
      client_email: complaintForm.email,
      email: complaintForm.email,
      reply_to: 'info@theatinternational.com',
      company: complaintForm.company || 'N/A',
      product_category: complaintForm.category,
      message: `Dear ${complaintForm.name},\n\nWe have received your formal complaint (Ticket: ${ticketId}) regarding "${complaintForm.subject}".\n\nYour complaint has been logged and escalated to our Quality Assurance and Management team. We take every grievance seriously and will investigate thoroughly.\n\nA representative will reply directly to this email within 24 business hours with an update or resolution.\n\nBest regards,\nCustomer Care & Grievance Team\nAT International\ninfo@theatinternational.com`,
      title: `Complaint Acknowledgment [${ticketId}]`,
      subject: `Complaint Acknowledgment [${ticketId}] - AT International`
    }

    emailjs.send('service_cd7t4tp', 'template_wdsnb2r', adminComplaintParams, 'Wg55VCxLMsJxxjNy0')
      .then((res) => {
        console.log('Complaint Email Sent:', res.status, res.text)
        emailjs.send('service_cd7t4tp', 'template_g6j00fl', userConfirmationParams, 'Wg55VCxLMsJxxjNy0')
          .then(uRes => console.log('Complaint Auto-Reply Sent:', uRes.status))
          .catch(uErr => console.warn('Complaint Auto-Reply Err:', uErr))
        setComplaintSending(false)
        setComplaintSubmitted(true)
      })
      .catch((err) => {
        console.error('Complaint Send Error:', err)
        setComplaintSending(false)
        const errDetail = err?.text || err?.message || 'Email dispatch failed'
        setComplaintError(`Unable to send complaint (${errDetail}). You can also send an email directly using the link below.`)
      })
  }

  const resetComplaintForm = () => {
    setComplaintForm({
      name: '',
      email: '',
      phone: '',
      company: '',
      orderNumber: '',
      category: 'Product Quality Issue',
      subject: '',
      message: ''
    })
    setComplaintErrors({})
    setComplaintSubmitted(false)
    setComplaintSending(false)
    setComplaintError(null)
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
      <section className="relative -mt-16 sm:-mt-20 pt-36 sm:pt-48 pb-10 sm:pb-16 px-4 sm:px-8 overflow-hidden">
        <img
          src="/assets/icccc.png"
          alt="ATI Facility"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#005691] via-[#005691]/75 to-[#005691]/10" />
        <div className="relative z-10 max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-[10px] sm:text-xs font-semibold rounded mb-2.5 sm:mb-4 uppercase tracking-widest">
            Get In Touch
          </span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-3">Contact & Procurement Inquiry</h1>
          <p className="text-white/90 text-xs sm:text-base max-w-2xl leading-relaxed">
            Submit your requirements and our team will respond with a detailed proposal within 24 business hours.
          </p>
        </div>
      </section>

      {/* ── TOP BANNER: "CAN'T FIND YOUR EXACT PRODUCT?" (PLACED BEFORE INQUIRY FORM & INFORMATION BOX) ── */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 mt-10 mb-8">
        <div className="bg-gradient-to-r from-[#005691]/100 via-[#004b7f] to-[#003861] text-white rounded-3xl p-5 sm:p-8 shadow-xl relative overflow-hidden">
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
                  Beyond our online catalogue, AT International sources Motorcycle Parts, E-Bike Parts, and Industrial Sealing Solutions to your drawings, specifications, or samples.
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
      <section className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* 👈 LEFT SIDE (5 COLS): CONTACT INFORMATION BOX + FOLLOW US SOCIAL BOX */}
          <div className="lg:col-span-5 space-y-8">

            {/* BOX 1: CONTACT INFORMATION */}
            <div className="bg-white border border-[#c5c6cd] rounded-3xl p-5 sm:p-8 shadow-sm">
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
                    value: 'Room 271, 2nd Floor, Fengchao Youth Innovation Community, No. 49 Dongjiaobei Road, Liwan District, Guangzhou, China',
                    action: null
                  },
                  {
                    icon: 'mail',
                    label: 'Email',
                    value: 'info@theatinternational.com',
                    action: () => copyToClipboard('info@theatinternational.com', 'email'),
                    actionLabel: copiedField === 'email' ? '✓ Copied' : 'Copy'
                  },
                  {
                    icon: 'phone',
                    label: 'Phone / WeChat',
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

              <div className="grid grid-cols-3 gap-4 mt-6">
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

            {/* BOX 3: FILE A COMPLAINT */}
            <div className="bg-white border border-[#c5c6cd] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider mb-2 border border-red-200">
                    <span className="material-symbols-outlined text-xs">report_problem</span>
                    Customer Grievance Desk
                  </span>
                  <h3 className="font-bold text-[#005691] text-xl">File a Complaint</h3>
                  <p className="text-[#505f76] text-xs mt-1 leading-relaxed">
                    Have an issue with your order, product quality, or delivery? File a complaint directly to our executive support team.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#005691] to-[#003b64] text-white flex items-center justify-center flex-shrink-0 shadow-md ml-3">
                  <span className="material-symbols-outlined text-2xl">mail</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#005691] mb-0.5">
                  <span className="material-symbols-outlined text-base">support_agent</span>
                  Direct Executive Resolution
                </div>
                <p className="text-[11px] text-[#505f76] leading-snug">
                  Complaints are reviewed by our senior management and answered within 24 business hours.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  resetComplaintForm()
                  setShowComplaintModal(true)
                }}
                className="w-full bg-[#005691] hover:bg-[#004370] text-white py-3.5 px-5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg hover:scale-[1.01] active:scale-[0.99] duration-150 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">edit_note</span>
                <span>File a Complaint</span>
                <span className="material-symbols-outlined text-sm ml-auto opacity-70">open_in_new</span>
              </button>
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
                  Thank you, <strong className="text-gray-900">{form.name}</strong>. Our sourcing team has received your request and will follow up within <strong>24 business hours</strong> with pricing and lead times.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name: '', company: '', email: '', phone: '', country: '', product: '', quantity: '', message: '' })
                    setUploadedFiles([])
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
                          className={`p-3 rounded-xl text-left transition-all flex items-center gap-2 ${active
                            ? 'bg-white text-[#005691] shadow-md border border-gray-200 font-bold'
                            : 'text-gray-600 hover:text-[#005691] font-medium'
                            }`}
                        >
                          <span className={`material-symbols-outlined text-base flex-shrink-0 ${active ? 'text-[#005691]' : 'text-gray-400'}`}>
                            {mode.icon}
                          </span>
                          <span className="text-[11px] sm:text-xs leading-snug whitespace-normal break-words">{mode.label}</span>
                        </button>
                      )
                    })}
                  </div>

                  {/* UPLOAD FILES BOX (Shown when 'Custom Drawing & CAD Request' is tapped) */}
                  {inquiryMode === 'custom' && (
                    <div className="mt-4 p-5 sm:p-6 bg-gradient-to-br from-blue-50/80 via-white to-blue-50/40 rounded-2xl border-2 border-[#005691]/25 shadow-sm transition-all duration-300">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-[#005691] text-white flex items-center justify-center shadow-sm flex-shrink-0">
                            <span className="material-symbols-outlined text-xl">upload_file</span>
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-[#005691]">
                              Upload Files (Drawings & CAD Specifications)
                            </h4>
                            <p className="text-[11px] sm:text-xs text-gray-500">
                              Upload any type of files to place your order (CAD models, blueprints, PDF drawings, images, specs)
                            </p>
                          </div>
                        </div>
                        {uploadedFiles.length > 0 && (
                          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 flex-shrink-0">
                            {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'} attached
                          </span>
                        )}
                      </div>

                      {/* Drag & Drop Area */}
                      <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current && fileInputRef.current.click()}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center ${isDragging
                          ? 'border-[#005691] bg-blue-100/50 scale-[1.01]'
                          : 'border-[#005691]/35 hover:border-[#005691] hover:bg-white bg-white/70'
                          }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileInputChange}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-blue-50 text-[#005691] flex items-center justify-center mb-2.5 shadow-sm">
                          <span className="material-symbols-outlined text-2xl">cloud_upload</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-gray-800 mb-1">
                          <span className="text-[#005691] underline underline-offset-2">Click to browse</span> or drag & drop files here
                        </p>
                        <p className="text-[11px] text-gray-500 max-w-sm">
                          Supports all file types: CAD (.dwg, .dxf, .step, .stp), PDF, 3D models, images (.png, .jpg), docs, or ZIP archives
                        </p>
                      </div>

                      {/* Uploaded Files List */}
                      {uploadedFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center justify-between text-xs text-gray-500 px-1 font-semibold">
                            <span>Uploaded Files ({uploadedFiles.length})</span>
                            <button
                              type="button"
                              onClick={clearAllFiles}
                              className="text-red-500 hover:text-red-700 hover:underline text-[11px] font-bold flex items-center gap-1"
                            >
                              <span className="material-symbols-outlined text-xs">delete_sweep</span>
                              Remove All
                            </button>
                          </div>
                          <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                            {uploadedFiles.map((file, idx) => (
                              <div
                                key={`${file.name}-${idx}`}
                                className="flex items-center justify-between gap-3 p-2.5 bg-white rounded-xl border border-gray-200 text-xs shadow-sm hover:border-gray-300 transition-colors"
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <span className="material-symbols-outlined text-base text-[#005691] flex-shrink-0">
                                    {getFileIcon(file.name)}
                                  </span>
                                  <div className="min-w-0">
                                    <p className="font-bold text-gray-800 truncate text-xs">{file.name}</p>
                                    <p className="text-[10px] text-gray-400">{formatFileSize(file.size)}</p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    removeFile(idx)
                                  }}
                                  className="text-gray-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition-colors flex-shrink-0"
                                  title="Remove file"
                                >
                                  <span className="material-symbols-outlined text-base">close</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                      {renderSegment('Motorcycle Parts', flattenedMotorcycle, 'two_wheeler', motorcycleCount, 'bg-orange-500')}
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
                        className={`w-full px-4 py-3 bg-[#f2f4f6] border rounded-xl text-sm outline-none transition-all ${errors.name
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
                        className={`w-full px-4 py-3 bg-[#f2f4f6] border rounded-xl text-sm outline-none transition-all ${errors.email
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
                            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${isSelected
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
                      <option value="Motorcycle Parts">Motorcycle Parts</option>
                      <option value="E-Bike Parts">E-Bike Parts</option>
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
                          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${form.quantity === preset
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

                {/* Email Error Banner */}
                {emailError && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs flex flex-col gap-2">
                    <div className="flex items-center gap-2 font-bold text-sm text-red-800">
                      <span className="material-symbols-outlined text-base text-red-600">error</span>
                      Email Sending Error
                    </div>
                    <p>{emailError}</p>
                    <a
                      href={`mailto:info@theatinternational.com?subject=Sourcing Inquiry from ${encodeURIComponent(form.name || 'Client')}&body=${encodeURIComponent(`Client Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nCompany: ${form.company}\n\nMessage:\n${form.message}`)}`}
                      className="inline-flex items-center gap-1.5 text-[#005691] font-bold underline hover:text-blue-900 mt-1 text-xs"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                      Click here to email us directly at info@theatinternational.com
                    </a>
                  </div>
                )}

                {/* Submit Action */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    disabled={sending}
                    onClick={submit}
                    className="w-full bg-[#005691] hover:brightness-110 text-white py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 uppercase tracking-widest shadow-lg hover:scale-[1.01] active:scale-[0.99] duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <span className="material-symbols-outlined text-xl animate-spin">sync</span>
                        {uploadProgressText || 'Sending Email...'}
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-xl">send</span>
                        Submit Inquiry
                        {uploadedFiles.length > 0 && (
                          <span className="bg-emerald-400 text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">
                            {uploadedFiles.length} {uploadedFiles.length === 1 ? 'file' : 'files'} attached
                          </span>
                        )}
                        {selectedParts.length > 0 && (
                          <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-2.5 py-0.5 rounded-full ml-2">
                            {selectedParts.length} parts · {totalItems} items
                          </span>
                        )}
                      </>
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

      {/* ── MAIL DESIGN WINDOW MODAL: FILE A COMPLAINT ── */}
      {showComplaintModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowComplaintModal(false)
            }
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-300 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">

            {/* Window Title Bar (Email Client Aesthetic) */}
            <div className="bg-[#1e293b] text-white px-4 py-3 flex items-center justify-between select-none border-b border-gray-700">
              <div className="flex items-center gap-3">
                {/* Traffic Light Buttons */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowComplaintModal(false)}
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity cursor-pointer border border-[#e0443e]"
                    title="Close Window"
                  />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] opacity-80" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] opacity-80" />
                </div>
                <div className="flex items-center gap-2 pl-2 border-l border-gray-600">
                  <span className="material-symbols-outlined text-base text-blue-400">mark_email_unread</span>
                  <span className="text-xs sm:text-sm font-semibold tracking-wide">New Message — File a Formal Complaint</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowComplaintModal(false)}
                className="w-7 h-7 rounded-lg hover:bg-white/10 text-gray-300 hover:text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>

            {complaintSubmitted ? (
              /* Success Screen inside Mail Window */
              <div className="p-8 sm:p-12 text-center flex-1 flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-inner">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h4 className="text-2xl font-bold text-[#005691] mb-2">Complaint Submitted Successfully</h4>
                <div className="inline-block px-3 py-1 bg-gray-100 border border-gray-200 rounded-lg text-xs font-mono font-bold text-gray-700 mb-4">
                  Reference: {complaintTicket}
                </div>
                <p className="text-gray-600 text-sm max-w-md mx-auto mb-6 leading-relaxed">
                  Thank you, <strong className="text-gray-900">{complaintForm.name}</strong>. Your complaint has been delivered to <strong>info@theatinternational.com</strong>. An automated confirmation receipt has also been dispatched to <strong>{complaintForm.email}</strong>.
                </p>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 max-w-md mb-6 text-left flex items-start gap-2">
                  <span className="material-symbols-outlined text-amber-600 text-base flex-shrink-0 mt-0.5">info</span>
                  <span>Our executive grievance committee reviews complaints daily. You will receive an official response and resolution ticket within 24 business hours.</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowComplaintModal(false)
                    resetComplaintForm()
                  }}
                  className="bg-[#005691] text-white px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-[#004370] transition-all shadow-md cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              /* Email Compose Form */
              <div className="flex-1 flex flex-col overflow-y-auto">

                {/* Mail Header Fields */}
                <div className="divide-y divide-gray-100 text-xs sm:text-sm bg-gray-50/50">

                  {/* To: Field */}
                  <div className="px-4 py-2.5 flex items-center gap-3">
                    <span className="w-16 text-gray-400 font-bold uppercase text-[11px] select-none">To:</span>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 bg-[#005691]/10 text-[#005691] font-semibold px-2.5 py-1 rounded-md text-xs border border-[#005691]/20">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        AT International Grievance Desk
                        <span className="text-gray-500 font-mono text-[10px]">&lt;info@theatinternational.com&gt;</span>
                      </span>
                    </div>
                  </div>

                  {/* From Name & Email Fields */}
                  <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="w-16 text-gray-400 font-bold uppercase text-[11px] select-none">From:</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <input
                          type="text"
                          name="name"
                          value={complaintForm.name}
                          onChange={handleComplaintChange}
                          placeholder="Your Full Name *"
                          className={`w-full px-2.5 py-1.5 bg-white border ${complaintErrors.name ? 'border-red-500 bg-red-50/30' : 'border-gray-200'} rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#005691]`}
                        />
                        {complaintErrors.name && (
                          <p className="text-[10px] text-red-600 mt-0.5">{complaintErrors.name}</p>
                        )}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          value={complaintForm.email}
                          onChange={handleComplaintChange}
                          placeholder="Your Email Address *"
                          className={`w-full px-2.5 py-1.5 bg-white border ${complaintErrors.email ? 'border-red-500 bg-red-50/30' : 'border-gray-200'} rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#005691]`}
                        />
                        {complaintErrors.email && (
                          <p className="text-[10px] text-red-600 mt-0.5">{complaintErrors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Phone & Order # Fields */}
                  <div className="px-4 py-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="w-16 text-gray-400 font-bold uppercase text-[11px] select-none">Details:</span>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        name="phone"
                        value={complaintForm.phone}
                        onChange={handleComplaintChange}
                        placeholder="Phone / WhatsApp (Optional)"
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#005691]"
                      />
                      <input
                        type="text"
                        name="orderNumber"
                        value={complaintForm.orderNumber}
                        onChange={handleComplaintChange}
                        placeholder="Order / Invoice / BL # (If applicable)"
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#005691]"
                      />
                    </div>
                  </div>

                  {/* Category Field */}
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="w-16 text-gray-400 font-bold uppercase text-[11px] select-none">Issue:</span>
                    <div className="flex-1">
                      <select
                        name="category"
                        value={complaintForm.category}
                        onChange={handleComplaintChange}
                        className="w-full px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-xs text-gray-800 font-medium focus:outline-none focus:border-[#005691]"
                      >
                        <option value="Product Quality Issue">Product Quality / Defective Items</option>
                        <option value="Shipment & Delivery Delay">Shipment & Delivery Delay</option>
                        <option value="Incorrect Items or Quantity">Incorrect Items or Missing Quantity</option>
                        <option value="Packaging & Transit Damage">Packaging & Transit Damage</option>
                        <option value="Specification Mismatch to Drawings">Specification Mismatch to Drawings</option>
                        <option value="Customer Service / Communication">Customer Service / Communication</option>
                        <option value="Other Grievance">Other Grievance</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="px-4 py-2 flex items-center gap-3">
                    <span className="w-16 text-gray-400 font-bold uppercase text-[11px] select-none">Subject:</span>
                    <div className="flex-1">
                      <input
                        type="text"
                        name="subject"
                        value={complaintForm.subject}
                        onChange={handleComplaintChange}
                        placeholder="Brief summary of your complaint *"
                        className={`w-full px-2.5 py-1.5 bg-white border ${complaintErrors.subject ? 'border-red-500 bg-red-50/30' : 'border-gray-200'} rounded-lg text-xs text-gray-900 focus:outline-none focus:border-[#005691] font-semibold`}
                      />
                      {complaintErrors.subject && (
                        <p className="text-[10px] text-red-600 mt-0.5">{complaintErrors.subject}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email Formatting Toolbar Mock */}
                <div className="bg-gray-100/80 px-4 py-1.5 border-y border-gray-200 flex items-center gap-3 text-gray-500 text-xs select-none">
                  <span className="font-bold text-[11px] text-gray-700">Write Complaint</span>
                  <div className="h-4 w-px bg-gray-300" />
                  <span className="text-[11px] text-gray-500">Provide specific part numbers, batch details, and what resolution you expect.</span>
                </div>

                {/* Mail Body Editor (Textarea) */}
                <div className="p-4 flex-1 flex flex-col">
                  <textarea
                    name="message"
                    rows={7}
                    value={complaintForm.message}
                    onChange={handleComplaintChange}
                    placeholder="Describe the complaint in detail:&#10;1. What went wrong?&#10;2. Which parts or order were affected?&#10;3. Desired resolution (e.g., replacement, refund, technical review)..."
                    className={`w-full flex-1 p-3 bg-white border ${complaintErrors.message ? 'border-red-500 bg-red-50/30' : 'border-gray-200'} rounded-xl text-xs sm:text-sm text-gray-900 leading-relaxed focus:outline-none focus:border-[#005691] resize-none font-normal`}
                  />
                  {complaintErrors.message && (
                    <p className="text-[11px] text-red-600 mt-1">{complaintErrors.message}</p>
                  )}
                </div>

                {/* Error Banner if EmailJS Fails */}
                {complaintError && (
                  <div className="mx-4 mb-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                    <p className="font-semibold mb-1">{complaintError}</p>
                    <a
                      href={`mailto:info@theatinternational.com?subject=${encodeURIComponent(`[COMPLAINT] ${complaintForm.subject || 'Customer Complaint'}`)}&body=${encodeURIComponent(`Name: ${complaintForm.name}\nEmail: ${complaintForm.email}\nPhone: ${complaintForm.phone}\nOrder #: ${complaintForm.orderNumber}\nCategory: ${complaintForm.category}\n\nComplaint Message:\n${complaintForm.message}`)}`}
                      className="inline-flex items-center gap-1 font-bold text-[#005691] underline hover:text-blue-900"
                    >
                      <span className="material-symbols-outlined text-xs">mail</span>
                      Click here to send complaint directly via your email client
                    </a>
                  </div>
                )}

                {/* Window Bottom Actions Bar */}
                <div className="bg-gray-100 px-4 py-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={complaintSending}
                      onClick={handleSendComplaint}
                      className="bg-[#005691] hover:bg-[#004370] text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {complaintSending ? (
                        <>
                          <span className="material-symbols-outlined text-base animate-spin">sync</span>
                          <span>Sending Complaint...</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">send</span>
                          <span>Send Complaint</span>
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      disabled={complaintSending}
                      onClick={() => setShowComplaintModal(false)}
                      className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Discard
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
                    <span className="material-symbols-outlined text-xs text-emerald-600">lock</span>
                    <span>Direct encrypted delivery to info@theatinternational.com</span>
                  </div>
                </div>

              </div>
            )}

          </div>
        </div>
      )}
    </div>
  )
}