var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    rightKey = false, leftKey = false, downKey = false, upKey = false,
    counter = 0,
    randomX, randomY,
    candyAlive = false,
    keys = [rightKey, leftKey, upKey, downKey],
    xRows = [],
    yRows = [],
    prevX = [],
    prevY = [];

var player = {
    x: 7,
    y: 7,
    side: canvas.width/20,
    direction: 5,
    alive: true,
    tail: 1
};
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};
function update(){
    console.log("update");
    counter += 1;
    //moving the player
    if (rightKey && player.direction != 1)player.direction = 0;
    if (leftKey && player.direction != 0)player.direction = 1;
    if (upKey && player.direction != 3)player.direction = 2;
    if (downKey && player.direction != 2)player.direction = 3;
    //spawning the candy
    if(!candyAlive){
        randomX = Math.round(Math.random() * 19);
        randomY = Math.round(Math.random() * 19);
        //Making sure the candy doesn't spawn on the player
        for(var i = 0; i < player.tail; i++){
            while (randomX === prevX[i] && randomY === prevY[i]){
                randomX = Math.round(Math.random() * 19);
                randomY = Math.round(Math.random() * 19);
            }
        }
        candyAlive = true;
    }
    //if player eats the candy
    if(player.x === randomX && player.y === randomY){
        candyAlive = false;
        player.tail++;
    }

    for(var i = 0; i < player.tail; i++){
        if(player.x === prevX[i-1] && player.y === prevY[i-1]) player.alive = false;
    }
    //counter to make the player slower
    if(counter === 7){
        //Saving all previous positions
        prevX.insert(0, player.x);
        prevY.insert(0, player.y);
        //moving the player
        switch(player.direction){
        case 0:
            player.x += 1;
            break;
        case 1:
            player.x -= 1;
            break;
        case 2:
            player.y -= 1;
            break;
        case 3:
            player.y += 1;
            break;
        }
        counter = 0;
    }

    //GAME OVER
    if (player.x < 0  || player.x >= 20 || player.y >= 20 || player.y < 0) player.alive = false;
    draw();
    if(player.alive) requestAnimationFrame(update);
}
function draw() {
    //drawing everything
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "red";
    context.fillRect(randomX * canvas.width/20, randomY * canvas.width/20, player.side, player.side);
    for(var i = 0; i < player.tail; i++){
        context.fillStyle = "black";
        context.fillRect(prevX[i] * canvas.width/20, prevY[i] * canvas.width/20, player.side, player.side);
    }
}
function onKeyDown(event) {
    if (event.keyCode == 39) rightKey = true;
    else if (event.keyCode == 37) leftKey = true;
    if (event.keyCode == 38) upKey = true;
    else if (event.keyCode == 40) downKey = true;
}
function onKeyUp(event) {
    if (event.keyCode == 39) rightKey = false;
    else if (event.keyCode == 37) leftKey = false;
    if (event.keyCode == 38) upKey = false;
    else if (event.keyCode == 40) downKey = false;
}
update();
window.addEventListener("keydown", onKeyDown, false);
window.addEventListener("keyup", onKeyUp, false);
