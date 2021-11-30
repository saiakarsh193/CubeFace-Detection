from flask import Flask, render_template, jsonify, request
import pickle
from stringsolver import stringmoves

app = Flask(__name__)

with open('./color_training/colmodel.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/cubefaces')
def cube_page():
    return render_template('cubefaces.html')
    
@app.route('/classify', methods=['POST'])
def classifier():
    if request.method == 'POST':
        odata = request.get_json()['data']
        colors = []
        for data in odata:
            colors.append(model.predict(data).tolist())
        message = {'colors': colors}
        return jsonify(message), 200

@app.route('/solve', methods=['POST'])
def solvecube():
    if request.method == 'POST':
        faces = request.get_json()['faces']
        moves  = stringmoves(faces)
        message = {'moves': moves}
        return jsonify(message), 200

app.run(debug=True)