import { clearShadows } from "#client/modules/functions/clear-shadows.js";
import { createDeck } from "#client/modules/functions/create-deck.js";
import { removeCard } from "#client/modules/functions/remove-card.js";
import {
	closeButtonElement,
	reloadButttonElement,
	restartButtonElement,
	rulesElement,
	tableElement,
	winMessageElement,
} from "#client/modules/settings.js";
import { NUMBER_OF_SLOTS, STATE } from "#client/modules/state.js";

const TIMEOUT = 300;

/** Перезапуск игры со сменой колоды */
export const restartHandler = () => {
	clearShadows();

	// Обновляем количество слотов, количество окончательно собранных карт и отсчет формирования колод
	STATE.numberOfSlots = NUMBER_OF_SLOTS;
	STATE.numberOfAttached = 0;
	STATE.cornerSuits = [];

	/** @type {NodeListOf<HTMLElement>} */
	const existsCardElements = tableElement.querySelectorAll("[data-card]");
	if (existsCardElements) {
		// Удаляем существующую колоду со всеми обработчиками
		for (let i = 0; i < existsCardElements.length; i++) {
			removeCard(existsCardElements[i]);
		}
	}

	// Закрываем меню
	winMessageElement.hidden = true;
	rulesElement.hidden = true;
	closeButtonElement.hidden = false;

	// Формируем новую колоду
	window.setTimeout(() => {
		createDeck();
	}, TIMEOUT);

	// Меняем текст кнопки
	restartButtonElement.textContent = STATE.restartText;

	// Активируем кнопку расклада (на случай деактивации в предыдущем сеансе игры)
	reloadButttonElement.removeAttribute("disabled");

	// Обновляем title кнопки расклада
	reloadButttonElement.title = `${STATE.reloadTitle} ${STATE.numberOfSlots - 1} ${STATE.reloadPlural}`;
};
