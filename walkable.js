var walkables_coords = []



function paint_walkables() {
    for(coords of walkables_coords){
        set_superposition(coords[0],coords[1],WALKABLE_TILES)
    }
    renderOutput();
}

function randomize_walkable_coords(){
    //var new_coords = dumb_algorithm();
    walkables_coords= dumb_algorithm();
    
}


var walk_mod=[ //indexed by dir. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
    [ 0, -1], //UP
    [ 0,  1], //DOWN
    [-1,  0], //LEFT
    [ 1,  0], //RIGHT
]
var dir_name = ["up", "down", "left", "right"]

function dumb_algorithm(){
    var out = []
    var start_coords = random_edge_coords()
    var end_coords   = random_edge_coords()
    console.log("Running dumb alg on "+start_coords+"; "+end_coords)
    var curr_x = start_coords[0];
    var curr_y = start_coords[1];
    //PIck a random direction and run towards it for variable_len times. Repeat until on target square 
    while(curr_x != end_coords[0] || curr_y != end_coords[1]){
        out = out.concat([[curr_x, curr_y]])
        var dir = shortest_dir([curr_x, curr_y], end_coords);//randomInt(4); //value between 0-3. 0=UP, 1=DOWN, 2=LEFT, 3=RIGHT
        //console.log("picked "+dir_name[dir]+" direction")
        var variable_len=randomInt(15);
        for(var i =0 ; i<variable_len; i++){
            out = out.concat([[curr_x, curr_y]])
            curr_x += walk_mod[dir][0];
            curr_y += walk_mod[dir][1];
            if(curr_x < 0){ curr_x = 0;}
            if(curr_y < 0){ curr_y = 0;}
            if(curr_x >= OUTPUT_W){ curr_x = OUTPUT_W-1;}
            if(curr_y >= OUTPUT_H){ curr_y = OUTPUT_H-1;}

            if(curr_x == end_coords[0] && curr_y == end_coords[1]){
                continue;
            }
        }
    }
    return out
}

function random_edge_coords(){
    var random_coords = [randomInt(OUTPUT_W), randomInt(OUTPUT_H)]
    var which_fixed = randomInt(2); //0 = x coord is fixed, 1 = y coord is fixed
    var min_or_max  = randomInt(2); //0 = fixed coord will be set to min, 1 = fixed coord will be set to max

    if(which_fixed == 0){
        return [min_or_max == 0 ? 0 : OUTPUT_W-1, random_coords[1]]
    } else {
        return [random_coords[0]                , min_or_max == 0 ? 0 : OUTPUT_H-1]
    }
}

function shortest_dir(from, to){
    var x_diff     = Math.abs(to  [0] - from[0]);
    var y_diff     = Math.abs(to  [1] - from[1]);
    var x_diff_neg = from[0] > to  [0];
    var y_diff_neg = from[1] > to  [1];

    if(x_diff > y_diff){
        return x_diff_neg ? 2 : 3
    } else {
        return y_diff_neg ? 0 : 1
    }
}

function randomInt(max){
    return Math.floor(Math.random()*max)
}