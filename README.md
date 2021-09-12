# CubeFace Classifier

## Made by Sai Akarsh (12-09-21)

### Description

This version is built on top of the older version which used a primitive linear distance classifier. This version uses a self trained SVM classifier from the sklearn toolkit to classify the faces. Using a powerful classifier drastically improved the accuracy of the classification.

To use a python model inside javascript, the entire project has been shifted to python flask. This enables the api end point inside flask to be accessed by the exisiting function. This version using async function to hold the promise and combines all the promises to get the output.

Accuracy of classification = 93%

### Running the Code

To start the flask server: `python api.py`

Then go to the host which is usually `https://127.0.0.1:5000` to access the `index.html` file.
