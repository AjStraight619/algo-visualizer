import { NodeType } from "@/lib/types";
import {
  getNeighbors,
  getNeighborsForDiagonal,
  manhattanDistance,
} from "@/lib/utils";

import { Heap } from "heap-js";
export const greedyBFS = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal: boolean
) => {
  startNode.distance = 0;

  const openSet = new Heap<NodeType>((a, b) => a.distance - b.distance);
  const closedSet = new Set<NodeType>();

  openSet.push(startNode);

  while (!openSet.isEmpty()) {
    const currentNode = openSet.pop();

    if (!currentNode) {
      break;
    }

    if (currentNode === finishNode) {
      return Array.from(closedSet);
    }

    if (currentNode.isWall) {
      continue;
    }

    closedSet.add(currentNode);

    const neighbors = allowDiagonal
      ? getNeighborsForDiagonal(currentNode, grid)
      : getNeighbors(currentNode, grid);

    for (let i = 0; i < neighbors.length; i++) {
      const neighbor = neighbors[i];

      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue;
      }

      neighbor.distance = manhattanDistance(neighbor, finishNode);
      neighbor.parent = currentNode;

      openSet.push(neighbor);
    }
  }

  return [];
};
