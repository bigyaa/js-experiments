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

function reset() {
  for (index = 0; index < numOfImages; index++) {
    sliderImages[index].style.display = 'none';
  }
  left = 0;
  displayImages();
}

function previousImage() {
  //Show previous image
  if (left <= -IMAGE_WIDTH) {
    left = left + IMAGE_WIDTH;
    slider.style.left = left + 'px';
  }
}

function nextImage() {
  //Show next image
  if (left > SLIDER_MAX + IMAGE_WIDTH) {
    left = left - IMAGE_WIDTH;
    slider.style.left = left + 'px';
  }

}

function slide() {
  var interval = setInterval(function () {
    left = left + direction;
    slider.style.left = left + 'px';

    if (left < SLIDER_MAX + IMAGE_WIDTH) {
      direction = 150;
      // reset();
      // slider.style.left = left + 'px';
    }

    if (left >= 0) {
      direction = -10;
    }

    previousImage();
    nextImage();

    //Pause on each image
    if (direction === -10 && left % IMAGE_WIDTH === 0) {
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
