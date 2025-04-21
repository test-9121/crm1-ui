
import { Lock } from "lucide-react";
import React from "react";

export function PremiumFeatureCard() {
  return (
    <div className="premium-feature-locked mt-4">
      <Lock className="lock-icon" />
      <h4 className="font-semibold text-base text-blue-700 mb-1">
        <span className="inline-block mr-1">✨</span>
        Premium Feature: Target Insights
        <span className="inline-block ml-1">✨</span>
      </h4>
      <div className="text-sm text-blue-500 mb-2">
        Upgrade to unlock Target Insights and many other premium features to enhance your CRM experience.
      </div>
      <button
        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-full shadow text-white text-sm font-semibold mt-2"
      >
        Upgrade Now
      </button>
    </div>
  );
}
