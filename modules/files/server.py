#Importing the libraries
import os
from flask import Flask, request, render_template, send_file, jsonify
from werkzeug.utils import secure_filename
from flask_cors import CORS

#Importing Modules
from slide_generation import generate_slides

# Download the punkt tokenizer for NLTK
import nltk
nltk.download('punkt')

app = Flask(__name__)
CORS(app)

# Configuration for file uploads
UPLOAD_FOLDER = os.path.join('modules', 'uploads')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'pdf', 'docx', 'txt'}

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/generate_presentation', methods=['POST'])
def generate_presentation():
    try:
        title = request.form['title']
        input_text = request.form.get('textInput', '')
        num_slides = int(request.form['numSlides'])
        additional_slides = request.form['includeTitleAndThankYouSlides'] == 'true'
        include_images = request.form['includeImages'] == 'true'
        theme = request.form['theme']
        image_source = request.form['imageSource'] if include_images else None
        
        # File handling
        file = request.files.get('file')
        file_path = None

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
        
        # Determine input source
        if file_path:
            is_file = True
            input_data = file_path
        else:
            is_file = False
            input_data = input_text

        # Log received data for debugging
        app.logger.debug(f"Title: {title}")
        app.logger.debug(f"Num Slides: {num_slides}")
        app.logger.debug(f"Additional Slides: {additional_slides}")
        app.logger.debug(f"Include Images: {include_images}")
        app.logger.debug(f"Theme: {theme}")
        app.logger.debug(f"Image Source: {image_source}")
        app.logger.debug(f"Is File: {is_file}")
        app.logger.debug(f"Input Data: {input_data[:100]}...") 

        # Generate the presentation
        presentation_stream = generate_slides(
            title=title,
            input_data=input_data,
            is_file=is_file,
            num_slides=num_slides,
            additional_slides=additional_slides,
            use_images=include_images,
            image_source=image_source,
            theme=theme
        )

        if presentation_stream is None:
            raise FileNotFoundError("Failed to generate the presentation")

        # Create a safe filename using the title
        safe_title = "".join(c if c.isalnum() else "_" for c in title)
        filename = f"{safe_title}.pptx"

        # Send the generated presentation file to the user
        return send_file(presentation_stream, as_attachment=True, download_name=filename)
    except Exception as e:
        app.logger.error(f"Error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
