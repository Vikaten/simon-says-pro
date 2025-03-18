export function createTimer() {
    let countdown;
    const timer = document.createElement("div");
    timer.classList.add("game__timer");
    const timerDisplay = document.getElementById("game__timer");

    function startCountdown() {
    let timeLeft = 30;

    clearInterval(countdown);

    countdown = setInterval(() => {
        if (timeLeft <= 0) {
        clearInterval(countdown);
        timerDisplay.textContent = "Время вышло!";
        return;
        }

        timerDisplay.textContent = timeLeft;
        timeLeft--;
    }, 1000);
    }
}
