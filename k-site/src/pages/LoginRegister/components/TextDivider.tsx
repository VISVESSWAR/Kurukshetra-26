import React, { type HTMLAttributes } from "react";

interface TextDividerProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
}

const TextDivider = ({ text, className }: TextDividerProps) => {
  const textDividerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
  };

  const lineStyle: React.CSSProperties = {
    height: "1px",
    backgroundColor: "silver",
    flexGrow: 1,
  };

  return (
    <div style={textDividerStyle} className={`font-novaSquare ${className || ""}`}>
      <span style={{ ...lineStyle, marginRight: "1rem" }}></span>
      {text}
      <span style={{ ...lineStyle, marginLeft: "1rem" }}></span>
    </div>
  );
};

export default TextDivider;
