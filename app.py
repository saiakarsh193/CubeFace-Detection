from flask import Flask, render_template, jsonify, request
import pickle
import sys
sys.path.insert(1, './PyCube-Solver/')
from cube import Cube
from solver import Solver

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
        lfaces = [[[faces[side * 9 + row * 3 + col] for col in range(3)] for row in range(3)] for side in range(6)]
        cb = Cube(faces=lfaces)
        sol = Solver(cb)
        sol.solveCube(optimize=True)
        nmoves = sol.getMoves(decorated=True).split("\n")
        moves = ""
        for move in nmoves:
            ind = move.find(":")
            moves += move[ind + 2:]
        message = {'moves': moves}
        return jsonify(message), 200

app.run(debug=True)