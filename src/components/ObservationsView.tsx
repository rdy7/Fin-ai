import { Settings, Plus, Info as InfoIcon, X, BarChart2, AlertTriangle, Rocket, History } from 'lucide-react';
import { cn } from '../lib/utils';
import { useState } from 'react';

export default function ObservationsView() {
  const [tags, setTags] = useState(['Macro Trends', 'Volatility']);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-slam-in">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Observations & Caveats</h1>
          <p className="text-slate-500">Document professional insights and risk assessments for Q3 Portfolio Review.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-primary text-primary font-bold text-xs tracking-widest rounded transition-colors hover:bg-primary/5">
            SAVE DRAFT
          </button>
          <button className="px-6 py-2 bg-primary text-white font-bold text-xs tracking-widest rounded transition-opacity hover:opacity-90 shadow-sm">
            FINALIZE ANALYSIS
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          {/* General Observations */}
          <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <BarChart2 className="w-6 h-6" />
              <h3 className="text-xl font-bold">General Observations</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Primary Insights</label>
                <textarea 
                  className="w-full bg-[#f7f9ff] border border-slate-200 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm min-h-[120px]"
                  placeholder="Enter high-level market context and quantitative summaries..."
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Category Tags</label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="inline-flex items-center gap-1 px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-full">
                      {tag} <X className="w-3 h-3 cursor-pointer" onClick={() => setTags(tags.filter(t => t !== tag))} />
                    </span>
                  ))}
                  <button className="inline-flex items-center gap-1 px-3 py-1 border border-slate-200 text-slate-500 text-[10px] font-bold rounded-full hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-3 h-3" /> Add Category
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-red-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-xl font-bold">Risk Factors</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Critical Risk Assessment</label>
                <textarea 
                  className="w-full bg-[#f7f9ff] border border-slate-200 rounded-lg p-4 focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm min-h-[120px]"
                  placeholder="Identify potential downsides, liquidity constraints, or regulatory shifts..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Impact Level</label>
                  <select defaultValue="High (Systemic)" className="w-full bg-[#f7f9ff] border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary">
                    <option>Low (Transactional)</option>
                    <option>Medium (Structural)</option>
                    <option>High (Systemic)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Probability</label>
                  <select defaultValue="25-50%" className="w-full bg-[#f7f9ff] border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary">
                    <option>0-25%</option>
                    <option>25-50%</option>
                    <option>50-75%</option>
                    <option>75-100%</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Recommendations */}
          <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-green-700">
              <Rocket className="w-6 h-6" />
              <h3 className="text-xl font-bold">Strategic Recommendations</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Action Plan</label>
                <textarea 
                  className="w-full bg-[#f7f9ff] border border-slate-200 rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary text-sm min-h-[120px]"
                  placeholder="Provide actionable steps for portfolio rebalancing or risk mitigation..."
                />
              </div>
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <InfoIcon className="w-5 h-5 text-green-700 shrink-0" />
                <p className="text-sm font-medium text-green-800">These recommendations will be directly reflected in the final investor presentation.</p>
              </div>
            </div>
          </section>
        </div>

        {/* Info Sidebar */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-primary text-white p-8 rounded-xl shadow-md relative overflow-hidden">
             <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />
             <h4 className="text-[10px] font-bold tracking-widest uppercase mb-4 opacity-70">Analyst Summary</h4>
             <div className="space-y-3">
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Review Status</span>
                 <span className="font-bold text-[10px] uppercase">In Progress</span>
               </div>
               <div className="flex justify-between border-b border-white/10 pb-2">
                 <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Asset Class</span>
                 <span className="font-bold text-[10px] uppercase">Equities</span>
               </div>
               <div className="flex justify-between">
                 <span className="text-white/60 text-[10px] font-bold uppercase tracking-wider">Last Sync</span>
                 <span className="font-bold text-[10px] uppercase">12:45 PM Today</span>
               </div>
             </div>
             <p className="mt-8 text-[10px] text-white/40 leading-relaxed italic border-t border-white/10 pt-6">
               "Documenting the structural shift in yield curves requires precise categorization of duration risks."
             </p>
          </div>

          <div className="bg-slate-100/50 p-8 rounded-xl border border-slate-200">
            <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 text-slate-500">Historical Context</h4>
            <div className="space-y-6">
              {[
                { label: 'Q2 2024 Analysis', desc: 'Recommended conservative positioning due to inflation prints.' },
                { label: 'Q1 2024 Analysis', desc: 'Identified tech sector growth catalyst before earnings season.' }
              ].map((item, i) => (
                <div key={item.label} className="flex gap-3">
                  <div className={cn("w-1 h-12 rounded-full", i === 0 ? "bg-primary" : "bg-slate-300")} />
                  <div>
                    <p className="text-[10px] font-bold text-slate-900 uppercase tracking-wider">{item.label}</p>
                    <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-2 text-[10px] font-bold text-primary hover:underline flex items-center justify-center gap-1 uppercase tracking-widest">
              <History className="w-3 h-3" /> View Full Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
