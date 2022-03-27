"use strict";
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
}

export { Queue };