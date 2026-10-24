import type { APIRoute } from 'astro';
import { absoluteUrl, beritaUrl, getAllBerita, lastMod, ogImageUrl, xmlEscape, xmlResponse } from '@/lib/seo-files';

/** Semua artikel, lengkap dengan lastmod dan image sitemap. */
export const GET: APIRoute = async () => {
  const all = await getAllBerita();
  const urls = await Promise.all(
    all.map(async (b) => `  <url>
    <loc>${xmlEscape(absoluteUrl(beritaUrl(b.id)))}</loc>
    <lastmod>${lastMod(b).toISOString()}</lastmod>
    <image:image>
      <image:loc>${xmlEscape(await ogImageUrl(b))}</image:loc>
    </image:image>
  </url>`),
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join('\n')}
</urlset>
`;
  return xmlResponse(body);
};
