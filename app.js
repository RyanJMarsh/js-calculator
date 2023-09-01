class Calculator {
  constructor(prevOperandTextElement, currOperandTextElement) {
    this.prevOperandTextElement = prevOperandTextElement;
    this.currOperandTextElement = currOperandTextElement;
    this.clear();
  }

  clear() {
    this.prevOperand = "";
    this.currOperand = "";
    this.operation = undefined;
  }
  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.currOperand.includes(".")) return;
    this.currOperand = this.currOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currOperand === "") return;
    if (this.prevOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.prevOperand = this.currOperand.toString();
    this.currOperand = "";
  }
  compute() {
    let computation;
    const prevOperandNumber = parseFloat(this.prevOperand);
    const currOperandNumber = parseFloat(this.currOperand);
    if (isNaN(prevOperandNumber) || isNaN(currOperandNumber)) return;
    switch (this.operation) {
      case "+":
        computation = prevOperandNumber + currOperandNumber;
        break;
      case "-":
        computation = prevOperandNumber - currOperandNumber;
        break;
      case "x":
        computation = prevOperandNumber * currOperandNumber;
        break;
      case "÷":
        computation = prevOperandNumber / currOperandNumber;
        break;
      default:
        return;
    }
    this.currOperand = computation;
    this.operation = undefined;
    this.prevOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {maximumFractionDigits: 0});
    }
    if (decimalDigits != null) {
       return `${integerDisplay}.${decimalDigits}` 
    } else {
        return integerDisplay
    }
  }

  updateDisplay() {
    this.currOperandTextElement.innerText = this.getDisplayNumber(this.currOperand);
    if (this.operation != null) {
      this.prevOperandTextElement.innerText = `${this.getDisplayNumber(this.prevOperand)} ${this.operation}`;
    } else {
        this.prevOperandTextElement.innerText = ''
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allclearButton = document.querySelector("[data-allclear]");
const prevOperandTextElement = document.querySelector("[data-prev-operand]");
const currOperandTextElement = document.querySelector("[data-curr-operand]");

const calculator = new Calculator(
  prevOperandTextElement,
  currOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

allclearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});
