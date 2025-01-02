import DroppableCell from "./DroppableCell";
import { cn } from "@/lib/utils";

interface NormalGridNodeProps {
  row: number;
  col: number;
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
  onDropNode: (draggedId: string, row: number, col: number) => void;
}

function NormalGridNode({
  row,
  col,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  onDropNode,
}: NormalGridNodeProps) {
  const nodeId = `node-${row}-${col}`;

  return (
    <DroppableCell row={row} col={col} onDropNode={onDropNode}>
      <div
        id={nodeId}
        className={cn(
          "h-5 w-5 border border-gray-400 bg-gray-50 dark:bg-none dark:border-slate-600 flex items-center justify-center box-border",
        )}
        onMouseDown={() => handleMouseDown(row, col)}
        onMouseEnter={() => handleMouseEnter(row, col)}
        onMouseUp={handleMouseUp}
      />
    </DroppableCell>
  );
}

export default NormalGridNode;
