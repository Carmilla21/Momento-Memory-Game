(function () {
    document.getElementById("start").addEventListener("click", Start);

    let start = document.getElementById("start");
    let interval = -1;

    function Start() {
        const timer = document.querySelector(".timer");
        let completeTime = 0;

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

    /**
     * Function will add the flip class to element
     */
    function flipCard() {
        this.classList.toggle("flip");
    }

    //Adds event listener to all cards to flip
    cards.forEach((card) => card.addEventListener("click", flipCard));

})();


