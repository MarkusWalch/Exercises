"use strict";

//angabe
const n = 5;
//diese zahl wird verwendet, damit das Ergebnis bei Fakultät nicht zu groß wird.
const zahlModulo = 10000000;

let arrResult = [n + 1];
const oben = fakultaet(n);

for (let i = 0; i < n + 1; i++) {
    let unten = (fakultaet(i) * fakultaet(n - i)) % zahlModulo;
    let factor = oben / unten;
    arrResult[i] = factor;
}

console.log(arrResult);


function fakultaet (n) {
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result = (result * i) % zahlModulo;
    }
    return result;
}