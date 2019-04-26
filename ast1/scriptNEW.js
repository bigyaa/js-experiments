const imageWidth = 1000;

var sliderImages = document.getElementsByClassName('image');
var next = document.getElementById('next');
var previous = document.getElementById('previous');

var numOfImages = sliderImages.length;
var maxSliderWidth = numOfImages * imageWidth;
var left = 0;
var currentIndex = 1;
var currentImage = [];

class Slider {
  indicate() {
    if (currentIndex > numOfImages) {
      currentIndex = 1;
    }
  }

  nextImage() {
    // currentIndex++;
    sliderImages.style.left = -(currentIndex * imageWidth);
  }

  // prevImage() {
  //   currentIndex--;
  //   // left = -
  // }
}

next.addEventListener('click', function () {
  currentIndex++;

  if (currentIndex >= numOfImages) {
    currentIndex = 0;
  }

  nextImage();
});

previous.addEventListener('click', function () {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = numOfImages - 1;
  }

  nextImage();
});

