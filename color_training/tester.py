from helper import getDataSet
import pickle

# cmap = ['green', 'orange', 'blue', 'red', 'white', 'yellow']

(features, labels) = getDataSet(731)

with open('colmodel.pkl', 'rb') as f:
    model = pickle.load(f)

print(model.score(features, labels) * 100, "%")