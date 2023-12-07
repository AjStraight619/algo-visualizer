"use client";
import { useGridManager } from "@/hooks/useGridManager";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { algorithms } from "@/lib/algorithmList";
import { DndContext, closestCenter } from "@dnd-kit/core";
import GridNode from "./Node";

export type StartFinishNodePosition = {
  row: number;
  col: number;
};

export default function Pathfinding() {
  const gridDimensions = useResponsiveGrid();
  const {
    grid,
    startNodePosition,
    finishNodePosition,
    mouseIsPressed,

    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleDragEnd,
  } = useGridManager({ gridDimensions, algorithms });

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <div className={`grid gap-0 dark:border-slate-600`}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex">
              {row.map((node, nodeIdx) => {
                const isStart =
                  startNodePosition?.row === node.row &&
                  startNodePosition.col === node.col;
                const isFinish =
                  finishNodePosition?.row === node.row &&
                  finishNodePosition.col === node.col;

                return (
                  <GridNode
                    key={nodeIdx}
                    {...node}
                    isStart={isStart}
                    isFinish={isFinish}
                    handleMouseDown={handleMouseDown}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseUp={handleMouseUp}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </DndContext>
    </>
  );
}
