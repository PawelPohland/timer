"use strict";

const durationInput = document.getElementById("timer-duration");
const startButton = document.getElementById("timer-start");
const pauseButton = document.getElementById("timer-pause");

const timer = new Timer(durationInput, startButton, pauseButton, {
  onStart() {
    console.log("Timer has started!");
  },
  onTick() {
    console.log("Timer just ticked down!");
  },
  onComplete() {
    console.log("Timer is completed!");
  },
});
