# story_therapy.py
import torch
from transformers import GPTNeoForCausalLM, GPT2Tokenizer

# Load the GPT-Neo model and tokenizer
model_name = "EleutherAI/gpt-neo-1.3B"
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
model = GPTNeoForCausalLM.from_pretrained(model_name)

def generate_positive_story(title):
    prompt = f"Write a sweet and uplifting story titled '{title}' that ends happily. "
    inputs = tokenizer.encode(prompt, return_tensors="pt")

    # Generate a story
    with torch.no_grad():
        outputs = model.generate(
            inputs,
            max_length=250,  # Adjust length for longer story
            num_return_sequences=1,
            no_repeat_ngram_size=2,
            repetition_penalty=1.5,
            top_k=50,
            top_p=0.95,
            temperature=0.9,  # Adjust temperature for creativity
            do_sample=True,
            early_stopping=True,
        )

    story = tokenizer.decode(outputs[0], skip_special_tokens=True)

    return story

def main():
    print("Welcome to the Story Therapy App!")
    title = input("Please enter a title for your story: ")
    story = generate_positive_story(title)
    print(story)

if __name__ == "__main__":
    main()
