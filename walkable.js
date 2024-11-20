var walkables_coords = []

var non_walkable_superpos = Object.keys(WFC.s_input_probs).filter(e=>{
    return WFC.s_input_walkable.findIndex(e2=>{
        return e2==e
    }) == -1 ? true : false
})
var walkable_non_warp = WFC.s_input_walkable.filter(e=>{
    return WFC.s_input_warps.findIndex(e2=>{
        return e2==e
    }) == -1 ? true : false
})


function paint_walkables(wfc) {
    for(var i=0; i<WFC.OUTPUT_W; i++){
        for(var j=0; j<WFC.OUTPUT_H; j++){
            var isTileWalkable = walkables_coords.findIndex(e=>{return e.x===i && e.y===j}) == -1 ? false : true;
            if(!isTileWalkable){
                wfc.set_superposition_no_recalc(i, j, non_walkable_superpos) //tilesets outside walkable path can also be walkable. This somehow fixes issues for my tileset. More research needed
            }
        }
    }
    for(coords of walkables_coords){
        //console.log("Setting walkable "+coords.x + ", " +coords.y);
        wfc.set_superposition_no_recalc(coords.x,coords.y,walkable_non_warp)
    }
    
    // Print graph
    var showDebugGraph = function(){
        var m = new Array();
        var printstr = "   ";
        
        for(var i=0; i<WFC.OUTPUT_W; i++){//header
            printstr+=(""+i).padStart(2, '0')+" "
        }
        printstr+="\n"
        
        for(var i=0; i<WFC.OUTPUT_W; i++){
            printstr+=(""+i).padStart(2, '0')+" "
            m[i] = new Array();
            for(var j=0; j<WFC.OUTPUT_H; j++){
                //horrible but idc
                var isWalkable = false
                for(coords of walkables_coords){
                    if(j == coords.x && i == coords.y){
                        isWalkable=true;
                    }
                }
                if(isWalkable){
                    printstr+="X  "
                } else {
                    printstr+=".  "
                }
            }
            printstr+="\n"
        }
        console.log(printstr)
    }
    showDebugGraph(); //comment this out if you want

    wfc.start_recalc_prob(fixed_end_coords.x, fixed_end_coords.y)

    
    var lowest_entropy_coord = wfc.find_lowest_entropy_cell()
    var lex = lowest_entropy_coord[0]
    var ley = lowest_entropy_coord[1]
    if(wfc.output_probs[lex][ley] === 0n && wfc.output[lex][ley] === -1){
        console.error("Collision found at "+lex+", "+ley)
        if(wfc.debug){debugger}
    } else {
        console.log("done randomizing coords")
    }

    renderOutput(wfc);
}

var fixed_end_coords = new Coord(0,0)
function randomize_walkable_coords(){
    console.log("start randomizing coords")
    fixed_end_coords = random_edge_coords();
    var paths_no = 5;
    for(var i=0; i<paths_no; i++){
        walkables_coords = walkables_coords.concat(dumb_algorithm(fixed_end_coords));
    }
    
}


var walk_mod=[ //indexed by dir. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
    new Coord( 0, -1), //UP
    new Coord( 0,  1), //DOWN
    new Coord(-1,  0), //LEFT
    new Coord( 1,  0), //RIGHT
]
var dir_name = ["up", "down", "left", "right"]

function dumb_algorithm(fixed_end_coords = undefined){
    var out = []
    var start_coords = random_edge_coords()
    var end_coords   = fixed_end_coords === undefined ? random_edge_coords() : fixed_end_coords
    var curr_x = start_coords.x;
    var curr_y = start_coords.y;
    //PIck a random direction and run towards it for variable_len times. Repeat until on target square 
    while(curr_x != end_coords.x || curr_y != end_coords.y){
        out = out.concat(new Coord(curr_x-1, curr_y-1))
        out = out.concat(new Coord(curr_x  , curr_y-1))
        out = out.concat(new Coord(curr_x+1, curr_y-1))
        out = out.concat(new Coord(curr_x-1, curr_y  ))
        out = out.concat(new Coord(curr_x  , curr_y  ))
        out = out.concat(new Coord(curr_x+1, curr_y  ))
        out = out.concat(new Coord(curr_x-1, curr_y+1))
        out = out.concat(new Coord(curr_x  , curr_y+1))
        out = out.concat(new Coord(curr_x+1, curr_y+1))
        var dir = shortest_dir(new Coord(curr_x, curr_y), end_coords);//randomInt(4); //value between 0-3. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
        if(randomInt(5) == -1){ // with 1/5 chance just pick a random direction
            var dir = randomInt(4); //value between 0-3. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
        }

        //console.log("picked "+dir_name[dir]+" direction")
        var variable_len=randomInt(3)*1+1*1;
        for(var i =0 ; i<variable_len; i++){
            out = out.concat(new Coord(curr_x, curr_y))
            curr_x += walk_mod[dir].x;
            curr_y += walk_mod[dir].y;
            if(curr_x < 0){ curr_x = 0;}
            if(curr_y < 0){ curr_y = 0;}
            if(curr_x >= WFC.OUTPUT_W){ curr_x = WFC.OUTPUT_W-1;}
            if(curr_y >= WFC.OUTPUT_H){ curr_y = WFC.OUTPUT_H-1;}

            if(curr_x == end_coords.x && curr_y == end_coords.y){
                break;
            }
        }
    }

    out = out.filter((value, index, array) => array.indexOf(value) === index); //remove duplicates
    out = out.filter((value, index, array) => value.x >= 0 && value.y >= 0 && value.x <= WFC.OUTPUT_W-1 && value.y <= WFC.OUTPUT_H-1); //remove invalid coords

    return out
}

function random_edge_coords(){
    var random_coords = new Coord(randomInt(WFC.OUTPUT_W), randomInt(WFC.OUTPUT_H))
    var which_fixed = randomInt(2); //0 = x coord is fixed, 1 = y coord is fixed
    var min_or_max  = randomInt(2); //0 = fixed coord will be set to min, 1 = fixed coord will be set to max

    if(which_fixed == 0){
        return new Coord(min_or_max == 0 ? 0 : WFC.OUTPUT_W-1, random_coords.y)
    } else {
        return new Coord(random_coords.x                     , min_or_max == 0 ? 0 : WFC.OUTPUT_H-1)
    }
}

function shortest_dir(from, to){
    var x_diff     = Math.abs(to.x - from.x);
    var y_diff     = Math.abs(to.y - from.y);
    var x_diff_neg = from.x > to.x;
    var y_diff_neg = from.y > to.y;

    if(x_diff > y_diff){
        return x_diff_neg ? 2 : 3
    } else {
        return y_diff_neg ? 0 : 1
    }
}

function randomInt(max){
    return Math.floor(Math.random()*max)
}