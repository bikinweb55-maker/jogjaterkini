/**
 * Cover berita dengan cadangan otomatis.
 * Kalau frontmatter tidak mengisi `cover`, semua tempat (kartu, halaman artikel,
 * OG/schema, sitemap gambar) memakai src/assets/cover-default.jpg.
 */
import type { ImageMetadata } from 'astro';
import defaultCover from '@/assets/cover-default.jpg';
import { SITE } from '@/site.config';
import type { Berita } from './berita';

export interface Cover {
  src: ImageMetadata;
  alt: string;
  isDefault: boolean;
}

export function getCover(item: Berita): Cover {
  const { cover, coverAlt, title } = item.data;
  if (cover) return { src: cover, alt: coverAlt ?? title, isDefault: false };
  return { src: defaultCover, alt: `Logo ${SITE.name}`, isDefault: true };
}
