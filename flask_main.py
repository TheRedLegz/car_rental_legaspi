from flask import Flask
from nltk import Tree
from nltk.corpus.reader import childes
from flask_restful import Api
from flask_cors import CORS
from flask_jsonpify import jsonify

import sentiment_analyzer
import chunking_legaspi

from chunking_legaspi import GrammarParse

app = Flask(__name__)
api = Api(app)
CORS(app)
classifier = sentiment_analyzer.generate_sentiment_model()
parser = GrammarParse()

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
        return jsonify({"sentiment": "An error occured. Exception: " + e})

@app.route("/chunking/np/<path:sentence>")
def np_chunking(sentence):
    print("Test")
    try:
        result = parser.regExParse("NP", "(\w*/DT)? ?(\w*/JJ)* ?(\w*/NN)", sentence)
        print(f"result: {result}")
        # tr = Tree.fromstring(result)
        return jsonify({"result": result})
    except Exception as e:
        print(e)
        return jsonify({"result": "An error occured. Exception: " + e})

if __name__ == "__main__":
    app.run(port=5002)
