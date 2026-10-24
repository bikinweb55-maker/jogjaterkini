import type { APIRoute } from 'astro';
import { absoluteUrl, getIndexablePages, xmlEscape, xmlResponse } from '@/lib/seo-files';

/** Beranda, indeks, kategori, tag (yang layak indeks), penulis, dan halaman statis. */
export const GET: APIRoute = async () => {
  const pages = await getIndexablePages();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map((p) => `  <url><loc>${xmlEscape(absoluteUrl(p.loc))}</loc>${p.lastmod ? `<lastmod>${p.lastmod.toISOString()}</lastmod>` : ''}</url>`)
  .join('\n')}
</urlset>
`;
  return xmlResponse(body);
};
