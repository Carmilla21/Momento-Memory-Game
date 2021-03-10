(function () {
    document.getElementById("start").addEventListener("click", () => {
        /*needs to get input info for timer and put it into the countdown timer.
        It will also allow the cards to start being moved. Then the start button
        will become a stop button and it's function changes. 
        
        The stop button needs to stop the timer at its current position and stop
        the player from moving the cards. The button while stopped will turn back 
        to start.

        Start can't be pressed if there is no time amount for the timer.

        The start button can not reset the timer or cards.*/
    });

    document.getElementById("reset").addEventListener("click", () => {
        /*The reset button, when pressed, will randomize the cards and reset 
        the clock to have the timer ask for the input amount. It also makes the
        start button reappear if it was in motion.*/
    });
})();