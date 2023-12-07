"use client";
import "@/animations/animations.css";
import { NodeType } from "@/lib/types";
import React from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";
import DraggableNode from "./DraggableNode";
import DroppableCell from "./DroppableCell";

type GridNodeProps = NodeType & {
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  row: number;
  col: number;
};

function GridNode({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
}: GridNodeProps) {
  const nodeId = `node-${row}-${col}`;
  const draggableId = isStart
    ? `start-node-${row}-${col}`
    : isFinish
    ? `finish-node-${row}-${col}`
    : null;

  const renderNodeContent = () => (
    <div
      id={nodeId}
      className={`node ${
        isWall
          ? "bg-gray-600 dark:border-slate-600"
          : "bg-gray-50 border-gray-400 dark:bg-gray-900 dark:border-slate-600"
      }`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStart ? <FaChevronRight /> : isFinish ? <FaStar /> : null}
    </div>
  );

  return (
    <DroppableCell id={nodeId}>
      {draggableId ? (
        <DraggableNode id={draggableId}>{renderNodeContent()}</DraggableNode>
      ) : (
        renderNodeContent()
      )}
    </DroppableCell>
  );
}

export default React.memo(GridNode);
