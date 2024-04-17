# backend.py
from flask import Flask, jsonify, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './uploaded_images/'
TEXT_FILE = './uploaded_images.txt'

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/qrimage_upload", methods=['POST'])
def upload_images():
    data = request.json
    if not data or 'images' not in data:
        return jsonify({'error': 'Invalid data format'}), 400

    image_urls = data['images']
    
    try:
        with open('image_urls.txt', 'w') as file:
            for url in image_urls:
                file.write(f"{url}\n")
    except Exception as e:
        return jsonify({'error': f"Error writing to file: {e}"}), 500

    return jsonify({'success': True, 'image_urls': image_urls}), 200

@app.route("/generated-image")
def generate_image():
    return

@app.route("/")
def home():
    return "Hello, World!"

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(port=5000, debug=True)