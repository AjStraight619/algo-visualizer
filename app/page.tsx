"use client";
import GridController from "@/components/GridController";
import Legend from "@/components/Legend";
import Pathfinding from "@/components/Pathfinding";
import { useGridManager } from "@/hooks/useGridManager";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { useState } from "react";

export default function Home() {
  const gridDimensions = useResponsiveGrid();
  const gridManager = useGridManager({ gridDimensions });
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [isVisualizing, setIsVisualizing] = useState(false);

  const { startNodePosition, finishNodePosition, grid } = gridManager;

  return (
    <main className="flex min-h-screen gap-1 items-start justify-start pt-[8rem]">
      <GridController
        startNodePosition={startNodePosition}
        finishNodePosition={finishNodePosition}
        grid={grid}
        setIsLegendOpen={setIsLegendOpen}
        isLegendOpen={isLegendOpen}
        isVisualizing={isVisualizing}
        setIsVisualizing={setIsVisualizing}
      />
      <Pathfinding {...gridManager} />
      <Legend isLegendOpen={isLegendOpen} />
    </main>
  );
}
