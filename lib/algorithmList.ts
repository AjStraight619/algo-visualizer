import { Algorithm } from "@/lib/types";
import { aStar } from "../algorithms/astar";
import { beamSearch } from "../algorithms/beamSearch";
import { bestFirstSearch } from "../algorithms/bestFirstSearch";
import { breadthFirstSearch } from "../algorithms/breadthFirstSearch";
import { depthFirstSearch } from "../algorithms/depthFirstSearch";
import { dijkstra } from "../algorithms/dijkstra";
import { greedyBFS } from "../algorithms/greedyBFS";
import { jumpPointSearch } from "../algorithms/jumpPointSearch";
import { thetaStar } from "../algorithms/thetaStar";

const algorithms: Algorithm[] = [
  {
    name: "A* Search",
    func: aStar,
    description:
      "A* Search algorithm combines features of uniform-cost search and pure heuristic search to efficiently compute optimal paths.",
    weighted: true,
    guaranteesShortestPath: true,
  },
  {
    name: "Beam Search",
    func: beamSearch,
    description:
      "Beam Search is a heuristic search algorithm that explores a graph by expanding the most promising node in a limited set.",
    weighted: false,
    guaranteesShortestPath: false,
  },
  {
    name: "Best First Search",
    func: bestFirstSearch,
    description:
      "Best-First Search is a search algorithm which explores a graph by expanding the most promising node chosen according to a specified rule.",
    weighted: false,
    guaranteesShortestPath: false,
  },
  {
    name: "Breadth First Search",
    func: breadthFirstSearch,
    description:
      "Breadth-First Search (BFS) is an algorithm for traversing or searching tree or graph data structures, starting at the tree root or some arbitrary node of a graph and exploring the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level.",
    weighted: false,
    guaranteesShortestPath: true,
  },
  {
    name: "Depth First Search",
    func: depthFirstSearch,
    description:
      "Depth First Search is an algorithm for searching a graph or tree data structure. It starts at the root and explores as far as possible along each branch before backtracking.",
    weighted: false,
    guaranteesShortestPath: false,
  },
  {
    name: "Dijkstra's Algorithm",
    func: dijkstra,
    description:
      "Dijkstra's Algorithm finds the shortest path between nodes in a graph, which may represent, for example, road networks.",
    weighted: true,
    guaranteesShortestPath: true,
  },
  {
    name: "Greedy Best First Search",
    func: greedyBFS,
    description:
      "Greedy Best-First Search is a search algorithm that selects the path which appears to be the best at that moment. It is the combination of depth-first and breadth-first search algorithms.",
    weighted: false,
    guaranteesShortestPath: false,
  },
  {
    name: "Jump Point Search",
    func: jumpPointSearch,
    description:
      'Jump Point Search is an optimization of the A* search algorithm, reducing its overhead by "jumping" over certain nodes in the search space.',
    weighted: true,
    guaranteesShortestPath: true,
  },

  // DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD disabled is true D, D, D, I dont want to include it in the list because it is still be implemented so I do not include it by using .filter and return an array of algorithms that are NOT disbaled..... D
  {
    name: "Theta* Search",
    func: thetaStar,
    description:
      "Theta* is a pathfinding algorithm that is a variant of A*. It allows re-parenting of nodes to non-adjacent nodes which can result in shorter and more realistic-looking paths in certain scenarios.",
    weighted: true,
    guaranteesShortestPath: true,
  },
];

export { algorithms };
