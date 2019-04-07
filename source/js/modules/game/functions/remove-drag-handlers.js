// Удаление всех обработчиков перемещения с карты

const removeDragHandlers = (card) => {
  card.classList.remove(`card--draggable`);
  card.removeEventListener(`mousedown`, dragDropHandler);
  card.removeEventListener(`touchstart`, dragDropHandler);
};
