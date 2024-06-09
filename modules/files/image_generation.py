#Importing the libraries
import openai
from dotenv import load_dotenv
import os
import requests

# Load environment variables from .env file
load_dotenv()

# Set up your OpenAI API key
openai.api_key = os.getenv('OPENAI_API_KEY')

def generate_image_from_text(sentence):
    response = openai.Image.create(
        prompt=sentence,
        model="dall-e-3", 
        n=1,
        size="1024x1024"
    )
    image_url = response['data'][0]['url']
    return image_url

def save_image(image_url, file_path):
    response = requests.get(image_url)
    if response.status_code == 200:
        with open(file_path, 'wb') as file:
            file.write(response.content)
    else:
        print("Failed to retrieve the image")
