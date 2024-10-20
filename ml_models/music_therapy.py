# music_therapy.py
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from playsound import playsound

# Load your dataset
data = pd.read_csv('music_data.csv')  # Ensure your CSV contains 'title', 'file_path', 'mood', and feature columns
print(data.head())

# Create a function to get recommendations based on mood
def get_recommendations(mood):
    # Filter songs by mood
    filtered_data = data[data['mood'].str.lower() == mood.lower()]

    # If no songs found for the mood, return None
    if filtered_data.empty:
        return None

    # Calculate cosine similarity based on features
    features = filtered_data[['feature1', 'feature2', 'feature3']]  # Adjust based on your features
    cosine_sim = cosine_similarity(features)
    
    # Sort by similarity scores
    sim_scores = list(enumerate(cosine_sim.mean(axis=1)))  # Mean similarity for each song
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

    # Get top 5 recommendations
    top_indices = [i[0] for i in sim_scores[:5]]
    recommendations = filtered_data.iloc[top_indices]

    return recommendations

# Function to play the song
def play_song(file_path):
    playsound(file_path)

# Main function
def main():
    print("Welcome to the Music Therapy App!")
    while True:
        mood = input("What kind of music are you seeking? (fun/relaxation/motivation): ").strip().lower()

        recommendations = get_recommendations(mood)

        if recommendations is not None:
            print("Here are some recommendations:")
            for index, row in recommendations.iterrows():
                print(f"- {row['title']}")
                # Play the first recommendation as an example
                play_song(row['file_path'])
            print("Enjoy the music!")
        else:
            print("No songs found for that mood. Please try again.")

        # Ask if the user wants to try another mood
        another = input("Would you like to try another mood? (yes/no): ").strip().lower()
        if another != 'yes':
            break

if __name__ == "__main__":
    main()
