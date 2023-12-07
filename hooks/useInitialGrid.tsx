"use client";
import { useEffect } from "react";

export const useInitialGrid = () => {
  useEffect(() => {
    window.addEventListener("resize", () => {
      console.log("this is the width of the current window", window.innerWidth);
      console.log(
        "this is the height of the current window",
        window.innerHeight
      );
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);
};
