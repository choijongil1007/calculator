
import React from 'react';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  // Format the display value to have commas and handle long numbers
  const formatValue = (val: string) => {
    if (!val || val === 'NaN' || val === 'Infinity' || val === '-Infinity') return 'Error';
    
    try {
      const parts = val.split('.');
      const num = parseFloat(parts[0]);
      
      // Handle very large numbers with scientific notation if needed
      if (Math.abs(num) > 1e12) {
        return parseFloat(val).toExponential(5);
      }

      parts[0] = num.toLocaleString(undefined, { maximumFractionDigits: 0 });
      return parts.join('.');
    } catch (e) {
      return 'Error';
    }
  };

  const getFontSize = (val: string) => {
    const len = val.length;
    if (len <= 7) return 'text-5xl';
    if (len <= 10) return 'text-4xl';
    if (len <= 13) return 'text-3xl';
    return 'text-2xl';
  };

  return (
    <div className="flex-1 flex flex-col justify-end items-end px-4 py-4 min-h-[100px] w-full overflow-hidden">
      <div 
        className={`${getFontSize(value)} text-white font-light transition-all duration-100 break-all text-right leading-tight select-all cursor-text w-full`}
      >
        {formatValue(value)}
      </div>
    </div>
  );
};
