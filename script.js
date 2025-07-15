class Calculator {
  constructor(displayElement) {
    this.displayElement = displayElement;
    this.clear();
    this.justEvaluated = false; // Track if equals was just pressed
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
    this.justEvaluated = false;
    this.updateDisplay();
  }

  appendNumber(number) {
    if (this.justEvaluated) {
      this.currentOperand = number.toString(); // Start fresh
      this.justEvaluated = false;
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    this.updateDisplay();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;

    if (this.previousOperand !== '') {
      this.compute(); // auto-calculate if chaining
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
    this.justEvaluated = false;
    this.updateDisplay();
  }

  compute() {
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let computation;
    switch (this.operation) {
      case 'add':
        computation = prev + current;
        break;
      case 'subtract':
        computation = prev - current;
        break;
      case 'multiply':
        computation = prev * current;
        break;
      case 'divide':
        computation = current !== 0 ? prev / current : 'Error';
        break;
      default:
        return;
    }

    this.currentOperand = computation.toString();
    this.operation = undefined;
    this.previousOperand = '';
    this.justEvaluated = true;
    this.updateDisplay();
  }

  percent() {
    if (this.currentOperand === '') return;
    this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
    this.updateDisplay();
  }

  getOperatorSymbol(op) {
    return {
      add: '+',
      subtract: '-',
      multiply: '×',
      divide: '÷'
    }[op] || '';
  }

  updateDisplay() {
    if (this.previousOperand && this.operation) {
      const opSymbol = this.getOperatorSymbol(this.operation);
      this.displayElement.textContent = `${this.previousOperand} ${opSymbol} ${this.currentOperand}`;
    } else {
      this.displayElement.textContent = this.currentOperand || '0';
    }
  }

  deleteLast() {
  this.currentOperand = this.currentOperand.slice(0, -1);
  this.updateDisplay();
  }

  evaluateManualInput(inputStr) {
  try {
    // Replace visual operators with JavaScript equivalents
    const expression = inputStr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100'); // convert % to division

    const result = eval(expression);
    this.currentOperand = result.toString();
    this.previousOperand = '';
    this.operation = undefined;
    this.updateDisplay();
  } catch {
    this.currentOperand = 'Error';
    this.updateDisplay();
  }
}

}

// Initialize
const display = document.getElementById('display');
const calculator = new Calculator(display);

display.addEventListener('keydown', (e) => {
  if (display.textContent === '0' && e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    // Prevent inserting on top of 0
    e.preventDefault();
    display.textContent = '';
    
    // Insert typed character manually
    document.execCommand('insertText', false, e.key);
  }
});


// Keyboard binding
document.addEventListener('keydown', (e) => {
  const key = e.key;

  if (!display.isContentEditable) return;

  if (key === 'Enter') {
    e.preventDefault();
    calculator.evaluateManualInput(display.textContent);
  } else if (key === 'Backspace') {
    // Treat as AC (reset)
    e.preventDefault();
    calculator.clear();
  } else if (key === 'Delete') {
    // Treat as DEL
    e.preventDefault();
    calculator.deleteLast();
  }
});

display.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = (e.clipboardData || window.clipboardData).getData('text');
  // Allow only digits and basic operators
  const clean = text.replace(/[^0-9+\-*/%.]/g, '');
  document.execCommand('insertText', false, clean);
});


document.querySelectorAll('.btn').forEach(button => {
  const action = button.dataset.action;
  const number = button.dataset.number;

  if (number !== undefined) {
    button.addEventListener('click', () => calculator.appendNumber(number));
  }

  if (action === 'clear') {
    button.addEventListener('click', () => calculator.clear());
  }

  if (action === 'percent') {
    button.addEventListener('click', () => calculator.percent());
  }

  if (['add', 'subtract', 'multiply', 'divide'].includes(action)) {
    button.addEventListener('click', () => calculator.chooseOperation(action));
  }

  if (action === 'equals') {
    button.addEventListener('click', () => calculator.compute());
  }

  if (action === 'delete') {
  button.addEventListener('click', () => calculator.deleteLast());
}

});
