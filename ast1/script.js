var image = document.getElementsByClassName('image');

var IMAGE_WIDTH = 1000;
var SLIDER_MAX = -(image.length * IMAGE_WIDTH);
var left = 0;
var direction = 0;

slider.style.width = -SLIDER_MAX + 'px';

function slide() {
  var interval = setInterval(function() {
    left = left + direction;
    slider.style.left = left + 'px';

    if (left <= SLIDER_MAX + IMAGE_WIDTH) {
      direction = 150;
    } else if (left >= 0) {
      direction = -10;
    }

    if (direction === -10 && left % IMAGE_WIDTH === 0) {
      clearInterval(interval);
      setTimeout(function() {
        slide();
      }, 1000);
    }
  }, 1000 / 60);
}

slide();
