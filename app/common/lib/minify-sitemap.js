export function minifySitemap(xml = '') {
	return (
		xml
			// убрать XML-комментарии
			.replace(/<!--[\s\S]*?-->/g, '')

			// убрать пробелы между тегами
			.replace(/>\s+</g, '><')

			// убрать лишние переносы строк
			.replace(/\r?\n|\r/g, '')

			// схлопнуть множественные пробелы вне тегов
			.replace(/\s{2,}/g, ' ')

			.trim()
	);
}
