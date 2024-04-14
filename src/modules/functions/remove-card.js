import { currentClickHandler } from './current-click-handler';
import { donorClickHandler } from './donor-click-handler';
import { removeDragHandlers } from './remove-drag-handlers';
import { table } from '../settings';

// Удаление карты с обработчиками

export const removeCard = (card) => {
	card.removeEventListener('click', currentClickHandler);
	card.removeEventListener('click', donorClickHandler);
	removeDragHandlers(card);
	table.removeChild(card);
};
