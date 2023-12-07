import { cn } from "@/lib/ui";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  isLoading,
  disabled,
  className,
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={cn(
        "p-[1rem] rounded-md dark:bg-gray-950 bg-indigo-800",
        className,
        {
          "bg-indigo-500": !disabled,
          "bg-gray-400": disabled,
        }
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
