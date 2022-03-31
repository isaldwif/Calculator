const calculatorScreen = document.querySelector('.calculator-screen');
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal-sign');
const percentage = document.querySelector('.percentage');
const decimal = document.querySelector('.decimal');
const clearBtn = document.querySelector('.all-clear');
const modeBtn = document.querySelector('.theme');
const icon = document.querySelector('.fa');
const bodyCalc = document.querySelector('.calculator');

const updateScreen = (number) => {
  calculatorScreen.value = number;
};
let prevNumber = '';
let calculationOperator = '';
let currentNumber = '0';

const inputNumber = (number) => {
  if (currentNumber === '0') {
    currentNumber = number;
  } else {
    currentNumber += number;
  }
};

numbers.forEach((number) => {
  number.addEventListener('click', (event) => {
    if (isDone) {
      currentNumber = '0';
      prevNumber = '';
      isDone = false;
    }
    inputNumber(event.target.value);
    updateScreen(currentNumber);
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (event) => {
    if (isDone) {
      isDone = false;
    }
    inputOperator(event.target.value);
    updateScreen(calculationOperator);
  });
});
const inputOperator = (operator) => {
  if (calculationOperator === '') {
    prevNumber = currentNumber;
  }
  calculationOperator = operator;
  currentNumber = '0';
};
let isDone = false;

equalSign.addEventListener('click', (event) => {
  calculate();
  updateScreen(currentNumber);
  isDone = true;
});

modeBtn.addEventListener('click', () => {
  icon.classList.toggle('fa-sun-o');
  icon.classList.toggle('white');
  icon.classList.toggle('fa-moon-o');
  bodyCalc.classList.toggle('dark-body');
  bodyCalc.classList.toggle('light-body');
  document.documentElement.classList.toggle('dark');
});

const calculate = () => {
  let result = currentNumber;
  switch (calculationOperator) {
    case '+':
      result = parseFloat(prevNumber) + parseFloat(currentNumber);
      break;
    case '-':
      result = prevNumber - currentNumber;
      break;
    case '*':
      result = prevNumber * currentNumber;
      break;
    case '/':
      result = prevNumber / currentNumber;
      break;
    default:
      break;
  }
  currentNumber = result;
  calculationOperator = '';
};

clearBtn.addEventListener('click', () => {
  clearAll();
  updateScreen(currentNumber);
});

const clearAll = () => {
  prevNumber = '';
  calculationOperator = '';
  currentNumber = '0';
};

const inputPercentage = () => {
  if (currentNumber.includes('%')) {
    return;
  }
  currentNumber = currentNumber / 100;
};

percentage.addEventListener('click', (event) => {
  inputPercentage(event.target.value);
  updateScreen(currentNumber);
});

decimal.addEventListener('click', (event) => {
  inputDecimal(event.target.value);
  updateScreen(currentNumber);
});

const inputDecimal = (dot) => {
  if (currentNumber.includes('.')) {
    return;
  }
  currentNumber += dot;
};
