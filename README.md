# CubeFace Classifier
## Made by Sai Akarsh (12-09-21)
This version is built on top of the old version. Rather than using a primitive classifier, this version uses a self trained SVM classifier from the sklearn toolkit to classify the faces. For js to use a python module, the entire project has been shifted to python flask. This enables the api end point inside flask to be accessed by the exisiting function. This version using async function to hold the promise and combines all the promises to get the output.

### Run
`python api.py`
This starts the flask server.
Then go to host which is usually `https://127.0.0.1:5000` to access the `index.html` file.
