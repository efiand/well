'use strict';
(function () {
  /* Всплывающие окна */

  var popupHandler = function (popup) {
    var board = popup.querySelector('.popup__board');
    var id = popup.getAttribute('data-id');

    /*  */
    var boardResizeHandler = function () {
      if (board.offsetHeight > popup.offsetHeight) {
        board.classList.add('popup__board--overflowed');
      } else {
        board.classList.remove('popup__board--overflowed');
      }
    };

    var opener = document.querySelector('[data-open="' + id + '"]');
    opener.addEventListener('click', function () {
      popup.classList.add('popup--on');
      document.body.classList.add('.unscrolled');
      boardResizeHandler();
      window.addEventListener('resize', boardResizeHandler);
    });

    var closer = document.querySelector('[data-close="' + id + '"]');
    closer.addEventListener('click', function () {
      popup.classList.remove('popup--on');
      document.body.classList.remove('.unscrolled');
      window.removeEventListener('resize', boardResizeHandler);
    });

    /* Progressive enhancement. Превращение фрагмента в попап при загрузке, включение контролов */
    popup.classList.add('popup--modal');
    opener.classList.remove('hidden');
    closer.classList.remove('hidden');
  };

  /* Применение ко всем попапам на странице */
  var popups = document.querySelectorAll('.popup');
  for (var i = 0; i < popups.length; i++) {
    popupHandler(popups[i]);
  }
})();
