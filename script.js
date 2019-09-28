
var height = 10;
var width = 12;
var startCoord = [2,9];
var endCoord = [2,1];
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
        newNode.visited = true;
        openSet.push(newNode);
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
  var currNode = openSet.shift();
  closedSet.push(currNode);
  debugger;
  grid[currNode.coord[1]][currNode.coord[0]].visited = true;

  //check if node is on edge of grid
  if(currNode.coord[1] > 0){            //check top
    var top = grid[currNode.coord[1] - 1][currNode.coord[0]];
    checkNode(currNode, top);
  }

  if(currNode.coord[1] < height - 1){   //check bottom
    var bot = grid[currNode.coord[1] + 1][currNode.coord[0]];
    checkNode(currNode, bot);
  }

  if(currNode.coord[0] > 0){            //check left
    var left = grid[currNode.coord[1]][currNode.coord[0] - 1];
    checkNode(currNode, left);
  }

  if(currNode.coord[0] < width - 1){    //check right
    var right = grid[currNode.coord[1]][currNode.coord[0] + 1];
    checkNode(currNode, right);
  }


  paint();
  window.setTimeout(function(){
    //continue if openset is not empty
    if(openSet.length > 0){
      search();
    }
  }, 500);
}

function checkNode(currNode, neighborNode){
  if(!openSet.includes(neighborNode)){
    //If not traversed yet, set parent to currNode, calculate f, & add to openSet
    neighborNode.parent = currNode;
    neighborNode.g += currNode.g;
    neighborNode.f = neighborNode.g + neighborNode.h;
    pushBubble(neighborNode);
  }else{
    if(neighborNode.g > currNode.g + 1){
      //If already traversed but current g value is lower, reparent & recalculate f
      neighborNode.parent = currNode;
      neighborNode.g = currNode.g + 1;
      neighborNode.f = neighborNode.g + neighborNode.h;
    }
  }
}

//helper function, inserts & bubblesorts new element into openSet based on f(n)
function pushBubble(node){
  openSet.push(node);
  for(var i = openSet.length - 2 ; i > 0 ; i--){
    if(openSet[i + 1].f < openSet[i].f){
      //swap
      var temp = openSet[i];
      openSet[i] = openSet[i + 1];
      openSet[i + 1] = temp;
    }else{
      break;
    }
  }
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
