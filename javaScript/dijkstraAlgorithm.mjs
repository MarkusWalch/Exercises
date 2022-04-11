"use strict";

import { PriorityQueueLow } from "./queue.mjs";

console.log("Start with the Dijkstra Algorithm :)");
console.log("I need to get some sample/test data later on!");

const graph = {
    S: { A:5, B:2},
    A: { S:1, C:4, D:2},
    B: { A:8, D:7},
    C: { D:6, Z:3},
    D: { Z:1 },
    Z: {},
    F: { K:4 },
    K: { F:5}
};

let unvisitedNodes = generateUnvisitedNodes(graph);
let predecessors = {};

//Choose Nodes
const startNode = "S";
const finishNode = "F";
unvisitedNodes.setpriority(startNode, 0);

const result = myDijkstraCompute(unvisitedNodes, graph, predecessors);

console.log("Die kürzeste Strecke von " + startNode + " bis " + finishNode + 
" beträgt " + result[finishNode] + ".");
console.log("Wegstrecke:" + printRoute(startNode, finishNode, predecessors));




/**@returns {PriorityQueueLow}  Generiert eine Liste aller nicht besuchten Nodes.*/
function generateUnvisitedNodes(graph) {
    let unvisitedNodes = new PriorityQueueLow();
    Object.keys(graph).forEach((element) => {
        unvisitedNodes.enqueue(element, Number.MAX_VALUE);
    });
    return unvisitedNodes;
}

/**@description Berechnet den kürzesten Weg, Ergebnis ist in predecessors und im return */
/**@param {PriorityQueueLow} unvisitedNodes Objects with name, predecessor and totalDistance  */
/**@returns {Object} Name der Node und deren kürzeste Strecke als object properties. */
function myDijkstraCompute(unvisitedNodes, graph, predecessors) {
    //Think again about the data structure
    //Do I really wanna use the priorityQueue with Array Basis?
    //Accessing these elements is a problem
let currentNode;
let neighbours;
let result = {};

    while (!unvisitedNodes.isEmpty()) {
        //test mid-result
        console.log(unvisitedNodes);

        currentNode = unvisitedNodes.dequeue();
        result[currentNode.element] = currentNode.priority;
        neighbours = graph[currentNode.element]; 

        for (const item in neighbours) {
            let neighbour;
            let potentPriority;
            if (neighbour = unvisitedNodes.findElement(item)) {
                potentPriority = neighbours[item] + currentNode.priority
                if (neighbour.priority > potentPriority) {
                    neighbour.priority = potentPriority; 
                    predecessors[item] = currentNode.element; 
                }
            }
        }
    }

    for (let nodeName in result) {
        if (result[nodeName] === Number.MAX_VALUE) predecessors[nodeName] = "Never Reached";
    }
    //test result
    console.log("result");
    console.log(result);
    console.log("Predecessors");
    console.log(predecessors);

    return result;
}

/**@returns {string} route from start to finish Node as a string. */
function printRoute(startNode, finishNode, predecessors) {
    let result = " ";
    let location = finishNode;

    if (predecessors[finishNode] == "Never Reached")
    {
        return " Achtung - " + finishNode + " ist von " + startNode + " aus nie erreichbar!";
    }

    while (location != startNode) {
        result += location + " - ";
        location = predecessors[location];
    }
    result += location;

    return result;
}

