from flask import Flask, render_template, jsonify, request
import pickle

app = Flask(__name__)

with open('./color_training/colmodel.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/')
def home_page():
    example_embed='This string is from python'
    return render_template('index.html', embed=example_embed)
    
@app.route('/test', methods=['POST'])
def testfn():
    # POST request
    if request.method == 'POST':
        # print(request.get_json())  # parse as JSON
        data = request.get_json()['data']
        colordata = model.predict(data).tolist()
        message = {'color': colordata}
        return jsonify(message), 200  # serialize and use JSON headers

app.run(debug=True)