import json

def loadJSON(path):
    with open(path, 'r') as f:
        val = json.load(f)
    return val

def getDataSet(ecount = 10):
    totaldata = []
    step = int((300 * 300) / ecount)
    totaldata.append(loadJSON('datasets/green.json')['data'][::step])
    totaldata.append(loadJSON('datasets/orange.json')['data'][::step])
    totaldata.append(loadJSON('datasets/blue.json')['data'][::step])
    totaldata.append(loadJSON('datasets/red.json')['data'][::step])
    totaldata.append(loadJSON('datasets/white.json')['data'][::step])
    totaldata.append(loadJSON('datasets/yellow.json')['data'][::step])
    mixdata = []
    labels = []
    for i in range(ecount):
        for c in range(6):
            mixdata.append(totaldata[c][i])
            labels.append(c)
    return (mixdata, labels)
