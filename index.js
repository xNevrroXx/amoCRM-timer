const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let activeTimerId;


if (!(inputEl instanceof HTMLInputElement)) {
  throw new Error("const inputEl is not HTMLInputElement");
}

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  return (seconds) => {
    updateTime(seconds);
    var interval = 1000;
    var expectedTime = Date.now() + interval;
    var remaining = seconds;
    
    clearTimeout(activeTimerId);
    activeTimerId = setTimeout(scheduleTimeout, interval);
    
    function scheduleTimeout() {
      var delta = Date.now() - expectedTime;
      remaining -= (interval - delta) / 1000;
      console.log("remaining: ", remaining);

      if (remaining > 0) {
        expectedTime += interval;
        activeTimerId = setTimeout(scheduleTimeout, Math.max(4, interval - delta)); 
      }

      if (remaining >= 0) {
        updateTime(remaining);
      }
    }
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  // Очистите input так, чтобы в значении
  // оставались только числа
  const value = inputEl.value;
  inputEl.value = value.replace(/\D/g, "");
}); 

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});



// utilits
function updateTime (seconds) {
  const computedTime = getTimeFromSeconds(seconds);
  setTimeOnPage(computedTime);
  return computedTime;
}
function getTimeFromSeconds (amountSeconds) {
  const hours = Math.floor(amountSeconds / 3600);
  const minutes = Math.floor((amountSeconds - hours * 3600) / 60);
  const seconds = Math.floor((amountSeconds - hours * 3600 - minutes * 60));

  return {hours, minutes, seconds};
} 
function setTimeOnPage ({hours, minutes, seconds}) {
  timerEl.textContent = normalizeNumber(hours) + ":" + normalizeNumber(minutes) + ":" + normalizeNumber(seconds);
}
function normalizeNumber (number) {
  return number >= 10 ? number + "" : "0" + number;
}