# MapGenerator
Repo started out as implementation of [WFC (Wave Function Collapse) algorithm](https://github.com/mxgmn/WaveFunctionCollapse) aimed at producing pokémon maps. 
The scope has extended to being able to create playable random maps using WFC on a GBA game. 

Currently a custom tileset down-sampled from Pokémon Odyssey is loaded in, a simple algorithm finds a walkable path from one edge of the map to the other and wfc fills in the gaps


## Internal workings
This repository contains a set of [tools](#tools) hinging on the implementation of two algorithms: [Wave Function Collapse](#wave-function-collapse), and [Walkable Algorithm](#walkable-algorithm)

### Wave Function Collapse
Explaining how WFC works is not in this document scope, I'm going to anthropomorphize concepts for readability. Please refer to the [original repo](https://github.com/mxgmn/WaveFunctionCollapse) for a proper explanation. 

In simplest terms, the algorithm (or at least this implementation of the algorithm) intializes an arbitrarily sized matrix of [superpositions](#superposition), it then recursively looks for the "lowest-entropy" superposition (the one with the fewer possibilities), "collapses" it (randomly picks a possible option), and re-computes all [superpositions](#superposition) in the matrix according to the collapse result and the [superposition rules](#superposition-rules) of the tileset.

In this implementation, each tile is given an incremental id starting from 0 (tile id -1 is interpreted as a "missing tile").

#### Superposition
For our purpose, a superposition is a set of possible tiles that could be placed in a given position.   

To achieve GBA portability, a superposition is represented by a [bitmap](#https://en.wikipedia.org/wiki/Bit_array): an integer `i` such that for each tile id `n` that is included in the superposition, the `n`th bit of `i` is set (equal to 1), and all other bits are unset (equal to 0).
As an example, the superposition of tile ids 0, 3 and 4 is the integer 25, which bitwise representation is 11001:
|      tile id       | 4 | 3 | 2 | 1 | 0 |
|--------------------|---|---|---|---|---|
| superposition bits | 1 | 1 | 0 | 0 | 1 |

In this repo, the bitmap can have indefinite length[*](#serialize-superpositions-as-bitmaps), in the actual games the algorithm will be limited to 32 or 64 tiles.

#### Superposition Rules
A "Superposition rule" is a set of costraints that the graphics in the tileset imply: for example, in standard pokémon games a lava tile cannot be placed near an ocean tile, it would look wrong.
Superposition rules take the form of an allowed tiles whitelist: in the example above the ocean tile whitelist will not contain the lava tile.  

A rule is defined as a bitmap, in the exact same way as a [superposition](#superposition), where each set bit "means" that the corresponding tile is allowed

For WFC to work, each tile must define four rules: one for each cardinal direction.

##### Strict rules
A rule is defined strict when it allows for a low number of tiles.  
A common example would be multi-tiled structures, such as houses or tall trees in the base pokémon games: the tile of the tree trunk will only ever allow the tree top to be above it.

Such strict rules considerably raise the risk of [contradictions](#contradictions) arising during WFC and must be planned for accordingly. More research is needed on how exactly to optimize a tileset for these rules.

#### Interaction with Superpositions and rules
Superposition interactions with rules can be encoded as bitwise operations

Applying a rule to a superposition can be encoded as a bitwise AND
```
Superposition with possible tile ids 0, 1, 3, 4 : 11011
Rule that only allows tile ids 0, 1, 2          : 00111
AND result                                      : 00011
Superposition with possible tile ids 0, 1       : 00011
```

Stacking multiple rules from a nearby superposition can be encoded as a bitwise OR.  
Let's take for example a matrix with just two superpositions:`sl` and `sr`.
`sl` is placed to the left of `sr`.
`sl` contains tiles 0 and 1.  
Tile 0 allows for tiles 2 and 3 to its right, in other words, tile 0 right rule is: 01100
Tile 1 allows for tiles 1 and 2 to its right, in other words, tile 1 right rule is: 00110  
According to these rules, `sr` can only be one tile of 1, 2, or 3 (01110).
```
tile 0 right rule : 01100
tile 1 right rule : 00110
OR result         : 01110
sr                : 01110
```

#### Contradictions
Wave Function Collapse isn't guaranteed to complete. Quoting the [original repository](https://github.com/mxgmn/WaveFunctionCollapse):
> It may happen that during propagation all the coefficients for a certain pixel become zero. That means that the algorithm has run into a contradiction and can not continue. The problem of determining whether a certain bitmap allows other nontrivial bitmaps satisfying condition (C1) is NP-hard, so it's impossible to create a fast solution that always finishes. In practice, however, the algorithm runs into contradictions surprisingly rarely.

In my experience, [strict tileset rules](#strict-rules) are the main cause of contradictions. A higher rate of contradictions might also be a problem with my implementation.

In our implementations, when a [superposition](#superposition) is equal to 0 (in otherwords, it doesn't allow for any tile to be placed in their position), we say that the algorithm has run into a contradiction and stop.  


#### WFC Misc Findings
WFC output is highly conditioned by the [superposition rules](#superposition-rules): having different tile variations for cosmetic reasons (e.g. a grass tile, a grass tile with flowers, a grass tile with a different palette, etc...) that fulfill the same "role" (e.g. a tile you can walk on) will increase the likelihood that the same role is chosen. As a simple example, a tileset rule that allows for 3 possible "grass" tiles and one "hill" tile will lead the algorithm to choose the "grass" tiles more often, leading to relatively few hills in the final output.  
This can effectively be used as a way to manipulate the final output by introducing different amounts of tile variations.

The [superposition rules](#superposition-rules) must be explicitly curated as to produce as few [contradictions](#contradictions) as possible. Sampling from existing maps only works semi-reliably (around 1 in 5 times) for areas around 20x20 tiles: in bigger output sizes the lack of optimizations results in way too many [contradictions](#contradictions).

It might seem obvious in retrospect, but it's worth mentioning that trying to compose a bigger final output by tiling smaller indipendent implementations to avoid [contradictions](#contradictions) doesn't work.  
Take for example a combination of implementation, tileset, and rules that only works reliably in a matrix of up to 20x20 superpositions.  
If we tried to tile four 20x20 implementations to fill a 40x40 output size, it might happen that the top-left output creates a contraddiction within the top-right or the bottom-left implementation, but since each implementation is indipendent, the top-left implementation won't check the others and will terminate succesfully, leading to an irrecoverable state (the other implementations will always run into contradictions).  
The only way out of this situation is to improve the starting conditions (tileset and rules) to reliably work in bigger output sizes.

### Walkable Algorithm
WFC ensures that the tilemap is graphically cohesive, but doesn't ensure that the generated map is playable.  
To fix this, the repo implements a so-called "Walkable Algorithm": an algorithm that instructs WFC on how to compose a path the player can walk on.  
This repo in particular:
- Splits tiles into those the player can walk on (walkable) and those the player can't walk on (non-walkable)
- Generates a 2D [mask](https://en.wikipedia.org/wiki/Mask_(computing)) via an arbitrary algorithm: the mask marks each position as walkable or non-walkable
- Applies the mask to the starting superposition matrix of WFC 
- WFC [supports constraints](https://github.com/mxgmn/WaveFunctionCollapse?tab=readme-ov-file#constrained-synthesis), thanks to that the mask ensures that the final map will have a walkable path.

The "arbitrary algorithm" listed here is mainly what controls the final shape of the map. The current implementation is rushed, and the number one top priority of this repo going forward should be to improve this.

### Tools
The repo includes:
- a python utility to retrieve tilesets and rules from an existing map
- a tile rules customizer tool
- a WFC + Walkable implementation

#### Python util
The python util is a quick-and-dirty tool I used to get reasonably complex tilesets at the beginning of the project.

Requires [Pillow](https://pillow.readthedocs.io/en/stable/index.html) to execute.

The tool has four hard-coded values: 
- base image path (resulting tiles images will end up here)
- full image path
- tile size
- number of columns and rows (in tiles count)

It will load the the image path, slice it up into unique, 16x16 (hard-coded value) tiles, then for each tile it will save a png image of the tile in the base image path named `tileX.png` (where `X` is the tile id). Finally it will output to stdout the [superposition rules](#superposition-rules) for each tile.  
The rules are serialized as JSON lists insted of bitmaps because of [compilcations](#serialize-superpositions-as-bitmaps).

##### Serialize superpositions as bitmaps
I'm either really bad at python (which is plausible), or something's broken. 
This is already to be considered legacy and fixed.

Here is the context: for ease of use, in the internal python code superposition rules are encoded as dictionaries. 
At first I tried to implement a simple method to convert such dictionaries to bitmaps according to the encoding specified [above](#superposition-rules), and although I was sure the code was right, I kept getting imprecise results for arbitrary-precision bitmaps (97-bits-long bitmaps, to be specific).  
After much fiddling, I had to assume this was a python thing and I moved on. The python util to this day outputs rules as JSON-encoded dictionaries, and the js then imports the JSON objects and converts them in BigIntegers according to the encoding specified [above](#superposition-rules).

#### Tile rules customizer
The tile rules customizer is a simple util that allows the user to interact with the configured [rules](#superposition-rules).  
Internally, it is called the `tileRelationshipBuilder`, and can be opened via the `tileRelationshipBuilder/index.html` file.  
The app loads the same tileset and superposition rules as the ones used in the [implementation](#implementation)

The app main screen is divided as such:
- on the bottom right side of the screen the app displays a list of all the tiles available
    - clicking on a tile selects it as the "active" one
- on the bottom left the app displays a preview of the rules for the active tile
    - clicking on a directions selects the rule of that direction as the "active" one.
- on the upper left the app displays the active rule as a list of allowed tiles
    - clicking on a tile will remove them from the whitelist
    - clicking the green "+" icon at the end of the list will enter the "add tile mode".
        - during the add tile mode, clicking on a tile from the list at the bottom right side of the page will add that tile to the rule.
        - you can exit the mode by pressing Enter
- on the upper right corner the app displays the control panel. For now it just contains a "Print" button that prints the rules to the js console as [JSON objects](#serialize-superpositions-as-bitmaps). 


#### Implementation
The implementation page contains a simple implementation of [WFC](#wave-function-collapse) and [Walkable Algorithm](#walkable-algorithm), plus a basically legacy [paint](#paint) feature.

The tileset and rules accessed by this implementation are the same as the one the [tile rules customizer](#tile-rules-customizer)

The Walkable Algorithm implementation is accessed via the "Set Walkable" button: it runs the [Walkable Algorithm](#walkable-algorithm) and applies it as a mask on the current WFC implementation.

The WFC implementation is accessed via both the "Start" and "Reset" buttons:
- The "Reset" button just clears the current WFC superpositions map and output.
- The "Start" button runs the WFC implementation.
The implementations has two different behaviours, governed by the "debug" checkbox:
    - if debug is disabled, the algorithm will run until it either completes successfully or fails an hard-coded number of times
    - if debug is enabled, then:
        - a number detailing how many possible tiles a position can hold will be displayed on each position
        - a WFC will run step-by-step and the logging becomes more verbose. 
        - a bunch of other stuff might happen. This is a very rough feature

##### Paint
The paint feature is a rudimentary implementation that allows the user to collaps a specific position to a designated tile, usually before running WFC on the resulting matrix. WFC result will have the specific tile in the specific position and the map around will be "built around" that tile.

To collapse a superposition, first choose the target tile from the list of tiles in the green region, then input the X and Y coordinate of the designated superposition and click "Paint".

This is the first ever feature developed, and is to be considered legacy.

## Porting to GBA
TBD