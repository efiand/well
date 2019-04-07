// Удаление карты с обработчиками

const removeCard = (card) => {
  card.removeEventListener(`click`, currentClickHandler);
  card.removeEventListener(`click`, donorClickHandler);
  removeDragHandlers(card);
  table.removeChild(card);
};
