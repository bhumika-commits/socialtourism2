import React from 'react';
import { TOURISM_STATISTICS, DESTINATIONS } from '../data/mockData';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  Title as ChartTitle, 
  Tooltip, 
  Legend, 
  Filler 
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { TrendingUp, Users, Compass, DollarSign, ExternalLink } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ChartTitle,
  Tooltip,
  Legend,
  Filler
);

interface HomeDashboardProps {
  onNavigate: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({ onNavigate }) => {
  const lineChartData = {
    labels: TOURISM_STATISTICS.months,
    datasets: [
      {
        label: 'Monthly Footfall (Past 12 Months)',
        data: TOURISM_STATISTICS.monthlyVisitors,
        borderColor: '#2563eb',
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        fill: true,
        tension: 0.3,
        pointBackgroundColor: '#1d4ed8',
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' as const },
      tooltip: { mode: 'index' as const, intersect: false },
    },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.06)' } },
      x: { grid: { display: false } }
    }
  };

  const barChartData = {
    labels: TOURISM_STATISTICS.topCategoryShares.map(c => c.category),
    datasets: [
      {
        label: 'Market Share (%)',
        data: TOURISM_STATISTICS.topCategoryShares.map(c => c.share),
        backgroundColor: [
          'rgba(59, 130, 246, 0.85)',
          'rgba(16, 185, 129, 0.85)',
          'rgba(245, 158, 11, 0.85)',
          'rgba(99, 102, 241, 0.85)',
          'rgba(236, 72, 153, 0.85)',
        ],
        borderRadius: 6,
      }
    ]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { grid: { color: 'rgba(0,0,0,0.06)' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Top Welcome Title & Streamlit Emulation Banner */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
              <span>Streamlit Final Year Project</span>
              <span>•</span>
              <span>Python 3.10 Runtime Simulation</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              🌍 Tourism Analytics & Intelligence System
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              An intelligent, full-stack Data Science platform providing personalized destination matching, travel expense regression prediction, and advanced EDA dashboards.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => onNavigate('code_repo')}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-xl text-sm font-semibold shadow transition gap-2"
            >
              <span>Inspect Python Code</span>
              <ExternalLink className="w-4 h-4 text-slate-400" />
            </button>
            <button 
              onClick={() => onNavigate('dest_rec')}
              className="inline-flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white hover:bg-blue-700 rounded-xl text-sm font-semibold shadow transition gap-1.5"
            >
              <span>Get Recommended Trip</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Destinations</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{TOURISM_STATISTICS.totalDestinations} Cities</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+12 New added this season</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Compass className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tourist Profiles Analyzed</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">5,430 Records</p>
            <p className="text-xs font-medium text-blue-600 mt-1 flex items-center gap-1">
              <span>✓ 100% Pre-processed & Cleaned</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Average Travel Cost</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">₹4,120 / day</p>
            <p className="text-xs font-medium text-amber-600 mt-1 flex items-center gap-1">
              <span>Optimized via ML Regression</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommendation Acc.</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">92.4%</p>
            <p className="text-xs font-medium text-emerald-600 mt-1 flex items-center gap-1">
              <span>Random Forest Classifier</span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">📈 Seasonal Tourism Trends</h3>
              <p className="text-xs text-slate-500 mt-0.5">Aggregated monthly footfall across all 14 major tourist regions</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-mono font-medium">Plotly Emulation</span>
          </div>
          <div className="h-72 w-full flex-1">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">📍 Popular Interest Categories</h3>
              <p className="text-xs text-slate-500 mt-0.5">Frequency breakdown by preferred interest category</p>
            </div>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-mono font-medium">Categorical Dist</span>
          </div>
          <div className="h-72 w-full flex-1">
            <Bar data={barChartData} options={barChartOptions} />
          </div>
        </div>
      </div>

      {/* Highlights / Quick Access grid */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-lg">🌟 Featured Destinations Overview</h3>
          <button 
            onClick={() => onNavigate('dest_rec')}
            className="text-blue-600 hover:text-blue-700 text-xs font-bold flex items-center gap-1"
          >
            <span>View All & Filter</span>
            <span>→</span>
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESTINATIONS.slice(0, 4).map((dest) => (
            <div 
              key={dest.id} 
              onClick={() => onNavigate('dest_rec')} 
              className="group cursor-pointer rounded-xl overflow-hidden border border-slate-200 bg-slate-50 hover:shadow-md transition duration-200 flex flex-col"
            >
              <div className="h-40 overflow-hidden relative">
                <img 
                  src={dest.imageUrl} 
                  alt={dest.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
                  ★ {dest.rating}
                </span>
                <span className="absolute bottom-2 left-2 bg-blue-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded">
                  {dest.category}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-600 transition text-base">
                    {dest.name}
                  </h4>
                  <p className="text-xs text-slate-500">{dest.state}</p>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-600">Est. Budget:</span>
                  <span className="font-bold text-slate-900">₹{dest.avgBudgetPerDay} / day</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
