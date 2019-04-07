// Открытие модального окна с правилами
const rulesOpenHandler = (evt) => {
  evt.preventDefault();

  rules.classList.remove(`hidden`);

  if (!evt.keyCode) {
    evt.target.blur();
  }
};
