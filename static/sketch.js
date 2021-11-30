let p5cubeface = [];
let p5colormap = {'N': 'grey', 'G': 'green', 'O': 'orange', 'B': 'blue', 'R': 'red', 'Y': 'yellow', 'W': 'white'};
let p5selColor = 0;
let p5pallete = ["G", "O", "B", "R", "W", "Y"];
let p5isStart = false;
let currentCubeFace = -1;

function setup()
{
    let cnv = createCanvas(430, 300);
    cnv.parent('p5holder');
    setCubeFace([['N', 'N', 'N'], ['N', 'N', 'N'], ['N', 'N', 'N']], false);
}

function draw()
{
    background(211);
    stroke('black');
    strokeWeight(2);

    if(p5isStart)
    {
        noFill();
        strokeWeight(4);
        rect(0, 0, 430, 300);
        strokeWeight(2);
    }

    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 3;j ++)
        {
            fill(p5colormap[p5cubeface[i][j]]);
            square(75 + j * 50, 75 + i * 50, 50, 10);
        }
    }

    for(let i = 0;i < 3;i ++)
    {
        for(let j = 0;j < 2;j ++)
        {
            fill(p5colormap[p5pallete[i * 2 + j]]);
            if(p5selColor == i * 2 + j)
                circle(350 + j * 50, 100 + i * 50, 50);
            else
                circle(350 + j * 50, 100 + i * 50, 40);
        }
    }
}

function setCubeFace(face, val)
{
    p5isStart = val;
    p5cubeface = face;
    if(val)
    {
        document.getElementById('add-face-btn').className = "btn btn-primary";
        currentCubeFace += 1;
        document.getElementById('add-face-btn').innerHTML = "Add Face " + currentCubeFace;
    }
}

function addCubeFace()
{
    p5isStart = false;
    document.getElementById('add-face-btn').className = "btn btn-primary disabled";
    if(currentCubeFace == 5)
    {
        document.getElementById('temp-1').remove();
        document.getElementById('temp-2').remove();
        document.getElementById('temp-3').remove();
    }
}

function mousePressed()
{
    if(!p5isStart)
        return;
    if(mouseX > 75 && mouseX < 75 + 150 && mouseY > 75 && mouseY < 75 + 150)
    {        
        let col = int((mouseX - 75) / 50);
        let row = int((mouseY - 75) / 50);
        p5cubeface[row][col] = p5pallete[p5selColor];
    }
    else if(mouseX > 325 && mouseX < 325 + 100 && mouseY > 75 && mouseY < 75 + 150)
    {        
        let col = int((mouseX - 325) / 50);
        let row = int((mouseY - 75) / 50);
        p5selColor = row * 2 + col;
    }
}