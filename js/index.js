(function () {
  let start = document.getElementById("start");
  let interval = -1;
  let completeTime = 0; //this and moriTime are universal to keep time.
  let moriTime = 120;
  let isMori = false;
  const timer = document.getElementById("timerText");
  let checkBox = document.querySelector("label");
  let fader = document.querySelector(".fader");
  const heartBeat = document.getElementById("heartSlow");
  let flipCount = 0;
  let cardMatch = 0;
  let easy = false;
  let medium = false;

  function timeCountUp() {
    //displays timer in 0:00 format and counts up
    let minutes = Math.floor(completeTime / 60); //turns seconds to minutes
    let seconds = completeTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds; //sets timer structure

    timer.textContent = `${minutes}:${seconds}`; //adds the above to make timer.

    completeTime++; //increments so seconds add up.
  }

  function timeCountDown() {
    //starts at 2 and counts down
    let minutes = Math.floor(moriTime / 60); //same as above just different starting value.
    let seconds = moriTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    timer.textContent = `${minutes}:${seconds}`;

    moriTime--; //increments so seconds pass.

    //as timer decreases the screen will become red
    fader.style.opacity = (110 - moriTime) * 0.008333;

    //Hard mode audio contols

    if (moriTime > 90) {
      heartBeat.play();
      heartBeat.loop = true;
    } else if (moriTime > 60) {
      heartBeat.playbackRate = 1.2;
    } else if (moriTime > 30) {
      heartBeat.playbackRate = 1.6;
    } else if (moriTime > 10) {
      heartBeat.playbackRate = 2;
    } else if (moriTime > 0) {
      heartBeat.playbackRate = 2.5;
    }
    if (moriTime < 0) {
      //stops the clock at 0:00.
      Pause();
      heartBeat.pause();
      heartBeat.playbackRate = 1;

      document.getElementById("endOfMori").style.display = "flex"; //lose condition
    }
  }

  function easyTime() {
    //sets timer for easy and medium
    isMori = false;
    document.getElementById("start").addEventListener("click", Start);
    removeTime.style.visibility = "visible";

    completeTime = 0;
    minutes = 0;
    seconds = 0;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.textContent = `${minutes}:${seconds}`;
  }

  function hardTime() {
    //sets timer for mori mode
    isMori = true;
    document.getElementById("start").addEventListener("click", Start);
    removeTime.style.visibility = "hidden";

    moriTime = 120;
    minutes = 2;
    seconds = 0;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timer.textContent = `${minutes}:${seconds}`;
  }

  function loseTime() {
    //it's under "unFlip"=
    if (moriTime >= 10) {
      timer.classList.add("timeDilation");
      timer.classList.remove("normalText");
      setTimeout(() => {
        timer.classList.add("normalText");
        timer.classList.remove("timeDilation");
      }, 1000);
      for (i = 0; i < 10; i++) {
        //loops 10 times to reduce seconds by 10 in mori mode
        timeCountDown();
      }
    }
  }

  const timerContainer = document.querySelector("#timer");

  let removeTime = document.getElementById("noTimer");
  removeTime.addEventListener("change", () => {
    //lets the timer display or not.
    if (removeTime.checked) {
      timerContainer.style.display = "none";
    } else {
      timerContainer.style.display = "flex";
    }
  });

  function Start() {
    //starts timer.

    difficultyOff(); //removes ability to select difficulty until restarted.

    timerContainer.style.display = "flex"; //displays timer

    if (isMori === true) {
      //if memento mori difficulty selected counts down, otherwise countup
      interval = setInterval(timeCountDown, 1000);

      start.removeEventListener("click", Pause);
      start.removeEventListener("click", Start);

      start.innerText = "Memento Mori";

      start.classList.remove("start");
      start.classList.remove("pause");
      start.classList.add("mementoMori");

      checkBox.innerText = "Your Fate is Sealed";

    } else {
      //if any difficulty other then memento mori is selected.
      interval = setInterval(timeCountUp, 1000);

      start.innerText = "Pause";
      start.removeEventListener("click", Start);
      start.addEventListener("click", Pause);
      start.value = "Pause";

      start.classList.add("pause");
      start.classList.remove("start");
    }

    locked = false; //the board is unlocked and cards can be used.

  }

  function Pause() {
    //pauses timer. Later have it so you are unable to move cards

    start.removeEventListener("click", Pause); //changes pause button to start button
    start.addEventListener("click", Start);
    start.value = "Start";

    locked = true; //keeos cards from being used during pause

    start.innerText = "Start";
    start.classList.add("start");
    start.classList.remove("pause");
    clearInterval(interval); // the actual pause.
    interval = -1;
  }

  document.querySelectorAll(".reset").forEach((reset) => {
    reset.addEventListener("click", () => {
      //reset

      Pause(); //runs pause function
      difficultyOn(); //let's select difficulty happen
      easy = false;
      medium = false;
      document.getElementById("start").removeEventListener("click", Start);

      timerContainer.style.display = "none"; //removes timer from screen.
      checkBox.innerText = "Remove Timer";
      removeTime.style.visibility = "visible";

      resetCards();
      locked = true;
      allOff();

      cards.forEach((card) => {
        if (!card.listen) {
          card.addEventListener("click", flipCard);
          card.setAttribute("listenter", "true");
        }
      });
      shuffle();
      fader.style.opacity = 0;
      cardMatch = 0;
      flipCount = 0;
      heartBeat.pause();
      heartBeat.playbackRate = 1;
      document.getElementById("endOfMori").style.display = "none";
    });
  });

  const cards = document.querySelectorAll(".card");

  let hasFlippedCard = false;
  let locked = true;
  let firstCard = null;
  let secondCard = null;

  /**
   * Function will add the flip class to element
   */
  function flipCard() {
    if (locked) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;

    matched();
  }

  //Checks if two cards match
  function matched() {
    locked = true;
    flipCount++;
    let matched = firstCard.dataset.cardPair === secondCard.dataset.cardPair;
    matched ? disableCards() : unFlip();
  }

  //disables attemted cards till
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    cardMatch++
    winCheck();

    setTimeout(() => {
      firstCard.style.visibility = "hidden";
      secondCard.style.visibility = "hidden";

      resetCards();
    }, 1500);
  }

  //Unflips mismatched cards after 1.5sec
  function unFlip() {
    locked = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      while (isMori === true) {
        loseTime();
        break;
      }
      resetCards();
    }, 1500);
  }

  //Shuffles the cards
  function shuffle() {
    cards.forEach((card) => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
      card.tabIndex = randomPos.toString();
    });
  }

  shuffle();

  //Reset card variables
  function resetCards() {
    [hasFlippedCard, locked] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  //Easy mode. Reveals six cards to play with
  let easyMode = document.querySelector("#easy");

  easyMode.addEventListener("click", easyOn);
  let easyCards = document.querySelectorAll(".easyCard");
  let mediumCards = document.querySelectorAll(".mediumCard");
  let hardCards = document.querySelectorAll(".hardCard");

  function allOff() {
    easyCards.forEach((card) => (card.style.display = "none"));
    mediumCards.forEach((card) => (card.style.display = "none"));
    hardCards.forEach((card) => (card.style.display = "none"));
    cards.forEach((card) => {
      card.style.visibility = "visible";
      card.classList.remove("flip");
    });
  }

  function difficultyOff() {
    // removes event listeners for difficulty. Used in start function
    easyMode.removeEventListener("click", easyOn);
    mediumMode.removeEventListener("click", mediumOn);
    hardMode.removeEventListener("click", hardOn);
  }

  function difficultyOn() {
    // adds event listeners for difficulty. Used in reset.
    easyMode.addEventListener("click", easyOn);
    mediumMode.addEventListener("click", mediumOn);
    hardMode.addEventListener("click", hardOn);
  }

  //Easy mode. Reveals six cards to play with
  function easyOn() {
    easyCards.forEach((card) => (card.style.display = "flex"));
    mediumCards.forEach((card) => (card.style.display = "none"));
    hardCards.forEach((card) => (card.style.display = "none"));

    easy = true;

    easyTime();
  }

  //Medium mode. Reveals 8 cards to play with
  let mediumMode = document.querySelector("#medium");
  mediumMode.addEventListener("click", mediumOn);

  function mediumOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "none"));

    medium = true;

    easyTime();
  }
  //Hard mode. Reveals 12 cards to play with
  let hardMode = document.querySelector("#hard");
  hardMode.addEventListener("click", hardOn);

  function hardOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "block"));

    hardTime();
  }
  //Adds event listener to all cards to flip
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        //temporary fix. Tried changing flipcard and it broke horrifically.

        if (locked) return;
        if (card === firstCard) return;

        card.classList.add("flip");

        if (!hasFlippedCard) {
          hasFlippedCard = true;
          firstCard = card;
          return;
        }

        secondCard = card;

        matched();
      }
    });
    card.setAttribute("listener", "true");
  });

  function onWin() {//what happens on win
    //if cards are gone do this(maybe do this if loop outside of the function in start)
    Pause();


    document.getElementById("endOfMori").style.display = "flex";

    if (isMori) {
      heartBeat.pause();
      heartBeat.playbackRate = 1;

      document.getElementById("endOfMori").innerText = `The ninth lion ate the sun. ${flipCount} flips`

    } else {
      document.getElementById("endOfMori").innerText = `You Won in ${flipCount} flips`
    }

    //have to press reset so don't add too much
  };

  function winCheck() {//checks to see if you won.
    if (easy === true) {
      if (cardMatch === 3) {
        onWin();
      }
    } else if (medium === true) {
      if (cardMatch === 5) {
        onWin();
      }
    } else if (isMori === true) {
      if (cardMatch === 6) {
        onWin();
      }
    }
  }
})();
