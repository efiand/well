// Раскидывание карт в слоты

const currentClickHandler = () => {
  const runCards = table.querySelectorAll(`.card--run[data-card]`);
  const count = runCards.length - 1;

  runCards[count].removeEventListener(`click`, currentClickHandler);
  runCards[count].removeAttribute(`title`);
  addDragHandlers(runCards[count]);

  const targetCurrent = count > numberOfSlots - 2 ? count - numberOfSlots : -1;
  if (~targetCurrent) {
    runCards[targetCurrent].setAttribute(`title`, `${STATE.willSlotsText}${numberOfSlots.toString()}`);
    runCards[targetCurrent].addEventListener(`click`, currentClickHandler);
    removeDragHandlers(runCards[targetCurrent]);
  }

  let j = 0;
  for (let i = count; i > targetCurrent; i--) {
    j++;
    manageSlot(runCards, i, j);
  }
};
