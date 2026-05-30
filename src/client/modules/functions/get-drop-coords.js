import { baseLeft, dropTargetOptions, tableElement } from '#client/modules/settings.js';
import { STATE } from '#client/modules/state.js';

/** Вычисление координат дропзон */
export function getDropCoords() {
	for (let i = 0; i < STATE.dropTargets.length; i++) {
		const element = /** @type {HTMLElement} */ (tableElement.querySelector(`.card--${STATE.dropTargets[i]}`));

		dropTargetOptions[STATE.dropTargets[i]] = {
			left: baseLeft + element.offsetLeft,
			top: element.offsetTop,
		};
	}
}
