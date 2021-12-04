from flask import Flask, render_template, jsonify, request
from stringsolver import stringmoves

app = Flask(__name__)

@app.route('/')
def home_page():
    return render_template('index.html')

@app.route('/cubefaces')
def cube_page():
    return render_template('cubefaces.html')

@app.route('/solve', methods=['POST'])
def solvecube():
    if request.method == 'POST':
        faces = request.get_json()['faces']
        moves  = stringmoves(faces)
        message = {'moves': moves}
        return jsonify(message), 200

app.run(debug=True)