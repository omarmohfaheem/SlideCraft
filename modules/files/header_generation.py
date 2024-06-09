#Importing the libraries
import os
from dotenv import load_dotenv
import openai

# Load environment variables from .env file
load_dotenv()


def generate_header(bullet_points):
    # Set up your OpenAI API key
    openai.api_key = os.getenv('OPENAI_API_KEY')

    prompt = f"Generate a suitable 2 or 3 words small simple English header for these bullet points to be a header for a PowerPoint slide:\n{bullet_points}"
    
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}
        ],
        max_tokens=10,
        n=1,
        stop=None,
        temperature=0.7
    )

    header = response.choices[0].message['content'].strip().replace('"', '')
    return header

