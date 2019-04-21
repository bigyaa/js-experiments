const SCROLLBAR_HEIGHT = 5;
const SCROLLBAR_WIDTH = 5;
const numOfCircles = 50;
const maxRadius = 100;
const minRadius = 10;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Remove scrollbar
canvas.style.height = window.innerHeight - SCROLLBAR_HEIGHT + 'px';
canvas.style.width = window.innerWidth - SCROLLBAR_WIDTH + 'px';

var circleArray = [];

function rotate(dx, dy, angle) {
  const rotatedVelocities = {
    x: dx * Math.cos(angle) - dy * Math.sin(angle),
    y: dx * Math.sin(angle) + dy * Math.cos(angle),
  };

  return rotatedVelocities;
}

// Use of collision formula
function resolveCircleCollision(circle, otherCircle) {
  const xVelocityDiff = circle.dx - otherCircle.dx;
  const yVelocityDiff = circle.dy - otherCircle.dy;

  const xDist = otherCircle.x - circle.x;
  const yDist = otherCircle.y - circle.y;

  // Prevent accidental overlap of circles
  if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
    // Grab angle between the two colliding circles, tan(angle) = perpendicular / base
    const angle = -Math.atan2(
      otherCircle.y - circle.y,
      otherCircle.x - circle.x
    );

    // Store mass in var for better readability in collision equation
    const m1 = circle.mass;
    const m2 = otherCircle.mass;

    // Velocity before equation
    const u1 = rotate(circle.dx, circle.dy, angle);
    const u2 = rotate(otherCircle.dx, otherCircle.dy, angle);

    // Velocity after 1d collision equation
    const v1 = {
      x: (u1.x * (m1 - m2)) / (m1 + m2) + (u2.x * 2 * m2) / (m1 + m2),
      y: u1.y,
    };
    const v2 = {
      x: (u2.x * (m1 - m2)) / (m1 + m2) + (u1.x * 2 * m2) / (m1 + m2),
      y: u2.y,
    };

    // Final velocity after rotating axis back to original location
    const vFinal1 = rotate(v1.x, v1.y, -angle);
    const vFinal2 = rotate(v2.x, v2.y, -angle);

    // Swap circle velocities for realistic bounce effect
    circle.dx = vFinal1.x;
    circle.dy = vFinal1.y;

    otherCircle.dx = vFinal2.x;
    otherCircle.dy = vFinal2.y;
  }
}

// Circle class
function Circle(x, y, radius, dx, dy) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.mass = 1;

  // Color specifications
  this.redValue = getRandomIntBetween(0, 255);
  this.greenValue = getRandomIntBetween(0, 255);
  this.blueValue = getRandomIntBetween(0, 255);

  this.getRandomColor = () => {
    this.CircleColor = `rgb(${this.redValue},${this.greenValue},${
      this.blueValue
    })`;

    return this.CircleColor;
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
        (this != circleArray[i]) &
        (distance(this.x, this.y, circleArray[i].x, circleArray[i].y) <=
          this.radius + circleArray[i].radius)
      ) {
        resolveCircleCollision(this, circleArray[i]);
      }
    }
  };
}
//End of Circle class

//Calculate distance between circles
function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y1, 2));
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
          (i != index) &
          (distBetweenCentres < radius + circleArray[i].radius)
        ) {
          // Increase value of x-axis of circle by the diameter of the colliding circle
          let updatedX = x + circleArray[i].radius * 2;

          /* if (updatedX > canvas.width - (radius + circleArray[i].radius)) {
            updatedX = x - circleArray[i].radius * 2;
          }
          else {
            updatedX = x + circleArray[i].radius * 2;
          } */

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

init();
animateCircle();
