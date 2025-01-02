import { NodeType } from "@/lib/types";
import { useEffect } from "react";

type useNodeAnimationsProps = {
  visitedNodesInOrder: NodeType[] | null;
  setVisitedNodesInOrder: (visitedNodesInOrder: NodeType[] | null) => void;
  nodesInShortestPathOrder: NodeType[] | null;
  setNodesInShortestPathOrder: (
    nodesInShortestPathOrder: NodeType[] | null,
  ) => void;
  selectedSpeed: number;
  didResetGrid: boolean;
  setIsAnimating: (isVisualizing: boolean) => void;
};

export const useNodeAnimations = ({
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  selectedSpeed,
  didResetGrid,
  setIsAnimating,
}: useNodeAnimationsProps) => {
  useEffect(() => {
    const timeouts: number[] = [];

    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      setIsAnimating(true);
      visitedNodesInOrder.forEach((node, nodeIdx) => {
        const timeoutId = window.setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`,
          );
          element?.classList.add("node-visited");
        }, selectedSpeed * nodeIdx);
        timeouts.push(timeoutId);
      });

      const pathAnimationDelay = selectedSpeed * visitedNodesInOrder.length;
      nodesInShortestPathOrder.forEach((node, nodeIdx) => {
        const timeoutId = window.setTimeout(
          () => {
            const element = document.getElementById(
              `node-${node.row}-${node.col}`,
            );
            element?.classList.add("node-shortest-path");
            // If this is the last node, set isVisualizing to false
            if (nodeIdx === nodesInShortestPathOrder.length - 1) {
              setIsAnimating(false);
            }
          },
          pathAnimationDelay + selectedSpeed * nodeIdx,
        );
        timeouts.push(timeoutId);
      });
    }

    // Cleanup function to clear timeouts if the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
      // If cleanup is running and animations are not complete, set isVisualizing to false
      if (timeouts.length > 0) {
        setIsAnimating(false);
      }
    };
  }, [
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    selectedSpeed,
    didResetGrid,
    setIsAnimating,
  ]);
};
