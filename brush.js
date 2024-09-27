function populateTilePicker(){
    var html ="";
    for(var i=0; i<Object.keys(input_probs).length; i++){
        html += '<img class="brushOpt" src="img/'+img_path+'/tile'+i+'.png" onclick="selectBrush('+i+',this)" />'
    }

    $("#tilePicker")[0].innerHTML = html;
}
populateTilePicker()

function selectBrush(tileId, img){
    $(".brushOpt").removeClass("selectedBrush")
    $(img).addClass("selectedBrush")
    currSelectedBrush=tileId;
}

var currSelectedBrush = -1;

function paint(){
    var x = $("#brushXInput")[0].value*1;
    var y = $("#brushYInput")[0].value*1;
    observe(x,y,currSelectedBrush)
    renderOutput();
}