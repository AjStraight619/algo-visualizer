"use client";

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
  const minCellSize = 20;
  const maxCellSize = 25;
  const paddingTop = 128;
  const navBarHeight = 80;

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
    row: Math.floor(rows * 0.5),
    col: Math.floor(cols * 0.1),
  };
  const finishNode = {
    row: Math.floor(rows * 0.5),
    col: Math.floor(cols * 0.9),
  };
  return { rows, cols, startNode, finishNode, cellSize };
};

export const useResponsiveGrid = () => {
  const [gridDimensions, setGridDimensions] = useState<GridDimensions>({
    rows: 0,
    cols: 0,
    startNode: { row: 0, col: 0 },
    finishNode: { row: 0, col: 0 },
    cellSize: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setGridDimensions(calculateGridSize());
    }

    function handleResize() {
      setGridDimensions(calculateGridSize());
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return gridDimensions;
};
