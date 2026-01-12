// Calculator State
let displayValue = '0';
let firstOperand: number | null = null;
let waitingForSecondOperand = false;
let operator: string | null = null;

const displayElement = document.getElementById('display') as HTMLElement;

function updateDisplay() {
  const formattedValue = formatNumber(displayValue);
  displayElement.textContent = formattedValue;
  
  // Font-size scaling based on length
  const len = formattedValue.length;
  if (len <= 6) displayElement.style.fontSize = '48px';
  else if (len <= 9) displayElement.style.fontSize = '36px';
  else if (len <= 12) displayElement.style.fontSize = '28px';
  else displayElement.style.fontSize = '22px';

  // Update AC/C label
  const clearBtn = document.getElementById('clear') as HTMLButtonElement;
  if (clearBtn) {
    clearBtn.textContent = (displayValue === '0' && operator === null) ? 'AC' : 'C';
  }
}

function formatNumber(numStr: string) {
  if (numStr === 'Error' || numStr === 'Infinity' || numStr === '-Infinity') return numStr;
  
  const num = parseFloat(numStr);
  if (isNaN(num)) return '0';

  // Use exponential for very large/small numbers
  if (Math.abs(num) > 1e12 || (Math.abs(num) < 1e-7 && num !== 0)) {
    return num.toExponential(5);
  }

  const parts = numStr.split('.');
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const decimalPart = parts.length > 1 ? '.' + parts[1] : '';
  
  return integerPart + decimalPart;
}

function inputDigit(digit: string) {
  if (waitingForSecondOperand) {
    displayValue = digit;
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? digit : displayValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (waitingForSecondOperand) {
    displayValue = '0.';
    waitingForSecondOperand = false;
    updateDisplay();
    return;
  }
  if (!displayValue.includes('.')) {
    displayValue += '.';
    updateDisplay();
  }
}

function handleOperator(nextOperator: string) {
  const inputValue = parseFloat(displayValue);

  if (operator && waitingForSecondOperand) {
    operator = nextOperator;
    updateActiveOperator();
    return;
  }

  if (firstOperand === null && !isNaN(inputValue)) {
    firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand!, inputValue, operator);
    displayValue = String(result);
    firstOperand = typeof result === 'number' ? result : null;
    updateDisplay();
  }

  waitingForSecondOperand = true;
  operator = nextOperator;
  updateActiveOperator();
}

function calculate(first: number, second: number, op: string): number | string {
  let result: number;
  if (op === '+') result = first + second;
  else if (op === '-') result = first - second;
  else if (op === '*') result = first * second;
  else if (op === '/') result = second === 0 ? NaN : first / second;
  else return second;

  if (isNaN(result)) return 'Error';
  // Handle precision to fix 0.1 + 0.2
  return parseFloat(result.toPrecision(12));
}

function resetCalculator() {
  displayValue = '0';
  firstOperand = null;
  waitingForSecondOperand = false;
  operator = null;
  updateActiveOperator();
  updateDisplay();
}

function toggleSign() {
  displayValue = displayValue.startsWith('-') ? displayValue.slice(1) : '-' + displayValue;
  if (displayValue === '-') displayValue = '-0';
  updateDisplay();
}

function inputPercent() {
  displayValue = String(parseFloat(displayValue) / 100);
  updateDisplay();
}

function updateActiveOperator() {
  document.querySelectorAll('.btn-op').forEach(btn => {
    btn.classList.remove('active');
    const b = btn as HTMLButtonElement;
    if (operator && b.dataset.op === operator && waitingForSecondOperand) {
      btn.classList.add('active');
    }
  });
}

// Event Listeners
document.querySelectorAll('[data-num]').forEach(btn => {
  btn.addEventListener('click', () => inputDigit((btn as HTMLButtonElement).dataset.num!));
});

document.querySelectorAll('[data-op]').forEach(btn => {
  btn.addEventListener('click', () => handleOperator((btn as HTMLButtonElement).dataset.op!));
});

const clearBtn = document.getElementById('clear');
if (clearBtn) clearBtn.addEventListener('click', resetCalculator);

const decimalBtn = document.getElementById('decimal');
if (decimalBtn) decimalBtn.addEventListener('click', inputDecimal);

const signBtn = document.getElementById('toggle-sign');
if (signBtn) signBtn.addEventListener('click', toggleSign);

const percentBtn = document.getElementById('percent');
if (percentBtn) percentBtn.addEventListener('click', inputPercent);

const equalsBtn = document.getElementById('equals');
if (equalsBtn) equalsBtn.addEventListener('click', () => {
  if (operator === null) return;
  const inputValue = parseFloat(displayValue);
  const result = calculate(firstOperand!, inputValue, operator);
  displayValue = String(result);
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = true;
  updateActiveOperator();
  updateDisplay();
});

// Keyboard Support
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  if (e.key === '.') inputDecimal();
  if (e.key === '+') handleOperator('+');
  if (e.key === '-') handleOperator('-');
  if (e.key === '*') handleOperator('*');
  if (e.key === '/') handleOperator('/');
  if (e.key === 'Enter' || e.key === '=') {
    const eq = document.getElementById('equals');
    if (eq) eq.click();
  }
  if (e.key === 'Escape') resetCalculator();
  if (e.key === 'Backspace') {
    if (displayValue.length > 1) {
      displayValue = displayValue.slice(0, -1);
    } else {
      displayValue = '0';
    }
    updateDisplay();
  }
});

// Initial Display Sync
updateDisplay();