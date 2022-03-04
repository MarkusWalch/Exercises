/*
Have the function FirstReverse(str) take the str parameter being passed
and return the string in reversed order.
For example: if the input string is "Hello World and Coders" then your program
should return the string sredoC dna dlroW olleH. 
*/

function FirstReverse(str) { 
    var result = "";
    for (let i = str.length; i >= 0 ; i-- ) {
      result += str.substr(i,1);
    };
    return result; 
  
  }
     
  // keep this function call here 
  console.log(FirstReverse("Test test test"));

  /*
  Andere Lösungen waren ähnlich, hätte aber anstatt substring folgendes machen können:
      for (let i = 0; i < str.length ; i++ ) {
      result = str[i] + result;
    };

    Interessanteste Lösung war folgendes:
    function FirstReverse(string) {
  return string.split('').reverse().join('');
}
  */