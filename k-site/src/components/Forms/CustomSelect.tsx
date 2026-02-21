import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LuChevronDown } from "react-icons/lu";

export interface SelectOption {
  value: string | number;
  label: string;
  name?: string;
  code?: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value?: SelectOption | string | number | boolean | Date;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getDisplayValue = (): string => {
    if (value === undefined || value === null) return "";
    
    const valueStr = String(value);
    const option = options.find((opt) => String(opt.value) === valueStr);
    
    if (option) {
      return option.name || option.label || String(option.value);
    }
    return valueStr;
  };

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const displayValue = getDisplayValue();

  return (
    <div 
      className="relative w-full" 
      ref={dropdownRef}
      style={{ zIndex: isOpen ? 50 : 1 }}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full h-10 px-4 py-2 text-sm text-white border-0 outline-none cursor-pointer transition-all duration-200",
          "rounded-full flex items-center justify-between",
          "border border-white/50 bg-transparent backdrop-blur-xs",
          "focus:outline-none focus-visible:border-[#7a28ff] focus-visible:shadow-[0_0_12px_rgba(122,40,255,0.4)]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <span className={displayValue ? "text-white" : "text-gray-400"}>
          {displayValue || placeholder}
        </span>
        <LuChevronDown 
          className={cn(
            "h-4 w-4 text-white transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div 
          className="absolute w-full mt-2 max-h-60 overflow-y-auto rounded-xl border border-white/30 bg-slate-950/95 backdrop-blur-md shadow-2xl"
          style={{ zIndex: 50 }}
        >
          <div className="py-1">
            {options.map((option) => (
              <button
                key={`${option.value}-${option.label}`}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "w-full px-4 py-2.5 text-left text-sm transition-colors duration-150",
                  String(value) === String(option.value)
                    ? "bg-violet-600/50 text-white font-semibold"
                    : "text-white/80 hover:bg-violet-600/30 hover:text-white"
                )}
              >
                {option.name || option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export { CustomSelect };
