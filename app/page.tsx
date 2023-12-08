"use client";
import AlgorithmInfo from "@/components/AlgorithmInfo";
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
    <main className="flex flex-col min-h-screen gap-1 items-start justify-center">
      <GridController
        startNodePosition={startNodePosition}
        finishNodePosition={finishNodePosition}
        grid={grid}
        setIsLegendOpen={setIsLegendOpen}
        isVisualizing={isVisualizing}
        setIsVisualizing={setIsVisualizing}
        isLegendOpen={isLegendOpen}
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
        isWallToggled={isWallToggled}
        setIsWallToggled={setIsWallToggled}
        resetGrid={resetGrid}
        clearBoard={clearBoard}
      />

      <div className="flex flex-col w-full justify-between items-start pt-[2rem] h-calc[(100% - 4rem)]">
        <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />

        <div className="mx-auto">
          <Pathfinding {...gridManager} />
        </div>
      </div>

      <Legend isLegendOpen={isLegendOpen} />
    </main>
  );
}
