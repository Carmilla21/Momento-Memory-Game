(function () {

  let start = document.getElementById("start");
  let interval = -1;
  let completeTime = 0;//this and moriTime are universal to keep time.
  let moriTime = 120;
  let isMori = false;
  const timer = document.querySelector(".timer");


  function timeCountUp() {//displays timer in 0:00 format and counts up
    let minutes = Math.floor(completeTime / 60); //turns seconds to minutes
    let seconds = completeTime % 60;

    seconds = seconds < 10 ? "0" + seconds : seconds; //sets timer structure

    timer.innerText = `${minutes}:${seconds}`;//adds the above to make timer.

    completeTime++;//increments so seconds add up.
  }


  function timeCountDown() { //starts at 2 and counts down
    let minutes = Math.floor(moriTime / 60);//same as above just different starting value.
    let seconds = moriTime % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerText = `${minutes}:${seconds}`;

    moriTime--;//increments so seconds pass.

    if (moriTime < 0) {//stops the clock at 0:00. Need to apply lose condition.
      clearInterval(interval);
    }

  };


  let removeTime = document.getElementById("noTimer");
  removeTime.addEventListener("change", () => {//lets the timer display or not.
    if (removeTime.checked) {
      timer.style.display = "none";
    } else {
      timer.style.display = "block";
    }
  });


  function Start() {//starts timer. 

    difficultyOff();//removes ability to select difficulty until restarted.

    timer.style.display = "block"; //displays timer

    if (isMori === true) { //if memento mori difficulty selected counts down, otherwise countup
      interval = setInterval(timeCountDown, 1000);

      start.removeEventListener("click", Pause);
      start.removeEventListener("click", Start);

      start.innerText = "Memento Mori";

      start.classList.remove("start");
      start.classList.remove("pause");
      start.classList.add("mementoMori");

      let checkBox = document.querySelector("label")
      checkBox.innerText = "Your Fate is Sealed";


    } else {//if any difficulty other then memento mori is selected.
      interval = setInterval(timeCountUp, 1000);

      start.innerText = "Pause";
      start.removeEventListener("click", Start);
      start.addEventListener("click", Pause);
      start.value = "Pause";

      start.classList.add("pause");
      start.classList.remove("start");
    };


    locked = false;//the board is unlocked and cards can be used.

  }



  function Pause() { //pauses timer. Later have it so you are unable to move cards

    start.removeEventListener("click", Pause);//changes pause button to start button
    start.addEventListener("click", Start);
    start.value = "Start";

    locked = true; //keeos cards from being used during pause

    start.innerText = "Start";
    start.classList.add("start");
    start.classList.remove("pause");
    clearInterval(interval); // the actual pause.
    interval = -1;
  }



  document.getElementById("reset").addEventListener("click", () => {//reset

    Pause(); //runs pause function
    difficultyOn(); //let's select difficulty happen
    document.getElementById("start").removeEventListener("click", Start);

    if (isMori === true) {//if memento mori difficulty is selected it resets the time accordingly
      moriTime = 120;
      minutes = 2;
      seconds = 0;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      timer.innerText = `${minutes}:${seconds}`;

    } else {//if not memento mori then it resets time to 0:00.
      completeTime = 0;
      minutes = 0;
      seconds = 0;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      timer.innerText = `${minutes}:${seconds}`;//resets timer to 0
    }

    timer.style.display = "none"; //removes timer from screen.

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
    let matched = firstCard.dataset.cardPair === secondCard.dataset.cardPair;
    matched ? disableCards() : unFlip();
  }

  //disables attemted cards till
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

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

      resetCards();
    }, 1500);
  }

  //Shuffles the cards
  function shuffle() {
    cards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  }

  shuffle();

  //Reset card variables
  function resetCards() {
    [hasFlippedCard, locked] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  let easyMode = document.querySelector(".easy");
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


  function difficultyOff() { // removes event listeners for difficulty. Used in start function
    easyMode.removeEventListener("click", easyOn);
    mediumMode.removeEventListener("click", mediumOn);
    hardMode.removeEventListener("click", hardOn);
  };

  function difficultyOn() {// adds event listeners for difficulty. Used in reset.
    easyMode.addEventListener("click", easyOn);
    mediumMode.addEventListener("click", mediumOn);
    hardMode.addEventListener("click", hardOn);
  }


  //Easy mode. Reveals six cards to play with
  function easyOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "none"));
    hardCards.forEach((card) => (card.style.display = "none"));
    isMori = false;
    document.getElementById("start").addEventListener("click", Start);
    removeTime.style.visibility = "visible";
  }

  //Medium mode. Reveals 8 cards to play with
  let mediumMode = document.querySelector(".medium");
  mediumMode.addEventListener("click", mediumOn);

  function mediumOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "none"));
    isMori = false;
    document.getElementById("start").addEventListener("click", Start);
    removeTime.style.visibility = "visible";
  }
  //Hard mode. Reveals 12 cards to play with
  let hardMode = document.querySelector(".hard");
  hardMode.addEventListener("click", hardOn);

  function hardOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "block"));
    isMori = true;
    document.getElementById("start").addEventListener("click", Start);
    removeTime.style.visibility = "hidden";
  }
  //Adds event listener to all cards to flip
  cards.forEach((card) => {
    card.addEventListener("click", flipCard);
    card.setAttribute("listenter", "true");
  });
})();
