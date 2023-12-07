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
  gScore?: number;
  hScore?: number;
  fScore?: number;
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

export type MSTNodeType = {
  id: string;
  row: number;
  col: number;
  isWall: boolean;
  weight: number;
  isConnected: boolean;
  parent: MSTNodeType | null;
  edgeList: EdgeType[];
};

export type EdgeType = {
  nodeA: MSTNodeType;
  nodeB: MSTNodeType;
  weight: number;
  isActive: boolean;
};

export type MSTGridDimensions = {
  rows: number;
  cols: number;
  cellSize: number;
  gap: number;
};

export type MSTAlgorithm = {
  name: string;
  func: (nodes: MSTNodeType[], startNode: MSTNodeType) => MSTNodeType[];
  description: string;
};

export type Speed = {
  [key: string]: number;
};
