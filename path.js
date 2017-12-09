class maze{
    constructor(){
      this.board = createArray(12, 12);
      this.start = new Array(2);
      this.end = new Array(2);
      this.start[0]=-1;
      this.start[1]=-1;
      this.end[0]=-1;
      this.end[1]=-1;

      for (var i = 0; i < 12; i++){
        for (var j = 0; j < 12; j++){
          this.board[i][j]=0;
        }
      }
    }
    // reset(){
    //   console.log("reset1");
    //   for (var i = 0; i < 12; i++){
    //     for (var j = 0; j < 12; j++){
    //       if (document.getElementById("board").rows[i].cells[j].style.backgroundColor=="yellow"){
    //         document.getElementById("board").rows[i].cells[j].style.backgroundColor="white";
    //       }
    //       if (document.getElementById("board").rows[i].cells[j].style.backgroundColor=="blue"){
    //         this.board[i][j]=1;
    //       } else if (document.getElementById("board").rows[i].cells[j].style.backgroundColor=="white"){
    //         this.board[i][j]=0;
    //       }
    //
    //     }
    //   }
    // }


}
function reset(){
  for (var i = 0; i < 12; i++){
    for (var j = 0; j < 12; j++){
      var a = game.board[i][j];
      if (a == 0){
        table.rows[i].cells[j].style.backgroundColor="white";
      }
      else if (a == 1){
        table.rows[i].cells[j].style.backgroundColor="blue";
      }
      else if (a == 5){
        table.rows[i].cells[j].style.backgroundColor="red";
      }
      else if (a == 10){
        table.rows[i].cells[j].style.backgroundColor="orange";
      }
    }
  }
}
function search(){
  var queue = [];
  queue.push(this.start);


}
function findShortestPath(start, grid){
  reset();
  var map = cloneArray(grid);
  var point = {
    left: start[0],
    top: start[1],
    path: [],
    status: 5,
  }
  var queue = [point];
  while (queue.length>0){
    var curr = queue.shift();
    var newP = searchDirectionX(curr, map, 0);
    if (newP.status == 10){
      return newP.path;
    } else if (newP.status == 0){
      queue.push(newP);
    }
    var newP = searchDirectionX(curr, map, 1);
    if (newP.status == 10){
      return newP.path;
    } else if (newP.status == 0){
      queue.push(newP);
    }
    var newP = searchDirectionX(curr, map, 2);
    if (newP.status == 10){
      return newP.path;
    } else if (newP.status == 0){
      queue.push(newP);
    }
    var newP = searchDirectionX(curr, map, 3);
    if (newP.status == 10){
      return newP.path;
    } else if (newP.status == 0){
      queue.push(newP);
    }


  }
  return false;

}
function showShortest(){
  var path = findShortestPath(game.start, game.board);
  var x = game.start[0];
  var y = game.start[1];
  for (var i = 0; i < path.length-1; i++){
    if (path[i]== 0){
      y-=1;
    } else if (path[i]==1){
      x+=1;
    } else if (path[i]==2){
      y+=1;
    } else if (path[i]==3){
      x-=1;
    }
    table.rows[y].cells[x].style.backgroundColor="mediumpurple";
  }
}
function cloneArray(grid){
  var len = grid.length
  var returnArr = createArray(len,len);
  for (var i = 0; i < len; i++){
    for (var j = 0; j < len; j++){
      returnArr[i][j]=grid[i][j];
    }
  }
  return returnArr;
}
function searchDirectionX(start, map, dir){
  // var map = cloneArray(grid);
  var path = start.path.slice();
  path.push(dir);
  var top = start.top;
  var left = start.left;
  if (dir == 0){
    top-=1;
  } else if (dir == 1){
    left+=1;
  } else if (dir == 2){
    top += 1;
  } else if (dir==3){
    left-=1;
  }
  var returnPoint = {
    left: left,
    top: top,
    path: path,
    status:-1,
  }
  var status = getStatus(returnPoint, map);
  returnPoint.status = status;
  if (status == 0){
    map[top][left] = 2;
    table.rows[top].cells[left].style.backgroundColor = 'rgb(' + [returnPoint.path.length*6,0,0].join(',') + ')';;
  }
  return returnPoint;

}
function getStatus(point, map){
  var size = map.length;
  if (point.top<0||point.top>=size){
    return 1;
  } else if (point.left<0||point.left>=size){
    return 1;
  }
  var a = map[point.top][point.left];
  return a;
}
var setS = false;
var setE= false;
function createArray(length) {
	var arr = new Array(length || 0),
		i = length;
	if (arguments.length > 1) {
		var args = Array.prototype.slice.call(arguments, 1);
		while (i--) arr[length - 1 - i] = createArray.apply(this, args);
	}
	return arr;
}
function setStart(){
  setS = true;
}
function setEnd(){
  setE = true;
}
var table =  document.getElementById("board");
function listen(x,y){
  var cell = table.rows[y].cells[x];
  if (setS){
    if (game.start[0]!=-1){
      var cell1 = table.rows[game.start[1]].cells[game.start[0]];
      cell1.style.backgroundColor = "white";
      game.board[game.start[1]][game.start[0]] = 0;
    }
    cell.style.backgroundColor = "red";
    game.start[0] = x;
    game.start[1] = y;
    game.board[y][x] = 5;
    setS = false;
  }
  else if (setE){
    if (!(game.start[0]==x&& game.start[1]==y)){
      if (game.end[0]!=-1){
        var cell1 = table.rows[game.end[1]].cells[game.end[0]];
        cell1.style.backgroundColor = "white";
        game.board[game.end[1]][game.end[0]] = 0;

      }
      cell.style.backgroundColor = "orange";
      game.end[0] = x;
      game.end[1] = y;
      game.board[y][x] = 10;
      setE = false;
      }

    }
    else if (game.board[y][x] == 0||game.board[y][x]==2){
    cell.style.backgroundColor = "blue";
    game.board[y][x] = 1;
  }
  else if (game.board[y][x] == 1){
    cell.style.backgroundColor = "white";
    game.board[y][x] = 0;
  }
}
var game = new maze();

function initializeTable(){
  var cells = table.getElementsByTagName("td");
  for (var i = 0; i < cells.length; i++) {
     cells[i].onclick = function(){listen(this.cellIndex, this.parentNode.rowIndex);};
     cells[i].style.backgroundColor="white";
   }
  var button = document.getElementById("setStart");
  button.onclick = function(){setStart();};
  var button = document.getElementById("setEnd");
  button.onclick = function(){setEnd();};

}
initializeTable();
