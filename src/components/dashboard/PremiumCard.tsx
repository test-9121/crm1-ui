
import React from "react";

export function PremiumCard() {
  return (
    <div className="w-full bg-gradient-to-br from-[#22304a] to-[#1b233b] rounded-2xl p-4 mb-4 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-tr from-[#51ffd6] to-[#4948d2] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M12 3V21" stroke="#b4baff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M3 12H21" stroke="#b4baff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.76 7.76L16.24 16.24" stroke="#b4baff" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.76 16.24L16.24 7.76" stroke="#b4baff" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="text-white font-semibold text-base">Premium Plan</div>
          <div className="text-gray-300 text-xs">Active until Jul 2025</div>
        </div>
      </div>
      <div className="mt-3">
        <div className="text-gray-300 text-xs mb-1 flex justify-between">
          <span>Usage</span>
          <span>78%</span>
        </div>
        <div className="w-full h-2 bg-[#20284d] rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-[#4537ff] to-[#457fff]"
            style={{ width: "78%" }}
          />
        </div>
      </div>
    </div>
  );
}
