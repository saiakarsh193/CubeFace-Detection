let cx, cy;
let cb;
let sol;

function setup()
{
    createCanvas(1200, 680);

    cx = width / 2;
    cy = height / 2;

    let rawfac = location.search.substring(1).split("=")[1];

    cb = new Cube();
    for(let side = 0;side < 6;side ++)
    {
        for(let row = 0;row < 3; row ++)
        {
            for(let col = 0;col < 3; col ++)
                cb.cube[side][row][col] = rawfac[side * 9 + row * 3 + col];
        }
    }
}

function draw()
{
    background(200);
    translate(cx, cy);
    cb.draw();
}