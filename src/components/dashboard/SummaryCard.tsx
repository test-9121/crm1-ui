
import React from "react";
import { cn } from "@/lib/utils";

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  colorClass?: string; // tailwind color class, e.g. "bg-green-100"
}

const SummaryCard = ({ title, value, icon, colorClass = "bg-white" }: SummaryCardProps) => (
  <div
    className={cn(
      "flex items-center gap-3 rounded-xl shadow border border-gray-200 px-6 py-5 min-w-[220px] bg-white",
      colorClass
    )}
    style={{ background: "white", boxShadow: "0 2px 8px 0 #e9e9f6" }}
  >
    {icon && (
      <span className="flex items-center justify-center rounded-full w-10 h-10" style={{ background: "#f4f7fe" }}>
        {icon}
      </span>
    )}
    <div>
      <div className="text-xs text-gray-600">{title}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  </div>
);

export default SummaryCard;
