The datasets were created by using the older version images and then converting them to normalized distance values. This is then stored under a labeled json file for identification. Each json file has (300 * 300) 90,000 vectors, each with 6 features.

`helper.py` has functions written to parse the json datasets into a feature-label vector set which can be then used to train the SVM classifier from the sklearn library.

Pickle is used to store the model, which can them be used again by the api end point in the flask app.

See `trainer.py` and `tester.py` to see how to train your own datasets and to get the accuracy of your model.