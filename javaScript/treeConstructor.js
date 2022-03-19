"use strict";

function TreeConstructor(strArr) {


    let a = new BinaryNode(1);
    let b = new BinaryNode(5);
    let c = new BinaryNode(10);
    let d = new BinaryNode(5);
    let tree = new BinSearchTree();

    tree.add(b.value);
    tree.add(a.value);
    tree.add(c.value);

    tree.add(d.value);

    console.log(tree);
    console.log();
    console.log();
    console.log();
    
    


    return false;
}

class BinSearchTree {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    add(value) {
        if (this.root == null) {
            this.root = new BinaryNode(value);
            return;
        }

        if (this.find(value)) {
            console.log("Der Wert " + value + " kommt doppelt vor, ich mache nichts!");
            return;
        }

        let node = this.root;
        while (this.nextNode(value, node)) {
            node = this.nextNode(value, node);       
        }
        value < node.value ? node.left = new BinaryNode(value) : node.right = new BinaryNode(value);
    }

    find(value) {
        if (this.root.value == value) {
            return true;
        }
        let node = this.root;
        while(this.nextNode(value, node)) {
            if ((node = this.nextNode(value, node)) == value) {
                return true;
            }
        }
        return false;
    }

    remove(value) {}
    getMax() {}
    getMin() {}

    nextNode(value, node) {
        if (value < node.value) {
            return node.left;
        }
        else {
            return node.right;
        }
    }
}
class BinaryNode {    //Binary Tree
    // Das # bedeutet private deklariert
    // Private können nur am Anfang deklariert werden
    #left;
    #right;
    #parent;

    constructor(value) {
        this.value = value;
        this.#left = null;
        this.#right = null;
        this.#parent = null;
    }

    get left() {
        return this.#left;
    }
    //Note for me - name of variable and method should have different names
    //Otherwise with this.left = node; you would make an infinite loop
    set left(node) {
        this.#left = node;
//        if (node) {
//            node.parent = this;
//          }
    }
    get right() {
        return this.#right;
    }
    set right(node) {
        this.#right = node;
//        if (node) {
//            node.parent = this;
//          }
    }

    get parent() {
        return this.#parent;
    }

    set parent(node) {
        this.#parent = node;
/*
        if (node) {
            if (node.left == null) {
                node.left = this;
            }
            else if (node.right == null) {
                node.right = this;
            }
            else {
                console.log("Die Node " + node.value + " hat schon 2 children!");
            }
        }
*/
    }
}

// keep this function call here 
console.log(TreeConstructor(["(1,2)", "(2,4)", "(7,2)"]));