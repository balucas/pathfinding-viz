
const height = 14;
const width = 25;
var startCoord = [6,6];
var endCoord = [19,13];

const scale = 50;
const weight = 1.01;
const stepCost = 1.0;

var openSet = [];
var closedSet = [];

var grid = [];
initGrid();
paint();

function start(){
  preprocessGrid();
  search();
}

var mousedown = false;
var dragNode = '';
var el = document.getElementById('canvas');

el.addEventListener('mousedown',
  function(event){
    var x = Math.floor(event.offsetX/scale);
    var y = Math.floor(event.offsetY/scale);
    nodeClicked(x,y);
    mousedown = true;
  },
  false
);

el.addEventListener('mousemove',
  function(event){
    if(mousedown){
      var x = Math.floor(event.offsetX/scale);
      var y = Math.floor(event.offsetY/scale);
      nodeClicked(x,y);
    }
  },
  false
);

el.addEventListener('mouseup',
  function(event){
    mousedown = false;
    dragNode = '';
  })

function nodeClicked(x, y){
    var curr = grid[y][x];
    var update = false;
    if(curr.state == 'empty' && (dragNode == '' || dragNode == 'wall')){
      grid[y][x] = initNode('wall', x, y);
      dragNode = 'wall';
      paint();
    }else if(curr.state == 'wall' && (dragNode == '' || dragNode == 'empty')){
      grid[y][x] = initNode('empty', x, y);
      dragNode = 'empty';
      paint();
    }else if((curr.state == 'start' && dragNode == '') || (dragNode == 'start' && curr.state != 'end' && curr.state != 'wall')){
      if(startCoord[0] != x || startCoord[1] != y){
        grid[startCoord[1]][startCoord[0]] = initNode('empty', startCoord[0], startCoord[1]);
        grid[y][x] = initNode('start', x, y);
        paint();
      }
      dragNode = 'start';
    }else if((curr.state == 'end' && dragNode == '') || (dragNode == 'end' && curr.state != 'start' && curr.state != 'wall')){
      if(endCoord[0] != x || endCoord[1] != y){
        grid[endCoord[1]][endCoord[0]] = initNode('empty', endCoord[0], endCoord[1]);
        grid[y][x] = initNode('end', x, y);
        paint();
      }
      dragNode = 'end';
    }
}

function initNode(type, x, y){
  var newNode = {};
  if(type == 'wall'){
    newNode.coord = [x, y];
    newNode.state = 'wall';
    newNode.parent = null;
  }else if(type == 'empty'){
    newNode.coord = [x,y];
    newNode.state = 'empty';
    newNode.parent = null;
  }else if(type == 'start'){
    newNode.coord = [x, y];
    startCoord = [x, y];
    newNode.state = 'start';
    newNode.parent = null;
  }else if(type == 'end'){
    newNode.coord = [x, y];
    endCoord = [x, y];
    newNode.state = 'end';
    newNode.parent = null;
  }

  return newNode;
}

function preprocessGrid(){
  for(var y = 0 ; y < height ; y++){
    for(var x = 0 ; x < width ; x++){
      if(grid[y][x].state == 'empty'){
        grid[y][x].g = stepCost;
        grid[y][x].h = Math.abs(x - endCoord[0]) + Math.abs(y - endCoord[1]) * weight;  //Calculate Manhattan distance
        grid[y][x].f = grid[y][x].g + grid[y][x].h;
      }else if(grid[y][x].state == 'end'){
        grid[y][x].g = stepCost;
        grid[y][x].h = 0;
        grid[y][x].f = grid[y][x].g + grid[y][x].h;
      }else if(grid[y][x].state == 'start'){
        grid[y][x].g = 0;
        grid[y][x].h = Math.abs(x - endCoord[0]) + Math.abs(y - endCoord[1]) * weight;  //Calculate Manhattan distance
        grid[y][x].f = grid[y][x].g + grid[y][x].h;
        openSet.push(grid[y][x]);
      }else if(grid[y][x].state == 'wall'){
        grid[y][x].g = null;
        grid[y][x].h = null;
        grid[y][x].f = null;
      }
    }
  }
}

function initGrid(){
  for(var y = 0 ; y < height ; y++){
    var newRow = [];
    for(var x = 0 ; x < width ; x++){
      var newNode = {};
      if(x == startCoord[0] && y == startCoord[1]){
        newNode = initNode('start', x, y);
      }else if(x == endCoord[0] && y == endCoord[1]){
        newNode = initNode('end', x, y);
      }else{
        newNode = initNode('empty', x, y);
      }
      newRow.push(newNode);
    }
    grid.push(newRow);
  }
}

function search(){
  //insert iteration of search algo here
  var currNode = openSet.shift();

  //if endNode reached, backtrack
  if(currNode.h == 0){
    while(currNode.parent != null){
      currNode = currNode.parent;
      if(currNode.state != 'start'){
        currNode.state = 'path';
      }
    }
    debugger;
    paint();
    return null;
  }


  //check neighbor nodes is on edge of grid
  if(currNode.coord[1] > 0){            //check top
    var top = grid[currNode.coord[1] - 1][currNode.coord[0]];
    if(top.state != 'wall'){
      checkNode(currNode, top);
    }
  }

  if(currNode.coord[1] < height - 1){   //check bottom
    var bot = grid[currNode.coord[1] + 1][currNode.coord[0]];
    if(bot.state != 'wall'){
      checkNode(currNode, bot);
    }
  }

  if(currNode.coord[0] > 0){            //check left
    var left = grid[currNode.coord[1]][currNode.coord[0] - 1];
    if(left.state != 'wall'){
      checkNode(currNode, left);
    }
  }

  if(currNode.coord[0] < width - 1){    //check right
    var right = grid[currNode.coord[1]][currNode.coord[0] + 1];
    if(right.state != 'wall'){
      checkNode(currNode, right);
    }
  }

  closedSet.push(currNode);
  if(currNode.state != 'start' && currNode.state != 'end'){
    grid[currNode.coord[1]][currNode.coord[0]].state = 'visited';
  }

  paint();
  window.setTimeout(function(){
    //continue if openset is not empty
    if(openSet.length > 0){
      search();
    }
  }, 50);
}

function checkNode(currNode, neighborNode){
  if(!openSet.includes(neighborNode) && !closedSet.includes(neighborNode)){
    //If not traversed yet, set parent to currNode, calculate f, & add to openSet
    neighborNode.parent = currNode;
    neighborNode.g += currNode.g;
    neighborNode.f = neighborNode.g + neighborNode.h;
    pushBubble(neighborNode);
  }else{
    if(neighborNode.g > currNode.g + stepCost){
      //If already traversed but current g value is lower, reparent & recalculate f
      neighborNode.parent = currNode;
      neighborNode.g = currNode.g + stepCost;
      neighborNode.f = neighborNode.g + neighborNode.h;
    }else if(neighborNode.g < currNode.g + stepCost){
      currNode.parent = neighborNode;
      currNode.g = neighborNode.g + stepCost;
      currNode.f = currNode.g + currNode.h;
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

  var c = document.getElementById('canvas');

  for(var y = 0 ; y < grid.length ; y++){
    for(var x = 0 ; x < grid[0].length ; x++){
      var ctx = c.getContext("2d");
      ctx.beginPath();
      ctx.rect(x * scale + 1, y * scale + 1, scale, scale);
      if(grid[y][x].state == 'start'){
        ctx.fillStyle = 'rgb(0, 0, 255)';
      }else if(grid[y][x].state == 'end'){
        ctx.fillStyle = 'red';
      }else if(grid[y][x].state == 'visited'){
        ctx.fillStyle = 'rgb(0, 255, 255)';
      }else if(grid[y][x].state == 'path'){
        ctx.fillStyle = 'rgb(0, 255, 0)';
      }else if(grid[y][x].state == 'wall'){
        ctx.fillStyle = 'rgb(50, 50, 50)';
      }else{
        ctx.fillStyle = 'white';
      }
      ctx.stroke();
      ctx.fill();
      console.log(x + y);
    }
  }
}
