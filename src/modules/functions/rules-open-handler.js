import { rules } from '../settings';

// Открытие модального окна с правилами

export const rulesOpenHandler = (evt) => {
	evt.preventDefault();

	rules.classList.remove('hidden');

	if (!evt.keyCode) {
		evt.target.blur();
	}
};
