// "use client";
// import { useEffect, useState } from "react";

// export const useResponsiveGrid = () => {
//   const calculateInitialDimensions = () => {
//     const rows = Math.floor(window.innerHeight / 20); // Example cell height: 20px
//     const cols = Math.floor(window.innerWidth / 20); // Example cell width: 20px
//     const startNode = {
//       row: Math.floor(rows * 0.25),
//       col: Math.floor(cols * 0.25),
//     };
//     const finishNode = {
//       row: Math.floor(rows * 0.75),
//       col: Math.floor(cols * 0.75),
//     };
//     console.log("finishNode", finishNode);
//     return { rows, cols, startNode, finishNode };
//   };

//   // Initialize state with calculated dimensions
//   const [dimensions, setDimensions] = useState<GridDimensions>(
//     calculateInitialDimensions()
//   );

//   useEffect(() => {
//     const updateGridSize = () => {
//       const newDimensions = calculateInitialDimensions();
//       setDimensions(newDimensions);
//     };

//     window.addEventListener("resize", updateGridSize);
//     updateGridSize(); // Update dimensions on mount

//     return () => window.removeEventListener("resize", updateGridSize);
//   }, []);

//   return dimensions;
// };

import { useEffect, useState } from "react";

type GridDimensions = {
  rows: number;
  cols: number;
  startNode: { row: number; col: number };
  finishNode: { row: number; col: number };
  cellSize: number;
};

// This function will calculate the number of rows and columns based on the viewport size
const calculateGridSize = () => {
  // You can replace these constants with your desired cell size range
  const minCellSize = 20; // Minimum cell size in pixels
  const maxCellSize = 25; // Maximum cell size in pixels
  const paddingTop = 128; // Top padding in pixels (8rem with base font-size of 16px)
  const navBarHeight = 80; // Navbar height in pixels (5rem with base font-size of 16px)

  const availableHeight = window.innerHeight - (paddingTop + navBarHeight);
  const availableWidth = window.innerWidth;

  // Calculate the cell size to use based on the available height and width
  const cellSize = Math.max(
    minCellSize,
    Math.min(maxCellSize, availableWidth / 86, availableHeight / 39)
  );

  // Calculate the number of columns and rows based on the cell size
  const cols = Math.floor(availableWidth / cellSize);
  const rows = Math.floor(availableHeight / cellSize);

  const startNode = {
    row: Math.floor(rows * 0.25),
    col: Math.floor(cols * 0.25),
  };
  const finishNode = {
    row: Math.floor(rows * 0.75),
    col: Math.floor(cols * 0.75),
  };
  console.log("finishNode", finishNode);
  return { rows, cols, startNode, finishNode, cellSize };
};

export const useResponsiveGrid = () => {
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>(
    calculateGridSize()
  );

  useEffect(() => {
    const handleResize = () => {
      setGridDimensions(calculateGridSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return gridDimensions;
};
