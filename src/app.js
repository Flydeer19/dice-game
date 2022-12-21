"use strict";

const btnRollDice = document.querySelector("#roll-dice");
const btnHoldScore = document.getElementById("hold-score");
const btnNewGame = document.querySelector("#new-game");
const btnInstruction = document.querySelector("#instruction");
const btnCloseModal = document.querySelector("#close-modal");
const nameSubmit0 = document.querySelector("#name-submit-0");
const nameInput0 = document.querySelector("#name-0");
const nameSubmit1 = document.querySelector("#name-submit-1");
const nameInput1 = document.querySelector("#name-1");
let playerName0 = document.querySelector("#name-player-0");
let playerName1 = document.querySelector("#name-player-1");

const diceImg = document.querySelector("#dice-image");
const instructionModal = document.querySelector("#instruction-modal");
const overlay = document.querySelector("#overlay");

const player0 = document.querySelector("#player-0");
const player1 = document.querySelector("#player-1");

const totalScore0 = document.querySelector("#total-score-0");
const totalScore1 = document.querySelector("#total-score-1");

const currentScore0 = document.querySelector("#current-score-0");
const currentScore1 = document.querySelector("#current-score-1");

const currentScoresHTML = [currentScore0, currentScore1];
const totalScoresHTML = [totalScore0, totalScore1];
const playersHTML = [player0, player1];
let totalScores;
let currentScores;
let activePlayer;

overlay.classList.add("overlay");

function displayName0(event) {
  event.preventDefault();
  const enteredName = nameInput0.value;
  playerName0.textContent = enteredName;
  nameSubmit0.classList.add("hidden");
}

nameSubmit0.addEventListener("submit", displayName0);

// nameSubmit1.classList.remove("hidden");

// function displayName1(event) {
//   event.preventDefault();
//   const enteredName = nameInput1.value;
//   playerName1.textContent = enteredName;
//   nameSubmit1.classList.add("hidden");
//   overlay.classList.remove("overlay");
// }

// nameSubmit1.addEventListener("submit", displayName1);

function init() {
  totalScores = [0, 0];
  currentScores = [0, 0];
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore0.textContent = 0;
  currentScore1.textContent = 0;
  // diceImg.classList.add("hidden");
}

function setActivePlayer() {
  activePlayer = player0.classList.contains("active-player") ? 0 : 1;
}

function resetCurrentScore() {
  currentScores[activePlayer] = 0;
  currentScoresHTML[activePlayer].textContent = currentScores[activePlayer];
}

function switchActivePlayerClass() {
  player0.classList.toggle("active-player");
  player1.classList.toggle("active-player");
}

init();

function rollDice() {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  setActivePlayer();
  diceImg.src = `/images/dice-${diceNumber}.png`;
  diceImg.classList.remove("hidden");
  btnHoldScore.disabled = false;

  if (diceNumber === 1) {
    resetCurrentScore();
    totalScores[activePlayer] = 0;
    totalScoresHTML[activePlayer].textContent = totalScores[activePlayer];
    switchActivePlayerClass();
    btnHoldScore.disabled = true;
  } else {
    currentScores[activePlayer] += diceNumber;
    currentScoresHTML[activePlayer].textContent = currentScores[activePlayer];
  }
}

function holdScore() {
  setActivePlayer();
  totalScores[activePlayer] += currentScores[activePlayer];
  totalScoresHTML[activePlayer].textContent = totalScores[activePlayer];
  resetCurrentScore();
  btnHoldScore.disabled = true;

  if (totalScores[activePlayer] >= 20) {
    playersHTML[activePlayer].classList.add("winner");
    btnRollDice.disabled = true;
  } else {
    switchActivePlayerClass();
    diceImg.classList.add("hidden");
  }
}

function resetGame() {
  init();
  player0.classList.add("active-player");
  player1.classList.remove("active-player", "winner");
  player0.classList.remove("winner");

  btnRollDice.disabled = false;
  btnHoldScore.disabled = false;
}

function showInstruction() {
  instructionModal.classList.remove("hidden");
  overlay.classList.add("overlay");
}

function closeInstructionModal() {
  instructionModal.classList.add("hidden");
  overlay.classList.remove("overlay");
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    if (!instructionModal.classList.contains("hidden")) {
      closeInstructionModal();
    }
  }
});

btnRollDice.addEventListener("click", rollDice);
btnHoldScore.addEventListener("click", holdScore);
btnNewGame.addEventListener("click", resetGame);
btnInstruction.addEventListener("click", showInstruction);
btnCloseModal.addEventListener("click", closeInstructionModal);
