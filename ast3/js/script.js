const SCROLLBAR_WIDTH = 5;
const foregroundHeight = 100;
const gapBetweenPipes = 110;
const GRAVITY = 2.5;

var openingMessage = document.getElementById('openingMessage');
var background = document.getElementById('background');
var pipeTop = document.getElementById('topPipe');
var pipeBottom = document.getElementById('bottomPipe');
var birdImage = document.getElementById('birdImage');
var foreground = document.getElementById('foreground');

var audioFly = new Audio();
var audioScore = new Audio();
var audioDie = new Audio();

var context;
var pipe;
var flappyBird;

audioFly.src = "sounds/fly.mp3";
audioScore.src = "sounds/score.mp3";
audioDie.src = "sounds/die.mp3";

var game = new Game(document.getElementById('canvas'));
game.start();

