import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";

const Popover = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        if (child.type === PopoverTrigger) {
          return React.cloneElement(child as React.ReactElement<{ onClick?: () => void }>, {
            onClick: togglePopover,
          });
        }
        if (child.type === PopoverContent) {
          return isOpen
            ? React.cloneElement(child as React.ReactElement<{ closePopover?: () => void }>, {
                closePopover,
              })
            : null;
        }
        return child;
      })}
    </div>
  );
};

const PopoverTrigger = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ onClick, className, children }, ref) => (
  <button
    ref={ref}
    onClick={onClick}
    className={className}
  >
    {children}
  </button>
));
PopoverTrigger.displayName = "PopoverTrigger";

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  closePopover?: () => void;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
}

const PopoverContent = forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, closePopover, align = "start", side = "right", children }, ref) => {
    const alignClass = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }[align];

    const sideClass = {
      top: "bottom-full mb-2",
      right: "left-full ml-2",
      bottom: "top-full mt-2",
      left: "right-full mr-2",
    }[side];

    return (
      <div
        ref={ref}
        className={cn(
          `absolute z-50 w-72 rounded-md border border-slate-200 bg-white p-4 text-slate-950 shadow-md dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 ${alignClass} ${sideClass}`,
          className
        )}
      >
        <div className="relative">
          {closePopover && (
            <button
              className="absolute top-2 right-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              onClick={closePopover}
            >
              ×
            </button>
          )}
          {children}
        </div>
      </div>
    );
  }
);
PopoverContent.displayName = "PopoverContent";

export { Popover, PopoverTrigger, PopoverContent };
