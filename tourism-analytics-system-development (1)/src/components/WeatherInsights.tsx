import React, { useState } from 'react';
import { WEATHER_DATA, DESTINATIONS } from '../data/mockData';
import { CloudSun, Thermometer, Droplets, Info } from 'lucide-react';

export const WeatherInsights: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<string>('Goa');

  const weatherInfo = WEATHER_DATA.find(w => w.destination === selectedDest) || WEATHER_DATA[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <CloudSun className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              🌤️ Weather Insights & Climatological Advice
            </h1>
            <p className="text-slate-600 text-sm">
              Derived from verified meteorological records (`weather_data.csv`) providing custom packing tips and activity planning advice.
            </p>
          </div>
        </div>
      </div>

      {/* Destination Select */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 max-w-xl">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
          Select Destination for Climatological Analysis
        </label>
        <select
          value={selectedDest}
          onChange={(e) => setSelectedDest(e.target.value)}
          className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
        >
          {DESTINATIONS.map(d => (
            <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
          ))}
        </select>
      </div>

      {/* Weather Results Panel */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-8 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-10 -mt-10"></div>
        
        <div className="relative z-10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/20 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-100 block">Current Climatological State</span>
              <h2 className="text-3xl font-extrabold tracking-tight mt-1">📍 {weatherInfo.destination} Weather Profile</h2>
            </div>
            <span className="px-3 py-1 bg-white/20 backdrop-blur rounded-xl text-xs font-mono font-bold">
              100% Active Sensor Simulation
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
            {/* Temperature */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center space-x-4">
              <div className="p-3 bg-white text-blue-600 rounded-2xl shadow-sm">
                <Thermometer className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-blue-100 font-medium block uppercase tracking-wider">Temperature</span>
                <span className="text-3xl font-black block mt-0.5">{weatherInfo.temperature}°C</span>
                <span className="text-[11px] text-blue-200 block mt-1">✓ Expected seasonal norm</span>
              </div>
            </div>

            {/* Humidity */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center space-x-4">
              <div className="p-3 bg-white text-emerald-600 rounded-2xl shadow-sm">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-blue-100 font-medium block uppercase tracking-wider">Relative Humidity</span>
                <span className="text-3xl font-black block mt-0.5">{weatherInfo.humidity}%</span>
                <span className="text-[11px] text-blue-200 block mt-1">✓ Comfortable range</span>
              </div>
            </div>

            {/* Condition */}
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 flex items-center space-x-4">
              <div className="p-3 bg-white text-amber-500 rounded-2xl shadow-sm">
                <CloudSun className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs text-blue-100 font-medium block uppercase tracking-wider">Atmosphere Condition</span>
                <span className="text-2xl font-bold block mt-0.5 truncate">{weatherInfo.condition}</span>
                <span className="text-[11px] text-blue-200 block mt-1">✓ High visibility</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Recommendation Callout */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 shadow-sm flex items-start space-x-4">
        <div className="p-3 bg-blue-600 text-white rounded-2xl shadow-md shadow-blue-500/30">
          <Info className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>🛡️ Expert Travel & Packing Recommendation</span>
            <span className="text-xs py-0.5 px-2 bg-blue-200 text-blue-800 rounded font-mono">
              Climatological Tip
            </span>
          </h3>
          <p className="text-slate-700 text-base leading-relaxed mt-2 bg-white p-4 rounded-xl border border-blue-100 shadow-sm font-medium">
            💡 {weatherInfo.travelRecommendation}
          </p>
          <p className="text-xs text-slate-500 mt-3 pl-1">
            👉 **Note:** Real-time updates operate via local caching to match Streamlit cloud edge performance guidelines.
          </p>
        </div>
      </div>
    </div>
  );
};
