from PIL import Image
from PIL import ImageChops
import json
import math
import pdb

srcFolder = r"img/quintoStrato"
img = srcFolder+r"/Fifth_Stratum.bmp"

im = Image.open(img)





#ivan
#rows=29
#cols=27

#second stratum
#rows=80
#cols=85

#fifth stratum
rows=60
cols=60
tileSize=16 #tile is 16x16

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
            im1.save(srcFolder+"/tile"+str(tileIdCounter)+".png")
            tile= Tile(tileIdCounter, im1)
            seenImages.append(tile)
            tileId = tileIdCounter
            tileIdCounter+=1

        map[i].append(tileId)

        j+=1
    i+=1
    j=0


#"map" now contains a 2d array where each position is a tile id


class TileRelationship:
    def __init__(self):
        self.up   =[]
        self.down =[]
        self.left =[]
        self.right=[]

tileRelationships = {}
tileId=0
while tileId<tileIdCounter:#for each tile id
    i=0
    j=0
    while i<rows:
        while j<cols:

            if map[i][j]==tileId:
                rel=tileRelationships.get(tileId, "")
                if rel == "":
                    tileRelationships[tileId] = TileRelationship()
                    rel = tileRelationships[tileId]
                
                if i>0:
                    rel.up.append(map[i-1][j])
                if i<rows-1:
                    rel.down.append(map[i+1][j])
                if j>0:
                    rel.left.append(map[i][j-1])
                if j<cols-1:
                    rel.right.append(map[i][j+1])

            j+=1

        i+=1
        j=0

    tileId+=1

#print(map)
#print()
#print()
#print()
print(json.dumps(tileRelationships, default=lambda x: x.__dict__))
#print()
#print()
#print()
#print()

#tileRelationships dict now may contain multiple entries of the same tile for each id, the last step is to convert them into bitmaps

powersOf2 = {}
iterator = range(tileIdCounter+1)
for i in iterator:
    powersOf2[i] = int(math.pow(2,i))
    
print(json.dumps(powersOf2, default=lambda x: x.__dict__))

# doesnt work: python doesnt know how to handle big numbers, although it says it does:
#  >>> 39969865730104624 + int(math.pow(2,62))
#  4651655884157492224
#  >>> 39969865730104624 + int(4611686018427387904)
#  4651655884157492528
#  >>> int(math.pow(2,62))
#  4611686018427387904
def normalizeProbabilityList(input, log=0):
    if(log != 0):
        print("Start bitmap population")
    bitmap = int(0)
    for entry in input:
        p = 2**entry #powersOf2[entry]     #int(math.pow(2,entry))
        old = bitmap
        bitmap |= 2**entry
        if(log != 0):
            if(old != bitmap):
                print('{:.0f}'.format(old) +" | "+'{:.0f}'.format(p) +" = "+ '{:.0f}'.format(bitmap))
            print("bitmap "+'{:.0f}'.format(bitmap)+" augmented with "+'{:.0f}'.format(p)+", derived from: "+str(entry)+", bitmap: "+"{0:b}".format(bitmap))

    return bitmap


def univoci(input):
    output = []
    for entry in input:
        if(entry in output):
            continue
        output.append(entry)
    return output


tileId=0
while tileId<tileIdCounter: #for each tile id
    rel=tileRelationships[tileId]
    #commentati, visto che python non sa gestirsi i numeri
    #rel.up    = '{:.0f}'.format(normalizeProbabilityList(rel.up))
    #rel.down  = '{:.0f}'.format(normalizeProbabilityList(rel.down))
    #rel.left  = '{:.0f}'.format(normalizeProbabilityList(rel.left, 1 if tileId==5 else 0))
    #rel.right = '{:.0f}'.format(normalizeProbabilityList(rel.right))
    rel.up    = univoci(rel.up)
    rel.down  = univoci(rel.down)
    rel.left  = univoci(rel.left)
    rel.right = univoci(rel.right)
    tileId+=1

print()
print()
print()
print(json.dumps(tileRelationships, default=lambda x: x.__dict__))

"""
tile Adjacencies are defined as a n-bit number (bitmap), where each bit corresponds to a tileset, subtracting becomes as simple as a bitwise NAND, adding is bitwise OR.
Because they have to be serialized into JSON, they will be represented as Strings 

{
    tileId:{
        "up":"bitmap",
        "down":"bitmap",
        "right":"bitmap",
        "left":"bitmap"
    }
}
"""