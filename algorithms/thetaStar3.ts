import { NodeType } from "@/lib/types";
import {
  euclideanDistance,
  getNeighbors,
  getNeighborsForDiagonal,
  manhattanDistance,
} from "@/lib/utils";
import Heap from "heap-js";

const customComparator = (a: NodeType, b: NodeType) => a.fScore - b.fScore;
const isEqualNodeType = (a: NodeType, b: NodeType) =>
  a.row === b.row && a.col === b.col;

export const thetaStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  console.log("Theta* started");
  console.log("Start Node: ", startNode);
  console.log("Finish Node: ", finishNode);

  const openSet = new Heap(customComparator);
  const openSetTracker = new Map();
  const closedSet = new Set();

  startNode.gScore = 0;
  startNode.fScore = manhattanDistance(startNode, finishNode);
  startNode.parent = startNode;
  openSet.push(startNode);
  openSetTracker.set(getNodeKey(startNode), startNode);

  const addToOpenSet = (node: NodeType) => {
    openSet.push(node);
    openSetTracker.set(getNodeKey(node), node);
  };

  const updateVertex = (currentNode: NodeType, neighbor: NodeType) => {
    if (
      currentNode.parent !== null &&
      lineOfSight(currentNode.parent, neighbor, grid)
    ) {
      const tempGScore =
        currentNode.parent.gScore +
        euclideanDistance(currentNode.parent, neighbor);
      if (tempGScore < neighbor.gScore) {
        neighbor.gScore = tempGScore;
        neighbor.parent = currentNode.parent;
        neighbor.fScore = tempGScore + manhattanDistance(neighbor, finishNode);

        if (openSetTracker.has(getNodeKey(neighbor))) {
          openSet.remove(neighbor, isEqualNodeType);
          openSet.push(neighbor);
        } else {
          addToOpenSet(neighbor);
        }
      }
    } else {
      const tempGScore =
        currentNode.gScore + euclideanDistance(currentNode, neighbor);
      if (tempGScore < neighbor.gScore) {
        neighbor.gScore = tempGScore;
        neighbor.parent = currentNode;
        neighbor.fScore = tempGScore + manhattanDistance(neighbor, finishNode);

        if (openSetTracker.has(getNodeKey(neighbor))) {
          openSet.remove(neighbor, isEqualNodeType);
          openSet.push(neighbor);
        } else {
          addToOpenSet(neighbor);
        }
      }
    }
  };

  while (!openSet.isEmpty()) {
    const currentNode = openSet.pop();
    if (!currentNode) return;
    openSetTracker.delete(getNodeKey(currentNode));

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;

    if (currentNode === finishNode) {
      // Return here if the finish node is found
      return [];
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;

      if (!openSetTracker.has(getNodeKey(neighbor))) {
        neighbor.gScore = Infinity;
        neighbor.fScore = Infinity;
        neighbor.parent = null;
      }
      updateVertex(currentNode, neighbor);
    }
  }

  // If path not found, return; you may choose to handle this differently
  return [];
};

const getNodeKey = (node: NodeType) => `${node.row}-${node.col}`;

const lineOfSight = (nodeA: NodeType, nodeB: NodeType, grid: NodeType[][]) => {
  let x0 = nodeA.col;
  let y0 = nodeA.row;
  let x1 = nodeB.col;
  let y1 = nodeB.row;
  let dx = Math.abs(x1 - x0);
  let dy = Math.abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    if (x0 === x1 && y0 === y1) return true;
    if (
      x0 < 0 ||
      y0 < 0 ||
      x0 >= grid[0].length ||
      y0 >= grid.length ||
      grid[y0][x0].isWall
    )
      return false;

    let e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }
};
