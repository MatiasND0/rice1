// Only use the script for HTML webpages
if (document instanceof HTMLDocument) {
	const url = new URL(location.href);
	if (url.pathname === '/pushredirect/' && url.searchParams.get('site') === 'adfly') {
		const key = url.searchParams.get('dest');
		if (key && (key.indexOf('http://') === 0 || key.indexOf('https://') === 0)) {
			document.write('<!--');
			window.stop();
			
			window.onbeforeunload = null;
			window.location = key;
		}
	}
}
