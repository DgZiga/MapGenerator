
//First hand-crafted props 
const CUSTOM_PROBS_FIRST = {"0":{"up":[0,4,2],"down":[1,0],"left":[0,1,2,4,3],"right":[0,1,3,4,2]},"1":{"up":[0],"down":[3],"left":[0,1,2,4,3],"right":[1,0,2,3,4]},"2":{"up":[4,3],"down":[4,0],"left":[0,1,3,4],"right":[4,3,1,0]},"3":{"up":[1],"down":[4,2],"left":[0,1,2,3,4],"right":[4,3,0,1,2]},"4":{"up":[3,2,4],"down":[0,4,2],"left":[0,1,2,3,4],"right":[0,1,2,3,4]}}

//Removed links to tile 1 as it created a 3-tile-tall "barrier". Kind of worked
const CUSTOM_PROBS_NO_TILE_1 = {"0":{"up":[0,4,2],"down":[0,3],"left":[0,2,4,3],"right":[0,3,4,2]},"1":{"up":[0],"down":[3],"left":[0,1,2,4,3],"right":[1,0,2,3,4]},"2":{"up":[4,3],"down":[4,0],"left":[0,3,4],"right":[4,3,0]},"3":{"up":[0,4],"down":[4,2],"left":[0,2,3,4],"right":[4,3,0,2]},"4":{"up":[3,2,4],"down":[0,4,2,3],"left":[0,2,3,4],"right":[0,2,3,4]}}

//Creating tile 5 to reduce the number of tiles with few outgoing possibilities. Really works well once tile 5 is walkable.
const CUSTOM_PROBS_TILE_5 = {"0":{"up":[0,4,2],"down":[0,3],"left":[0,2,4,3,5],"right":[0,3,4,2,5]},"1":{"up":[0],"down":[3],"left":[0,1,2,4,3],"right":[1,0,2,3,4]},"2":{"up":[4,3],"down":[4,0,5],"left":[0,3,4,5],"right":[4,3,0,5]},"3":{"up":[0,5],"down":[4,2,5],"left":[0,2,3,4,5],"right":[4,3,0,2,5]},"4":{"up":[3,2,4],"down":[0,4,2,3,5],"left":[0,2,3,4,5],"right":[0,2,3,4,5]},"5":{"up":[4,2,3],"down":[0,3],"left":[0,2,4,3,5],"right":[0,3,4,2,5]}}



const CUSTOM_PROBS = CUSTOM_PROBS_TILE_5
const CUSTOM_WALKABLE = [4, 2, 5]
const CUSTOM_WARP = [2]


//two layers for collisions? Fake it with tile 5
