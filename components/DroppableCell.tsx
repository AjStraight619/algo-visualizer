"use client";
import { useDroppable } from "@dnd-kit/core";

type DroppableCellProps = {
  id: string;
  children: React.ReactNode;
  isStart?: boolean;
  isFinish?: boolean;
};

export default function DroppableCell({
  id,
  isStart,
  isFinish,
  children,
}: DroppableCellProps) {
  const { setNodeRef } = useDroppable({
    id,
    data: {
      type: isStart ? "start" : isFinish ? "finish" : "cell",
    },
  });

  return <div ref={setNodeRef}>{children}</div>;
}
