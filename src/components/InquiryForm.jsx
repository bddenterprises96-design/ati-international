import { useState } from 'react'

export default function InquiryForm() {
  const [email, setEmail] = useState('')

  return (
    <section className="bg-[#f7f9fb] py-20">
      <div className="max-w-[1280px] mx-auto px-8 text-center">
        <h2 className="text-[32px] font-bold text-[#005691] mb-3">Start Your Inquiry</h2>
        <p className="text-base text-[#505f76] mb-10 max-w-xl mx-auto">
          Submit your product requirements and our engineering team will respond within 24 hours.
        </p>
        <div className="max-w-2xl mx-auto bg-white border border-[#c5c6cd] rounded-xl p-10 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-semibold text-[#005691]">Company Name</label>
              <input type="text" placeholder="e.g. Bosch Automotive"
                className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]" />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-semibold text-[#005691]">Contact Email</label>
              <input type="email" placeholder="procurement@company.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]" />
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-semibold text-[#005691]">Product Category</label>
              <select className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691] text-[#505f76]">
                <option>Select a category</option>
                <option>Valve Stem Seals</option>
                <option>O-Rings</option>
                <option>Oil Seals</option>
                <option>Custom Solutions</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-semibold text-[#005691]">Estimated Quantity</label>
              <input type="text" placeholder="e.g. 10,000 units/month"
                className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691]" />
            </div>
          </div>
          <div className="flex flex-col gap-2 text-left mb-6">
            <label className="text-sm font-semibold text-[#005691]">Technical Requirements</label>
            <textarea rows={4} placeholder="Describe your specifications, dimensions..."
              className="px-4 py-3 bg-[#f2f4f6] border border-[#c5c6cd] rounded text-sm outline-none focus:ring-1 focus:ring-[#005691] resize-none" />
          </div>
          <button className="w-full bg-[#005691] text-white py-4 text-sm font-semibold rounded-lg flex items-center justify-center gap-2 shadow-md hover:brightness-110">
            <span className="material-symbols-outlined text-base">send</span> Submit Inquiry
          </button>
        </div>
      </div>
    </section>
  )
}