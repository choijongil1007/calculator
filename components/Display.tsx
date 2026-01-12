
import React from 'react';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  // Format the display value to have commas and handle long numbers
  const formatValue = (val: string) => {
    if (val === 'NaN' || val === 'Infinity' || val === '-Infinity') return 'Error';
    
    const parts = val.split('.');
    parts[0] = parseInt(parts[0]).toLocaleString();
    return parts.join('.');
  };

  const getFontSize = (val: string) => {
    const len = val.length;
    if (len <= 6) return 'text-5xl';
    if (len <= 8) return 'text-4xl';
    if (len <= 10) return 'text-3xl';
    return 'text-2xl';
  };

  return (
    <div className="flex-1 flex flex-col justify-end items-end px-4 py-4 min-h-[80px]">
      <div 
        className={`${getFontSize(value)} text-white font-light transition-all duration-100 break-all text-right leading-tight select-all cursor-text`}
      >
        {formatValue(value)}
      </div>
    </div>
  );
};
