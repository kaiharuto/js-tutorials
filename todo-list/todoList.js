// create close button to append to each line
let grabbedElement = null;
const getCardBoundingBox = (element) => {
  let boundingBox = element.getBoundingClientRect();
  return {
    top: boundingBox.top,
    left: boundingBox.left,
    bottom: boundingBox.bottom,
    right: boundingBox.right,
    height: boundingBox.height,
    width: boundingBox.width,
  };
};
const partitionArray = (array, low, high) => {
  // use quick sort based on top left corner coordinates
  // start at end of array
  let oldI;
  let oldJ;
  let highBox = array[high];
  let lowBox = array[low];
  let pivot = array[high];
  let i = low - 1;

  console.log(String(array));

  for (let j = low; j < high; i++) {
    if (getCardBoundingBox(array[i]).top < getCardBoundingBox(pivot).top) {
      oldI = array[i];
      oldJ = array[j];
      array[i] = oldJ;
      array[j] = oldI;
    }
  }
  return i + 1;
};

const quickSortTaskList = (array, low = 0, high = null) => {
  if (high === null) {
    high = array.length - 1;
  }
  if (low < high) {
    let pivotIndex = partitionArray(array, low, high);
    quickSortTaskList(array, low, pivotIndex - 1);
    quickSortTaskList(array, pivotIndex + 1, high);
  }
};

let taskList = document.getElementsByTagName("LI");
let isGrabbing = false;
let i;

for (i = 0; i < taskList.length; i++) {
  let CloseSpan = document.createElement("SPAN");
  let closeTxt = document.createTextNode("\u00D7");
  CloseSpan.className = "close";

  let dragSpan = document.createElement("SPAN");
  let dragTxt = document.createTextNode("\u2630");
  dragSpan.className = "dragSelector";

  dragSpan.appendChild(dragTxt);
  taskList[i].appendChild(dragSpan);
  CloseSpan.appendChild(closeTxt);
  taskList[i].appendChild(CloseSpan);
}

// Click on vlose button to hide list item
let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
  };
}

let dragger = document.querySelector(".dragSelector");
dragger.addEventListener("mousedown", function (ev) {
  if (ev.target.className === "dragSelector") {
    isGrabbing = true;
  }
});
dragger.addEventListener("mousemove", function (ev) {
  if (!isGrabbing) {
    return;
  }

  quickSortTaskList(taskList, 0, taskList.length - 1);
});

let list = document.querySelector("ul");
list.addEventListener(
  "click",
  function (ev) {
    if (isGrabbing) {
      return;
    }
    if (ev.target.tagName === "LI") {
      ev.target.classList.toggle("done");
    }
  },
  false,
);

let inputField = document.getElementById("cardDescriptionInput");
inputField.addEventListener("keypress", function (ev) {
  if (ev.defaultPrevented) {
    return;
  }
  if (ev.key === "Enter") {
    newElement();
  }
});

function newElement() {
  let li = document.createElement("li");

  let dragSpan = document.createElement("SPAN");
  let dragTxt = document.createTextNode("\u2630");
  dragSpan.className = "dragSelector";
  li.appendChild(dragSpan);
  dragSpan.appendChild(dragTxt);

  let cardTitle = document.getElementById("cardDescriptionInput").value;
  let t = document.createTextNode(cardTitle);
  li.appendChild(t);
  if (cardTitle === "") {
    alert("A task needs a proper title!");
  } else {
    document.getElementById("taskList").appendChild(li);
  }
  document.getElementById("cardDescriptionInput").value = "";

  let closeSpan = document.createElement("SPAN");
  let closeTxt = document.createTextNode("\u00D7");

  closeSpan.className = "close";
  closeSpan.appendChild(closeTxt);
  li.appendChild(closeSpan);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement;
      div.style.display = "none";
    };
  }
}
