

$("#container")[0].style.width=OUTPUT_W*16+"px"
$("#wfcResultContainer")[0].style.width=OUTPUT_W*16+"px"

function show_ruler(){
    var html=""
    for(var i=0; i<OUTPUT_W; i++){
        for(var j=0; j<OUTPUT_H; j++){
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

function start(){
    initial_output      = structuredClone(output);
    intial_output_probs = structuredClone(output_probs);
    wfc();
    renderOutput();
}

function renderOutput(){
    var html = ""
    for(var i=0; i<OUTPUT_W; i++){
        for(var j=0; j<OUTPUT_H; j++){
            html += '<img src="img/'+img_path+'/tile'+output[j][i]+'.png" />'
            if(debug && output[j][i] == -1){
                html+='<div style="text-align:center; position: absolute; top:'+(i*1+1)*16+'px; left: '+(j*1+1)*16+'; width: 16px; height: 16px;">'+count_bits(output_probs[j][i])+'</div>'
            }
        }
    }
    $("#wfcResultContainer")[0].innerHTML=html
}