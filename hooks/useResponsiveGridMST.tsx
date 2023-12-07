"use client";

import { useEffect, useState } from "react";

export type MSTGridDimensions = {
  rows: number;
  cols: number;
  cellSize: number;
  gap: number;
};

/**
 * Calculates the size of the grid specifically for MST visualization.
 * Determines the number of rows, columns, considering additional spacing for edges.
 *
 * @returns {MSTGridDimensions} The calculated dimensions of the MST grid.
 */
const calculateMSTGridSize = (): MSTGridDimensions => {
  const minCellSize = 20;
  const maxCellSize = 25;
  const padding = 20;
  const gapBetweenNodes = 10; // This is the new spacing between nodes

  const availableHeight = window.innerHeight - 2 * padding;
  const availableWidth = window.innerWidth - 2 * padding;

  // Adjust the calculation to account for the gap between nodes
  const cellSize = Math.max(
    minCellSize,
    Math.min(
      maxCellSize,
      (availableWidth - gapBetweenNodes) / 50,
      (availableHeight - gapBetweenNodes) / 25
    )
  );

  const cols = Math.floor(
    (availableWidth - gapBetweenNodes) / (cellSize + gapBetweenNodes)
  );
  const rows = Math.floor(
    (availableHeight - gapBetweenNodes) / (cellSize + gapBetweenNodes)
  );

  return { rows, cols, cellSize, gap: gapBetweenNodes };
};

/**
 * Custom hook for calculating and updating MST grid dimensions responsive to the viewport size.
 *
 * @returns {MSTGridDimensions} The current dimensions of the MST grid, including rows, columns, cell size, and gap.
 */
export const useResponsiveMSTGrid = (): MSTGridDimensions => {
  const [gridDimensions, setGridDimensions] = useState<MSTGridDimensions>({
    rows: 0,
    cols: 0,
    cellSize: 0,
    gap: 0,
  });

  useEffect(() => {
    function handleResize() {
      setGridDimensions(calculateMSTGridSize());
    }

    if (typeof window !== "undefined") {
      handleResize(); // Calculate initial size
    }

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return gridDimensions;
};
