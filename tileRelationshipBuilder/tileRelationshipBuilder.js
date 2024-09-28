
var curr_probs = structuredClone(FIFTH_STATUM_PROBS);
var img_path = "quintoStrato"

var working_tile_id;
var working_side;

//Populate list of tiles
function populateTilesList(){
    var html ="";
    for(var i=0; i<Object.keys(curr_probs).length; i++){
        html += '<div class="tilesListOption" onclick="chooseWorkingTile('+i+',this)" ><img src="../img/'+img_path+'/tile'+i+'.png"" /></div>'
    }
    $("#tileListMenu")[0].innerHTML=html;
}
populateTilesList();



//Choose working tileset onclick
function chooseWorkingTile(tileId, div){
    working_tile_id=tileId;
    $("#workingTileCenter")[0].innerHTML='<img src="../img/'+img_path+'/tile'+tileId+'.png" style="width:100%; height: 100%;" />'
    
    $("#workingTileRight")[0].innerHTML=htmlForPossibilities(curr_probs[tileId]["right"])
    $("#workingTileLeft" )[0].innerHTML=htmlForPossibilities(curr_probs[tileId]["left" ])
    $("#workingTileUp"   )[0].innerHTML=htmlForPossibilities(curr_probs[tileId]["up"   ])
    $("#workingTileDown" )[0].innerHTML=htmlForPossibilities(curr_probs[tileId]["down" ])

    $(".tilesListOption").removeClass("tilesListOptionSelected")
    $(div).addClass("tilesListOptionSelected")
}

function htmlForPossibilities(tileIds){
    var html =""
    for(var tileId of tileIds){
        html+='<img src="../img/'+img_path+'/tile'+tileId+'.png" style="" />'
    }
    return html
}

function selectWorkingSide(side, div){
    working_side = side;
    var tileIds = curr_probs[working_tile_id][side];
    var html = "";
    for(var tileId of tileIds){
        html+='<img src="../img/'+img_path+'/tile'+tileId+'.png" style="" />'
    }
    $("#tilePickerMenu")[0].innerHTML = html;

    $(".workingTile").removeClass("workingTileSelected")
    $(div).addClass("workingTileSelected")
    
}