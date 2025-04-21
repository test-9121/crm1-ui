
import { Star } from "lucide-react";
import React from "react";

export function PremiumFeatureCard() {
  return (
    <div className="premium-feature-card-premium-ui mt-6">
      <div className="flex flex-col items-center">
        <span className="premium-star-glow mb-2">
          <Star size={42} className="text-[#FFD966] drop-shadow-star" />
        </span>
        <h4 className="font-bold text-lg text-[#8B5CF6] mb-1 tracking-tight flex items-center gap-1">
          <span className="inline-block text-[#FFD966] text-xl leading-none">★</span>
          Premium Feature: Target Insights
          <span className="inline-block text-[#FFD966] text-xl leading-none">★</span>
        </h4>
        <div className="text-base text-[#9b87f5] leading-snug px-1 mb-2">
          Upgrade to unlock <b>Target Insights</b> and many other premium features to enhance your CRM experience.
        </div>
        <button
          className="px-7 py-2.5 bg-gradient-to-r from-[#FFE29F] via-[#FFA99F] to-[#FF719A] text-[#8B5CF6] rounded-full shadow-lg text-base font-bold mt-3 transition hover:scale-105 outline-none focus:ring-2 focus:ring-[#FFD966] border border-[#FFF6E1]"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}
