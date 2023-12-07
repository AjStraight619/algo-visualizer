// Additional imports
import { useResponsiveMSTGrid } from "@/hooks/useResponsiveGridMST";
import { MSTNodeType } from "@/lib/types";
import { calculateRandomWeight } from "@/lib/utils";
import { useEffect, useState } from "react";
import MSTNode from "./MSTNode";

function MSTVisualizer() {
  const { rows, cols, cellSize, gap } = useResponsiveMSTGrid();
  const [grid, setGrid] = useState<MSTNodeType[][]>([]);

  useEffect(() => {
    setGrid(getMSTGrid(rows, cols));
  }, [rows, cols]);

  // Visualization rendering logic goes here

  return (
    <div>
      {grid.map((row, rowIdx) => (
        <div key={rowIdx}>
          {row.map((node, nodeIdx) => {
            const { row, col, isWall, weight, isConnected, parent, edgeList } =
              node;
            return (
              <MSTNode
                key={nodeIdx}
                row={row}
                col={col}
                isWall={isWall}
                weight={weight}
                isConnected={isConnected}
                parent={parent}
                edgeList={edgeList}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default MSTVisualizer;

const createMSTNode = (row: number, col: number): MSTNodeType => {
  const nodeId = `node-${row}-${col}`;
  return {
    id: nodeId,
    row: row,
    col: col,
    isWall: false,
    weight: calculateRandomWeight(),
    isConnected: false,
    parent: null,
    edgeList: [],
  };
};

const getMSTGrid = (rows: number, cols: number): MSTNodeType[][] => {
  const grid: MSTNodeType[][] = [];
  for (let row = 0; row < rows; row++) {
    const currentRow: MSTNodeType[] = [];
    for (let col = 0; col < cols; col++) {
      currentRow.push(createMSTNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};
