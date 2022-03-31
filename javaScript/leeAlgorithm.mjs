import { Queue } from "./queue.mjs";
import { BinSearchTree, BinaryNode } from "./binarytreeConstructor.mjs";

console.log("Start with a game called FatCat:)");

const lab = [];
const discovered = [];
for (let i = 0; i < 31; i++) {
    lab[i] = new Array(23);
    discovered[i] = new Array(23);
}

function Field(x, y, direction, distance) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.distance = distance;
}

class Direction {
    static Left = new Direction(-1, 0, "left");
    static Right = new Direction(1, 0, "right");
    static Top = new Direction(0, 1, "top");
    static Down = new Direction(0, -1, "down");

    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
}

let nextFields = new Queue();

//Create lab
fillLab(lab);
//Create mouse
let mouse = new Field(14,10,"mouse", 0);
//Set cat to starting position
nextFields.enqueue(new Field(8, 19, "zero", 0));

while (!nextFields.isEmpty()) {
    let place = nextFields.dequeue();
    let potentPlace;
    let direction = place.direction;
    discovered[place.x][place.y] = true;
    //Is mouse here
    if (place.x === mouse.x && place.y === mouse.y) {
        console.log("Maus Gefunden! Sie war auf Platz " + place.x + "/" + place.y + " und " + place.distance + " Schritte weg!");
        break;
    }

    //dir is only the index, so use Direction[dir] instead of dir
    for(let dir in Direction) {
        potentPlace = new Field(place.x + Direction[dir].x, place.y + Direction[dir].y, place.direction, place.distance + 1);
        if (lab[potentPlace.x][potentPlace.y] != true && discovered[potentPlace.x][potentPlace.y] != true) {
            //Good way to safe space and brackets
            if (potentPlace.direction === "zero") potentPlace.direction = dir;
            nextFields.enqueue(potentPlace);
        }
    }
}

let a = 10;

function fillLab(labArr) {
    for (let i = 0; i < 31; i++) {
        labArr[i][0] = true;
        labArr[i][22] = true;

        labArr[i][2] = true;
        labArr[i][20] = true;

        for (let j = 0; j < 23; j++) {
            labArr[0][j] = true;
            labArr[30][j] = true;
        
            labArr[2][j] = true;
            labArr[28][j] = true; 

            if (2 < i && i < 28 && (j === 4 || j === 18 || j === 8 || j === 14 || j === 11)) {
                labArr[i][j] = true;
            }

            if (i === 7 || i === 15 || i === 23) {
                labArr[i][j] = true;
            }
        }
    }

    labArr[1][2] = undefined;
    labArr[29][2] = undefined;
    labArr[1][20] = undefined;
    labArr[29][20] = undefined;

    labArr[2][1] = undefined;
    labArr[2][21] = undefined;
    labArr[28][1] = undefined;
    labArr[28][21] = undefined;

    labArr[15][2] = undefined;
    labArr[15][20] = undefined;
    labArr[2][11] = undefined;
    labArr[28][11] = undefined;
    labArr[3][11] = undefined;
    labArr[27][11] = undefined;

    labArr[7][10] = undefined;
    labArr[7][13] = undefined;
    labArr[7][16] = undefined;

    labArr[23][10] = undefined;
    labArr[23][13] = undefined;
    labArr[23][16] = undefined;

    labArr[7][10] = undefined;
    labArr[7][13] = undefined;
    labArr[7][16] = undefined;

    labArr[7][21] = undefined;
    labArr[15][21] = undefined;
    labArr[23][21] = undefined;

    labArr[15][1] = undefined;
    labArr[15][3] = undefined;
    labArr[14][4] = undefined;
    labArr[16][4] = undefined;
    labArr[3][4] = undefined;
    labArr[27][4] = undefined;
    labArr[7][6] = undefined;
    labArr[23][6] = undefined;

    labArr[15][7] = undefined;
    labArr[15][8] = undefined;
    labArr[15][9] = undefined;

    labArr[7][19] = undefined;
    labArr[15][19] = undefined;
    labArr[23][19] = undefined;

    labArr[14][14] = undefined;
    labArr[16][14] = undefined;

    //Attention, I safe it per labArr[column][row]
    //Print I do row per row, that is why I changed the loops
    let zeile = "";
    for (let j = 0; j < 23; j++) {
        for (let i = 0; i < 31; i++) {
            if (i === 14 && j === 10) {
                zeile += "M";
                continue;
            }
            if (i === 8 && j === 19) {
                zeile += "C";
                continue;
            }
            labArr[i][j] == true ? zeile += "X" : zeile += " ";
        }
        console.log(zeile);
        zeile = "";
    }

    return labArr;
}
