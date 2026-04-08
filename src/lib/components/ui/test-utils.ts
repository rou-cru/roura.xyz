import { createRawSnippet } from 'svelte';

/**
 * Crea un snippet de texto en crudo para simular 'children' en Svelte 5.
 * @param text - Contenido de texto a renderizar dentro de un span.
 */
export function createTextSnippet(text: string) {
	return createRawSnippet(() => ({
		render: () => `<span>${text}</span>`
	}));
}
