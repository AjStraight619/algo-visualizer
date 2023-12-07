import React from "react";
import { FaChevronRight, FaDumbbell, FaStar } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";

type LegendItemProps = {
  icon: React.ReactNode;
  className?: string;
  text: string;
};

const LegendItem = ({ icon, className, text }: LegendItemProps) => {
  return (
    <div className="flex items-center">
      <div className={`rounded-full w-4 h-4 mr-2 ${className}`}>{icon}</div>
      <div>{text}</div>
    </div>
  );
};

/**
 * Represents an item in the legend, displaying an icon and a description text.
 *
 * @param {LegendItemProps} props - The props containing the icon, additional class names, and text for the legend item.
 * @returns {JSX.Element} The rendered legend item component.
 */
export default function Legend({
  isLegendOpen,
}: {
  isLegendOpen: boolean;
}): JSX.Element {
  return (
    <>
      {isLegendOpen ? (
        <div className="dark:bg-gray-800 bg-gray-100 p-4 shadow-md shadow-black rounded-md absolute top-[5rem] right-[5rem]">
          <div className="flex flex-col items-start justify-between space-y-2 w-full">
            {LegendItems.map((item, index) => (
              <LegendItem key={index} {...item} />
            ))}
          </div>
        </div>
      ) : null}
    </>
  );
}

const LegendItems = [
  {
    icon: <FaChevronRight />,
    text: "Start Node",
  },
  {
    icon: <FaStar />,
    text: "Finish Node",
  },
  {
    icon: <GiBrickWall />,
    text: "Wall Node",
  },
  {
    icon: <FaDumbbell />,
    text: "Weight Node",
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
      <div className="bg-gray-50 dark:bg-gray-900 border-slate-600 w-4 h-4 rounded-sm"></div>
    ),
    text: "Unvisited Node",
  },
] as const;
