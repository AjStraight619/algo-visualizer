"use client";

import { GridDimensions } from "@/lib/types";
import { useEffect, useState } from "react";

/**
 * Calculates the size of the grid based on the available viewport size.
 * Determines the number of rows, columns, and positions of the start and finish nodes.
 *
 * @returns {GridDimensions} The calculated dimensions of the grid.
 */
const calculateGridSize = (): GridDimensions => {
  const minCellSize = 20;
  const maxCellSize = 25;
  const paddingTop = 128;
  const navBarHeight = 80;

  const availableHeight = window.innerHeight - (paddingTop + navBarHeight);
  const availableWidth = window.innerWidth - 20;

  const cellSize = Math.max(
    minCellSize,
    Math.min(maxCellSize, availableWidth / 86, availableHeight / 39)
  );

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

/**
 * Custom hook for calculating and updating grid dimensions responsive to the viewport size.
 *
 * @returns {GridDimensions} The current dimensions of the grid, including rows, columns, start node, finish node, and cell size.
 */

export const useResponsiveGrid = (): GridDimensions => {
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
