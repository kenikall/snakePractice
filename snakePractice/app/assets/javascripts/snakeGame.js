// constants
var COLS = 26, ROWS = 26;
// image IDs
EMPTY = 0, SNAKE = 1, FRUIT = 2;
// directions
var LEFT=0, UP=1, RIGHT=2, DOWN = 3;

var grid = {
  width:  null,
  height: null,
  _grid:  null,

  init: function (default, cols, rows){
    this.width = cols;
    this.rows  = rows;

    this._grid = [];

    for (var x=0 ; x < cols ; x++){
      this._grid.push([]);
      for (var y=0 ; y < rows ; y++){
        this._grid[x].push(default)
      }
    }


  },

  set: function (val, x, y){
    this.grid[x][y] = val;
  },

  get: function(x, y){
    return this._grid[x][y];
  }

}

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
    this._queue.unshift({x:x, y:y})
    this.last = this._queue[0];
  },

  remove: function(){
    return this._queue.pop();
  }
}

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
var canvas, ctx, keystate, frames;

function main(){
  canvas = document.createElement("canvas");
  canvas.width  = COLS*20;
  canvas.height = ROWS*20;
  ctx = canvas.getContext("2d");
  document.body.appendChild(canvas);

  frames = 0;
  keystate = {};
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
  frames++;
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
