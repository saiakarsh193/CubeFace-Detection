from flask import Flask, render_template, jsonify, request
import pickle

app = Flask(__name__)

with open('./color_training/colmodel.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home_page():
    return render_template('index.html')
    
@app.route('/classify', methods=['POST'])
def classifier():
    if request.method == 'POST':
        odata = request.get_json()['data']
        colors = []
        for data in odata:
            colors.append(model.predict(data).tolist())
        message = {'colors': colors}
        return jsonify(message), 200

app.run(debug=True)