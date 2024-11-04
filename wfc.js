/*//ivan
    var this.input_probs = IVAN_PROBS;
    var img_path = "provaIvan"

    //second stratum
    var this.input_probs = SECOND_STRATUM_PROBS;
    var img_path = "secondoStrato"

    //Fifth stratum
    var this.input_probs = FIFTH_STATUM_PROBS;
    var img_path = "quintoStrato"
     */
class WFC {
    static s_input_probs = structuredClone(AVON_SOUP_PROBS);
    static img_path = "avonsSoup"
    input_probs = WFC.s_input_probs; //todo: deprcate

    //input_probs = structuredClone(CUSTOM_PROBS);
    //static img_path = "quintoStratoRed"


    static OUTPUT_W = 60;
    static OUTPUT_H = 60;
    debug = false;
    setDebug(checkbox){this.debug=$(checkbox)[0].checked; renderOutput(this)}
    output = new Array();       //2d array of output tiles. -1 indicates superposition
    output_probs = new Array(); //this.output_probs is a 2d array of bigints: first two indexes are position (x/y), each position contains a bigint which is to be read as a bitmap.
    prob_calced_ctr = new Array();
    initial_output      
    intial_output_probs 
    id
    static id_ctr = 1;

    //all possibilities accounted
    probs_tmpl = (1n << BigInt(Object.keys(this.input_probs).length))-1n

    errorThreshold = 50;

    constructor() {
        //transform this.input_probs from list of tileids to bigintegers
        for(var ref_tile_id in this.input_probs){
            for(var dir in this.input_probs[ref_tile_id]){
                var res = tile_ids_to_bitmap(this.input_probs[ref_tile_id][dir])
                this.input_probs[ref_tile_id][dir] = res
            }
        }
        this.init();
        this.id = WFC.id_ctr++
    }
    

    init(){
        //init arrays
        for(var i=0; i<WFC.OUTPUT_W; i++){
            this.output_probs[i] = new Array();
            this.output[i] = new Array();
            this.prob_calced_ctr[i] = new Array();
            for(var j=0; j<WFC.OUTPUT_H; j++){
                this.output_probs[i][j] = this.probs_tmpl
                this.output[i][j] = -1;
                this.prob_calced_ctr[i][j] = false;
            }
        }
    }

    //finds the cell with the lowest non-zero (not-yet-collapsed) amount of possibilities
    find_lowest_entropy_cell(){
        var lowestI = -1;
        var lowestJ = -1;
        var lowestCnt = count_bits(this.probs_tmpl) + 1*1;
        for(var i=0; i<WFC.OUTPUT_W; i++){
            for(var j=0; j<WFC.OUTPUT_H; j++){
                var bitsNo=count_bits(this.output_probs[i][j]);
                if(this.output[i][j] == -1 && bitsNo<lowestCnt){
                    lowestCnt = bitsNo;
                    var lowestI = i;
                    var lowestJ = j;
                }
            }
        }
        if(this.debug){
            console.log("Returning "+lowestI+", "+lowestJ+" with count: "+lowestCnt)
        }
        return [lowestI, lowestJ];
    }

    //recursively recomputes superpositions for all not-yet-collapsed tiles
    recalc_prob(x, y){
        if(x<0 || y<0 || x==WFC.OUTPUT_W || y==WFC.OUTPUT_H || this.prob_calced_ctr[x][y]){
            return
        }
        this.prob_calced_ctr[x][y] = true;
        if(this.output[x][y] != -1){
            this.recalc_prob(x-1, y  )
            this.recalc_prob(x+1, y  )
            this.recalc_prob(x  , y-1)
            this.recalc_prob(x  , y+1)
            return;
        }
        var l = new Array();
        var r = new Array();
        var u = new Array();
        var d = new Array();
        if(x>0)              {l=bitmap_to_tile_ids(this.output_probs[x-1][y  ])}
        if(x<WFC.OUTPUT_W-1) {r=bitmap_to_tile_ids(this.output_probs[x+1][y  ])}
        if(y>0)              {u=bitmap_to_tile_ids(this.output_probs[x  ][y-1])}
        if(y<WFC.OUTPUT_H-1) {d=bitmap_to_tile_ids(this.output_probs[x  ][y+1])}

        var l_allowed_tiles = 0n;
        var tile
        for(tile of l){
            l_allowed_tiles = l_allowed_tiles | this.input_probs[""+tile].right
        }
        var r_allowed_tiles = 0n;
        for(tile of r){
            r_allowed_tiles = r_allowed_tiles | this.input_probs[""+tile].left
        }
        var u_allowed_tiles = 0n;
        for(tile of u){
            u_allowed_tiles = u_allowed_tiles | this.input_probs[""+tile].down
        }
        var d_allowed_tiles = 0n;
        for(tile of d){
            d_allowed_tiles = d_allowed_tiles | this.input_probs[""+tile].up
        }
        if(l.length == 0){l_allowed_tiles = this.probs_tmpl}
        if(r.length == 0){r_allowed_tiles = this.probs_tmpl}
        if(u.length == 0){u_allowed_tiles = this.probs_tmpl}
        if(d.length == 0){d_allowed_tiles = this.probs_tmpl}

        this.output_probs[x][y] = this.output_probs[x][y] & l_allowed_tiles;
        this.output_probs[x][y] = this.output_probs[x][y] & r_allowed_tiles;
        this.output_probs[x][y] = this.output_probs[x][y] & u_allowed_tiles;
        this.output_probs[x][y] = this.output_probs[x][y] & d_allowed_tiles;

        if(count_bits(this.output_probs[x][y]) != count_bits(this.probs_tmpl)){
            this.recalc_prob(x-1, y  )
            this.recalc_prob(x+1, y  )
            this.recalc_prob(x  , y-1)
            this.recalc_prob(x  , y+1)
        }

    }   

    start_recalc_prob(x,y){
        //propagate changes to nearby nodes
        this.recalc_prob(x, y)

        //reset prob_calced_ctr
        for(var i=0; i<WFC.OUTPUT_W; i++){
            for(var j=0; j<WFC.OUTPUT_H; j++){
                this.prob_calced_ctr[i][j] = false;
            }
        }
    }

    set_superposition(x, y, superpos_array){
        this.set_superposition_no_recalc(x, y, superpos_array)
        this.start_recalc_prob(x, y)
    }

    set_superposition_no_recalc(x, y, superpos_array){
        var superpos = tile_ids_to_bitmap(superpos_array);
        this.output_probs[x][y] = superpos;
    }

    set_bm_superposition(x, y, superpos_bm){
        this.output_probs[x][y] = superpos_bm;
    }

    observe(x, y, forcedVal=undefined){
        var probs = this.output_probs[x][y]
        if(probs === 0n){
            throw new Error('Collision! Tile '+x+', '+y+' has 0 possibilities');
        }
        if(forcedVal !== undefined){
            this.output[x][y] = BigInt(forcedVal);
        } else {
            var i = Math.floor(Math.random() * count_bits(probs));
            this.output[x][y] = get_nth_set_bit(this.output_probs[x][y], i)
        }
        this.output_probs[x][y] = 1n << this.output[x][y];

        //propagate changes to nearby nodes
        this.start_recalc_prob(x, y)    
    }

    start(){
        this.initial_output      = structuredClone(this.output);
        this.intial_output_probs = structuredClone(this.output_probs);
        this.wfc();
    }

    wfc(){
        console.log("starting wfc")
        var arr = this.find_lowest_entropy_cell();
        var x = arr[0];
        var y = arr[1];
        var k=0;
        var errorCnt = 0;
        do {
            try{
                this.observe(x,y);
                arr = this.find_lowest_entropy_cell();
                x = arr[0];
                y = arr[1];
                if(this.debug){
                    renderOutput(this);
                    setTimeout(()=>this.wfc(), 150);
                }
            } catch (error){
                console.log("Error occourred, restarting")
                console.log(error);
                errorCnt++;
                this.output       = structuredClone(this.initial_output);
                this.output_probs = structuredClone(this.intial_output_probs);
                if(this.debug || errorCnt >= this.errorThreshold){
                    break;
                }
                //restart
                arr = this.find_lowest_entropy_cell();
            }
            k++
        } while( (!this.debug && x != -1 && y!= -1) || (this.debug && k<1))

        console.log("done")

    }
}