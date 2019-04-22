const SCROLLBAR_WIDTH = 5;
const fgHeight = 100;
const gapBetweenPipes = 125;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 500;
canvas.style.width = 600 + 'px';
canvas.style.height = 500 + 'px';
canvas.style.marginLeft = 450 + 'px';

var bg = document.getElementById('bg');
var pipeTop = document.getElementById('pipe-top');
var pipeBottom = document.getElementById('pipe-bottom');
var bird = document.getElementById('bird');
var fg = document.getElementById('fg');
var msg = document.getElementById('msg');

// Initial bird position
var birdX = 55;
var birdY = 180;

// Action when key press event
function moveUp() {
  birdY -= 20;
}

document.addEventListener('keypress', moveUp);

var pipe = [];

pipe[0] = {
  pipeX: canvas.width,
  pipeY: -100,
};

function draw() {
  // Draw background image
  context.drawImage(bg, 0, 0, canvas.width, canvas.height);

  // Draw pipes
  for (let index = 0; index < pipe.length; index++) {
    context.drawImage(pipeTop, pipe[index].pipeX, pipe[index].pipeY);
    context.drawImage(
      pipeBottom,
      pipe[index].pipeX,
      pipe[index].pipeY + pipeTop.height + gapBetweenPipes
    );

    // Create the illusion of moving pipes
    pipe[index].pipeX--;

    // Generate new pipes after previous pipes reach certain x axis
    if (pipe[index].pipeX === canvas.width / 1.5) {
      pipe.push({
        pipeX: canvas.width,
        pipeY: Math.random() * pipeTop.height - pipeTop.height,
      });
    }

    // Check for losing conditions
    if (
      (birdX + bird.width >= pipe[index].pipeX &&
        birdX <= pipe[index].pipeX + pipeTop.width &&
        (birdY <= pipe[index].pipeY + pipeTop.height ||
          birdY + bird.height >=
            pipe[index].pipeY + pipeTop.height + gapBetweenPipes)) ||
      birdY + bird.height >= canvas.height - fg.height
    ) {
      // reload the page
      location.reload();
    }
  }

  context.drawImage(fg, 0, canvas.height - fgHeight, canvas.width, fgHeight);
  context.drawImage(bird, birdX, birdY, 50, 50);

  birdY++;

  requestAnimationFrame(draw);
}

// Main execution part
context.drawImage(msg, 0, 0, canvas.width, canvas.height);

window.addEventListener('click', event => {
  draw();
});
