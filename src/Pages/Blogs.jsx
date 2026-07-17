import { useState } from 'react'

const POSTS = [
  {
    id: 1,
    category: 'Technical',
    title: 'Understanding Valve Stem Seal Materials: FKM vs VMQ vs NBR',
    excerpt: 'A deep-dive into the three most common elastomers used in valve stem seal manufacturing — comparing thermal resistance, chemical compatibility, and long-term durability in real engine environments.',
    date: 'May 20, 2026',
    readTime: '6 min read',
    icon: 'science',
  },
  {
    id: 2,
    category: 'Industry',
    title: 'Global Sealing Market Trends 2026: What Manufacturers Need to Know',
    excerpt: 'Supply chain disruptions, raw material price volatility, and the shift to EV powertrains are reshaping the industrial sealing landscape. We break down what these trends mean for procurement teams.',
    date: 'April 14, 2026',
    readTime: '5 min read',
    icon: 'trending_up',
  },
  {
    id: 3,
    category: 'Technical',
    title: 'O-Ring Failure Analysis: The 7 Most Common Causes and How to Prevent Them',
    excerpt: 'From extrusion and spiral failure to chemical attack and compression set — learn how to identify O-ring failure modes early, and which material and design changes eliminate them.',
    date: 'March 8, 2026',
    readTime: '8 min read',
    icon: 'build',
  },
  {
    id: 4,
    category: 'Quality',
    title: 'What ISO 9001:2015 Really Means for Your Sealing Component Supplier',
    excerpt: 'ISO certification is more than a badge. Understand what a genuinely implemented QMS means for incoming inspection, process control, corrective action, and the traceability of every batch you receive.',
    date: 'February 22, 2026',
    readTime: '4 min read',
    icon: 'verified',
  },
  {
    id: 5,
    category: 'Logistics',
    title: 'Exporting Industrial Components from Pakistan: ATI\'s Logistics Playbook',
    excerpt: 'How ATI International manages end-to-end logistics for shipments to Europe, the Middle East, Africa, and the Americas — covering documentation, Incoterms, transit times, and customs clearance.',
    date: 'January 10, 2026',
    readTime: '5 min read',
    icon: 'local_shipping',
  },
  {
    id: 6,
    category: 'Technical',
    title: 'Custom Seal Design: From Drawing to First Article in 14 Days',
    excerpt: 'Walk through ATI International\'s rapid prototyping process — DFM review, mold design, sample production, and first article inspection — and how we help customers qualify new seals faster.',
    date: 'December 5, 2025',
    readTime: '7 min read',
    icon: 'design_services',
  },
]

const CATEGORIES = ['All', 'Technical', 'Industry', 'Quality', 'Logistics']
const CATEGORY_COLORS = {
  Technical: 'bg-blue-100 text-blue-700',
  Industry: 'bg-green-100 text-green-700',
  Quality: 'bg-purple-100 text-purple-700',
  Logistics: 'bg-orange-100 text-orange-700',
}

export default function Blogs() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? POSTS : POSTS.filter((p) => p.category === activeCategory)

  return (
    <div className="bg-[#f7f9fb] min-h-screen">

      {/* Hero */}
      <section className="bg-[#005691] py-20 px-8">
        <div className="max-w-[1280px] mx-auto">
          <span className="inline-block px-3 py-1 bg-white/20 text-white text-xs font-semibold rounded mb-6 uppercase tracking-widest">Knowledge Hub</span>
          <h1 className="text-4xl md:text-4xl font-bold text-white mb-4">ATI International Blog</h1>
          <p className="text-white/80 text-lg max-w-2xl">Technical insights, industry trends, and procurement guides from our engineering and supply chain teams.</p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="bg-white border-b border-[#c5c6cd] sticky top-24 z-40">
        <div className="max-w-[1280px] mx-auto px-8 flex gap-2 overflow-x-auto py-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat ? 'bg-[#005691] text-white' : 'text-[#505f76] hover:bg-[#f2f4f6]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="max-w-[1280px] mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((post) => (
            <article key={post.id} className="bg-white border border-[#c5c6cd] rounded-xl overflow-hidden hover:shadow-md transition-shadow group cursor-pointer hover:scale-105 transition-transform duration-500">
              <div className="h-48 bg-[#005691]/10 flex items-center justify-center group-hover:bg-[#005691]/20 transition-colors">
                <span className="material-symbols-outlined text-[#005691] text-6xl">{post.icon}</span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${CATEGORY_COLORS[post.category]}`}>{post.category}</span>
                  <span className="text-xs text-[#505f76]">{post.readTime}</span>
                </div>
                <h3 className="font-bold text-[#005691] text-lg leading-snug mb-3 group-hover:underline">{post.title}</h3>
                <p className="text-[#505f76] text-sm leading-relaxed mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#505f76]">{post.date}</span>
                  <button className="text-[#005691] text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[#c5c6cd] text-6xl mb-4 block">article</span>
            <p className="text-[#505f76]">No posts in this category yet.</p>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-[#005691] text-white rounded-2xl p-10 text-center">
          <h3 className="text-2xl font-bold mb-3">Stay Informed</h3>
          <p className="text-white/80 mb-8 max-w-md mx-auto">Get the latest technical articles and industry updates delivered to your inbox.</p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-lg text-sm text-[#191c1e] outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-[#005691] px-6 py-3 rounded-lg font-semibold text-sm hover:brightness-105 transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}