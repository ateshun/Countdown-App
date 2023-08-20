const timerButtons = document.querySelectorAll(".timer__button");
const customForm = document.getElementById("custom");
const timeLeftDisplay = document.querySelector(".display__time-left");
const endTimeDisplay = document.querySelector(".display__end-time");
let countdown;

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const display = `${minutes}:${
    remainingSeconds < 10 ? "0" : ""
  }${remainingSeconds}`;
  timeLeftDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const adjustedHours = hours > 12 ? hours - 12 : hours;
  const minutes = end.getMinutes();
  endTimeDisplay.textContent = `Be Back At ${adjustedHours}:${
    minutes < 10 ? "0" : ""
  }${minutes}`;
}

timerButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  });
});

customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const minutes = parseInt(this.minutes.value);
  if (!isNaN(minutes)) {
    timer(minutes * 60);
    this.reset();
  }
});
