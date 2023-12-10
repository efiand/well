// Генерация SVG с использование символьного спрайта

export const createSVG = (link) => {
	const block = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');

	use.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${link}`);
	block.appendChild(use);
	return block;
};
