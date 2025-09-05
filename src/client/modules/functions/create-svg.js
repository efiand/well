/**
 * Генерация SVG с использование символьного спрайта
 *
 * @type {(symbolId: string) => SVGSVGElement}
 */
export const createSVG = (symbolId) => {
	const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const useElement = document.createElementNS("http://www.w3.org/2000/svg", "use");

	useElement.setAttributeNS("http://www.w3.org/1999/xlink", "href", `#${symbolId}`);
	svgElement.appendChild(useElement);
	return svgElement;
};
