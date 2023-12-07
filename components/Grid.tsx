"use client";
import { useResponsiveGrid } from "@/hooks/useResponsiveGrid";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm, NodeType } from "@/lib/types";
import { DndContext, DragEndEvent, closestCenter } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";
import { getGrid, getNewGridWithWallToggled } from "../lib/utils";
import GridController from "./GridController";
import GridNode from "./Node";

export type StartFinishNodePosition = {
  row: number;
  col: number;
};

export default function Grid() {
  const { rows, cols, startNode, finishNode, cellSize } = useResponsiveGrid();
  const [nodesManuallyMoved, setNodesManuallyMoved] = useState(false);

  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [startNodePosition, setStartNodePosition] =
    useState<StartFinishNodePosition | null>(null);
  const [finishNodePosition, setFinishNodePosition] =
    useState<StartFinishNodePosition | null>(null);

  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );

  useEffect(() => {
    console.log("in useEffect, grid dimensions changed");
    setStartNodePosition({ row: startNode.row, col: startNode.col });
    setFinishNodePosition({ row: finishNode.row, col: finishNode.col });

    setGrid(getGrid(rows, cols, startNode, finishNode));
  }, [rows, cols, startNode, finishNode]);

  const isDraggableNode = useCallback(
    (row: number, col: number) => {
      return (
        (row === startNodePosition?.row && col === startNodePosition.col) ||
        (row === finishNodePosition?.row && col === finishNodePosition.col)
      );
    },
    [startNodePosition, finishNodePosition]
  );

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      if (isDraggableNode(row, col)) return;
      setMouseIsPressed(true);
      console.log("Mouse down");
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    },
    [grid, isDraggableNode]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!mouseIsPressed) return;
      if (isDraggableNode(row, col)) return;
      console.log("Mouse enter");
      const newGrid = getNewGridWithWallToggled(grid, row, col);
      setGrid(newGrid);
    },
    [mouseIsPressed, grid, isDraggableNode]
  );

  const handleMouseUp = () => {
    setMouseIsPressed(false);
  };

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || active.id === over.id) return;

      const activeId = String(active.id);
      const overId = String(over.id);

      const activeParts = activeId.split("-");
      const overParts = overId.split("-");
      const activeType = activeParts[0];
      const activeRow = Number(activeParts[2]);
      const activeCol = Number(activeParts[3]);
      const overRow = Number(overParts[1]);
      const overCol = Number(overParts[2]);

      if (
        activeType === "start" &&
        overRow === finishNodePosition?.row &&
        overCol === finishNodePosition.col
      )
        return;
      if (
        activeType === "finish" &&
        overRow === startNodePosition?.row &&
        overCol === startNodePosition.col
      )
        return;

      setGrid((prevGrid) => {
        const newGrid = prevGrid.slice();

        if (activeType === "start") {
          newGrid[activeRow][activeCol].isStart = false;
          newGrid[overRow][overCol].isStart = true;
          setStartNodePosition({ row: overRow, col: overCol });
        } else if (activeType === "finish") {
          newGrid[activeRow][activeCol].isFinish = false;
          newGrid[overRow][overCol].isFinish = true;
          setFinishNodePosition({ row: overRow, col: overCol });
        }

        return newGrid;
      });
    },
    [
      finishNodePosition?.col,
      finishNodePosition?.row,
      startNodePosition?.col,
      startNodePosition?.row,
    ]
  );

  const handleDragStart = () => {
    setNodesManuallyMoved(true);
  };

  return (
    <>
      <GridController
        selectedAlgorithm={selectedAlgorithm}
        setSelectedAlgorithm={setSelectedAlgorithm}
      />

      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
      >
        <div className={`grid gap-0 dark:border-slate-600`}>
          {grid.map((row, rowIdx) => (
            <div key={rowIdx} className="flex flex-wrap">
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
                    cellSize={cellSize}
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
