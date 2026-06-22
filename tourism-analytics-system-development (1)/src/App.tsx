import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { HomeDashboard } from './components/HomeDashboard';
import { DestinationRecommendation } from './components/DestinationRecommendation';
import { TourismAnalytics } from './components/TourismAnalytics';
import { BudgetPredictor } from './components/BudgetPredictor';
import { HotelRecommendation } from './components/HotelRecommendation';
import { RestaurantRecommendation } from './components/RestaurantRecommendation';
import { ItineraryGenerator } from './components/ItineraryGenerator';
import { WeatherInsights } from './components/WeatherInsights';
import { MachineLearningTasks } from './components/MachineLearningTasks';
import { CodeViewer } from './components/CodeViewer';
import { Menu, X, Cpu } from 'lucide-react';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [selectedDestForFlow, setSelectedDestForFlow] = useState<string>('Goa');

  // Triggered when user clicks "Explore Itinerary & Budget" from Destination Recommendation
  const handleDestinationSelect = (destName: string) => {
    setSelectedDestForFlow(destName);
    setActiveTab('itinerary');
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard onNavigate={handleTabChange} />;
      case 'dest_rec':
        return <DestinationRecommendation onSelectDestination={handleDestinationSelect} />;
      case 'analytics':
        return <TourismAnalytics />;
      case 'budget':
        return <BudgetPredictor initialDestination={selectedDestForFlow} />;
      case 'hotels':
        return <HotelRecommendation />;
      case 'restaurants':
        return <RestaurantRecommendation />;
      case 'itinerary':
        return <ItineraryGenerator initialDestination={selectedDestForFlow} />;
      case 'weather':
        return <WeatherInsights />;
      case 'ml_engine':
        return <MachineLearningTasks />;
      case 'code_repo':
        return <CodeViewer />;
      default:
        return <HomeDashboard onNavigate={handleTabChange} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center justify-center border border-slate-800"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar - Desktop & Mobile overlay */}
      <div className={`lg:block ${mobileMenuOpen ? 'block fixed inset-0 z-40' : 'hidden lg:relative'} shrink-0`}>
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Streamlit Emulation Running Banner */}
        <header className="bg-slate-900 text-white px-6 py-3 border-b border-slate-800 sticky top-0 z-20 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-400">
              Streamlit Runtime Active (Live ML Inference)
            </span>
          </div>

          <div className="hidden sm:flex items-center space-x-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              <span>Joblib Engine</span>
            </span>
            <span>Local Caching: ON</span>
            <span>Python 3.10.12</span>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {renderContent()}
        </main>

        <footer className="bg-white border-t border-slate-200 py-6 px-8 mt-12">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              <p className="font-bold text-slate-700 text-sm">Tourism Analytics System 🌍</p>
              <p className="mt-0.5">Major Data Science Final Year Project • Complete Streamlit & Scikit-Learn Framework</p>
            </div>
            <div className="flex items-center space-x-6 font-medium">
              <button onClick={() => handleTabChange('ml_engine')} className="hover:text-blue-600 transition">ML Tasks</button>
              <button onClick={() => handleTabChange('code_repo')} className="hover:text-blue-600 transition">GitHub Ready Code</button>
              <button onClick={() => handleTabChange('home')} className="hover:text-blue-600 transition">Home Dashboard</button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
