
var wfcs = [new WFC(), new WFC(), new WFC(), new WFC()]
const WFCS_COLS_NO = 2
const WFCS_ROWS_NO = Math.ceil(wfcs.length / WFCS_COLS_NO)

function create_wfc_containers(){
    var html =''
    for(wfc of wfcs){
        html+='<div id="wfcResultContainer'+wfc.id+'" style="float: left; width: '+WFC.OUTPUT_W*16+'px"></div>'
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


function start(){
    for(wfc of wfcs){
        wfc.wfc();
        renderOutput(wfc);
    }
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
                html+='<div style="text-align:center; position: absolute; top:'+(i*1+1)*16+'px; left: '+(j*1+1)*16+'; width: 16px; height: 16px;">'+count_bits(wfc.output_probs[j][i])+'</div>'
            }
        }
    }
    $("#wfcResultContainer"+wfc.id)[0].innerHTML=html
}