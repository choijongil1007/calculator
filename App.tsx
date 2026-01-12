
import React, { useState, useEffect, useCallback } from 'react';
import { Calculator } from './components/Calculator';

const App: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <Calculator />
      <div className="fixed bottom-4 text-white/30 text-xs font-light pointer-events-none select-none">
        Use keyboard for numbers and operators (Enter for =, Esc for AC)
      </div>
    </div>
  );
};

export default App;
