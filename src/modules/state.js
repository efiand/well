export const MAX_ATTACHED = 104;

export const NUMBER_OF_SLOTS = 5;

export const STATE = {
	dropTargets: [
		'corner-top-left',
		'corner-top-right',
		'corner-bottom-left',
		'corner-bottom-right',
		'acceptor-top',
		'acceptor-right',
		'acceptor-bottom',
		'acceptor-left',
		'central',
	],
	cornerSuits: [], // Список мастей, которые начали собирать
	names: {
		1: 'туз',
		11: 'валет',
		12: 'дама',
		13: 'король',
	},
	numberOfAttached: 0, // Счётчик пристроенных карт
	numberOfSlots: NUMBER_OF_SLOTS, // Число слотов в нижнем ряду для раздачи карт
	reloadPlural: 'слота',
	reloadSingular: 'слот',
	reloadTitle: 'Начать повторную раскладку на',
	restartText: 'Разложить заново',
	suits: {
		clubs: 'Трефы',
		diamonds: 'Бубны',
		hearts: 'Червы',
		spades: 'Пики',
	},
	values: {
		1: 'A',
		11: 'J',
		12: 'Q',
		13: 'K',
	},
	willSlotsText: 'Будет разложено карт: ',
};
