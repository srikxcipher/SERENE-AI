#habit_recommendation.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
import random
import spacy
import csv
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(filename='app.log', level=logging.INFO, 
                    format='%(asctime)s %(levelname)s: %(message)s')

# Load spaCy model for sentiment analysis (from chatbot integration)
nlp = spacy.load('en_core_web_sm')

# Initialize the sentiment analyzer
sentiment_analyzer = SentimentIntensityAnalyzer()

# Response pools for chatbot (loaded in chatbot function)
positive_responses = []
neutral_responses = []
negative_responses = []

# Load responses from CSV (Make sure 'responses.csv' is present)
def load_responses(filename):
    with open(filename, mode='r', encoding='utf-8') as file:
        reader = csv.DictReader(file)
        for row in reader:
            if row['Sentiment'] == 'Positive':
                positive_responses.append(row['Response'])
            elif row['Sentiment'] == 'Neutral':
                neutral_responses.append(row['Response'])
            elif row['Sentiment'] == 'Negative':
                negative_responses.append(row['Response'])

load_responses('responses.csv')

# Sentiment analysis for chatbot
def analyze_sentiment(text):
    score = sentiment_analyzer.polarity_scores(text)
    return score['compound']

# Generate response based on sentiment
def generate_response(user_input):
    sentiment_score = analyze_sentiment(user_input)
    if sentiment_score >= 0.05:
        detected_sentiment = 'positive'
        response = random.choice(positive_responses)
    elif sentiment_score <= -0.05:
        detected_sentiment = 'negative'
        response = random.choice(negative_responses)
    else:
        detected_sentiment = 'neutral'
        response = random.choice(neutral_responses)
    
    logging.info(f"Detected Sentiment: {detected_sentiment}")
    return response

# Chatbot route to handle conversation
@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.json
        user_input = data.get('input', '')
        logging.info(f"Received user input: {user_input}")
        response = generate_response(user_input)
        return jsonify({"response": response})
    
    except Exception as e:
        logging.error(f"Error in chatbot_response: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# Habit Recommendation Setup

# Load the dataset (Make sure 'habit_data.csv' is present)
data = pd.read_csv('habit_data.csv')

# Prepare features and labels
X = data[['exercise_frequency', 'social_media_hours', 'stress_level', 'mindfulness_frequency']]
y = data['recommended_habit']

# Convert categorical features to numerical values
X_encoded = pd.get_dummies(X)

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Train the Decision Tree classifier
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Function to recommend a habit based on user input
def recommend_habit(user_input):
    user_df = pd.DataFrame([user_input])
    user_df_encoded = pd.get_dummies(user_df)
    user_df_encoded = user_df_encoded.reindex(columns=X_encoded.columns, fill_value=0)
    recommendation = clf.predict(user_df_encoded)
    return recommendation[0]

# API route for the habit recommendation
@app.route('/recommend_habit', methods=['POST'])
def recommend():
    try:
        user_data = request.json
        logging.info(f"Received user habit data: {user_data}")
        
        # Get habit recommendation
        recommendation = recommend_habit(user_data)
        return jsonify({"recommended_habit": recommendation})
    
    except Exception as e:
        logging.error(f"Error in habit recommendation: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# Start the app
if __name__ == '__main__':
    app.run(debug=True)
