
const BIT_LOOKUP_TBL = [0,1,1,2,1,2,2,3,1,2,2,3,2,3,3,4] //for each index contains how many bits are set for that index value (e.g BIT_LOOKUP_TBL[3] = 2 because 3 is 0011)
function count_bits(input){
    var res = 0;
    while(input > 0){
        res += BIT_LOOKUP_TBL[input & 15n]
        input >>= 4n
    }
    return res
}

//takes in a biginter bitmap and converts it to int[]
function bitmap_to_tile_ids(input){
    //can probably be faster
    var out = new Array();
    var i=0;
    while (input != 0n){
        if ((input & 1n) === 1n){
            out.push(i)
        }
        i++;
        input >>= 1n;
    }
    return out
}
//takes in a int[] and converts it to a bitmap
function tile_ids_to_bitmap(input){
    var out = 0n;
    for(tile_id of input){
        out |= 1n << BigInt(tile_id)
    }
    return out;
}


function get_nth_set_bit(input, n){
    var i=0;
    while (input != 0n){
        if ((input & 1n) === 1n){
            if(n == 0){
                return BigInt(i);
            }
            n--;
        }
        i++;
        input >>= 1n;
    }
    throw new Error('Out of bounds');
}
