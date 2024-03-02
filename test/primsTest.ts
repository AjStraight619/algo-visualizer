import { primsAlgorithm } from "../algorithms/mst/prims";
import { EdgeType, MSTNodeType } from "../lib/types";

describe("Prim's Algorithm", () => {
  test("should create a minimum spanning tree", () => {
    // Create more nodes
    const nodes: MSTNodeType[] = [
      {
        id: "A",
        row: 0,
        col: 0,
        weight: 1,
        isConnected: false,
        parent: null,
        edgeList: [],
      },
      {
        id: "B",
        row: 0,
        col: 1,
        weight: 2,
        isConnected: false,
        parent: null,
        edgeList: [],
      },
      {
        id: "C",
        row: 1,
        col: 0,
        weight: 3,
        isConnected: false,
        parent: null,
        edgeList: [],
      },
      {
        id: "D",
        row: 1,
        col: 1,
        weight: 4,
        isConnected: false,
        parent: null,
        edgeList: [],
      },
      {
        id: "E",
        row: 2,
        col: 0,
        weight: 5,
        isConnected: false,
        parent: null,
        edgeList: [],
      },
      // Add more nodes as needed
    ];

    const connectNodes = (
      nodeA: MSTNodeType,
      nodeB: MSTNodeType,
      weight: number
    ) => {
      const edge: EdgeType = { nodeA, nodeB, weight, isActive: false };
      nodeA.edgeList.push(edge);
      nodeB.edgeList.push(edge);
    };

    connectNodes(nodes[0], nodes[1], 5);
    connectNodes(nodes[1], nodes[2], 10);
    connectNodes(nodes[2], nodes[3], 6);
    connectNodes(nodes[3], nodes[4], 4);

    const startNode = nodes[0];

    const mst = primsAlgorithm(nodes, startNode);
    const simplifiedMST = mst.map((node) => ({
      id: node.id,
      row: node.row,
      col: node.col,
      weight: node.weight,
    }));

    console.log(
      "Minimum Spanning Tree:",
      JSON.stringify(simplifiedMST, null, 2)
    );

    // Create a snapshot
    expect(mst).toMatchSnapshot();

    // Test assertions
    expect(mst).toBeInstanceOf(Array);
    expect(mst).toHaveLength(nodes.length - 1); // The MST should have one less edge than the number of nodes
  });
});
