const SCROLLBAR_HEIGHT = 5;
const SCROLLBAR_WIDTH = 5;
const numOfCircles = 1000;
const maxRadius = 5;
const minRadius = 1;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Remove scrollbar
canvas.style.height = window.innerHeight - SCROLLBAR_HEIGHT + 'px';
canvas.style.width = window.innerWidth - SCROLLBAR_WIDTH + 'px';

var circleArray = [];

// Function Definitions

// Calculate distance between circles
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function getRandomIntBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function init() {
  for (let index = 0; index < numOfCircles; index++) {
    var radius = getRandomIntBetween(minRadius, maxRadius);
    var x = getRandomIntBetween(radius, canvas.width - radius);
    var y = getRandomIntBetween(radius, canvas.height - radius);
    var dx = (Math.random() - 0.5) * 10;
    var dy = (Math.random() - 0.5) * 10;

    // To avoid generation of overlapping circles
    if (index != 0) {
      for (let i = 0; i < circleArray.length; i++) {
        let distBetweenCentres = distance(
          x,
          y,
          circleArray[i].x,
          circleArray[i].y
        );

        if (
          (i != index) &&
          (distBetweenCentres < radius + circleArray[i].radius)
        ) {
          let updatedX = getRandomIntBetween(radius, canvas.width - radius);

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
    circle.resolveCollision(circleArray);
  });
}

// Circle Class
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;

  // Color Specifications
  this.redValue = getRandomIntBetween(0, 255);
  this.greenValue = getRandomIntBetween(0, 255);
  this.blueValue = getRandomIntBetween(0, 255);

  this.getRandomColor = () => {
    this.circleColor = `rgb(${this.redValue},${this.greenValue},${
      this.blueValue
      })`;

    return this.circleColor;
  };

  this.drawCircle = () => {
    context.beginPath();
    context.fillStyle = this.getRandomColor();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
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

  this.resolveCollision = circleArray => {
    this.resolveWallCollision();

    for (let i = 0; i < circleArray.length; i++) {
      if (
        (this != circleArray[i]) &&
        ((distance(this.x, this.y, circleArray[i].x, circleArray[i].y) <=
          this.radius + circleArray[i].radius))
      ) {
        this.dx = -this.dx;
        this.dy = -this.dy;
      }
    }
  };
}

// Main Execution Part
init();
animateCircle();
