# CubeFace Detection  
## Sai Akarsh (12-09-21)  

### Description  
CubeFace Detection takes in an image of a rubik's cube face and extracts the constituent colors from that face image. This is useful for automating user input in cube solvers. The program gives a raw character array as output and hence can be used for variety of projects. It also draws the extracted face using P5JS library for better visualization.  

This version is built on top of the older system (which used linear distance for classification). This version uses a self trained SVM classifier from the sklearn toolkit to classify the face data. Using a powerful multifeature classifier to do this over a linear distance classifier drastically improved the accuracy of the classification.  

To use a python model inside javascript, the entire project has been shifted to python flask. This enables the api end point inside flask to be accessed by the js function. This version using async function to hold the promise and combines all the promises to get the output.  

Accuracy of classification = 93%  

### Running the Code  
To start the flask server using `python api.py` (whichever python version you are using).  
Then go to localhost (which is usually `https://127.0.0.1:5000`) to run the `index.html` file.  
