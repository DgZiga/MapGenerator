/* This implementation uses two coordinate systems: Vector space and Matrix space
 * Vector space has possible coordinates going from 1 to 100. It is used for vectorial objects such as Vectors and Bezier Curves
 * Matrix space is basically the WFC input matrix. 
 * The code scales and overlaps Vector space objects to the Matrix space, and changes the Matrix space accordingly. This process is called "Rasterization"
 * 
 * A Brush defines how the Matrix space is changed, in particular it defines:
 * - the superposition that all Matrix cells must be set to if any Vector object overlaps them
 * - the width of the stroke
 * - an optional softness option, which will smooth the edges
 */
class Brush{
    constructor(superposition, width, brushSoftness=new BrushSoftness(0,0)){
        this.superposition= superposition
        this.width        = width
        this.brushSoftness= brushSoftness
    }

    paint(matrix, x, y){
        const matrixW = matrix.length
        const matrixY = matrix[0].length

        //draw a square
        var extraWidth = this.width-1 
        var startX = x-extraWidth
        var startY = y-extraWidth
        var endX = x+extraWidth
        var endY = y+extraWidth

        if(startX<0){startX = 0}
        if(startY<0){startY = 0}
        if(endX>=matrixW){endX = matrixW-1}
        if(endY>=matrixY){endY = matrixY-1}

        //Softness
        var softStartX = startX - this.brushSoftness.width
        var softStartY = startY - this.brushSoftness.width
        var softEndX   = endX   + this.brushSoftness.width
        var softEndY   = endY   + this.brushSoftness.width
        if(softStartX<0       ){softStartX = 0}
        if(softStartY<0       ){softStartY = 0}
        if(softEndX  >=matrixW){softEndX   = matrixW-1}
        if(softEndY  >=matrixY){softEndY   = matrixY-1}
        for(var i=softStartX; i<=softEndX; i++){
            for(var j=softStartY; j<=softEndY; j++){
                if(matrix[i][j] != this.superposition){
                    matrix[i][j] = this.brushSoftness.superposition
                    setSemiPaintedCoords(new Coord(i, j))
                }
            }
        }

        for(var i=startX; i<=endX; i++){
            for(var j=startY; j<=endY; j++){
                matrix[i][j] = this.superposition
                setPaintedCoords(new Coord(i, j))
            }
        }



    }
}
class BrushSoftness{
    constructor(superposition, width){
        this.superposition= superposition
        this.width        = width
    }
}

const { abs, sign } = Math;
//Vector coordinates are expressed in a 1-100 coordinate system that has to be translated to the wfc matrix
class Vector{
    constructor(fromX, fromY, toX, toY){
        this.from= new Coord(fromX, fromY)
        this.to  = new Coord(toX  , toY)
    }

    rasterize(matrix, brush){
        const matrixW = matrix.length
        const matrixY = matrix[0].length
        //Bresenham's line algorithm taken from SO: https://stackoverflow.com/questions/4672279/bresenham-algorithm-in-javascript
        var x0 = this.from.x
        var y0 = this.from.y
        var x1 = this.to.x
        var y1 = this.to.y
        
        const dx = abs (x1 - x0);
        const dy = abs (y1 - y0);
        const sx = sign(x1 - x0);
        const sy = sign(y1 - y0);
        let err = dx - dy;  
        while (true) {
            //scale x0 y0 to matrix coords
            var mx = Math.ceil(x0*matrixW/100)-1
            var my = Math.ceil(y0*matrixY/100)-1
            brush.paint(matrix, mx, my)

            if (x0 === x1 && y0 === y1) break;    
            const e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 <  dx) { err += dx; y0 += sy; }
        }

    }
}


/* code from chatgpt for bezier curve 

function rasterizeBezierCurve(gridWidth, gridHeight, points, steps = 100) {
    const cells = [];

    // Helper function to evaluate a cubic Bézier curve
    function evaluateBezier(t, p0, p1, p2, p3) {
        const u = 1 - t;
        return [
            u ** 3 * p0[0] + 3 * u ** 2 * t * p1[0] + 3 * u * t ** 2 * p2[0] + t ** 3 * p3[0],
            u ** 3 * p0[1] + 3 * u ** 2 * t * p1[1] + 3 * u * t ** 2 * p2[1] + t ** 3 * p3[1],
        ];
    }

    // Sample the Bézier curve
    const sampledPoints = [];
    for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        sampledPoints.push(evaluateBezier(t, ...points));
    }

    // Map sampled points to the grid resolution
    const gridPoints = sampledPoints.map(([x, y]) => [
        Math.round(x * gridWidth),
        Math.round(y * gridHeight),
    ]);

    // Rasterize each line segment between sampled points
    for (let i = 0; i < gridPoints.length - 1; i++) {
        const [x0, y0] = gridPoints[i];
        const [x1, y1] = gridPoints[i + 1];
        cells.push(...bresenhamLine(x0, y0, x1, y1)); // Use Bresenham's Line Algorithm
    }

    return Array.from(new Set(cells.map(JSON.stringify))).map(JSON.parse); // Remove duplicates
}

// Example Bresenham's Line Algorithm (from before)
function bresenhamLine(x0, y0, x1, y1) {
    const cells = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
        cells.push([x0, y0]); // Add current grid cell
        if (x0 === x1 && y0 === y1) break; // Reached endpoint
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy;
            x0 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y0 += sy;
        }
    }

    return cells;
}

// Example Usage
const gridWidth = 10;
const gridHeight = 10;

// Define control points for the cubic Bézier curve
const points = [
    [0.1, 0.1], // P0
    [0.3, 0.7], // P1
    [0.7, 0.3], // P2
    [0.9, 0.9], // P3
];

const bezierCells = rasterizeBezierCurve(gridWidth, gridHeight, points);
console.log(bezierCells);


*/