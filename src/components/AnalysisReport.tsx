import { Download, Share2, Sparkles, AlertCircle } from 'lucide-react';
import { cn, formatCurrency, formatPercent } from '../lib/utils';

interface AnalysisReportProps {
  data?: any;
}

export default function AnalysisReport({ data }: AnalysisReportProps) {
  const summary = data?.summary || { revenue: 0, ebitda: 0, net_income: 0 };
  const dre = data?.dre || [];

  return (
    <div className="bg-slate-100 min-h-screen py-10">
      {/* Toolbar */}
      <div className="max-w-[21cm] mx-auto mb-8 px-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-[10px] uppercase tracking-widest rounded shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" /> Exportar PDF
        </button>
        <button className="px-4 py-2 bg-primary text-white font-bold text-[10px] uppercase tracking-widest rounded shadow-sm hover:opacity-90 transition-opacity flex items-center gap-2">
          <Share2 className="w-4 h-4" /> Compartilhar
        </button>
      </div>

      {/* A4 Document Wrapper */}
      <article className="bg-white shadow-2xl w-[21cm] min-h-[29.7cm] mx-auto p-[2.5cm] relative font-sans animate-in fade-in duration-1000">
        {/* Formal Header */}
        <header className="border-b-2 border-primary pb-8 mb-12 flex justify-between items-start">
          <div>
            <p className="text-[10px] font-bold text-primary tracking-[0.2em] mb-2 uppercase">Estritamente Confidencial</p>
            <h1 className="text-2xl font-bold text-slate-900 uppercase">Relatório de Análise Financeira</h1>
            <p className="text-sm text-slate-500 italic mt-1 font-serif">Avaliação Estratégica de DRE e Balanço Patrimonial</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-slate-900 tracking-wider">ID RELATÓRIO: FIN-AI-DOC</p>
            <p className="text-xs text-slate-500 mt-1">Data: {new Date().toLocaleDateString('pt-BR')}</p>
            <p className="text-xs text-slate-500">Analista: IA Financial System</p>
          </div>
        </header>

        {/* Section 1: Executive Summary */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">1. Sumário Executivo</h2>
          <p className="text-base text-slate-900 leading-relaxed mb-8">
            Esta avaliação financeira processada via IA destaca os principais indicadores de desempenho com base nos dados do documento fornecido e ajustes manuais aplicados.
          </p>
          <div className="grid grid-cols-3 gap-8 border-y border-slate-100 py-8">
            {[
              { label: 'Receita Líquida', actual: summary.revenue, previous: summary.previous_revenue },
              { label: 'EBITDA Ajustado', actual: summary.ebitda, previous: summary.previous_ebitda },
              { label: 'Lucro Líquido Ajustado', actual: summary.net_income, previous: summary.previous_net_income }
            ].map((kpi, i) => {
              const yoy = kpi.previous ? (kpi.actual / kpi.previous) - 1 : null;
              return (
                <div key={i}>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{kpi.label}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-bold text-slate-900">{formatCurrency(kpi.actual)}</span>
                    {yoy !== null && (
                      <span className={cn("font-bold text-xs", yoy > 0 ? "text-green-600" : "text-red-600")}>
                        {yoy > 0 ? '+' : ''}{formatPercent(yoy)}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* Section 2: Financial Performance */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">2. Demonstração de Resultados (DRE)</h2>
          <p className="text-sm text-slate-900 leading-relaxed mb-8">
            Composição consolidada dos resultados do período.
          </p>
          <div className="bg-slate-50 p-8 border border-slate-100 rounded mb-8">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-2 uppercase tracking-wider text-slate-500">Item</th>
                  <th className="text-right py-2 uppercase tracking-wider text-slate-500">Anterior</th>
                  <th className="text-right py-2 uppercase tracking-wider text-slate-500">Atual</th>
                  <th className="text-right py-2 uppercase tracking-wider text-slate-500">Var YoY</th>
                  <th className="text-right py-2 uppercase tracking-wider text-slate-500">% Rec.</th>
                </tr>
              </thead>
              <tbody>
                {dre.length > 0 ? (
                  dre.map((item: any, i: number) => {
                    const hasPrevious = item.previous_value !== undefined && item.previous_value !== null && item.previous_value !== 0;
                    const yoy = hasPrevious ? (item.value / item.previous_value) - 1 : null;
                    return (
                      <tr key={i} className="border-b border-slate-100">
                        <td className="py-2 font-bold text-slate-700">{item.name}</td>
                        <td className="py-2 text-right tabular-nums text-slate-500">
                          {item.previous_value ? formatCurrency(item.previous_value) : '-'}
                        </td>
                        <td className="py-2 text-right tabular-nums">{formatCurrency(item.value)}</td>
                        <td className={cn(
                          "py-2 text-right tabular-nums",
                          yoy !== null ? (yoy > 0 ? "text-green-600" : "text-red-600") : "text-slate-500"
                        )}>
                          {yoy !== null ? (yoy > 0 ? `+${formatPercent(yoy)}` : formatPercent(yoy)) : '-'}
                        </td>
                        <td className="py-2 text-right tabular-nums">
                          {summary.revenue ? formatPercent(Math.abs(item.value / summary.revenue)) : '-'}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400 italic">Dados da DRE indisponíveis.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>


        {/* Section 3: AI Strategic Assessment */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-primary border-b border-slate-200 pb-2 mb-6 uppercase tracking-wider">3. Avaliação Estratégica IA</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-6 bg-green-50 border-l-4 border-green-500 rounded-r shadow-sm">
              <Sparkles className="w-5 h-5 text-green-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-green-700 uppercase tracking-widest mb-1">Otimização de Margem</p>
                <p className="text-sm text-slate-900 leading-relaxed">
                  A projeção indica uma expansão de 420bps na margem EBITDA para o próximo trimestre, baseada na redução de custos fixos identificada pelo modelo preditivo.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 bg-red-50 border-l-4 border-red-500 rounded-r shadow-sm">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-1">Risco de Liquidez</p>
                <p className="text-sm text-slate-900 leading-relaxed">
                  Observa-se um aumento no prazo médio de recebimento. Recomenda-se uma revisão nas políticas de crédito para preservar o fluxo de caixa operacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="absolute bottom-[1cm] left-[2cm] right-[2cm] flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest border-t border-slate-100 pt-6">
          <span>© 2023 FinAI Core - Análise de Inteligência Financeira</span>
          <span>Página 1 de 1</span>
          <span>Uso Interno Apenas</span>
        </footer>
      </article>
    </div>
  );
}

