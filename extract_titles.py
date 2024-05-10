import PyPDF2
import re
import cv2
import numpy as np

from readpdf import read_pdf

def extract_titles(text):
    # Use regular expressions to extract potential titles from the text
    # Here, we're assuming titles start with a capital letter and end with a punctuation mark
    title_pattern = r'[A-Z].*?[.!?]'
    titles = re.findall(title_pattern, text)
    return titles

def extract_images(file_path):
    pdf_file = open(file_path, 'rb')
    pdf_reader = PyPDF2.PdfFileReader(pdf_file)
    images = []
    for page_num in range(pdf_reader.numPages):
        page = pdf_reader.getPage(page_num)
        try:
            xObject = page['/Resources']['/XObject'].get_object()
        except KeyError:
            continue
        for obj in xObject:
            if xObject[obj]['/Subtype'] == '/Image':
                image = xObject[obj].get_data()
                images.append(image)
    pdf_file.close()
    return images

def process_images(images):
    processed_images = []
    for image_data in images:
        # Assuming the image data is in bytes format (e.g., obtained from a PDF)
        nparr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        # Perform image processing tasks (e.g., resizing, grayscale conversion, etc.)
        # Example: resize the image to 200x200 pixels
        resized_img = cv2.resize(img, (200, 200))
        processed_images.append(resized_img)
    return processed_images

# Example usage
file_path = 'path_to_your_pdf_file.pdf'
pdf_text = read_pdf(file_path)
titles = extract_titles(pdf_text)
print("Extracted Titles:")
for title in titles:
    print(title)

images = extract_images(file_path)
processed_images = process_images(images)
print(f"Extracted {len(processed_images)} images from the PDF.")
