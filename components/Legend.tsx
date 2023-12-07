import React from "react";
import { FaChevronRight, FaStar } from "react-icons/fa";

type LegendItemProps = {
  icon: React.ReactNode;
  className?: string;
  text: string;
};

type LegendProps = {
  isLegendOpen: boolean;
};

const LegendItem = ({ icon, className, text }: LegendItemProps) => {
  return (
    <div className="flex items-center">
      <div className={`rounded-full w-4 h-4 mr-2 ${className}`}>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

export default function Legend() {
  return (
    <div className="dark:bg-gray-800 bg-gray-100 p-4 shadow-md shadow-black rounded-md absolute top-1/2 right-1/4">
      <div className="flex flex-col items-start justify-between space-y-2 w-full">
        {LegendItems.map((item, index) => (
          <LegendItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
}

const LegendItems = [
  {
    icon: <FaChevronRight />,
    text: "Start Node",
  },
  {
    icon: <FaStar />,
    className: "",
    text: "Finish Node",
  },
  {
    icon: <div className="bg-gray-500 w-4 h-4 rounded-sm"></div>,
    text: "Wall Node",
  },
  {
    icon: <div className="bg-blue-500 w-4 h-4 rounded-sm"></div>,

    text: "Visited Node",
  },
  {
    icon: <div className="bg-green-500 w-4 h-4 rounded-sm"></div>,
    text: "Path Node",
  },
  {
    icon: (
      <div className="bg-gray-50 dark:bg-gray-900 dark:border-slate-600 w-4 h-4 rounded-sm"></div>
    ),
    text: "Unvisited Node",
  },
] as const;
