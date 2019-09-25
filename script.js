
var gridArray = [
  [0,0,0,0,0,0,0,0],
  [0,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];

var startCoord = [];
var endCoord = [];
var openSet = [];
var closedSet = [];

init();
paint();
search();

function init(){
  for(var y = 0 ; y < gridArray.length ; y++){
    for(var x = 0 ; x < gridArray[0].length ; x++){
      if(gridArray[y][x] == 0){
        gridArray[y][x] = {};
        gridArray[y][x].f = 99999;
        gridArray[y][x].g = 99999;
        gridArray[y][x].h = 99999;
        gridArray[y][x].state = 0;
        gridArray[y][x].prev = null;
      }else if(gridArray[y][x] == 1){         //1 will represent start node
        gridArray[y][x] = {};
        gridArray[y][x].f = 0;
        gridArray[y][x].g = 0;
        gridArray[y][x].h = 0;
        gridArray[y][x].state = 1;
        gridArray[y][x].prev = null;
        startCoord = [x, y];
      }else if(gridArray[y][x] == 2){         //2 will represent end node
        
      }
    }
  }
}

function search(){
  //insert iteration of search algo here

  paint();
  window.setTimeout(function(){
    search();
  }, 500);
}

function paint(){

  const scale = 50;
  var c = document.getElementById('canvas');

  for(var y = 0 ; y < gridArray.length ; y++){
    for(var x = 0 ; x < gridArray[0].length ; x++){
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.rect(x * scale + 1, y * scale + 1, scale, scale);
      if(gridArray[y][x].state == 1){
        ctx.fillStyle = 'green';
      }else{
        ctx.fillStyle = 'white';
      }
      ctx.stroke();
      ctx.fill();
      console.log(x + y);
    }
  }
}
