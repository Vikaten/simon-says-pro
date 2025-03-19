let countdown = null;
const timer =
  document.getElementById("game__timer") || document.createElement("div");

export function createTimer(onTimeUp) {
  let timeLeft = 50;
  

  if (!timer.id) {
    timer.id = "game__timer";
    timer.classList.add("game__timer");
    document.body.append(timer);
  }

  stopTimer();

  countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdown = null;
      timer.textContent = "";
      if (onTimeUp) onTimeUp();
      return;
    }
    timer.textContent = timeLeft;
    timeLeft--;
  }, 1000);
}

export function stopTimer() {
  if (countdown) {
    clearInterval(countdown);
    countdown = null;
  }
}
