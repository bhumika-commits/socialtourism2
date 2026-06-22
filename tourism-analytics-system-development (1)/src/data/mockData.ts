export interface Destination {
  id: string;
  name: string;
  state: string;
  category: string;
  season: string;
  travelType: string[];
  avgBudgetPerDay: number;
  rating: number;
  bestTimeToVisit: string;
  attractions: string[];
  imageUrl: string;
  matchScore?: number;
}

export interface Hotel {
  id: string;
  name: string;
  destination: string;
  category: string; // 3-Star, 4-Star, 5-Star, Budget, Resort
  pricePerNight: number;
  rating: number;
  location: string;
  amenities: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  destination: string;
  cuisine: string;
  rating: number;
  avgCostPerPerson: number;
  specialty: string;
}

export interface WeatherInfo {
  destination: string;
  temperature: number;
  humidity: number;
  condition: string;
  travelRecommendation: string;
}

export const DESTINATIONS: Destination[] = [
  {
    id: "dest-1",
    name: "Goa",
    state: "Goa",
    category: "Beach",
    season: "Winter",
    travelType: ["Friends", "Couple", "Solo"],
    avgBudgetPerDay: 4500,
    rating: 4.7,
    bestTimeToVisit: "November to February",
    attractions: ["Baga Beach", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Flea Market"],
    imageUrl: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-2",
    name: "Manali",
    state: "Himachal Pradesh",
    category: "Adventure",
    season: "Winter",
    travelType: ["Friends", "Couple", "Solo", "Family"],
    avgBudgetPerDay: 3500,
    rating: 4.8,
    bestTimeToVisit: "October to June",
    attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali Cafe Crawl"],
    imageUrl: "https://images.unsplash.com/photo-1605649916170-49658e390c5c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-3",
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "Religious",
    season: "Monsoon",
    travelType: ["Family", "Solo"],
    avgBudgetPerDay: 2500,
    rating: 4.6,
    bestTimeToVisit: "October to March",
    attractions: ["Kashi Vishwanath Temple", "Dashashwamedh Ghat Aarti", "Sarnath", "Ramnagar Fort"],
    imageUrl: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-4",
    name: "Jaipur",
    state: "Rajasthan",
    category: "Historical",
    season: "Winter",
    travelType: ["Family", "Couple", "Friends"],
    avgBudgetPerDay: 4000,
    rating: 4.7,
    bestTimeToVisit: "October to March",
    attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar"],
    imageUrl: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-5",
    name: "Munnar",
    state: "Kerala",
    category: "Nature",
    season: "Monsoon",
    travelType: ["Couple", "Family"],
    avgBudgetPerDay: 3800,
    rating: 4.9,
    bestTimeToVisit: "September to May",
    attractions: ["Eravikulam National Park", "Mattupetty Dam", "Tea Museum", "Anamudi Peak"],
    imageUrl: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-6",
    name: "Jim Corbett",
    state: "Uttarakhand",
    category: "Wildlife",
    season: "Summer",
    travelType: ["Family", "Friends"],
    avgBudgetPerDay: 5000,
    rating: 4.5,
    bestTimeToVisit: "November to June",
    attractions: ["Dhikala Zone Jeep Safari", "Corbett Waterfall", "Garjiya Devi Temple", "Kosi River Bank"],
    imageUrl: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-7",
    name: "Leh Ladakh",
    state: "Ladakh",
    category: "Adventure",
    season: "Summer",
    travelType: ["Friends", "Solo"],
    avgBudgetPerDay: 6000,
    rating: 4.9,
    bestTimeToVisit: "June to September",
    attractions: ["Pangong Lake", "Nubra Valley", "Magnetic Hill", "Shanti Stupa"],
    imageUrl: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d5?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-8",
    name: "Rishikesh",
    state: "Uttarakhand",
    category: "Adventure",
    season: "Summer",
    travelType: ["Friends", "Solo", "Family"],
    avgBudgetPerDay: 2800,
    rating: 4.6,
    bestTimeToVisit: "September to June",
    attractions: ["Laxman Jhula", "Triveni Ghat Aarti", "Shivpuri River Rafting", "Beatles Ashram"],
    imageUrl: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-9",
    name: "Andaman & Nicobar",
    state: "Andaman Islands",
    category: "Beach",
    season: "Winter",
    travelType: ["Couple", "Family", "Friends"],
    avgBudgetPerDay: 7000,
    rating: 4.8,
    bestTimeToVisit: "October to May",
    attractions: ["Radhanagar Beach", "Cellular Jail", "Ross Island", "Scuba Diving at Havelock"],
    imageUrl: "https://images.unsplash.com/photo-1586053226626-fedc873c5093?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-10",
    name: "Udaipur",
    state: "Rajasthan",
    category: "Historical",
    season: "Winter",
    travelType: ["Couple", "Family"],
    avgBudgetPerDay: 4800,
    rating: 4.8,
    bestTimeToVisit: "October to March",
    attractions: ["City Palace", "Lake Pichola Boat Ride", "Jag Mandir", "Sajjangarh Palace"],
    imageUrl: "https://images.unsplash.com/photo-1615836245337-f839d40a4ebc?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-11",
    name: "Ooty",
    state: "Tamil Nadu",
    category: "Nature",
    season: "Summer",
    travelType: ["Family", "Couple"],
    avgBudgetPerDay: 3200,
    rating: 4.5,
    bestTimeToVisit: "March to June",
    attractions: ["Nilgiri Mountain Railway", "Ooty Lake", "Doddabetta Peak", "Botanical Gardens"],
    imageUrl: "https://images.unsplash.com/photo-1547825407-2d060104b7f8?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-12",
    name: "Ranthambore",
    state: "Rajasthan",
    category: "Wildlife",
    season: "Winter",
    travelType: ["Family", "Friends"],
    avgBudgetPerDay: 5200,
    rating: 4.6,
    bestTimeToVisit: "October to April",
    attractions: ["Tiger Reserve Safari", "Ranthambore Fort", "Padam Talao", "Kachida Valley"],
    imageUrl: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-13",
    name: "Puri",
    state: "Odisha",
    category: "Religious",
    season: "Winter",
    travelType: ["Family", "Solo"],
    avgBudgetPerDay: 2200,
    rating: 4.4,
    bestTimeToVisit: "October to March",
    attractions: ["Jagannath Temple", "Puri Golden Beach", "Chilika Lake", "Konark Sun Temple"],
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "dest-14",
    name: "Hampi",
    state: "Karnataka",
    category: "Historical",
    season: "Winter",
    travelType: ["Solo", "Friends", "Family"],
    avgBudgetPerDay: 2800,
    rating: 4.7,
    bestTimeToVisit: "October to February",
    attractions: ["Virupaksha Temple", "Vittala Temple Stone Chariot", "Matanga Hill", "Coracle Ride"],
    imageUrl: "https://images.unsplash.com/photo-1600100397608-f010f423b971?w=600&auto=format&fit=crop&q=80"
  }
];

export const HOTELS: Hotel[] = [
  { id: "h1", name: "Taj Exotica Resort & Spa", destination: "Goa", category: "5-Star", pricePerNight: 16500, rating: 4.9, location: "Benaulim Beach, Goa", amenities: ["Private Beach", "Spa", "Pool", "Fine Dining"] },
  { id: "h2", name: "Le Méridien Goa", destination: "Goa", category: "4-Star", pricePerNight: 9500, rating: 4.6, location: "Calangute, Goa", amenities: ["Outdoor Pool", "Fitness Center", "Bar"] },
  { id: "h3", name: "Zostel Goa", destination: "Goa", category: "Budget", pricePerNight: 1200, rating: 4.4, location: "Anjuna, Goa", amenities: ["Backpacker Vibe", "Free WiFi", "Cafe", "Lockers"] },
  { id: "h4", name: "The Span Resort & Spa", destination: "Manali", category: "Resort", pricePerNight: 14000, rating: 4.8, location: "Kullu Highway, Manali", amenities: ["River View", "Cottages", "Pool", "Spa"] },
  { id: "h5", name: "Solang Valley Resort", destination: "Manali", category: "4-Star", pricePerNight: 8500, rating: 4.5, location: "Solang Valley, Manali", amenities: ["Skiing Setup", "Mountain View", "Lawn"] },
  { id: "h6", name: "BrijRama Palace", destination: "Varanasi", category: "5-Star", pricePerNight: 18000, rating: 4.9, location: "Darbhanga Ghat, Varanasi", amenities: ["River View", "Historical Palace", "Vegetarian Lounge"] },
  { id: "h7", name: "Ganpati Guest House", destination: "Varanasi", category: "Budget", pricePerNight: 1800, rating: 4.5, location: "Meer Ghat, Varanasi", amenities: ["Rooftop Cafe", "Ganges View", "Cultural Events"] },
  { id: "h8", name: "Rambagh Palace", destination: "Jaipur", category: "5-Star", pricePerNight: 28000, rating: 5.0, location: "Bhawani Singh Rd, Jaipur", amenities: ["Heritage Royalty", "Luxury Spa", "Polo Lounge"] },
  { id: "h9", name: "Pearl Palace Heritage", destination: "Jaipur", category: "3-Star", pricePerNight: 4200, rating: 4.7, location: "Ajmer Road, Jaipur", amenities: ["Boutique Theme", "Rooftop Restaurant", "Free Transit"] },
  { id: "h10", name: "The Fog Resort & Spa", destination: "Munnar", category: "Resort", pricePerNight: 7500, rating: 4.7, location: "Chithirapuram, Munnar", amenities: ["Tea Garden View", "Ayurvedic Spa", "Infinity Pool"] },
  { id: "h11", name: "Taj Corbett Resort & Spa", destination: "Jim Corbett", category: "5-Star", pricePerNight: 14500, rating: 4.8, location: "Dhikuli, Ramnagar", amenities: ["Safari Concierge", "Jungle Dining", "Pool"] },
  { id: "h12", name: "The Grand Dragon Ladakh", destination: "Leh Ladakh", category: "5-Star", pricePerNight: 15000, rating: 4.9, location: "Old Road, Leh", amenities: ["Central Heating", "Mountain View", "Oxygen Facilities"] },
  { id: "h13", name: "Aloha On The Ganges", destination: "Rishikesh", category: "Resort", pricePerNight: 9000, rating: 4.6, location: "Tapovan, Rishikesh", amenities: ["Ganges Edge", "Yoga Sessions", "Spa"] },
  { id: "h14", name: "Taj Lake Palace", destination: "Udaipur", category: "5-Star", pricePerNight: 35000, rating: 5.0, location: "Lake Pichola, Udaipur", amenities: ["Floating Palace", "Exclusive Boat", "Heritage Walk"] }
];

export const RESTAURANTS: Restaurant[] = [
  { id: "r1", name: "Thalassa", destination: "Goa", cuisine: "Greek & Mediterranean", rating: 4.7, avgCostPerPerson: 1200, specialty: "Seafood platter & stunning sunset views" },
  { id: "r2", name: "Gunpowder", destination: "Goa", cuisine: "South Indian Peninsular", rating: 4.8, avgCostPerPerson: 850, specialty: "Andhra mutton curry & appams" },
  { id: "r3", name: "Johnson's Cafe", destination: "Manali", cuisine: "Continental & Italian", rating: 4.6, avgCostPerPerson: 700, specialty: "Fresh baked Trout fish & wood-fired pizza" },
  { id: "r4", name: "Cafe 1947", destination: "Manali", cuisine: "European & North Indian", rating: 4.5, avgCostPerPerson: 600, specialty: "Riverside seating, burgers & shepherd pie" },
  { id: "r5", name: "Kashi Chat Bhandar", destination: "Varanasi", cuisine: "Street Food & Snacks", rating: 4.9, avgCostPerPerson: 150, specialty: "Tamatar Chat & Palak Patta Chat" },
  { id: "r6", name: "Baati Chokha Restaurant", destination: "Varanasi", cuisine: "North Indian Traditional", rating: 4.5, avgCostPerPerson: 350, specialty: "Authentic Litti Chokha served in earthen pottery" },
  { id: "r7", name: "Chokhi Dhani", destination: "Jaipur", cuisine: "Rajasthani Traditional", rating: 4.7, avgCostPerPerson: 900, specialty: "Complete village theme dinner & cultural performances" },
  { id: "r8", name: "Peacock Rooftop Restaurant", destination: "Jaipur", cuisine: "Multi-Cuisine", rating: 4.6, avgCostPerPerson: 550, specialty: "Rooftop ambiance, Lal Maas & Garlic Naan" },
  { id: "r9", name: "Saravana Bhavan", destination: "Munnar", cuisine: "South Indian Vegetarian", rating: 4.4, avgCostPerPerson: 250, specialty: "Mini Tiffin & crisp Masala Dosa" },
  { id: "r10", name: "Barbeque Nation", destination: "Jim Corbett", cuisine: "Barbeque & Grills", rating: 4.5, avgCostPerPerson: 800, specialty: "Unlimited live grill table experience" },
  { id: "r11", name: "The Tibetan Kitchen", destination: "Leh Ladakh", cuisine: "Tibetan & Chinese", rating: 4.7, avgCostPerPerson: 450, specialty: "Steamed Momos, Gyathuk & Tingmo" },
  { id: "r12", name: "Chotiwala Restaurant", destination: "Rishikesh", cuisine: "Pure Vegetarian Indian", rating: 4.3, avgCostPerPerson: 300, specialty: "Deluxe Thali & traditional hospitality" },
  { id: "r13", name: "Ambrai Restaurant", destination: "Udaipur", cuisine: "North Indian & Mughlai", rating: 4.8, avgCostPerPerson: 1100, specialty: "Gourmet dining right on Lake Pichola bank" }
];

export const WEATHER_DATA: WeatherInfo[] = [
  { destination: "Goa", temperature: 29, humidity: 72, condition: "Sunny & Pleasant", travelRecommendation: "Highly recommended for water sports and evening beach strolls." },
  { destination: "Manali", temperature: 14, humidity: 45, condition: "Chilly & Clear", travelRecommendation: "Carry heavy woolens and thermals. Ideal weather for Solang Valley activities." },
  { destination: "Varanasi", temperature: 26, humidity: 55, condition: "Sunny & Calm", travelRecommendation: "Perfect pleasant weather for evening Ghat walk and morning boat ride." },
  { destination: "Jaipur", temperature: 27, humidity: 40, condition: "Warm & Dry", travelRecommendation: "Comfortable daytime for visiting historical forts. Keep a light jacket for breezy evenings." },
  { destination: "Munnar", temperature: 20, humidity: 82, condition: "Mist & Overcast", travelRecommendation: "Delightful tea garden mist. Carry light rain jacket or umbrella for sudden drizzles." },
  { destination: "Jim Corbett", temperature: 28, humidity: 50, condition: "Sunny & Warm", travelRecommendation: "Optimal wildlife sighting weather. Wear earthy green/khaki clothes for safari." },
  { destination: "Leh Ladakh", temperature: 18, humidity: 25, condition: "Clear Sky & UV High", travelRecommendation: "Sunny but crisp cold wind. Sunglasses, high SPF sunscreen, and hydration are essential." },
  { destination: "Rishikesh", temperature: 25, humidity: 52, condition: "Clear & Breezy", travelRecommendation: "Excellent conditions for river rafting and outdoor yoga." },
  { destination: "Andaman & Nicobar", temperature: 30, humidity: 78, condition: "Warm Tropical", travelRecommendation: "Superb underwater visibility for SCUBA diving at Havelock Island." },
  { destination: "Udaipur", temperature: 26, humidity: 42, condition: "Sunny & Gentle Wind", travelRecommendation: "Excellent for Lake Pichola evening sunset boat cruise." },
  { destination: "Ooty", temperature: 19, humidity: 65, condition: "Cool & Crisp", travelRecommendation: "Pleasant atmosphere. Recommended for Botanical gardens and boat house." },
  { destination: "Ranthambore", temperature: 29, humidity: 38, condition: "Dry & Bright", travelRecommendation: "Clear weather makes tiger tracking easier around waterbodies." },
  { destination: "Puri", temperature: 28, humidity: 75, condition: "Coastal Breeze", travelRecommendation: "Pleasant temple darshan and beach weather." },
  { destination: "Hampi", temperature: 31, humidity: 35, condition: "Warm & Golden Sunlight", travelRecommendation: "Best explored in early morning or late afternoon to avoid mid-day sun." }
];

export const TOURISM_STATISTICS = {
  totalDestinations: 14,
  simulatedRecordsCount: 5430, // Sum of all generated records across 5 csvs
  averageTravelCostPerDay: 4120,
  growthRate: "+18.4% YoY",
  monthlyVisitors: [12000, 15000, 18000, 14000, 22000, 26000, 24000, 21000, 19000, 25000, 31000, 38000],
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  topCategoryShares: [
    { category: "Adventure", share: 28 },
    { category: "Historical", share: 24 },
    { category: "Beach", share: 20 },
    { category: "Nature & Wildlife", share: 18 },
    { category: "Religious", share: 10 }
  ]
};

export const ML_MODEL_METRICS = {
  classification: [
    { model: "Random Forest Classifier", accuracy: 92.4, precision: 91.8, recall: 92.1, f1: 91.9, status: "Deployed (Best)" },
    { model: "Decision Tree Classifier", accuracy: 87.6, precision: 86.9, recall: 87.4, f1: 87.1, status: "Baseline" },
    { model: "K-Nearest Neighbors (KNN)", accuracy: 84.2, precision: 83.5, recall: 84.0, f1: 83.7, status: "Compared" }
  ],
  regression: [
    { model: "Random Forest Regressor", rmse: 312.45, mae: 215.80, r2: 0.892, status: "Deployed (Best)" },
    { model: "Linear Regression", rmse: 540.12, mae: 420.35, r2: 0.745, status: "Baseline" }
  ]
};
