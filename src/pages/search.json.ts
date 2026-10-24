import type { APIRoute } from 'astro';
import { beritaUrl, formatDate, getAllBerita, getCategory } from '@/lib/berita';

/** Indeks ringan untuk pencarian sisi klien di /cari/. */
export const GET: APIRoute = async () => {
  const all = await getAllBerita();
  const data = all.map((b) => ({
    t: b.data.title,
    d: b.data.description,
    u: beritaUrl(b.id),
    c: getCategory(b.data.category)?.name ?? '',
    g: b.data.tags.join(' '),
    p: formatDate(b.data.pubDate),
  }));
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
