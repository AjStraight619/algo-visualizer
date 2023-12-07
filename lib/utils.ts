import { NodeType } from "./types";

// const ROWS = 35;
// export const COLS = 68;
// export const START_NODE_ROW = 15;
// export const START_NODE_COL = 8;
// export const FINISH_NODE_ROW = 15;
// export const FINISH_NODE_COL = 55;

// export const getInitialGrid = () => {
//   const grid = [];
//   for (let row = 0; row < ROWS; row++) {
//     const currentRow = [];
//     for (let col = 0; col < COLS; col++) {
//       currentRow.push(createNode(row, col));
//     }
//     grid.push(currentRow);
//   }
//   return grid;
// };

// export const createNode = (row: number, col: number) => {
//   return {
//     row,
//     col,
//     isStart: row === START_NODE_ROW && col === START_NODE_COL,
//     isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
//     startNodePosition: {
//       row: 10,
//       col: 15,
//     },
//     finishNodePosition: {
//       row: 10,
//       col: 35,
//     },
//     isWall: false,
//     isWeight: false,
//     weight: 1,
//     gScore: Infinity,
//     hScore: Infinity,
//     fScore: Infinity,
//     isVisited: false,
//     parent: null,
//     isAnimated: false,
//     totalDistance: 0,
//     distance: Infinity,
//     opened: false,
//   };
// };

export const getNewGridWithWallToggled = (
  grid: NodeType[][],
  row: number,
  col: number
) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWall: !node.isWall,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};

export const getNewGridWithWeightToggled = (
  grid: NodeType[][],
  row: number,
  col: number
): NodeType[][] => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isWeight: !node.isWeight,
    weight: node.isWeight ? 1 : calculateRandomWeight(),
  };
  newGrid[row][col] = newNode;
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

const calculateRandomWeight = () => {
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
  console.log("Current node: ", currentNode);
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.parent ? currentNode.parent : null;
  }
  return nodesInShortestPathOrder;
};
