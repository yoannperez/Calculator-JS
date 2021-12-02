"use strict";

const keys = document.querySelectorAll(".pad");
const operand = document.querySelectorAll(".operand");
const evaluate = document.querySelector(".evaluate");
const display = document.getElementById("displayTxt");

let currentValue;
var firstValue;
var dotValidate;
var operateur;

const init = () => {
  currentValue = [];
  firstValue = 0;
  dotValidate = true;
  operateur = "";
};

init();

function storeFirstValue(operator) {
  firstValue = currentValue.join("");
  operateur = operator;
  currentValue = [];
}

keys.forEach((e) => {
  e.addEventListener("click", function () {
    switch (e.id) {
      case "cancel":
        currentValue = [];
        dotValidate = true;
        display.innerText = 0;
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

operand.forEach((op) => {
  op.addEventListener("click", function () {
    switch (op.id) {
      case "div":
        storeFirstValue("/");
        break;
      case "multi":
        storeFirstValue("*");
        break;
      case "minus":
        storeFirstValue("-");
        break;
      case "more":
        storeFirstValue("+");
        break;
      case "eval":
        if (firstValue != 0) {
          let result = eval(`${firstValue} ${operateur} ${currentValue.join("")}`);
          result.toString().length > 9 ? (display.innerText = result.toFixed(7)) : (display.innerText = result);
        }
        init();
        break;
      default:
        console.log("err");
    }
  });
});
