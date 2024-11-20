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

var paintedCoords = new Array()
function setPaintedCoords(coords){
    paintedCoords=paintedCoords.concat(coords)
}
async function paint_walkables(wfc) {
    for(var i=0; i<WFC.OUTPUT_W; i++){
        for(var j=0; j<WFC.OUTPUT_H; j++){
            wfc.set_superposition_no_recalc(i, j, non_walkable_superpos) //tilesets outside walkable path cannot be walkable. More research needed
        }
    }
    const brushSize = 4;
    for(var vector of walkables_coords){
        //console.log("Setting walkable "+coords.x + ", " +coords.y);
        vector.rasterize(wfc.output_probs, new Brush(tile_ids_to_bitmap(walkable_non_warp), brushSize))
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
                for(coords of paintedCoords){
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
    
    var delay = function(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    //debug stuff
    wfc.debug=true
    renderOutput(wfc);
    await delay(1000)
    debugger;

    wfc.start_recalc_prob(fixed_end_coords.x, fixed_end_coords.y)

    renderOutput(wfc);
    await delay(1000)
    debugger;
    
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
    
    //scale x0 y0 to matrix coords
    var mx = Math.ceil(fixed_end_coords.x*WFC.OUTPUT_W/100)-1
    var my = Math.ceil(fixed_end_coords.y*WFC.OUTPUT_H/100)-1
    if(mx<0){mx = 0}
    if(my<0){my = 0}
    fixed_end_coords = new Coord(mx, my)    
}


var walk_mod=[ //indexed by dir. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
    new Coord( 0, -1), //UP
    new Coord( 0,  1), //DOWN
    new Coord(-1,  0), //LEFT
    new Coord( 1,  0), //RIGHT
]
var dir_name = ["up", "down", "left", "right"]

function dumb_algorithm(fixed_end_coords = undefined){
    var start_coords = random_edge_coords()
    var end_coords   = fixed_end_coords === undefined ? random_edge_coords() : fixed_end_coords
    return new Vector(start_coords.x, start_coords.y, end_coords.x, end_coords.y);
}

//returns Coord object with random coordinates in Vector space (1-100)
function random_edge_coords(){
    var random_coords = new Coord(randomInt(100)+1, randomInt(100)+1)
    var which_fixed = randomInt(2); //0 = x coord is fixed, 1 = y coord is fixed
    var min_or_max  = randomInt(2); //0 = fixed coord will be set to min, 1 = fixed coord will be set to max

    if(which_fixed == 0){
        return new Coord(min_or_max == 0 ? 0 : 100, random_coords.y)
    } else {
        return new Coord(random_coords.x          , min_or_max == 0 ? 0 : 100)
    }
}

function randomInt(max){
    return Math.floor(Math.random()*max)
}