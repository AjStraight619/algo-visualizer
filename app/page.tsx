"use client";
import AlgorithmInfo from "@/components/AlgorithmInfo";
import GridController from "@/components/GridController";
import MobileWarning from "@/components/MobileWarning";
import Pathfinding from "@/components/Pathfinding";
import { algorithms } from "@/lib/algorithmList";
import { Algorithm } from "@/lib/types";
import dynamic from "next/dynamic";
import { useState } from "react";

const DynamicGridProvider = dynamic(() => import("../context/GridContext"), {
  ssr: false, // Disables server-side rendering for this module
});

export default function Home() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<Algorithm>(
    algorithms[0],
  );

  return (
    <DynamicGridProvider>
      <MobileWarning />
      <div className="flex flex-col min-h-screen gap-y-2 pt-[5rem]">
        <GridController
          selectedAlgorithm={selectedAlgorithm}
          setSelectedAlgorithm={setSelectedAlgorithm}
        />
        <AlgorithmInfo selectedAlgorithm={selectedAlgorithm} />
        <Pathfinding />
      </div>
    </DynamicGridProvider>
  );
}
