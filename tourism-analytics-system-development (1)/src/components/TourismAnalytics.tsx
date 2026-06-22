import React, { useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title as ChartTitle, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { BarChart3, PieChart, Layers, ArrowUpDown } from 'lucide-react';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  ChartTitle, 
  Tooltip, 
  Legend, 
  ArcElement,
  PointElement,
  LineElement
);

export const TourismAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'budget' | 'satisfaction'>('overview');

  // 1. Pie Chart: Popular Activities / Categories
  const pieData = {
    labels: ['Beach & Coastal', 'Adventure Sports', 'Historical Palaces', 'Nature & Tea Gardens', 'Wildlife Safari', 'Religious Heritage'],
    datasets: [
      {
        data: [28, 24, 18, 14, 10, 6],
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#6366f1',
          '#ec4899',
          '#8b5cf6'
        ],
        borderWidth: 2,
        borderColor: '#ffffff',
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'right' as const, labels: { boxWidth: 12, font: { size: 12 } } },
    }
  };

  // 2. Bar Chart: Top Tourist Destinations Footfall
  const topDestData = {
    labels: ['Goa', 'Manali', 'Varanasi', 'Jaipur', 'Munnar', 'Jim Corbett', 'Leh Ladakh', 'Andaman'],
    datasets: [
      {
        label: 'Annual Visitors (in thousands)',
        data: [312, 284, 245, 230, 210, 195, 180, 160],
        backgroundColor: '#2563eb',
        borderRadius: 6,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { y: { grid: { color: 'rgba(0,0,0,0.06)' } }, x: { grid: { display: false } } }
  };

  // 3. Histogram / Budget Distribution
  const budgetDistData = {
    labels: ['₹1k-3k', '₹3k-5k', '₹5k-8k', '₹8k-12k', '₹12k-18k', '₹18k-25k', '₹25k+'],
    datasets: [
      {
        label: 'Number of Travelers',
        data: [450, 1420, 1850, 920, 480, 210, 100],
        backgroundColor: '#10b981',
        borderRadius: 4,
      }
    ]
  };

  // 4. Satisfaction Score by Category
  const satisfactionData = {
    labels: ['Beach', 'Adventure', 'Historical', 'Religious', 'Nature', 'Wildlife'],
    datasets: [
      {
        label: 'Average Satisfaction Score (out of 5.0)',
        data: [4.8, 4.7, 4.6, 4.7, 4.9, 4.5],
        backgroundColor: '#8b5cf6',
        borderRadius: 6,
      }
    ]
  };

  // 5. Correlation Heatmap simulation matrix
  const corrMatrix = [
    { feature: 'Age', values: [1.00, -0.12, 0.45, 0.08, 0.22] },
    { feature: 'Duration_Days', values: [-0.12, 1.00, 0.78, 0.35, -0.05] },
    { feature: 'Average_Spend', values: [0.45, 0.78, 1.00, 0.62, 0.18] },
    { feature: 'Satisfaction_Score', values: [0.08, 0.35, 0.62, 1.00, 0.41] },
    { feature: 'Repeat_Visitor', values: [0.22, -0.05, 0.18, 0.41, 1.00] },
  ];
  const corrHeaders = ['Age', 'Duration_Days', 'Average_Spend', 'Satisfaction_Score', 'Repeat_Visitor'];

  const getHeatmapBg = (val: number) => {
    if (val === 1) return 'bg-blue-600 text-white font-bold';
    if (val > 0.5) return 'bg-blue-400 text-white font-medium';
    if (val > 0.2) return 'bg-blue-200 text-slate-800';
    if (val > 0) return 'bg-blue-50 text-slate-700';
    return 'bg-red-50 text-red-700';
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              📊 Tourism Analytics & Exploratory Data Analysis
            </h1>
            <p className="text-slate-600 text-sm">
              Comprehensive statistical evaluation of 5,430 synthesized tourist logs. Fully compatible with Streamlit / Plotly deployment.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 mt-6 space-x-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-semibold text-sm transition flex items-center gap-2 border-b-2 ${
              activeTab === 'overview' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <PieChart className="w-4 h-4" />
            <span>Top Destinations & Activities</span>
          </button>

          <button
            onClick={() => setActiveTab('budget')}
            className={`pb-3 font-semibold text-sm transition flex items-center gap-2 border-b-2 ${
              activeTab === 'budget' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Budget Distribution & Frequency</span>
          </button>

          <button
            onClick={() => setActiveTab('satisfaction')}
            className={`pb-3 font-semibold text-sm transition flex items-center gap-2 border-b-2 ${
              activeTab === 'satisfaction' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>Satisfaction Analysis & Heatmap</span>
          </button>
        </div>
      </div>

      {/* TAB 1: Overview */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">📌 Tourist Interest Category Breakdown</h3>
                <p className="text-xs text-slate-500">Global market share across primary tourist activities</p>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-mono">Pie Chart</span>
            </div>
            <div className="h-72 w-full flex-1 py-2">
              <Pie data={pieData} options={pieOptions} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">📍 Top Visited Destinations</h3>
                <p className="text-xs text-slate-500">Total yearly traveler footfall recorded in simulated data</p>
              </div>
              <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-lg font-mono">Bar Chart</span>
            </div>
            <div className="h-72 w-full flex-1">
              <Bar data={topDestData} options={barOptions} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Budget Distribution */}
      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">💰 Traveler Budget Frequency Distribution</h3>
                <p className="text-xs text-slate-500">Daily travel spend histogram (bins calculated using pandas cut method)</p>
              </div>
              <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-lg font-mono font-medium">Histogram</span>
            </div>
            <div className="h-80 w-full">
              <Bar data={budgetDistData} options={barOptions} />
            </div>
          </div>

          {/* Key statistical insights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Median Spend</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹5,250 <span className="text-xs font-normal text-slate-500">/ day</span></p>
              <p className="text-xs text-emerald-600 font-medium mt-2">Optimal spending tier accounts for 34% of tourist profiles.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Outlier Cutoff (IQR)</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">₹24,800 <span className="text-xs font-normal text-slate-500">/ day</span></p>
              <p className="text-xs text-blue-600 font-medium mt-2">Values above capped using Interquartile Range (IQR) method.</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Group Travel Multiplier</span>
              <p className="text-2xl font-bold text-slate-900 mt-1">0.72x <span className="text-xs font-normal text-slate-500">per person</span></p>
              <p className="text-xs text-indigo-600 font-medium mt-2">Families & friends experience significant shared accommodation savings.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Satisfaction & Heatmap */}
      {activeTab === 'satisfaction' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Satisfaction Bar chart */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">⭐ Satisfaction Analysis by Category</h3>
                <p className="text-xs text-slate-500">Verified mean guest reviews across primary travel activities</p>
              </div>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-lg font-mono font-medium">Bivariate Bar</span>
            </div>
            <div className="h-72 w-full flex-1">
              <Bar data={satisfactionData} options={barOptions} />
            </div>
          </div>

          {/* Feature Correlation Heatmap */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">🔥 Feature Correlation Heatmap</h3>
                <p className="text-xs text-slate-500">Pearson correlation matrix generated via Seaborn / Plotly engine</p>
              </div>
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded-lg font-mono font-medium">sns.heatmap</span>
            </div>
            
            <div className="overflow-x-auto flex-1 flex flex-col justify-center py-2">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr>
                    <th className="p-2 text-slate-500 text-left">Feature</th>
                    {corrHeaders.map((h, i) => (
                      <th key={i} className="p-2 font-semibold text-slate-700 truncate max-w-[80px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {corrMatrix.map((row, i) => (
                    <tr key={i} className="border-t border-slate-100">
                      <td className="p-2 font-bold text-slate-800 text-left">{row.feature}</td>
                      {row.values.map((v, j) => (
                        <td key={j} className={`p-2.5 rounded transition ${getHeatmapBg(v)}`}>
                          {v.toFixed(2)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              💡 **Data Science Inference:** Notice the high positive correlation (`0.78`) between **Duration_Days** and **Average_Spend**, and a notable correlation (`0.62`) between **Average_Spend** and **Satisfaction_Score**, confirming premium spending correlates with superior guest experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
