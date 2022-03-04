function MinWindowSubstring(stringArr) { 

    const eingabeString = stringArr[0];
    const suchString = stringArr[1];
    let result = "";
    let temp = "";
    let numSpare = 0;
    temp = stringArr[1];
    for (let numTry = suchString.length; numTry < eingabeString.length + 1; numTry++) {
        numSpare = numTry - temp.length;
        for (let i = 0; i < eingabeString.length - numTry + 1; i++) {
            for (let x = i; x < eingabeString.length; x++) {
                //Falls der Buchstabe auch im gesuchten String vorkommt
                if (temp.indexOf(eingabeString[x]) != -1) {
                    result += eingabeString[x];
                    temp = temp.replace(eingabeString[x],'');
                    if (result.length === numTry) {
                        return result;
                    }
                }
                //Falls er nicht vorkommt, wir aber noch Spare übrig haben
                else if (numSpare > 0) {
                    result += eingabeString[x];
                    numSpare--;
                }
                //Falls ein neuer Versuch gestartet werden muss
                else {
                    result = "";
                    temp = suchString;
                    numSpare = numTry - temp.length;
                    break;
                }
            }
        }  
    }
      return result; 
  }
     
  // keep this function call here 
  console.log(MinWindowSubstring(["caae", "caae"]));

  /*
  Fazit:
  Hat lange gedauert, bin mit den 3 verschachtelten Schleifen nicht ganz zufrieden.
  Muss mir die anderen Lösungen anschauen, zumindest auf eine Schleife verzichten.
  Das "for in", also foreach von JS hat mir nur den Index und nicht das Element geliefert.
  Bei Schlaufen auf das erste und letzte Element aufpassen, habe beim Aufhören einer
  Schleife ein Element zu früh aufgehört.

  Unzufrieden mit meiner O(n²) anstatt O(n) Laufzeit :|

  Die Anderen haben nicht viel bessere Lösungen, nur es öfters in Funktionen unterteilt,
  was die Lesbarkeit verbessert. Das könnte ich auch öfters tun.
  Lösungen der Anderen:
  function MinWindowSubstring(strArr) {
	let str = strArr[0];
	let needle = strArr[1].split('');

	//start with the smallest possible substrings, then go up
	for (let i = needle.length, len = str.length; i <= len; i++ ) {
		for (j = 0; j <= len - i; j++) {
			let mySlice = str.substr(j, i);
			if (isContained(mySlice)) {
				return mySlice;
			}
		}
	}
	return 'Not in string';

// ---------------------- helpers -----------------------------
	//isContained checks to see if all the chars in the needle are in the given string
	function isContained(str) {
		let arr = str.split('');
		for (let i = 0, len = needle.length; i < len; i++) {
			let place = arr.findIndex(val => {
				return val === needle[i]
			});
			if (place === -1) {
				return false;
			} else {
				arr.splice(place, 1);
			}
		}
		return true;
	}
}


  */

//Brainstormen für neue Lösung:
let start = [a,e,j,f,w,j,g,m,e,w];
let suche = {
    "j" : 0,
    "g" : 0,
    "e" : 0,
     "w" : 0
    };

//Alle egalen Buchstaben mit Nummern ersetzen
//+Anzahl an wichtigen zählen
let arb1 = [1,e,j,1,w,j,g,1,e,w];
