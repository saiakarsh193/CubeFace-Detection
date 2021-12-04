# CubeFace Detection  
## Sai Akarsh (12-09-21)  

### Description  
CubeFace Detection takes in an image of a Rubik's Cube face and extracts the constituent colors from that face image. I have combined my [Rubik's cube solving code](https://github.com/saiakarsh193/PyCube-Solver) to build an end-to-end system which scans your cube and gives you the moves to solve it. You need to scan all the six faces from index 0 to 5 based on the printing orientation used for solving. As long as the faces we scan are relatively oriented correctly, this will work.  

### Running the Code  
To clone,
```
git clone --recursive https://github.com/saiakarsh193/CubeFace-Detection.git
cd CubeFace-Detection
```
  
To start the flask server,
```
python app.py
```

Then go to localhost (which is usually `https://127.0.0.1:5000`) to run the `index.html` file.  

Then follow the instructions and scan all the six faces.  
Then it relocates to the solver page and prints the moves required to solve the cube.  

**Note: If the faces were scanned incorrectly and hence results in an invalid cube orientation, an error will be given.**  

### How does it work?  
Simple. Changing the color space. Thats as simple as it can get for solving this problem. The image we get is originally in RGB space which we convert to HSV/HSI color space. This is done due to the fact that this color space is much more suitable for tackling brightness and lighting issues. Another amazing feature of this color space is that we just need to use the hue value to classify (except for white), rather than all the three values like in RGB space. So by simply writing conditional statements on the hue level (and saturation to classify white), we can classify all the colors very easily.  

The original implementation involved using classifiers like SVM on the distance data for each pixel with respect to all the target colors. This works but is rather inefficient and complex. The accuracy of this model is also much less than that of the current simpler implementation.  
