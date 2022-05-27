"use strict";

function test() {
    let tester = new StringSearchNaive();
    let tester2 = new StringSearchKMP();
    let tester3 = new StringSearchBoyerMoore();

    let testData = {
        "abcertabcx": "abcertabcx",
        "abcabd" : "abcabcabd",
        "a" : "aaaaaa",
        "ab" : "aaacaaabdwfabab",
        "ac" : "abebebcabaac",
        "ac" : "abaa",
        "abc" : "cbcaccaabbc"
        //"abc" : "abbcaccacbaacbcaccaabbc"
    };

    tester.pattern = "abcabd";
    tester.text = "abcabcabd"
    tester2.pattern = "abcabd";
    tester2.text = "abcabcabd"
    tester3.pattern = "abcabd";
    tester3.text = "abcabcabd"

    console.log();
    console.log("Naive Search:");
    
    console.log("Pattern: " + tester._pattern);
    console.log("Text: " + tester.text);
    console.log("Ergebnis:");
    console.log("Index, AnzahlVergleiche");
    console.log(tester.SearchFirstElement());

    console.log();
    console.log("Compute lps Array");
    console.log("Pattern: " + tester2.pattern);
    console.log(StringSearchKMP.createLPSArray(tester2.pattern));

    console.log();
    console.log("KMP-Search:");
    console.log("Pattern: " + tester2._pattern);
    console.log("LPSArray:");
    console.log(StringSearchKMP.createLPSArray(tester2._pattern));
    console.log("Text: " + tester2.text);
    console.log("Ergebnis:");
    console.log("Index, AnzahlVergleiche");
    console.log(tester2.SearchFirstElement());
    console.log();

    console.log("Boyer-Moore Algorithmus:");
    console.log("Pattern: " + tester3._pattern);
    console.log("Text: " + tester3.text);
    console.log("Ergebnis:");
    console.log(tester3.SearchFirstElement());

    console.log("Preprocessing BadCharRule:");
    let temp = StringSearchBoyerMoore.createBadCharTable("AaBbCcZzAa");
    
    for (let x in testData) {
        tester3.pattern = x;
        tester3.text = testData[x];
        console.log("Pattern: " + x);
        console.log("Text: " + testData[x]);
        console.log(tester3.SearchFirstElement());
    }
}

/**@class Diese Klasse enthaelt meine Grundlagen zum Pattern Matching und den Naiven
Search Algorithmus. Andere Pattern Matching Algorithmen erben von ihr. */
class StringSearchNaive {
    _text;
    _pattern;

    constructor(text = "Example Test", pattern = "Test") {
        this._text = text;
        this._pattern = pattern;
    }

    _valuesAreNull() {
        return (!(this._text && this._pattern));
    }

    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
    }
    get pattern() {
        return this._pattern;
    }
    set pattern(pattern) {
        this._pattern = pattern;
    }

    /**@returns gibt den Index des ersten gefundenen Patterns aus, -1 if not found */
    /**@returns falls text oder pattern = null, return nothing */
    SearchFirstElement() {

        if (this._valuesAreNull()) return;
        
        let count = 0;
        let textlength = this._text.length;
        let patternlength = this._pattern.length

        for (let i = 0; i < textlength; i++) {
            for (let j = 0; j < patternlength; j++) {
                count++;
                if (this._text[i+j] === this._pattern[j]) {
                    if (j == patternlength - 1) return [i, count]
                }
                else {
                    break;
                }
            }
        }
        return [-1, count]
    }   

}

/**@class Enthaelt meinen einfachen KMP-Algorithmus */
class StringSearchKMP extends StringSearchNaive {

    constructor(text = "Example Test", pattern = "Test") {
        super(text, pattern);
    }

    /**@returns gibt den Index des ersten gefundenen Patterns aus, -1 if not found */
    /**@returns falls text oder pattern = null, return nothing */   
    SearchFirstElement() {
        if (this._valuesAreNull()) return;

        const lps = StringSearchKMP.createLPSArray(this._pattern);
        const textlength = this._text.length;
        const patternlength = this._pattern.length
        let i = 0;
        let j = 0;
        let count = 0;
        
        while (i < textlength) {
                //Letter match
                count++;
                if (this._text[i] === this._pattern[j]) {
                    i++;
                    j++;
                    if (j === patternlength) return [i-j, count]
                }
                //No match
                else {
                    if (j != 0) {    
                        j = lps[j-1]
                    }
                    else {
                        i++;
                    }
                }
        }
        
        return [-1, count];
    }

    static createLPSArray(pattern) {
        const lps = [0];
        let len = 0;
        let i = 1;
        while (i < pattern.length) {
            if (pattern[i] === pattern[len]) {
                len++;
                lps[i] = len;
                i++;
            }
            else {
                if (len != 0) len = lps[len - 1];

                else {
                    lps[i] = len;
                    i++;
                }
            } 
        }
        return lps;
    }
}

class StringSearchBoyerMoore extends StringSearchNaive {

    /**@returns gibt den Index des ersten gefundenen Patterns aus, -1 if not found */
    /**@returns falls text oder pattern = null, return nothing */   
    SearchFirstElement() {

        if (this.pattern == "abc") {
            let x = 20;
        }
        if (this._valuesAreNull()) return;

        const patternlength = this._pattern.length;
        const textlength = this._text.length;

        const badCharArr = StringSearchBoyerMoore.createBadCharTable(this.pattern);

        if (patternlength > textlength) return -1;

        //t for text, p for pattern
        let t = patternlength - 1;
        let p = patternlength - 1;
        let textIndex = 0;
        let count = 0;

        while (textIndex <= textlength - patternlength) {
            count++;
            if (this.pattern[p] === this.text[t]) {
                p--;
                t--;
                //Pattern gefunden
                if (p === -1) return [textIndex, count];
            }
            else {
                let temp = badCharArr[this.text[t].charCodeAt(0)];
                textIndex += (p - temp) > 0 ? (p - temp) : 1;
                p = patternlength - 1;
                t = textIndex + patternlength - 1;                
            }
        }
        return [-1, count];
    }

    /**@description Creates an Array with Index = ASCI Value and Value = last occurence
     * of character in the pattern
     */
    static createBadCharTable(pattern) {
        if (typeof pattern != "string") return;


        const numberOfCharacters = 256;
        const resultArray = new Array(numberOfCharacters);

        //Am Anfang alles so setzen, dass das Zeichen nicht vorkommt.
        for (let i = 0; i < numberOfCharacters; i++) {
            resultArray[i] = -1;
        }

        let index;

        for (let i = 0; i < pattern.length; i++) {
            //Der ASCI Code des Zeichens = index im Array    
            resultArray[pattern[i].charCodeAt(0)] = i;
        }

        return resultArray;
    }
}

test();