import React from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";

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
    <div>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        disabled={isVisualizing}
        className="bg-indigo-500 flex items-center gap-1 rounded-md text-black dark:text-gray-50"
      >
        {children} <FaChevronDown />
      </Button>
      {isDropdownOpen && (
        <ul className="absolute bg-white dark:bg-gray-800 shadow-md rounded mt-1 z-50">
          {items.map((item, index) => (
            <li
              key={index}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 hover:cursor-pointer z-50"
              onClick={() => {
                onSelectItem(item);
                setIsDropdownOpen(false);
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
