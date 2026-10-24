import { getCollection, type CollectionEntry } from 'astro:content';
import { CATEGORIES, SITE } from '@/site.config';

export type Berita = CollectionEntry<'berita'>;

/** Semua berita terbit (tanpa draft saat build produksi), terbaru dulu. */
export async function getAllBerita(): Promise<Berita[]> {
  const items = await getCollection('berita', ({ data }) => (import.meta.env.PROD ? !data.draft : true));
  return items.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const beritaUrl = (id: string) => `/berita/${id}/`;
export const categoryUrl = (slug: string) => `/kategori/${slug}/`;
export const tagUrl = (tag: string) => `/tag/${slugify(tag)}/`;
export const authorUrl = (id: string) => `/penulis/${id}/`;

export function formatDate(date: Date, withTime = false): string {
  return new Intl.DateTimeFormat(SITE.locale, {
    dateStyle: 'long',
    ...(withTime ? { timeStyle: 'short' } : {}),
    timeZone: SITE.timeZone,
  }).format(date) + (withTime ? ' WIB' : '');
}

export function readingTime(body = ''): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE.url).href;
}

/** Tag dengan jumlah artikel di bawah ambang ini dianggap thin content (noindex & tidak masuk sitemap). */
export const TAG_MIN_INDEXABLE = 3;

export function getTags(items: Berita[]) {
  const tags = new Map<string, { name: string; items: Berita[]; indexable: boolean }>();
  for (const item of items) {
    for (const name of item.data.tags) {
      const slug = slugify(name);
      if (!tags.has(slug)) tags.set(slug, { name, items: [], indexable: false });
      tags.get(slug)!.items.push(item);
    }
  }
  for (const tag of tags.values()) tag.indexable = tag.items.length >= TAG_MIN_INDEXABLE;
  return tags;
}
