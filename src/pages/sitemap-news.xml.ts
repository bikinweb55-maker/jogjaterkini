import type { APIRoute } from 'astro';
import { absoluteUrl, beritaUrl, getAllBerita, SITE, xmlEscape, xmlResponse } from '@/lib/seo-files';

/**
 * Google News sitemap: hanya artikel 48 jam terakhir (aturan Google News).
 * Karena situs statis, sitemap ini dihitung saat build — rebuild/deploy setiap ada berita baru.
 */
export const GET: APIRoute = async () => {
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;
  const recent = (await getAllBerita()).filter((b) => b.data.pubDate.valueOf() >= cutoff).slice(0, 1000);
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recent
  .map((b) => `  <url>
    <loc>${xmlEscape(absoluteUrl(beritaUrl(b.id)))}</loc>
    <news:news>
      <news:publication>
        <news:name>${xmlEscape(SITE.name)}</news:name>
        <news:language>${SITE.lang}</news:language>
      </news:publication>
      <news:publication_date>${b.data.pubDate.toISOString()}</news:publication_date>
      <news:title>${xmlEscape(b.data.title)}</news:title>
    </news:news>
  </url>`)
  .join('\n')}
</urlset>
`;
  return xmlResponse(body);
};
