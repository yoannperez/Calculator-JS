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

function storeFirstValue() {
  firstValue = currentValue.join("");
}

keys.forEach((e) => {
  e.addEventListener("click", function () {
    if (e.id == "cancel") {
      // Cancel Case
      currentValue = [];
      dotValidate = true;
      display.innerText = 0;
    } else {
      // Dot case
      if (e.id == "dot" && dotValidate) {
        dotValidate = false;
        currentValue.push(".");
        display.innerText = currentValue.join("");
      }
      if (e.id == "dot" && !dotValidate) {
        console.log("Dot non valide");
      } else {
        // Number case
        currentValue.push(parseInt(e.id));
        display.innerText = currentValue.join("");
      }
    }
  });
});

operand.forEach((op) => {
  op.addEventListener("click", function () {
    switch (op.id) {
      case "div":
        storeFirstValue();
        operateur = "/";
        currentValue = [];
        break;
      case "multi":
        storeFirstValue();
        operateur = "*";
        currentValue = [];
        break;
      case "minus":
        storeFirstValue();
        operateur = "-";
        currentValue = [];
        break;
      case "more":
        storeFirstValue();
        operateur = "+";
        currentValue = [];
        break;
      case "eval":
        if (firstValue != 0) {
          let result = eval(`${firstValue} ${operateur} ${currentValue.join("")}`);
          result.toString().length > 9 ? (display.innerText = result.toFixed(7)) : (display.innerText = result);
        }
        init();
        break;
      default:
        console.log("error");
    }
  });
});
