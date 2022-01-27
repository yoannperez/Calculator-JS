"use strict";

const keys = document.querySelectorAll(".pad");
const operand = document.querySelectorAll(".operand");
const evaluate = document.querySelector(".evaluate");
const memKey = document.querySelectorAll(".mem");
const display = document.getElementById("displayTxt");

let currentValue = [];
var dotValidate;
var memory = 0;
let cancelAlreadyPress = false;
let result = 0;
let prevOperation = "";
let preventDoubleClick; //

const init = () => {
  dotValidate = true;
};

init();

const printResult = () => {
  result.toString().length > 9 ? (display.innerText = result.toExponential()) : (display.innerText = result);
};

const myFunc = (num) => Number(num);

const calculator = (a, b, operator) => {
  switch (operator) {
    case "+":
      prevOperation = "+";
      return a + b;
      break;

    case "-":
      prevOperation = "-";
      return a - b;
      break;
    case "/":
      prevOperation = "/";
      return a / b;
      break;
    case "*":
      prevOperation = "*";
      return a * b;
      break;

    default:
      break;
  }
};

function launchCalculate(operator) {
  if (prevOperation.toString().length == 0) {
    result = parseFloat(currentValue.join(""));
    prevOperation = operator;
  } else {
    result = calculator(result, parseFloat(currentValue.join("")), prevOperation);
    prevOperation = operator;
    printResult();
  }

  currentValue = [];
}

//Special Keys
keys.forEach((e) => {
  e.addEventListener("click", function () {
    switch (e.id) {
      case "cancel":
        if (cancelAlreadyPress === false) {
          currentValue = [];
          display.innerText = 0;
          dotValidate = true;
          cancelAlreadyPress = true;
        } else {
          currentValue = [];
          result = 0;
          dotValidate = true;
          display.innerText = 0;
          cancelAlreadyPress = false;
        }
        break;
      case "dot":
        if (dotValidate) {
          dotValidate = false;
          currentValue.push(".");
          display.innerText = currentValue.join("");
        }
        break;
      default:
      
        if (currentValue.length < 10) {
        currentValue.push(parseInt(e.id));
        display.innerText = currentValue.join("")
      }
        break;
    }
  });
});

//Operation management
operand.forEach((op) => {
  op.addEventListener("click", function () {
    if (preventDoubleClick != op.id) {
      switch (op.id) {
        case "div":
          launchCalculate("/");
          preventDoubleClick = "div";
          break;
        case "multi":
          launchCalculate("*");
          preventDoubleClick = "multi";
          break;
        case "minus":
          launchCalculate("-");
          preventDoubleClick = "minus";
          break;
        case "more":
          launchCalculate("+");
          preventDoubleClick = "more";
          break;
        case "eval":
          result = calculator(result, parseFloat(currentValue.join("")), prevOperation);
          currentValue = Array.from(String(result), myFunc);
          prevOperation = "";
          printResult();
          init();
          preventDoubleClick = "eval";
          break;
        default:
          console.log("err");
      }
    }
  });
});

//Memory Management
memKey.forEach((key) => {
  key.addEventListener("click", function () {
    let actual = 0.;

    switch (key.id) {
      case "mMore":
        actual = parseFloat(currentValue.join(""));
        memory += actual;
        break;

      case "mMinus":
        actual = parseFloat(currentValue.join(""));
        memory -= actual;
        break;

      case "mClear":
        memory = 0;
        break;

      case "mRecall":
        display.innerText = memory;
        // currentValue = memory;
        currentValue = Array.from(String(memory), myFunc);
        
        console.log(currentValue);
        break;

      default:
        break;
    }
  });
});
