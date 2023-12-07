import { cn } from "@/lib/ui";
import React from "react";
import { FaChevronDown } from "react-icons/fa";

type DropdownMenuProps<T> = {
  className?: string;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  children?: React.ReactNode;
  isVisualizing: boolean;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (isOpen: boolean) => void;
  onSelectItem: (item: T) => void;
};

export default function DropdownMenu<T>({
  items,
  renderItem,
  className,
  children,
  isVisualizing,
  isDropdownOpen,
  setIsDropdownOpen,
  onSelectItem,
}: DropdownMenuProps<T>) {
  return (
    <div className={cn()}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={cn(
          "bg-indigo-500 p-2 rounded-md flex justify-between items-center gap-2",
          className,
          {
            "bg-gray-500": isVisualizing,
          }
        )}
      >
        {children} <FaChevronDown />
      </button>
      {isDropdownOpen && (
        <ul className="absolute bg-white dark:bg-gray-800 shadow-md rounded mt-1">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer"
              onClick={() => {
                onSelectItem(item); // Call onSelectItem when an item is clicked
                setIsDropdownOpen(false); // Close the dropdown
              }}
            >
              {renderItem(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
