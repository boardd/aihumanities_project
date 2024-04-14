# backend.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Hello, World!"

# Members API Route
@app.route("/members")
def members():
    return {"members": ["Member1", "Member2", "Member3"]}

if __name__ == '__main__':
    app.run(port=5000, debug=True)