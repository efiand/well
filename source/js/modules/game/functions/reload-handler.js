// Расклад левой нижней кнопкой

const reloadHandler = () => {
  for (let i = 1; i <= numberOfSlots; i++) {
    const targetClass = `card--work-${i}`;
    const buttons = table.querySelectorAll(`.${targetClass}:not(.card--empty)`);
    for (let j = 0; j < buttons.length; j++) {
      buttons[j].classList.remove(targetClass);
      buttons[j].classList.add(`card--run`);
      buttons[j].classList.add(`card--shirt`);
      table.appendChild(buttons[j]);
    }
  }

  if (numberOfSlots > 1) {
    numberOfSlots--;
    reloadBtn.title = `${STATE.reloadTitle} ${numberOfSlots - 1} ${STATE.reloadPlural}`;
  }

  if (numberOfSlots <= 2) {
    reloadBtn.title = `${STATE.reloadTitle} 1 ${STATE.reloadSingular}`;
  }

  table.lastChild.addEventListener(`click`, currentClickHandler);
  currentClickHandler();
};
