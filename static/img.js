function processImage(img)
{
    getColors(img)
    .then((sresults) =>{
        let results = new Array(3).fill(0).map(() => new Array(3).fill(0));
        for(let i = 0;i < 3;i ++)
        {
            for(let j = 0;j < 3;j ++)
                results[i][j] = sresults[i * 3 + j];
        }
        console.log('OUTPUT:');
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
        setCubeFace(results);
    });
}

async function getColors(data)
{
    let s = Math.sqrt(data.length / 4);
    let a = s / 3;
    let odata = [];
    let stride = int(a / 10);
    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 3;j ++)
        {
            let ndata = [];
            for(let k = (a * i);k < (a * i) + a;k += stride)
            {
                for(let l = (a * j);l < (a * j) + a;l += stride)
                {
                    let tmp = [0, 0, 0];
                    for(let q = k; q < k + stride;q ++)
                    {
                        for(let w = l; w < l + stride;w ++)
                        {
                            let ind = k * s + l;
                            tmp[0] += data[4 * ind + 0]
                            tmp[1] += data[4 * ind + 1]
                            tmp[2] += data[4 * ind + 2]
                        }
                    }
                    tmp[0] /= stride * stride;
                    tmp[1] /= stride * stride;
                    tmp[2] /= stride * stride;
                    ndata.push(normalDist(tmp));
                }
            }
            odata.push(ndata);
        }
    }
    return postData('/classify', {'data': odata})
            .then(data =>
            {
                return data['colors'];
            })
            .then(result => 
            {
                let cols = [];
                let cmap = ['G', 'O', 'B', 'R', 'W', 'Y'];
                for(let i = 0;i < result.length;i ++)
                {
                    let votes = new Array(6).fill(0);
                    for(let k = 0;k < result[i].length;k ++)
                        votes[result[i][k]] ++;
                    cols.push(cmap[indexOfMax(votes)]);
                }
                return cols;
            });
}

function normalDist(col)
{
    let cdist = [[0, 255, 0], [255, 150, 0], [0, 0, 255], [255, 0, 0], [255, 255, 255], [255, 255, 0]];
    cdist = cdist.map((tcol) => Math.abs(tcol[0] - col[0]) + Math.abs(tcol[1] - col[1]) + Math.abs(tcol[2] - col[2]));
    return normalize(cdist);
}

function normalize(arr)
{
    let ma = Math.max(...arr);
    return arr.map((x) => x / ma);
}

function indexOfMax(arr)
{
    var maxVal = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++)
    {
        if(arr[i] > maxVal)
        {
            maxVal = arr[i];
            maxIndex = i;
        }
    }
    return maxIndex;
}