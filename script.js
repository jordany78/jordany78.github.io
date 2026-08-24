const revealItems = document.querySelectorAll('.reveal');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
	revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
	const revealObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;

			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		});
	}, { threshold: 0.15 });

	revealItems.forEach((item) => revealObserver.observe(item));
}
