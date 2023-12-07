import { EdgeType, MSTNodeType } from "@/lib/types";

type MSTNodeProps = {
  row: number;
  col: number;
  isWall: boolean;
  weight: number;
  isConnected: boolean;
  parent: MSTNodeType | null;
  edgeList: EdgeType[];
};

function MSTNode({
  row,
  col,
  isWall,
  weight,
  isConnected,
  parent,
  edgeList,
}: MSTNodeProps) {
  return (
    <div id={`node-${row}-${col}`}>
      {isConnected ? (
        <div className="node-connected"></div>
      ) : (
        <div className="node-unconnected"></div>
      )}
    </div>
  );
}

export default MSTNode;
