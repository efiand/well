import { deckComponents, table } from '../settings.js';
import { STATE } from '../state.js';
import { addDragHandlers } from './add-drag-handlers.js';
import { createSVG } from './create-svg.js';
import { currentClickHandler } from './current-click-handler.js';
import { donorClickHandler } from './donor-click-handler.js';
import { shuffleArray } from './shuffle-array.js';

const Count = {
	FOUR_DECKS: 44,
	MAX: 103,
	ONE_DECK: 11,
	THREE_DECKS: 33,
	TWO_DECKS: 22
};

// Генерация разметки карт

export const createDeck = () => {
	// Тасуем удвоенную колоду
	const cards = shuffleArray(deckComponents.concat(deckComponents));
	const deck = document.createDocumentFragment();
	for (let i = 0; i < cards.length; i++) {
		const options = cards[i].split('-');
		const btn = document.createElement('div');

		// Раскладываем по 11 карт по стенкам колодца, остальные в колоду
		let suffix = 'control card--run';
		if (i < Count.ONE_DECK) {
			suffix = 'donor-top';
		} else if (i < Count.TWO_DECKS) {
			suffix = 'donor-left';
		} else if (i < Count.THREE_DECKS) {
			suffix = 'donor-right';
		} else if (i < Count.FOUR_DECKS) {
			suffix = 'donor-bottom';
		}

		// Классы и дата-атрибуты карт (IE-совместимый синтаксис)
		btn.setAttribute('class', `card card--${suffix} card--shirt card--${options[0]}`);
		btn.setAttribute('data-card', cards[i]);

		// Центральный контейнер
		let SVG = createSVG(cards[i]);
		SVG.setAttribute('class', 'card__info card__svg');
		SVG.setAttribute('title', `${STATE.suits[options[0]]}: ${STATE.names[options[1]] || options[1]}`);
		btn.appendChild(SVG);

		// Контейнер в левом верхнем углу
		const block = document.createElement('span');
		block.classList.add('card__corner');
		block.classList.add(`card__corner--${options[0]}`);
		block.textContent = STATE.values[options[1]] || options[1];

		// Левый верхний угол
		SVG = createSVG(options[0]);
		SVG.setAttribute('class', 'card__icon card__svg');
		block.appendChild(SVG);
		btn.appendChild(block);

		// Правый нижний угол
		const blockCopy = block.cloneNode(true);
		block.classList.add('card__corner--bottom');
		btn.appendChild(blockCopy);

		// Для крайней карты или карты по углам
		if (i === Count.MAX) {
			btn.addEventListener('click', currentClickHandler);
			btn.setAttribute('title', `${STATE.willSlotsText}${STATE.numberOfSlots}`);
		} else if (i < Count.FOUR_DECKS) {
			btn.addEventListener('click', donorClickHandler);
		} else {
			addDragHandlers(btn);
		}

		// Добавление к колоде
		deck.appendChild(btn);
	}

	table.appendChild(deck);
};
