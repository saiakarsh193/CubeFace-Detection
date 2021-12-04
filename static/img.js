function processImage(img)
{
    let results = getColors(img);
    setCubeFace(results, true);
}

function getColors(data)
{
    let s = Math.sqrt(data.length / 4);
    let a = s / 3;
    let stride = int(a / 10);
    let cols = new Array(3).fill(0).map(() => new Array(3).fill("N"));
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
                    ndata.push(classifyHSI(RGBtoHSI(tmp[0], tmp[1], tmp[2])));
                }
            }
            let votes = new Array(6).fill(0);
            let cmap = ['G', 'O', 'B', 'R', 'W', 'Y'];
            for(let k = 0;k < ndata.length;k ++)
                votes[ndata[k]] ++;
            cols[i][j] = cmap[argMax(votes)];
        }
    }
    return cols;
}

function argMax(arr)
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

function classifyHSI(col)
{
    let hue = col[0];
    let sat = col[1];
    let inten = col[2];
    // g = 0, o = 1, b = 2, r = 3, w = 4, y = 5
    if(sat < 0.1)
        return 4;
    if(hue >= 0 && hue < 15)
        return 3;
    if(hue >= 15 && hue < 35)
        return 1;
    if(hue >= 35 && hue < 90)
        return 5;
    if(hue >= 90 && hue < 180)
        return 0;
    if(hue >= 180 && hue < 270)
        return 2;
    if(hue >= 300 && hue < 360)
        return 3;
    return 4;
}

function RGBtoHSI(R, G, B)
{
    let r = R / (R + G + B);
    let g = G / (R + G + B);
    let b = B / (R + G + B);
    let num = 0.5 * (r - g + r - b)
    let denm = Math.sqrt(Math.pow(r - g, 2) + (r - b) * (g - b));
    let the = Math.acos(num / denm) * (180 / Math.PI);
    let hue = the;
    if(b > g)
        hue = 360 - the;
    let sat = 1 - 3 * min(r, g, b);
    let inten = (R + G + B) / (3 * 255);
    return [hue, sat, inten];
}