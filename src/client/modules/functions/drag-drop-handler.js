import { clearShadows } from "#client/modules/functions/clear-shadows.js";
import { removeDragHandlers } from "#client/modules/functions/remove-drag-handlers.js";
import { showWinMessage } from "#client/modules/functions/show-win-message.js";
import { baseLeft, dropTargetOptions, reloadButttonElement, tableElement } from "#client/modules/settings.js";
import { MAX_ATTACHED, STATE } from "#client/modules/state.js";
import { NonNull } from "#common/utils/non-null.js";

const THIRTEENTH_CARD = 13;
const CONTROLS_COUNT = 8;

class Coords {
	/**
	 * @param {number} x - Координата по оси X
	 * @param {number} y - Координата по оси Y
	 */
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

/**
 * Перемещение карты
 *
 * @type {(event: MouseEvent | TouchEvent) => void}
 */
export function dragDropHandler(event) {
	event.preventDefault();

	const cardElement = /** @type {HTMLElement} */ (NonNull(event.currentTarget));

	// @ts-expect-error
	const startCoordsBase = event.changedTouches?.[0] || event;
	const startCoords = new Coords(startCoordsBase.clientX, startCoordsBase.clientY);

	const [dataCardType, dataCardIndex] = NonNull(cardElement.getAttribute("data-card")).split("-");
	const startLeft = cardElement.style.left;
	const startTop = cardElement.style.top;

	/** @type {HTMLElement | null} */
	let targetElement = null;

	/** @type {string | null} */
	let newDataAccept = null;

	let isCorner = false;
	let isTrueAccept = false;

	tableElement.appendChild(cardElement);

	// Тень
	cardElement.classList.add("card--pulled");

	// Добавление обработчиков перемещения мышью либо тачем
	//@ts-expect-error
	if (event.changedTouches?.[0]) {
		document.addEventListener("touchmove", moveHandler, { passive: false });
		document.addEventListener("touchend", upHandler, { passive: false });
	} else {
		document.addEventListener("mousemove", moveHandler);
		document.addEventListener("mouseup", upHandler);
	}

	/** @type {(moveEvent: MouseEvent | TouchEvent) => void} */
	function moveHandler(moveEvent) {
		moveEvent.preventDefault();

		// @ts-expect-error
		const coordBase = moveEvent.changedTouches?.[0] || moveEvent;
		const x = coordBase.clientX;
		const y = coordBase.clientY;

		isTrueAccept = false;
		const diffCoords = new Coords(startCoords.x - x, startCoords.y - y);

		startCoords.x = x;
		startCoords.y = y;

		const currentLeft = cardElement.offsetLeft - diffCoords.x;
		const currentTop = cardElement.offsetTop - diffCoords.y;

		cardElement.style.left = `${currentLeft}px`;
		cardElement.style.top = `${currentTop}px`;

		clearShadows();

		// Поиск доступного слота
		const targetClass = STATE.dropTargets.filter(
			(item) =>
				Math.abs(currentLeft + baseLeft - dropTargetOptions[item].left) < cardElement.clientWidth &&
				Math.abs(currentTop - dropTargetOptions[item].top) < cardElement.clientHeight,
		)[0];

		// Если карта пролетает над целевой ячейкой
		if (targetClass) {
			/** @type {NodeListOf<HTMLElement>} */
			const targetElements = tableElement.querySelectorAll(`.card--${targetClass}`);
			targetElement = targetElements[targetElements.length - 1];

			const [dataAcceptType, dataAcceptIndex] = (targetElement.getAttribute("data-accept") || "any-0").split("-");

			/** Проверка слота-акцептора по масти */
			const isTrueSuit = dataAcceptType === "any" || dataAcceptType === dataCardType;

			// Разница между стоимостью карт и проверка по стоимости
			const cardValue = parseInt(dataCardIndex, 10);
			const acceptValue = parseInt(dataAcceptIndex, 10);
			const valueDiff = cardValue - acceptValue;
			let isTrueValue = !acceptValue || !valueDiff;

			// Другие условия по стоимости для углового слота
			isCorner = targetElement.className.indexOf("corner") > -1;
			if (isCorner) {
				isTrueValue = !valueDiff;

				// Если раскладка масти в углу началась, слот недоступен для этой масти
				if (
					dataAcceptType === "any" &&
					dataAcceptIndex === `${THIRTEENTH_CARD}` &&
					STATE.cornerSuits.indexOf(dataCardType) > -1
				) {
					isTrueValue = false;
				}
			}

			// Итоговое условие доступности слота
			if (isTrueSuit && isTrueValue) {
				isTrueAccept = true;
				targetElement.classList.add("card--acceptable");

				// Формулировка требований для следующей карты
				let newAcceptValue = cardValue !== THIRTEENTH_CARD ? cardValue + 1 : 1;
				if (isCorner) {
					newAcceptValue = cardValue !== 1 ? cardValue - 1 : THIRTEENTH_CARD;
				}
				newDataAccept = `${dataCardType}-${newAcceptValue.toString()}`;
			}
		}
	}

	/** @type {(upEvent: MouseEvent | TouchEvent) => void} */
	function upHandler(upEvent) {
		upEvent.preventDefault();

		document.removeEventListener("mousemove", moveHandler);
		document.removeEventListener("touchmove", moveHandler);
		document.removeEventListener("mouseup", upHandler);
		document.removeEventListener("touchend", upHandler);

		// Если карта отпущена над целевой ячейкой
		if (isTrueAccept && targetElement) {
			cardElement.style.left = targetElement.style.left;
			cardElement.style.top = targetElement.style.top;
			cardElement.className = targetElement.className;
			cardElement.classList.remove("card--empty");
			cardElement.classList.remove("card--acceptable");
			if (cardElement.className.indexOf("corner") > -1) {
				STATE.numberOfAttached++;
				removeDragHandlers(cardElement);
				if (STATE.cornerSuits.indexOf(dataCardType) === -1) {
					STATE.cornerSuits.push(dataCardType);
				}
			} else {
				cardElement.classList.add("card--draggable");
			}
			if (STATE.numberOfAttached === MAX_ATTACHED) {
				showWinMessage();
			}
			if (newDataAccept) {
				cardElement.setAttribute("data-accept", newDataAccept);
			}
			if (targetElement === cardElement) {
				cardElement.style.left = startLeft;
				cardElement.style.top = startTop;
			}
		} else {
			cardElement.style.left = startLeft;
			cardElement.style.top = startTop;
		}

		// Удаляем тень
		cardElement.classList.remove("card--pulled");

		// Если в раскладе пусто, деактивируем кнопку повторного расклада
		if (tableElement.querySelectorAll(".card--control").length < CONTROLS_COUNT) {
			reloadButttonElement.setAttribute("disabled", "disabled");
			reloadButttonElement.title = "Раскладывать нечего :-(";
		}
	}
}
