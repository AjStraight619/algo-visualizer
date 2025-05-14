// GridNode.tsx (or wherever you're combining)
import { NodeType } from "@/lib/types";
import StartFinishNode from "./StartFinishNode";
import NormalGridNode from "./NormalNode";

type GridNodeProps = NodeType & {
  isStart: boolean;
  isFinish: boolean;
  row: number;
  col: number;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
  onDropNode: (draggedId: string, row: number, col: number) => void;
};

function GridNode({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isWeight,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  onDropNode,
}: GridNodeProps) {
  // If it's a Start/Finish node, render the draggable version
  if (isStart || isFinish) {
    return (
      <StartFinishNode
        row={row}
        col={col}
        isStart={isStart}
        isFinish={isFinish}
      />
    );
  }

  // Otherwise, a normal node
  return (
    <NormalGridNode
      onDropNode={onDropNode}
      row={row}
      col={col}
      isWall={isWall}
      isWeight={isWeight}
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleMouseUp={handleMouseUp}
    />
  );
}

export default GridNode;
