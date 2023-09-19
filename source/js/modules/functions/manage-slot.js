import { table } from '../settings.js';

const COEFF = 75;

// Настройка параметров слота при раскладке

export const manageSlot = (runCards, ind, slotNumber) => {
	window.setTimeout(() => {
		runCards[ind].classList.remove('card--run');
		runCards[ind].classList.remove('card--shirt');
		runCards[ind].classList.add(`card--work-${slotNumber}`);
		table.appendChild(runCards[ind]);
	}, slotNumber * COEFF);
};
