import React, { useState } from 'react';
import { HOTELS, DESTINATIONS } from '../data/mockData';
import { Hotel as HotelIcon, Star, MapPin, CheckCircle, SlidersHorizontal } from 'lucide-react';

export const HotelRecommendation: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<string>('Goa');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(20000);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const filteredHotels = HOTELS.filter(hotel => {
    const matchDest = hotel.destination === selectedDest;
    const matchCat = selectedCategory === 'All' || hotel.category === selectedCategory;
    const matchPrice = hotel.pricePerNight <= maxPrice;
    return matchDest && matchCat && matchPrice;
  });

  const handleBook = (hotelName: string) => {
    setBookingSuccess(hotelName);
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-2">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
            <HotelIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              🏨 Smart Hotel Recommendation Module
            </h1>
            <p className="text-slate-600 text-sm">
              Explore premium boutique resorts, luxury heritage palaces, and highly-rated budget backpacker hostels.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Success Banner */}
      {bookingSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center space-x-3 text-emerald-800 animate-bounce shadow-sm">
          <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
          <p className="text-sm font-semibold">
            Success! Simulated booking request initiated for <span className="font-extrabold">{bookingSuccess}</span>. Confirmation sent to your profile!
          </p>
        </div>
      )}

      {/* Filters Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
        <div className="flex items-center space-x-2 text-sm font-bold text-slate-900 border-b border-slate-100 pb-3">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          <span>Filter Accommodations (`df_hotels` filtering simulation)</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Destination */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Destination City
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

          {/* Hotel Category */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
              Hotel Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition"
            >
              <option value="All">All Categories</option>
              <option value="5-Star">5-Star Luxury</option>
              <option value="4-Star">4-Star Premium</option>
              <option value="3-Star">3-Star Comfort</option>
              <option value="Resort">Boutique Resort</option>
              <option value="Budget">Budget / Hostel</option>
            </select>
          </div>

          {/* Max Price Slider */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2 flex items-center justify-between">
              <span>Max Price per Night</span>
              <span className="text-blue-600 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </label>
            <input 
              type="range" 
              min="1500" 
              max="35000" 
              step="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg mt-2" 
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>₹1,500</span>
              <span>₹35,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hotels List */}
      <div className="space-y-4">
        {filteredHotels.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 p-8 rounded-2xl text-center space-y-2">
            <p className="text-amber-800 font-bold text-lg">No hotels match your specific filter criteria.</p>
            <p className="text-amber-700 text-sm max-w-md mx-auto">
              Try adjusting the max price slider or choosing &apos;All Categories&apos; to explore available properties in {selectedDest}.
            </p>
          </div>
        ) : (
          filteredHotels.map(hotel => (
            <div key={hotel.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-lg">
                    {hotel.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-lg">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{hotel.rating} / 5.0</span>
                  </span>
                </div>

                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {hotel.name}
                </h3>
                
                <p className="text-slate-500 text-xs flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{hotel.location}</span>
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {hotel.amenities.map((amenity, idx) => (
                    <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-200">
                      • {amenity}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-slate-100 md:pl-6 flex flex-col justify-between md:items-end shrink-0">
                <div className="text-left md:text-right mb-4 md:mb-0">
                  <span className="text-xs text-slate-400 font-semibold block">Estimated Price</span>
                  <span className="text-2xl font-black text-slate-900 block">₹{hotel.pricePerNight.toLocaleString('en-IN')}</span>
                  <span className="text-[11px] text-slate-400 block">per night (excl. taxes)</span>
                </div>
                <button
                  onClick={() => handleBook(hotel.name)}
                  className="w-full md:w-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-500/30 transition duration-200 mt-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
