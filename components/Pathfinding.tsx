"use client";
import { useGridManager } from "@/hooks/useGridManager";
import { DndContext, closestCenter } from "@dnd-kit/core";
import GridNode from "./GridNode";

type PathfindingProps = ReturnType<typeof useGridManager>;

/**
 * Component representing the pathfinding grid interface.
 *
 * @param {PathfindingProps} props - Properties from the useGridManager hook.
 * @returns {JSX.Element} The pathfinding grid component.
 */
export default function Pathfinding({
  grid,
  startNodePosition,
  finishNodePosition,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  handleDragEnd,
}: PathfindingProps): JSX.Element {
  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className={`grid gap-0 dark:border-slate-600 `}>
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
  );
}
