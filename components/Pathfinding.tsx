import { DragEndEvent } from "@dnd-kit/core";
import GridNode from "./GridNode";
import { useCallback, useEffect, useState, useRef } from "react";
import { useGrid } from "@/context/GridContext";

export default function Pathfinding() {
  const {
    grid,
    setGrid,
    isWallToggled,
    isAnimating,
    startNodePosition,
    finishNodePosition,
    setStartNodePosition,
    setFinishNodePosition,
  } = useGrid();

  // TODO: Create grid context, make sure when dragging start or finish node no walls/weights are created

  const isDraggableNode = useCallback(
    (row: number, col: number) => {
      return (
        (row === startNodePosition?.row && col === startNodePosition.col) ||
        (row === finishNodePosition?.row && col === finishNodePosition.col)
      );
    },
    [startNodePosition, finishNodePosition],
  );

  const renderRef = useRef(0);

  const [isMouseDown, setIsMouseDown] = useState(false);

  useEffect(() => {
    console.log("Pathfinding component re rendered: ", renderRef.current++);
  });

  const localChangesRef = useRef<Set<string>>(new Set());

  const handleWallWeightToggle = (row: number, col: number) => {
    const nodeId = `node-${row}-${col}`;
    const element = document.getElementById(nodeId);
    if (!element) return;

    // Toggle the wall state
    if (isWallToggled) {
      if (element.classList.contains("node-wall")) {
        element.classList.remove("node-wall"); // Remove the wall
        localChangesRef.current.delete(`${row},${col}`); // Sync the set
      } else {
        element.classList.add("node-wall"); // Add the wall
        localChangesRef.current.add(`${row},${col}`); // Sync the set
      }
    } else {
      if (element.classList.contains("node-weight")) {
        element.classList.remove("node-weight"); // Remove the weight
        localChangesRef.current.delete(`${row},${col}`); // Sync the set
      } else {
        element.classList.add("node-weight"); // Add the weight
        localChangesRef.current.add(`${row},${col}`); // Sync the set
      }
    }
  };

  const handleMouseDown = useCallback(
    (row: number, col: number) => {
      if (isAnimating) return;
      if (isDraggableNode(row, col)) return;

      setIsMouseDown(true);

      handleWallWeightToggle(row, col);
    },
    [isWallToggled, isAnimating, isDraggableNode],
  );

  const handleMouseUp = useCallback(() => {
    setIsMouseDown(false);
    if (isAnimating) return;
    // Only commit changes if localChanges has entries
    if (localChangesRef.current.size > 0) {
      setGrid((prevGrid) => {
        const newGrid = prevGrid.map((row) => row.slice());
        localChangesRef.current.forEach((coord) => {
          const [r, c] = coord.split(",").map(Number);
          if (isWallToggled) {
            newGrid[r][c].isWall = true;
          } else {
            newGrid[r][c].isWeight = true;
          }
        });
        return newGrid;
      });
      localChangesRef.current = new Set();
    }
  }, [isWallToggled]);

  const handleMouseEnter = useCallback(
    (row: number, col: number) => {
      if (!isMouseDown) return;
      if (isDraggableNode(row, col)) return;

      handleWallWeightToggle(row, col);
    },
    [isMouseDown, isWallToggled, isDraggableNode],
  );

  return (
    <div
      id="grid-container"
      className={`grid gap-0 dark:border-slate-600 mx-auto pt-[1rem] px-2`}
    >
      {grid.map((row, rowIdx) => (
        <div key={rowIdx} className="flex">
          {row.map((node, nodeIdx) => {
            const isStart =
              startNodePosition?.row === node.row &&
              startNodePosition.col === node.col;
            const isFinish =
              finishNodePosition?.row === node.row &&
              finishNodePosition.col === node.col;

            const handleDropNode = (
              draggedId: string,
              newRow: number,
              newCol: number,
            ) => {
              // draggedId might be "start-node-2-3" or "finish-node-5-8"
              if (draggedId.startsWith("start-node")) {
                setStartNodePosition({ row: newRow, col: newCol });
              } else if (draggedId.startsWith("finish-node")) {
                setFinishNodePosition({ row: newRow, col: newCol });
              }
            };

            return (
              <GridNode
                key={nodeIdx}
                {...node}
                isStart={isStart}
                isFinish={isFinish}
                handleMouseDown={handleMouseDown}
                handleMouseEnter={handleMouseEnter}
                handleMouseUp={handleMouseUp}
                onDropNode={handleDropNode}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

//const handleDragEnd = useCallback(
//  (event: DragEndEvent) => {
//    const { active, over } = event;
//
//    if (!over || active.id === over.id) return;
//
//    const activeId = String(active.id);
//    const overId = String(over.id);
//
//    const activeParts = activeId.split("-");
//    const overParts = overId.split("-");
//    const activeType = activeParts[0];
//    const activeRow = Number(activeParts[2]);
//    const activeCol = Number(activeParts[3]);
//    const overRow = Number(overParts[1]);
//    const overCol = Number(overParts[2]);
//
//    if (
//      activeType === "start" &&
//      overRow === finishNodePosition?.row &&
//      overCol === finishNodePosition.col
//    )
//      return;
//    if (
//      activeType === "finish" &&
//      overRow === startNodePosition?.row &&
//      overCol === startNodePosition.col
//    )
//      return;
//
//    setGrid((prevGrid) => {
//      const newGrid = prevGrid.slice();
//
//      if (activeType === "start") {
//        newGrid[activeRow][activeCol].isStart = false;
//        newGrid[overRow][overCol].isStart = true;
//        setStartNodePosition({ row: overRow, col: overCol });
//      } else if (activeType === "finish") {
//        newGrid[activeRow][activeCol].isFinish = false;
//        newGrid[overRow][overCol].isFinish = true;
//        setFinishNodePosition({ row: overRow, col: overCol });
//      }
//
//      return newGrid;
//    });
//  },
//  [
//    finishNodePosition?.col,
//    finishNodePosition?.row,
//    startNodePosition?.col,
//    startNodePosition?.row,
//  ],
//);
