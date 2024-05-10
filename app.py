from extract_titles import extract_images, extract_titles, process_images
from flask import Flask, render_template, request, jsonify
import PyPDF2
import re

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/process_pdf', methods=['POST'])
def process_pdf():
    pdf_file = request.files['pdf_file']
    pdf_text = extract_text_from_pdf(pdf_file)
    titles = extract_titles(pdf_text)
    images = extract_images(pdf_file)
    # Process images (optional)
    processed_images = process_images(images)
    
    return jsonify({'titles': titles, 'images': processed_images})

def extract_text_from_pdf(pdf_file):
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    num_pages = pdf_reader.numPages
    text = ''
    for page_num in range(num_pages):
        page = pdf_reader.getPage(page_num)
        text += page.extractText()
    return text

# Add extract_titles, extract_images, and process_images functions here (from previous responses)

if __name__ == '__main__':
    app.run(debug=True)
