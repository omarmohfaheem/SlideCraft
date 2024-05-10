import PyPDF2
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def read_pdf(file_path):
    pdf_file = open(file_path, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    num_pages = pdf_reader.numPages
    text = ''
    for page_num in range(num_pages):
        page = pdf_reader.getPage(page_num)
        text += page.extractText()
    pdf_file.close()
    return text

def text_summarization(text, num_sentences=3):
    # Tokenize the text into sentences
    sentences = text.split('.')
    
    # Calculate TF-IDF scores for each sentence
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(sentences)
    
    # Calculate cosine similarity between sentences and the first sentence (assumed as the most important)
    cos_similarities = cosine_similarity(tfidf_matrix[0], tfidf_matrix)
    
    # Sort sentences based on cosine similarities
    sorted_indices = cos_similarities.argsort()[0][::-1]
    
    # Get the top 'num_sentences' most similar sentences
    top_sentences_indices = sorted_indices[:num_sentences]
    
    # Combine and return the top sentences as the summary
    summary = '.'.join([sentences[i] for i in top_sentences_indices])
    return summary

# Example usage
file_path = 'path_to_your_pdf_file.pdf'
pdf_text = read_pdf(file_path)
summary = text_summarization(pdf_text)
print(summary)
