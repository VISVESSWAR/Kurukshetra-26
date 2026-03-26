import React, { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value"> {
  value?: string | number | boolean | Date | null | undefined;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, value, ...props }, ref) => {
    const stringValue =
      value === null || value === undefined
        ? ""
        : value instanceof Date
          ? value.toISOString().split("T")[0]
          : typeof value === "boolean"
            ? value.toString()
            : String(value);

    return (
      <input
        type={type}
        value={stringValue}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
