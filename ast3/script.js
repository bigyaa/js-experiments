const SCROLLBAR_WIDTH = 5;
const foregroundHeight = 100;
const gapBetweenPipes = 110;
const GRAVITY = 2.5;

var background = document.getElementById('background');
var pipeTop = document.getElementById('topPipe');
var pipeBottom = document.getElementById('bottomPipe');
var birdImage = document.getElementById('birdImage');
var foreground = document.getElementById('foreground');
var openingMessage = document.getElementById('openingMessage');

var audioFly = new Audio();
var audioScore = new Audio();

var context;
var pipe;
var flappyBird;

audioFly.src = "sounds/fly.mp3";
audioScore.src = "sounds/score.mp3";


class Bird {
  constructor(birdX = 5, birdY = 180) {
    this.birdX = birdX;
    this.birdY = birdY;
    this.score = 0;
  }

  drawBird() {
    context.drawImage(birdImage, this.birdX, this.birdY);
  }

  increaseScore() {
    this.score += 1;
    audioScore.play();
  }
}


class Pipe {
  constructor(pipeX = canvas.width, pipeY = -5) {
    this.pipeX = pipeX;
    this.pipeY = pipeY;
  }

  drawPipe() {
    context.drawImage(pipeTop, this.pipeX, this.pipeY);
    context.drawImage(
      pipeBottom,
      this.pipeX,
      this.pipeY + pipeTop.height + gapBetweenPipes
    );
  }

  movePipe() {
    this.pipeX -= 2;
  }
}


class Game {
  constructor(canvas) {
    this.canvas = canvas;
  }

  start() {
    context = this.canvas.getContext('2d');

    this.canvas.width = 600;
    this.canvas.height = 450;
    this.canvas.style.width = 600 + 'px';
    this.canvas.style.height = 450 + 'px';
    this.canvas.style.border = 1 + 'px' + ' solid black';

    flappyBird = new Bird();
    pipe = [new Pipe()];

    context.drawImage(openingMessage, 20, 20, this.canvas.width - 40, this.canvas.height - 40);

    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 32) {
        flappyBird.birdY = flappyBird.birdY - 55;
        audioFly.play();
      }
    });

    this.canvas.addEventListener('click', () => {
      this.draw();
    });
  }

  draw() {
    // Draw background image
    context.drawImage(background, 0, 0, canvas.width, canvas.height);
    flappyBird.drawBird();

    // Draw pipes
    for (let index = 0; index < pipe.length; index++) {
      pipe[index].drawPipe();

      // Create the illusion of moving pipes
      pipe[index].movePipe();

      // Generate new pipes after previous pipes reach certain x axis
      if (pipe[index].pipeX === Math.floor(canvas.width / 1.75)) {
        pipe.push(new Pipe(canvas.width, Math.floor(Math.random() * pipeTop.height) - pipeTop.height));
      }

      // Check for losing and scoring conditions
      if (
        (this.birdReachesStartingPipeX(index) && this.birdReachesEndingPipeX(index) && (this.birdFliesAboveGap(index) ||
          this.birdFliesBelowGap(index))) || this.birdFliesBelowForeground(index)) {
        location.reload();
      }

      // if (this.pipeX + pipeTop.width === flappyBird.birdX) {
      if (this.birdReachesStartingPipeX(index) && this.birdReachesEndingPipeX(index) && !this.birdFliesAboveGap(index) &&
        !this.birdFliesBelowGap(index)) {
        flappyBird.increaseScore();
        audioScore.play();

      }
    }
    context.drawImage(foreground, 0, canvas.height - foregroundHeight, canvas.width, foregroundHeight);

    flappyBird.birdY += GRAVITY;

    context.fillStyle = "#FFF";
    context.font = "20px Arial";
    context.fillText("Score : " + flappyBird.score / 26, 10, canvas.height - 20);

    requestAnimationFrame(() => { this.draw() });
  }

  // Collision Conditions
  birdReachesStartingPipeX(index) {
    return (flappyBird.birdX + birdImage.width >= pipe[index].pipeX) ? true : false;
  }

  birdReachesEndingPipeX(index) {
    return (flappyBird.birdX + birdImage.width <= pipe[index].pipeX + pipeTop.width) ? true : false;
  }

  birdFliesAboveGap(index) {
    return (flappyBird.birdY <= pipe[index].pipeY + pipeTop.height) ? true : false;
  }

  birdFliesBelowGap(index) {
    return (flappyBird.birdY + birdImage.height >= pipe[index].pipeY + pipeTop.height + gapBetweenPipes) ? true : false;
  }

  birdFliesBelowForeground() {
    return (flappyBird.birdY + birdImage.height >= canvas.height - foreground.height) ? true : false;
  }
}

var game = new Game(document.getElementById('canvas'));
game.start();

