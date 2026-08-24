document.documentElement.classList.add('js-enabled');

const revealItems = document.querySelectorAll('.reveal');

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

const closeMenu = () => {
	if (!menuToggle || !navLinks) return;

	menuToggle.setAttribute('aria-expanded', 'false');
	menuToggle.setAttribute('aria-label', 'Open navigation menu');
	navLinks.classList.remove('is-open');
};

if (menuToggle && navLinks) {
	menuToggle.addEventListener('click', () => {
		const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
		menuToggle.setAttribute('aria-expanded', String(!isOpen));
		menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
		navLinks.classList.toggle('is-open', !isOpen);
	});

	navLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') closeMenu();
	});
}

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	revealItems.forEach((item) => item.classList.add('is-visible'));
		} else {
		let updateQueued = false;

		const updateRevealState = () => {
			const viewportHeight = document.documentElement.clientHeight;

			revealItems.forEach((item) => {
				const bounds = item.getBoundingClientRect();
				const isVisible = item.classList.contains('is-visible');
				const insideRevealBand = bounds.top < viewportHeight * 0.85 && bounds.bottom > viewportHeight * 0.15;
				const outsideRevealBand = bounds.bottom < viewportHeight * 0.05 || bounds.top > viewportHeight * 0.95;

				if (!isVisible && insideRevealBand) {
					item.classList.add('is-visible');
				} else if (isVisible && outsideRevealBand) {
					item.classList.remove('is-visible');
				}
			});

			updateQueued = false;
		};

		const queueRevealUpdate = () => {
			if (updateQueued) return;

			updateQueued = true;
			window.requestAnimationFrame(updateRevealState);
		};

		updateRevealState();
		window.addEventListener('scroll', queueRevealUpdate, { passive: true });
		window.addEventListener('resize', queueRevealUpdate);
}
