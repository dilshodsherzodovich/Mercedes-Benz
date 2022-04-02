function date() {
  const deadline = "2022-04-30";
  function getTime(endTime) {
    const total = Date.parse(endTime) - Date.parse(new Date()),
      day = Math.floor(total / 1000 / 3600 / 24),
      hours = Math.floor((total / 1000 / 3600) % 24),
      minutes = Math.floor(
        (total - day * 24 * 3600 * 1000 - hours * 3600 * 1000) / 1000 / 60
      ),
      seconds = Math.floor(
        (total -
          day * 24 * 3600 * 1000 -
          hours * 3600 * 1000 -
          minutes * 60 * 1000) /
          1000
      );

    return {
      hours: hours,
      days: day,
      seconds: seconds,
      minutes: minutes,
    };
  }

  function setClock(selector, endTime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);
    updateClock();

    function getZero(number) {
      if (number > 0 && number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    }

    function updateClock() {
      const time = getTime(endTime);
      days.innerHTML = getZero(time.days);
      hours.innerHTML = getZero(time.hours);
      minutes.innerHTML = getZero(time.minutes);
      seconds.innerHTML = getZero(time.seconds);
      if (time.total == 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);
}

export default date;
