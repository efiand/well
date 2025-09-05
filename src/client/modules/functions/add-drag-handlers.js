import { dragDropHandler } from "#client/modules/functions/drag-drop-handler.js";

/**
 * Добавление всех обработчиков перемещения на карту
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export const addDragHandlers = (cardElement) => {
	cardElement.classList.add("card--draggable");
	cardElement.addEventListener("mousedown", dragDropHandler);
	cardElement.addEventListener("touchstart", dragDropHandler, { passive: false });
};
