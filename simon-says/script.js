const startBtn = document.createElement("button");
const levelEasyBtn = document.createElement("button");
const levelMiddleBtn = document.createElement("button");
const levelHardBtn = document.createElement("button");
const chooseLevelText = document.createElement("p");
const titleGame = document.createElement("h1");
const keyboardContainer = document.createElement("div");
const levelsContainer = document.createElement("div");
const container = document.createElement("div");
const upperBlockMenu = document.createElement("div");
const middleBlockMenu = document.createElement("div");
const levelName = document.createElement("p");
const roundText = document.createElement("p");
const input = document.createElement("input");
const newGameBtn = document.createElement("button");
const repeatSequence = document.createElement("button");
const span = document.createElement("span");
input.readOnly = true;
let selectedLevel = "easy";
let round = 1;
let isRepetitive = false;
const levelsKeyboard = {
  easy: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  middle: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
  hard: [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
};
let letters = levelsKeyboard[selectedLevel];
let isDisplayingSequence = false;
let countAttempt = 1;

startBtn.textContent = "Start";
levelEasyBtn.textContent = "Easy level";
levelMiddleBtn.textContent = "Middle level";
levelHardBtn.textContent = "Hard level";
chooseLevelText.textContent = "Choose a level to play";
titleGame.textContent = "Simon game";
roundText.textContent = `Round ${round}/5`;

startBtn.classList.add("upper-block-menu__btn-start", "game__button");
levelEasyBtn.classList.add("game__button", "level__button");
levelMiddleBtn.classList.add("game__button", "level__button");
levelHardBtn.classList.add("game__button", "level__button");
levelsContainer.classList.add("levels-block");
keyboardContainer.classList.add("keyboard-block");
titleGame.classList.add("game__text-title");
container.classList.add("game");
levelName.classList.add("game__level-name");
upperBlockMenu.classList.add("upper-block-menu");
middleBlockMenu.classList.add("middle-block-menu");
input.classList.add("middle-block-menu__input");
repeatSequence.classList.add("game__button");
span.classList.add("flare");

function InitialGameScreen() {
  container.innerHTML = "";
  upperBlockMenu.innerHTML = "";
  middleBlockMenu.innerHTML = "";
  upperBlockMenu.appendChild(titleGame);
  levelsContainer.appendChild(chooseLevelText);
  levelsContainer.appendChild(levelEasyBtn);
  levelsContainer.appendChild(levelMiddleBtn);
  levelsContainer.appendChild(levelHardBtn);
  upperBlockMenu.appendChild(levelsContainer);
  upperBlockMenu.appendChild(startBtn);
  startBtn.appendChild(span);
  document.body.appendChild(container);
  container.append(upperBlockMenu);
  container.append(middleBlockMenu);
  upperBlockMenu.style.flexDirection = "column";
  let levelBtns = [levelEasyBtn, levelMiddleBtn, levelHardBtn];
  levelBtns.forEach((el) => {
    if (el.textContent.split(" ")[0].toLowerCase() === selectedLevel) {
      el.classList.add("levels-block__active-btn");
    }
  });
}

InitialGameScreen();

function createKeyboard(level) {
  container.appendChild(keyboardContainer);
  keyboardContainer.innerHTML = "";
  levelName.textContent = `Level: ${level}`;
  letters = levelsKeyboard[level];
  letters.forEach((el) => {
    const letter = document.createElement("button");
    letter.classList.add("keyboard-block__letter");
    letter.setAttribute("disabled", "");
    letter.textContent = el;
    keyboardContainer.append(letter);
  });
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

function removeClass() {
  levelEasyBtn.classList.remove("levels-block__active-btn");
  levelMiddleBtn.classList.remove("levels-block__active-btn");
  levelHardBtn.classList.remove("levels-block__active-btn");
}

function layoutGame() {
  container.style.gap = "10px";
  upperBlockMenu.innerHTML = "";
  keyboardContainer.innerHTML = "";
  createKeyboard(selectedLevel);
  if (window.innerWidth >= 800) {
    upperBlockMenu.style.flexDirection = "row";
  }
  upperBlockMenu.append(levelName);
  upperBlockMenu.append(roundText);
  newGameBtn.classList.add("new-game-btn", "game__button");
  newGameBtn.textContent = "New game";
  upperBlockMenu.append(newGameBtn);
  repeatSequence.textContent = "Repeat sequence";
  upperBlockMenu.append(repeatSequence);
  middleBlockMenu.append(input);
}

function generateRandomExp(imp) {
  let randomExp = "";
  isRepetitive = false;
  for (let i = 0; i < imp; i++) {
    let ran = letters[Math.floor(Math.random() * letters.length)];
    randomExp += ran;
  }
  return randomExp;
}

let easyLetters = levelsKeyboard[selectedLevel];
let randomExp;

function playGame() {
  container.style.justifyContent = "space-evenly";
  container.style.gap = "100px";
  input.value = "";
  randomExp = generateRandomExp(round * 2);
  layoutGame();
  createKeyboard(selectedLevel);
  showElements(randomExp);
  clickProcessing();
}

async function showElements(randomExp) {
  isDisplayingSequence = true;
  makeButtonsInaccessible();
  newGameBtn.setAttribute("disabled", "");
  repeatSequence.setAttribute("disabled", "");
  window.removeEventListener("keydown", handleKeyPress);
  let previousLetter = null;
  for (const el of randomExp) {
    if (!isDisplayingSequence) {
      break;
    }
    const letterButton = Array.from(document.querySelectorAll("button")).find(
      (button) => button.textContent === el
    );

    if (letterButton) {
      letterButton.classList.remove("activeElement");
      if (el === previousLetter) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      letterButton.classList.add("activeElement");
      await new Promise((resolve) => setTimeout(resolve, 700));
      letterButton.classList.remove("activeElement");
    }
    previousLetter = el;
  }

  if (isDisplayingSequence) {
    console.log("Сгенерированное выражение:", randomExp);
    makeButtonsAvailable();
    newGameBtn.removeAttribute("disabled");
    repeatSequence.removeAttribute("disabled");
  }

  window.addEventListener("keydown", handleKeyPress);
  isDisplayingSequence = false;
}

const handleKeyboardClick = (e) => {
  if (e.target.classList.contains("keyboard-block__letter")) {
    const letterButton = e.target;
    input.value += letterButton.textContent;
    checkMatches();
    if (letterButton) {
      letterButton.classList.add("activeElement");
      setTimeout(() => {
        letterButton.classList.remove("activeElement");
      }, 700);
    }
  }
};

function makeButtonsInaccessible() {
  const letterButtons = document.querySelectorAll(".keyboard-block__letter");
  letterButtons.forEach((button) => {
    button.setAttribute("disabled", "");
  });
}

function makeButtonsAvailable() {
  const letterButtons = document.querySelectorAll(".keyboard-block__letter");
  letterButtons.forEach((button) => {
    button.removeAttribute("disabled");
  });
  return true;
}

function clickProcessing() {
  const keyboard = document.querySelector(".keyboard-block");
  keyboard.removeEventListener("click", handleKeyboardClick);
  keyboard.addEventListener("click", handleKeyboardClick);
}

function updateLevel() {
  easyLetters = levelsKeyboard[selectedLevel];
  keyboardContainer.innerHTML = "";
  createKeyboard(selectedLevel);
  randomExp = generateRandomExp(2);
  round = 1;
}

function handleNextRound() {
  if (repeatSequence.textContent === "Next") {
    makeButtonsInaccessible();
    countAttempt = 1;
    round++;
    repeatSequence.textContent = "Repeat sequence";
    roundText.textContent = `Round ${round}/5`;
    setTimeout(() => {
      input.value = "";
    }, 0);
    if (round <= 5) {
      randomExp = generateRandomExp(round * 2);
      showElements(randomExp);
      clickProcessing();
    }
  }
}

function throwingErrors() {
  const inputValueArr = input.value.split("");
  const randomExpArr = randomExp.split("");
  for (let i = 0; i < inputValueArr.length; i++) {
    if (inputValueArr[i].toLowerCase() !== randomExpArr[i] && countAttempt === 0) {
      createModal("Game over :(");
      window.removeEventListener("keydown", handleKeyPress);
      makeButtonsInaccessible();
      input.value = "";
      clearGame();
      return;
    } else {
      if (input.value[i] !== randomExp[i]) {
        createModal(
          "You made a mistake! Try again. You don't have any more attempts left"
        );
        window.removeEventListener("keydown", handleKeyPress);
        makeButtonsAvailable();
        input.value = "";
        countAttempt -= 1;
        clickProcessing();
        return;
      }
    }
  }
}

function checkMatches() {
  repeatSequence.textContent = "Repeat sequence";
  const inputValueArr = input.value.split("");
  const randomExpArr = randomExp.split("");
  if (inputValueArr.join("") === randomExpArr.join("")) {
    if (round === 5) {
      createModal("You win!");
      clearGame();
    } else {
      window.removeEventListener("keydown", handleKeyPress);

      repeatSequence.textContent = "Next";
      createModal('You guessed right. Click on the "next" button');
      makeButtonsInaccessible();
      repeatSequence.removeEventListener("click", handleNextRound);
      showRepeatSequence();
      repeatSequence.addEventListener("click", handleNextRound);
    }
  } else {
    throwingErrors();
  }
}

levelEasyBtn.addEventListener("click", () => {
  removeClass();
  selectedLevel = "easy";
  updateLevel();
  levelEasyBtn.classList.add("levels-block__active-btn");
});
levelMiddleBtn.addEventListener("click", () => {
  removeClass();
  selectedLevel = "middle";
  updateLevel();
  levelMiddleBtn.classList.add("levels-block__active-btn");
});
levelHardBtn.addEventListener("click", () => {
  removeClass();
  selectedLevel = "hard";
  updateLevel();
  levelHardBtn.classList.add("levels-block__active-btn");
});
createKeyboard(selectedLevel);

startBtn.addEventListener("click", () => {
  playGame();
});

function clearGame() {
  container.style.justifyContent = "center";
  container.style.gap = "50px";
  countAttempt = 1;
  round = 1;
  randomExp = generateRandomExp(2);
  roundText.textContent = `Round ${round}/5`;
  input.value = "";
  isRepetitive = false;
  removeClass();
  InitialGameScreen();
  createKeyboard(selectedLevel);
  makeButtonsInaccessible();
}

function newGame() {
  newGameBtn.addEventListener("click", () => {
    isDisplayingSequence = false;
    makeButtonsInaccessible();
    clearGame();
  });
}

newGame();

function handleRepeatSequence() {
  if (repeatSequence.textContent === "Repeat sequence" && !isRepetitive) {
    input.value = "";
    makeButtonsInaccessible();
    showElements(randomExp);
    isRepetitive = true;
  }
}

function showRepeatSequence() {
  repeatSequence.removeEventListener("click", handleRepeatSequence);
  repeatSequence.addEventListener("click", handleRepeatSequence);
}

showRepeatSequence();

function handleKeyPress(e) {
  const key = e.key.toLowerCase();
  if (letters.includes(key)) {
    input.value += key;
    const letterButton = Array.from(
      document.querySelectorAll(".keyboard-block__letter")
    ).find((button) => button.textContent === key);
    if (letterButton) {
      letterButton.classList.add("activeElement");
      setTimeout(() => {
        letterButton.classList.remove("activeElement");
      }, 700);
    }
  } else {
    return;
  }

  checkMatches();
}

window.addEventListener("resize", () => {
  if (window.innerWidth < 800) {
    isDisplayingSequence = true;
    upperBlockMenu.style.flexDirection = "column";
  } else if (isDisplayingSequence && window.innerWidth >= 800) {
    upperBlockMenu.style.flexDirection = "row";
  }
});

function createModal(message) {
  const modalOverlay = document.createElement("div");
  const modal = document.createElement("div");
  const modalMessage = document.createElement("p");
  const closeButton = document.createElement("button");

  modalOverlay.classList.add("modal-overlay");
  modal.classList.add("modal-overlay__modal");
  modalMessage.classList.add("modal__modal-message");
  closeButton.classList.add("modal__close-button", "game__button");

  modalMessage.textContent = message;
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", function () {
    document.body.removeChild(modalOverlay);
    window.addEventListener("keydown", handleKeyPress);
  });

  modal.appendChild(modalMessage);
  modal.appendChild(closeButton);
  modalOverlay.appendChild(modal);
  document.body.appendChild(modalOverlay);
}
