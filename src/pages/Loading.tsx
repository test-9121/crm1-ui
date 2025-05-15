
import React from "react";
import ensar from "@/assests/ensar.png";

interface LoadingSpinnerProps {
  logo?: React.ReactNode;
  ringColorPrimary?: string;
  ringColorSecondary?: string;
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  ringColorPrimary = "border-indigo-500",
  ringColorSecondary = "border-blue-300",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32",
  };

  const ringSizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
      <div className="relative flex items-center justify-center">
        {/* Outer ring - rotates clockwise */}
        <div
          className={`absolute rounded-full border-4 border-t-transparent ${ringColorPrimary} ${ringSizeClasses[size]} animate-spin`}
          style={{ animationDuration: "2s" }}
        ></div>

        {/* Inner ring - rotates counter-clockwise */}
        <div
          className={`absolute rounded-full border-4 border-b-transparent ${ringColorSecondary} ${ringSizeClasses[size]} animate-spin`}
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Logo container */}
        <div
          className={`flex items-center justify-center ${sizeClasses[size]} bg-white rounded-full shadow-lg`}
        >
          <img src={ensar} alt="Logo" className={`rounded-full ${sizeClasses[size]}`} />
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;