// Перезапуск игры со сменой колоды
const restartHandler = () => {
  clearShadows();

  // Обновляем количество слотов, количество окончательно собранных карт и отсчет формирования колод
  numberOfSlots = STATE.numberOfSlots;
  numberOfAttached = 0;
  cornerSuits = [];

  // Удаляем существующую колоду со всеми обработчиками
  const existsCards = table.querySelectorAll(`[data-card]`);
  if (existsCards) {
    for (let i = 0; i < existsCards.length; i++) {
      removeCard(existsCards[i]);
    }
  }

  // Закрываем меню
  winMessage.classList.add(`hidden`);
  rules.classList.add(`hidden`);
  closeBtn.classList.remove(`hidden`);

  // Формируем новую колоду
  window.setTimeout(() => {
    createDeck();
  }, 300);

  // Меняем текст кнопки
  restartBtn.textContent = STATE.restartText;

  // Активируем кнопку расклада (на случай деактивации в предыдущем сеансе игры)
  reloadBtn.removeAttribute(`disabled`);

  // Обновляем title кнопки расклада
  reloadBtn.title = `${STATE.reloadTitle} ${numberOfSlots - 1} ${STATE.reloadPlural}`;
};
