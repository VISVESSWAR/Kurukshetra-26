import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { LuChevronDown } from "react-icons/lu";
import { createPortal } from "react-dom";

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
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

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

  // Handle outside click properly (including portal)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      const portalEl = document.getElementById("custom-select-portal");

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        portalEl &&
        !portalEl.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

 
  // const toggleDropdown = () => {
  //   if (disabled) return;

  //   if (!isOpen && wrapperRef.current) {
  //     const rect = wrapperRef.current.getBoundingClientRect();

  //     setDropdownStyle({
  //       position: "absolute",
  //       top: rect.bottom + window.scrollY + 4,
  //       left: rect.left + window.scrollX,
  //       width: rect.width,
  //       zIndex: 9999,
  //     });
  //   }

  //   setIsOpen((prev) => !prev);
  // };
  const toggleDropdown = () => {
  if (disabled) return;

  if (!isOpen && wrapperRef.current) {
    const rect = wrapperRef.current.getBoundingClientRect();

    const minWidth = 160; // minimum usable dropdown width
    const calculatedWidth = Math.max(rect.width, minWidth);

    let left = rect.left + window.scrollX;

    // Prevent right overflow
    if (left + calculatedWidth > window.innerWidth) {
      left = window.innerWidth - calculatedWidth - 8;
    }

    setDropdownStyle({
      position: "absolute",
      top: rect.bottom + window.scrollY + 6,
      left,
      width: calculatedWidth,
      zIndex: 9999,
    });
  }

  setIsOpen((prev) => !prev);
};
  const displayValue = getDisplayValue();

  return (
    <div className="relative w-full" ref={wrapperRef}>
      <button
        type="button"
        onClick={toggleDropdown}
        disabled={disabled}
        className={cn(
          "w-full h-10 px-4 py-2 text-sm text-white border-0 outline-none cursor-pointer transition-all duration-200",
          "rounded-full flex items-center justify-center gap-2",
          "border border-white/50 bg-transparent",
          "focus:outline-none focus-visible:border-[#7a28ff] focus-visible:shadow-[0_0_12px_rgba(122,40,255,0.4)]",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        <span className={displayValue ? "text-white" : "text-gray-400"}>
          {displayValue || placeholder}
        </span>

        <LuChevronDown
          className={cn(
            "h-4 w-4 text-white transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            id="custom-select-portal"
            style={dropdownStyle}
            className="max-h-60 overflow-y-auto rounded-xl border border-white/30 bg-slate-950/95 backdrop-blur-md shadow-2xl"
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
                      : "text-white/80 hover:bg-violet-600/30 hover:text-white",
                  )}
                >
                  {option.name || option.label}
                </button>
              ))}
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};

export { CustomSelect };
