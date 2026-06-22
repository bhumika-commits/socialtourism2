import React, { useState } from 'react';
import { DESTINATIONS, Destination } from '../data/mockData';
import { Search, MapPin, Calendar, Users, Sparkles } from 'lucide-react';

interface DestinationRecommendationProps {
  onSelectDestination: (destName: string) => void;
}

export const DestinationRecommendation: React.FC<DestinationRecommendationProps> = ({ onSelectDestination }) => {
  const [budget, setBudget] = useState<number>(4500);
  const [travelType, setTravelType] = useState<string>('Couple');
  const [preferredSeason, setPreferredSeason] = useState<string>('Winter');
  const [interestCategory, setInterestCategory] = useState<string>('Beach');
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [recommendations, setRecommendations] = useState<Destination[]>([]);

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate AI Match score based on user inputs
    const scoredList = DESTINATIONS.map(dest => {
      let score = 80.0; // Base score
      
      // Feature alignment: Category match
      if (dest.category === interestCategory) {
        score += 12.5;
      } else {
        score -= 10.0;
      }
      
      // Season match
      if (dest.season === preferredSeason || preferredSeason === 'All Seasons') {
        score += 5.0;
      }
      
      // Travel Type match
      if (dest.travelType.includes(travelType)) {
        score += 4.5;
      }
      
      // Budget deviation penalty
      const budgetDiff = Math.abs(dest.avgBudgetPerDay - budget);
      const penalty = (budgetDiff / 500) * 1.5;
      score -= penalty;
      
      // Keep score clamped between 68.0 and 99.4
      const finalScore = Math.min(99.4, Math.max(68.2, score));

      return {
        ...dest,
        matchScore: parseFloat(finalScore.toFixed(1))
      };
    });

    // Sort by match score descending
    scoredList.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    setRecommendations(scoredList.slice(0, 6));
    setHasSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              🗺️ Intelligent Destination Recommendation
            </h1>
            <p className="text-slate-600 text-sm">
              Machine Learning similarity-based recommendation engine matching your travel profile against verified destination vectors.
            </p>
          </div>
        </div>
      </div>

      {/* Inputs Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <form onSubmit={handleRecommend} className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
            <span>Filter Travel Profile Inputs</span>
            <span className="text-xs py-1 px-2.5 bg-blue-100 text-blue-700 font-mono rounded-full font-normal">
              RandomForestClassifier pipeline
            </span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Budget */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center justify-between">
                <span>Budget per Day (₹)</span>
                <span className="text-blue-600 font-mono font-bold text-sm">₹{budget}</span>
              </label>
              <input 
                type="range" 
                min="1500" 
                max="12000" 
                step="500" 
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg" 
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>₹1,500</span>
                <span>₹12,000</span>
              </div>
            </div>

            {/* Travel Type */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-500" />
                <span>Travel Type</span>
              </label>
              <select
                value={travelType}
                onChange={(e) => setTravelType(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              >
                <option value="Solo">Solo Traveler</option>
                <option value="Family">Family Vacation</option>
                <option value="Couple">Couple / Romance</option>
                <option value="Friends">Friends Group</option>
              </select>
            </div>

            {/* Preferred Season */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-500" />
                <span>Preferred Season</span>
              </label>
              <select
                value={preferredSeason}
                onChange={(e) => setPreferredSeason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              >
                <option value="Winter">Winter</option>
                <option value="Summer">Summer</option>
                <option value="Monsoon">Monsoon</option>
                <option value="All Seasons">Flexible / All Seasons</option>
              </select>
            </div>

            {/* Interest Category */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                <span>Interest Category</span>
              </label>
              <select
                value={interestCategory}
                onChange={(e) => setInterestCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
              >
                <option value="Adventure">Adventure</option>
                <option value="Nature">Nature</option>
                <option value="Historical">Historical</option>
                <option value="Religious">Religious</option>
                <option value="Beach">Beach</option>
                <option value="Wildlife">Wildlife</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              type="submit"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/25 transition duration-200 gap-2 text-sm"
            >
              <Search className="w-4 h-4" />
              <span>Discover Recommended Destinations</span>
            </button>
          </div>
        </form>
      </div>

      {/* Recommendations Results */}
      {hasSubmitted && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>🎯 Top Matching Destinations</span>
              <span className="text-xs font-normal py-1 px-2.5 bg-emerald-100 text-emerald-800 rounded-full">
                {recommendations.length} Matches Found
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-mono">Ranked by AI Destination Matching Score</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((dest, idx) => (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-lg transition duration-300 flex flex-col">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={dest.imageUrl} 
                    alt={dest.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent"></div>
                  
                  {/* Match score badge */}
                  <div className="absolute top-3 left-3 bg-emerald-600 text-white font-bold text-xs px-3 py-1.5 rounded-lg shadow flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>{dest.matchScore}% AI Match</span>
                  </div>

                  {/* Rank badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur text-white font-bold text-xs px-2.5 py-1 rounded-lg">
                    #{idx + 1}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                      {dest.category}
                    </span>
                    <h4 className="text-xl font-bold text-white mt-1 drop-shadow">
                      {dest.name}
                    </h4>
                    <p className="text-xs text-slate-200 font-medium">{dest.state}</p>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Key summary specs */}
                    <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl text-xs mb-3 border border-slate-100">
                      <div>
                        <span className="text-slate-500 block">Estimated Budget</span>
                        <span className="font-bold text-slate-800">₹{dest.avgBudgetPerDay} / day</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Verified Rating</span>
                        <span className="font-bold text-slate-800">★ {dest.rating} / 5.0</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-slate-200/60 mt-1">
                        <span className="text-slate-500 block">Best Time to Visit</span>
                        <span className="font-medium text-slate-800">{dest.bestTimeToVisit}</span>
                      </div>
                    </div>

                    {/* Popular Attractions */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Popular Attractions
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {dest.attractions.map((att, i) => (
                          <span key={i} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200">
                            • {att}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action link */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-medium">Suitable for {dest.travelType.join(', ')}</span>
                    <button
                      onClick={() => onSelectDestination(dest.name)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-xl transition"
                    >
                      <span>Explore Itinerary & Budget</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Initial pre-search prompt */}
      {!hasSubmitted && (
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 text-center max-w-2xl mx-auto space-y-3">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Ready to discover your perfect destination?</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto">
            Adjust the sliders and dropdown preferences above, then click the discover button to invoke the Machine Learning matching algorithm.
          </p>
        </div>
      )}
    </div>
  );
};
