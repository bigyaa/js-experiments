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