
var wfcs = [new WFC()]
const WFCS_COLS_NO = 1
const WFCS_ROWS_NO = Math.ceil(wfcs.length / WFCS_COLS_NO)

function create_wfc_containers(){
    var html =''
    for(var wfc of wfcs){
        html+='<div id="wfcResultContainer'+wfc.id+'" style="position:relative; float: left; width: '+WFC.OUTPUT_W*16+'px"></div>'
    }
    $("#container")[0].innerHTML = html;
}
create_wfc_containers()

var mainWfc = wfcs[0];

function show_ruler(){
    var html=""
    for(var i=0; i<WFC.OUTPUT_W * WFCS_ROWS_NO; i++){     
        for(var j=0; j<WFC.OUTPUT_H * WFCS_COLS_NO; j++){ 
            if(i==0){
                html+='<div style="text-align:center; position: absolute; top:'+i*16+'px; left: '+(j*1+1)*16+'px; width: 16px; height: 16px;">'+j+'</div>'
            }
        }
        html+='<div style="text-align:center; position: absolute; top:'+(i*1+1)*16+'px; left: 0; width: 16px; height: 16px;">'+i+'</div>'
    }
    $("#container")[0].innerHTML+=html;
}
show_ruler()

function set_debug(debug){
    for(var wfc of wfcs){
        wfc.setDebug(debug)
    }
}

function paintAllOnes(){
    for(var i=0; i<WFC.OUTPUT_W * WFCS_ROWS_NO; i++){     
        for(var j=0; j<WFC.OUTPUT_H * WFCS_COLS_NO; j++){ 
            if(count_bits(mainWfc.output_probs[i][j])==1){
                mainWfc.output[i][j] = bitmap_to_tile_ids(mainWfc.output_probs[i][j])[0]
            }
        }
    }
    renderOutput(mainWfc);
}

function start(){
    for(var wfc of wfcs){
        runAndRenderWfc(wfc)
    }
}

function runAndRenderWfc(wfc){
    wfc.start();
    renderOutput(wfc);
}

function calc_probs_from_neighbours(wfc_i){
    var wfc = wfcs[wfc_i];
    //find neighbouring cells
    //We assume that the algorithm goes from top left to right bottom row-by-row, so we only need to find the tile to the left and the one above
    var left_wfc = undefined
    var above_wfc = undefined
    //tile on the left:
    if(wfc_i % WFCS_COLS_NO != 0){ //if it's start of row there is no tile on the left
        left_wfc = wfcs[wfc_i - 1]
    }

    //tile above:
    if(wfc_i >= WFCS_COLS_NO){ //if it's first row there is no tile above
        above_wfc = wfcs[wfc_i-WFCS_COLS_NO]
    }

    //assume equal width, eight, and available tiles
    //for each tileId on the rightmost wall of the left wfc, set the current changes to their right_tiles
    for(var i=0; i<WFC.OUTPUT_H; i++){
        var left_tile_id = left_wfc.output[WFC.OUTPUT_W-1][i];
        var possible_superpositions = wfc.input_probs[left_tile_id]["right"]
        wfc.set_bm_superposition(0, i, possible_superpositions);
    }
    wfc.start_recalc_prob(0,0)

    renderOutput(wfc)
    
}

function reset(){
    for(wfc of wfcs){
        wfc.init();
        renderOutput(wfc);
    }
}

function renderOutput(wfc){
    var html = ""
    for(var i=0; i<WFC.OUTPUT_W; i++){
        for(var j=0; j<WFC.OUTPUT_H; j++){
            html += '<img src="img/'+WFC.img_path+'/tile'+wfc.output[j][i]+'.png" />'
            if(wfc.debug && wfc.output[j][i] == -1){
                html+='<div style="text-align:center; position: absolute; top:'+i*16+'px; left: '+j*16+'; width: 16px; height: 16px;" onmouseenter="showTileDetails('+j+','+i+')" >'+count_bits(wfc.output_probs[j][i])+'</div>'
            }
        }
    }
    $("#wfcResultContainer"+wfc.id)[0].innerHTML=html
}

$("body")[0].onmousemove = function(e){$("#debugDetailsContainer")[0].style.left=e.clientX; $("#debugDetailsContainer")[0].style.top=e.clientY}

function showTileDetails(x, y){
    var wfc = wfcs[0] //todo rewrite
    var tiles = bitmap_to_tile_ids(wfc.output_probs[x][y])
    var html = ""
    for(var tile of tiles){
        html += '<img src="img/'+WFC.img_path+'/tile'+tile+'.png"" />'
    }
    
    //console.log(tiles)
    $("#debugDetailsContainer")[0].innerHTML = html;
    $("#debugDetailsContainer")[0].style.display = "block"
}