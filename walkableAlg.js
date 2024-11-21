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
        const matrixH = matrix[0].length

        //draw a square
        var extraWidth = this.width-1 
        var startX = x-extraWidth
        var startY = y-extraWidth
        var endX = x+extraWidth
        var endY = y+extraWidth

        if(startX<0){startX = 0}
        if(startY<0){startY = 0}
        if(endX>=matrixW){endX = matrixW-1}
        if(endY>=matrixH){endY = matrixH-1}

        //Softness
        var softStartX = startX - this.brushSoftness.width
        var softStartY = startY - this.brushSoftness.width
        var softEndX   = endX   + this.brushSoftness.width
        var softEndY   = endY   + this.brushSoftness.width
        if(softStartX<0       ){softStartX = 0}
        if(softStartY<0       ){softStartY = 0}
        if(softEndX  >=matrixW){softEndX   = matrixW-1}
        if(softEndY  >=matrixH){softEndY   = matrixH-1}
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
        const matrixH = matrix[0].length
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
            var my = Math.ceil(y0*matrixH/100)-1
            brush.paint(matrix, mx, my)

            if (x0 === x1 && y0 === y1) break;    
            const e2 = 2 * err;
            if (e2 > -dy) { err -= dy; x0 += sx; }
            if (e2 <  dx) { err += dx; y0 += sy; }
        }

    }
}


class Ellipse{
    constructor(centerX, centerY, hRad, vRad){
        this.centerX = centerX   
        this.centerY = centerY   
        this.hRad    = hRad
        this.vRad    = vRad
    }

    //rasterize_approx(matrix, brush){
    rasterize(matrix, brush){
        const matrixW = matrix.length
        const matrixH = matrix[0].length

        // ChatGPT approximation for ellipse fill
        const h = Math.round(this.centerX * matrixW / 100);
        const k = Math.round(this.centerY * matrixH / 100);
        const a = Math.round(this.hRad    * matrixW / 100);
        const b = Math.round(this.vRad    * matrixH / 100);

        // Iterate over all rows (y-values) in the bounding box of the ellipse
        for (let y = k - b; y <= k + b; y++) {
            if (y < 0 || y >= matrixH) continue; // Skip rows outside the grid

            // Compute the x-range for this row
            const yOffset = (y - k) ** 2 / (b ** 2);
            if (yOffset > 1) continue; // Outside the ellipse

            const xRange = Math.sqrt((1 - yOffset) * a ** 2);
            const xMin = Math.max(0, Math.round(h - xRange));
            const xMax = Math.min(matrixW - 1, Math.round(h + xRange));

            // Fill all cells between xMin and xMax
            for (let x = xMin; x <= xMax; x++) {
                brush.paint(matrix, x, y);
            }
        }

    }

    //Standard Ellipse equation: (x-cX)^2 / hRad  +  (y-cY)^2 / vRad
    //For a point x,y if the above equation is =1 then the point is on the ellipse, <1 is inside it, >1 is outside
    //Precise implementation: allows to trace borders but is slower
    rasterize_precise(matrix, brush){
    //rasterize(matrix, brush){
        const matrixW = matrix.length
        const matrixH = matrix[0].length

        // Convert center and radius to grid coordinates
        // thx ChatGPT
        const h = Math.round(this.centerX * matrixW / 100);
        const k = Math.round(this.centerY * matrixH / 100);
        const a = Math.round(this.hRad    * matrixW / 100);
        const b = Math.round(this.vRad    * matrixH / 100);
    
        let x = 0;
        let y = b;
    
        // Decision parameter for region 1
        let d1 = b * b - a * a * b + 0.25 * a * a;
        let dx = 2 * b * b * x;
        let dy = 2 * a * a * y;
    
        // Region 1: Slope < -1
        while (dx < dy) {
            this.plotFilledEllipsePoints(h, k, x, y, matrix, brush);
            if (d1 < 0) {
                x++;
                dx += 2 * b * b;
                d1 += dx + b * b;
            } else {
                x++;
                y--;
                dx += 2 * b * b;
                dy -= 2 * a * a;
                d1 += dx - dy + b * b;
            }
        }
    
        // Decision parameter for region 2
        let d2 = b * b * (x + 0.5) ** 2 + a * a * (y - 1) ** 2 - a * a * b * b;
    
        // Region 2: Slope > -1
        while (y >= 0) {
            this.plotFilledEllipsePoints(h, k, x, y, matrix, brush);
            if (d2 > 0) {
                y--;
                dy -= 2 * a * a;
                d2 += a * a - dy;
            } else {
                y--;
                x++;
                dx += 2 * b * b;
                dy -= 2 * a * a;
                d2 += dx - dy + a * a;
            }
        }
    }
    
    plotFilledEllipsePoints(h, k, x, y, matrix, brush) {
        for (let i = -x; i <= x; i++) {
            brush.paint(matrix, h + i, k + y)// Fill row for Quadrants 1 and 2
            brush.paint(matrix, h + i, k - y)// Fill row for Quadrants 3 and 4
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