
export type Operation = '+' | '-' | '*' | '/' | null;

export interface CalculatorState {
  display: string;
  previousValue: number | null;
  operation: Operation;
  overwrite: boolean;
}
