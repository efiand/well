// Открытие перевёрнутой карты на стенке колодца

const donorClickHandler = (evt) => {
  evt.currentTarget.classList.remove(`card--shirt`);
  evt.currentTarget.removeEventListener(`click`, donorClickHandler);
  addDragHandlers(evt.currentTarget);
};
