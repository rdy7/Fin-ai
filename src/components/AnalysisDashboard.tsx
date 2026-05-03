import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Download, Share2, TrendingUp, TrendingDown, Sparkles, Search } from 'lucide-react';
import { MOCK_PERFORMANCE, MOCK_INSIGHTS, MOCK_SEGMENTS } from '../constants';
import { cn, formatCurrency, formatPercent } from '../lib/utils';

export default function AnalysisDashboard() {
  return (
    <div className="max-w-[1440px] mx-auto animate-slam-in space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 block uppercase">Quarterly Performance Report</span>
          <h1 className="text-3xl font-bold text-slate-900">Analysis Report: Q3 Fiscal Review</h1>
          <p className="text-slate-500 mt-1">Comprehensive financial evaluation and institutional insights for global equities.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-2 border border-primary text-primary font-bold text-xs tracking-widest rounded flex items-center gap-2 hover:bg-primary/5 transition-colors">
            <Download className="w-4 h-4" /> EXPORT PDF
          </button>
          <button className="px-6 py-2 bg-primary text-white font-bold text-xs tracking-widest rounded flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Share2 className="w-4 h-4" /> SHARE REPORT
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Revenue', value: 4.28e9, change: 12.4, target: 5.5e9, color: 'primary' },
          { label: 'EBITDA', value: 892e6, change: 5.2, isChart: true },
          { label: 'Net Debt', value: 1.14e9, change: -2.1, desc: 'Reduced leverage ratio from 2.4x to 2.1x over TTM.' }
        ].map((kpi, i) => (
          <div key={kpi.label} className="bg-white border border-slate-200 p-8 rounded shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold",
                kpi.change > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                {formatPercent(kpi.change)}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">{formatCurrency(kpi.value)}</span>
              <span className="text-[10px] font-bold text-slate-400">USD</span>
            </div>
            {kpi.target && (
              <div className="mt-6">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(kpi.value / kpi.target) * 100}%` }} />
                </div>
                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Target: {formatCurrency(kpi.target)}</p>
              </div>
            )}
            {kpi.isChart && (
              <div className="mt-6 flex gap-1 items-end h-12">
                {[40, 60, 55, 75, 90].map((h, j) => (
                  <div key={j} className={cn("w-full rounded-t-sm", j === 4 ? "bg-primary" : "bg-slate-100")} style={{ height: `${h}%` }} />
                ))}
              </div>
            )}
            {kpi.desc && (
              <p className="mt-6 text-sm text-slate-500 leading-relaxed font-medium">{kpi.desc}</p>
            )}
          </div>
        ))}
      </div>

      {/* Main Analysis Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Performance Chart */}
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 p-8 rounded shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Quarterly Performance Detail</h3>
            <div className="flex gap-4">
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                 <div className="w-2.5 h-2.5 bg-primary rounded-sm" /> Actuals
               </span>
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                 <div className="w-2.5 h-2.5 bg-slate-200 rounded-sm" /> Forecast
               </span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_PERFORMANCE} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ backgroundColor: '#041627', border: 'none', borderRadius: '4px', color: '#fff' }}
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}
                />
                <Bar dataKey="actual" fill="#041627" radius={[2, 2, 0, 0]} barSize={40} />
                <Bar dataKey="forecast" fill="#e2e8f0" radius={[2, 2, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights */}
        <div className="col-span-12 lg:col-span-4 bg-primary text-white p-8 rounded relative overflow-hidden shadow-lg">
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-tertiary-fixed" />
              <h3 className="text-xl font-bold">AI Strategic Insights</h3>
            </div>
            <div className="space-y-8 flex-1">
              {MOCK_INSIGHTS.map((insight, i) => (
                <div key={i} className={cn(
                  "border-l-2 pl-6",
                  insight.isPositive ? "border-tertiary-fixed" : "border-white/20"
                )}>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-widest mb-1",
                    insight.isPositive ? "text-tertiary-fixed-dim" : "text-white/60"
                  )}>{insight.type}</p>
                  <p className="text-sm font-medium leading-relaxed opacity-90">{insight.description}</p>
                </div>
              ))}
            </div>
            <button className="mt-8 w-full py-4 border border-white/20 hover:bg-white/10 transition-colors text-[10px] font-bold uppercase tracking-[0.2em] rounded">
              Review Deep Analysis
            </button>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        </div>
      </div>

      {/* Segment Table */}
      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-slate-900">Detailed Segment Performance</h3>
          <div className="relative">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text" 
               placeholder="Filter segments..." 
               className="pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded text-sm focus:outline-none focus:ring-1 focus:ring-primary w-64 font-medium" 
             />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Segment Name</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Market Share</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">YoY Revenue</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">EBITDA Margin</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_SEGMENTS.map((segment) => (
                <tr key={segment.name} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-4 text-sm font-bold text-slate-900">{segment.name}</td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-600 text-right data-tabular">{segment.marketShare}</td>
                  <td className={cn(
                    "px-8 py-4 text-sm font-bold text-right data-tabular",
                    segment.yoyRevenue > 0 ? "text-green-600" : "text-red-600"
                  )}>
                    {formatPercent(segment.yoyRevenue)}
                  </td>
                  <td className="px-8 py-4 text-sm font-medium text-slate-600 text-right data-tabular">{segment.ebitdaMargin}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "flex items-center gap-2 text-[10px] font-bold",
                      segment.status === 'OUTPERFORM' && "text-green-700",
                      segment.status === 'STABLE' && "text-slate-500",
                      segment.status === 'UNDERPERFORM' && "text-red-700",
                    )}>
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        segment.status === 'OUTPERFORM' && "bg-green-400",
                        segment.status === 'STABLE' && "bg-slate-300",
                        segment.status === 'UNDERPERFORM' && "bg-red-400",
                      )} />
                      {segment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
