import { tableElement } from "#client/modules/settings.js";
import { STATE } from "#client/modules/state.js";

// Очистка теней

export const clearShadows = () => {
	for (let i = 0; i < STATE.dropTargets.length; i++) {
		const elements = tableElement.querySelectorAll(`.card--${STATE.dropTargets[i]}`);
		for (let j = 0; j < elements.length; j++) {
			elements[j].classList.remove("card--acceptable");
		}
	}
};
