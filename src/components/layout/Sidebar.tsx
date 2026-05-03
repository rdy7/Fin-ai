import { UploadCloud, FileEdit, BarChart3, HelpCircle, History, FileText, Lock } from 'lucide-react';
import { AppView } from '../../types';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isAnalyzed: boolean;
}

export default function Sidebar({ currentView, onViewChange, isAnalyzed }: SidebarProps) {
  const menuItems = [
    { id: 'Upload', label: '1. Enviar Relatório', icon: UploadCloud, requiresAnalysis: false },
    { id: 'Observations', label: '2. Ajustar Insights', icon: FileEdit, requiresAnalysis: true },
    { id: 'Dashboard', label: '3. Painel de Análise', icon: BarChart3, requiresAnalysis: true },
    { id: 'Report', label: '4. Relatório Final', icon: FileText, requiresAnalysis: true },
  ];


  return (
    <aside className="hidden lg:flex flex-col p-4 gap-2 h-[calc(100vh-64px)] w-64 fixed bg-slate-50 border-r border-slate-200 sticky top-16">
      <div className="mb-6 px-2">
        <h2 className="text-xl font-black text-slate-900">Análise</h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold italic">Processo de IA</p>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          const isDisabled = item.requiresAnalysis && !isAnalyzed;

          return (
            <button
              key={item.id}
              disabled={isDisabled}
              onClick={() => onViewChange(item.id as AppView)}
              className={cn(
                "w-full flex items-center justify-between p-3 rounded-md transition-all duration-200",
                isActive 
                  ? "bg-white text-primary border border-slate-200 shadow-sm font-bold" 
                  : isDisabled
                    ? "text-slate-300 cursor-not-allowed opacity-50"
                    : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </div>
              {isDisabled && <Lock className="w-3 h-3" />}
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-1 pt-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-md transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Suporte Técnico</span>
        </button>
      </div>
    </aside>
  );
}


