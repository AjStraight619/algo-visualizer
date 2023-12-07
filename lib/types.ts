export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  startNodePosition: StartFinishNodePosition;
  finishNodePosition: StartFinishNodePosition;
  isWall: boolean;
  isWeight: boolean;
  weight: number;
  gScore: number;
  hScore: number;
  fScore: number;
  isVisited: boolean;
  parent: NodeType | null;
  isAnimated: boolean;
  totalDistance: number;
  distance: number;
  opened: boolean;
};

export type GridDimensions = {
  rows: number;
  cols: number;
  startNode: { row: number; col: number };
  finishNode: { row: number; col: number };
  cellSize: number;
};

export type StartFinishNodePosition = {
  row: number;
  col: number;
};

export type Algorithm = {
  name: string;
  func: (
    grid: NodeType[][],
    startNode: NodeType,
    finishNode: NodeType,
    allowDiagonal: boolean,
    beamWidth?: number
  ) => NodeType[];
  weighted: boolean;
  guaranteesShortestPath: boolean;
  description: string;
};
