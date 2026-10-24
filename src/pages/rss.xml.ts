import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { beritaUrl, getAllBerita, getCategory } from '@/lib/berita';
import { SITE } from '@/site.config';

export const GET: APIRoute = async (context) => {
  const all = (await getAllBerita()).slice(0, 50);
  return rss({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    site: context.site ?? SITE.url,
    trailingSlash: true,
    customData: `<language>${SITE.lang}</language>`,
    items: all.map((b) => ({
      title: b.data.title,
      description: b.data.description,
      pubDate: b.data.pubDate,
      link: beritaUrl(b.id),
      categories: [getCategory(b.data.category)?.name ?? '', ...b.data.tags].filter(Boolean),
    })),
  });
};
