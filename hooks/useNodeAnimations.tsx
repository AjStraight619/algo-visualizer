import { NodeType } from "@/lib/types";
import { MutableRefObject, SetStateAction, useEffect } from "react";

type useNodeAnimationsProps = {
  visitedNodesInOrder: NodeType[] | null;
  setVisitedNodesInOrder: React.Dispatch<SetStateAction<NodeType[] | null>>;
  nodesInShortestPathOrder: NodeType[] | null;
  setNodesInShortestPathOrder: React.Dispatch<
    SetStateAction<NodeType[] | null>
  >;
  speedRef: MutableRefObject<number[]>;
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
  speedRef,
  didResetGrid,
}: useNodeAnimationsProps): object => {
  useEffect(() => {
    console.log("use effect re running");
    const timeouts: number[] = [];

    if (visitedNodesInOrder && nodesInShortestPathOrder) {
      visitedNodesInOrder.forEach((node, nodeIdx) => {
        const timeoutId = setTimeout(() => {
          const element = document.getElementById(
            `node-${node.row}-${node.col}`
          );

          element?.classList.add("node-visited");
        }, speedRef.current[0] * nodeIdx) as unknown as number;
        timeouts.push(timeoutId);
      });

      const pathAnimationDelay =
        visitedNodesInOrder.length * speedRef.current[0];
      const pathAnimationTimeoutId = setTimeout(() => {
        nodesInShortestPathOrder.forEach((node, nodeIdx) => {
          const timeoutId = setTimeout(() => {
            const element = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            element?.classList.add("node-shortest-path");
          }, nodeIdx * speedRef.current[0]) as unknown as number;
          timeouts.push(timeoutId);
        });
      }, pathAnimationDelay) as unknown as number;
      timeouts.push(pathAnimationTimeoutId);
    }

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [visitedNodesInOrder, nodesInShortestPathOrder, speedRef, didResetGrid]);

  return {};
};
