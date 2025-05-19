
import React from 'react';
import { Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

const Logo = ({ size = 'md', showText = true, className }: LogoProps) => {
  // Size mappings
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-10 w-10',
    xl: 'h-12 w-12'
  };
  
  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl'
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        sizeClasses[size], 
        "rounded-full bg-gradient-to-br from-app-blue-500 to-app-blue-700 text-white flex items-center justify-center p-1 shadow-lg"
      )}>
        <Shield className="h-full w-full" strokeWidth={2.5} />
      </div>
      {showText && (
        <span className={cn(
          textSizes[size], 
          "font-bold tracking-tight text-foreground"
        )}>
          ARGUS
        </span>
      )}
    </div>
  );
};

export default Logo;
