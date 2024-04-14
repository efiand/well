import { STATE } from '../state';
import { currentClickHandler } from './current-click-handler';
import { reloadBtn } from '../settings';
import { table } from '../settings';

const MORE_SLOTS = 2;

// Расклад левой нижней кнопкой

export const reloadHandler = () => {
	for (let i = 1; i <= STATE.numberOfSlots; i++) {
		const targetClass = `card--work-${i}`;
		const buttons = table.querySelectorAll(`.${targetClass}:not(.card--empty)`);
		for (let j = 0; j < buttons.length; j++) {
			buttons[j].classList.remove(targetClass);
			buttons[j].classList.add('card--run');
			buttons[j].classList.add('card--shirt');
			table.appendChild(buttons[j]);
		}
	}

	if (STATE.numberOfSlots > 1) {
		STATE.numberOfSlots--;
		reloadBtn.title = `${STATE.reloadTitle} ${STATE.numberOfSlots - 1} ${STATE.reloadPlural}`;
	}

	if (STATE.numberOfSlots <= MORE_SLOTS) {
		reloadBtn.title = `${STATE.reloadTitle} 1 ${STATE.reloadSingular}`;
	}

	table.lastChild.addEventListener('click', currentClickHandler);
	currentClickHandler();
};
