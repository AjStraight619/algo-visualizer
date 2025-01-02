import { ReactNode, useState } from "react";
import { createRoot } from "react-dom/client";
import { FaChevronRight, FaStar } from "react-icons/fa";

type DraggableProps = {
  id: string;
  isStart: boolean;
  isFinish: boolean;
  children: ReactNode;
};

export const Draggable = ({
  id,
  isStart,
  isFinish,
  children,
}: DraggableProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", id);
    const dragImageContainer = document.createElement("div");
    dragImageContainer.className = "animate-pulse";
    dragImageContainer.style.position = "absolute";

    const root = createRoot(dragImageContainer);

    root.render(isStart ? <FaChevronRight /> : <FaStar />);
    document.body.appendChild(dragImageContainer);

    e.dataTransfer.setDragImage(dragImageContainer, 12, 12);
  };

  const handleDragEnd = (e: React.DragEvent) => {
    console.log("Drag ended at: ", e.clientX, e.clientY);
    setIsDragging(false);
  };

  return (
    <div
      id={id}
      draggable
      //onDrag={handleDrag}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      style={{ opacity: isDragging ? 0 : 1 }}
    >
      {children}
    </div>
  );
};
