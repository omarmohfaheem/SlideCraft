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

def read_file(file_path):
    if file_path.lower().endswith('.pdf'):
        return read_pdf(file_path)
    elif file_path.lower().endswith('.txt'):
        return read_txt(file_path)
    elif file_path.lower().endswith('.docx'):
        return read_docx(file_path)
    else:
        return "Unsupported file type"
    

# import tkinter as tk
# from tkinter import filedialog
# root = tk.Tk()
# root.withdraw() 
# file_path = filedialog.askopenfilename(
# title="Select a PDF, TXT, or DOCX file",
# filetypes=[("PDF, Text, and Word files", "*.pdf;*.txt;*.docx"), ("All files", "*.*")]
#     )
# if file_path.lower().endswith(('.pdf', '.txt', '.docx')):
#   content = read_file(file_path)
#   print("File content:")
#   print(content)
# else:
#   print("No file selected or unsupported file type")

