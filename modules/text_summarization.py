#Importing the libraries
import re
import nltk 
import numpy as np 
import networkx as nx
from nltk.cluster.util import cosine_distance

#Function to preprocess the text
def preprocess_text(text):
  #Importing stopwords
  stopwords = nltk.corpus.stopwords.words('english')
  #Removing the extra spaces
  text = re.sub(r'\s', ' ', text)
  # Lowercase the text
  text = text.lower()
  # Tokenize the input text
  words = nltk.word_tokenize(text)
  # Remove stopwords
  words = [word for word in words if word not in stopwords]
  # Remove punctuation
  words = [word for word in words if word.isalnum()]
  #Join the words back together
  text = ' '.join(words)
  return text

#Function to calculate the similarity between two sentences
def calculate_sentence_similarity(sentence1, sentence2):
  words1 = [word for word in nltk.word_tokenize(sentence1)]
  words2 = [word for word in nltk.word_tokenize(sentence2)]

  all_words = list(set(words1 + words2))

  vector1 = [0] * len(all_words)
  vector2 = [0] * len(all_words)

  for word in words1:
    vector1[all_words.index(word)] += 1
  for word in words2:
    vector2[all_words.index(word)] += 1
    
  return 1 - cosine_distance(vector1, vector2)

#Function to create the similarity matrix
def calculate_similarity_matrix(sentences):
  similarity_matrix = np.zeros((len(sentences), len(sentences)))
  #print(similarity_matrix)
  for i in range(len(sentences)):
    for j in range(len(sentences)):
      if i == j:
        continue
      similarity_matrix[i][j] = calculate_sentence_similarity(sentences[i], sentences[j])
  return similarity_matrix

def summarize(text, summary_proportion=0.4):
  original_sentences = [sentence for sentence in nltk.sent_tokenize(text)]
  formatted_sentences = [preprocess_text(sentence) for sentence in original_sentences]
  similarity_matrix = calculate_similarity_matrix(formatted_sentences)
  similarity_graph = nx.from_numpy_array(similarity_matrix)
  scores = nx.pagerank(similarity_graph)
  ranked_sentences = sorted(((scores[i], i) for i, _ in enumerate(original_sentences)), reverse=True)
  number_of_sentences = max(1, int(len(original_sentences) * summary_proportion))
    
  selected_indices = sorted([ranked_sentences[i][1] for i in range(number_of_sentences)])
  summary_sentences = [original_sentences[index] for index in selected_indices]
  return summary_sentences

# Function to return the summary in a bullet point format
def bullet_point_summary(text, summary_proportion=0.4):
  summary_sentences = summarize(text, summary_proportion)
  bullet_points = '\n'.join(f'\u2022 {sentence.strip()}' for sentence in summary_sentences if sentence.strip())
  return bullet_points
