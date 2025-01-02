"use client";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import GridController from "@/components/GridController";
import MobileWarning from "@/components/MobileWarning";
import Pathfinding from "@/components/Pathfinding";
import { GridProvider } from "@/context/GridContext";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm } from "@/lib/types";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0],
  );

  return (
    <GridProvider>
      <MobileWarning />
      <div className="flex flex-col min-h-screen gap-y-2 pt-[5rem]">
        <GridController
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
        <Pathfinding />
      </div>
    </GridProvider>
  );
}
