(function () {
  document.getElementById("start").addEventListener("click", () => {
    /*needs to get input info for timer and put it into the countdown timer.
        It will also allow the cards to start being moved. Then the start button
        will become a pause button and it's function changes. 
        
        The pause button needs to stop the timer at its current position and stop
        the player from moving the cards. The button while stopped will turn back 
        to start.

        Start can't be pressed if there is no time amount for the timer.

        The start button can not reset the timer or cards.*/

    //create a timer that counts up how long it took.
    const timer = document.querySelector(".timer");
    let completeTime = 0;

    timer.innerText = completeTime;

    //Start button becomes a pause button
    let start = document.getElementById("start");
    let interval = -1; //indicates timer is paused

    //maybe do an add classlist and remove classlist for start and pause. have only start in HTML to begin with
    if (interval === -1) {
      start.innerText = "Pause";
      interval = setInterval(function () {
        completeTime++;
        timer.innerText = completeTime;
      }, 1000);
    } else {
      start.innerText = "Start";
      clearInterval(interval);
      interval = -1;
    }
  });

  document.getElementById("reset").addEventListener("click", () => {
    /*The reset button, when pressed, will randomize the cards and reset 
        the clock to have the timer ask for the input amount. It also makes the
        start button reappear if it was in motion.*/
  });

  const cards = document.querySelectorAll(".card");

  let hasFlippedCard = false;
  let firstCard, secondCard;
  /**
   * Function will add the flip class to element
   */
  function flipCard() {
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;

    checkMatch();
  }

  //Checks if two cards match
  let matched =
    firstCard.dataset.card - type === secondCard.dataset.card - type;
  matched ? disablecards() : unflipCards();

  //disables attemted cards till
  function disablecards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    firstCard.style.display = "none";
    secondCard.style.display = "none";
  }

  //Unflips mismatched cards after 1.5sec
  function unFlip() {
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
    }, 1500);
  }
  //Adds event listener to all cards to flip
  cards.forEach((card) => card.addEventListener("click", flipCard));
})();
