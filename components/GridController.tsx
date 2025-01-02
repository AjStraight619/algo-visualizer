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
import { FaCheck, FaDumbbell } from "react-icons/fa";
import { GiBrickWall } from "react-icons/gi";
import { MdCancel } from "react-icons/md";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ChevronDownIcon, GithubIcon } from "lucide-react";
import Legend from "./Legend";
import { ModeToggle } from "./ThemeSwitch";
import { useGrid } from "@/context/GridContext";

type GridControllerProps = {
  selectedAlgorithm: Algorithm;
  setSelectedAlgorithm: (algorithm: Algorithm) => void;
};

const speeds: Speed = {
  Slow: 50,
  Medium: 25,
  Fast: 10,
};

function GridController({
  selectedAlgorithm,
  setSelectedAlgorithm,
}: GridControllerProps) {
  const [allowDiagonalMovement, setAllowDiagonalMovement] = useState(false);
  const [didResetGrid, setDidResetGrid] = useState(false);
  const [selectedSpeed, setSelectedSpeed] = useState<keyof Speed>("Medium");

  const {
    grid,
    setGrid,
    isAnimating,
    setIsAnimating,
    getInitialGrid,
    isWallToggled,
    setIsWallToggled,
    startNodePosition,
    finishNodePosition,
  } = useGrid();

  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState<
    NodeType[] | null
  >(null);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState<
    NodeType[] | null
  >(null);

  const clearBoard = () => {
    setVisitedNodesInOrder(null);
    setGrid((prevGrid) =>
      prevGrid.map((row) =>
        row.map((node) => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`,
          );
          element?.classList.remove("node-visited", "node-shortest-path");
          return {
            ...node,
            isVisited: false,
          };
        }),
      ),
    );
  };
  const resetGrid = () => {
    setVisitedNodesInOrder(null);
    const initialGrid = getInitialGrid();
    setGrid(initialGrid);
    initialGrid.forEach((row) =>
      row.forEach((node) => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        element?.classList.remove(
          "node-visited",
          "node-shortest-path",
          "node-weight",
          "node-wall",
        );
      }),
    );
  };

  const runAlgorithm = () => {
    if (isAnimating) return;

    if (!startNodePosition || !finishNodePosition) return;
    const startNode = grid[startNodePosition.row][startNodePosition.col];
    const finishNode = grid[finishNodePosition.row][finishNodePosition.col];
    const visitedNodesInOrder = selectedAlgorithm.func(
      grid,
      startNode,
      finishNode,
      allowDiagonalMovement,
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
    selectedSpeed: speeds[selectedSpeed],
    setIsAnimating,
  });

  return (
    <div className="top-0 fixed h-16 w-screen border-b border-muted-foreground overflow-x-auto">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                {selectedAlgorithm.name}
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {algorithms.map((algo, idx) => (
                <DropdownMenuItem
                  onClick={() => setSelectedAlgorithm(algo)}
                  key={idx}
                >
                  {algo.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={runAlgorithm}>
            Visualize {selectedAlgorithm.name}
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button>
                {selectedSpeed}
                <ChevronDownIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedSpeed("Slow")}>
                Slow
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSpeed("Medium")}>
                Medium
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedSpeed("Fast")}>
                Fast
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => setIsWallToggled(!isWallToggled)}>
            {isWallToggled ? (
              <span className="flex items-center gap-x-2">
                Draw Walls <GiBrickWall />
              </span>
            ) : (
              <span className="flex items-center gap-x-2">
                Draw Weights <FaDumbbell />
              </span>
            )}
          </Button>
          <Button
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
          <Button onClick={clearBoard}>Clear Visualizations</Button>
          <Button onClick={resetGrid}>Reset Grid</Button>
          {/* <DelaySlider speedRef={speedRef} /> */}
          <Legend />
        </div>
        <div className="flex items-center gap-x-2 ml-1">
          <a
            href="https://github.com/AjStraight619/algo-visualizer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="rounded-full" variant="ghost" size="icon">
              <GithubIcon className="text-muted-foreground" />
            </Button>
          </a>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}

export default GridController;
