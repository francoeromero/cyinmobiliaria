import React, { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';

const SCROLL_THRESHOLD = 280;

export default function ScrollToTopButton() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<button
			type="button"
			aria-label="Volver arriba"
			className={`fixed left-1/2 top-[var(--scroll-top-below-navbar)] z-[45] hidden -translate-x-1/2 bg-transparent p-2 text-[color:var(--brand-accent)] transition-opacity duration-200 md:block ${
				visible ? 'opacity-100' : 'pointer-events-none opacity-0'
			}`}
			onClick={() =>
				window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			}
		>
			<ChevronUp className="h-9 w-9" strokeWidth={2.25} aria-hidden />
		</button>
	);
}
