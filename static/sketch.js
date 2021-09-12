let p5cubeface = [];
let p5colormap = {'N': 'grey', 'G': 'green', 'O': 'orange', 'B': 'blue', 'R': 'red', 'Y': 'yellow', 'W': 'white'};

function setup()
{
    let cnv = createCanvas(300, 300);
    cnv.parent('p5holder');
    setCubeFace([['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']]);
}

function draw()
{
    background(211);
    stroke('black');
    strokeWeight(2);
    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 3;j ++)
        {
            fill(p5colormap[p5cubeface[i][j]]);
            square(75 + j * 50, 75 + i * 50, 50, 10);
        }
    }
}

function setCubeFace(face)
{
    p5cubeface = face;
}