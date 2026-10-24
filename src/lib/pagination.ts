import { SITE } from '@/site.config';

export function paginateItems<T>(items: T[], page: number, perPage: number = SITE.postsPerPage) {
  const total = Math.max(1, Math.ceil(items.length / perPage));
  return { items: items.slice((page - 1) * perPage, page * perPage), total };
}

export const indexPageUrl = (page: number) => (page === 1 ? '/berita/' : `/berita/halaman/${page}/`);
export const categoryPageUrl = (slug: string) => (page: number) =>
  page === 1 ? `/kategori/${slug}/` : `/kategori/${slug}/${page}/`;
