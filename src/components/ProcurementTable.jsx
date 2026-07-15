const ROWS = [
  { part: 'ATI-VS-5022', material: 'Viton-75 (FKM)',   dims: '22.0 x 3.5',  temp: '-20 to +200', moq: '5,000 units'  },
  { part: 'ATI-OR-991',  material: 'NBR-90 High Grade', dims: '140.2 x 8.0', temp: '-40 to +120', moq: '2,500 units'  },
  { part: 'ATI-SL-12-B', material: 'Stainless/Viton',  dims: '88.0 OD',     temp: '-30 to +250', moq: '1,000 units'  },
  { part: 'ATI-VS-7822', material: 'Silicone VMQ',     dims: '18.0 x 2.0',  temp: '-60 to +230', moq: '10,000 units' },
]

export default function ProcurementTable() {
  return (
    <section className="bg-[#f7f9fb] py-20">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-[32px] font-bold text-[#005691]">Procurement Overview</h2>
            <p className="text-base text-[#505f76] mt-2">MOQ and technical data for bulk manufacturing orders.</p>
          </div>
          <a href="#" className="text-[#005691] text-sm font-semibold flex items-center gap-1 bg-[#f2f4f6] px-4 py-2 rounded border border-[#c5c6cd]">
            Enterprise Portal <span className="material-symbols-outlined text-base">launch</span>
          </a>
        </div>
        <div className="overflow-hidden border border-[#c5c6cd] rounded-xl bg-white shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-[#eceef0] text-[#005691]">
                {['Part Number','Material Code','Dimensions (mm)','Temp Range (°C)','MOQ','Action'].map((h) => (
                  <th key={h} className={`p-5 text-sm font-semibold ${h==='Action'?'text-right':''}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm text-[#505f76]">
              {ROWS.map((row, i) => (
                <tr key={row.part} className={`border-b border-[#c5c6cd] hover:bg-[#f2f4f6] transition-colors ${i%2===1?'bg-[#f1f5f9]':'bg-white'}`}>
                  <td className="p-5 font-mono text-[#005691] font-semibold">{row.part}</td>
                  <td className="p-5">{row.material}</td>
                  <td className="p-5">{row.dims}</td>
                  <td className="p-5">{row.temp}</td>
                  <td className="p-5 font-medium text-[#005691]">{row.moq}</td>
                  <td className="p-5 text-right">
                    <button className="bg-[#005691] text-white px-4 py-2 rounded text-xs font-semibold hover:brightness-110">Add to Inquiry</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}