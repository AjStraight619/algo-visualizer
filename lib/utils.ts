import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { NodeType, StartFinishNodePosition } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGrid = (
  rows: number,
  cols: number,
  startNode: StartFinishNodePosition,
  finishNode: StartFinishNodePosition
) => {
  const grid = [];
  for (let row = 0; row < rows; row++) {
    const currentRow = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createNode(row, col, startNode, finishNode));
    }
    grid.push(currentRow);
  }
  return grid;
};

export const createNode = (
  row: number,
  col: number,
  startNode: StartFinishNodePosition,
  finishNode: StartFinishNodePosition
) => {
  return {
    row,
    col,
    isStart: row === startNode.row && col === startNode.col,
    isFinish: row === finishNode.row && col === finishNode.col,
    startNodePosition: {
      row: 10,
      col: 15,
    },
    finishNodePosition: {
      row: 10,
      col: 35,
    },
    isWall: false,
    isWeight: false,
    weight: 1,
    gScore: Infinity,
    hScore: Infinity,
    fScore: Infinity,
    isVisited: false,
    parent: null,
    isAnimated: false,
    totalDistance: 0,
    distance: Infinity,
    opened: false,
  };
};

export const getNewGridWithWallToggled = (
  grid: NodeType[][],
  row: number,
  col: number
) => {
  const newGrid = [...grid];
  const newRow = [...newGrid[row]];
  newRow[col] = { ...newRow[col], isWall: !newRow[col].isWall };
  newGrid[row] = newRow;
  return newGrid;
};

export const getNewGridWithWeightToggled = (
  grid: NodeType[][],
  row: number,
  col: number
): NodeType[][] => {
  const newGrid = [...grid];
  const newRow = [...newGrid[row]];
  const newNode = {
    ...newRow[col],
    isWeight: !newRow[col].isWeight,
    weight: newRow[col].isWeight ? 1 : calculateRandomWeight(),
  };
  newRow[col] = newNode;

  newGrid[row] = newRow;
  return newGrid;
};

export const resetGrid = (grid: NodeType[][]) => {
  const newGrid = grid.slice();
  for (const row of newGrid) {
    for (const node of row) {
      node.gScore = Infinity;
      node.hScore = Infinity;
      node.fScore = Infinity;
      node.isVisited = false;
      node.parent = null;
      node.isAnimated = false;
      node.totalDistance = 0;
      node.distance = Infinity;
      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) {
        element.classList.remove(
          "node-visited",
          "node-shortest-path",
          "node-visited-weight",
          "node-shortest-path-weight"
        );
      }
    }
  }
  return newGrid;
};

export const clearVisualizations = (grid: NodeType[][]) => {
  const newGrid = grid.slice();
  for (const row of newGrid) {
    for (const node of row) {
      node.isVisited = false;
      node.isAnimated = false;
      const element = document.getElementById(`node-${node.row}-${node.col}`);
      if (element) {
        element.classList.remove(
          "node-visited",
          "node-shortest-path",
          "node-visited-weight",
          "node-shortest-path-weight"
        );
      }
    }
  }
  return newGrid;
};

export const calculateRandomWeight = () => {
  return Math.floor(Math.random() * 10) + 1;
};

export const getNeighborsForDiagonal = (
  node: NodeType,
  grid: NodeType[][]
): NodeType[] => {
  const neighbors: NodeType[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (row > 0 && col > 0) neighbors.push(grid[row - 1][col - 1]);
  if (row < grid.length - 1 && col < grid[0].length - 1)
    neighbors.push(grid[row + 1][col + 1]);
  if (row > 0 && col < grid[0].length - 1)
    neighbors.push(grid[row - 1][col + 1]);
  if (row < grid.length - 1 && col > 0) neighbors.push(grid[row + 1][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getNeighbors = (
  node: NodeType,
  grid: NodeType[][]
): NodeType[] => {
  const neighbors: NodeType[] = [];
  const { row, col } = node;

  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);

  return neighbors.filter((neighbor) => !neighbor.isVisited);
};

export const getNodesInShortestPathOrder = (
  finishNode: NodeType
): NodeType[] => {
  const nodesInShortestPathOrder: NodeType[] = [];
  let currentNode: NodeType | null = finishNode;

  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.parent ? currentNode.parent : null;
  }
  return nodesInShortestPathOrder;
};

// When the cost of moving diagonally is the same as the cost of moving orthogonally
export const euclideanDistance = (node: NodeType, finishNode: NodeType) => {
  const dx = Math.abs(node.row - finishNode.row);
  const dy = Math.abs(node.col - finishNode.col);
  return Math.sqrt(dx * dx + dy * dy);
};

// When the cost of moving diagonally is less than the cost of moving orthogonally
export const chebyshevDistance = (node: NodeType, finishNode: NodeType) => {
  return Math.max(
    Math.abs(node.row - finishNode.row),
    Math.abs(node.col - finishNode.col)
  );
};

export const manhattanDistance = (node: NodeType, finishNode: NodeType) => {
  return (
    Math.abs(node.row - finishNode.row) + Math.abs(node.col - finishNode.col)
  );
};
