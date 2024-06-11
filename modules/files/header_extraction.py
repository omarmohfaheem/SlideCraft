#Importing the libraries
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import nltk
from collections import Counter


# Function to extract keywords from a single document
def extract_keywords(doc, top_n=20):
    tfidf = TfidfVectorizer(stop_words='english')
    response = tfidf.fit_transform([doc])
    feature_names = np.array(tfidf.get_feature_names_out())
    tfidf_scores = response.toarray()[0]
    top_indices = tfidf_scores.argsort()[-top_n:][::-1]
    return feature_names[top_indices]

def get_noun_phrases(text):
    # Tokenize the text
    words = nltk.word_tokenize(text)
    # POS tagging
    tagged_words = nltk.pos_tag(words)
    # Chunking based on POS tags to get noun phrases
    grammar = """
    NP: {<NN.*>+<VBZ.*>+<JJ.*>+}
        {<DT>?<JJ><NN.*>+<IN>*<NN.*>+}
        {<DT>?<JJ|RB>*<NN.*>+}
    """
    chunk_parser = nltk.RegexpParser(grammar)
    tree = chunk_parser.parse(tagged_words)
    
    noun_phrases = []
    for subtree in tree.subtrees():
        if subtree.label() == 'NP':
            phrase = " ".join(word for word, _ in subtree.leaves())
            noun_phrases.append(phrase)
    
    return noun_phrases

def generate_header(bullet_points, top_n=3):
    # Combine all bullet points into a single document
    combined_text = ' '.join(bullet_points)
    print("Combined Text:\n", combined_text, "\n")

    # Extract key phrases using NLTK noun phrases and named entities
    key_phrases = get_noun_phrases(combined_text)
    print("Key Phrases:\n", key_phrases, "\n")

    # Print initial key phrases and named entities
    print("Initial Key Phrases and Named Entities:\n", key_phrases, "\n")

    # Refine key phrases: filter out very common words and too short phrases
    refined_key_phrases = [phrase for phrase in key_phrases if len(phrase.split()) > 2]
    print("Refined Key Phrases:\n", refined_key_phrases, "\n")

    # Extract keywords using TF-IDF
    keywords = extract_keywords(combined_text, top_n * 3)
    print("Keywords:\n", keywords, "\n")
    
    # Combine key phrases and keywords, removing duplicates
    combined_phrases = list(dict.fromkeys(refined_key_phrases + list(keywords)))
    print("Combined Phrases:\n", combined_phrases, "\n")
    
    # Calculate TF-IDF scores for combined phrases
    tfidf = TfidfVectorizer(stop_words='english', ngram_range=(1, 3))
    tfidf_matrix = tfidf.fit_transform(combined_phrases)
    tfidf_scores = tfidf_matrix.sum(axis=1).A1
    print("TF-IDF Scores:\n", tfidf_scores, "\n")
    
    # Create a dictionary of phrase scores based on TF-IDF and frequency
    phrase_scores = {phrase: tfidf_scores[i] for i, phrase in enumerate(combined_phrases)}
    print("Phrase Scores:\n", phrase_scores, "\n")

    # Sort phrases by their combined scores
    sorted_phrases = sorted(phrase_scores.items(), key=lambda x: x[1], reverse=True)
    print("Sorted Phrases:\n", sorted_phrases, "\n")
    
    # Get the top N phrases
    top_phrases = [phrase for phrase, score in sorted_phrases[:top_n]]
    print("Top Phrases:\n", top_phrases, "\n")
    
    # Capitalize each word in each phrase
    capitalized_phrases = [' '.join(word.capitalize() for word in phrase.split()) for phrase in top_phrases]
    print("Capitalized Phrases:\n", capitalized_phrases, "\n")
    
    # Generate a title by joining the top N key phrases
    title = ' - '.join(capitalized_phrases)
    
    return title
