import { cn } from "@/lib/ui";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

export default function Button({
  isLoading,
  disabled,
  className,
  children,
}: ButtonProps) {
  return <button className={cn("dark:bg-inherit")}>{children}</button>;
}
