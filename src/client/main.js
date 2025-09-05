import { getDropCoords } from "#client/modules/functions/get-drop-coords.js";
import { reloadHandler } from "#client/modules/functions/reload-handler.js";
import { restartHandler } from "#client/modules/functions/restart-handler.js";
import { rulesOpenHandler } from "#client/modules/functions/rules-open-handler.js";
import {
	closeButtonElement,
	deckComponents,
	reloadButttonElement,
	restartButtonElement,
	rulesElement,
	rulesOpenerElement,
} from "#client/modules/settings.js";
import { STATE } from "#client/modules/state.js";
import "#client/modules/tg";

const CARDS_IN_KEYS = 14;

// Генерация массива карт
const suitKeys = Object.keys(STATE.suits);
for (let i = 0; i < suitKeys.length; i++) {
	for (let j = 1; j < CARDS_IN_KEYS; j++) {
		deckComponents.push(`${suitKeys[i]}-${j.toString()}`);
	}
}

window.addEventListener("resize", getDropCoords);
rulesOpenerElement.addEventListener("click", rulesOpenHandler);
reloadButttonElement.addEventListener("click", reloadHandler);
restartButtonElement.addEventListener("click", restartHandler);
closeButtonElement.addEventListener("click", () => {
	rulesElement.hidden = true;
});

// Начальное состояние
getDropCoords();
