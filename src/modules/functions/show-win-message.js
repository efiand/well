import { closeBtn, rulesOpener, winMessage } from '../settings';

// Показ сообщения о выигрыше

export const showWinMessage = () => {
	winMessage.classList.remove('hidden');
	closeBtn.classList.add('hidden');
	rulesOpener.click();
};
