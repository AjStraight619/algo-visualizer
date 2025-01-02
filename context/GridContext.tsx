"use client";
import { NodeType, StartFinishNodePosition } from "@/lib/types";
import { debounce, getGrid } from "@/lib/utils";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

type GridContextType = {
  isAnimating: boolean;
  setIsAnimating: React.Dispatch<SetStateAction<boolean>>;
  isWallToggled: boolean;
  setIsWallToggled: React.Dispatch<SetStateAction<boolean>>;
  grid: NodeType[][];
  setGrid: React.Dispatch<SetStateAction<NodeType[][]>>;
  startNodePosition: StartFinishNodePosition | null;
  finishNodePosition: StartFinishNodePosition | null;
  setStartNodePosition: React.Dispatch<
    SetStateAction<StartFinishNodePosition | null>
  >;
  setFinishNodePosition: React.Dispatch<
    SetStateAction<StartFinishNodePosition | null>
  >;
  getInitialGrid: () => NodeType[][];
};

const GridContext = createContext<GridContextType | null>(null);

const GridProvider = ({ children }: { children: ReactNode }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isWallToggled, setIsWallToggled] = useState(true);

  const {
    grid,
    setGrid,
    startNodePosition,
    getInitialGrid,
    setStartNodePosition,
    finishNodePosition,
    setFinishNodePosition,
  } = useInitialGrid(isAnimating);

  return (
    <GridContext.Provider
      value={{
        isAnimating,
        setIsAnimating,
        isWallToggled,
        setIsWallToggled,
        startNodePosition,
        finishNodePosition,
        setStartNodePosition,
        setFinishNodePosition,
        grid,
        setGrid,
        getInitialGrid,
      }}
    >
      {children}
    </GridContext.Provider>
  );
};

export const useGrid = () => {
  const context = useContext(GridContext);

  if (!context) {
    throw new Error("useGrid must be used within GridProvider");
  }

  return context;
};

export const useInitialGrid = (isAnimating?: boolean) => {
  // Dynamically calculate rows and cols based on window size

  const calculateGridDimensions = useCallback(() => {
    const rows = Math.floor(window.innerHeight / 28); // 30px node height
    const cols = Math.floor(window.innerWidth / 24); // 24px node width
    return { rows, cols };
  }, []);

  // Calculate initial rows and cols
  const { rows, cols } = calculateGridDimensions();

  // Set default positions for start and finish nodes
  const defaultStartNode = {
    row: Math.floor(rows / 2),
    col: Math.floor(cols / 9),
  };
  const defaultFinishNode = {
    row: Math.floor(rows / 2),
    col: Math.floor((cols * 9) / 10),
  };

  // State for the start and finish node positions
  const [startNodePosition, setStartNodePosition] =
    useState<StartFinishNodePosition | null>(defaultStartNode);
  const [finishNodePosition, setFinishNodePosition] =
    useState<StartFinishNodePosition | null>(defaultFinishNode);

  // Function to generate the grid
  const getInitialGrid = useCallback(() => {
    const { rows, cols } = calculateGridDimensions();
    const startNode = startNodePosition || defaultStartNode;
    const finishNode = finishNodePosition || defaultFinishNode;

    return getGrid(rows, cols, startNode, finishNode);
  }, [
    calculateGridDimensions,
    startNodePosition,
    finishNodePosition,
    defaultStartNode,
    defaultFinishNode,
  ]);

  // Initialize grid state
  const [grid, setGrid] = useState<NodeType[][]>(() => getInitialGrid());

  // Sync grid and node positions during window resize
  useEffect(() => {
    if (isAnimating) return;

    const handleResize = debounce(() => {
      const { rows, cols } = calculateGridDimensions();
      const newStartNode = {
        row: Math.floor(rows / 2),
        col: Math.floor(cols / 9),
      };
      const newFinishNode = {
        row: Math.floor(rows / 2),
        col: Math.floor((cols * 9) / 10),
      };

      setStartNodePosition(newStartNode);
      setFinishNodePosition(newFinishNode);
      setGrid(getGrid(rows, cols, newStartNode, newFinishNode));
    }, 10);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [calculateGridDimensions, isAnimating]);

  return {
    grid,
    setGrid,
    getInitialGrid,
    startNodePosition,
    finishNodePosition,
    setStartNodePosition,
    setFinishNodePosition,
  };
};

export default GridProvider;
