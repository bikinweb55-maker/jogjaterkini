/** Data bersama untuk file teknis: sitemap dan RSS. */
import { getImage } from 'astro:assets';
import { getCollection } from 'astro:content';
import { CATEGORIES, CREDIT, FOOTER_LINKS, SITE } from '@/site.config';
import { absoluteUrl, authorUrl, beritaUrl, categoryUrl, getAllBerita, getTags, tagUrl, type Berita } from './berita';
import { getCover } from './cover';
import { categoryPageUrl, indexPageUrl, paginateItems } from './pagination';

export const xmlEscape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

export const lastMod = (b: Berita) => (b.data.updatedDate ?? b.data.pubDate);

const newest = (items: Berita[]) =>
  items.reduce<Date | undefined>((max, b) => (!max || lastMod(b) > max ? lastMod(b) : max), undefined);

export async function ogImageUrl(item: Berita) {
  const img = await getImage({ src: getCover(item).src, width: 1200, height: 675, fit: 'cover', format: 'jpg', quality: 80 });
  return absoluteUrl(img.src);
}

/** Semua URL non-artikel yang boleh diindeks (konsisten dengan meta robots di halamannya). */
export async function getIndexablePages(): Promise<{ loc: string; lastmod?: Date }[]> {
  const all = await getAllBerita();
  const authors = await getCollection('penulis');
  const pages: { loc: string; lastmod?: Date }[] = [{ loc: '/', lastmod: newest(all) }];

  const { total } = paginateItems(all, 1);
  for (let p = 1; p <= total; p++) pages.push({ loc: indexPageUrl(p), lastmod: newest(paginateItems(all, p).items) });

  for (const c of CATEGORIES) {
    const inCat = all.filter((b) => b.data.category === c.slug);
    if (inCat.length === 0) continue; // halaman kategori kosong = noindex
    const { total: catTotal } = paginateItems(inCat, 1);
    for (let p = 1; p <= catTotal; p++) {
      pages.push({ loc: categoryPageUrl(c.slug)(p), lastmod: newest(paginateItems(inCat, p).items) });
    }
  }

  for (const [, tag] of getTags(all)) {
    if (tag.indexable) pages.push({ loc: tagUrl(tag.name), lastmod: newest(tag.items) });
  }

  for (const a of authors) {
    pages.push({ loc: authorUrl(a.id), lastmod: newest(all.filter((b) => b.data.author.id === a.id)) });
  }

  for (const l of FOOTER_LINKS) pages.push({ loc: l.href });
  pages.push({ loc: CREDIT.path });
  return pages;
}

export { absoluteUrl, beritaUrl, categoryUrl, getAllBerita, SITE, CATEGORIES };

export function xmlResponse(body: string, type = 'application/xml') {
  return new Response(body, { headers: { 'Content-Type': `${type}; charset=utf-8` } });
}
