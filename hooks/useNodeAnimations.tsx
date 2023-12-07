import { NodeType } from "@/lib/types";
import { useEffect } from "react";

type useNodeAnimationsProps = {
  visitedNodesInOrder: NodeType[] | null;
  setVisitedNodesInOrder: (visitedNodesInOrder: NodeType[] | null) => void;
  nodesInShortestPathOrder: NodeType[] | null;
  setNodesInShortestPathOrder: (
    nodesInShortestPathOrder: NodeType[] | null
  ) => void;
  selectedSpeed: number;
  didResetGrid: boolean;
  setIsVisualizing: (isVisualizing: boolean) => void;
};

/**
 * Custom hook for animating nodes in a pathfinding grid.
 *
 * @param {Object} props - The properties for the hook.
 * @param {NodeType} props.startNode - The starting node of the pathfinding algorithm.
 * @param {NodeType[]} props.visitedNodesInOrder - An array of nodes visited in order during the pathfinding algorithm.
 * @param {NodeType[]} props.nodesInShortestPathOrder - An array of nodes that form the shortest path, found by the pathfinding algorithm.
 * @returns {Object} Returns an object containing the spring API for animations.
 */
export const useNodeAnimations = ({
  visitedNodesInOrder,
  nodesInShortestPathOrder,
  selectedSpeed,
  didResetGrid,
  setIsVisualizing,
}: useNodeAnimationsProps): object => {
  useEffect(() => {
    const timeouts: number[] = [];

    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      setIsVisualizing(true);
      visitedNodesInOrder.forEach((node, nodeIdx) => {
        const timeoutId = window.setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          element?.classList.add("node-visited");
        }, selectedSpeed * nodeIdx);
        timeouts.push(timeoutId);
      });

      const pathAnimationDelay = selectedSpeed * visitedNodesInOrder.length;
      nodesInShortestPathOrder.forEach((node, nodeIdx) => {
        const timeoutId = window.setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          element?.classList.add("node-shortest-path");
          // If this is the last node, set isVisualizing to false
          if (nodeIdx === nodesInShortestPathOrder.length - 1) {
            setIsVisualizing(false);
          }
        }, pathAnimationDelay + selectedSpeed * nodeIdx);
        timeouts.push(timeoutId);
      });
    }

    // Cleanup function to clear timeouts if the component unmounts
    return () => {
      timeouts.forEach(clearTimeout);
      // If cleanup is running and animations are not complete, set isVisualizing to false
      if (timeouts.length > 0) {
        setIsVisualizing(false);
      }
    };
  }, [
    visitedNodesInOrder,
    nodesInShortestPathOrder,
    selectedSpeed,
    didResetGrid,
    setIsVisualizing,
  ]);

  return {};
};
