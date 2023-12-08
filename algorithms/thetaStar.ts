import { NodeType } from "@/lib/types";
import {
  euclideanDistance,
  getNeighbors,
  getNeighborsForDiagonal,
  manhattanDistance,
} from "@/lib/utils";
import { Heap } from "heap-js";

export const thetaStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  console.log("Theta* started");
  console.log("Start Node: ", startNode);
  console.log("Finish Node: ", finishNode);
  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
  const openSetTracker = new Set();
  const closedSet = new Set<NodeType>();
  startNode.parent = startNode;
  startNode.gScore = 0;
  startNode.fScore = manhattanDistance(startNode, finishNode);
  startNode.isValid = true;
  openSet.push(startNode);
  const isInOpenSet = (node: NodeType) => {
    return openSetTracker.has(getNodeKey(node));
  };
  const addToOpenSet = (node: NodeType) => {
    openSet.push(node);
    openSetTracker.add(getNodeKey(node));
    console.log("Added to Open Set: ", node);
  };
  const updateVertex = (currentNode: NodeType, neighbor: NodeType) => {
    console.log(
      `Updating Vertex: CurrentNode: ${getNodeKey(
        currentNode
      )}, Neighbor: ${getNodeKey(neighbor)}`
    );
    if (currentNode.parent && lineOfSight(currentNode.parent, neighbor, grid)) {
      console.log("Line of Sight: True");
      const tempGScore =
        currentNode.parent.gScore +
        euclideanDistance(currentNode.parent, neighbor);
      if (tempGScore < neighbor.gScore) {
        console.log(
          `Updating Neighbor via Parent: ${getNodeKey(
            neighbor
          )}, New GScore: ${tempGScore}`
        );
        neighbor.gScore = tempGScore;
        neighbor.parent = currentNode.parent;
        neighbor.fScore = tempGScore + manhattanDistance(neighbor, finishNode);
        if (isInOpenSet(neighbor)) {
          console.log(
            `Neighbor already in OpenSet, updating: ${getNodeKey(neighbor)}`
          );
          // Update in OpenSet if necessary
        } else {
          console.log(`Adding Neighbor to OpenSet: ${getNodeKey(neighbor)}`);
          addToOpenSet(neighbor);
        }
      }
    } else {
      console.log("Line of Sight: False");
      const tempGScore =
        currentNode.gScore + euclideanDistance(currentNode, neighbor);
      if (tempGScore < neighbor.gScore) {
        console.log(
          `Updating Neighbor via CurrentNode: ${getNodeKey(
            neighbor
          )}, New GScore: ${tempGScore}`
        );
        neighbor.gScore = tempGScore;
        neighbor.parent = currentNode;
        neighbor.fScore = tempGScore + manhattanDistance(neighbor, finishNode);
        if (isInOpenSet(neighbor)) {
          console.log(
            `Neighbor already in OpenSet, updating: ${getNodeKey(neighbor)}`
          );
          // Update in OpenSet if necessary
        } else {
          console.log(`Adding Neighbor to OpenSet: ${getNodeKey(neighbor)}`);
          addToOpenSet(neighbor);
        }
      }
    }
  };

  while (!openSet.isEmpty()) {
    const currentNode = openSet.pop();
    console.log("Popped from Open Set: ", currentNode);

    if (!currentNode || !currentNode.isValid || currentNode.isWall) continue;

    currentNode.isVisited = true;

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      console.log("found finish node in theta*");
      return Array.from(closedSet);
    }

    closedSet.add(currentNode);
    console.log("Added to Closed Set: ", currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);
    for (const neighbor of neighbors) {
      console.log("Processing Neighbor: ", neighbor);
      if (!closedSet.has(neighbor) && !neighbor.isWall) {
        if (!isInOpenSet(neighbor)) {
          neighbor.gScore = Infinity;
          neighbor.parent = null;
        }
        updateVertex(currentNode, neighbor);
      }
    }
  }
  return [];
};

const getNodeKey = (node: NodeType) => {
  return `${node.row}-${node.col}`;
};

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
    if (x0 === x1 && y0 === y1) {
      return true;
    }
    if (
      x0 < 0 ||
      y0 < 0 ||
      x0 >= grid[0].length ||
      y0 >= grid.length ||
      grid[y0][x0].isWall
    ) {
      return false;
    }

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
