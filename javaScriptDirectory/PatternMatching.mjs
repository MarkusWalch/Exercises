"use strict";

function main() {
    let tester = new MyPatternMatcher();

    tester.pattern = "abcabd";
    tester.text = "abcabcabd"

    console.log();
    console.log("Naive Search:");
    
    console.log("Pattern: " + tester._pattern);
    console.log("Text: " + tester.text);
    console.log("Ergebnis:");
    console.log("Index, AnzahlVergleiche");
    console.log(tester.naiveSearchFirstElement());

    console.log();
    console.log("Compute lps Array");
    console.log("Pattern: " + tester.pattern);
    console.log(MyPatternMatcher.createLPSArray("aabbaabbaa"));

    console.log();
    console.log("KMP-Search:");
    console.log("Pattern: " + tester._pattern);
    console.log("LPSArray:");
    console.log(MyPatternMatcher.createLPSArray(tester._pattern));
    console.log("Text: " + tester.text);
    console.log("Ergebnis:");
    console.log("Index, AnzahlVergleiche");
    console.log(tester.kmpSearchFirstElement());
    console.log();

    }

/**@class Diese Klasse enthaelt meine Algorithmen zum String-Pattern Matching */
class MyPatternMatcher {
    _text;
    _pattern;
    
    constructor(text = "Example Test", pattern = "Test") {
        this._text = text;
        this._pattern = pattern;
    }

    _valuesAreNull() {
        return (!(this._text && this._pattern));
    }

/**@returns gibt den Index des ersten gefundenen Patterns aus, -1 if not found */
/**@returns falls text oder pattern = null, return nothing */
    naiveSearchFirstElement() {
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

    /**@returns gibt den Index des ersten gefundenen Patterns aus, -1 if not found */
    /**@returns falls text oder pattern = null, return nothing */
    kmpSearchFirstElement() {
        if (this._valuesAreNull()) return;

        const lps = MyPatternMatcher.createLPSArray(this._pattern);
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
}

main();