"use strict";

const btnRollDice = document.querySelector("#roll-dice");
const btnHoldScore = document.getElementById("hold-score");
const btnNewGame = document.querySelector("#new-game");
let diceImg = document.querySelector("#dice-image");
const player0 = document.querySelector("#player-0");
const player1 = document.querySelector("#player-1");

let totalScore0 = document.querySelector("#total-score-0");
let totalScore1 = document.querySelector("#total-score-1");

let currentScore0 = document.querySelector("#current-score-0");
let currentScore1 = document.querySelector("#current-score-1");

diceImg.classList.add("hidden");

let sum = 0;

const rollDice = function () {
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  console.log(diceNumber);

  diceImg.src = `/images/dice-${diceNumber}.png`;
  diceImg.classList.remove("hidden");
  sum += diceNumber;
  currentScore0.textContent = sum;
  //add the dice number to the current score
  if (diceNumber === 1) {
    currentScore0.textContent = 0;
    player0.classList.toggle("active-player");
    player1.classList.toggle("active-player");
  }

  //if the number is one - make the score 0 and switch active player;
};

btnRollDice.addEventListener("click", rollDice);
