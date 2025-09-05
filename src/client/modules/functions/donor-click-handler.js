import { addDragHandlers } from "#client/modules/functions/add-drag-handlers.js";

/**
 * Открытие перевёрнутой карты на стенке колодца
 *
 * @type {(event: MouseEvent) => void}
 */
export const donorClickHandler = (event) => {
	if (event.currentTarget instanceof HTMLElement) {
		event.currentTarget.classList.remove("card--shirt");
		event.currentTarget.removeEventListener("click", donorClickHandler);
		addDragHandlers(event.currentTarget);
	}
};
