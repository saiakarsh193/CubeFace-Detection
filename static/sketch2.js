let cx, cy;
let cb;
let sol;
let lmoves = [];
let curmove = 0;
let ttwidth = 0;

function setup()
{
    createCanvas(1200, 680);
    frameRate(40);

    cx = width / 2;
    cy = height / 2;

    let rawfac = location.search.substring(1).split("=")[1];
    document.getElementById('txcube').innerHTML = "Cube orientation : " + rawfac;

    cb = new Cube();
    for(let side = 0;side < 6;side ++)
    {
        for(let row = 0;row < 3; row ++)
        {
            for(let col = 0;col < 3; col ++)
                cb.cube[side][row][col] = rawfac[side * 9 + row * 3 + col];
        }
    }

    postData('/solve', {'faces': rawfac})
        .then(data =>
        {
            return data['moves'];
        })
        .then(moves =>
        {
            document.getElementById('txmoves').innerHTML = "Moves to solve the cube : " + moves;
            cb.addMoves(moves);
            ttwidth = textWidth(moves) / 2;
            let val = "";
            let cnt = 0;
            for(let i = 0;i < moves.length;i ++)
            {
                if(moves[i].toLowerCase() != moves[i].toUpperCase() && moves[i] != 'w')
                {
                    if(val.length > 0)
                        lmoves.push([val, cnt]);
                    val = moves[i];
                    cnt = 1;
                }
                else
                {
                    if(moves[i] == '2')
                        cnt = 2;
                    val += moves[i];
                }
            }
            lmoves.push([val, cnt]);
        });
}

function draw()
{
    background(200);
    translate(cx, cy);
    cb.draw();
    drawText(-ttwidth, 230, lmoves);
    if(frameCount % 10 == 0 && lmoves.length > 0 && curmove < lmoves.length)
    {
        cb.update();
        lmoves[curmove][1] --;
        if(lmoves[curmove][1] == 0)
            curmove ++;
    }
}

function drawText(x, y, text_array)
{
    strokeWeight(0);
    textSize(20);
    textAlign(LEFT);
    textFont('Georgia');
    let curx = x;
    for(let i = 0;i < text_array.length;i ++)
    {
        if(i == curmove)
            fill(255, 0, 0);
        else
            fill(0);
        text(text_array[i][0], curx, y);
        curx += textWidth(text_array[i][0]);
    }
}