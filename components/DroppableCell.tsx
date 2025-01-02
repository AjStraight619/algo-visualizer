import React from "react";

type DroppableCellProps = {
  row: number;
  col: number;
  onDropNode: (draggedId: string, row: number, col: number) => void;
  children: React.ReactNode;
};

function DroppableCell({ row, col, onDropNode, children }: DroppableCellProps) {
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // Important: allow dropping by preventing default
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    // Stop browser from opening the dropped item
    e.preventDefault();

    // Retrieve the dragged node’s ID from dataTransfer
    const draggedId = e.dataTransfer.getData("text/plain");

    // If there's valid data, call the callback
    if (draggedId) {
      onDropNode(draggedId, row, col);
    }
  };

  return (
    <div onDragOver={handleDragOver} onDrop={handleDrop}>
      {children}
    </div>
  );
}

export default DroppableCell;
