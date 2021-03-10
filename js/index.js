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

        //grabs info and creates a "timer". Not actual timer yet.
        let userTime = document.getElementById("seconds").value;
        const countdown = document.createElement("p");

        countdown.innerText = userTime;

        const timer = document.querySelector(".timer");

        timer.append(countdown);

        //Start button becomes a pause button
        let start = document.getElementById("start");
        let interval = -1; //indicates timer is paused

        if (interval === -1) {
            start.innerText = "Pause";
            interval = setInterval(function () {
                userTime--;
                countdown.innerText = userTime;
            }, 1000);
        } else {
            start.innerText = "Start";
            clearInterval(interval);
            interval = -1;
        };
    });

    document.getElementById("reset").addEventListener("click", () => {
        /*The reset button, when pressed, will randomize the cards and reset 
        the clock to have the timer ask for the input amount. It also makes the
        start button reappear if it was in motion.*/
    });
})();