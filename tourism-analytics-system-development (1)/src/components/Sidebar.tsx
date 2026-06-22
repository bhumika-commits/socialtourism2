import React from 'react';
import { 
  Home, 
  MapPin, 
  BarChart3, 
  Calculator, 
  Hotel, 
  UtensilsCrossed, 
  Calendar, 
  CloudSun, 
  Cpu, 
  Code2 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home },
    { id: 'dest_rec', label: 'Destination Recommendation', icon: MapPin },
    { id: 'analytics', label: 'Tourism Analytics', icon: BarChart3 },
    { id: 'budget', label: 'Budget Predictor (ML)', icon: Calculator },
    { id: 'hotels', label: 'Hotel Recommendation', icon: Hotel },
    { id: 'restaurants', label: 'Restaurant Recommendation', icon: UtensilsCrossed },
    { id: 'itinerary', label: 'Itinerary Generator', icon: Calendar },
    { id: 'weather', label: 'Weather Insights', icon: CloudSun },
    { id: 'ml_engine', label: 'ML Engine & EDA Tasks', icon: Cpu },
    { id: 'code_repo', label: 'Project Code Repository', icon: Code2 },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0 border-r border-slate-800 shadow-xl z-30">
      {/* Header Logo Section */}
      <div className="p-5 border-b border-slate-800 flex items-center space-x-3">
        <div className="bg-blue-600 p-2.5 rounded-xl shadow-lg shadow-blue-500/30">
          <span className="text-2xl">🌍</span>
        </div>
        <div>
          <h1 className="font-bold text-lg leading-tight tracking-tight text-white">
            Tourism Analytics
          </h1>
          <p className="text-xs text-blue-400 font-semibold flex items-center gap-1 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Streamlit App Engine
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 custom-scrollbar">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
          Project Modules
        </p>
        {menuItems.slice(0, 8).map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold' 
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}

        <div className="pt-4 mb-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 mb-2">
            Final Year Evaluation
          </p>
          {menuItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold' 
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Project Metadata Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="bg-slate-800/60 p-3 rounded-xl text-xs space-y-2 border border-slate-700/50">
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">Records Synthesized:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono text-emerald-400 font-bold">5,430+</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span className="font-medium">ML Core:</span>
            <span className="bg-slate-900 px-2 py-0.5 rounded font-mono text-blue-400 font-bold">Scikit-Learn</span>
          </div>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-700 text-center">
            🚀 Suitable for Streamlit Cloud deployment & GitHub submission
          </div>
        </div>
      </div>
    </aside>
  );
};
