"use client";
import { useTheme } from "@/context/ThemeContext";
import { BsMoon, BsSun } from "react-icons/bs";

/**
 * A component that renders a button to toggle between light and dark themes.
 *
 * @returns {JSX.Element} A button element that toggles the theme on click.
 */
export default function ThemeSwitch(): JSX.Element {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="fixed top-[1rem] right-[1rem] bg-white w-[3rem] h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] border border-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      onClick={toggleTheme}
    >
      {theme === "light" ? <BsSun /> : <BsMoon />}
    </button>
  );
}
