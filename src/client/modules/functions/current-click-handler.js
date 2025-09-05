import { addDragHandlers } from "#client/modules/functions/add-drag-handlers.js";
import { manageSlot } from "#client/modules/functions/manage-slot.js";
import { removeDragHandlers } from "#client/modules/functions/remove-drag-handlers.js";
import { tableElement } from "#client/modules/settings.js";
import { STATE } from "#client/modules/state.js";

const MORE_SLOTS = 2;

// Раскидывание карт в слоты

export const currentClickHandler = () => {
	/** @type {NodeListOf<HTMLElement>} */
	const runCardElements = tableElement.querySelectorAll(".card--run[data-card]");

	const count = runCardElements.length - 1;

	runCardElements[count].removeEventListener("click", currentClickHandler);
	runCardElements[count].removeAttribute("title");
	addDragHandlers(runCardElements[count]);

	const targetCurrent = count > STATE.numberOfSlots - MORE_SLOTS ? count - STATE.numberOfSlots : -1;
	if (~targetCurrent) {
		runCardElements[targetCurrent].setAttribute("title", `${STATE.willSlotsText}${STATE.numberOfSlots.toString()}`);
		runCardElements[targetCurrent].addEventListener("click", currentClickHandler);
		removeDragHandlers(runCardElements[targetCurrent]);
	}

	let j = 0;
	for (let i = count; i > targetCurrent; i--) {
		j++;
		manageSlot(runCardElements, i, j);
	}
};
