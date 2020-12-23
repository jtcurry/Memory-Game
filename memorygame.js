const gameContainer = document.getElementById("game");
const allItems = game.children;
const startButton = document.getElementById("startButton");
const allHidden = document.getElementsByClassName("hidden");
const leftSide = document.getElementById("leftside");
const rightSide = document.getElementById("rightside");
const bestScore = document.getElementById("bestScore");

const pictureItems = [
  "pic1",
  "pic1",
  "pic2",
  "pic2",
  "pic3",
  "pic3",
  "pic4",
  "pic4",
  "pic5",
  "pic5",
  "pic6",
  "pic6",
  "pic7",
  "pic7",
  "pic8",
  "pic8",
];

//SHUFFLE ITEMS
function shuffle(array) {
  let counter = array.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledItems = shuffle(pictureItems);

function createDivsForColors(pictureArray) {
  for (let picture of pictureArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(picture);
    newDiv.classList.add("hidden");
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

let score = 0;
let numberCorrect = 0;
let eventCount = 0;
let clickedClassList = [];

//MAIN CLICK HANDLER
function handleCardClick(event) {
  if (event.target.classList.contains("hidden") && eventCount < 2) {
    event.target.classList.add("clicked");
    eventCount++;
    event.target.classList.remove("hidden");
    clickedClassList.push(event.target.classList);
    if (eventCount === 2) {
      setTimeout(function () {
        matchItems(clickedClassList);
      }, 1000);
    }
  }
}

//MATCH CLICKED ITEMS
function matchItems(array) {
  if (array[0][0] === array[1][0]) {
    matched();
  } else {
    noMatch();
  }
}

//ITEMS DO NOT MATCH
function noMatch() {
  let selected = document.querySelectorAll(".clicked");
  for (let items of selected) {
    items.classList.add("hidden");
    items.classList.remove("clicked");
  }
  eventCount = 0;
  score++;
  clickedClassList = [];
}

//ITEMS MATCHED
function matched() {
  let selected = document.querySelectorAll(".clicked");
  for (let items of selected) {
    items.classList.remove("clicked");
    numberCorrect++;
    if (numberCorrect === pictureItems.length) {
      score++;
      leftSide.innerText = "You Won!";
      rightSide.textContent = "Your Score: " + score;
      store();
      return;
    }
  }
  score++;
  eventCount = 0;
  clickedClassList = [];
}

//RESET AND START GAME
startButton.addEventListener("click", resetGame);
createDivsForColors(shuffledItems);
startSequence();

function resetGame(event) {
  document.location.reload();
}

function startSequence() {
  for (let i = allHidden.length - 1; i >= 0; i--) {
    let currentHiddenItem = allHidden[i];
    currentHiddenItem.classList.toggle("hidden");
  }
  setTimeout(function () {
    for (let item of allItems) {
      item.classList.toggle("hidden");
    }
  }, 2500);
  bestScore.textContent = "Best Score: " + getStorage();
}

//STORAGE

function store() {
  let storedValues = localStorage.getItem("score");
  if (!storedValues) {
    localStorage.setItem("score", score);
  } else if (score < storedValues) {
    localStorage.setItem("score", score);
  }
}

function getStorage() {
  let storedValues = localStorage.getItem("score");
  if (!storedValues) {
    return "";
  } else {
    return storedValues;
  }
}
