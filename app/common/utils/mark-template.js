/**
 * Функция для пометок шаблонных строк, в которых нужна поддержка HTML/XML/SQL со стороны VS Code
 *
 * @type {(raw: TemplateStringsArray, ...values: unknown[]) => string}
 */
export function markTemplate(raw, ...values) {
	return String.raw({ raw }, ...values);
}

export { markTemplate as html, markTemplate as xml };
