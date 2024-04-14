import { STATE } from '../state';
import { table } from '../settings';

// Очистка теней

export const clearShadows = () => {
	for (let i = 0; i < STATE.dropTargets.length; i++) {
		const targets = table.querySelectorAll(`.card--${STATE.dropTargets[i]}`);
		for (let j = 0; j < targets.length; j++) {
			targets[j].classList.remove('card--acceptable');
		}
	}
};
