
var curr_probs = structuredClone(FIFTH_STATUM_PROBS);
var img_path = "quintoStrato"

var working_tile_id;
var working_side ='up';

//Populate list of tiles
function populateTilesList(){
    var html ="";
    for(var i=0; i<Object.keys(curr_probs).length; i++){
        html += '<div class="tilesListOption" onclick="chooseWorkingTile('+i+',this)" ><img src="../img/'+img_path+'/tile'+i+'.png"" /></div>'
    }
    $("#tileListMenu")[0].innerHTML=html;
}
populateTilesList();



//Choose working tile onclick
function chooseWorkingTile(tileId, div){
    working_tile_id=tileId;
    renderWorkingTile();
    renderTilePicker();
    $(".tilesListOption").removeClass("tilesListOptionSelected")
    $(div).addClass("tilesListOptionSelected")
}

//Choose working side onclick
function selectWorkingSide(side, div){
    working_side = side;
    renderTilePicker();
    $(".workingTile").removeClass("workingTileSelected")
    $(div).addClass("workingTileSelected")
    
}

//Render
function renderWorkingTile(){
    $("#workingTileCenter")[0].innerHTML='<img src="../img/'+img_path+'/tile'+working_tile_id+'.png" style="width:100%; height: 100%;" />'
    
    $("#workingTileRight")[0].innerHTML=htmlForPossibilities(curr_probs[working_tile_id]["right"])
    $("#workingTileLeft" )[0].innerHTML=htmlForPossibilities(curr_probs[working_tile_id]["left" ])
    $("#workingTileUp"   )[0].innerHTML=htmlForPossibilities(curr_probs[working_tile_id]["up"   ])
    $("#workingTileDown" )[0].innerHTML=htmlForPossibilities(curr_probs[working_tile_id]["down" ])
}
function htmlForPossibilities(tileIds){
    var html =""
    for(var tileId of tileIds){
        html+='<img src="../img/'+img_path+'/tile'+tileId+'.png" style="" />'
    }
    return html
}

function renderTilePicker(){
    var tileIds = curr_probs[working_tile_id][working_side];
    var html = "";
    for(var tileId of tileIds){
        html+='<img src="../img/'+img_path+'/tile'+tileId+'.png" style="float:left; width:20%; margin: 3 3" />'
    }
    html+='<img src="./tileAdd.png" style="float:left; width:20%; margin: 3 3" />'
    $("#tilePickerMenu")[0].innerHTML = html;

}