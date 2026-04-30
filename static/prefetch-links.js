(() => {
	const prefetched = new Set();

	const shouldPrefetch = (anchor) => {
		if (!anchor || anchor.dataset.noPrefetch !== undefined) {
			return false;
		}

		const url = new URL(anchor.href, window.location.href);

		return (
			url.origin === window.location.origin &&
			url.href !== window.location.href &&
			!url.hash &&
			!anchor.download &&
			anchor.target !== "_blank" &&
			!prefetched.has(url.href)
		);
	};

	const prefetch = (anchor) => {
		if (!shouldPrefetch(anchor)) {
			return;
		}

		const url = new URL(anchor.href, window.location.href);
		const link = document.createElement("link");

		prefetched.add(url.href);
		link.rel = "prefetch";
		link.href = url.href;
		link.as = "document";
		document.head.append(link);
	};

	const schedulePrefetch = (event) => {
		const anchor = event.target.closest?.("a[href]");

		if (!anchor) {
			return;
		}

		if ("requestIdleCallback" in window) {
			window.requestIdleCallback(() => prefetch(anchor), { timeout: 500 });
		} else {
			window.setTimeout(() => prefetch(anchor), 80);
		}
	};

	document.addEventListener("pointerenter", schedulePrefetch, { capture: true, passive: true });
	document.addEventListener("focusin", schedulePrefetch, { passive: true });
	document.addEventListener("touchstart", schedulePrefetch, { passive: true });
})();
