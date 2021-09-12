from helper import getDataSet
from sklearn import svm
import pickle

(features, labels) = getDataSet(1000)

model = svm.SVC()
model.fit(features, labels)

with open('colmodel.pkl', 'wb') as f:
    pickle.dump(model, f)