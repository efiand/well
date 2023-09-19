import { dragDropHandler } from './drag-drop-handler.js';

// Добавление всех обработчиков перемещения на карту

export const addDragHandlers = (card) => {
	card.classList.add('card--draggable');
	card.addEventListener('mousedown', dragDropHandler);
	card.addEventListener('touchstart', dragDropHandler, { passive: false });
};
