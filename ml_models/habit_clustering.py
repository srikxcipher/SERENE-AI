import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# Load the CSV file
data = pd.read_csv('habits_data.csv')

# Map categories and difficulties to numeric values
category_mapping = {'fitness': 0, 'wellness': 1, 'personal_growth': 2, 'productivity': 3}
difficulty_mapping = {'easy': 0, 'medium': 1, 'hard': 2}
frequency_mapping = {'daily': 0, 'weekly': 1}

# Convert categories and difficulties to numeric
data['category'] = data['category'].map(category_mapping)
data['difficulty'] = data['difficulty'].map(difficulty_mapping)
data['frequency'] = data['frequency'].map(frequency_mapping)

# Function to take user input
def get_user_input():
    print("Tell us about your habit preferences:")
    category = input("Which category are you most interested in? (fitness/wellness/personal_growth/productivity): ").strip().lower()
    frequency = input("How often do you want to practice these habits? (daily/weekly): ").strip().lower()
    time_available = int(input("How much time can you dedicate daily in minutes?: "))
    
    # Convert to numeric for clustering
    category_val = category_mapping.get(category, -1)
    frequency_val = frequency_mapping.get(frequency, -1)
    
    return category_val, frequency_val, time_available

# Get user preferences
category_val, frequency_val, time_available = get_user_input()

# Filter the data based on user input
filtered_data = data[
    (data['category'] == category_val) & 
    (data['frequency'] == frequency_val) & 
    (data['time_needed'] <= time_available)
]

if filtered_data.empty:
    print("Sorry, no habits match your criteria.")
else:
    # Select relevant features for clustering
    features = filtered_data[['time_needed', 'difficulty']]
    
    # Standardize the features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(features)
    
    # Determine the number of clusters based on available habits
    n_clusters = min(3, len(filtered_data))  # Use at most 3 clusters or the number of habits available
    
    # Apply K-Means clustering
    kmeans = KMeans(n_clusters=n_clusters, random_state=42)
    filtered_data['cluster'] = kmeans.fit_predict(scaled_features)
    
    # Show clusters
    print("\nHere are your habit recommendations based on your preferences:")
    for cluster_num in filtered_data['cluster'].unique():
        print(f"\nCluster {cluster_num + 1}:")
        cluster_data = filtered_data[filtered_data['cluster'] == cluster_num]
        for index, row in cluster_data.iterrows():
            print(f"- {row['habit_name']}, Time Needed: {row['time_needed']} mins, Difficulty: {row['difficulty']}")
