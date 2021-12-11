"use strict";

const keys = document.querySelectorAll(".pad");
const operand = document.querySelectorAll(".operand");
const evaluate = document.querySelector(".evaluate");
const memKey = document.querySelectorAll(".mem");
const display = document.getElementById("displayTxt");

let currentValue = [];
var firstValue;
var dotValidate;
var operateur;
var memory = 0;
let cancelAlreadyPress = false;
let result = 0;
let prevOperation = "";

const init = () => {
  // currentValue ;
  firstValue = 0;
  dotValidate = true;
  operateur = "";
};

init();

const printResult = () => {
  result.toString().length > 9 ? (display.innerText = result.toFixed(9)) : (display.innerText = result);
};

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
  console.log("operator = " + operator);
  if (prevOperation.toString().length == 0) {
    console.log("première opération");
    result = parseFloat(currentValue.join(""));
    prevOperation = operator;
    
    // result = calculator(parseFloat(currentValue.join("")),result, operator);
    // console.log("result = " + result);
  } else {
    console.log("currentValue : " + parseFloat(currentValue.join("")));
    console.log("Pas première opération");
    result = calculator(result, parseFloat(currentValue.join("")), prevOperation);
    prevOperation = operator;
    printResult();
    console.log("result = " + result);
    console.log("prevOperator : " + prevOperation);
    console.log("currentValue : " + currentValue);
  }

  currentValue = [];
}

//Special Keys
keys.forEach((e) => {
  e.addEventListener("click", function () {
    switch (e.id) {
      case "cancel":
        if (cancelAlreadyPress === false) {
          console.log("première pression");
          currentValue = [];
          display.innerText = 0;
          dotValidate = true;
          cancelAlreadyPress = true;
        } else {
          console.log("Reset total");
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
        currentValue.push(parseInt(e.id));
        display.innerText = currentValue.join("");
        break;
    }
  });
});

//Operation management
operand.forEach((op) => {
  op.addEventListener("click", function () {
    switch (op.id) {
      case "div":
        launchCalculate("/");
        break;
      case "multi":
        launchCalculate("*");
        break;
      case "minus":
        launchCalculate("-");
        break;
      case "more":
        launchCalculate("+");
        break;
      case "eval":
        result = calculator(result, parseFloat(currentValue.join("")), prevOperation);
        let myFunc = num => Number(num)
        currentValue = Array.from(String(result), myFunc);
        prevOperation = "";

        console.log("currentValue : " + currentValue);
        console.log("currentValue : " + currentValue.join(""));
        console.log("currentValue : " + parseFloat(currentValue.join("")));
        display.innerText = result
        console.log("result = " + result);
        if (firstValue != 0) {
          // let result = eval(`${firstValue} ${operateur} ${currentValue.join("")}`);
          // result.toString().length > 9 ? (display.innerText = result.toFixed(9)) : (display.innerText = result);
        }
        init();
        break;
      default:
        console.log("err");
    }
  });
});

//Memory Management
memKey.forEach((key) => {
  key.addEventListener("click", function () {
    let actual = 0;

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
        break;

      default:
        break;
    }
  });
});
