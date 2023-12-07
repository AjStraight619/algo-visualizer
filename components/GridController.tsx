"use client";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm } from "@/lib/types";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";
import DropdownMenu from "./DropdownMenu";

type GridControllerProps = {
  setIsLegendOpen: (isLegendOpen: boolean) => void;
  isLegendOpen: boolean;
};

function GridController({
  setIsLegendOpen,
  isLegendOpen,
}: GridControllerProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );
  const handleSelectAlgorithm = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  return (
    <div className="top-0 fixed h-[5rem] w-screen border-b dark:border-slate-700 border-slate-800">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <DropdownMenu
            items={algorithms}
            renderItem={(item) => <div>{item.name}</div>}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            onSelectItem={handleSelectAlgorithm}
            isVisualizing={false}
          >
            {selectedAlgorithm.name}
          </DropdownMenu>
          <Button className="hover:scale-[1.15] active:scale-105 transition-all">
            Visualize
          </Button>
          <Button className="hover:scale-[1.15] active:scale-105 transition-all">
            Clear
          </Button>
          <Button className="hover:scale-[1.15] active:scale-105 transition-all">
            Reset
          </Button>
        </div>
        <div className="flex items-center gap-2 pr-[6rem]">
          <Button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="flex flex-row items-center gap-1 hover:scale-[1.05] active:scale-105 transition-all"
          >
            Legend <FaChevronDown />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GridController;
