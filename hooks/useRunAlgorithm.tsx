import { NodeType, StartFinishNodePosition } from "@/lib/types";

type useRunAlgorithmProps = {
  grid: NodeType[][];
  startNodePosition: StartFinishNodePosition;
  finishNodePosition: StartFinishNodePosition;
};

export const useRunAlgorithm = ({
  grid,
  startNodePosition,
  finishNodePosition,
}: useRunAlgorithmProps) => {
  return <div>useRunAlgorithm</div>;
};
