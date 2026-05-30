declare global {
	interface Window {
		isDev?: boolean;
		Telegram: {
			WebApp: {
				disableVerticalSwipes: () => void;
				enableClosingConfirmation: () => void;
				expand: () => void;
			};
		};
	}
}

export {};
