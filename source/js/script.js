import { closeBtn, deckComponents, reloadBtn, restartBtn, rules, rulesOpener } from './modules/settings.js';
import { STATE } from './modules/state.js';
import { getDropCoords } from './modules/functions/get-drop-coords.js';
import { reloadHandler } from './modules/functions/reload-handler.js';
import { restartHandler } from './modules/functions/restart-handler.js';
import { rulesOpenHandler } from './modules/functions/rules-open-handler.js';

const CARDS_IN_KEYS = 14;

// Генерация массива карт
const suitKeys = Object.keys(STATE.suits);
for (let i = 0; i < suitKeys.length; i++) {
	for (let j = 1; j < CARDS_IN_KEYS; j++) {
		deckComponents.push(`${suitKeys[i]}-${j.toString()}`);
	}
}

window.addEventListener('resize', getDropCoords);
rulesOpener.addEventListener('click', rulesOpenHandler);
reloadBtn.addEventListener('click', reloadHandler);
restartBtn.addEventListener('click', restartHandler);
closeBtn.addEventListener('click', () => {
	rules.classList.add('hidden');
});

// Начальное состояние
getDropCoords();
