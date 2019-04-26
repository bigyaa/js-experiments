const SCROLLBAR_WIDTH = 5;
const fgHeight = 100;
const gapBetweenPipes = 125;
const GRAVITY = 2.5;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 500;
canvas.style.width = 600 + 'px';
canvas.style.height = 500 + 'px';
canvas.style.border = 1 + 'px' + ' solid black';
canvas.style.transform = 'translate(' + 70 + '%' + ',' + 0 + '%)';

var bg = document.getElementById('bg');
var pipeTop = document.getElementById('topPipe');
var pipeBottom = document.getElementById('bottomPipe');
var bird = document.getElementById('bird');
var fg = document.getElementById('fg');
var msg = document.getElementById('msg');

var audioFly = new Audio();
var audioScore = new Audio();

var score = 0;
let index;

audioFly.src = "sounds/fly.mp3";
audioScore.src = "sounds/score.mp3";

// Initial bird position
var birdX = 55;
var birdY = 180;

// Action when key press event
function moveUp() {
  birdY -= 55;
  audioFly.play();
}

var pipe = [];

pipe[0] = {
  pipeX: canvas.width,
  pipeY: -50,
};

// Check Conditions
function birdReachesStartingPipeX(index) {
  if (birdX + bird.width >= pipe[index].pipeX) { return true; } else { return false; }
}

function birdReachesEndingPipeX(index) {
  if (birdX + bird.width <= pipe[index].pipeX + pipeTop.width) { return true; } else { return false; }
}

function birdFliesAboveGap(index) {
  if (birdY <= pipe[index].pipeY + pipeTop.height) { return true; } else { return false; }
}

function birdFliesBelowGap(index) {
  if (birdY + bird.height >= pipe[index].pipeY + pipeTop.height + gapBetweenPipes) { return true; } else { return false; }
}

function birdFliesBelowForeground(index) {
  if (birdY + bird.height >= canvas.height - fg.height) { return true; } else { return false; }
}

function draw() {
  // Draw background image
  context.drawImage(bg, 0, 0, canvas.width, canvas.height);
  document.addEventListener('keypress', moveUp);

  // Draw pipes
  for (index = 0; index < pipe.length; index++) {
    context.drawImage(pipeTop, pipe[index].pipeX, pipe[index].pipeY);
    context.drawImage(
      pipeBottom,
      pipe[index].pipeX,
      pipe[index].pipeY + pipeTop.height + gapBetweenPipes
    );

    // Create the illusion of moving pipes
    pipe[index].pipeX -= 2;

    // Generate new pipes after previous pipes reach certain x axis
    if (pipe[index].pipeX === Math.floor(canvas.width / 1.75)) {
      pipe.push({
        pipeX: canvas.width,
        pipeY: Math.random() * pipeTop.height - pipeTop.height,
      });
    }

    // Check for losing and scoring conditions
    if (
      (birdReachesStartingPipeX(index) && birdReachesEndingPipeX(index) && (birdFliesAboveGap(index) ||
        birdFliesBelowGap(index))) || birdFliesBelowForeground(index)) {
      location.reload();
    } else if (birdReachesStartingPipeX(index) && birdReachesEndingPipeX(index) && !birdFliesAboveGap(index) && !birdFliesBelowGap(index)) {
      score++;
      audioScore.play();
    }

  }

  context.drawImage(bird, birdX, birdY, 50, 50);
  context.drawImage(fg, 0, canvas.height - fgHeight, canvas.width, fgHeight);

  birdY += GRAVITY;

  context.fillStyle = "#FFF";
  context.font = "20px Verdana";
  context.fillText("Score : " + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

// Main execution part
context.drawImage(msg, 20, 20, canvas.width - 40, canvas.height - 40);

window.addEventListener('click', event => {
  draw();
});
