
var height = 10;
var width = 12;
var startCoord = [2,3];
var endCoord = [9,9];
var openSet = [];
var closedSet = [];

var grid = [];
init();
paint();
search();

function init(){
  for(var y = 0 ; y < height ; y++){
    var newRow = [];
    for(var x = 0 ; x < width ; x++){
      var newNode = {};
      if(x == startCoord[0] && y == startCoord[1]){
        newNode.g = 0;                                                      //Start node has 0 cost
        newNode.h = Math.abs(x - endCoord[0]) + Math.abs(y - endCoord[1]);  //Calculate Manhattan distance
        newNode.f = newNode.g + newNode.h;                                  //Total f(n)
        newNode.coord = [x,y];
        newNode.visited = false;
      }else if(x == endCoord[0] && y == endCoord[1]){
        newNode.g = 1;
        newNode.h = 0;                                                      //End node has 0 h(n)
        newNode.f = newNode.g + newNode.h;                                  //Total f(n)
        newNode.coord = [x,y];
        newNode.visited = false;
      }else{
        newNode.g = 1;
        newNode.h = Math.abs(x - endCoord[0]) + Math.abs(y - endCoord[1]);  //Calculate Manhattan distance
        newNode.f = newNode.g + newNode.h;                                  //Total f(n)
        newNode.coord = [x,y];
        newNode.visited = false;
      }
      newRow.push(newNode);
    }
    grid.push(newRow);
  }
}

function search(){
  //insert iteration of search algo here
  var newSet = [];

  debugger;

  paint();
  window.setTimeout(function(){
    search();
  }, 500);
}

function paint(){

  const scale = 50;
  var c = document.getElementById('canvas');

  for(var y = 0 ; y < grid.length ; y++){
    for(var x = 0 ; x < grid[0].length ; x++){
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.rect(x * scale + 1, y * scale + 1, scale, scale);
      if(x == startCoord[0] && y == startCoord[1]){
        ctx.fillStyle = 'green';
      }else if(x == endCoord[0] && y == endCoord[1]){
        ctx.fillStyle = 'red';
      }else if(grid[y][x].visited){
        ctx.fillStyle = 'orange'
      }else{
        ctx.fillStyle = 'white';
      }
      ctx.stroke();
      ctx.fill();
      console.log(x + y);
    }
  }
}
