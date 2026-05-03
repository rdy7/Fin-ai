import { Download, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { MOCK_PERFORMANCE, MOCK_SEGMENTS } from '../constants';
import { cn, formatCurrency, formatPercent } from '../lib/utils';

export default function AnalysisReport() {
  return (
    <div className="bg-slate-100 min-h-screen py-10">
      {/* Toolbar */}
      <div className="max-w-[21cm] mx-auto mb-8 px-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[10px] uppercase tracking-widest rounded shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Export PDF
        </button>
        <button className="px-4 py-2 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Share Report
        </button>
      </div>

      {/* A4 Document Wrapper */}
      <article className="bg-white shadow-2xl w-[21cm] min-h-[29.7cm] mx-auto p-[2.5cm] relative font-sans animate-slam-in">
        {/* Formal Header */}
        <header className="border-b-2 border-primary pb-8 mb-12 flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 uppercase">Strictly Confidential</p>
            <h1 className="text-2xl font-bold text-slate-900 uppercase">Analysis Report: Q3 Fiscal Review</h1>
            <p className="text-sm text-slate-500 italic mt-1 font-serif">Institutional Equities & Global Strategic Assessment</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-900 tracking-wider">REPORT ID: FIN-2023-Q3-084</p>
            <p className="text-xs text-slate-500 mt-1">Date: October 14, 2023</p>
            <p className="text-xs text-slate-500">Analyst: Senior Desk Review</p>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">1. Executive Summary</h2>
          <p className="text-base text-slate-900 leading-relaxed mb-8">
            This comprehensive financial evaluation covers the third fiscal quarter performance, highlighting institutional insights across global equity portfolios. The quarter was characterized by significant margin expansion in key markets, balanced by macroeconomic headwinds in emerging sectors.
          </p>
          <div className="grid grid-cols-3 gap-8 border-y border-slate-100 py-8">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Revenue</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-900">$4.28B</span>
                <span className="text-green-600 font-bold text-xs">+12.4%</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">EBITDA</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-900">$892M</span>
                <span className="text-green-600 font-bold text-xs">+5.2%</span>
              </div>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Net Debt</span>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-slate-900">$1.14B</span>
                <span className="text-red-600 font-bold text-xs">-2.1%</span>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-500 leading-relaxed italic">
            Net leverage ratio has been successfully reduced from 2.4x to 2.1x over the trailing twelve months, demonstrating disciplined capital allocation in a volatile environment.
          </p>
        </section>

        {/* Section 2: Financial Performance */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">2. Financial Performance</h2>
          <p className="text-sm text-slate-900 leading-relaxed mb-8">
            Historical performance demonstrates a consistent upward trajectory through the 2023 fiscal year. The chart below delineates the actuals against previous forecasts, highlighting a significant outperformance in Q3.
          </p>
          <div className="bg-slate-50 p-8 border border-slate-100 rounded mb-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[10px] font-bold text-slate-900 uppercase tracking-[0.15em]">Quarterly Trend Analysis</h3>
              <div className="flex gap-4">
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                   <div className="w-2.5 h-2.5 bg-primary rounded-sm" /> Actuals
                 </span>
                 <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase">
                   <div className="w-2.5 h-2.5 bg-slate-300 rounded-sm" /> Forecast
                 </span>
              </div>
            </div>
            <div className="h-40 flex items-end gap-6 border-b border-slate-200 pb-2">
              {MOCK_PERFORMANCE.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2 group">
                  <div className="w-full bg-primary" style={{ height: `${d.actual}%` }} />
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{d.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: AI Strategic Assessment */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">3. Strategic AI Assessment</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-6 bg-green-50 border-l-4 border-green-500 rounded-r shadow-sm">
              <Sparkles className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Margin Optimization Forecast</p>
                <p className="text-sm text-slate-900 leading-relaxed">
                  EBITDA expansion of 420bps predicted for next quarter due to operational efficiencies in the APAC sector. Institutional investors should note the alignment with high-yield reinvestment opportunities in R&D.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-red-50 border-l-4 border-red-500 rounded-r shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-1">Market Risk Advisory</p>
                <p className="text-sm text-slate-900 leading-relaxed">
                  Currency fluctuations in emerging markets may impact net income by approximately 3.4%. Management recommends hedging strategies for the upcoming fiscal cycle to preserve capital integrity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="absolute bottom-[1cm] left-[2cm] right-[2cm] flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100 pt-6">
          <span>© 2023 Finalyze Core - Institutional Asset Management</span>
          <span>Page 1 of 12</span>
          <span>Internal Use Only</span>
        </footer>
      </article>
    </div>
  );
}
