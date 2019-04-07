// Показ сообщения о выигрыше

const showWinMessage = () => {
  winMessage.classList.remove(`hidden`);
  closeBtn.classList.add(`hidden`);
  rulesOpener.click();
};
