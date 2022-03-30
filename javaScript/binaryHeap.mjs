"use strict";

import { BinaryNode } from "./binarytreeConstructor.mjs";

/** @class {BinaryHeap} Ein BinaryMinHeap auf Array Basis */
/** @param {size} size Number of Elements */
/** @param {nodes} nodes All elements, index 0 is empty => null value */

class BinaryMinHeap {
    constructor(selector) {
        this.nodes = [];
        this.nodes.push(null);
        this.selector = selector;
    }

    /** @description Inserts an element at the end of the Array. */
    insert(element) {
        let index = this.nodes.length;
        this.nodes.push(element);

        let parentIndex = Math.floor(index / 2);

        while (this.nodes[index] < this.nodes[parentIndex]) {
            this.swap(index, parentIndex);
            index = parentIndex;
            parentIndex = Math.floor(index / 2);
        }
    }

    /** @description Removes the topmost value at index 1. */
    /** @returns Returns the removed element */
    remove() {
        this.swap(1, this.nodes.length - 1)
        let result = this.nodes.pop()

        //Swapping until the heap is good again
        let index = 1;
        let child1 = 2;
        let child2 = 3;
    
        while (this.nodes[index] > this.nodes[child1] || this.nodes[index] > this.nodes[child2]) {
            if (this.nodes[child1] < this.nodes[child2]) {
                this.swap(index, child1)
                index = child1;
            }
            else {
                this.swap(index, child2);
                index = child2;
            }
            child1 = index * 2;
            child2 = child1 + 1;

            //Over boundary of array
            if (child2 > this.nodes.length) break;
        }
        
        return result;
    }

    isEmpty() {
        return (this.nodes.length < 2 ? true : false);
    }
    peek() {
        return (this.isEmpty() ? null : this.nodes[1]);
    }
    
    /** @param {integer} index1 first element to swap */
    /** @param {integer} index2 second element to swap */
    swap(index1, index2) {
        let temp = this.nodes[index1];
        this.nodes[index1] = this.nodes[index2];
        this.nodes[index2] = temp;
    }
}

function test() {
    let test = new BinaryMinHeap();
    //10 elements
    test.insert(10);
    test.insert(20);
    test.insert(5);
    test.insert(8);

    test.insert(19);
    test.insert(12);
    test.insert(199);
    test.insert(32);

    test.insert(3);
    test.insert(1000);

    test.remove();

    test.insert(1);

    let a = 10;
}

test();

export { BinaryMinHeap };

