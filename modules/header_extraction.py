# Importing the libraries
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import spacy

# Function to extract keywords from a single document
def extract_keywords(doc, top_n=3):
    tfidf = TfidfVectorizer(stop_words='english', max_features=top_n)
    response = tfidf.fit_transform([doc])
    feature_names = np.array(tfidf.get_feature_names_out())
    tfidf_scores = response.toarray()[0]
    top_indices = tfidf_scores.argsort()[-top_n:][::-1]
    return feature_names[top_indices]

def generate_slide_deck_title(bullet_points, top_n=3):
    # Combine all bullet points into a single document
    combined_text = ' '.join(bullet_points)

    nlp = spacy.load('en_core_web_trf')
    
    doc = nlp(combined_text)
    
    # Extract key phrases using spaCy noun chunks
    key_phrases = [chunk.text for chunk in doc.noun_chunks]
    
    # Extract keywords using TF-IDF
    keywords = extract_keywords(combined_text, top_n)
    
    # Combine key phrases and keywords, removing duplicates
    combined_phrases = list(dict.fromkeys(key_phrases + list(keywords)))
    
    # Capitalize each word in each phrase
    capitalized_phrases = [' '.join(word.capitalize() for word in phrase.split()) for phrase in combined_phrases]
    
    # Generate a title by joining the top N key phrases or keywords
    title = ' '.join(capitalized_phrases[:top_n])
    
    return title
