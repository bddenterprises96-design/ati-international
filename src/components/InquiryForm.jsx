import { useState } from 'react'
import emailjs from '@emailjs/browser'

export default function InquiryForm() {
  const [form, setForm] = useState({
    company: '',
    email: '',
    category: '',
    quantity: '',
    requirements: ''
  })
  const [sending, setSending] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handle = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.email.trim()) return

    setSending(true)
    const adminTemplateParams = {
      from_name: form.company || 'Website Inquiry',
      to_name: 'AT International',
      to_email: 'theatinternational@gmail.com',
      reply_to: form.email,
      user_email: form.email,
      email: form.email,
      company: form.company || 'N/A',
      product_category: form.category || 'Not Specified',
      quantity: form.quantity || 'Not Specified',
      message: form.requirements || 'No requirements specified',
      title: `Quick Inquiry from ${form.email}`
    }

    const userConfirmationParams = {
      from_name: 'AT International Sourcing Desk',
      to_name: form.company || 'Valued Partner',
      to_email: form.email,
      user_email: form.email,
      reply_to: 'theatinternational@gmail.com',
      email: form.email,
      message: `Thank you for submitting your inquiry regarding ${form.category || 'our products'}. Our engineering and sourcing team has received your request and will follow up with you directly within 24 business hours.\n\nBest regards,\nAT International Sourcing Desk\ntheatinternational@gmail.com`,
      title: 'Inquiry Received - AT International'
    }

    emailjs.send(
      'service_hrbqaj9',
      'template_l94ixmr',
      adminTemplateParams,
      'l9K4E835PGcGZMP2Z'
    ).then(
      () => {
        emailjs.send('service_hrbqaj9', 'template_l94ixmr', userConfirmationParams, 'l9K4E835PGcGZMP2Z').catch(() => {})
        setSending(false)
        setSubmitted(true)
      },
      (error) => {
        console.error('EmailJS Error:', error)
        setSending(false)
        setSubmitted(true)
      }
    )
  }

  return (
    <section className="bg-[#f7f9fb] py-20">
      <div className="max-w-[1280px] mx-auto px-8 text-center">
        <h2 className="text-[32px] font-bold text-[#005691] mb-3">Start Your Inquiry</h2>
        <p className="text-base text-[#505f76] mb-10 max-w-xl mx-auto">
          Submit your product requirements and our engineering team will respond within 24 hours.
        </p>

        <div className="max-w-2xl mx-auto bg-white border border-[#c5c6cd] rounded-xl p-10 shadow-sm">
          {submitted ? (
            <div className="py-8 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="text-2xl font-bold text-[#005691] mb-2">Inquiry Received!</h3>
              <p className="text-[#505f76] text-sm max-w-md mx-auto mb-6">
                Thank you for contacting AT International. Our sourcing team has received your details and will reply via email shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false)
                  setForm({ company: '', email: '', category: '', quantity: '', requirements: '' })
                }}
                className="bg-[#005691] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:brightness-110"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-[#005691]">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handle}
                    placeholder="e.g. Bosch Automotive"
                    className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-[#005691]">Contact Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="procurement@company.com"
                    value={form.email}
                    onChange={handle}
                    className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]"
                  />
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-[#005691]">Product Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handle}
                    className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691] text-[#505f76]"
                  >
                    <option value="">Select a category</option>
                    <option value="Valve Stem Seals">Valve Stem Seals</option>
                    <option value="O-Rings">O-Rings</option>
                    <option value="Oil Seals">Oil Seals</option>
                    <option value="Motorcycle Parts">Motorcycle Parts</option>
                    <option value="E-Bike Components">E-Bike Components</option>
                    <option value="Custom Solutions">Custom Solutions</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 text-left">
                  <label className="text-sm font-semibold text-[#005691]">Estimated Quantity</label>
                  <input
                    type="text"
                    name="quantity"
                    value={form.quantity}
                    onChange={handle}
                    placeholder="e.g. 10,000 units/month"
                    className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 text-left mb-6">
                <label className="text-sm font-semibold text-[#005691]">Technical Requirements</label>
                <textarea
                  name="requirements"
                  value={form.requirements}
                  onChange={handle}
                  rows={4}
                  placeholder="Describe your specifications, dimensions..."
                  className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691] resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-[#005691] text-white py-4 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md hover:brightness-110 disabled:opacity-75 cursor-pointer"
              >
                {sending ? (
                  <>
                    <span className="material-symbols-outlined text-base animate-spin">sync</span> Sending Email...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-base">send</span> Submit Inquiry
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}