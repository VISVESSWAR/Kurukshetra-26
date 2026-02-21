import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

const ScrollArea = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden h-full w-full", className)}
      {...props}
    >
      <div className="h-full w-full overflow-auto rounded-[inherit]">
        {children}
      </div>
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
    </div>
  );
});
ScrollArea.displayName = "ScrollArea";

interface ScrollBarProps {
  className?: string;
  orientation?: "vertical" | "horizontal";
}

const ScrollBar = ({ className, orientation = "vertical" }: ScrollBarProps) => {
  return (
    <div
      className={cn(
        "absolute flex touch-none select-none transition-opacity",
        orientation === "vertical"
          ? "right-0 top-0 h-full w-2.5 border-l border-l-transparent"
          : "bottom-0 left-0 h-2.5 w-full border-t border-t-transparent",
        className
      )}
    >
      <div className="relative flex-1 rounded-full bg-slate-800"></div>
    </div>
  );
};
ScrollBar.displayName = "ScrollBar";

export { ScrollArea, ScrollBar };
