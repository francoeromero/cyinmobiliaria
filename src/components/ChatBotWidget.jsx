import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

const OPERATION_QUESTION = '¿Qué tipo de operación estás buscando?';

/** Mismos valores que `SearchFilter`: filters.operation */
const OPERATION_OPTIONS = [
	{ value: 'Todos', label: 'Todos' },
	{ value: 'Venta', label: 'Venta' },
	{ value: 'Alquiler', label: 'Alquiler' },
];

/** Equivalente a los enlaces del `Navbar` (PROPIEDADES = todas). */
const OPERATION_NAV_PATH = {
	Todos: '/propiedades',
	Venta: '/venta',
	Alquiler: '/alquiler',
};

const WELCOME_MESSAGE = {
	id: 'welcome',
	role: 'bot',
	text: OPERATION_QUESTION,
	kind: 'operation_prompt',
};

const chatPanelTransition = {
	type: 'spring',
	damping: 26,
	stiffness: 320,
	mass: 0.72,
};

/** Alineado con breakpoint `md` de Tailwind (768px): desktop abre el chat al cargar; móvil no. */
function getIsDesktopViewport() {
	if (typeof window === 'undefined') return true;
	return window.matchMedia('(min-width: 768px)').matches;
}

function ChatBotWidget() {
	const navigate = useNavigate();
	const reduceMotion = useReducedMotion();
	const [open, setOpen] = useState(getIsDesktopViewport);
	const [messages, setMessages] = useState(() =>
		getIsDesktopViewport() ? [{ ...WELCOME_MESSAGE }] : []
	);
	const [draft, setDraft] = useState('');
	const [selectedOperation, setSelectedOperation] = useState(null);
	const listEndRef = useRef(null);
	const inputRef = useRef(null);
	const panelRef = useRef(null);

	const panelMotion = reduceMotion
		? {
				initial: false,
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0 },
				transition: { duration: 0.12 },
			}
		: {
				initial: { opacity: 0, y: '100%' },
				animate: { opacity: 1, y: 0 },
				exit: { opacity: 0, y: 32 },
				transition: chatPanelTransition,
			};

	const closeChat = useCallback(() => setOpen(false), []);

	const scrollToBottom = useCallback(() => {
		listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, []);

	useEffect(() => {
		scrollToBottom();
	}, [messages, open, scrollToBottom, selectedOperation]);

	useEffect(() => {
		if (!open) return;
		const t = window.setTimeout(() => {
			if (selectedOperation) inputRef.current?.focus();
		}, 200);
		return () => window.clearTimeout(t);
	}, [open, selectedOperation]);

	useEffect(() => {
		if (!open) return;
		const onKey = (e) => {
			if (e.key === 'Escape') closeChat();
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [open, closeChat]);

	useEffect(() => {
		if (!open) return;
		const onPointerDown = (e) => {
			const panel = panelRef.current;
			if (panel && !panel.contains(e.target)) {
				closeChat();
			}
		};
		document.addEventListener('pointerdown', onPointerDown);
		return () => document.removeEventListener('pointerdown', onPointerDown);
	}, [open, closeChat]);

	const openChat = useCallback(() => {
		setOpen(true);
		setMessages((prev) => (prev.length > 0 ? prev : [{ ...WELCOME_MESSAGE }]));
	}, []);

	const pickOperation = (value) => {
		if (selectedOperation != null) return;
		setSelectedOperation(value);
		setMessages((m) => [
			...m,
			{ id: `u-op-${Date.now()}`, role: 'user', text: value },
		]);
		const path = OPERATION_NAV_PATH[value];
		if (path) navigate(path);
	};

	const sendMessage = () => {
		const text = draft.trim();
		if (!text || selectedOperation == null) return;
		setDraft('');
		setMessages((m) => [...m, { id: `u-${Date.now()}`, role: 'user', text }]);
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		sendMessage();
	};

	return (
		<div
			className="pointer-events-none fixed bottom-4 right-4 z-[95] md:bottom-6 md:right-6"
			style={{
				paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom, 0px))',
				paddingRight: 'max(0px, env(safe-area-inset-right, 0px))',
			}}
		>
			<AnimatePresence>
				{open && (
					<motion.div
						key="chat-panel"
						ref={panelRef}
						role="dialog"
						aria-label="Chat de asistencia"
						initial={panelMotion.initial}
						animate={panelMotion.animate}
						exit={panelMotion.exit}
						transition={panelMotion.transition}
						className="pointer-events-auto fixed inset-x-0 bottom-0 z-[96] flex max-h-[min(92dvh,640px)] flex-col overflow-hidden rounded-t-2xl bg-white shadow-[0_-8px_40px_rgba(0,0,0,0.18)] md:origin-bottom-right md:inset-auto md:bottom-6 md:right-6 md:max-h-[520px] md:w-[min(calc(100vw-2rem),380px)] md:rounded-2xl md:shadow-[0_12px_48px_rgba(0,0,0,0.2)]"
					>
					<header className="flex shrink-0 items-center gap-3 border-b border-black/6 bg-[var(--brand-accent)] px-3 py-2.5 text-white shadow-sm md:rounded-t-2xl">
						<div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-white/20 ring-2 ring-white/35">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 24 24"
								fill="currentColor"
								className="m-1.5 h-7 w-7 text-white"
								aria-hidden
							>
								<path
									fillRule="evenodd"
									d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.023 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.323.39.39 0 00-.297.417l.347 2.347a.75.75 0 01-1.115.69l-2.162-1.162a.75.75 0 00-.55-.105 49.142 49.142 0 01-5.79-.45C4.337 19.522 3 17.788 3 15.75V6.75c0-1.946 1.37-3.678 3.348-3.97z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-semibold tracking-tight">
								CY desarrollos inmobiliarios
							</p>
							<p className="text-xs text-white/85">En línea · Asistente</p>
						</div>
						<button
							type="button"
							className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
							onClick={closeChat}
							aria-label="Minimizar chat"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="h-5 w-5"
								aria-hidden
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 8.25l-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</button>
					</header>

					<div
						className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-[#f0f2f5] px-3 py-3"
						style={{ WebkitOverflowScrolling: 'touch' }}
					>
						{messages.map((msg) =>
							msg.role === 'bot' ? (
								<div
									key={msg.id}
									className="flex flex-col items-stretch gap-0"
								>
									<div className="flex justify-start">
										<div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2 text-sm leading-relaxed text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
											{msg.text}
										</div>
									</div>
									{msg.kind === 'operation_prompt' && selectedOperation == null && (
										<div
											className="mt-2 flex max-w-[85%] flex-col gap-2"
											role="group"
											aria-label="Tipo de operación"
										>
											{OPERATION_OPTIONS.map((opt) => (
												<button
													key={opt.value}
													type="button"
													className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-3 pr-3 text-left text-sm font-medium text-gray-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:border-[color-mix(in_srgb,var(--brand-accent)_55%,lightgray)] hover:bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] active:scale-[0.98]"
													onClick={() => pickOperation(opt.value)}
												>
													{opt.label}
												</button>
											))}
										</div>
									)}
								</div>
							) : (
								<div
									key={msg.id}
									className="flex justify-end"
								>
									<div
										className="max-w-[85%] rounded-2xl rounded-br-md px-3.5 py-2 text-sm leading-relaxed text-white shadow-[0_1px_2px_rgba(0,0,0,0.12)]"
										style={{ backgroundColor: 'var(--brand-accent)' }}
									>
										{msg.text}
									</div>
								</div>
							)
						)}
						<div ref={listEndRef} />
					</div>

					<form
						onSubmit={onFormSubmit}
						className="shrink-0 border-t border-gray-200/90 bg-white px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))]"
					>
						<div className="flex items-end gap-2">
							<label htmlFor="chatbot-input" className="sr-only">
								Escribe un mensaje
							</label>
							<textarea
								id="chatbot-input"
								ref={inputRef}
								rows={1}
								value={draft}
								onChange={(e) => setDraft(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === 'Enter' && !e.shiftKey) {
										e.preventDefault();
										sendMessage();
									}
								}}
								placeholder={
									selectedOperation == null
										? 'Elige el tipo de operación…'
										: 'Escribe un mensaje…'
								}
								disabled={selectedOperation == null}
								className="max-h-28 min-h-[44px] flex-1 resize-none rounded-[20px] border-0 bg-[#f0f2f5] px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--brand-accent)] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-55"
							/>
							<button
								type="submit"
								className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white transition-[transform,background-color] hover:scale-105 active:scale-95 disabled:pointer-events-none disabled:opacity-40"
								style={{ backgroundColor: 'var(--brand-accent)' }}
								disabled={selectedOperation == null || !draft.trim()}
								aria-label="Enviar mensaje"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="h-5 w-5"
									aria-hidden
								>
									<path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
								</svg>
							</button>
						</div>
					</form>
					</motion.div>
				)}
			</AnimatePresence>

			<button
				type="button"
				hidden={open}
				className="pointer-events-auto flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-[var(--brand-accent)] text-white shadow-[0_4px_16px_rgba(217,56,28,0.42)] transition-[transform,box-shadow,background-color] duration-200 hover:scale-105 hover:bg-[var(--brand-accent-hover)] hover:shadow-[0_6px_20px_rgba(217,56,28,0.5)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/90 active:scale-95 md:h-16 md:w-16"
				aria-label="Abrir asistente de chat"
				aria-expanded={open}
				onClick={openChat}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					className="h-6 w-6 md:h-7 md:w-7"
					aria-hidden
				>
					<path
						fillRule="evenodd"
						d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.023 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.323.39.39 0 00-.297.417l.347 2.347a.75.75 0 01-1.115.69l-2.162-1.162a.75.75 0 00-.55-.105 49.142 49.142 0 01-5.79-.45C4.337 19.522 3 17.788 3 15.75V6.75c0-1.946 1.37-3.678 3.348-3.97z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
		</div>
	);
}

export default ChatBotWidget;
