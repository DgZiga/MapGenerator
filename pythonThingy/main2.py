from re import X
from PIL import Image
from PIL import ImageChops
import json
import math
import pdb

im = Image.open(r"/mnt/d/waveFunctionCollapse/img/provaIvan/ivan.png")

rows=29
cols=27
tileSize=16 #tile is 16x16

N=3
M=3

seenImages = []
tileIdCounter=0
map = []

class Tile:
    def __init__(self, id, img):
        self.id=id
        self.img=img

i=0
j=0
while i<rows:
    map.append([]) #create row
    while j<cols:
        im1 = im.crop((j*tileSize, i*tileSize, (j+1)*tileSize, (i+1)*tileSize)) #crop to a tile

        tileId=-1
        seen=0
        for seenImage in seenImages: #if the tile has already been seen, just reuse the same tileid
            if list(im1.getdata()) == list(seenImage.img.getdata()):
                seen=1
                tileId=seenImage.id

        if seen != 1: #if the tile has yet to be seen, create the img, give it an id, and append it to the seen ones
            im1.save("/mnt/d/waveFunctionCollapse/img/provaIvan/tile"+str(tileIdCounter)+".png")
            tile= Tile(tileIdCounter, im1)
            seenImages.append(tile)
            tileId = tileIdCounter
            tileIdCounter+=1

        map[i].append(tileId)

        j+=1
    i+=1
    j=0


#"map" now contains a 2d array where each position is a tile id

def serializeMap(startY, startX, endY, endX):
    y=startY
    x=startX
    out=""
    while y<=endY:
        while x<=endX:
            out+=str(map[y][x])+"."
            x+=1
        y+=1
        x=startX
    
    out = out[:-1]
    return out


offX = cols-N+1
offY = rows-M+1

output = {
    "up":   {},
    "down": {},
    "left": {},
    "right":{}
}
y=0
x=0
while y<offY:
    while x<offX:
        serializedUp = serializeMap(y+1,x,y+N-1,x+N-1)
        if(serializedUp not in output["up"]):
            output["up"][serializedUp] = []
        output["up"][serializedUp].append(serializeMap(y,x,y,x+N-1))
        
        serializedDown = serializeMap(y,x,y+N-2,x+N-1)
        if(serializedDown not in output["down"]):
            output["down"][serializedDown] = []
        output["down"][serializedDown].append(serializeMap(y+N-1,x,y+N-1,x+N-1))
        
        serializedLeft = serializeMap(y,x+1,y+N-1,x+N-1)
        if(serializedLeft not in output["left"]):
            output["left"][serializedLeft] = []
        output["left"][serializedLeft].append(serializeMap(y,x,y+N-1,x))
        
        serializedRight = serializeMap(y,x,y+N-1,x+N-2)
        if(serializedRight not in output["right"]):
            output["right"][serializedRight] = []
        output["right"][serializedRight].append(serializeMap(y,x+N-1,y+N-1,x+N-1))


        x+=1
    y+=1
    x=0

print(output)

"""
i=0
j=0
while i<rows:
    map.append([]) #create row
    while j<cols:
        im1 = im.crop((j*tileSize, i*tileSize, (j+1)*tileSize, (i+1)*tileSize)) #crop to a tile

        tileId=-1
        seen=0
        for seenImage in seenImages: #if the tile has already been seen, just reuse the same tileid
            if list(im1.getdata()) == list(seenImage.img.getdata()):
                seen=1
                tileId=seenImage.id

        if seen != 1: #if the tile has yet to be seen, create the img, give it an id, and append it to the seen ones
            im1.save("/mnt/d/waveFunctionCollapse/img/provaIvan/tile"+str(tileIdCounter)+".png")
            tile= Tile(tileIdCounter, im1)
            seenImages.append(tile)
            tileId = tileIdCounter
            tileIdCounter+=1

        map[i].append(tileId)

        j+=1
    i+=1
    j=0

print(json.dumps(tileRelationships, default=lambda x: x.__dict__))

"""
"""
{
    "up":{},
    "down":{},
    "right":{},
    "left":{
        serializedCollapsedTiles: [serializedPossibility1, serializedPossibility2]
    }
}


+---+---+---+
| 0 | 1 | 2 |
+---+---+---+
| 3 | 4 | 5 |
+---+---+---+
| 6 | 7 | 8 |
+---+---+---+

Serialization of the above is: "0.1.2.3.4.5.6.7.8" (input of serializeMap: 0,0,2,2)

+---+---+---+
| 0 | 1 |   |
+---+---+---+
| 3 | 4 |   |
+---+---+---+
| 6 | 7 |   |
+---+---+---+

Serialization of the above (example of serializedCollapsedTiles) is: "0.1.3.4.6.7" (input of serializeMap: 0,0,2,1)

+---+---+---+
|   |   | 2 |
+---+---+---+
|   |   | 5 |
+---+---+---+
|   |   | 8 |
+---+---+---+

Serialization of the above (example of serializedPossibility1) is: "2.5.8" (input of serializeMap: 0,2,2,2)

"""