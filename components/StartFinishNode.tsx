// StartFinishNode.tsx
import { FaChevronRight, FaStar } from "react-icons/fa";
import DroppableCell from "./DroppableCell";
import { Draggable } from "./Draggable";
import { cn } from "@/lib/utils";

interface StartFinishNodeProps {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
}

function StartFinishNode({
  row,
  col,
  isStart,
  isFinish,
}: StartFinishNodeProps) {
  const nodeId = `node-${row}-${col}`;
  const draggableId = isStart
    ? `start-node-${row}-${col}`
    : `finish-node-${row}-${col}`;

  console.log("draggable id's: ", draggableId);

  return (
    <Draggable id={draggableId} isStart={isStart} isFinish={isFinish}>
      <div
        id={nodeId}
        className={cn(
          "w-5 h-5 border border-gray-400 dark:border-slate-600 flex items-center justify-center box-border",
        )}
      >
        {isStart ? <FaChevronRight /> : <FaStar />}
      </div>
    </Draggable>
  );
}

export default StartFinishNode;
