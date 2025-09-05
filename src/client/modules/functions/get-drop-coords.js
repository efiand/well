import { baseLeft, dropTargetOptions, tableElement } from "#client/modules/settings.js";
import { STATE } from "#client/modules/state.js";
import { NonNull } from "#common/utils/non-null.js";

// Вычисление координат дропзон
export const getDropCoords = () => {
	for (let i = 0; i < STATE.dropTargets.length; i++) {
		/** @type {HTMLElement} */
		const element = NonNull(tableElement.querySelector(`.card--${STATE.dropTargets[i]}`));

		dropTargetOptions[STATE.dropTargets[i]] = {
			left: baseLeft + element.offsetLeft,
			top: element.offsetTop,
		};
	}
};
