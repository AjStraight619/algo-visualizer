import { NodeType } from "@/lib/types";
import {
  euclideanDistance,
  getNeighbors,
  getNeighborsForDiagonal,
  manhattanDistance,
} from "@/lib/utils";
import Heap from "heap-js";

export const thetaStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  const heuristic = manhattanDistance;
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, finishNode);
  startNode.parent = startNode;

  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
  const openSetTracker = new Map<string, NodeType>();
  openSet.push(startNode);

  const closedSet = new Set<NodeType>();

  while (!openSet.isEmpty()) {
    const currentNode = openSet.pop();
    if (!currentNode) {
      return [];
    }

    if (currentNode.isWall) continue;

    currentNode.isVisited = true;

    if (
      currentNode.row === finishNode.row &&
      currentNode.col === finishNode.col
    ) {
      return Array.from(closedSet);
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (const neighbor of neighbors) {
      if (!closedSet.has(neighbor)) {
        if (!openSetTracker.has(getNodeKey(neighbor))) {
          neighbor.gScore = Infinity;
          neighbor.parent = null;
        }
        updateVertex(
          currentNode,
          neighbor,
          openSet,
          openSetTracker,
          finishNode,
          grid,
          allowDiagonal
        );
      }
    }
  }
  return [];
};

const getNodeKey = (node: NodeType) => `${node.row}-${node.col}`;

const lineOfSight = (
  nodeA: NodeType,
  nodeB: NodeType,
  grid: NodeType[][],
  allowDiagonal: boolean
): boolean => {
  let x0 = nodeA.col;
  let y0 = nodeA.row;
  let x1 = nodeB.col;
  let y1 = nodeB.row;

  const dx = Math.abs(x1 - x0);
  const dy = Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    // If diagonal movement is not allowed, skip diagonal LOS checks
    if (!allowDiagonal && x0 !== x1 && y0 !== y1) return false;

    if (x0 === x1 && y0 === y1) break;
    if (grid[y0][x0].isWall) return false; // Check for wall

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x0 += sx;
    }
    if (e2 < dx) {
      err += dx;
      y0 += sy;
    }
  }

  return true;
};

const updateVertex = (
  currentNode: NodeType,
  neighbor: NodeType,
  openSet: Heap<NodeType>,
  openSetTracker: Map<string, NodeType>,
  finishNode: NodeType,
  grid: NodeType[][],
  allowDiagonal: boolean
) => {
  const parentOfCurrent = currentNode.parent;
  if (
    parentOfCurrent &&
    lineOfSight(parentOfCurrent, neighbor, grid, allowDiagonal)
  ) {
    const tempGScore =
      parentOfCurrent.gScore + manhattanDistance(parentOfCurrent, neighbor);
    if (tempGScore < neighbor.gScore) {
      neighbor.gScore = tempGScore;
      neighbor.parent = parentOfCurrent;
      neighbor.fScore = tempGScore + manhattanDistance(neighbor, finishNode);
      if (openSetTracker.has(getNodeKey(neighbor))) {
        openSet.remove(neighbor, isEqualNodeType);
        openSet.push(neighbor);
      } else {
        addToOpenSet(neighbor, openSet, openSetTracker);
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
        addToOpenSet(neighbor, openSet, openSetTracker);
      }
    }
  }
};

const addToOpenSet = (
  node: NodeType,
  openSet: Heap<NodeType>,
  openSetTracker: Map<string, NodeType>
) => {
  openSet.push(node);
  openSetTracker.set(getNodeKey(node), node);
};

const isEqualNodeType = (a: NodeType, b: NodeType) =>
  a.row === b.row && a.col === b.col;
