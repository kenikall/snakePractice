// constants
var COLS=26, ROWS=26;
// image IDs
EMPTY=0, SNAKE=1, FRUIT=2;
// directions
var LEFT=0, UP=1, RIGHT=2, DOWN=3;
// keyCodes
var KEY_LEFT=37, KEY_UP=38, KEY_RIGHT=39, KEY_DOWN=40;

var grid = {
  width:  null,
  height: null,
  _grid:  null,

  init: function (d, cols, rows){
    this.width = cols;
    this.rows  = rows;

    this._grid = [];

    for (var x=0 ; x < cols ; x++){
      this._grid.push([]);
      for (var y=0 ; y < rows ; y++){
        this._grid[x].push(d);
      }
    }
  },

  set: function (val, x, y){
    this.grid[x][y] = val;
  },

  get: function(x, y){
    return this._grid[x][y];
  }
};

var snake = {
  direction: null,
  last:      null,
  _queue:    null,

  init: function(d, x, y){
    this.direction = d;
    this._queue = [];
    this.insert(x,y);
  },

  insert: function(x, y){
    this._queue.unshift({x:x, y:y});
    this.last = this._queue[0];
  },

  remove: function(){
    return this._queue.pop();
  }
};

function setFood(){
  var empty = [];
  for (var x=0 ; x<grid.width ; x++){
    for (var y=0; y<grid.height; y++){
      if (grid.get(x,y) === EMPTY){
        empty.push({x:x, y:y});
      }
    }
  }
  var randpos = empty[Math.floor(Math.random()*empty.length)];
  grid.set(FRUIT, randpos.x, randpos.y);
}

//Game objects
var canvas, ctx, keystate, framed;

function main(){
  console.log("running main");
  canvas = document.createElement("canvas");
  canvas.width  = COLS*20;
  canvas.height = ROWS*20;
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  framed = 0;
  keystate = {};
  document.addEventListener("keydown", function(event){
    if (event.defaultPrevented) {
    return;
    }
    console.log("key was pressed");
    switch (event.key) {
      case "ArrowDown":
        console.log("Down");
        keystate[event.keyCode] = true;
        break;
      case "ArrowUp":
        console.log("Up");
        keystate[event.keyCode] = true;
        break;
      case "ArrowLeft":
        console.log("Left");
        keystate[event.keyCode] = true;
        break;
      case "ArrowRight":
        console.log("Right");
        keystate[event.keyCode] = true;
        break;
      default:
        return;
      }
      event.preventDefault();
  }, true);

  document.addEventListener("keyup", function(event){
    delete keystate[event.keyCode];
  });

  init();
  loop();

}

function init(){
  grid.init(EMPTY, COLs, ROWS);

  var snakePosition = {x:Math.floor(COLS/2), y:ROWS-1};
  snake.init(UP, snakePosition.x, snakePosition.y);
  grid.set(SNAKE, snakePosition.x, snakePosition.y);
}

function loop() {
  update();
  draw();

  window.requestAnimationFrame(loop, canvas);
}


function update() {
  framed++;

  if (keystate[KEY_LEFT]) snake.direction = LEFT;
  if (keystate[KEY_UP]) snake.direction = UP;
  if (keystate[KEY_RIGHT]) snake.direction = RIGHT;
  if (keystate[KEY_DOWN]) snake.direction = DOWN;

  if (framed%5 === 0){
    var newx = snake.last.x;
    var newy = snake.last.y;

    switch (snake.direction){
      case LEFT:
        newx--;
        break;
      case UP:
        newy--;
        break;
      case RIGHT:
        newx++;
        break;
      case DOWN:
        newy++;
        break;
    }

    if (0 > newx || newx > grid.width-1 ||
        0 > newy || newy > grid.height-1){
      return init();
    }
    var tail = snake.remove();
    grid.set(EMPTY, tail.x, tail.y);
    tail.x = newx;
    tail.y = newy;
    grid.set(SNAKE, tail.x, tail.y);

    snake.insert(tail.x,tail.y);
  }
}

function draw(){
  var twidth  = canvas.width/grid.width;
  var theight = canvas.height/grid.height;

  for (var x=0 ; x<grid.width ; x++){
    for (var y=0; y<grid.height; y++){
      switch (grid.get(x,y)){
        case EMPTY:
          ctx.fillStyle = "#fff";
          break;
        case SNAKE:
          ctx.fillStyle = "#0ff";
          break;
        case FRUIT:
          ctx.fillStyle = "#f00";
          break;
      }
      ctx.fillRect(z*twidth, y*theight, twidth, theight);
    }
  }
}
