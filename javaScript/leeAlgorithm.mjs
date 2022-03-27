import { Queue } from "./queue.mjs";
import { BinSearchTree, BinaryNode } from "./treeConstructor.mjs";

console.log("Start :)");
let x = new Queue();

const lab = [];
const discovered = [];
for (let i = 0; i < 31; i++) {
    lab[i] = new Array(23);
    discovered[i] = new Array(23);
}

for (let i = 0; i < 31; i++) {
    lab[i][0] = true;
    lab[i][22] = true;

    lab[i][2] = true;
    lab[i][20] = true;

    for (let j = 0; j < 23; j++) {
        lab[0][j] = true;
        lab[30][j] = true;
        
        lab[2][j] = true;
        lab[28][j] = true; 
    }
}

lab[1][2] = undefined;
lab[29][2] = undefined;
lab[1][20] = undefined;
lab[29][20] = undefined;

lab[2][1] = undefined;
lab[2][21] = undefined;
lab[28][1] = undefined;
lab[28][21] = undefined;

lab[15][2] = undefined;
lab[15][20] = undefined;
lab[2][11] = undefined;
lab[2][28] = undefined;

//Attention, I safe it per lab[column][row]
//Print I do row per row, that is why I changed the loops
let zeile = "";
for (let j = 0; j < 23; j++) {
    for (let i = 0; i < 31; i++) {
        lab[i][j] == true ? zeile += "X" : zeile += " ";
    }
    console.log(zeile);
    zeile = "";
}
