import { dragDropHandler } from './drag-drop-handler.js';

// Удаление всех обработчиков перемещения с карты

export const removeDragHandlers = (card) => {
	card.classList.remove('card--draggable');
	card.removeEventListener('mousedown', dragDropHandler);
	card.removeEventListener('touchstart', dragDropHandler);
};
