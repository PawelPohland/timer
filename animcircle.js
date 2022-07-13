"use strict";

class AnimCircle {
  static clockwise = 1;
  static counterClockwise = -1;

  constructor(container, animDirection) {
    this.circle = container;
    this.totalDuration = 0;

    // get radius from svg circle element
    const radius = +container.getAttribute("r");

    // count perimeter and use it as a stroke-dasharray value
    this.perimeter = 2 * Math.PI * radius;
    this.circle.setAttribute("stroke-dasharray", this.perimeter);
    this.circle.setAttribute("stroke-dashoffset", 0);

    // animation direction (clockwise | counterclockwise)
    this.animDirection = animDirection;
  }

  reset(totalDuration) {
    this.totalDuration = totalDuration;

    this.circle.setAttribute("stroke-dasharray", this.perimeter);
    this.circle.setAttribute("stroke-dashoffset", 0);
  }

  animate(timeRemaining) {
    let offset =
      (this.perimeter * timeRemaining) / this.totalDuration - this.perimeter;
    this.circle.setAttribute("stroke-dashoffset", offset * this.animDirection);
  }
}
