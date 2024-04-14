import { MAX_ATTACHED, STATE } from '../state';
import { baseLeft, dropTargetOptions, reloadBtn, table } from '../settings';
import { clearShadows } from './clear-shadows';
import { removeDragHandlers } from './remove-drag-handlers';
import { showWinMessage } from './show-win-message';

const THIRTEENTH_CARD = 13;
const CONTROLS_COUNT = 8;

class Coords {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

// Перемещение карты

export const dragDropHandler = (evt) => {
	evt.preventDefault();

	const startCoords = new Coords(evt.clientX, evt.clientY);

	// В зависимости от драга или тача карта определяется по-разному
	const card = evt.currentTarget || evt.changedTouches[0];

	const dataCard = card.getAttribute('data-card').split('-');
	const startLeft = card.style.left;
	const startTop = card.style.top;
	let isCorner = false;
	let isTrueAccept = false;
	let target = null;
	let newDataAccept = null;

	table.appendChild(card);

	// Тень
	card.classList.add('card--pulled');

	const mouseMoveHandler = (dropEvt) => {
		dropEvt.preventDefault();

		const coordBase = dropEvt.changedTouches ? dropEvt.changedTouches[0] : dropEvt;
		const x = coordBase.clientX;
		const y = coordBase.clientY;

		isTrueAccept = false;
		const diffCoords = new Coords(startCoords.x - x, startCoords.y - y);

		startCoords.x = x;
		startCoords.y = y;

		const currentLeft = card.offsetLeft - diffCoords.x;
		const currentTop = card.offsetTop - diffCoords.y;

		card.style.left = `${currentLeft}px`;
		card.style.top = `${currentTop}px`;

		clearShadows();

		// Поиск доступного слота
		const targetClass = STATE.dropTargets.filter(
			(item) => Math.abs(currentLeft + baseLeft - dropTargetOptions[item].left) < card.clientWidth
			&& Math.abs(currentTop - dropTargetOptions[item].top) < card.clientHeight,
		)[0];

		// Если карта пролетает над целевой ячейкой
		if (targetClass) {
			const targetClasses = table.querySelectorAll(`.card--${targetClass}`);
			target = targetClasses[targetClasses.length - 1];

			const dataAccept = (target.getAttribute('data-accept') || 'any-0').split('-');

			// Проверка слота-акцептора по масти
			const isTrueSuit = dataAccept[0] === 'any' || dataAccept[0] === dataCard[0];

			// Разница между стоимостью карт и проверка по стоимости
			const cardValue = parseInt(dataCard[1], 10);
			const acceptValue = parseInt(dataAccept[1], 10);
			const valueDiff = cardValue - acceptValue;
			let isTrueValue = !acceptValue || !valueDiff;

			// Другие условия по стоимости для углового слота
			isCorner = target.className.indexOf('corner');
			if (isCorner > -1) {
				isTrueValue = !valueDiff;

				// Если раскладка масти в углу началась, слот недоступен для этой масти
				if (
					dataAccept[0] === 'any'
					&& dataAccept[1] === `${THIRTEENTH_CARD}`
					&& STATE.cornerSuits.indexOf(dataCard[0]) > -1
				) {
					isTrueValue = false;
				}
			}

			// Итоговое условие доступности слота
			if (isTrueSuit && isTrueValue) {
				isTrueAccept = true;
				target.classList.add('card--acceptable');

				// Формулировка требований для следующей карты
				let newAcceptValue = cardValue !== THIRTEENTH_CARD ? cardValue + 1 : 1;
				if (isCorner > -1) {
					newAcceptValue = cardValue !== 1 ? cardValue - 1 : THIRTEENTH_CARD;
				}
				newDataAccept = `${dataCard[0]}-${newAcceptValue.toString()}`;
			}
		}
	};

	const mouseUpHandler = (upEvt) => {
		upEvt.preventDefault();

		document.removeEventListener('mousemove', mouseMoveHandler);
		document.removeEventListener('touchmove', mouseMoveHandler);
		document.removeEventListener('mouseup', mouseUpHandler);
		document.removeEventListener('touchend', mouseUpHandler);

		// Если карта отпущена над целевой ячейкой
		if (isTrueAccept) {
			card.style.left = target.style.left;
			card.style.top = target.style.top;
			card.className = target.className;
			card.classList.remove('card--empty');
			card.classList.remove('card--acceptable');
			if (card.className.indexOf('corner') > -1) {
				STATE.numberOfAttached++;
				removeDragHandlers(card);
				if (STATE.cornerSuits.indexOf(dataCard[0]) === -1) {
					STATE.cornerSuits.push(dataCard[0]);
				}
			} else {
				card.classList.add('card--draggable');
			}
			if (STATE.numberOfAttached === MAX_ATTACHED) {
				showWinMessage();
			}
			card.setAttribute('data-accept', newDataAccept);
			if (target === card) {
				card.style.left = startLeft;
				card.style.top = startTop;
			}
		} else {
			card.style.left = startLeft;
			card.style.top = startTop;
		}

		// Удаляем тень
		card.classList.remove('card--pulled');

		// Если в раскладе пусто, деактивируем кнопку повторного расклада
		if (table.querySelectorAll('.card--control').length < CONTROLS_COUNT) {
			reloadBtn.setAttribute('disabled', 'disabled');
			reloadBtn.title = 'Раскладывать нечего :-(';
		}
	};

	// Добавление обработчиков перемещения мышью либо тачем
	if (evt.changedTouches) {
		document.addEventListener('touchmove', mouseMoveHandler, { passive: false });
		document.addEventListener('touchend', mouseUpHandler, { passive: false });
	} else {
		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	}
};
