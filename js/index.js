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



    document.getElementById("reset").addEventListener("click", () => {
        /*The reset button, when pressed, will randomize the cards*/
        Pause(); //runs pause function
        completeTime = 0;
        timer.innerText = completeTime;//resets timer to 0
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


