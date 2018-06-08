'use strict';
(function () {
  var pageHeight = document.body.offsetHeight;

  var keyCodesToClasses = {
    80: 'pixelperfect',
    72: 'dev-grid'
  };

  /* Определение модификатора служебного блока по имени страницы */
  var path = document.location.pathname;
  var modifier = path.slice(-5) === '.html'
    ? path.slice(1, -5) : 'index';

  /* Создание оверлейного блока */
  var createOverlay = function (block) {
    var node = document.createElement('div');
    node.classList.add('.js-hidden');
    node.classList.add('dev-' + block);
    node.classList.add('dev-' + block + '--' + modifier);
    document.body.appendChild(node);
    return document.querySelector('.dev-' + block);
  };

  /* Обработчик оверлейного блока */
  var overlayToggleHandler = function (evt) {
    var block = keyCodesToClasses[evt.keyCode];
    if (block) {
      var node = document.querySelector('.dev-' + block)
        || createOverlay(block);
      node.classList.toggle('.js-hidden');
      node.style.height = document.body.offsetHeight + 'px';
    }
  };

  /* Назначение клавиш для обработчиков оверлейных блоков */
  document.addEventListener('keydown', overlayToggleHandler);
})();
