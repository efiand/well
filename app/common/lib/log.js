/**
 * Базовая функция логирования
 * @param {(...data: unknown[]) => void} log
 * @param {'ERROR' | 'INFO' | 'WARN'} levelTitle
 * @param {unknown[]} args
 */
function executeLog(log, levelTitle, ...args) {
	const separator = `─`.repeat(40);

	log(`${separator} [${levelTitle} | ${new Date().toISOString()}]`);

	args.forEach((arg) => {
		if ((levelTitle === 'ERROR' || levelTitle === 'WARN') && arg instanceof Error) {
			log(arg.stack || arg.message);
		} else {
			log(arg);
		}
	});

	log(separator);
}

/** @type {Record<LogLevel, (...args: unknown[]) => void>} */
export const log = {
	error: (...args) => executeLog(console.error, 'ERROR', ...args),
	info: (...args) => executeLog(console.info, 'INFO', ...args),
	warn: (...args) => executeLog(console.warn, 'WARN', ...args),
};
