"use strict";

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    if (callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener("click", this.start);
    this.pauseButton.addEventListener("click", this.pause);
  }

  // starts the timer
  start = () => {
    if (this.onStart) {
      this.onStart();
    }

    // setInterval waits number of miliseconds passed as a timeout argument
    // before it runs handler function, thus in order to call the tick
    // method immediately we call it manually for a first time
    this.tick();

    // and then the setInterval method will do the rest
    this.interval = setInterval(this.tick, 1000);
  };

  // pauses the timer
  pause = () => {
    clearInterval(this.interval);
  };

  // returns time left
  get timeRemaining() {
    // get time remaining from input and convert it to a number
    let timeLeft = +this.durationInput.value;

    // make sure timeLeft is >= 0
    return timeLeft < 0 ? 0 : timeLeft;
  }

  // sets time left
  set timeRemaining(value) {
    this.durationInput.value = value;
  }

  // update - called every second to update timer value (time left)
  tick = () => {
    if (this.onTick) {
      this.onTick();
    }

    this.timeRemaining--;

    if (this.timeRemaining === 0) {
      if (this.onComplete) {
        this.onComplete();
      }
      this.pause();
    }
  };
}
