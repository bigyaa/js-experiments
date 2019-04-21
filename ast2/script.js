const SCROLLBAR_HEIGHT = 5;
const SCROLLBAR_WIDTH = 5;
const numOfCircles = 10;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.height = window.innerHeight - SCROLLBAR_HEIGHT + 'px';
canvas.style.width = window.innerWidth - SCROLLBAR_WIDTH + 'px';

var circleArray = [];

// Circle class
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.redValue = Math.random() * 255;
  this.greenValue = Math.random() * 255;
  this.blueValue = Math.random() * 255;

  this.getRandomColor = () => {
    this.CircleColor = `rgb(${this.redValue},${this.greenValue},${
      this.blueValue
    })`;

    return this.CircleColor;
  };

  this.reverseDx = () => {
    this.dx = -dx;
  };

  this.reverseDy = () => {
    this.dy = -dy;
  };

  this.drawCircle = () => {
    context.beginPath();
    // context.strokeStyle = this.getRandomColor();
    context.fillStyle = this.getRandomColor();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    // context.stroke();
    context.fill();
    context.closePath();
  };

  this.moveCircle = () => {
    this.x += this.dx;
    this.y -= this.dy;
  };

  this.resolveWallCollision = () => {
    if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
      this.dx = -this.dx;
    }

    if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
      this.dy = -this.dy;
    }
  };
}
//End of Circle class

//Calculate distance between circles
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y1, 2));
}

// Initialize  each circle
function init() {
  function getRandomX() {
    return Math.random() * (canvas.width - 2 * radius) + radius;
  }

  function getRandomY() {
    return Math.random() * (canvas.height - 2 * radius) + radius;
  }

  for (let index = 0; index < numOfCircles; index++) {
    var radius = Math.random() * 100;
    var x = getRandomX();
    var y = getRandomY();
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;
    debugger;

    if (index > 0) {
      for (let i = 0; i < circleArray.length; i++) {
        let distBetweenCentres = distance(
          x,
          y,
          circleArray[i].x,
          circleArray[i].y
        );
        if (
          (distBetweenCentres < radius + circleArray[i].radius) &
          (i != index)
        ) {
          // Increase value of x-axis of circle by the diameter of the colliding circle
          let updatedX = x + circleArray[i].radius * 2;

          if (updatedX > canvas.width - 2 * radius) {
            updatedX = x - circleArray[i].radius * 2;
          } else {
            updatedX = x + circleArray[i].radius * 2;
          }

          x = updatedX;
          i = -1;
        }
      }
    }
    circleArray.push(new Circle(x, y, radius, dx, dy));
  }
}

// Animate Circles
function animateCircle() {
  requestAnimationFrame(animateCircle);
  context.clearRect(0, 0, canvas.width, canvas.height);

  circleArray.forEach(circle => {
    circle.drawCircle();
    circle.moveCircle();
    circle.resolveWallCollision();
  });
}

init();
animateCircle();
