var mainWfc = new WFC();

//$("#container")[0].style.width=WFC.OUTPUT_W*16+"px"
$("#wfcResultContainer1")[0].style.width=WFC.OUTPUT_W*16+"px"
$("#wfcResultContainer2")[0].style.width=WFC.OUTPUT_W*16+"px"

function show_ruler(){
    var html=""
    for(var i=0; i<WFC.OUTPUT_W; i++){
        for(var j=0; j<WFC.OUTPUT_H; j++){
            if(i==0){
                html+='<div style="text-align:center; position: absolute; top:'+i*16+'px; left: '+(j*1+1)*16+'px; width: 16px; height: 16px;">'+j+'</div>'
            }
        }
        html+='<div style="text-align:center; position: absolute; top:'+(i*1+1)*16+'px; left: 0; width: 16px; height: 16px;">'+i+'</div>'
    }
    $("#container")[0].innerHTML+=html;
}
show_ruler()


var initial_output;
var intial_output_probs;

function start(wfc){
    wfc.wfc();
    renderOutput(wfc);
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