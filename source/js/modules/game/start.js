// Поле игры
const table = document.querySelector(`.table`);

// Кнопка открытия модального окна
const rulesOpener = table.querySelector(`.table__rules-opener`);

// Кнопка сдачи карт
const reloadBtn = table.querySelector(`.card--reload`);

// Модальное окно с правилами
const rules = document.querySelector(`.rules`);

// Сообщение о выигрыше
const winMessage = rules.querySelector(`.rules__win`);

// Кнопка перезапуска
const restartBtn = rules.querySelector(`.rules__restart`);

// Кнопка закрытия правил
const closeBtn = rules.querySelector(`.rules__closer`);

// Величина отступа от края браузера до края стола
const baseLeft = (document.body.clientWidth - table.clientWidth) / 2;

// Хранилище данных о дропзонах
const dropTargetOptions = {};

// Карты в колодах
const deckComponents = [];
const suitKeys = Object.keys(STATE.suits);

// Список мастей, которые начали собирать
let cornerSuits = [];

// Число слотов в нижнем ряду для раздачи карт
let numberOfSlots = STATE.numberOfSlots;

// Счётчик пристроенных карт
let numberOfAttached = 0;

// Генерация массива карт
for (let i = 0; i < suitKeys.length; i++) {
  for (let j = 1; j < 14; j++) {
    deckComponents.push(`${suitKeys[i]}-${j.toString()}`);
  }
}

window.addEventListener(`resize`, getDropCoords);
rulesOpener.addEventListener(`click`, rulesOpenHandler);
reloadBtn.addEventListener(`click`, reloadHandler);
restartBtn.addEventListener(`click`, restartHandler);
closeBtn.addEventListener(`click`, () => {
  rules.classList.add(`hidden`);
});

// Начальное состояние
getDropCoords();
