import type { APIRoute } from 'astro';
import { absoluteUrl, getAllBerita, lastMod, xmlResponse } from '@/lib/seo-files';

/** Sitemap index: menunjuk ke sitemap berita, halaman, dan Google News. */
export const GET: APIRoute = async () => {
  const all = await getAllBerita();
  // Ambil perubahan terakhir (terbit ATAU diperbarui), bukan sekadar artikel terbaru.
  const newest = all.reduce<Date | undefined>((max, b) => (!max || lastMod(b) > max ? lastMod(b) : max), undefined);
  const latest = (newest ?? new Date()).toISOString();
  const maps = ['/sitemap-berita.xml', '/sitemap-halaman.xml', '/sitemap-news.xml'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${maps.map((m) => `  <sitemap><loc>${absoluteUrl(m)}</loc><lastmod>${latest}</lastmod></sitemap>`).join('\n')}
</sitemapindex>
`;
  return xmlResponse(body);
};
