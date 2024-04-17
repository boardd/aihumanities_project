# backend.py
from flask import Flask, jsonify, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import logging

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './uploaded_images/'

app = Flask(__name__)
CORS(app)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/qrimage_upload", methods=['POST'])
def qrimage_uploadmage_upload():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    files = request.files.getlist('file')
    filenames = []

    for file in files:
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        if file:
            filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
            file.save(filename)
            filenames.append(filename)

    return jsonify({'success': True, 'filenames': filenames}), 200

@app.route("/")
def home():
    return "Hello, World!"

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(port=5000, debug=True)