export type NodeType = {
  row: number;
  col: number;
  isStart: boolean;
  isFinish: boolean;
  startNodePosition: StartNodePosition;
  finishNodePosition: FinishNodePosition;
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

export type StartNodePosition = {
  row: number;
  col: number;
};

export type FinishNodePosition = {
  row: number;
  col: number;
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
