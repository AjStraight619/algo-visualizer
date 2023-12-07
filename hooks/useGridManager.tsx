import { GridDimensions, NodeType, StartFinishNodePosition } from "@/lib/types";
import {
  getGrid,
  getNewGridWithWallToggled,
  getNewGridWithWeightToggled,
} from "@/lib/utils";
import { DragEndEvent } from "@dnd-kit/core";
import { useCallback, useEffect, useState } from "react";

type UseGridManagerProps = {
  gridDimensions: GridDimensions;
  isWallToggled: boolean;
};

/**
 * Custom hook for managing the state and interactions of a pathfinding grid.
 *
 * @param {UseGridManagerProps} props - The properties required to manage the grid.
 * @returns An object containing grid state and functions to handle grid interactions.
 */
export const useGridManager = ({
  gridDimensions,
  isWallToggled,
}: UseGridManagerProps) => {
  const { rows, cols, startNode, finishNode } = gridDimensions;
  const [grid, setGrid] = useState<NodeType[][]>([]);
  const [startNodePosition, setStartNodePosition] =
    useState<StartFinishNodePosition | null>(null);
  const [finishNodePosition, setFinishNodePosition] =
    useState<StartFinishNodePosition | null>(null);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  useEffect(() => {
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
      const newGrid = isWallToggled
        ? getNewGridWithWallToggled(grid, row, col)
        : getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid);
    },
    [grid, isDraggableNode, isWallToggled]
  );

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!mouseIsPressed) return;
      if (isDraggableNode(row, col)) return;
      const newGrid = isWallToggled
        ? getNewGridWithWallToggled(grid, row, col)
        : getNewGridWithWeightToggled(grid, row, col);
      setGrid(newGrid);
    },
    [mouseIsPressed, grid, isDraggableNode, isWallToggled]
  );

  const handleMouseUp = useCallback(() => {
    setMouseIsPressed(false);
  }, []);

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

  const clearBoard = () => {
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          element?.classList.remove("node-visited", "node-shortest-path");
          return {
            ...node,
            isVisited: false,
          };
        })
      )
    );
  };

  const resetGrid = () => {
    setGrid(() => getGrid(rows, cols, startNode, finishNode));
    setStartNodePosition({ row: startNode.row, col: startNode.col });
    setFinishNodePosition({ row: finishNode.row, col: finishNode.col });
    grid.forEach((row) =>
      row.map((node) => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element?.classList.remove("node-visited", "node-shortest-path");
      })
    );
  };

  return {
    grid,
    startNodePosition,
    finishNodePosition,
    mouseIsPressed,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    handleDragEnd,
    resetGrid,
    clearBoard,
  };
};
