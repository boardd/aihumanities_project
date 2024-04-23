# backend.py
from flask import Flask, jsonify, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os
import logging

from openai import OpenAI

with open('./api_key.txt', 'r') as file:
    API_KEY = file.readline().strip()

client = OpenAI(api_key=API_KEY)
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

logging.basicConfig(level=logging.INFO)

logger = logging.getLogger('HELLO WORLD')

UPLOAD_FOLDER = './uploaded_images/'
TEXT_FILE = './uploaded_images.txt'

app = Flask(__name__)
CORS(app, origins="https://mygalleryguide.onrender.com")

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

art_dict = {
    'Young Women Picking Fruit - Mary Cassatt.jpeg': 'Depicts two young women, one standing and reaching for fruit on a tree, the other seated and looking up, both dressed in flowing garments amidst a verdant setting.',
    'Wheat Fields after the Rain (The Plain of Auvers) - Vincent van Gogh.jpeg': "Showcases a dynamic landscape with swirling clouds above and a patchwork of colorful wheat fields below, capturing a sense of movement in Van Gogh's distinctive brushwork.",
    'Water Lilies (Nympheas) - Claude Monet.jpg': 'A dreamy, impressionistic expanse of water lilies floating on a pond, with reflections and a play of light and shadow, typical of Monet water lily series.',
    'View of Saint-Mammès - Alfred Sisley.jpeg': 'A serene depiction of the confluence of rivers at Saint-Mammès, with calm water, boats, and buildings reflected in Sisley light-infused palette.',
    'The Sea at Le Havre - Claude Monet.jpeg': 'A vibrant seascape with the waves in the foreground, a sailing boat in the mid-distance, and the hint of a shoreline under a sky heavy with clouds.',
    'The Red Turban - Hermann M. Pechstein.jpeg': "A portrait of a woman wearing a red turban, beside a fruit bowl, with expressive colors and strong outlines, characteristic of Pechstein's style.",
    'The Port of Trouville (Le Port de Trouville) - Eugene Louis Boudin.jpg': 'A bustling harbor scene with ships, people, and buildings, executed with Boudin characteristic light touch and interest in everyday life.',
    'The Great Bridge, Rouen (Le Grand Pont, Rouen) - Camille Pissarro.jpg': "A cityscape showing the grandeur of Rouen bridge and architecture, with figures and activity on the riverbank, in Pissarro's delicate impressionist style.",
    "The Garden in the Rue Cortot, Montmartre - Pierre-Auguste Renoir.jpg": "Vibrant garden with colorful flowers in the foreground and figures conversing in the background.",
    "The Full-Length Mirror - Pierre Bonnard.jpg": "Intimate moment of a woman standing before a full-length mirror in a domestic interior with a colorful rug and striped chair.",
    "The Bath (Le bain) - Edgar Degas.jpg": "Quiet scene of a woman bathing, sitting at the edge of a bathtub in a room with vibrant orange and blue hues.",
    "Street in Pontoise (Rue de Beaujour, Pontoise) - Camille Pissarro.jpg": "A street scene with a figure walking down a tree-lined street, houses on one side and a stone wall on the other, under a sky with clouds.",
    "Self-Portrait - Paul Cézanne.jpeg": "Paul Cézanne's self-portrait with a solid expression against a cool-toned turquoise background.",
    "Rocks at the Seashore (Rochers au bord de la mer) - Paul Cézanne.jpeg": "Rocky seaside landscape with textured rocks in the foreground and calm sea under a dark sky.",
    "River in Winter - John Henry Twachtman.jpg": "Serene winter scene with a river cutting through a snow-covered landscape leading to distant structures.",
    "Place des Lices, St. Tropez - Paul Signac.jpeg": "Bright, sunlit scene with vivid colors depicting the town square of St. Tropez with pointillist technique.",
    "Odalique Coiffure Verte (Odalisque with Green Headress) - Henri Matisse.jpg": "A female figure seated with a green headress, featuring flat areas of color and loose brushwork, characteristic of Matisse's vibrant, decorative style.",
    "Nude in Bathtub - Pierre Bonnard.jpeg": "A vividly colored, intimate scene of a figure in a bathtub, with loose, expressive brushstrokes creating a mosaic of color.",
    "Le Moulin de la Galette - Vincent van Gogh.jpeg": "A landscape showing a windmill amidst buildings with a vibrant green field, using Van Gogh's signature swirling brushstrokes and bright colors.",
    "Landscape with Three Figures - Paul Gauguin.jpg": "A tropical landscape with bold colors and strong outlines, featuring three figures in a paradise setting, with a flat color application and dreamlike quality.",
    "Landscape Near Aix, The Plain of the Arc River - Paul Cézanne.jpeg": "A view over a river valley, with structured brushwork and a muted palette that creates depth and solidity in the natural scene.",
    "Giverny Winter - John Leslie Breck.jpeg": "A snowy landscape with light and shadow conveying the chill of winter, showing Breck's impressionist influence.",
    "Girl Under Apple Tree - Edvard Munch.jpg": "A young girl standing under an apple tree, with intense colors and a swirling sky, reflecting Munch's expressionist style and emotional portrayal.",
    "Garden Overlooking the Sea, Cannes - Edouard Vuillard.jpg": "A garden view overlooking the sea, emphasizing the textural interplay of foliage and sea, with a muted palette for quiet contemplation.",
    'Fifth Avenue in Winter - Childe Hassam.jpg': 'A vibrant portrayal of Fifth Avenue in New York during winter, featuring horse-drawn carriages and figures in winter attire against a snowy street scene.',
    'Dancer Looking at the Sole of Her Right Foot (Danseuse regardant la plante de son pied droit) - Edgar Degas.jpg': 'A bronze sculpture capturing the grace and flexibility of a dancer examining the sole of her right foot, highlighting Edgar Degas\' interest in the motion and anatomy of dancers.',
    'Cliffs near Dieppe - Claude Monet.jpeg': 'An impressionist depiction of the cliffs near Dieppe, showcasing Monet\'s signature brushwork to capture the light and natural beauty of the landscape.',
    'By the River - Edward W. Redfield.jpg': 'An impressionist landscape showing a frozen river with surrounding trees and vegetation, bathed in the soft light of winter.',
    'Birches - Paula Modersohn-Becker.jpg': 'A painting featuring a group of birch trees against a darkening sky, using expressive brushstrokes and earthy colors to evoke a sense of solitude.',
    'Beach at Trouville (La Plage de Trouville) - Eugène Louis Boudin.jpeg': 'A 19th-century beach scene with elegantly dressed figures under parasols by the seaside, showcasing a typical leisure scene of the time.',
    'Bathers with Crab - Pierre-Auguste Renoir.jpg': 'An impressionistic painting of female bathers in a luminous landscape, with one figure reaching for a crab, rendered in Renoir\'s characteristic soft and dappled light.'
}

def filter_and_combine_descriptions(art_dict, selected_filenames):
    """
    Create a new dictionary from selected filenames and combine their descriptions.

    Args:
    art_dict (dict): Dictionary with filenames as keys and art descriptions as values.
    selected_filenames (list): Filenames of the artworks selected.

    Returns:
    str: A combined description of selected artworks.
    """
    selected_descriptions = [art_dict.get(filename, '') for filename in selected_filenames]
    combined_description = " ".join(selected_descriptions)
    combined_description = "You are a painter looking to combine the following elements into one cohesive painting " + combined_description
    return combined_description

def generate_image_with_dalle(description):
    """
    Use DALL-E to generate an image based on the description.

    Args:
    description (str): Description for DALL-E to use.

    Returns:
    str: URL of the generated image.
    """
    try:
        response = client.images.generate(model="dall-e-2",
        prompt=description,
        n=1,
        size="1024x1024")
        image_url = response.data[0].url
        print("Image generation successful")
        return image_url
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

@app.route("/generated-image", methods=['GET'])
def generate_image():
    file_path = './image_urls.txt'

    # Open the file and read lines into a list
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

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(port=5000, debug=True)