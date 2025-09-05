// Перемешивание массива

/** @type {(items: unknown[]) => void} */
export function shuffleArray(itens) {
	for (let i = itens.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = itens[i];
		itens[i] = itens[j];
		itens[j] = temp;
	}
}
