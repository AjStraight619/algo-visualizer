import { EdgeType, MSTNodeType } from "@/lib/types";
import Heap from "heap-js";

export const primsAlgorithm = (
  nodes: MSTNodeType[],
  startNode: MSTNodeType
): MSTNodeType[] => {
  const minHeap = new Heap<EdgeType>((a, b) => a.weight - b.weight);
  const result: MSTNodeType[] = [];
  const visited = new Set<MSTNodeType>();

  const processNode = (node: MSTNodeType) => {
    visited.add(node);
    node.edgeList.forEach((edge) => {
      if (!visited.has(edge.nodeA) || !visited.has(edge.nodeB)) {
        minHeap.push(edge);
      }
    });

    while (!minHeap.isEmpty()) {
      const smallestEdge = minHeap.pop();
      if (!smallestEdge) continue;

      const { nodeA, nodeB } = smallestEdge;

      let nextNode = null;
      if (visited.has(nodeA) && !visited.has(nodeB)) {
        nextNode = nodeB;
      } else if (visited.has(nodeB) && !visited.has(nodeA)) {
        nextNode = nodeA;
      }

      if (nextNode && !visited.has(nextNode)) {
        visited.add(nextNode);
        result.push(nextNode);
        nextNode.edgeList.forEach((edge) => {
          if (!visited.has(edge.nodeB) && !visited.has(edge.nodeA)) {
            minHeap.push(edge);
          }
        });
      }
    }
  };

  processNode(startNode);

  nodes.forEach((node) => {
    if (!visited.has(node)) {
      processNode(node);
    }
  });

  return result;
};
