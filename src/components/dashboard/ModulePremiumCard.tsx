
import React from "react";
import { Lock } from "lucide-react";

interface Props {
  title: string;
  description?: string;
}

export function ModulePremiumCard({ title, description }: Props) {
  return (
    <div className="premium-feature-locked border-dashed border-2 border-yellow-300 bg-yellow-50/80 backdrop-blur rounded-2xl p-6 flex flex-col items-center gap-2 text-center shadow-md min-h-[220px] justify-center mt-2">
      <Lock className="lock-icon text-yellow-400 mb-2" size={40} />
      <h4 className="font-semibold text-lg text-yellow-700 mb-1">
        <span className="inline-block mr-1">✨</span>
        Premium Feature: {title}
        <span className="inline-block ml-1">✨</span>
      </h4>
      <div className="text-sm text-yellow-800 mb-2 font-medium">
        {description || `Upgrade to unlock ${title} and many other premium features to enhance your CRM experience.`}
      </div>
      <button
        className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-full shadow text-white text-sm font-semibold mt-2 transition"
      >
        Upgrade Now
      </button>
    </div>
  );
}
