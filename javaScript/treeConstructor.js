"use strict";

function TreeConstructor(strArr) {


    let a = new node(1);
    let b = new node(5);
    let c = new node(10);


    console.log();
    //B ist der ChildNode von A
    a.left = b;
    console.log(a.left);
    console.log(a);
    console.log(b);


    return false;
}

class node {
    constructor(value) {
        this.value = value;
        this._left = null;
        this._right = null;
        this._parent = null;
    }

    get left() {
        return this._left;
    }
    set left(node) {
        this._left = node;
        if (node) {
            node.parent = this;
          }
    }
    get right() {
        return this._right;
    }
    set right(node) {
        this._right = node;
        if (node) {
            node.parent = this;
          }
    }
    
}

// keep this function call here 
console.log(TreeConstructor(["(1,2)", "(2,4)", "(7,2)"]));