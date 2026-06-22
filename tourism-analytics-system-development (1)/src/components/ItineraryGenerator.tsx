import React, { useState } from 'react';
import { DESTINATIONS } from '../data/mockData';
import { Calendar, MapPin, Utensils, DollarSign, Sparkles, Check } from 'lucide-react';

interface ItineraryGeneratorProps {
  initialDestination?: string;
}

export const ItineraryGenerator: React.FC<ItineraryGeneratorProps> = ({ initialDestination }) => {
  const [destination, setDestination] = useState<string>(initialDestination || 'Goa');
  const [travelPace, setTravelPace] = useState<string>('Moderate (Recommended)');
  const [numDays, setNumDays] = useState<number>(3);
  const [isGenerated, setIsGenerated] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const itineraryDatabase: Record<string, Array<{ day: string; attractions: string; meals: string; spending: string }>> = {
    "Goa": [
      { day: "Day 1", attractions: "Morning visit to Baga Beach & Fort Aguada. Explore the iconic lighthouse and enjoy sunset evening walks.", meals: "Lunch at Britto's (Goan Prawn Curry), Dinner at Thalassa (Greek platters).", spending: "₹2,500" },
      { day: "Day 2", attractions: "Adventure water sports at Anjuna Beach. Afternoon heritage tour of Basilica of Bom Jesus and Se Cathedral in Old Goa.", meals: "Lunch at Gunpowder (Appams & Mutton Curry), evening beach shack drinks.", spending: "₹3,200" },
      { day: "Day 3", attractions: "Day trip to magnificent Dudhsagar Falls & guided walk through spice plantations.", meals: "Traditional Goan fish thali lunch served on banana leaf.", spending: "₹2,100" },
      { day: "Day 4", attractions: "Explore Latin Quarter of Fontainhas for colorful heritage photography. Visit Miramar Beach.", meals: "Lunch at Viva Panjim, dinner at Fisherman's Wharf.", spending: "₹1,800" },
      { day: "Day 5", attractions: "Souvenir shopping at Anjuna Flea Market and departure transit transfers.", meals: "Leisurely brunch before departure flight.", spending: "₹1,200" },
    ],
    "Manali": [
      { day: "Day 1", attractions: "Check-in to mountain resort. Afternoon stroll to Hadimba Temple, tranquil Van Vihar park, and Old Manali bohemian cafe crawl.", meals: "Lunch at Cafe 1947, Dinner at Johnson's Cafe (Baked Trout).", spending: "₹1,800" },
      { day: "Day 2", attractions: "Full day excursion to Solang Valley for skiing, zorbing, and paragliding (or Rohtang Pass snow point depending on weather permits).", meals: "Packaged hot lunch in Solang, warm thukpa & momos in evening.", spending: "₹4,500" },
      { day: "Day 3", attractions: "Morning visit to Vashisht hot water springs, scenic hike to Jogini Waterfalls, and evening shopping on Mall Road.", meals: "Lunch at Chopsticks on Mall road.", spending: "₹1,500" },
      { day: "Day 4", attractions: "Day trip to Naggar Castle and Nicholas Roerich Art Gallery. Panoramic views of Kullu Valley.", meals: "Lunch at Naggar Castle heritage cafe.", spending: "₹2,000" },
      { day: "Day 5", attractions: "Local woolens shopping and leisure morning before boarding Volvo or flight.", meals: "Warm bakery items at German Bakery.", spending: "₹1,000" },
    ],
    "Varanasi": [
      { day: "Day 1", attractions: "Check-in at Ghat guest house. Visit Kashi Vishwanath Temple and secure prime spots for the spectacular evening Dashashwamedh Ghat Aarti.", meals: "Lunch at Baati Chokha, dinner overlooking Ganges.", spending: "₹1,200" },
      { day: "Day 2", attractions: "Early morning sunrise boat ride on the sacred Ganges. Excursion to Sarnath Buddhist stupas and museum.", meals: "Late afternoon snacks at Kashi Chat Bhandar.", spending: "₹1,600" },
      { day: "Day 3", attractions: "Explore Ramnagar Fort across the river & traditional silk weaving district shopping.", meals: "Traditional Thali at Shree Cafe.", spending: "₹1,100" },
      { day: "Day 4", attractions: "Morning heritage walking tour through ancient narrow alleys (galis) and visit Manikarnika Ghat.", meals: "Special Kachori Sabzi breakfast & lassi at Blue Lassi shop.", spending: "₹900" },
      { day: "Day 5", attractions: "Final morning puja offerings and shopping for Banarasi sarees before transfer to airport.", meals: "Leisure lunch at hotel lounge.", spending: "₹1,200" },
    ],
    "Jaipur": [
      { day: "Day 1", attractions: "Morning visit to majestic Amber Fort (elephant ride/jeep entry) & Jaigarh Fort cannon display. Scenic photo stop at Jal Mahal.", meals: "Lunch at Rawat Mishtan Bhandar (Pyaaz Kachori).", spending: "₹2,200" },
      { day: "Day 2", attractions: "Explore City Palace royal museum, Jantar Mantar astronomical observatory, and iconic Hawa Mahal.", meals: "Grand royal village feast dinner at Chokhi Dhani resort.", spending: "₹3,500" },
      { day: "Day 3", attractions: "Heritage textile shopping at Johari Bazaar and Bapu Bazaar. Gorgeous sunset views from Nahargarh Fort.", meals: "Rooftop lunch at Peacock Rooftop Restaurant.", spending: "₹1,800" },
      { day: "Day 4", attractions: "Visit Albert Hall Museum and stunning Birla Temple marble carvings.", meals: "Lal Maas dinner at Suvarna Mahal.", spending: "₹2,500" },
      { day: "Day 5", attractions: "Local blue pottery shopping and departure transfers to Jaipur Airport.", meals: "Casual brunch at Tapri The Tea House.", spending: "₹1,400" },
    ]
  };

  const currentPlan = itineraryDatabase[destination] || [
    { day: "Day 1", attractions: `Arrival and check-in. Orientation walk around primary ${destination} landmarks and local sightseeing.`, meals: "Authentic regional lunch and premium dinner.", spending: "₹2,000" },
    { day: "Day 2", attractions: `Full day exploration of primary nature, cultural, or historical attractions in ${destination}.`, meals: "Lunch at highly-rated local bistro, evening street snacks.", spending: "₹3,000" },
    { day: "Day 3", attractions: `Specialty activities & local crafts shopping at main market. Late evening leisure lounge.`, meals: "Fine dining dinner table.", spending: "₹2,200" },
    { day: "Day 4", attractions: `Optional excursion to nearby scenic viewpoints or wildlife conservation parks.`, meals: "Traditional thali lunch.", spending: "₹1,800" },
    { day: "Day 5", attractions: `Final souvenir collection and departure transit transfers.`, meals: "Casual brunch before departure.", spending: "₹1,200" }
  ];

  const displayedPlan = currentPlan.slice(0, numDays);

  const handleCopy = () => {
    const text = displayedPlan.map(p => `${p.day}\nAttractions: ${p.attractions}\nSuggested Meals: ${p.meals}\nEstimated Spending: ${p.spending}\n`).join('\n');
    navigator.clipboard.writeText(`Personalized Itinerary for ${destination} (${numDays} Days):\n\n${text}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              📅 Personalized Travel Itinerary Generator
            </h1>
            <p className="text-slate-600 text-sm">
              Generates smart, structured daily travel schedules complete with local landmarks, dining pairings, and itemized daily spending projections.
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Form */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>⚙️ Configure Itinerary Parameters</span>
          </h3>
          <span className="text-xs py-1 px-2.5 bg-indigo-100 text-indigo-800 rounded-full font-mono font-medium">
            Dynamic Schedule Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Select Destination
            </label>
            <select
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setIsGenerated(true);
              }}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              {DESTINATIONS.map(d => (
                <option key={d.id} value={d.name}>{d.name} ({d.state})</option>
              ))}
            </select>
          </div>

          {/* Travel Pace */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Pace of Travel
            </label>
            <select
              value={travelPace}
              onChange={(e) => setTravelPace(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              <option value="Relaxed & Leisure">Relaxed & Leisure (1-2 stops/day)</option>
              <option value="Moderate (Recommended)">Moderate (2-3 stops/day)</option>
              <option value="Packed & Active">Packed & Active (4+ stops/day)</option>
            </select>
          </div>

          {/* Number of Days */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center justify-between">
              <span>Duration of Trip</span>
              <span className="text-blue-600 font-bold">{numDays} Days</span>
            </label>
            <input 
              type="range" 
              min="1" 
              max="5" 
              value={numDays}
              onChange={(e) => setNumDays(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg mt-2" 
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>1 Day</span>
              <span>5 Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Results */}
      {isGenerated && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <span>📍 {numDays}-Day Custom Itinerary for {destination}</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">Optimized for {travelPace} pace • Full meal suggestions included</p>
            </div>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition duration-200 gap-1.5 ${
                copied 
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Itinerary Copied!</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Copy Itinerary Text</span>
                </>
              )}
            </button>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-4">
            {displayedPlan.map((plan, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/30">
                      {idx + 1}
                    </span>
                    <h4 className="text-lg font-extrabold text-slate-900">
                      {plan.day} Schedule
                    </h4>
                  </div>
                  <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-mono font-bold flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Est. Spend: {plan.spending}</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                  {/* Attractions */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      <span>🚶 Visit Attractions & Activities</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-6">
                      {plan.attractions}
                    </p>
                  </div>

                  {/* Suggested meals */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                      <Utensils className="w-4 h-4 text-amber-600" />
                      <span>🍽️ Suggested Meals & Culinary Spots</span>
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed pl-6">
                      {plan.meals}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
