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


        //The else statement isn't happening.
        if (interval === -1) {//start is pressed, clock begins, start changes to pause.
            console.log("started");
            start.innerText = "Pause";
            start.classList.add("pause");
            start.classList.remove("start");
            interval = setInterval(function () {
                completeTime++;
                timer.innerText = completeTime;
            }, 1000);

        } else {//pause is pressed and the clock pauses button changes to start
            console.log("should pause");
            start.innerText = "Start";
            start.classList.add("start");
            start.classList.remove("pause");
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