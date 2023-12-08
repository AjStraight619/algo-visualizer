import { NodeType } from "@/lib/types";
import {
  getNeighbors,
  getNeighborsForDiagonal,
  manhattanDistance,
} from "@/lib/utils";
import { Heap } from "heap-js";

export const aStar = (
  grid: NodeType[][],
  startNode: NodeType,
  finishNode: NodeType,
  allowDiagonal?: boolean
) => {
  const heuristic = manhattanDistance;
  startNode.gScore = 0;
  startNode.fScore = heuristic(startNode, finishNode);

  const openSet = new Heap<NodeType>((a, b) => a.fScore - b.fScore);
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
      if (closedSet.has(neighbor) || neighbor.isWall) {
        continue;
      }

      const tempGScore = currentNode.gScore + neighbor.weight;

      // Check if new path is shorter OR node hasn't been visited
      if (tempGScore < neighbor.gScore || !neighbor.isVisited) {
        neighbor.gScore = tempGScore;
        neighbor.hScore = heuristic(neighbor, finishNode);
        neighbor.fScore = neighbor.gScore + neighbor.hScore;
        neighbor.parent = currentNode;

        if (!neighbor.isVisited) {
          openSet.push(neighbor);
          neighbor.isVisited = true;
        }
      }
    }
  }
  return [];
};
