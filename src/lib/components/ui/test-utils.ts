import { createRawSnippet } from 'svelte';

function escapeHtml(text: string): string {
	const div = document.createElement('div');
	div.textContent = text;
	return div.innerHTML;
}

/**
 * Crea un snippet de texto en crudo para simular 'children' en Svelte 5.
 * @param text - Contenido de texto a renderizar dentro de un span.
 */
export function createTextSnippet(text: string) {
	const safeText = escapeHtml(text);
	return createRawSnippet(() => ({
		render: () => `<span>${safeText}</span>`
	}));
}
