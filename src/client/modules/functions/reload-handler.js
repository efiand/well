import { currentClickHandler } from "#client/modules/functions/current-click-handler.js";
import { reloadButttonElement, tableElement } from "#client/modules/settings.js";
import { STATE } from "#client/modules/state.js";

const MORE_SLOTS = 2;

// Расклад левой нижней кнопкой

export const reloadHandler = () => {
	for (let i = 1; i <= STATE.numberOfSlots; i++) {
		const targetClass = `card--work-${i}`;
		const buttons = tableElement.querySelectorAll(`.${targetClass}:not(.card--empty)`);
		for (let j = 0; j < buttons.length; j++) {
			buttons[j].classList.remove(targetClass);
			buttons[j].classList.add("card--run");
			buttons[j].classList.add("card--shirt");
			tableElement.appendChild(buttons[j]);
		}
	}

	if (STATE.numberOfSlots > 1) {
		STATE.numberOfSlots--;
		reloadButttonElement.title = `${STATE.reloadTitle} ${STATE.numberOfSlots - 1} ${STATE.reloadPlural}`;
	}

	if (STATE.numberOfSlots <= MORE_SLOTS) {
		reloadButttonElement.title = `${STATE.reloadTitle} 1 ${STATE.reloadSingular}`;
	}

	tableElement.lastChild?.addEventListener("click", currentClickHandler);
	currentClickHandler();
};
