const keys = document.querySelectorAll(".roundBtn");
const display = document.getElementById("displayTxt");
let keyOne = document.getElementById("one");

let elemA = [];
var dotValidate = true;
var clearOne = false;

keys.forEach((e) => {
  e.addEventListener("click", function () {
    if (e.id == "cancel") {
      // Cancel Case
      elemA = [];
      dotValidate = true;
      display.innerText = 0;
    } else {// Dot case
      if (e.id == "dot" && dotValidate) {
        dotValidate = false;
        console.log("Coucou dot");
        elemA.push(".");
        display.innerText = elemA.join("");
      }
      if (e.id == "dot" && !dotValidate) {
        console.log("Dot non valide");
      } else { // Number case
        elemA.push(parseInt(e.id));
        display.innerText = elemA.join("");
      }
    }
  });
});

//
