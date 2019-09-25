
var gridArray = [
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],
];

paint();
iterate(i);


function iterate(){
  //insert iteration of search algo here


  paint();
  window.setTimeout(function(){
    iterate();
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
      if(gridArray[y][x] == 1){
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
