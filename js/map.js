function getTile(location){
  if(MAP_STATE === undefined){
    initMapState();
  }
  return MAP_STATE[location.y + 1][location.x + 1]

}

function generateMapAscii(startX, startY, size){
  if(startX === undefined){
    startX = 0
  }
  if(startY === undefined){
    startY = 0
  }
  if(size === undefined){
    size = 8
  }
  var out_str = "";
    console.log("y " + MAP.length);
    console.log("x " + MAP[0].length);
    for (var y = startY; (y < MAP.length-1) && (y < startY + size); y++) {
      for (var x = startX; (x < MAP[0].length -1) && (x < startX + size); x++) {
        var tile = getTile({x: x, y: y});
        if(tile !== ""){
          if(CUR_LOC.x == x && CUR_LOC.y == y){
            out_str += " P ";
          }else{
            out_str += " # ";
          }

        }else{
          out_str += " . ";
        }
      }
      out_str += "\n";
    }
    console.log(out_str);
    return out_str;
}


var MAP_STATE;
function initMapState(){
  MAP_STATE = MAP;
  for(var row = 0; row < MAP.length; row++){
    for(var col = 0; col < MAP[0].length; col++){
      if (MAP_STATE[row][col] !== ""){
        MAP_STATE[row][col] =  jQuery.extend(true, {}, TILES[MAP[row][col]]);
      }
    }
  }
}
////           PASTE YOUR MAP BELOW.           ////
//// BE SURE TO DELETE THE ENTIRE PREVIOUS MAP ////
var MAP = [["","","","","","","","","","","","","",""],
["","starting room","","","","","","","","","","","",""],
["","path","","","","","","","","","","","",""],
["","path","","","","","","","","","","","",""],
["","path","stick room","path","","","","","","","","","",""],
["","","","path","path","path","path","","","","","","",""],
["","","","path","","","path","small monster room","path","path","path","path","path",""],
["","","","small monster room","","","path","","","","","","",""],
["","","","path","","","path","","","","","","",""],
["","","","path","","","path","","","","","","",""],
["","","","path","small monster room","path","path","","","","","","",""],
["","","","path","","path","","","","","","","",""],
["","","","rock room","","path","","","","","","","",""],
["","","","path","","healing fountain","","","","","","","",""],
["","","","path","","path","","","","","","","",""],
["","","","path","","path","","","","","","","",""],
["","","","","","path","","","","","","","",""],
["","","","","","fancy room","","","","","","","",""],
["","","","","","path","","","","","","","",""],
["","","","","","path","","","","","","","",""],
["","","","","","path","","","","","","","",""],
["","","","","","path","","","","","","","",""],
["","","","","","","","","","","","","",""]];

