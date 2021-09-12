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
    getColors(imgData);
    // var link = document.getElementById('link');
    // link.setAttribute('download', 'cube_img.png');
    // link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
    // link.click();
});

function getColors(data)
{
    let s = Math.sqrt(data.length / 4);
    let a = s / 3;
    let colors = new Array(3).fill(0).map(() => new Array(3).fill('N'));
    let cmap = ['G', 'O', 'B', 'R', 'W', 'Y'];
    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 3;j ++)
        {
            let votes = new Array(6).fill(0);
            for(let k = (a * i);k < (a * i) + a;k ++)
            {
                for(let l = (a * j);l < (a * j) + a;l ++)
                {
                    let ind = k * s + l;
                    votes[classifyCol([data[4 * ind], data[4 * ind + 1], data[4 * ind + 2]])] ++;
                }
            }
            colors[i][j] = cmap[indexOfMax(votes)];
        }
    }
    console.log('FACES: ');
    console.log(colors[0]);
    console.log(colors[1]);
    console.log(colors[2]);
    return colors;
}

function classifyCol(col)
{
    // green, orange, blue, red, white, yellow
    let cdist = [[0, 255, 0], [255, 150, 0], [0, 0, 255], [255, 0, 0], [255, 255, 255], [255, 255, 0]];
    cdist = cdist.map((tcol) => Math.abs(tcol[0] - col[0]) + Math.abs(tcol[1] - col[1]) + Math.abs(tcol[2] - col[2]));
    return indexOfMin(cdist);
}

function indexOfMin(arr)
{
    var minVal = arr[0];
    var minIndex = 0;
    for (var i = 1; i < arr.length; i++)
    {
        if(arr[i] < minVal)
        {
            minVal = arr[i];
            minIndex = i;
        }
    }
    return minIndex;
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