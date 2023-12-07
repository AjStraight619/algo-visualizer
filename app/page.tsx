"use client";
import GridController from "@/components/GridController";
import Legend from "@/components/Legend";
import Pathfinding from "@/components/Pathfinding";
import { useGridManager } from "@/hooks/useGridManager";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm } from "@/lib/types";
import { useState } from "react";

/**
 * Main page component which serves as the container for the grid controller, pathfinding grid, and legend.
 * It uses the `useResponsiveGrid` and `useGridManager` hooks to manage grid state and dimensions.
 *
 * @returns {JSX.Element} The rendered main page component.
 */
export default function Home(): JSX.Element {
  const gridDimensions = useResponsiveGrid();
  const [isWallToggled, setIsWallToggled] = useState(true);
  const gridManager = useGridManager({ gridDimensions, isWallToggled });
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );

  const { startNodePosition, finishNodePosition, grid, resetGrid, clearBoard } =
    gridManager;

  return (
    <main className="flex min-h-screen gap-1 items-start justify-center pt-[10rem]">
      <GridController
        startNodePosition={startNodePosition}
        finishNodePosition={finishNodePosition}
        grid={grid}
        setIsLegendOpen={setIsLegendOpen}
        isLegendOpen={isLegendOpen}
        isVisualizing={isVisualizing}
        setIsVisualizing={setIsVisualizing}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        isWallToggled={isWallToggled}
        setIsWallToggled={setIsWallToggled}
        resetGrid={resetGrid}
        clearBoard={clearBoard}
      />
      <Pathfinding {...gridManager} />
      <Legend isLegendOpen={isLegendOpen} />
    </main>
  );
}
