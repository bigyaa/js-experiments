var sliderImages = document.getElementsByClassName('image');
var next = document.getElementById('next');
var previous = document.getElementById('previous');

var IMAGE_WIDTH = 1000;
var numOfImages = sliderImages.length;
var SLIDER_MAX = -(numOfImages * IMAGE_WIDTH);
var left = 0;
var direction = 0;
var indicatorNumber = 0;
var index = 0;

slider.style.width = -SLIDER_MAX + 'px';

function previousImage() {
  previous.onclick = function (event) {
    if (left <= -IMAGE_WIDTH) {
      left = left + IMAGE_WIDTH;
      slider.style.left = left + 'px';
    }
  };
}

function nextImage() {
  next.onclick = function (event) {
    if (left > SLIDER_MAX + IMAGE_WIDTH) {
      left = left - IMAGE_WIDTH;
      slider.style.left = left + 'px';
    }
  };
}

function slide() {
  var interval = setInterval(function () {
    left = left + direction;
    slider.style.left = left + 'px';

    if (left <= SLIDER_MAX + IMAGE_WIDTH) {
      console.log(left);
      direction = 150;
    }

    if (left >= 0) {
      direction = -10;
    }

    previousImage();
    nextImage();

    if (left === 0) {
      previous.style.display = 'none';
    } else {
      previous.style.display = 'block';
    }

    if (left === (SLIDER_MAX + IMAGE_WIDTH)) {
      next.style.display = 'none';
    } else {
      next.style.display = 'block';
    }

    //Pause on each image
    if ((direction === -10 && left % IMAGE_WIDTH === 0) || left === SLIDER_MAX + IMAGE_WIDTH) {
      clearInterval(interval);
      setTimeout(function () {
        slide();
      }, 2000);
    }
  }, 1000 / 60);
}

function generatePageIndicators() {
  for (
    indicatorNumber = 0;
    indicatorNumber < numOfImages;
    indicatorNumber++
  ) {
    var indicator = document.createElement('button');
    indicator.setAttribute('class', 'indicator-button');
    pageIndicators.appendChild(indicator);
  }
}

generatePageIndicators();
slide();
