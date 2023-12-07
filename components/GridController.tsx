"use client";
import { useNodeAnimations } from "@/hooks/useNodeAnimations";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm, NodeType, StartFinishNodePosition } from "@/lib/types";
import { getNodesInShortestPathOrder } from "@/lib/utils";
import { useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Button from "./Button";
import DropdownMenu from "./DropdownMenu";

type GridControllerProps = {
  setIsLegendOpen: (isLegendOpen: boolean) => void;
  isLegendOpen: boolean;
  isVisualizing: boolean;
  setIsVisualizing: (isVisualizing: boolean) => void;
  startNodePosition: StartFinishNodePosition | null;
  finishNodePosition: StartFinishNodePosition | null;
  grid: NodeType[][];
};

function GridController({
  setIsLegendOpen,
  isLegendOpen,
  isVisualizing,
  setIsVisualizing,
  startNodePosition,
  finishNodePosition,
  grid,
}: GridControllerProps) {
  console.log("This is the grid in GridController: ", grid);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);
  const [didResetGrid, setDidResetGrid] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0]
  );
  const speedRef = useRef(1);
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
    setDidResetGrid(false);
    console.log(
      "running algorithm, startNodePosition: ",
      startNodePosition,
      "finishNodePosition: ",
      finishNodePosition
    );

    if (!startNodePosition || !finishNodePosition) return;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = selectedAlgorithm.func(
      grid,
      startNode,
      finishNode,
      allowDiagonalMovement
    );
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
  });

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
          <Button
            onClick={runAlgorithm}
            className="hover:scale-[1.15] active:scale-105 transition-all"
          >
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
