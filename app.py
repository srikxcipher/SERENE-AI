from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics.pairwise import cosine_similarity
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import random
import csv
import os
import torch
from transformers import GPTNeoForCausalLM, GPT2Tokenizer, pipeline
import spacy
from habit_questionnaire import gather_user_data

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(filename='app.log', level=logging.INFO, 
                    format='%(asctime)s %(levelname)s: %(message)s')

# Load GPT-Neo model and tokenizer (for story therapy)
model_name = "EleutherAI/gpt-neo-1.3B"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPTNeoForCausalLM.from_pretrained(model_name)

# Load spaCy model for sentiment analysis (for chatbot)
nlp = spacy.load('en_core_web_sm')

# Initialize sentiment analyzer for chatbot
sentiment_analyzer = SentimentIntensityAnalyzer()

# Load datasets for music and habit recommendation
habit_data = pd.read_csv('habit_data.csv')
music_data = pd.read_csv('music_data.csv')  # Assuming the file has 'title', 'file_path', 'mood', and features

# Prepare features and labels for habit recommendation
X = habit_data[['exercise_frequency', 'social_media_hours', 'stress_level', 'mindfulness_frequency']]
y = habit_data['recommended_habit']
X_encoded = pd.get_dummies(X)

# Split the data for habit recommendation model
X_train, X_test, y_train, y_test = train_test_split(X_encoded, y, test_size=0.2, random_state=42)

# Train Decision Tree classifier for habit recommendation
clf = DecisionTreeClassifier()
clf.fit(X_train, y_train)

# Load chatbot responses (CSV) for sentiment-based response pools
positive_responses = []
neutral_responses = []
negative_responses = []

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

# Analyze sentiment for chatbot
def analyze_sentiment(text):
    score = sentiment_analyzer.polarity_scores(text)
    return score['compound']

# Generate chatbot response based on sentiment
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

# Habit recommendation based on user input
def recommend_habit(user_input):
    user_df = pd.DataFrame([user_input])
    user_df_encoded = pd.get_dummies(user_df)
    user_df_encoded = user_df_encoded.reindex(columns=X_encoded.columns, fill_value=0)
    recommendation = clf.predict(user_df_encoded)
    return recommendation[0]

# Music recommendation based on mood
def get_music_recommendations(mood):
    filtered_data = music_data[music_data['mood'].str.lower() == mood.lower()]
    
    if filtered_data.empty:
        return None

    features = filtered_data[['feature1', 'feature2', 'feature3']]  # Adjust for your feature columns
    cosine_sim = cosine_similarity(features)
    
    sim_scores = list(enumerate(cosine_sim.mean(axis=1)))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    
    top_indices = [i[0] for i in sim_scores[:5]]
    recommendations = filtered_data.iloc[top_indices]
    return recommendations

# Generate a positive story using GPT-Neo (Story Therapy)
def generate_positive_story(title):
    prompt = f"Write a sweet and uplifting story titled '{title}' that ends happily. "
    inputs = tokenizer.encode(prompt, return_tensors="pt")

    # Generate a story
    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_length=250,
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            repetition_penalty=1.5,
            top_k=50,
            top_p=0.95,
            temperature=0.9,
            do_sample=True,
            early_stopping=True,
        )

    story = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return story

# AI Writing Therapist functions
topics = {
    "good": [
        "Describe a recent accomplishment you're proud of.",
        "What is something that made you smile today?",
        "Write about a time when you helped someone.",
        "Share a memorable moment with friends or family."
    ],
    "neutral": [
        "What is a daily routine you enjoy?",
        "Write about something interesting you learned recently.",
        "Describe a place you like to visit.",
        "What are your thoughts on the weather today?"
    ],
    "bad": [
        "Write about a challenge you're currently facing.",
        "What is something that has been bothering you lately?",
        "Describe a moment when you felt overwhelmed.",
        "What do you wish you could change about your day?"
    ]
}

# Predefined empathetic feedback responses
empathetic_feedback = {
    "good": [
        "That's wonderful to hear! Keep building on that positive energy.",
        "It's great to celebrate your achievements! What’s next for you?",
        "Helping others is such a rewarding experience!",
        "Cherish those moments with your loved ones!"
    ],
    "neutral": [
        "It's nice to have routines that bring you comfort.",
        "Learning new things can be so enriching; keep exploring!",
        "Having a favorite place can provide a great escape.",
        "Weather can impact our mood; what do you enjoy most about it?"
    ],
    "bad": [
        "I'm sorry to hear that. Remember, this is just a moment in time.",
        "Challenges are tough, but they help us grow.",
        "Feeling overwhelmed is valid; take a deep breath.",
        "It's okay to wish for change; sometimes we need to take small steps."
    ]
}

def generate_feedback(mood):
    return random.choice(empathetic_feedback[mood])

# API route for the AI Writing Therapist
@app.route('/writing_therapist', methods=['POST'])
def writing_therapist():
    try:
        data = request.json
        mood = data.get('mood', '').lower()
        
        if mood not in topics:
            return jsonify({"error": "Please provide a valid mood: good, bad, or neutral."}), 400
        
        # Randomly select a topic based on mood
        topic = random.choice(topics[mood])
        
        # Generate empathetic feedback
        feedback = generate_feedback(mood)

        return jsonify({
            "topic": topic,
            "feedback": feedback
        })

    except Exception as e:
        logging.error(f"Error in writing_therapist: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

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

# API route to handle chatbot responses
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

# API route to recommend a habit
@app.route('/recommend_habit', methods=['POST'])
def recommend():
    try:
        user_data = request.json
        recommendation = recommend_habit(user_data)
        return jsonify({"recommended_habit": recommendation})
    except Exception as e:
        logging.error(f"Error in habit recommendation: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# API route to get music recommendations based on mood
@app.route('/recommend_music', methods=['POST'])
def recommend_music():
    try:
        data = request.json
        mood = data.get('mood', '')
        recommendations = get_music_recommendations(mood)
        
        if recommendations is not None:
            return jsonify(recommendations.to_dict(orient='records'))
        else:
            return jsonify({"message": "No music recommendations available for this mood."}), 404

    except Exception as e:
        logging.error(f"Error in recommend_music: {str(e)}")
        return jsonify({"error": "An error occurred while processing your request."}), 500

# API route to generate a positive story
@app.route('/generate_story', methods=['POST'])
def generate_story():
    try:
        data = request.json
        title = data.get('title', 'A Beautiful Day')
        story = generate_positive_story(title)
        return jsonify({"story": story})
    except Exception as e:
        logging.error(f"Error in generate_story: {str(e)}")
        return jsonify({"error": "An error occurred while generating the story."}), 500

if __name__ == '__main__':
    app.run(debug=True)
