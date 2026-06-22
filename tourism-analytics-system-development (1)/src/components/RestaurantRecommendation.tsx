import React, { useState } from 'react';
import { RESTAURANTS, DESTINATIONS } from '../data/mockData';
import { UtensilsCrossed, Star, CheckCircle, SlidersHorizontal, Award } from 'lucide-react';

export const RestaurantRecommendation: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<string>('Goa');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [maxBudget, setMaxBudget] = useState<number>(1500);
  const [reservationSuccess, setReservationSuccess] = useState<string | null>(null);

  // Get unique cuisines for current destination or all
  const allCuisines = Array.from(new Set(RESTAURANTS.map(r => r.cuisine)));

  const filteredRestaurants = RESTAURANTS.filter(r => {
    const matchDest = r.destination === selectedDest;
    const matchCuisine = selectedCuisine === 'All' || r.cuisine === selectedCuisine;
    const matchBudget = r.avgCostPerPerson <= maxBudget;
    return matchDest && matchCuisine && matchBudget;
  });

  const handleReserve = (restName: string) => {
    setReservationSuccess(restName);
    setTimeout(() => setReservationSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <UtensilsCrossed className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              🍽️ Smart Restaurant Recommendation Module
            </h1>
            <p className="text-slate-600 text-sm">
              Discover verified regional specialties, fine dining sunset lounges, and authentic legendary street food.
            </p>
          </div>
        </div>
      </div>

      {/* Reservation Success Banner */}
      {reservationSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center space-x-3 text-emerald-800 animate-bounce shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold">
            Success! Table reservation simulated for <span className="font-extrabold">{reservationSuccess}</span>. Confirmation added to travel itinerary!
          </p>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>Filter Dining Selection (`df_restaurants` query simulation)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Destination City
            </label>
            <select
              value={selectedDest}
              onChange={(e) => {
                setSelectedDest(e.target.value);
                setSelectedCuisine('All');
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              {DESTINATIONS.map(d => (
                <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
              ))}
            </select>
          </div>

          {/* Cuisine Preference */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Cuisine Preference
            </label>
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              <option value="All">All Cuisines</option>
              {allCuisines.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Max Budget Slider */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center justify-between">
              <span>Max Budget per Person</span>
              <span className="text-blue-600 font-bold">₹{maxBudget}</span>
            </label>
            <input 
              type="range" 
              min="200" 
              max="2500" 
              step="100"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg mt-2" 
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹200</span>
              <span>₹2,500</span>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="space-y-4">
        {filteredRestaurants.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center space-y-2">
            <p className="text-amber-800 font-bold text-lg">No restaurants found matching your exact filter criteria.</p>
            <p className="text-amber-700 text-sm max-w-md mx-auto">
              Try increasing your maximum budget per person or selecting &apos;All Cuisines&apos; to view legendary culinary spots in {selectedDest}.
            </p>
          </div>
        ) : (
          filteredRestaurants.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-lg">
                    {r.cuisine}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{r.rating} / 5.0</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                    {r.name}
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">📍 {r.destination} Culinary Landmark</p>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-start gap-2">
                  <Award className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-slate-800 block">Chef Specialty / Must Try:</span>
                    <span className="text-slate-600">{r.specialty}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex flex-col justify-between md:items-end shrink-0">
                <div className="text-left md:text-right mb-4 md:mb-0">
                  <span className="text-xs text-slate-400 font-semibold block">Average Cost</span>
                  <span className="text-2xl font-black text-slate-900 block">₹{r.avgCostPerPerson}</span>
                  <span className="text-[11px] text-slate-400 block">per person (approx.)</span>
                </div>
                <button
                  onClick={() => handleReserve(r.name)}
                  className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition duration-200 mt-2"
                >
                  Reserve Table
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
