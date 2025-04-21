
import React from "react";
import { Check } from "lucide-react";

const PALETTE = [
  { name: "green", value: "#60b37a" },
  { name: "purple", value: "#9b87f5" },
  { name: "blue", value: "#63bbdf" },
  { name: "navy", value: "#25345d" },
  { name: "light-green", value: "#71cc81" },
  { name: "yellow", value: "#f4c04d" },
  { name: "orange", value: "#ee744a" },
  { name: "red", value: "#7e2d29" },
];

export type ColorName = (typeof PALETTE)[number]["name"];

interface ColorPickerProps {
  value?: ColorName;
  onChange: (color: ColorName) => void;
  disabled?: boolean;
}

export const COLOR_MAP = Object.fromEntries(PALETTE.map(c => [c.name, c.value]));

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, disabled }) => {
  return (
    <div className="flex gap-6 py-1">
      {PALETTE.map((color) => (
        <button
          key={color.name}
          className={`rounded-full w-8 h-8 flex items-center justify-center transition-all 
            ${value === color.name
              ? "shadow-[0_0_0_4px_rgba(155,135,245,0.15)] ring-2 ring-[#9b87f5] scale-110"
              : "ring-0 opacity-80"}`
          }
          type="button"
          style={{ backgroundColor: color.value }}
          aria-label={color.name}
          onClick={() => onChange(color.name as ColorName)}
          disabled={disabled}
        >
          {value === color.name && <Check size={18} color="#fff" />}
        </button>
      ))}
    </div>
  );
};
