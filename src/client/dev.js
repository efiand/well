const eventSource = new EventSource("/dev/watch");

/** @type {(event: MessageEvent<string>) => void} */
function onMessage({ data }) {
	if (data === "reload") {
		eventSource.removeEventListener("message", onMessage);
		eventSource.close();
		window.location.reload();
	}
}

eventSource.addEventListener("message", onMessage);

window.isDev = true;
