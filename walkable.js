var walkables_coords = [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10],[1,11],[1,12],[1,13]]



function paint_walkables() {
    for(coords of walkables_coords){
        set_superposition(coords[0],coords[1],WALKABLE_TILES)
    }
    renderOutput();
}