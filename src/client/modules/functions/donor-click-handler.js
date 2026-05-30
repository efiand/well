import { addDragHandlers } from '#client/modules/functions/drag-drop-handler.js';

/**
 * Открытие перевёрнутой карты на стенке колодца
 *
 * @type {(event: MouseEvent) => void}
 */
export function donorClickHandler(event) {
	if (event.currentTarget instanceof HTMLElement) {
		event.currentTarget.classList.remove('card--shirt');
		event.currentTarget.removeEventListener('click', donorClickHandler);
		addDragHandlers(event.currentTarget);
	}
}
