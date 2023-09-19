import { addDragHandlers } from './add-drag-handlers.js';

// Открытие перевёрнутой карты на стенке колодца

export const donorClickHandler = (evt) => {
	evt.currentTarget.classList.remove('card--shirt');
	evt.currentTarget.removeEventListener('click', donorClickHandler);
	addDragHandlers(evt.currentTarget);
};
