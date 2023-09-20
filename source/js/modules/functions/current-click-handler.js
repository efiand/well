import { STATE } from '../state.js';
import { addDragHandlers } from './add-drag-handlers.js';
import { manageSlot } from './manage-slot.js';
import { removeDragHandlers } from './remove-drag-handlers.js';
import { table } from '../settings.js';

const MORE_SLOTS = 2;

// Раскидывание карт в слоты

export const currentClickHandler = () => {
	const runCards = table.querySelectorAll('.card--run[data-card]');
	const count = runCards.length - 1;

	runCards[count].removeEventListener('click', currentClickHandler);
	runCards[count].removeAttribute('title');
	addDragHandlers(runCards[count]);

	const targetCurrent = count > STATE.numberOfSlots - MORE_SLOTS ? count - STATE.numberOfSlots : -1;
	if (~targetCurrent) {
		runCards[targetCurrent].setAttribute('title', `${STATE.willSlotsText}${STATE.numberOfSlots.toString()}`);
		runCards[targetCurrent].addEventListener('click', currentClickHandler);
		removeDragHandlers(runCards[targetCurrent]);
	}

	let j = 0;
	for (let i = count; i > targetCurrent; i--) {
		j++;
		manageSlot(runCards, i, j);
	}
};
