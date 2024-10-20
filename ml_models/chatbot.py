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

# Load spaCy model
nlp = spacy.load('en_core_web_sm')

# Initialize the sentiment analyzer
sentiment_analyzer = SentimentIntensityAnalyzer()

# Response pools for different sentiments
positive_responses = []
neutral_responses = []
negative_responses = []

# Function to load responses from the CSV file
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

# Load responses from CSV (Make sure 'responses.csv' is present)
load_responses('responses.csv')

# Function to analyze sentiment
def analyze_sentiment(text):
    score = sentiment_analyzer.polarity_scores(text)
    return score['compound']

# Function to generate a response based on sentiment
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

# Default route for home
@app.route('/')
def home():
    return jsonify(message="Welcome to the SERENE AI Backend!")

# Chatbot route to handle conversation
@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    try:
        data = request.json
        user_input = data.get('input', '')
        logging.info(f"Received user input: {user_input}")
        
        # Generate response using the chatbot logic
        response = generate_response(user_input)
        return jsonify({"response": response})
    
    except Exception as e:
        logging.error(f"Error in chatbot_response: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# Start the app
if __name__ == '__main__':
    app.run(debug=True)
