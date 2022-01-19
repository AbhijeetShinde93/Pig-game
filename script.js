"use strict";

const score1El = document.querySelector("#score--0");
const score2El = document.getElementById("score--1");

const current0El = document.getElementById("current--0");
const current0E2 = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

const player0El = document.querySelector(".player--0");
const player1E2 = document.querySelector(".player--1");

let scores, currentScore, activePlayer, playing;

const init = function () {
  // staring condiction

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0; //intial player 1 player has the chance to dice the roll
  playing = true;

  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current0E2.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1E2.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1E2.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1E2.classList.toggle("player--active");
};

btnRoll.addEventListener("click", function () {
  if (playing) {
    // generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    //   display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `./public/dice-${dice}.png`;

    //   check for rolled 1
    if (dice !== 1) {
      // add dice current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //   switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add currentScore to the active player
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + curentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if player scores >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");

      //   finish the game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--active");
    } else {
      // switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
