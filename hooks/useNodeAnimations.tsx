import { NodeType } from "@/lib/types";
import { SetStateAction, useEffect } from "react";

type useNodeAnimationsProps = {
  visitedNodesInOrder: NodeType[] | null;
  setVisitedNodesInOrder: React.Dispatch<SetStateAction<NodeType[] | null>>;
  nodesInShortestPathOrder: NodeType[] | null;
  setNodesInShortestPathOrder: React.Dispatch<
    SetStateAction<NodeType[] | null>
  >;
  speed?: number[];
  didResetGrid: boolean;
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
  speed,
  didResetGrid,
}: useNodeAnimationsProps): object => {
  let animationSpeed = 10;

  useEffect(() => {
    const timeouts: number[] = [];

    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      visitedNodesInOrder.forEach((node, nodeIdx) => {
        const timeoutId = setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );

          element?.classList.add("node-visited");
        }, animationSpeed * nodeIdx) as unknown as number;
        timeouts.push(timeoutId);
      });

      const pathAnimationDelay = visitedNodesInOrder.length * animationSpeed;
      const pathAnimationTimeoutId = setTimeout(() => {
        nodesInShortestPathOrder.forEach((node, nodeIdx) => {
          const timeoutId = setTimeout(() => {
            const element = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            element?.classList.add("node-shortest-path");
          }, nodeIdx * animationSpeed) as unknown as number;
          timeouts.push(timeoutId);
        });
      }, pathAnimationDelay) as unknown as number;
      timeouts.push(pathAnimationTimeoutId);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [
    visitedNodesInOrder,
    nodesInShortestPathOrder,

    animationSpeed,
    didResetGrid,
  ]);

  return {};
};
