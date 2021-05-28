from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_jsonpify import jsonify

import sentiment_analyzer

app = Flask(__name__)
api = Api(app)
CORS(app)
classifier = sentiment_analyzer.generate_sentiment_model()

@app.route('/')
def greet():
    return jsonify({"text": "Welcome to Sentiment Analyze"})

@app.route("/sentiment-analysis/<path:sentence>")
def analyze_sentiment(sentence):
    try:
        result = sentiment_analyzer.get_sentiment(sentence, classifier)
        print(f"sentiment: {result}")
        return jsonify({"sentiment": result})
    except Exception as e:
        print(e)
        return jsonify({"result": "An error occured. Exception: " + e})

if __name__ == "__main__":
    app.run(port=5002)
