import { NUMBER_OF_SLOTS, STATE } from '../state.js';
import { closeBtn, reloadBtn, restartBtn, rules, table, winMessage } from '../settings.js';
import { createDeck } from './create-deck.js';
import { clearShadows } from './clear-shadows.js';
import { removeCard } from './remove-card.js';

const TIMEOUT = 300;

// Перезапуск игры со сменой колоды
export const restartHandler = () => {
	clearShadows();

	// Обновляем количество слотов, количество окончательно собранных карт и отсчет формирования колод
	STATE.numberOfSlots = NUMBER_OF_SLOTS;
	STATE.numberOfAttached = 0;
	STATE.cornerSuits = [];

	// Удаляем существующую колоду со всеми обработчиками
	const existsCards = table.querySelectorAll('[data-card]');
	if (existsCards) {
		for (let i = 0; i < existsCards.length; i++) {
			removeCard(existsCards[i]);
		}
	}

	// Закрываем меню
	winMessage.classList.add('hidden');
	rules.classList.add('hidden');
	closeBtn.classList.remove('hidden');

	// Формируем новую колоду
	window.setTimeout(() => {
		createDeck();
	}, TIMEOUT);

	// Меняем текст кнопки
	restartBtn.textContent = STATE.restartText;

	// Активируем кнопку расклада (на случай деактивации в предыдущем сеансе игры)
	reloadBtn.removeAttribute('disabled');

	// Обновляем title кнопки расклада
	reloadBtn.title = `${STATE.reloadTitle} ${STATE.numberOfSlots - 1} ${STATE.reloadPlural}`;
};
