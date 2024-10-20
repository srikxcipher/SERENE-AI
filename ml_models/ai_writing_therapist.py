# ai_writing_therapist.py
from transformers import pipeline
import random

# Initialize the NLP pipeline for text generation
nlp_pipeline = pipeline("text-generation", model="gpt2")

# Define topics based on mood
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
    # Randomly select an empathetic response based on mood
    return random.choice(empathetic_feedback[mood])

def main():
    print("Welcome to the AI Writing Therapist! Let's start by checking your mood.")
    
    while True:
        # Ask the user for their mood
        mood = input("How are you feeling today? (good/bad/neutral): ").lower()
        
        if mood not in topics:
            print("Please enter a valid mood: good, bad, or neutral.")
            continue

        # Randomly select a topic based on mood
        topic = random.choice(topics[mood])
        print(f"\nYour Writing Prompt: {topic}")

        # Ask the user for their journal entry
        journal_entry = input("\nPlease write your journal entry: ")
        
        # Generate empathetic feedback based on mood
        feedback = generate_feedback(mood)
        
        # Display the generated feedback
        print("\nAI Feedback:\n")
        print(feedback)
        
        # Ask if the user wants to write another entry
        again = input("\nDo you want to write another entry? (yes/no): ")
        if again.lower() != 'yes':
            break

if __name__ == "__main__":
    main()
