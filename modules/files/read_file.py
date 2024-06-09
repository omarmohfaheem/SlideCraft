#Importing the libraries
import PyPDF2
from docx import Document

def read_pdf(file_path):
    text = ""
    try:
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
    except Exception as e:
        print(f"Error reading PDF file: {e}")
    return text

def read_txt(file_path):
    text = ""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            text = file.read()
    except Exception as e:
        print(f"Error reading TXT file: {e}")
    return text

def read_docx(file_path):
    text = ""
    try:
        doc = Document(file_path)
        for para in doc.paragraphs:
            text += para.text + "\n"
    except Exception as e:
        print(f"Error reading DOCX file: {e}")
    return text

def remove_title(text, lines_threshold=1):
    lines = text.split('\n')
    return '\n'.join(lines[lines_threshold:])

def read_file(file_path, lines_threshold=1):
    if file_path.lower().endswith('.pdf'):
        text = read_pdf(file_path)
    elif file_path.lower().endswith('.txt'):
        text = read_txt(file_path)
    elif file_path.lower().endswith('.docx'):
        text = read_docx(file_path)
    else:
        return "Unsupported file type"
    
    return remove_title(text, lines_threshold)

