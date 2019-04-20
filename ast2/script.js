var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
const SCROLLBAR_HEIGHT = 5;
const SCROLLBAR_WIDTH = 5;
const numOfBalls = 50;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.style.height = window.innerHeight - SCROLLBAR_HEIGHT + 'px';
canvas.style.width = window.innerWidth - SCROLLBAR_WIDTH + 'px';

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

  this.getX = () => {
    return this.x;
  };

  this.getY = () => {
    return this.y;
  };

  this.getRadius = () => {
    return this.radius;
  };

  this.getRandomColor = () => {
    this.ballColor = `rgb(${this.redValue},${this.greenValue},${
      this.blueValue
    })`;

    return this.ballColor;
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

  this.detectWallCollision = () => {
    if (this.x >= canvas.width - this.radius || this.x <= this.radius) {
      this.dx = -this.dx;
    }

    if (this.y >= canvas.height - this.radius || this.y <= this.radius) {
      this.dy = -this.dy;
    }
  };
}

function getRandomX() {
  return Math.random() * (canvas.width - 2 * radius) + radius;
}

function getRandomY() {
  return Math.random() * (canvas.height - 2 * radius) + radius;
}

var circleArray = [];

// Add properties of each circle
for (let index = 0; index < numOfBalls; index++) {
  var radius = Math.random() * 100;
  var x = getRandomX();
  var y = getRandomY();
  var dx = (Math.random() - 0.5) * 10;
  var dy = (Math.random() - 0.5) * 10;

  var circle = new Circle(x, y, radius, dx, dy);

  circleArray.push(circle);
}

// Animate balls
function animateBall() {
  requestAnimationFrame(animateBall);
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (var index = 0; index < circleArray.length; index++) {
    circleArray[index].drawCircle();
    circleArray[index].moveCircle();
    circleArray[index].detectWallCollision();

    if (index < circleArray.length - 1) {
      var base = Math.abs(
        circleArray[index].getX() - circleArray[index + 1].getX()
      );
      var perpendicular = Math.abs(
        circleArray[index].getY() - circleArray[index + 1].getY()
      );
      var hypotenuse = Math.sqrt(
        Math.pow(base, 2) + Math.pow(perpendicular, 2)
      );

      if (
        hypotenuse ===
        circleArray[index].getRadius() + circleArray[index + 1].getRadius()
      ) {
        circleArray[index].reverseDx();
        circleArray[index].reverseDy();
      }
    }
  }
}

animateBall();
