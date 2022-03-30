"use strict";
import { Queue } from "./queue.mjs";

function TreeConstructor(strArr) {
    
    let queue = new Queue();
    queue.enqueue(12);

    let tree = new BinSearchTree();

    tree.add(5);
    tree.add(3);
    tree.add(10);
    tree.add(15);

    tree.add(8);
    tree.add(9);
    tree.add(7);
    tree.add(13);
    tree.add(17);
    tree.add(16);

    console.log(tree.getMax(tree.root.left));
    tree.pop(10);
    console.log(tree.getMax());
    console.log(tree.getMin(tree.root.right));
    console.log(tree.getMin());
    
    console.log("TraverseInOrder: left, parent, right");
    const inOrder = tree.traverseInOrder();
    let x;
    while (x = inOrder.next().value) {
        console.log(x);
    }

    console.log("TraverseReverseOrder: right, parent, left");
    const reverseOrder = tree.traverseReverseOrder();
    while (x = reverseOrder.next().value) {
        console.log(x);
    }

    console.log("TraversePostOrder: left, right, parent");
    const postOrder = tree.traversePostOrder();
    while (x = postOrder.next().value) {
        console.log(x);
    }

    console.log("TraversePreOrder: parent, left, right");
    const preOrder = tree.traversePreOrder();
    while (x = preOrder.next().value) {
        console.log(x);
    }

    console.log("BFS - Each depth finished, then next one - a queue is needed");
    const bfs = tree.bfs();
    while (x = bfs.next().value) {
        console.log(x);
    }
}

export class BinSearchTree {
/*Properties of a tree
Top-most-node = root
node with no children = leaf/terminal node
height => leaf = 0, root node = steps from leaf to root node
depth => root node = 0, leaf = steps from root to leaf
*/

    constructor() {
        this.root = null;
        this.size = 0;
    }

    add(value) {
        //Insert root node
        if (this.root == null) {
            this.root = new BinaryNode(value);
            return;
        }
        //No problem calling a function that will be
        //defined later
        //If number is already in there
        if (this.find(value)) {
            console.log("Der Wert " + value + " kommt doppelt vor, ich mache nichts!");
            return;
        }

        let node = this.root;
        //Get the last node with the right empty child slot
        //I never set the parent property, maybe later set/get methods
        while (this.nextNode(value, node)) {
            node = this.nextNode(value, node);       
        }
        value < node.value ? node.left = new BinaryNode(value, node) : node.right = new BinaryNode(value, node);
    }

    find(value) {
        if (this.root.value == value) {
            return this.root;
        }
        let node = this.root;
        while(this.nextNode(value, node)) {
            if ((node = this.nextNode(value, node)).value == value) {
                return node;
            }
        }
        return null;
    }

    pop(value) {
        let node;
        let result;
        //No value found
        if (!(node = this.find(value))) {
            console.log("Could not find value " + value + " in the tree!");
            result = null;
        }

        //No child node
        if (!node.left && !node.right) {
            node.parent.left.value == value ? node.parent.left = null : node.parent.right = null;
            result = node.value;
            node.parent = null; 
            node.value = null;
            node = null;
        }

        //2 child nodes
        else if (node.left && node.right) {
            //Right child will move up, need to check if right child has two children two => recursive
            //Need to replace the child with the closest value either higher or lower
            //closest higher value = take first right child from note, then always left
            result = node.value;
            node.value = this.pop(this.getMin(node.right));
        }

        //1 child node
        else if (node.left) {
            node.left.parent = node.parent;
            node.parent.left.value == value ? node.parent.left = node.left : node.parent.right = node.left;
            result = node.value;
            node.parent = null;
            node.value = null;
            node.left = null;
            node = null;       
        }
        else if (node.right) {
            node.right.parent = node.parent;
            node.parent.left.value == value ? node.parent.left = node.right : node.parent.right = node.right;
            result = node.value;
            node.parent = null;
            node.value = null;
            node.right = null;
            node = null;           
        }
        return result;
    }    

    getMax(node = this.root) {
        while (node.right) {
            node = node.right;
        }
        return node.value;
    }

    getMin(node = this.root) {
        while (node.left) {
            node = node.left;
        }
        return node.value;
    }

    nextNode(value, node) {
        if (value < node.value) {
            return node.left;
        }
        else {
            return node.right;
        }
    }

    //generator-function - my first try
    * traverseInOrder(node = this.root) {
        if (node.left) { yield* this.traverseInOrder(node.left); }
        yield node;
        if (node.right) { yield* this.traverseInOrder(node.right); }
    }

    * traverseReverseOrder(node = this.root) {
        if (node.right) { yield* this.traverseReverseOrder(node.right); }
        yield node;
        if (node.left) { yield* this.traverseReverseOrder(node.left); }
    } 

    * traversePostOrder(node = this.root) {
    if (node.left) { yield* this.traversePostOrder(node.left); }
    if (node.right) { yield* this.traversePostOrder(node.right); }
    yield node;
    } 

    * traversePreOrder(node = this.root) {
        yield node;
        if (node.left) { yield* this.traversePreOrder(node.left); }
        if (node.right) { yield* this.traversePreOrder(node.right); }
    }

    * bfs() {
        const queue = new Queue();

        queue.enqueue(this.root);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();
            yield node;
            if (node.left) {
                queue.enqueue(node.left);
            }
            if (node.right) {
                queue.enqueue(node.right);
            }
        }
    }
}

export class BinaryNode {    //Binary Tree
    // Das # bedeutet private deklariert
    // Private können nur am Anfang deklariert werden
    #left;
    #right;
    #parent;

    constructor(value, parent = null) {
        this.value = value;
        this.#left = null;
        this.#right = null;
        this.#parent = parent;
    }

    //No check if I override an old value
    get left() {
        return this.#left;
    }
    //Note for me - name of variable and method should have different names
    //Otherwise with this.left = node; you would make an infinite loop
    set left(node) {
        this.#left = node;
    }
    get right() {
        return this.#right;
    }
    set right(node) {
        this.#right = node;
    }
    get parent() {
        return this.#parent;
    }
    set parent(node) {
        this.#parent = node;
    }
}

//keep this function call here 
//console.log(TreeConstructor(["(1,2)", "(2,4)", "(7,2)"]));