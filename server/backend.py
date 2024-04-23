from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './uploaded_images/'

app = Flask(__name__)
CORS(app, origins="*", supports_credentials=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# OpenAI client setup
with open('./api_key.txt', 'r') as file:
    API_KEY = file.readline().strip()

client = OpenAI(api_key=API_KEY)

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

@app.route("/generated-image", methods=['GET'])
def generate_image():
    file_path = './image_urls.txt'

    with open(file_path, 'r') as file:
        lines = [line.strip() for line in file]

    selected_filenames = lines
    description = filter_and_combine_descriptions(art_dict, selected_filenames)

    if description:
        generated_image_url = generate_image_with_dalle(description)
        if generated_image_url:
            return jsonify({"image_url": generated_image_url}), 200

    return jsonify({"error": "Failed to generate image"}), 500

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(port=5000, debug=True)
