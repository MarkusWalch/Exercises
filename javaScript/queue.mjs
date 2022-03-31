"use strict";
import { BinaryMaxHeap } from "./binaryHeap.mjs"; 

//My notes - be carefull about properties and methodes.
//Sometimes the Intellisense doesn't get the mistake
//and I can look for bugs :/


//Get an item out of the queue is not efficient cause of O(n) runtime
//The problem is shift, maybe later I will try to improve performance
//I think size property is better than elements.length? Not sure if that is true
class Queue {
    constructor() {
        this.elements = [];
        this.size = 0;
    }
    enqueue(element) {
        this.size = this.elements.push(element);
    }
    dequeue() {
        let result = this.elements.shift();
        result ? this.size-- : this.size = 0;
        return result;
    }
    peek() {
        return (this.isEmpty() ? undefined : this.elements[this.size - 1]);
    }
    isEmpty() {
        return (this.size === 0 ? true : false);
    }
    length() {
        return this.size;
    }
}

class PriorityQueueArr extends Queue {
    constructor() {
        super();
    }
    
    /** @param {number} intPriority Higher Value means higher Priority */
    enqueue(anyElement, intPriority) {
        let item = {
            element:anyElement, priority:intPriority
        };

        this.size = this.elements.push(item);
    }
    /*
    * @returns {object} element with highest priority. 
    */
    dequeue() {
        let index = this.highestPriorityIndex();
        //splice return an array, I found no other way to remove an element in the middle
        let result = this.elements.splice(index, 1)[0];
        result ? this.size-- : this.size = 0;
        return result.element;
    }
    peek() {
        return this.elements[this.highestPriorityIndex()].element;
    }

    highestPriorityIndex() {
        let highestPriorityIndex = 0;
        let highestPriority = 0;
        for (let index in this.elements) {
            if (this.elements[index].priority > highestPriority) {
                highestPriority = this.elements[index].priority;
                highestPriorityIndex = index;
            }
        }
        return highestPriorityIndex;
    }
}

function test () {
    let snake = new Queue();
    console.log(snake.isEmpty());
    snake.enqueue("egal");
    snake.enqueue(17);
    console.log(snake);
    console.log(snake.elements);
    console.log(snake.elements.toString());
    snake.dequeue();
    console.log(snake.elements.toString());
    snake.enqueue("Weiter");
    console.log(snake.elements.toString());
    snake.peek();
    console.log(snake);
    console.log(snake.peek());
    console.log(snake.isEmpty());

    //No overloading methods with parameters in js
    console.log("Priority Queue");
    let row = new PriorityQueueArr();
    row.enqueue("Me", 10);
    console.log(row.size);
    row.enqueue("Her", 20);
    row.enqueue("Him", 298);
    row.enqueue("It", -31);
    console.log(row);
    console.log(row.dequeue());
    console.log(row);
}


//test();

export { Queue };
export { PriorityQueueArr };