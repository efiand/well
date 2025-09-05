import { closeButtonElement, rulesOpenerElement, winMessageElement } from "#client/modules/settings.js";

/** Показ сообщения о выигрыше */
export function showWinMessage() {
	winMessageElement.hidden = false;
	closeButtonElement.hidden = true;
	rulesOpenerElement.click();
}
