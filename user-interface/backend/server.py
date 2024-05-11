import sys
sys.path.append('.')
from modules.text_summarization import bullet_point_summary

from flask import Flask, request, jsonify
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/summary', methods=['POST'])
def handle_summarize():
    data = request.json
    text = data['text']
    summary = bullet_point_summary(text)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
