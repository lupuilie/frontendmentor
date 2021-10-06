// Refs
const inputTypeNumber = document.querySelectorAll("input[type='number']");
const billInput = document.querySelector("#bill-input");
const selectTipBtns = document.querySelectorAll("#select-tip button");
const inputPeopleCount = document.querySelector("#input-people-count");
const inputCustomTip = document.querySelector("#custom-tip-value");
const tipValue = document.querySelector("#tip-value");
const totalValue = document.querySelector("#total-value");
const resetBtn = document.querySelector("#reset-button");

// State
let billInputValue;
let selectedTipPercent;
let peopleCount;
let tipAmount;
let totalPerPerson;

// Validation
inputTypeNumber.forEach((input) => {
  input.addEventListener("change", (e) => inputValidation(e));
});

// Event Listeners
billInput.addEventListener("change", (e) => billInputChange(e));
billInput.addEventListener("keyup", (e) => billInputChange(e));
inputCustomTip.addEventListener("change", (e) => customTipChange(e));
inputCustomTip.addEventListener("keyup", (e) => customTipChange(e));
inputPeopleCount.addEventListener("change", (e) => peopleCountChange(e));
inputPeopleCount.addEventListener("keyup", (e) => peopleCountChange(e));
resetBtn.addEventListener("click", () => resetInput());

// Select tip % buttons
selectTipBtns.forEach((clicked) =>
  clicked.addEventListener("click", (e) => {
    selectedTipPercent = Number(e.target.value);
    e.target.classList.add("active");
    inputCustomTip.value = "";

    // remove .active from other button
    selectTipBtns.forEach((btn) => {
      if (Number(btn.value) !== Number(selectedTipPercent)) {
        if (btn.classList.contains("active")) btn.classList.remove("active");
      }
    });
    // also, remove .error / .active from custom input
    if (inputCustomTip.classList.contains("error"))
      inputCustomTip.classList.remove("error");
    if (inputCustomTip.classList.contains("active"))
      inputCustomTip.classList.remove("active");
    update();
  })
);

// Functions
function inputError(element) {
  if (element.classList.contains("active")) element.classList.remove("active");
  if (!element.classList.contains("error")) element.classList.add("error");
}
function removeInputError(element) {
  if (element.classList.contains("error")) element.classList.remove("error");
}
function removeInput(element) {
  element.value = "";
  if (element.classList.contains("error")) element.classList.remove("error");
  if (element.classList.contains("active")) element.classList.remove("active");
}
function setActive(element) {
  if (!element.classList.contains("active")) element.classList.add("active");
}

function inputValidation(e) {
  if (Number(e.target.value) <= 0 && e.target.value.length > 0) {
    inputError(e.target);
    e.target.value = "0";
    return;
  }

  removeInputError(e.target);
  setActive(e.target);
}

function billInputChange(e) {
  billInputValue = Number(e.target.value);
  update();
}

function customTipChange(e) {
  selectedTipPercent = Number(e.target.value);

  // remove .active from any button
  selectTipBtns.forEach((btn) => {
    if (btn.classList.contains("active")) btn.classList.remove("active");
  });
  update();
}

function peopleCountChange(e) {
  peopleCount = Number(e.target.value);
  update();
}

function resetInput() {
  billInputValue = null;
  selectedTipPercent = null;
  peopleCount = null;
  tipAmount = null;
  totalPerPerson = null;
  tipValue.innerText = "0.00";
  totalValue.innerText = "0.00";

  inputTypeNumber.forEach((input) => {
    removeInput(input);
  });
  selectTipBtns.forEach((btn) => {
    if (Number(btn.value) !== Number(selectedTipPercent)) {
      if (btn.classList.contains("active")) btn.classList.remove("active");
    }
  });
  resetBtn.disabled = true;
}

// Perform calculations
function update() {
  resetBtn.disabled = true;
  if (
    !billInputValue ||
    billInputValue === 0 ||
    !selectedTipPercent ||
    selectedTipPercent === 0 ||
    !peopleCount ||
    peopleCount === 0
  ) {
    return;
  }
  resetBtn.disabled = false;

  tipAmount = Number(
    ((billInputValue * (selectedTipPercent / 100)) / peopleCount).toFixed(2)
  );

  totalPerPerson = Number(
    (billInputValue / peopleCount + tipAmount).toFixed(2)
  );

  tipValue.innerText = tipAmount;
  totalValue.innerText = totalPerPerson;
}
