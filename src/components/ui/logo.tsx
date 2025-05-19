
import React from "react";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const Logo = ({ className, size = "md", showText = true }: LogoProps) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };
  
  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("rounded-full bg-app-blue-600 text-white font-bold flex items-center justify-center", sizeClasses[size])}>
        <Shield className="h-4 w-4" />
      </div>
      {showText && (
        <span className={cn("font-bold tracking-tight", textSizeClasses[size])}>
          ARGUS
        </span>
      )}
    </div>
  );
};

export default Logo;
