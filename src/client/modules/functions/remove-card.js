import { tableElement } from "#client/modules/settings.js";
import { currentClickHandler } from "./current-click-handler.js";
import { donorClickHandler } from "./donor-click-handler.js";
import { removeDragHandlers } from "./remove-drag-handlers.js";

/**
 * Удаление карты с обработчиками
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export const removeCard = (cardElement) => {
	cardElement.removeEventListener("click", currentClickHandler);
	cardElement.removeEventListener("click", donorClickHandler);
	removeDragHandlers(cardElement);
	tableElement.removeChild(cardElement);
};
