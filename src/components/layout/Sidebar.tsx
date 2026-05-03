import { UploadCloud, FileEdit, BarChart3, HelpCircle, History, FileText } from 'lucide-react';
import { AppView } from '../../types';
import { cn } from '../../lib/utils';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'Upload', label: 'Upload Center', icon: UploadCloud },
    { id: 'Observations', label: 'Observations', icon: FileEdit },
    { id: 'Dashboard', label: 'Analysis Dashboard', icon: BarChart3 },
    { id: 'Report', label: 'Analysis Report', icon: FileText },
  ];

  return (
    <aside className="hidden lg:flex flex-col p-4 gap-2 h-[calc(100vh-64px)] w-64 fixed bg-slate-50 border-r border-slate-200 sticky top-16">
      <div className="mb-6 px-2">
        <h2 className="text-xl font-black text-slate-900">Reports</h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Institutional Grade</p>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id as AppView)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-md transition-all duration-200 active:scale-[0.98]",
                isActive 
                  ? "bg-white text-slate-900 border border-slate-200 shadow-sm font-semibold" 
                  : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto space-y-1 pt-4 border-t border-slate-200">
        <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-md transition-all">
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Support</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 text-slate-600 hover:bg-slate-100 rounded-md transition-all">
          <History className="w-5 h-5" />
          <span className="text-sm">Archive</span>
        </button>
      </div>
    </aside>
  );
}
