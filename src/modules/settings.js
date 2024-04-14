const HALF = 2;

// Поле игры
export const table = document.querySelector('.table');

// Модальное окно с правилами
export const rules = document.querySelector('.rules');

// Кнопка закрытия правил
export const closeBtn = rules.querySelector('.rules__closer');

// Величина отступа от края браузера до края стола
export const baseLeft = (document.body.clientWidth - table.clientWidth) / HALF;

// Карты в колодах
export const deckComponents = [];

// Хранилище данных о дропзонах
export const dropTargetOptions = {};

// Кнопка сдачи карт
export const reloadBtn = table.querySelector('.card--reload');

// Кнопка перезапуска
export const restartBtn = rules.querySelector('.rules__restart');

// Кнопка открытия модального окна
export const rulesOpener = table.querySelector('.table__rules-opener');

// Сообщение о выигрыше
export const winMessage = rules.querySelector('.rules__win');
