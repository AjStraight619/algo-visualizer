"use client";
import GridController from "@/components/GridController";
import Legend from "@/components/Legend";
import Pathfinding from "@/components/Pathfinding";
import { useState } from "react";

export default function Home() {
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  return (
    <main className="flex min-h-screen gap-1 items-start justify-start pt-[8rem]">
      <GridController
        setIsLegendOpen={setIsLegendOpen}
        isLegendOpen={isLegendOpen}
      />
      <Pathfinding />
      <Legend isLegendOpen={isLegendOpen} />
    </main>
  );
}
