import type { RequestHandler } from '@sveltejs/kit';

export const prerender = true;

/**
 * Generates a minimal XML sitemap for the single-page roura.xyz site.
 * Contains only the home URL with priority 1.0.
 */
export const GET: RequestHandler = () => {
	const baseUrl = 'https://roura.xyz';
	const currentDate = new Date().toISOString().split('T')[0];

	const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url>
	<loc>${baseUrl}</loc>
	<lastmod>${currentDate}</lastmod>
	<priority>1.0</priority>
</url>
</urlset>`;

	return new Response(sitemapXml, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
