function TreeTester(strArr) { 
    
/*
Criteria a Tree has to complete to form a binary Tree
1: No more than 3 Children
2: No more than 1 Parent

This function does NOT test, if the Integer Pairs
are already a tree. So you have to test if everything
is good connected. But I will not do that here.
*/

let countChildren = new Map();
let countParents = new Map();

  for (let i = 0; i < strArr.length; i++) {
    let values = strArr[i].substr(1, strArr[i].length - 2).split(",");
    let childValue = values[0];
    let parentValue = values[1];
    if (countChildren.has(parentValue)) {
      countChildren.set(parentValue, countChildren.get(parentValue) + 1);    
      //More than 3 children, no binary Tree
      if (countChildren.get(parentValue) > 2) {
        return false;
      }  
    }
    else {
      countChildren.set(parentValue, 1);
    }
    //More than 1 parent
    if (countParents.has(childValue)) {
      return false;
    }
    else {
      countParents.set(childValue, 1);
    }
  }
  return true;
}
   
// keep this function call here 
console.log(TreeTester(["(1,2)", "(2,4)", "(7,2)"]));