let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext('2d');

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
});

click_button.addEventListener('click', function() {
    ctx.drawImage(video, 60 * 2, 20 * 2, 200 * 2, 200 * 2, 0, 0, canvas.width, canvas.height);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    getColors(imgData)
    .then((results) =>{
        console.log('OUTPUT:');
        console.log(results[0]);
        console.log(results[1]);
        console.log(results[2]);
    });
});

async function getColors(data)
{
    let s = Math.sqrt(data.length / 4);
    let a = s / 3;
    let colors = new Array(3).fill(0).map(() => new Array(3).fill('N'));
    let cmap = ['G', 'O', 'B', 'R', 'W', 'Y'];
    let promises = [];
    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 3;j ++)
        {
            let ndata = [];
            for(let k = (a * i);k < (a * i) + a;k ++)
            {
                for(let l = (a * j);l < (a * j) + a;l ++)
                {
                    let ind = k * s + l;
                    ndata.push(normalDist([data[4 * ind], data[4 * ind + 1], data[4 * ind + 2]]));
                }
            }
            promises.push(
                postData('/test', {'data': ndata})
                .then(data =>
                {
                    return data['color'];
                })
                .then(result => 
                {
                    let votes = new Array(6).fill(0);
                        for(let k = 0;k < result.length;k ++)
                            votes[result[k]] ++;
                    return indexOfMax(votes);
                })
                .then(ind =>
                {
                    colors[i][j] = cmap[ind];
                })
            );
        }
    }
    return Promise.all(promises).then(() => {return colors});
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