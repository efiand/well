import { currentClickHandler } from './current-click-handler.js';
import { donorClickHandler } from './donor-click-handler.js';
import { removeDragHandlers } from './remove-drag-handlers.js';
import { table } from '../settings.js';

// Удаление карты с обработчиками

export const removeCard = (card) => {
	card.removeEventListener('click', currentClickHandler);
	card.removeEventListener('click', donorClickHandler);
	removeDragHandlers(card);
	table.removeChild(card);
};
