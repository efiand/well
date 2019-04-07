// Добавление всех обработчиков перемещения на карту

const addDragHandlers = (card) => {
  card.classList.add(`card--draggable`);
  card.addEventListener(`mousedown`, dragDropHandler);
  card.addEventListener(`touchstart`, dragDropHandler, { passive: false });
};
