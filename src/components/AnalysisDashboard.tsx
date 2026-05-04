import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ComposedChart } from 'recharts';
import { Download, Share2, Sparkles, TrendingUp, Wallet, LayoutDashboard } from 'lucide-react';
import { cn, formatCurrency, formatPercent } from '../lib/utils';
import { DashboardTab } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface AnalysisDashboardProps {
  fileName?: string | null;
  data?: any;
}

export default function AnalysisDashboard({ fileName, data }: AnalysisDashboardProps) {
  const [activeTab, setActiveTab] = useState<DashboardTab>('Overview');

  const summary = data?.summary || {
    revenue: 0,
    ebitda: 0,
    net_income: 0,
    adjusted_impact: 0
  };

  const dreData = data?.dre || [];
  const balanceSheet = data?.balance_sheet || { assets: [], liabilities: [] };

  const performanceData = [
    { name: 'Receita', actual: summary.revenue, previous: summary.previous_revenue || 0 },
    { name: 'EBITDA', actual: summary.ebitda, previous: summary.previous_ebitda || 0 },
    { name: 'Lucro Líquido', actual: summary.net_income, previous: summary.previous_net_income || 0 }
  ];

  const insights = [
    {
      type: 'AI OBSERVATION',
      description: `O impacto ajustado foi de ${formatCurrency(summary.adjusted_impact)}. ` +
        (summary.adjusted_impact >= 0 ? 'Os eventos não recorrentes geraram impacto positivo.' : 'Os eventos não recorrentes geraram impacto negativo.'),
      isPositive: summary.adjusted_impact >= 0
    }
  ];




  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Receita Bruta', value: summary.revenue, change: 12.4, target: 6500000, color: 'primary' },
          { label: 'EBITDA', value: summary.ebitda, change: 5.2, isChart: true },
          { label: 'Lucro Líquido', value: summary.net_income, change: 2.1, desc: 'Resultado após ajustes e eventos não recorrentes.' }
        ].map((kpi, i) => (

          <div key={kpi.label} className="bg-white border border-slate-200 p-8 rounded shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{kpi.label}</span>
              <span className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold",
                kpi.change > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              )}>
                {kpi.label === 'ROE' ? formatPercent(kpi.value) : formatPercent(kpi.change)}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-slate-900">
                {kpi.label === 'ROE' ? formatPercent(kpi.value) : formatCurrency(kpi.value)}
              </span>
              {kpi.label !== 'ROE' && <span className="text-[10px] font-bold text-slate-400">BRL</span>}
            </div>
            {kpi.target && (
              <div className="mt-6">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(kpi.value / kpi.target) * 100}%` }} />
                </div>
                <p className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Meta: {formatCurrency(kpi.target)}</p>
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

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 p-8 rounded shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Performance Comparativa</h3>
            <div className="flex gap-4">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="w-2.5 h-2.5 bg-primary rounded-sm" /> Atual
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                <div className="w-2.5 h-2.5 bg-slate-200 rounded-sm" /> Anterior
              </span>
            </div>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
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
                  itemStyle={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#fff' }}
                  formatter={(val: number) => formatCurrency(val)}
                />
                <Bar dataKey="actual" name="Atual" fill="#041627" radius={[2, 2, 0, 0]} barSize={40} />
                <Bar dataKey="previous" name="Anterior" fill="#e2e8f0" radius={[2, 2, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        <div className="col-span-12 lg:col-span-4 bg-primary text-white p-8 rounded relative overflow-hidden shadow-lg">
          <div className="relative z-10 h-full flex flex-col">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="w-5 h-5 text-tertiary-fixed" />
              <h3 className="text-xl font-bold">Insights Estratégicos (IA)</h3>
            </div>
            <div className="space-y-8 flex-1">
              {insights.map((insight, i) => (
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
              Ver Análise Detalhada
            </button>
          </div>
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
        </div>
      </div>
    </div>
  );

  const renderDRE = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="bg-white border border-slate-200 p-8 rounded shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Cascata de Resultados (DRE)</h3>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dreData} layout="vertical" margin={{ top: 5, right: 30, left: 100, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} hide />
              <YAxis
                type="category"
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#041627', fontSize: 11, fontWeight: 700 }}
                width={120}
              />
              <Tooltip
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ backgroundColor: '#041627', border: 'none', borderRadius: '4px', color: '#fff' }}
                itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                formatter={(val: number) => formatCurrency(val)}
              />
              <Bar dataKey="value" name="Valor" barSize={32}>
                {dreData.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.type === 'result' ? '#041627' : entry.value > 0 ? '#10b981' : '#ef4444'}
                  />
                ))}
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Descrição</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Anterior (BRL)</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Atual (BRL)</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Var. YoY</th>
              <th className="px-8 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">% Receita</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {dreData.map((item: any) => {
              const hasPrevious = item.previous_value !== undefined && item.previous_value !== null && item.previous_value !== 0;
              const yoy = hasPrevious ? (item.value / item.previous_value) - 1 : null;
              
              // Define color logic based on item type
              let yoyColor = "text-slate-500";
              if (yoy !== null) {
                const isGoodIncrease = item.type === 'positive' || item.type === 'total' || item.type === 'result';
                if (yoy > 0) {
                  yoyColor = isGoodIncrease ? "text-green-600" : "text-red-600";
                } else if (yoy < 0) {
                  yoyColor = isGoodIncrease ? "text-red-600" : "text-green-600";
                }
              }

              return (
                <tr key={item.name} className={cn(
                  "hover:bg-slate-50/50 transition-colors",
                  item.type === 'result' || item.type === 'total' ? "bg-slate-50/30 font-bold" : ""
                )}>
                  <td className="px-8 py-4 text-sm text-slate-900">{item.name}</td>
                  <td className="px-8 py-4 text-sm text-right text-slate-500 tabular-nums">
                    {item.previous_value ? formatCurrency(item.previous_value) : '-'}
                  </td>
                  <td className={cn(
                    "px-8 py-4 text-sm text-right tabular-nums",
                    item.value < 0 ? "text-red-600" : "text-slate-900"
                  )}>{formatCurrency(item.value)}</td>
                  <td className={cn("px-8 py-4 text-sm text-right tabular-nums", yoyColor)}>
                    {yoy !== null ? (yoy > 0 ? `+${formatPercent(yoy)}` : formatPercent(yoy)) : '-'}
                  </td>
                  <td className="px-8 py-4 text-sm text-right text-slate-500 tabular-nums">
                    {summary.revenue ? formatPercent(Math.abs(item.value / summary.revenue)) : '-'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderBalanceSheet = () => (
    <div className="grid grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 p-8 rounded shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Composição dos Ativos</h3>
        <div className="space-y-6">
          {balanceSheet.assets.map((item: any) => (
            <div key={item.name}>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700">{item.name}</span>
                <span className="text-sm font-medium text-slate-900">{formatCurrency(item.value)}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `100%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-6 bg-white border border-slate-200 p-8 rounded shadow-sm">
        <h3 className="text-xl font-bold text-slate-900 mb-8">Passivos e Patrimônio</h3>
        <div className="space-y-6">
          {balanceSheet.liabilities.map((item: any) => (
            <div key={item.name}>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-slate-700">{item.name}</span>
                <span className="text-sm font-medium text-slate-900">{formatCurrency(item.value)}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400" style={{ width: `100%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-[1440px] mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 block uppercase">Análise de Relatórios Financeiros</span>
          <h1 className="text-3xl font-bold text-slate-900">{fileName ? `Análise: ${fileName}` : 'Painel Consolidado'}</h1>
          <p className="text-slate-500 mt-1 font-medium italic">Visão institucional estratégica baseada em DRE e Balanço Patrimonial.</p>
        </div>

        <div className="flex gap-4">
          <button className="px-6 py-2 border border-primary text-primary font-bold text-xs tracking-widest rounded flex items-center gap-2 hover:bg-primary/5 transition-colors">
            <Download className="w-4 h-4" /> EXPORTAR PDF
          </button>
          <button className="px-6 py-2 bg-primary text-white font-bold text-xs tracking-widest rounded flex items-center gap-2 hover:opacity-90 transition-opacity">
            <Share2 className="w-4 h-4" /> COMPARTILHAR
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-slate-200">
        {[
          { id: 'Overview', label: 'Visão Geral', icon: LayoutDashboard },
          { id: 'DRE', label: 'DRE Detalhado', icon: TrendingUp },
          { id: 'BalanceSheet', label: 'Balanço Patrimonial', icon: Wallet },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as DashboardTab)}
            className={cn(
              "pb-4 text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-2 transition-all relative",
              activeTab === tab.id ? "text-primary" : "text-slate-400 hover:text-slate-600"
            )}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'Overview' && renderOverview()}
          {activeTab === 'DRE' && renderDRE()}
          {activeTab === 'BalanceSheet' && renderBalanceSheet()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

