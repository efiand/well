'use strict';

(function () {
  /* Предотвращение клика для ссылок-заглушек */
  var stubLinks = document.querySelectorAll('[href="#"]');

  for (var i = 0; i < stubLinks.length; i++) {
    stubLinks[i].addEventListener('click', function (evt) {
      evt.preventDefault();
    });
  }
})();
