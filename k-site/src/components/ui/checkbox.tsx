import React, { forwardRef, type HTMLAttributes } from "react";
import { LuCheck } from "react-icons/lu";
import { cn } from "@/lib/utils";

interface CheckboxProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
  checked?: boolean | string | number | Date | undefined;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
}

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ className, checked, onChange, disabled, ...props }, ref) => {
    // Coerce checked value to boolean (handle various types from form fields)
    const isChecked =
      checked === true ||
      checked === "true" ||
      checked === 1 ||
      (checked instanceof Date && !isNaN(checked.getTime())) ||
      (typeof checked === "string" && checked !== "false" && checked !== "0");

    const handleClick = () => {
      if (!disabled && onChange) {
        onChange(!isChecked);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if ((e.key === "Enter" || e.key === " ") && !disabled) {
        e.preventDefault();
        handleClick();
      }
    };

    return (
      <div
        ref={ref}
        role="checkbox"
        aria-checked={isChecked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded-sm border border-slate-900 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-disabled disabled:opacity-50",
          isChecked
            ? "bg-slate-900 text-white"
            : "dark:border-slate-50 dark:ring-offset-slate-950",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        {...props}
      >
        {isChecked && (
          <div className={cn("flex items-center justify-center text-current")}>
            <LuCheck className="h-4 w-4" />
          </div>
        )}
      </div>
    );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
