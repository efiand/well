import { dragDropHandler } from "#client/modules/functions/drag-drop-handler.js";

/**
 * Удаление всех обработчиков перемещения с карты
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export const removeDragHandlers = (cardElement) => {
	cardElement.classList.remove("card--draggable");
	cardElement.removeEventListener("mousedown", dragDropHandler);
	cardElement.removeEventListener("touchstart", dragDropHandler);
};
