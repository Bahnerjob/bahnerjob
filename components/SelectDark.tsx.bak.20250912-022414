"use client";
import * as React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  allowLight?: boolean;
};

export default function SelectDark({ allowLight, className = "", style, ...rest }: Props) {
  const base: React.CSSProperties = {
    backgroundColor: "rgb(23,23,24)",
    border: "1px solid rgb(48,48,52)",
    color: "rgba(235,235,240,.95)",
    borderRadius: 10,
    padding: "10px 36px 10px 12px",
    fontSize: 14,
    lineHeight: 1.25,
    appearance: "none",
    WebkitAppearance: "none" as any,
    MozAppearance: "none" as any,
    backgroundImage:
      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 20 20' fill='none'><path d='M5 8l5 5 5-5' stroke='%23bfbfc4' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 10px center",
    backgroundSize: "12px 12px",
  };
  const merged = allowLight ? style : { ...base, ...(style || {}) };
  const cls = (className ? className + " " : "") + (allowLight ? "" : "select-dark");
  return <select {...rest} className={cls} style={merged} />;
}