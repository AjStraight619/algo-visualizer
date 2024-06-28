"use client";
import "@/animations/animations.css";
import { NodeType } from "@/lib/types";
import React from "react";
import { FaChevronRight, FaDumbbell, FaStar } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import DraggableNode from "./DraggableNode";
import DroppableCell from "./DroppableCell";

type GridNodeProps = NodeType & {
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
  isStart: boolean;
  isFinish: boolean;
  isWall: boolean;
  isWeight: boolean;
  row: number;
  col: number;
};

/**
 * Represents a single node on the grid, which can be a start node, finish node, or a wall node.
 * It includes the logic for mouse interaction and the ability to drag and drop the node.
 *
 * @param {GridNodeProps} props - The props object containing the node properties and event handlers.
 * @returns {JSX.Element} The rendered grid node component.
 */
function GridNode({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  isWeight,
}: GridNodeProps): JSX.Element {
  const nodeId = `node-${row}-${col}`;
  const draggableId = isStart
    ? `start-node-${row}-${col}`
    : isFinish
    ? `finish-node-${row}-${col}`
    : null;

  const renderNodeContent = () => (
    <div
      id={nodeId}
      className={`w-5 h-5 border bg-gray-50 border-gray-400 dark:bg-gray-900 dark:border-slate-600 flex items-center justify-center`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      onMouseUp={handleMouseUp}
    >
      {isStart ? (
        <FaChevronRight />
      ) : isFinish ? (
        <FaStar />
      ) : isWeight ? (
        <FaDumbbell />
      ) : isWall ? (
        <GiBrickWall />
      ) : null}
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
