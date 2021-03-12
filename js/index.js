(function () {
  document.getElementById("start").addEventListener("click", Start);

  let start = document.getElementById("start");
  let interval = -1;
  let completeTime = 0; //starts timer at 0 but won't reset when start is pushed again.

  function Start() {
    const timer = document.querySelector(".timer");

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
    /*The reset button, when pressed, will randomize the cards and reset 
        the clock to have the timer ask for the input amount. It also makes the
        start button reappear if it was in motion.*/
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
  //Adds event listener to all cards to flip
  cards.forEach((card) => card.addEventListener("click", flipCard));
})();
