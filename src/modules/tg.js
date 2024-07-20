import { rules } from '@/modules/settings';

const params = new URL(window.location.toString()).searchParams;
const tgMode = typeof params.get('tg') === 'string';

if (tgMode) {
	rules.querySelector('.rules__telegram').remove();

	window.Telegram?.WebApp?.expand();
}
