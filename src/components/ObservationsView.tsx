import { Plus, X, BarChart2, AlertTriangle, Rocket, History, TrendingUp, TrendingDown, Info, Trash2 } from 'lucide-react';
import { cn, formatCurrency } from '../lib/utils';
import { useState } from 'react';
import { ExtraordinaryEvent } from '../types';

interface ObservationsViewProps {
  onFinish: (events: ExtraordinaryEvent[]) => void;
}

export default function ObservationsView({ onFinish }: ObservationsViewProps) {

  const [events, setEvents] = useState<ExtraordinaryEvent[]>([]);


  const [newDesc, setNewDesc] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newType, setNewType] = useState<'revenue' | 'expense'>('expense');

  const addEvent = () => {
    if (!newDesc || !newValue) return;
    const event: ExtraordinaryEvent = {
      id: Math.random().toString(36).substr(2, 9),
      description: newDesc,
      value: parseFloat(newValue),
      type: newType,
      category: 'Ajuste Manual'
    };
    setEvents([...events, event]);
    setNewDesc('');
    setNewValue('');
  };

  const removeEvent = (id: string) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const totalRevenue = events.filter(e => e.type === 'revenue').reduce((acc, curr) => acc + curr.value, 0);
  const totalExpense = events.filter(e => e.type === 'expense').reduce((acc, curr) => acc + curr.value, 0);
  const netImpact = totalRevenue - totalExpense;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <header className="flex justify-between items-end bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 block uppercase">Passo 2: Curadoria Humana</span>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Ajustes e Eventos Não Recorrentes</h1>
          <p className="text-slate-500 max-w-xl text-sm leading-relaxed">
            Identifique receitas ou gastos extraordinários que distorcem a análise real do negócio. Isso ajudará a IA a calcular o **Lucro Normalizado**.
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => onFinish(events)}
            className="px-8 py-3 bg-primary text-white font-bold text-xs tracking-widest rounded transition-all hover:opacity-90 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2"
          >

            GERAR PAINEL AJUSTADO <Rocket className="w-4 h-4" />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Add Adjustment Form */}
          <section className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-slate-900">
              <Plus className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-bold">Novo Evento Extraordinário</h3>
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Descrição do Evento</label>
                <input 
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="Ex: Reforma após sinistro, Venda de ativo..."
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Valor (R$)</label>
                <input 
                  type="number"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none"
                  placeholder="0,00"
                />
              </div>
              <div className="col-span-3">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Natureza</label>
                <select 
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as 'revenue' | 'expense')}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm focus:ring-1 focus:ring-primary outline-none"
                >
                  <option value="revenue">Receita (+)</option>
                  <option value="expense">Despesa (-)</option>
                </select>
              </div>
              <div className="col-span-12 mt-2">
                <button 
                  onClick={addEvent}
                  className="w-full py-3 bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded hover:bg-slate-800 transition-colors"
                >
                  Adicionar Ajuste à Análise
                </button>
              </div>
            </div>
          </section>

          {/* List of Adjustments */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">Itens sob Curadoria</h3>
              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{events.length} itens</span>
            </div>
            <div className="divide-y divide-slate-100">
              {events.length === 0 ? (
                <div className="p-12 text-center">
                  <p className="text-slate-400 italic text-sm">Nenhum evento extraordinário adicionado.</p>
                </div>
              ) : (
                events.map(event => (
                  <div key={event.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        event.type === 'revenue' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      )}>
                        {event.type === 'revenue' ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{event.description}</p>
                        <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{event.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className={cn(
                        "font-bold text-sm tabular-nums",
                        event.type === 'revenue' ? "text-green-600" : "text-red-600"
                      )}>
                        {event.type === 'revenue' ? '+' : '-'} {formatCurrency(event.value)}
                      </span>
                      <button 
                        onClick={() => removeEvent(event.id)}
                        className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Sidebar Summary */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-[10px] font-bold tracking-widest uppercase mb-6 text-white/50">Impacto no Resultado</h4>
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Ganhos Não Recorrentes</span>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(totalRevenue)}</p>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Perdas Extraordinárias</span>
                  <p className="text-2xl font-bold text-red-400">-{formatCurrency(totalExpense)}</p>
                </div>
                <div className="pt-6 border-t border-white/10">
                  <span className="text-[10px] font-bold text-white/40 uppercase block mb-1">Impacto Líquido Ajustado</span>
                  <p className={cn(
                    "text-3xl font-black tabular-nums",
                    netImpact >= 0 ? "text-primary" : "text-red-500"
                  )}>
                    {netImpact >= 0 ? '+' : ''}{formatCurrency(netImpact)}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-blue-50 border border-blue-100 p-8 rounded-xl">
            <div className="flex items-center gap-2 mb-4 text-primary">
              <Info className="w-5 h-5" />
              <h4 className="text-xs font-bold uppercase tracking-wider">Por que ajustar?</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Itens não recorrentes "sujam" a visão da operação. Ao isolá-los, a IA consegue projetar a **capacidade real de geração de caixa** da empresa nos próximos trimestres.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
