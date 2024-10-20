# habit_questionnaire.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
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

# Function to gather user data for habit questionnaire
def gather_user_data(user_data):
    return {
        "exercise_frequency": user_data.get("exercise_frequency", ""),
        "social_media_hours": user_data.get("social_media_hours", ""),
        "stress_level": user_data.get("stress_level", ""),
        "mindfulness_frequency": user_data.get("mindfulness_frequency", "")
    }

# API route for the habit questionnaire
@app.route('/habit_questionnaire', methods=['POST'])
def habit_questionnaire():
    try:
        data = request.json
        logging.info(f"Received user habit data: {data}")
        
        user_data = gather_user_data(data)
        return jsonify({"user_data_collected": user_data})

    except Exception as e:
        logging.error(f"Error in habit_questionnaire: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# Start the app
if __name__ == '__main__':
    app.run(debug=True)
