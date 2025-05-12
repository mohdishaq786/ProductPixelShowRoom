import React from "react";
import { Car } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
}

const Logo: React.FC<LogoProps> = ({ size = "md" }) => {
  const sizeClass = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const iconSize = {
    sm: 18,
    md: 22,
    lg: 28,
  };

  return (
    <div className="flex items-center gap-2">
      <Car className="text-pixelgray-900" size={iconSize[size]} />
      <span className={`font-bold ${sizeClass[size]} text-pixelgray-900`}>
        Pixel<span className="text-pixelblue-600">Showroom</span>
      </span>
    </div>
  );
};

export default Logo;
