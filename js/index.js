(function () {
  document.getElementById("start").addEventListener("click", Start);


    /*function for disable cards remove event listener on the 
    card.addEventListener and then readd it on start. Mechial is figuring out
    how to lock the whole board. You can use that when he is done*/

    let start = document.getElementById("start");
    let interval = -1;
    let completeTime = 0; //starts timer at 0 but won't reset when start is pushed again.
    const timer = document.querySelector(".timer");

    function Start() {//starts timer. Later add allowance to move cards

    timer.innerText = completeTime;

    start.removeEventListener("click", Start);
    start.addEventListener("click", Pause);
    start.value = "Pause";

    start.innerText = "Pause";

    start.classList.add("pause");
    start.classList.remove("start");


        interval = setInterval(function () {
            completeTime++;
            timer.innerText = completeTime;
        }, 1000);
    }

    function Pause() { //pauses timer. Later have it so you are unable to move cards
        start.removeEventListener("click", Pause);
        start.addEventListener("click", Start);
        start.value = "Start";

        start.innerText = "Start";
        start.classList.add("start");
        start.classList.remove("pause");
        clearInterval(interval);
        interval = -1;
    }


  function Pause() {
    start.removeEventListener("click", Pause);
    start.addEventListener("click", Start);
    start.value = "Start";

    start.innerText = "Start";
    start.classList.add("start");
    start.classList.remove("pause");
    clearInterval(interval);
    interval = -1;
  }


    document.getElementById("reset").addEventListener("click", () => {
        /*The reset button, when pressed, will randomize the cards*/
        Pause(); //runs pause function
        completeTime = 0;
        timer.innerText = completeTime;//resets timer to 0
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
