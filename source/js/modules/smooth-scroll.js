'use strict';

(function () {
  /* Плавный сколлинг */
  var SPEED = 1;
  var innerLinks = document.querySelectorAll('a[href^="#"]');
  for (var i = 0; i < innerLinks; i++) {
    innerLinks[i].addEventListener('click', function () {

      var offset = window.pageYOffset;
      var hash = innerLinks[i].href.replace(/[^#]*(.*)/, '$1');
      var distance = document.querySelector(hash)
        .getBoundingClientRect().top;

      var start = null;
      var step = function (time) {
        start = start || time;
        var progress = time - start;
        var scrollPos = distance < 0
          ? Math.max(offset - progress / SPEED, offset + distance)
          : Math.min(offset + progress / SPEED, offset + distance);

        window.scrollTo(0, scrollPos);
        if (scrollPos !== offset + distance) {
          requestAnimationFrame(step);
        } else {
          location.hash = hash;
        }
      };

      requestAnimationFrame(step);
    });
  }
})();
