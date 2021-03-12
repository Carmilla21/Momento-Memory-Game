(function () {
  document.getElementById("start").addEventListener("click", Start);

  let start = document.getElementById("start");
  let interval = -1;
  let completeTime = 0; //starts timer at 0 but won't reset when start is pushed again.
  let moriTime = 120;
  const timer = document.querySelector(".timer");

  function timeCountUp() { //displays timer in 0:00 format and counts up
    let minutes = Math.floor(completeTime / 60);
    let seconds = completeTime % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerText = `${minutes}:${seconds}`;

    completeTime++;


  }


  function timeCountDown() { //starts at 2 and counts down
    let minutes = Math.floor(moriTime / 60);
    let seconds = moriTime % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    timer.innerText = `${minutes}:${seconds}`;

    moriTime--;

    if (moriTime < 0) {
      clearInterval(interval);
    }

  }


  function Start() {//starts timer. Later add allowance to move cards
    // if (isMori === true) { //if memento mori difficulty selected counts down, otherwise countup
    // interval = setInterval(timeCountDown, 1000);
    // } else if (noTimer = true) {
    // interval = 0; //when noTimer button is pressed. Make it remove timer. just in case there is a timer first.
    // } else {
    interval = setInterval(timeCountUp, 1000);
    // };
    console.log("timer added")
    console.log(timer.innerText);
    start.removeEventListener("click", Start);
    start.addEventListener("click", Pause);
    start.value = "Pause";

    locked = false;

    start.innerText = "Pause";


    start.classList.add("pause");
    start.classList.remove("start");
  }

  function Pause() { //pauses timer. Later have it so you are unable to move cards
    start.removeEventListener("click", Pause);
    start.addEventListener("click", Start);
    start.value = "Start";

    locked = true;

    start.innerText = "Start";
    start.classList.add("start");
    start.classList.remove("pause");
    clearInterval(interval);
    interval = -1;
  }



  document.getElementById("reset").addEventListener("click", () => {
    /*The reset button, when pressed, will randomize the cards*/
    Pause(); //runs pause function

    /*do if else for momento mori so it starts at 2mins. maybe try doing this 
    as if else AND then the pause(). So that the change happens first. That way
    you may be able to just put in the countUp or countDown function in the if
    else instead of all that is below. Maybe have reset just remove the timer.*/

    completeTime = 0;
    minutes = 0;
    seconds = 0;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    timer.innerText = `${minutes}:${seconds}`;//resets timer to 0
  });


  const cards = document.querySelectorAll(".card");

  let hasFlippedCard = false;
  let locked = false;
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
  (function shuffle() {
    cards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * 12);
      card.style.order = ramdomPos;
    });
  })();

  //Reset card variables
  function resetCards() {
    [hasFlippedCard, locked] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  //Easy mode. Reveals six cards to play with
  let easyMode = document.querySelector(".easy");
  easyMode.addEventListener("click", easyOn);
  let easyCards = document.querySelectorAll(".easyCard");
  let mediumCards = document.querySelectorAll(".mediumCard");
  let hardCards = document.querySelectorAll(".hardCard");

  function easyOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "none"));
    hardCards.forEach((card) => (card.style.display = "none"));
  }

  //Medium mode. Reveals 8 cards to play with
  let mediumMode = document.querySelector(".medium");
  mediumMode.addEventListener("click", mediumOn);

  function mediumOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "none"));
  }
  //Hard mode. Reveals 12 cards to play with
  let hardMode = document.querySelector(".hard");
  hardMode.addEventListener("click", hardOn);

  function hardOn() {
    easyCards.forEach((card) => (card.style.display = "block"));
    mediumCards.forEach((card) => (card.style.display = "block"));
    hardCards.forEach((card) => (card.style.display = "block"));
  }
  //Adds event listener to all cards to flip
  cards.forEach((card) => card.addEventListener("click", flipCard));
})();
