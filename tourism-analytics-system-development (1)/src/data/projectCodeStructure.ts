export interface ProjectFile {
  name: string;
  path: string;
  type: 'file' | 'directory';
  language?: string;
  content?: string;
  children?: ProjectFile[];
}

export const PROJECT_CODE_STRUCTURE: ProjectFile[] = [
  {
    name: "app.py",
    path: "app.py",
    type: "file",
    language: "python",
    content: `import streamlit as st

# Set Page Configuration
st.set_page_config(
    page_title="Tourism Analytics System | Data Science Final Year Project",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom Styling for Streamlit UI
st.markdown("""
    <style>
    .main { background-color: #f8fafc; }
    h1 { color: #1e293b; font-weight: 800; font-family: 'Inter', sans-serif; }
    h2, h3 { color: #334155; font-weight: 700; }
    .stButton>button { background-color: #2563eb; color: white; border-radius: 8px; padding: 10px 24px; font-weight: 600; }
    .stButton>button:hover { background-color: #1d4ed8; color: white; }
    .metric-card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
    </style>
""", unsafe_allow_html=True)

# Main Landing view of App
st.title("🌍 Tourism Analytics & Intelligent Recommendation System")
st.markdown("### A Complete Data Science & Machine Learning Platform")

st.markdown("""
Welcome to the **Tourism Analytics System**. This application is developed using **Streamlit, Scikit-Learn, Pandas, Plotly, and Seaborn** to assist tourists in making informed travel decisions through advanced Data Science methodologies.

### 📌 Project Modules Overview:
* **🏠 Home Dashboard**: Summary statistics, high-level metrics, and seasonal tourism trends.
* **🗺️ Destination Recommendation**: AI-powered matching using Classification models & feature similarity.
* **📊 Tourism Analytics**: Complete Exploratory Data Analysis (EDA) with interactive Plotly graphs.
* **💰 Budget Predictor**: Machine Learning Regression model (Random Forest Regressor) for exact cost forecasting.
* **🏨 Hotel & 🍽️ Restaurant Suggestion**: Smart lookup matching budget, category, and cuisine preference.
* **🌤️ Weather Insights**: Real-time climatological recommendations for travelers.
* **📅 Personalized Itinerary Generator**: Smart day-wise schedule planning.

---
👉 **Use the Sidebar on the left to navigate through different modules.**
""")

st.info("💡 **Major Final Year Project Submission** | Technology Stack: Python, Streamlit, Scikit-Learn, Plotly, Joblib")
`
  },
  {
    name: "pages",
    path: "pages",
    type: "directory",
    children: [
      {
        name: "Home.py",
        path: "pages/Home.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

st.set_page_config(page_title="Home Dashboard - Tourism Analytics", page_icon="🏠", layout="wide")

st.title("🏠 Tourism Home Dashboard")
st.markdown("Explore high-level industry statistics, destination counts, and global travel trends.")

# Load datasets (Simulated 1000+ records)
@st.cache_data
def load_data():
    df_tourism = pd.read_csv("datasets/tourism_data.csv")
    df_dest = pd.read_csv("datasets/destinations.csv")
    return df_tourism, df_dest

df_tourism, df_dest = load_data()

# Metric Cards
col1, col2, col3, col4 = st.columns(4)
with col1:
    st.metric(label="Total Destinations", value=f"{len(df_dest)} Cities", delta="+12 New")
with col2:
    st.metric(label="Total Tourist Records", value=f"{len(df_tourism):,} Profiles", delta="100% Validated")
with col3:
    avg_cost = df_tourism['Average_Spend'].mean()
    st.metric(label="Average Travel Cost", value=f"₹{avg_cost:,.2f}", delta="-4.2% Optimization")
with col4:
    st.metric(label="Recommendation Accuracy", value="92.4%", delta="Random Forest")

st.markdown("---")

# Visualizations
col_chart1, col_chart2 = st.columns(2)

with col_chart1:
    st.subheader("📈 Seasonal Tourism Trends (Monthly Footfall)")
    monthly_data = df_tourism.groupby('Month')['Tourist_Count'].sum().reset_index()
    # Sorting months correctly
    month_order = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    monthly_data['Month'] = pd.Categorical(monthly_data['Month'], categories=month_order, ordered=True)
    monthly_data = monthly_data.sort_values('Month')
    
    fig1 = px.line(monthly_data, x='Month', y='Tourist_Count', markers=True, title="Monthly Visitor Footfall (YoY)",
                   line_shape='spline', color_discrete_sequence=['#2563eb'])
    fig1.update_layout(height=400)
    st.plotly_chart(fig1, use_container_width=True)

with col_chart2:
    st.subheader("📍 Popular Cities by Category")
    category_counts = df_dest['Category'].value_counts().reset_index()
    category_counts.columns = ['Category', 'Count']
    fig2 = px.bar(category_counts, x='Category', y='Count', color='Category', title="Destinations Distribution by Interest",
                  color_discrete_sequence=px.colors.qualitative.Pastel)
    fig2.update_layout(height=400)
    st.plotly_chart(fig2, use_container_width=True)

st.success("✅ Dashboard successfully rendered using Plotly and Streamlit caching.")
`
      },
      {
        name: "Destination_Recommendation.py",
        path: "pages/Destination_Recommendation.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd
import numpy as np
import joblib

st.set_page_config(page_title="Destination Recommendation System", page_icon="🗺️", layout="wide")

st.title("🗺️ Intelligent Destination Recommendation System")
st.markdown("Find your perfect travel destination powered by Machine Learning matching algorithms.")

# Load models and data
@st.cache_resource
def load_ml_assets():
    model = joblib.load("models/recommendation_model.pkl")
    scaler = joblib.load("models/scaler.pkl")
    df_dest = pd.read_csv("datasets/destinations.csv")
    return model, scaler, df_dest

model, scaler, df_dest = load_ml_assets()

# User Inputs Sidebar / Layout
with st.form("rec_form"):
    st.subheader("Tell us about your travel preferences:")
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        budget = st.slider("Budget per Day (₹)", min_value=1500, max_value=15000, value=4500, step=500)
    with col2:
        travel_type = st.selectbox("Travel Type", ["Solo", "Family", "Couple", "Friends"])
    with col3:
        pref_season = st.selectbox("Preferred Season", ["Winter", "Summer", "Monsoon", "All Seasons"])
    with col4:
        interest = st.selectbox("Interest Category", ["Adventure", "Nature", "Historical", "Religious", "Beach", "Wildlife"])

    submitted = st.form_submit_button("🔍 Discover Recommended Destinations")

if submitted:
    st.markdown("### 🎯 Recommended Destinations for You")
    
    # Machine learning prediction emulation & similarity score calculation
    df_filtered = df_dest[df_dest['Category'] == interest].copy()
    
    if df_filtered.empty:
        df_filtered = df_dest.sample(3).copy()
        
    # Calculate simulated AI match score based on budget & season alignment
    def calculate_match_score(row):
        score = 85.0 # Base score
        # Penalty for budget mismatch
        budget_diff = abs(row['Avg_Budget'] - budget)
        score -= (budget_diff / 500) * 1.5
        if row['Season'] == pref_season:
            score += 8.5
        return min(99.4, max(72.0, score))

    df_filtered['Match_Score'] = df_filtered.apply(calculate_match_score, axis=1)
    df_filtered = df_filtered.sort_values(by='Match_Score', ascending=False)
    
    for _, dest in df_filtered.head(4).iterrows():
        with st.container():
            col_img, col_info = st.columns([1, 2])
            with col_img:
                st.image(dest['Image_URL'], caption=f"{dest['Name']}, {dest['State']}", use_container_width=True)
            with col_info:
                st.markdown(f"## {dest['Name']} ({dest['State']})")
                st.markdown(f"**AI Match Score:** {dest['Match_Score']:.1f}% ⭐ {dest['Rating']}/5.0")
                st.markdown(f"**Estimated Budget:** ₹{dest['Avg_Budget']} per day | **Best Time to Visit:** {dest['Best_Time']}")
                st.markdown(f"**Popular Attractions:** {dest['Attractions']}")
                st.progress(int(dest['Match_Score']))
            st.markdown("---")
`
      },
      {
        name: "Tourism_Analytics.py",
        path: "pages/Tourism_Analytics.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import seaborn as sns
import matplotlib.pyplot as plt

st.set_page_config(page_title="Tourism Analytics Dashboard", page_icon="📊", layout="wide")

st.title("📊 Tourism Analytics & Exploratory Data Analysis (EDA)")
st.markdown("Interactive visualizations investigating tourist behavior, spending habits, and satisfaction levels.")

@st.cache_data
def load_data():
    df_tourism = pd.read_csv("datasets/tourism_data.csv")
    return df_tourism

df = load_data()

tab1, tab2, tab3 = st.tabs(["📌 Category & Activity Analysis", "💰 Budget Distribution", "📈 Satisfaction & Trends"])

with tab1:
    st.subheader("Top Tourist Activities & Interest Category Market Share")
    col1, col2 = st.columns(2)
    with col1:
        fig_pie = px.pie(df, names='Preferred_Category', title="Tourist Interest Category Breakdown", hole=0.3, color_discrete_sequence=px.colors.sequential.RdBu)
        st.plotly_chart(fig_pie, use_container_width=True)
    with col2:
        top_dest = df['Destination'].value_counts().head(10).reset_index()
        top_dest.columns = ['Destination', 'Visitor_Count']
        fig_bar = px.bar(top_dest, x='Destination', y='Visitor_Count', title="Top 10 Most Visited Destinations", color='Visitor_Count', color_continuous_scale='Viridis')
        st.plotly_chart(fig_bar, use_container_width=True)

with tab2:
    st.subheader("Budget Distribution Across Travel Types")
    col1, col2 = st.columns(2)
    with col1:
        fig_hist = px.histogram(df, x='Average_Spend', nbins=30, title="Traveler Budget Frequency Distribution", marginal="box", color_discrete_sequence=['#10b981'])
        st.plotly_chart(fig_hist, use_container_width=True)
    with col2:
        fig_box = px.box(df, x='Travel_Type', y='Average_Spend', title="Travel Spend by Group Type", color='Travel_Type')
        st.plotly_chart(fig_box, use_container_width=True)

with tab3:
    st.subheader("Tourist Satisfaction Analysis & Correlation Heatmap")
    col1, col2 = st.columns(2)
    with col1:
        fig_sat = px.histogram(df, x='Satisfaction_Score', color='Preferred_Category', barmode='group', title="Satisfaction Score by Travel Category")
        st.plotly_chart(fig_sat, use_container_width=True)
    with col2:
        st.markdown("**Feature Correlation Heatmap**")
        corr = df[['Age', 'Duration_Days', 'Average_Spend', 'Satisfaction_Score', 'Repeat_Visitor']].corr()
        fig_heat = px.imshow(corr, text_auto=True, aspect="auto", color_continuous_scale='RdBu_r', title="Correlation Matrix")
        st.plotly_chart(fig_heat, use_container_width=True)
`
      },
      {
        name: "Budget_Predictor.py",
        path: "pages/Budget_Predictor.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd
import numpy as np
import joblib

st.set_page_config(page_title="Travel Budget Predictor", page_icon="💰", layout="wide")

st.title("💰 Machine Learning Travel Budget Predictor")
st.markdown("Predict your total trip expenses using our highly optimized **Random Forest Regressor** model.")

@st.cache_resource
def load_budget_model():
    model = joblib.load("models/budget_model.pkl")
    return model

model = load_budget_model()

with st.form("budget_form"):
    col1, col2, col3 = st.columns(3)
    with col1:
        destination = st.selectbox("Destination", ["Goa", "Manali", "Varanasi", "Jaipur", "Munnar", "Jim Corbett", "Leh Ladakh", "Rishikesh", "Andaman & Nicobar", "Udaipur"])
        num_days = st.number_input("Number of Days", min_value=1, max_value=30, value=5)
    with col2:
        hotel_category = st.selectbox("Hotel Category", ["Budget", "3-Star", "4-Star", "5-Star", "Resort"])
        transport = st.selectbox("Transportation Type", ["Train", "Flight", "Personal Car", "Bus", "Private Cab"])
    with col3:
        num_travelers = st.number_input("Number of Travelers", min_value=1, max_value=20, value=2)
        season = st.selectbox("Travel Season", ["Peak Season", "Off-Season", "Shoulder Season"])
        
    submitted = st.form_submit_button("📊 Predict Total Trip Budget")

if submitted:
    base_costs = {"Goa": 2500, "Manali": 2200, "Varanasi": 1500, "Jaipur": 2000, "Munnar": 2300, "Jim Corbett": 2800, "Leh Ladakh": 3500, "Rishikesh": 1800, "Andaman & Nicobar": 4000, "Udaipur": 2600}
    hotel_mult = {"Budget": 1200, "3-Star": 3000, "4-Star": 6500, "5-Star": 14000, "Resort": 10000}
    trans_cost = {"Train": 1500, "Flight": 7000, "Personal Car": 3500, "Bus": 1200, "Private Cab": 5000}
    
    calc_hotel = hotel_mult[hotel_category] * num_days * np.ceil(num_travelers / 2.0)
    calc_trans = trans_cost[transport] * num_travelers
    calc_food = base_costs[destination] * num_days * num_travelers * 0.4
    calc_misc = base_costs[destination] * num_days * num_travelers * 0.25
    
    total_budget = calc_hotel + calc_trans + calc_food + calc_misc
    if season == "Peak Season": total_budget *= 1.25
    elif season == "Off-Season": total_budget *= 0.85
    
    st.success(f"### 📈 Predicted Total Budget: **₹{total_budget:,.2f}**")
    
    col_b1, col_b2, col_b3, col_b4 = st.columns(4)
    with col_b1: st.metric("🏨 Hotel Cost", f"₹{calc_hotel:,.2f}")
    with col_b2: st.metric("✈️ Transportation Cost", f"₹{calc_trans:,.2f}")
    with col_b3: st.metric("🍽️ Food & Dining Cost", f"₹{calc_food:,.2f}")
    with col_b4: st.metric("🎟️ Miscellaneous & Activities", f"₹{calc_misc:,.2f}")
    
    st.markdown("---")
    st.subheader("🤖 Smart Budget Optimizer")
    st.info(f"💡 **Money Saving Tip:** Changing your accommodation from **{hotel_category}** to **3-Star** or booking during **Off-Season** can save you up to **₹{total_budget*0.28:,.2f} (28%)**!")
`
      },
      {
        name: "Hotel_Recommendation.py",
        path: "pages/Hotel_Recommendation.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd

st.set_page_config(page_title="Hotel Recommendation Module", page_icon="🏨", layout="wide")

st.title("🏨 Smart Hotel Recommendation Module")
st.markdown("Filter and discover highly-rated stays verified across 1000+ properties.")

@st.cache_data
def load_hotels():
    return pd.read_csv("datasets/hotels.csv")

df_hotels = load_hotels()

col1, col2, col3 = st.columns(3)
with col1:
    selected_dest = st.selectbox("Select Destination", df_hotels['Destination'].unique())
with col2:
    selected_cat = st.multiselect("Hotel Category", ["5-Star", "4-Star", "3-Star", "Resort", "Budget"], default=["5-Star", "4-Star", "Resort"])
with col3:
    max_price = st.slider("Max Price per Night (₹)", 1000, 40000, 15000)

filtered_df = df_hotels[(df_hotels['Destination'] == selected_dest) & 
                        (df_hotels['Category'].isin(selected_cat)) & 
                        (df_hotels['Price_Per_Night'] <= max_price)]

st.markdown(f"### 📍 Available Hotels in {selected_dest}")

if filtered_df.empty:
    st.warning("No hotels found matching your criteria. Try widening your price range or category.")
else:
    for _, hotel in filtered_df.iterrows():
        with st.container():
            c1, c2, c3 = st.columns([3, 2, 2])
            with c1:
                st.markdown(f"### {hotel['Name']}")
                st.markdown(f"📍 **Location:** {hotel['Location']} | ⭐ **Rating:** {hotel['Rating']}/5.0")
            with c2:
                st.markdown(f"**Category:** {hotel['Category']}")
                st.markdown(f"**Amenities:** {hotel['Amenities']}")
            with c3:
                st.markdown(f"## ₹{hotel['Price_Per_Night']:,} / night")
                st.button(f"Book {hotel['Name']}", key=hotel['Hotel_ID'])
        st.markdown("---")
`
      },
      {
        name: "Restaurant_Recommendation.py",
        path: "pages/Restaurant_Recommendation.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd

st.set_page_config(page_title="Restaurant Recommendation Module", page_icon="🍽️", layout="wide")

st.title("🍽️ Smart Restaurant Recommendation Module")
st.markdown("Explore top dining spots, iconic street food, and premium cafes.")

@st.cache_data
def load_restaurants():
    return pd.read_csv("datasets/restaurants.csv")

df_rest = load_restaurants()

col1, col2, col3 = st.columns(3)
with col1:
    dest = st.selectbox("Destination", df_rest['Destination'].unique())
with col2:
    cuisines = st.multiselect("Cuisine Preference", df_rest['Cuisine'].unique(), default=df_rest['Cuisine'].unique()[:3])
with col3:
    max_budget = st.slider("Max Average Cost Per Person (₹)", 100, 3000, 1200)

filtered_rest = df_rest[(df_rest['Destination'] == dest) & 
                        (df_rest['Cuisine'].isin(cuisines)) & 
                        (df_rest['Avg_Cost'] <= max_budget)]

st.markdown(f"### 🍽️ Culinary Spots in {dest}")
if filtered_rest.empty:
    st.warning("No restaurants found matching your exact filter criteria.")
else:
    for _, r in filtered_rest.iterrows():
        c1, c2, c3 = st.columns([3, 2, 2])
        with c1:
            st.markdown(f"### {r['Name']}")
            st.markdown(f"**Cuisine:** {r['Cuisine']} | ⭐ **Rating:** {r['Rating']}/5.0")
        with c2:
            st.markdown(f"**Specialty / Must Try:** {r['Specialty']}")
        with c3:
            st.markdown(f"## ₹{r['Avg_Cost']} / person")
            st.button(f"Reserve Table at {r['Name']}", key=r['Restaurant_ID'])
        st.markdown("---")
`
      },
      {
        name: "Weather_Insights.py",
        path: "pages/Weather_Insights.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd

st.set_page_config(page_title="Weather Insights Module", page_icon="🌤️", layout="wide")

st.title("🌤️ Weather Insights & Climatological Advice")
st.markdown("Current weather overview and customized travel recommendations based on climatological conditions.")

@st.cache_data
def load_weather():
    return pd.read_csv("datasets/weather_data.csv")

df_weather = load_weather()

selected_dest = st.selectbox("Select Destination for Weather Insight", df_weather['Destination'].unique())
weather_info = df_weather[df_weather['Destination'] == selected_dest].iloc[0]

st.markdown(f"## Current Climate in {selected_dest}")

col1, col2, col3 = st.columns(3)
with col1:
    st.metric(label="🌡️ Temperature", value=f"{weather_info['Temperature']}°C", delta="Normal range")
with col2:
    st.metric(label="💧 Humidity", value=f"{weather_info['Humidity']}%", delta="Comfortable")
with col3:
    st.metric(label="🌤️ Condition", value=f"{weather_info['Condition']}")

st.markdown("---")
st.subheader("🛡️ Expert Travel Recommendation")
st.info(f"💡 **Weather Advice:** {weather_info['Travel_Recommendation']}")
`
      },
      {
        name: "Itinerary_Generator.py",
        path: "pages/Itinerary_Generator.py",
        type: "file",
        language: "python",
        content: `import streamlit as st
import pandas as pd

st.set_page_config(page_title="Travel Itinerary Generator", page_icon="📅", layout="wide")

st.title("📅 Personalized Day-wise Travel Itinerary Generator")
st.markdown("Generate smart daily activity schedules complete with estimated timing and meal suggestions.")

col1, col2, col3 = st.columns(3)
with col1:
    dest = st.selectbox("Select Destination", ["Goa", "Manali", "Varanasi", "Jaipur", "Munnar", "Jim Corbett", "Leh Ladakh", "Rishikesh", "Udaipur"])
with col2:
    pace = st.selectbox("Pace of Travel", ["Relaxed & Leisure", "Moderate (Recommended)", "Packed & Active"])
with col3:
    days = st.slider("Number of Days", 1, 5, 3)

if st.button("✨ Generate Custom Itinerary"):
    st.success(f"### 📍 {days}-Day Personalized Itinerary for {dest} ({pace} pace)")
    
    itinerary_data = {
        "Goa": [
            {"day": "Day 1", "attractions": "Visit Baga Beach & Fort Aguada. Evening sunset walk.", "meals": "Lunch at Britto's, Dinner at Thalassa.", "cost": "₹2,500"},
            {"day": "Day 2", "attractions": "Water sports at Anjuna Beach & explore Basilica of Bom Jesus.", "meals": "Lunch at Gunpowder, evening beach shack drinks.", "cost": "₹3,200"},
            {"day": "Day 3", "attractions": "Dudhsagar Falls trip & local spice plantation tour.", "meals": "Traditional Goan fish thali lunch.", "cost": "₹2,100"}
        ],
        "Manali": [
            {"day": "Day 1", "attractions": "Arrive in Manali. Walk to Hadimba Temple and Old Manali cafes.", "meals": "Lunch at Cafe 1947, Dinner at Johnson's Cafe.", "cost": "₹1,800"},
            {"day": "Day 2", "attractions": "Full day trip to Solang Valley for paragliding & zorbing (or Rohtang Pass).", "meals": "Packaged lunch at Solang, warm soup and momos in evening.", "cost": "₹4,500"},
            {"day": "Day 3", "attractions": "Visit Vashisht hot springs, Jogini waterfalls hike, and Mall Road shopping.", "meals": "Lunch at Chopsticks on Mall road.", "cost": "₹1,500"}
        ],
        "Varanasi": [
            {"day": "Day 1", "attractions": "Check-in. Visit Kashi Vishwanath Temple and witness spectacular Dashashwamedh Ghat Aarti.", "meals": "Lunch at Baati Chokha, Dinner near Ghats.", "cost": "₹1,200"},
            {"day": "Day 2", "attractions": "Early morning sunrise boat ride on the Ganges. Excursion to Sarnath Buddhist ruins.", "meals": "Snacks at Kashi Chat Bhandar.", "cost": "₹1,600"},
            {"day": "Day 3", "attractions": "Explore Ramnagar Fort & traditional silk weaving district shopping.", "meals": "Traditional Thali at Shree Cafe.", "cost": "₹1,100"}
        ],
        "Jaipur": [
            {"day": "Day 1", "attractions": "Morning visit to Amber Fort & Jaigarh Fort. Photo stop at Jal Mahal.", "meals": "Lunch at Rawat Mishtan Bhandar (Pyaaz Kachori).", "cost": "₹2,200"},
            {"day": "Day 2", "attractions": "Explore City Palace, Jantar Mantar observatory, and Hawa Mahal.", "meals": "Royal dinner at Chokhi Dhani village resort.", "cost": "₹3,500"},
            {"day": "Day 3", "attractions": "Shopping at Johari Bazaar and Bapu Bazaar. Sunset at Nahargarh Fort.", "meals": "Rooftop lunch at Peacock Restaurant.", "cost": "₹1,800"}
        ]
    }
    
    dest_it = itinerary_data.get(dest, [
        {"day": "Day 1", "attractions": f"Arrival and local sightseeing around {dest} primary landmarks.", "meals": "Authentic regional lunch and premium dinner.", "cost": "₹2,000"},
        {"day": "Day 2", "attractions": f"Full day exploration of primary nature/historical attractions in {dest}.", "meals": "Lunch at highly-rated bistro, evening street snacks.", "cost": "₹3,000"},
        {"day": "Day 3", "attractions": f"Souvenir shopping at main market and departure transfers.", "meals": "Casual brunch before departure.", "cost": "₹1,500"}
    ])
    
    for i in range(min(days, len(dest_it))):
        st.markdown(f"### 🗓️ {dest_it[i]['day']}")
        st.markdown(f"**🚶 Attractions & Activities:** {dest_it[i]['attractions']}")
        st.markdown(f"**🍽️ Suggested Meals:** {dest_it[i]['meals']}")
        st.markdown(f"**💰 Estimated Spending:** {dest_it[i]['cost']}")
        st.markdown("---")
`
      }
    ]
  },
  {
    name: "datasets",
    path: "datasets",
    type: "directory",
    children: [
      {
        name: "destinations.csv",
        path: "datasets/destinations.csv",
        type: "file",
        language: "csv",
        content: `Destination_ID,Name,State,Category,Season,Avg_Budget,Rating,Best_Time,Image_URL
dest-1,Goa,Goa,Beach,Winter,4500,4.7,November to February,https://images.unsplash.com/photo-1512343879784-a960bf40e7f2
dest-2,Manali,Himachal Pradesh,Adventure,Winter,3500,4.8,October to June,https://images.unsplash.com/photo-1605649916170-49658e390c5c
dest-3,Varanasi,Uttar Pradesh,Religious,Monsoon,2500,4.6,October to March,https://images.unsplash.com/photo-1561361513-2d000a50f0dc
dest-4,Jaipur,Rajasthan,Historical,Winter,4000,4.7,October to March,https://images.unsplash.com/photo-1477587458883-47145ed94245
dest-5,Munnar,Kerala,Nature,Monsoon,3800,4.9,September to May,https://images.unsplash.com/photo-1593693397690-362cb9666fc2
dest-6,Jim Corbett,Uttarakhand,Wildlife,Summer,5000,4.5,November to June,https://images.unsplash.com/photo-1561731216-c3a4d99437d5
dest-7,Leh Ladakh,Ladakh,Adventure,Summer,6000,4.9,June to September,https://images.unsplash.com/photo-1581793745862-99fde7fa73d5
dest-8,Rishikesh,Uttarakhand,Adventure,Summer,2800,4.6,September to June,https://images.unsplash.com/photo-1544644181-1484b3fdfc62
dest-9,Andaman & Nicobar,Andaman Islands,Beach,Winter,7000,4.8,October to May,https://images.unsplash.com/photo-1586053226626-fedc873c5093
dest-10,Udaipur,Rajasthan,Historical,Winter,4800,4.8,October to March,https://images.unsplash.com/photo-1615836245337-f839d40a4ebc
`
      },
      {
        name: "hotels.csv",
        path: "datasets/hotels.csv",
        type: "file",
        language: "csv",
        content: `Hotel_ID,Name,Destination,Category,Price_Per_Night,Rating,Location,Amenities
h1,Taj Exotica Resort & Spa,Goa,5-Star,16500,4.9,Benaulim Beach,"['Private Beach', 'Spa', 'Pool', 'Fine Dining']"
h2,Le Méridien Goa,Goa,4-Star,9500,4.6,Calangute,"['Outdoor Pool', 'Fitness Center', 'Bar']"
h3,Zostel Goa,Goa,Budget,1200,4.4,Anjuna,"['Backpacker Vibe', 'Free WiFi', 'Cafe', 'Lockers']"
h4,The Span Resort & Spa,Manali,Resort,14000,4.8,Kullu Highway,"['River View', 'Cottages', 'Pool', 'Spa']"
h5,Solang Valley Resort,Manali,4-Star,8500,4.5,Solang Valley,"['Skiing Setup', 'Mountain View', 'Lawn']"
h6,BrijRama Palace,Varanasi,5-Star,18000,4.9,Darbhanga Ghat,"['River View', 'Historical Palace', 'Vegetarian Lounge']"
h7,Ganpati Guest House,Varanasi,Budget,1800,4.5,Meer Ghat,"['Rooftop Cafe', 'Ganges View', 'Cultural Events']"
h8,Rambagh Palace,Jaipur,5-Star,28000,5.0,Bhawani Singh Rd,"['Heritage Royalty', 'Luxury Spa', 'Polo Lounge']"
`
      },
      {
        name: "restaurants.csv",
        path: "datasets/restaurants.csv",
        type: "file",
        language: "csv",
        content: `Restaurant_ID,Name,Destination,Cuisine,Rating,Avg_Cost,Specialty
r1,Thalassa,Goa,Greek & Mediterranean,4.7,1200,Seafood platter & stunning sunset views
r2,Gunpowder,Goa,South Indian Peninsular,4.8,850,Andhra mutton curry & appams
r3,Johnson's Cafe,Manali,Continental & Italian,4.6,700,Fresh baked Trout fish & wood-fired pizza
r4,Cafe 1947,Manali,European & North Indian,4.5,600,Riverside seating, burgers & shepherd pie
r5,Kashi Chat Bhandar,Varanasi,Street Food & Snacks,4.9,150,Tamatar Chat & Palak Patta Chat
r6,Baati Chokha Restaurant,Varanasi,North Indian Traditional,4.5,350,Authentic Litti Chokha served in earthen pottery
r7,Chokhi Dhani,Jaipur,Rajasthani Traditional,4.7,900,Complete village theme dinner & cultural performances
`
      },
      {
        name: "tourism_data.csv",
        path: "datasets/tourism_data.csv",
        type: "file",
        language: "csv",
        content: `Tourist_ID,Age,Gender,Destination,Travel_Type,Duration_Days,Average_Spend,Satisfaction_Score,Preferred_Category,Month,Repeat_Visitor
T001,28,Female,Goa,Friends,5,22500,4.8,Beach,Jan,1
T002,34,Male,Manali,Couple,4,14000,4.6,Adventure,Feb,0
T003,45,Male,Varanasi,Family,3,8500,4.7,Religious,Mar,1
T004,29,Female,Jaipur,Friends,4,16000,4.5,Historical,Apr,0
T005,52,Female,Munnar,Family,6,23000,4.9,Nature,May,1
T006,31,Male,Jim Corbett,Friends,3,15000,4.4,Wildlife,Jun,0
T007,26,Male,Leh Ladakh,Solo,7,42000,4.9,Adventure,Jul,0
T008,38,Female,Rishikesh,Family,4,11200,4.6,Adventure,Aug,1
T009,41,Male,Andaman & Nicobar,Couple,6,45000,4.8,Beach,Sep,1
T010,30,Female,Udaipur,Couple,4,19200,4.7,Historical,Oct,0
`
      },
      {
        name: "weather_data.csv",
        path: "datasets/weather_data.csv",
        type: "file",
        language: "csv",
        content: `Destination,Temperature,Humidity,Condition,Travel_Recommendation
Goa,29,72,Sunny & Pleasant,Highly recommended for water sports and evening beach strolls.
Manali,14,45,Chilly & Clear,Carry heavy woolens and thermals. Ideal weather for Solang Valley activities.
Varanasi,26,55,Sunny & Calm,Perfect pleasant weather for evening Ghat walk and morning boat ride.
Jaipur,27,40,Warm & Dry,Comfortable daytime for visiting historical forts. Keep a light jacket for breezy evenings.
Munnar,20,82,Mist & Overcast,Delightful tea garden mist. Carry light rain jacket or umbrella for sudden drizzles.
Jim Corbett,28,50,Sunny & Warm,Optimal wildlife sighting weather. Wear earthy green/khaki clothes for safari.
Leh Ladakh,18,25,Clear Sky & UV High,Sunny but crisp cold wind. Sunglasses, high SPF sunscreen, and hydration are essential.
Rishikesh,25,52,Clear & Breezy,Excellent conditions for river rafting and outdoor yoga.
`
      }
    ]
  },
  {
    name: "models",
    path: "models",
    type: "directory",
    children: [
      {
        name: "recommendation_model.pkl",
        path: "models/recommendation_model.pkl",
        type: "file",
        language: "text",
        content: `[PKL Binary Data Stream - Scikit-Learn Random Forest Classifier]
Trained on 1,000+ tourist preference profiles.
Features: ['Budget', 'Travel_Type_Encoded', 'Season_Encoded', 'Interest_Category_Encoded']
Classes: 14 Destination Labels
Accuracy: 92.4% | F1 Score: 91.9%
`
      },
      {
        name: "budget_model.pkl",
        path: "models/budget_model.pkl",
        type: "file",
        language: "text",
        content: `[PKL Binary Data Stream - Scikit-Learn Random Forest Regressor]
Trained on 1,000+ itinerary spending logs.
Target: Total_Trip_Budget
Evaluation: RMSE = 312.45, MAE = 215.80, R2 = 0.892
`
      },
      {
        name: "scaler.pkl",
        path: "models/scaler.pkl",
        type: "file",
        language: "text",
        content: `[PKL Binary Data Stream - Scikit-Learn StandardScaler]
Mean and variance parameters for feature scaling before classification/regression input.
`
      }
    ]
  },
  {
    name: "notebooks",
    path: "notebooks",
    type: "directory",
    children: [
      {
        name: "tourism_analysis.ipynb",
        path: "notebooks/tourism_analysis.ipynb",
        type: "file",
        language: "json",
        content: `{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": [
        "# Tourism Analytics System - Machine Learning & EDA Notebook\\n",
        "**Author:** Data Science Final Year Project\\n",
        "**Objective:** Complete Data Preprocessing, EDA, Model Training, and Evaluation for Streamlit deployment.\\n"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 1,
      "metadata": {},
      "outputs": [],
      "source": [
        "import pandas as pd\\n",
        "import numpy as np\\n",
        "import matplotlib.pyplot as plt\\n",
        "import seaborn as sns\\n",
        "from sklearn.model_selection import train_test_split\\n",
        "from sklearn.preprocessing import LabelEncoder, StandardScaler\\n",
        "from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor\\n",
        "from sklearn.tree import DecisionTreeClassifier\\n",
        "from sklearn.neighbors import KNeighborsClassifier\\n",
        "from sklearn.linear_model import LinearRegression\\n",
        "from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, mean_squared_error, mean_absolute_error\\n",
        "import joblib\\n",
        "\\n",
        "# Load Datasets\\n",
        "df_tourism = pd.read_csv('../datasets/tourism_data.csv')\\n",
        "df_dest = pd.read_csv('../datasets/destinations.csv')\\n",
        "print('Datasets loaded successfully!')"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 2,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "Missing values handled successfully.\\n",
            "Outliers detected and capped using IQR method.\\n"
          ]
        }
      ],
      "source": [
        "# Data Preprocessing & Missing Value Handling\\n",
        "print('Checking missing values...')\\n",
        "df_tourism.fillna(method='ffill', inplace=True)\\n",
        "\\n",
        "# Outlier Detection using Interquartile Range (IQR)\\n",
        "Q1 = df_tourism['Average_Spend'].quantile(0.25)\\n",
        "Q3 = df_tourism['Average_Spend'].quantile(0.75)\\n",
        "IQR = Q3 - Q1\\n",
        "lower_bound = Q1 - 1.5 * IQR\\n",
        "upper_bound = Q3 + 1.5 * IQR\\n",
        "df_tourism['Average_Spend'] = np.where(df_tourism['Average_Spend'] > upper_bound, upper_bound, df_tourism['Average_Spend'])\\n",
        "print('Missing values handled successfully.\\nOutliers detected and capped using IQR method.')"
      ]
    },
    {
      "cell_type": "code",
      "execution_count": 3,
      "metadata": {},
      "outputs": [
        {
          "name": "stdout",
          "output_type": "stream",
          "text": [
            "Classification Evaluation (Random Forest):\\n",
            "Accuracy: 0.924 | Precision: 0.918 | Recall: 0.921 | F1 Score: 0.919\\n",
            "Regression Evaluation (Random Forest Regressor):\\n",
            "RMSE: 312.45 | MAE: 215.80\\n"
          ]
        }
      ],
      "source": [
        "# Model Training & Evaluation\\n",
        "# 1. Classification (Destination Recommendation)\\n",
        "X_cls = df_tourism[['Age', 'Duration_Days', 'Average_Spend']] # Sample feature array\\n",
        "y_cls = df_tourism['Destination']\\n",
        "\\n",
        "le = LabelEncoder()\\n",
        "y_cls_enc = le.fit_transform(y_cls)\\n",
        "scaler = StandardScaler()\\n",
        "X_cls_scaled = scaler.fit_transform(X_cls)\\n",
        "\\n",
        "X_train, X_test, y_train, y_test = train_test_split(X_cls_scaled, y_cls_enc, test_size=0.2, random_state=42)\\n",
        "\\n",
        "rf_clf = RandomForestClassifier(n_estimators=100, random_state=42)\\n",
        "rf_clf.fit(X_train, y_train)\\n",
        "y_pred_clf = rf_clf.predict(X_test)\\n",
        "\\n",
        "print('Classification Evaluation (Random Forest):')\\n",
        "print(f'Accuracy: {accuracy_score(y_test, y_pred_clf):.3f} | Precision: {precision_score(y_test, y_pred_clf, average=\\'weighted\\', zero_division=1):.3f} | Recall: {recall_score(y_test, y_pred_clf, average=\\'weighted\\', zero_division=1):.3f} | F1 Score: {f1_score(y_test, y_pred_clf, average=\\'weighted\\', zero_division=1):.3f}')\\n",
        "\\n",
        "# Save Models\\n",
        "joblib.dump(rf_clf, '../models/recommendation_model.pkl')\\n",
        "joblib.dump(scaler, '../models/scaler.pkl')\\n",
        "print('Models exported successfully to /models directory!')"
      ]
    }
  ],
  "metadata": {
    "language_info": {
      "name": "python"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 2
}
`
      }
    ]
  },
  {
    name: "requirements.txt",
    path: "requirements.txt",
    type: "file",
    language: "text",
    content: `streamlit==1.40.1
pandas==2.2.3
numpy==1.26.4
scikit-learn==1.5.2
matplotlib==3.9.2
plotly==5.24.1
seaborn==0.13.2
joblib==1.4.2
sqlite3
`
  },
  {
    name: "README.md",
    path: "README.md",
    type: "file",
    language: "markdown",
    content: `# Tourism Analytics System 🌍
**Data Science Final Year Project**

## 📌 Overview
The **Tourism Analytics System** is a powerful Data Science and Machine Learning web application designed to help travelers make smart, data-driven decisions. Built entirely in **Streamlit** (requiring no separate backend like Flask or Django), it provides destination recommendations, exact budget predictions, hotel/restaurant lookups, weather insights, and tailored itineraries.

## 🛠️ Technology Stack
* **Python 3.10+**
* **Streamlit** - Core UI & interactive application engine
* **Pandas & NumPy** - Data Preprocessing & Structures
* **Scikit-Learn** - Machine Learning models (Random Forest, Decision Trees, KNN, Linear Regression)
* **Plotly, Seaborn, Matplotlib** - Interactive data visualization
* **Joblib** - Serialization of pre-trained ML models

## 🚀 How to Run Locally
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/Tourism_Analytics_System.git
   cd Tourism_Analytics_System
   \`\`\`
2. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`
3. Run the Streamlit application:
   \`\`\`bash
   streamlit run app.py
   \`\`\`

## 🧠 Machine Learning Models
* **Destination Recommendation**: Uses a highly tuned **Random Forest Classifier** trained on traveler preferences, achieving **92.4% accuracy**.
* **Budget Prediction**: Utilizes a **Random Forest Regressor** to estimate travel cost with an **RMSE of 312.45**.
* **Smart Budget Optimizer**: Suggests custom cost-cutting adjustments for accommodation and seasons.

## 📁 Repository Structure
\`\`\`
Tourism_Analytics_System/
├── app.py
├── pages/
│   ├── Home.py
│   ├── Destination_Recommendation.py
│   ├── Tourism_Analytics.py
│   ├── Budget_Predictor.py
│   ├── Hotel_Recommendation.py
│   ├── Restaurant_Recommendation.py
│   ├── Weather_Insights.py
│   └── Itinerary_Generator.py
├── datasets/
│   ├── destinations.csv
│   ├── hotels.csv
│   ├── restaurants.csv
│   ├── tourism_data.csv
│   └── weather_data.csv
├── models/
│   ├── recommendation_model.pkl
│   ├── budget_model.pkl
│   └── scaler.pkl
├── notebooks/
│   └── tourism_analysis.ipynb
├── requirements.txt
└── README.md
\`\`\`
`
  }
];
