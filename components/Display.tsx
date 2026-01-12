import React from 'react';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  const formatValue = (val: string) => {
    if (val === 'NaN') return 'Error';
    if (val === 'Infinity' || val === '-Infinity') return 'Infinity';
    
    const parts = val.split('.');
    let integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    // Add thousands separators
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Limit total visible characters for aesthetics
    const combined = formattedInteger + decimalPart;
    if (combined.length > 12) {
      const num = parseFloat(val);
      if (Math.abs(num) > 1e9 || (Math.abs(num) < 1e-7 && num !== 0)) {
        return num.toExponential(5);
      }
      return combined.substring(0, 12);
    }
    
    return combined;
  };

  const getFontSize = (val: string) => {
    const displayVal = formatValue(val);
    const len = displayVal.length;
    if (len <= 6) return 'text-[48px]';
    if (len <= 9) return 'text-[36px]';
    if (len <= 12) return 'text-[28px]';
    return 'text-[22px]';
  };

  return (
    <div className="flex-none flex flex-col justify-end items-end px-4 py-3 h-[90px] w-full overflow-hidden bg-transparent">
      <div 
        className={`${getFontSize(value)} text-white font-light tracking-tight transition-all duration-75 whitespace-nowrap text-right leading-none select-text cursor-default w-full`}
      >
        {formatValue(value)}
      </div>
    </div>
  );
};