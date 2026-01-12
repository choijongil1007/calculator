import React from 'react';

type ButtonVariant = 'number' | 'operator' | 'utility';

interface ButtonProps {
  label: string;
  variant: ButtonVariant;
  onClick: () => void;
  className?: string;
  active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, variant, onClick, className = '', active = false }) => {
  const getStyles = () => {
    const base = "h-[46px] w-full flex items-center justify-center text-[19px] transition-all duration-75 focus:outline-none select-none";
    
    switch (variant) {
      case 'number':
        return `${base} bg-[#5e5e5e] text-white active:bg-[#8e8e8e] hover:bg-[#6e6e6e]`;
      case 'operator':
        // The active state in macOS swaps colors
        if (active) {
          return `${base} bg-white text-[#ff9f0a] border-[1.5px] border-[#ff9f0a]`;
        }
        return `${base} bg-[#ff9f0a] text-white active:bg-[#fcc87e] hover:brightness-105`;
      case 'utility':
        return `${base} bg-[#424242] text-white active:bg-[#727272] hover:bg-[#525252]`;
      default:
        return base;
    }
  };

  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className={`${getStyles()} ${className}`}
    >
      {label}
    </button>
  );
};