"use client";
import { useDraggable } from "@dnd-kit/core";
import React from "react";

type DraggableNodeProps = {
  id: string;
  children: React.ReactNode;
};

/**
 * Provides drag functionality for a node component.
 *
 * @param {DraggableNodeProps} props - The props object containing the ID for the draggable item and its children components.
 * @returns {JSX.Element} The rendered draggable node component.
 */
export default function DraggableNode({
  id,
  children,
}: DraggableNodeProps): JSX.Element {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id,
      data: {
        type: id.startsWith("start-node") ? "start" : "finish",
      },
    });

  // Apply the transform style if the element is being dragged
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 1000,
      }
    : {};

  return (
    <div
      className={`${
        isDragging
          ? "animate-pulse bg-transparent outline-none border-none"
          : ""
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </div>
  );
}
