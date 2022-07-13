"use strict";

class Timer {
  constructor(durationInput, startButton, pauseButton, callbacks) {
    this.durationInput = durationInput;
    this.startButton = startButton;
    this.pauseButton = pauseButton;

    this.isWorking = false;

    this.timeout = 20; // tick timeout (in milliseconds)
    this.tickFraction = this.timeout / 1000;

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
    if (this.isWorking) {
      this.pause();
      return;
    }

    this.isWorking = true;

    if (this.onStart) {
      this.onStart(this.timeRemaining);
    }

    // setInterval waits number of miliseconds passed as a timeout argument
    // before it runs handler function, thus in order to call the tick
    // method immediately we call it manually for a first time
    this.tick();

    // and then the setInterval method will do the rest
    this.interval = setInterval(this.tick, this.timeout);
  };

  // pauses the timer
  pause = () => {
    clearInterval(this.interval);
    this.isWorking = false;
  };

  // returns time left
  get timeRemaining() {
    // get time remaining from input and convert it to a number
    //return +this.durationInput.value;
    return Number.parseFloat(this.durationInput.value);
  }

  // sets time left
  set timeRemaining(value) {
    this.durationInput.value = value.toFixed(2);
  }

  // update - called every second to update timer value (time left)
  tick = () => {
    if (this.timeRemaining <= 0) {
      this.pause();
      if (this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining -= this.tickFraction;
      if (this.onTick) {
        this.onTick(this.timeRemaining);
      }
    }
  };
}
