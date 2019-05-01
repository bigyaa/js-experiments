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
