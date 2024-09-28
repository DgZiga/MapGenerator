# WaveFunctionCollaps
Implementation of [wfc algorithm](https://github.com/mxgmn/WaveFunctionCollapse) aimed at producing pokémon maps.

Currently demo maps from Pokémon Odyssey are loaded in, a simple algorithm find a walkable path from one edge of the map to the other and wfc fills in the gaps

## Findings
Because the probabilities of the various possible states are not weighted, the chose tileset can and will affect the result (i.e. if we have a tileset with 4 possible "grass" tiles and one "hill" tiles, the algorithm will choose the "grass" tiles more often, leading to relatively few hills.)

## TODOS:
- tackle bigger maps (maybe tiling the map?)
    - tiling the maps doesn't work: a map could potentially create an irresolvable situation in the neighbouring mag but wouldn't have any way of knowing it
- find a better path algorithm
