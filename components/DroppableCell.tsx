"use client";
import { useDroppable } from "@dnd-kit/core";

type DroppableCellProps = {
  id: string;
  children: React.ReactNode;
  isStart?: boolean;
  isFinish?: boolean;
};

/**
 * Provides a droppable area functionality where draggable nodes can be placed.
 *
 * @param {DroppableCellProps} props - The props object containing the ID for the droppable area, its children components,
 * and optional flags to indicate if it's a start or finish cell.
 * @returns {JSX.Element} The rendered droppable cell component.
 */
export default function DroppableCell({
  id,
  isStart,
  isFinish,
  children,
}: DroppableCellProps): JSX.Element {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: isStart ? "start" : isFinish ? "finish" : "cell",
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}
