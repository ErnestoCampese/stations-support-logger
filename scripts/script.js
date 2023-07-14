"use strict";

const MAX_STATIONS_NUMBER = 52;
const AMBIENT_PFX = "AD01A";
const CHILL_PFX = "CD01A";
const OUTPUT_MSG_EMPTY = "The list is empty!";

const listElement = document.querySelector("#list");
const itemsElement = listElement.querySelectorAll("li");

const stationsSelect = document.querySelector("#stations");
const actionsSelect = document.querySelector("#actions");
const buttonAdd = document.querySelector("#add");
const buttonRemove = document.querySelector("#remove");
const copyButton = document.querySelector("#copy");
const copiedButton = document.querySelector("#copied");
const outputEmptyMsg = document.querySelector(".clipboard h2");

const output = {
  isCopied: false,
  list: null,
  itemsCount: 0,
  isEmpty: true,

  updateList: function () {
    this.list = document.querySelector("#list");
    this.itemsCount = this.list.querySelectorAll("li").length;
    this.isEmpty = this.itemsCount === 0 ? true : false;
    this.updateCopyIcon();
  },

  add: function () {
    const station = stationsSelect[stationsSelect.selectedIndex].text;
    const action = actionsSelect[actionsSelect.selectedIndex].value;
    const listItem = document.createElement("li");
    listItem.innerText = `${station} ${formatAction(action)}`;
    this.list.appendChild(listItem);
    this.isCopied = false;
    this.updateList();
  },

  remove: function () {
    if (this.isEmpty) {
      alert("The list is empty!");
      return 0;
    }
    this.list.lastChild.remove();
    this.isCopied = false;
    this.updateList();
  },

  copy: function () {
    if (this.isEmpty) {
      alert("The list is empty!");
      return 0;
    }
    let text = "";

    Array.from(this.list.querySelectorAll("li")).forEach((item) => {
      text += item.textContent + "\n";
    });
    navigator.clipboard
      .writeText(text)
      .then(() => {
        this.isCopied = true;
        this.updateList();
      })
      .catch((error) => {
        console.error("Failed to copy list text:", error);
      });
  },

  updateCopyIcon: function () {
    if (this.isCopied) {
      copiedButton.classList.remove("hidden");
      copyButton.classList.add("hidden");
    } else {
      copiedButton.classList.add("hidden");
      copyButton.classList.remove("hidden");
    }
  },
};

const populateOptions = function () {
  for (let i = 1; i <= MAX_STATIONS_NUMBER; i++) {
    const optionElement = document.createElement("option");
    const optionValue = `${AMBIENT_PFX}${formatStationNumber(i)}`;
    optionElement.value = optionValue;
    optionElement.innerText = optionValue;
    stationsSelect.appendChild(optionElement);
  }

  for (let i = 1; i <= MAX_STATIONS_NUMBER; i++) {
    const optionElement = document.createElement("option");
    const optionValue = `${CHILL_PFX}${formatStationNumber(i)}`;
    optionElement.value = optionValue;
    optionElement.innerText = optionValue;
    stationsSelect.appendChild(optionElement);
  }

  output.updateList();
};

const formatStationNumber = function (number) {
  if (number < 10) {
    return `0${number}`;
  }

  return number;
};

const formatAction = function (action) {
  if (action === "unplug") {
    return "unplugged and plugged back in";
  } else if (action === "restart") {
    return "successfully restarted";
  }
};

const addOutput = function () {
  const station = stationsSelect[stationsSelect.selectedIndex].text;
  const action = actionsSelect[actionsSelect.selectedIndex].value;
  const listItem = document.createElement("li");
  listItem.innerText = `${station} ${formatAction(action)}`;
  list.appendChild(listItem);
  output.updateList();
};

populateOptions();

buttonAdd.addEventListener("click", function (e) {
  e.preventDefault();
  output.add();
});

buttonRemove.addEventListener("click", function (e) {
  e.preventDefault();
  output.remove();
});

copyButton.addEventListener("click", function () {
  output.copy();
});
