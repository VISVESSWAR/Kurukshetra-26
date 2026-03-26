import { useState } from "react";

interface ToggleRegistrationProps {
  className?: string;
  onChange?: (value: "normal" | "bulk") => void;
}

export default function ToggleRegistration({
  className = "",
  onChange,
}: ToggleRegistrationProps) {
  const [active, setActive] = useState<"normal" | "bulk">("normal");

  const handleChange = (value: "normal" | "bulk") => {
    setActive(value);
    onChange?.(value);
  };

  return (
    <div
      className={`
        relative
        flex items-center
        w-[95%] max-w-[450px]
        h-[40px]
        rounded-(--radius-toggle)
        bg-white/[0.02]
        backdrop-blur-md
        border gradient-border
        shadow-[inset_0_-2px_4px_rgba(0,0,0,0.3),inset_0_2px_4px_rgba(255,255,255,0.15)]
        p-1
        ${className}
      `}
    >
      <div
  className={`
    absolute
    top-1 bottom-1
    w-1/2
    rounded-(--radius-toggle)
    bg-white
    transition-all duration-300 ease-out
    ${active === "normal" ? "left-1" : "left-[50%]"}
  `}
/>

      {/* Normal Registration */}
      <button
        onClick={() => handleChange("normal")}
        className={`
          relative z-10
          flex-1 h-full
          flex items-center justify-center gap-3
          rounded-full
          font-normal
          text-[12px]
          lg:text-[15px]
          tracking-wide
          font-(family-name:--orbitron)
          transition-colors duration-300
          ${
            active === "normal"
              ? "text-black"
              : "text-white"
          }
        `}
      >
        <span
          className={`
            ml-2 w-3 h-3 rounded-full border-2
            ${
              active === "normal"
                ? "border-cyan-400 shadow-[0_0_8px_#22d3ee]"
                : "border-white/70"
            }
          `}
        />
        Normal Registration
      </button>

      {/* Bulk Registration */}
      <button
        onClick={() => handleChange("bulk")}
        className={`
          relative z-10
          flex-1 h-full
          flex items-center justify-center gap-3
          rounded-full
          font-normal
           text-[12px]
          lg:text-[15px]
          tracking-wide
          font-(family-name:--orbitron)
          transition-colors duration-300
          ${
            active === "bulk"
              ? "text-[#8A05FF]"
              : "text-white"
          }
        `}
      >
        <span
          className={`
            ml-2 w-3 h-3 mrl-2 rounded-full
            ${
              active === "bulk"
                ? "bg-[#8A05FF] shadow-[0_0_10px_#8A05FF]"
                : "border-2 border-white/70"
            }
          `}
        />
        Bulk Registration
      </button>
    </div>
  );
}