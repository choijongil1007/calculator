
import React, { useState, useEffect, useCallback } from 'react';
import { Display } from './Display.tsx';
import { Button } from './Button.tsx';
import { Operation, CalculatorState } from '../types.ts';

export const Calculator: React.FC = () => {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    overwrite: true,
  });

  const calculate = (prev: number, current: number, op: Operation): number => {
    switch (op) {
      case '+': return prev + current;
      case '-': return prev - current;
      case '*': return prev * current;
      case '/': return current === 0 ? NaN : prev / current;
      default: return current;
    }
  };

  const handleDigit = useCallback((digit: string) => {
    setState(prev => ({
      ...prev,
      display: prev.overwrite ? digit : prev.display === '0' ? digit : prev.display + digit,
      overwrite: false,
    }));
  }, []);

  const handleOperation = useCallback((op: Operation) => {
    setState(prev => {
      const current = parseFloat(prev.display);
      
      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: current,
          operation: op,
          overwrite: true,
        };
      }

      if (prev.operation && !prev.overwrite) {
        const result = calculate(prev.previousValue, current, prev.operation);
        return {
          ...prev,
          display: String(result),
          previousValue: result,
          operation: op,
          overwrite: true,
        };
      }

      return {
        ...prev,
        operation: op,
        overwrite: true,
      };
    });
  }, []);

  const handleEquals = useCallback(() => {
    setState(prev => {
      if (prev.operation === null || prev.previousValue === null) return prev;
      
      const current = parseFloat(prev.display);
      const result = calculate(prev.previousValue, current, prev.operation);
      
      return {
        ...prev,
        display: String(result),
        previousValue: null,
        operation: null,
        overwrite: true,
      };
    });
  }, []);

  const handleClear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      overwrite: true,
    });
  }, []);

  const handleToggleSign = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: prev.display.startsWith('-') ? prev.display.slice(1) : '-' + prev.display,
    }));
  }, []);

  const handlePercent = useCallback(() => {
    setState(prev => ({
      ...prev,
      display: String(parseFloat(prev.display) / 100),
      overwrite: true,
    }));
  }, []);

  const handleDecimal = useCallback(() => {
    setState(prev => {
      if (prev.overwrite) return { ...prev, display: '0.', overwrite: false };
      if (prev.display.includes('.')) return prev;
      return { ...prev, display: prev.display + '.' };
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') handleDigit(e.key);
      if (e.key === '.') handleDecimal();
      if (e.key === '+') handleOperation('+');
      if (e.key === '-') handleOperation('-');
      if (e.key === '*') handleOperation('*');
      if (e.key === '/') handleOperation('/');
      if (e.key === 'Enter' || e.key === '=') handleEquals();
      if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') handleClear();
      if (e.key === 'Backspace') {
        setState(prev => ({
          ...prev,
          display: prev.display.length > 1 ? prev.display.slice(0, -1) : '0',
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleOperation, handleEquals, handleClear, handleDecimal]);

  return (
    <div className="w-[232px] bg-black/60 backdrop-blur-3xl rounded-xl shadow-2xl border border-white/10 overflow-hidden flex flex-col p-1">
      <div className="flex gap-1.5 px-3 pt-2 pb-1">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
      </div>

      <Display value={state.display} />

      <div className="grid grid-cols-4 gap-[1px]">
        <Button label={state.overwrite && state.display === '0' ? 'AC' : 'C'} variant="utility" onClick={handleClear} />
        <Button label="+/-" variant="utility" onClick={handleToggleSign} />
        <Button label="%" variant="utility" onClick={handlePercent} />
        <Button label="÷" variant="operator" active={state.operation === '/'} onClick={() => handleOperation('/')} />

        <Button label="7" variant="number" onClick={() => handleDigit('7')} />
        <Button label="8" variant="number" onClick={() => handleDigit('8')} />
        <Button label="9" variant="number" onClick={() => handleDigit('9')} />
        <Button label="×" variant="operator" active={state.operation === '*'} onClick={() => handleOperation('*')} />

        <Button label="4" variant="number" onClick={() => handleDigit('4')} />
        <Button label="5" variant="number" onClick={() => handleDigit('5')} />
        <Button label="6" variant="number" onClick={() => handleDigit('6')} />
        <Button label="-" variant="operator" active={state.operation === '-'} onClick={() => handleOperation('-')} />

        <Button label="1" variant="number" onClick={() => handleDigit('1')} />
        <Button label="2" variant="number" onClick={() => handleDigit('2')} />
        <Button label="3" variant="number" onClick={() => handleDigit('3')} />
        <Button label="+" variant="operator" active={state.operation === '+'} onClick={() => handleOperation('+')} />

        <Button label="0" variant="number" className="col-span-2 text-left px-5" onClick={() => handleDigit('0')} />
        <Button label="." variant="number" onClick={handleDecimal} />
        <Button label="=" variant="operator" onClick={handleEquals} />
      </div>
    </div>
  );
};
