"use client";
import { useNodeAnimations } from "@/hooks/useNodeAnimations";
import { algorithms } from "@/lib/algorithmList";
import {
  Algorithm,
  NodeType,
  Speed,
  StartFinishNodePosition,
} from "@/lib/types";
import { getNodesInShortestPathOrder } from "@/lib/utils";
import { useState } from "react";
import { FaCheck, FaChevronDown, FaDumbbell } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import Button from "./Button";
import DropdownMenu from "./DropdownMenu";
import ThemeSwitch from "./ThemeSwitch";

type GridControllerProps = {
  setIsLegendOpen: (isLegendOpen: boolean) => void;
  isLegendOpen: boolean;
  isVisualizing: boolean;
  setIsVisualizing: (isVisualizing: boolean) => void;
  startNodePosition: StartFinishNodePosition | null;
  finishNodePosition: StartFinishNodePosition | null;
  grid: NodeType[][];
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
  isWallToggled: boolean;
  setIsWallToggled: (isWallToggled: boolean) => void;
  resetGrid: () => void;
  clearBoard: () => void;
};

const speeds: Speed = {
  Slow: 50,
  Medium: 25,
  Fast: 10,
};

/**
 * Controls the grid settings and visualizations. It allows the user to select algorithms,
 * visualize them, and manage the grid state.
 *
 * @param {GridControllerProps} props - The props object containing the required properties for the component.
 * @returns {JSX.Element} The rendered grid controller component.
 */
function GridController({
  setIsLegendOpen,
  isLegendOpen,
  isVisualizing,
  setIsVisualizing,
  startNodePosition,
  finishNodePosition,
  grid,
  selectedAlgorithm,
  setSelectedAlgorithm,
  isWallToggled,
  setIsWallToggled,
  clearBoard,
  resetGrid,
}: GridControllerProps): JSX.Element {
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(true);
  const [didResetGrid, setDidResetGrid] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<keyof Speed>("Medium");
  const [isAlgorithmDropdownOpen, setIsAlgorithmDropdownOpen] = useState(false);
  const [isSpeedDropdownOpen, setIsSpeedDropdownOpen] = useState(false);

  const handleSelectAlgorithm = (algorithm: Algorithm) => {
    setSelectedAlgorithm(algorithm);
  };

  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[] | null
  >(null);

  const runAlgorithm = () => {
    if (isVisualizing) return;
    clearBoard();

    if (!startNodePosition || !finishNodePosition) return;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = selectedAlgorithm.func(
      grid,
      startNode,
      finishNode,
      allowDiagonalMovement
    );
    console.log(visitedNodesInOrder);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      setVisitedNodesInOrder(visitedNodesInOrder);
      setNodesInShortestPathOrder(nodesInShortestPathOrder);
    }
  };

  useNodeAnimations({
    visitedNodesInOrder,
    setVisitedNodesInOrder,
    nodesInShortestPathOrder,
    setNodesInShortestPathOrder,
    didResetGrid,
    selectedSpeed: speeds[selectedSpeed],
    setIsVisualizing,
  });

  return (
    <div className="top-0 fixed md:h-[4.5rem] w-screen border-b dark:border-slate-700 border-slate-800">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <DropdownMenu
            items={algorithms.filter((algorithm) => !algorithm.disabled)}
            renderItem={(item) => <div>{item.name}</div>}
            isDropdownOpen={isAlgorithmDropdownOpen}
            setIsDropdownOpen={setIsAlgorithmDropdownOpen}
            onSelectItem={handleSelectAlgorithm}
            isVisualizing={false}
          >
            {selectedAlgorithm.name}
          </DropdownMenu>
          <Button
            onClick={runAlgorithm}
            className="hover:scale-[1.15] active:scale-105 transition-all"
          >
            Visualize {selectedAlgorithm.name}
          </Button>
          <DropdownMenu
            items={Object.keys(speeds)}
            renderItem={(item) => <div>{item}</div>}
            isDropdownOpen={isSpeedDropdownOpen}
            setIsDropdownOpen={setIsSpeedDropdownOpen}
            onSelectItem={(item) => setSelectedSpeed(item as keyof Speed)}
            isVisualizing={false}
          >{`Speed: ${selectedSpeed}`}</DropdownMenu>
          <Button
            onClick={() => setIsWallToggled(!isWallToggled)}
            className={`hover:scale-[1.05] active:scale-105 transition-all ${
              isWallToggled ? "bg-gray-300" : "bg-blue-300"
            }`}
          >
            {isWallToggled ? (
              <span className="flex items-center">
                Draw Walls <GiBrickWall className="ml-2" />
              </span>
            ) : (
              <span className="flex items-center">
                Draw Weights <FaDumbbell className="ml-2" />
              </span>
            )}
          </Button>
          <Button
            className="hover:scale-[1.05] active:scale-105 transition-all"
            onClick={() => setAllowDiagonalMovement(!allowDiagonalMovement)}
          >
            <span className="flex items-center">
              Diagonal Movement
              {allowDiagonalMovement ? (
                <FaCheck className="ml-2" />
              ) : (
                <MdCancel className="ml-2" />
              )}
            </span>
          </Button>
          <Button
            onClick={clearBoard}
            className="hover:scale-[1.15] active:scale-105 transition-all"
          >
            Clear Visualizations
          </Button>
          <Button
            onClick={resetGrid}
            className="hover:scale-[1.15] active:scale-105 transition-all mr-[0.3rem]"
          >
            Reset Grid
          </Button>
          {/* <DelaySlider speedRef={speedRef} /> */}
        </div>
        <div className="flex items-center gap-2 pr-[6rem]">
          <Button
            onClick={() => setIsLegendOpen(!isLegendOpen)}
            className="flex flex-row items-center gap-1 hover:scale-[1.05] active:scale-105 transition-all"
          >
            Legend <FaChevronDown />
          </Button>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  );
}

export default GridController;
