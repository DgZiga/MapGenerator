var input_probs = IVAN_PROBS;
const OUTPUT_W = 20;
const OUTPUT_H = 20;

var output = new Array();       //2d array of output tiles. -1 indicates superposition
var output_probs = new Array(); //output_probs is a 3d array: first two indexes are position (x/y), each position contains a list of possibilities
var prob_calced_ctr = new Array();

//just an array of all the probabilities to be cloned
var probs_tmpl = new Array();
for(var i=0; i<Object.keys(input_probs).length; i++){
    probs_tmpl[i]=i;
}

function init(){
    //init arrays
    for(var i=0; i<OUTPUT_W; i++){
        output_probs[i] = new Array();
        output[i] = new Array();
        prob_calced_ctr[i] = new Array();
        for(var j=0; j<OUTPUT_H; j++){
            output_probs[i][j] = probs_tmpl.slice(); //clone array
            output[i][j] = -1;
            prob_calced_ctr[i][j] = false;
        }
    }
}

//finds the cell with the lowest non-zero (not-yet-collapsed) amount of possibilities
function find_lowest_entropy_cell(){
    var lowestI = -1;
    var lowestJ = -1;
    var lowestCnt = probs_tmpl.length + 1*1;
    for(var i=0; i<OUTPUT_W; i++){
        for(var j=0; j<OUTPUT_H; j++){
            if(output[i][j] == -1 && output_probs[i][j].length<lowestCnt){
                lowestCnt = output_probs[i][j].length;
                var lowestI = i;
                var lowestJ = j;
            }
        }
    }
    return [lowestI, lowestJ];
}

//recursively recomputes superpositions for all not-yet-collapsed tiles
function recalc_prob(x, y){
    if(x<0 || y<0 || x==OUTPUT_W || y==OUTPUT_H || prob_calced_ctr[x][y]){
        return
    }
    prob_calced_ctr[x][y] = true;
    if(output[x][y] != -1){
        recalc_prob(x-1, y  )
        recalc_prob(x+1, y  )
        recalc_prob(x  , y-1)
        recalc_prob(x  , y+1)
        return;
    }
    var l = new Array();
    var r = new Array();
    var u = new Array();
    var d = new Array();
    if(x>0)          {l=output_probs[x-1][y  ]}
    if(x<OUTPUT_W-1) {r=output_probs[x+1][y  ]}
    if(y>0)          {u=output_probs[x  ][y-1]}
    if(y<OUTPUT_H-1) {d=output_probs[x  ][y+1]}

    var l_allowed_tiles = new Array();
    for(tile of l){
        l_allowed_tiles = l_allowed_tiles.concat(input_probs[""+tile].right)
    }
    var r_allowed_tiles = new Array();
    for(tile of r){
        r_allowed_tiles = r_allowed_tiles.concat(input_probs[""+tile].left)
    }
    var u_allowed_tiles = new Array();
    for(tile of u){
        u_allowed_tiles = u_allowed_tiles.concat(input_probs[""+tile].down)
    }
    var d_allowed_tiles = new Array();
    for(tile of d){
        d_allowed_tiles = d_allowed_tiles.concat(input_probs[""+tile].up)
    }
    if(l.length == 0){l_allowed_tiles = probs_tmpl.slice()}
    if(r.length == 0){r_allowed_tiles = probs_tmpl.slice()}
    if(u.length == 0){u_allowed_tiles = probs_tmpl.slice()}
    if(d.length == 0){d_allowed_tiles = probs_tmpl.slice()}

    output_probs[x][y] = output_probs[x][y].filter(e => d_allowed_tiles.includes(e) && u_allowed_tiles.includes(e) && l_allowed_tiles.includes(e) && r_allowed_tiles.includes(e));
    if(output_probs[x][y].length != probs_tmpl.length){
        recalc_prob(x-1, y  )
        recalc_prob(x+1, y  )
        recalc_prob(x  , y-1)
        recalc_prob(x  , y+1)
    }

}   

function observe(x, y){
    var probs = output_probs[x][y]
    var i = Math.floor(Math.random() * probs.length);
    output[x][y] = output_probs[x][y][i]
    output_probs[x][y] = [output[x][y]];

    //propagate changes to nearby nodes
    recalc_prob(x, y)

    //reset prob_calced_ctr
    for(var i=0; i<OUTPUT_W; i++){
        for(var j=0; j<OUTPUT_H; j++){
            prob_calced_ctr[i][j] = false;
        }
    }
    
}

function start(){
    init();
    var arr = find_lowest_entropy_cell();
    var x = arr[0];
    var y = arr[1];
    do {
        try{
            observe(x,y);
            arr = find_lowest_entropy_cell();
            x = arr[0];
            y = arr[1];
        } catch (error){
            console.log("Error occourred, restarting")
            console.log(error);
            //restart
            init();
            arr = find_lowest_entropy_cell();
            x = arr[0];
            y = arr[1];
        }
    } while(x != -1 && y!= -1)
    console.log("done")
    var html = ""
    $("#continer")[0].style.width=OUTPUT_W*16+"px"
    for(var i=0; i<OUTPUT_W; i++){
        for(var j=0; j<OUTPUT_H; j++){
            html += '<img src="img/provaIvan/tile'+output[j][i]+'.png" />'
        }
    }
    $("#continer")[0].innerHTML=html

}