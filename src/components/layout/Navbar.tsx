import { Bell, Settings, Search } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="w-full top-0 sticky bg-white border-b border-slate-200 z-50">
      <div className="flex justify-between items-center h-16 px-6 w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-8">
          <span className="text-lg font-bold text-slate-900">Finalyze Core</span>
          <nav className="hidden md:flex gap-6 items-center">
            <a className="text-slate-900 font-semibold border-b-2 border-slate-900 h-16 flex items-center" href="#">
              Analysis Dashboard
            </a>
            <a className="text-slate-500 font-medium hover:text-slate-900 transition-colors" href="#">
              Reports
            </a>
            <a className="text-slate-500 font-medium hover:text-slate-900 transition-colors" href="#">
              Portfolio
            </a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Bell className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-900 transition-colors" />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </div>
          <Settings className="w-5 h-5 text-slate-500 cursor-pointer hover:text-slate-900 transition-colors" />
          <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200 ml-2">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" 
              alt="Profile" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}
