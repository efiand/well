const params = new URL(window.location.toString()).searchParams;
const tgMode = typeof params.get('tg') === 'string';

if (tgMode) {
	const script = document.createElement('script');
	script.src = 'https://telegram.org/js/telegram-web-app.js';
	script.addEventListener('load', () => {
		window.Telegram.WebApp.expand();
		window.Telegram.WebApp.disableVerticalSwipes();
		window.Telegram.WebApp.enableClosingConfirmation();
	});
	document.head.append(script);
}
