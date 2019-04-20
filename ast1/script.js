var sliderImages = document.getElementsByClassName('image');
var next = document.getElementById('next');
var previous = document.getElementById('previous');

var IMAGE_WIDTH = 1000;
var SLIDER_MAX = -(sliderImages.length * IMAGE_WIDTH);
var left = 0;
var direction = 0;
var indicatorNumber = 0;
var index = 0;

slider.style.width = -SLIDER_MAX + 'px';

function displayImages() {
  for (index = 0; index < sliderImages.length; index++) {
    sliderImages[index].style.display = 'block';
  }
}

function reset() {
  for (index = 0; index < sliderImages.length; index++) {
    sliderImages[index].style.display = 'none';
  }
  left = 0;
  displayImages();
}

function previousImage() {
  //Show previous image
  previous.onclick = function(event) {
    if (left <= -IMAGE_WIDTH) {
      left = left + IMAGE_WIDTH;
      slider.style.left = left + 'px';
    }
  };
}

function nextImage() {
  //Show next image
  next.onclick = function(event) {
    if (left > SLIDER_MAX + IMAGE_WIDTH) {
      left = left - IMAGE_WIDTH;
      slider.style.left = left + 'px';
    }
  };
}

function slide() {
  var interval = setInterval(function() {
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
      setTimeout(function() {
        slide();
      }, 2000);
    }
  }, 1000 / 60);
}

function createPageIndicators() {
  var container = document.getElementById('sliderContainer');

  var pageIndicators = document.createElement('div');
  pageIndicators.setAttribute('id', 'pageIndicators');
  container.appendChild(pageIndicators);

  for (
    indicatorNumber = 0;
    indicatorNumber < sliderImages.length;
    indicatorNumber++
  ) {
    var indicator = document.createElement('button');
    indicator.setAttribute('class', 'indicator-button');
    pageIndicators.appendChild(indicator);
  }
}

createPageIndicators();
slide();
