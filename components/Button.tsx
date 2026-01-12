
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
    const base = "h-[46px] w-full flex items-center justify-center text-xl transition-colors duration-150 active:brightness-125 focus:outline-none select-none";
    
    switch (variant) {
      case 'number':
        return `${base} bg-[#5e5e5e]/80 text-white hover:bg-[#6e6e6e]/80`;
      case 'operator':
        return `${base} ${active ? 'bg-white text-[#ff9f0a]' : 'bg-[#ff9f0a] text-white'} hover:brightness-110`;
      case 'utility':
        return `${base} bg-[#424242]/80 text-white hover:bg-[#525252]/80`;
      default:
        return base;
    }
  };

  return (
    <button 
      onClick={onClick}
      className={`${getStyles()} ${className}`}
    >
      {label}
    </button>
  );
};
