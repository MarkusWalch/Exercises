"use strict";

function TreeConstructor(strArr) {

    //Extra erstellen ist sinnlos, mache ich halt :)
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
    
    


    return false;
}

class BinSearchTree {
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

    //Function found online with helper function
    remove2(value) {
            const nodeToRemove = this.find(value);
            if (!nodeToRemove) return false;
          
            // Combine left and right children into one subtree without nodeToRemove
            const nodeToRemoveChildren = this.combineLeftIntoRightSubtree(nodeToRemove);
          
            if (nodeToRemove.meta.multiplicity && nodeToRemove.meta.multiplicity > 1) {
              nodeToRemove.meta.multiplicity -= 1; // handle duplicated
            } else if (nodeToRemove === this.root) {
              // Replace (root) node to delete with the combined subtree.
              this.root = nodeToRemoveChildren;
              this.root.parent = null; // clearing up old parent
            } else {
              const side = nodeToRemove.isParentLeftChild ? 'left' : 'right';
              const { parent } = nodeToRemove; // get parent
              // Replace node to delete with the combined subtree.
              parent[side] = nodeToRemoveChildren;
            }
          
            this.size -= 1;
            return true;
    }

    //helper function found online
    combineLeftIntoRightSubtree(node) {
        if (node.right) {
          const leftmost = this.getLeftmost(node.right);
          leftmost.left = node.left;
          return node.right;
        }
        return node.left;
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
}
class BinaryNode {    //Binary Tree
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

// keep this function call here 
console.log(TreeConstructor(["(1,2)", "(2,4)", "(7,2)"]));