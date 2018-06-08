'use strict';

(function () {
  /* Вывод ошибок запроса */
  var errorHandler = function (error) {
    var errorNode = document.querySelector('.js-error');
    errorNode.querySelector('.js-error__message').textContent = error;
    errorNode.classList.remove('js-hidden');
  };

  /* Запрос к серверу */
  window.xhrListener = function (loadHandler, URL, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          loadHandler(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 403:
          error = 'Доступ запрещён!';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        case 500:
          error = 'Ошибка сервера';
          break;
        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        errorHandler(error);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open(data ? 'POST' : 'GET', URL);
    xhr.send(data || null);
  };
})();
