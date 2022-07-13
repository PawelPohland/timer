"use strict";

const durationInput = document.getElementById("timer-duration");
const startButton = document.getElementById("timer-start");
const pauseButton = document.getElementById("timer-pause");

const circle = document.querySelector("#timer-svg circle");
const animCircle = new AnimCircle(circle, AnimCircle.clockwise);

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart(totalDuration) {
    console.log("Timer has started!");
    animCircle.reset(totalDuration);
  },
  onTick(timeRemaining) {
    animCircle.animate(timeRemaining);
  },
  onComplete() {
    console.log("Timer is completed!");
  },
});
