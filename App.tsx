
import React from 'react';
import { Calculator } from './components/Calculator.tsx';

const App: React.FC = () => {
  return (
    <div className="calculator-container flex flex-col items-center justify-center w-full h-full">
      <Calculator />
      <div className="mt-6 text-white/20 text-[10px] font-medium tracking-[0.2em] uppercase pointer-events-none select-none">
        macOS Calculator
      </div>
    </div>
  );
};

export default App;
