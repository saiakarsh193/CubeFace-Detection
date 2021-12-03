# CubeFace Detection  
## Sai Akarsh (12-09-21)  

### Description  
CubeFace Detection takes in an image of a rubik's cube face and extracts the constituent colors from that face image. I have combined my [Rubik's cube solving code](https://github.com/saiakarsh193/PyCube-Solver) to build an end-to-end system which scans your cube and gives you the moves. You need to scan all the six faces from index 0 to 5 based on the printing orientation used for solving.  

This version is built on top of the older system (which used linear distance for classification). This version uses a self trained SVM classifier from the sklearn toolkit to classify the face data. Using a powerful multifeature classifier to do this over a linear distance classifier drastically improved the accuracy of the classification.  

To use a python model inside javascript, the entire project has been shifted to python flask. This enables the api end point inside flask to be accessed by the js function. This version using async function to hold the promise and combines all the promises to get the output.  

Accuracy of classification = 93%  

### Running the Code  
Start the flask server using `python api.py`.  
Then go to localhost (which is usually `https://127.0.0.1:5000`) to run the `index.html` file.  

Then follow the instructions and scan all the six faces.  
Then it relocates to the solver page and prints the moves required to solve the cube.  

**Note: If the faces were scanned incorrectly and hence results in an invalid cube orientation, an error will be given.**  