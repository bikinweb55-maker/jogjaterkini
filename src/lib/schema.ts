/**
 * Builder JSON-LD (schema.org) dengan sistem @id yang saling terhubung.
 * Semua node digabung ke satu @graph per halaman, sehingga mesin pencari
 * membaca situs sebagai satu graf entitas: Organization ← WebSite ← WebPage ← NewsArticle.
 */
import type { CollectionEntry } from 'astro:content';
import { CATEGORIES, CREDIT, SITE } from '@/site.config';

export type Crumb = { name: string; href?: string };
type Node = Record<string, unknown>;

const abs = (path: string) => new URL(path, SITE.url).href;

export const ids = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  logo: `${SITE.url}/#logo`,
  webpage: (path: string) => `${abs(path)}#webpage`,
  breadcrumb: (path: string) => `${abs(path)}#breadcrumb`,
  article: (path: string) => `${abs(path)}#article`,
  primaryImage: (path: string) => `${abs(path)}#primaryimage`,
  author: (id: string) => `${abs(`/penulis/${id}/`)}#author`,
};

export function organization(): Node {
  return {
    '@type': 'NewsMediaOrganization',
    '@id': ids.organization,
    name: SITE.name,
    alternateName: 'JogjaTerkini.net',
    url: `${SITE.url}/`,
    description: SITE.description,
    email: SITE.email,
    foundingDate: String(SITE.foundingYear),
    logo: {
      '@type': 'ImageObject',
      '@id': ids.logo,
      url: abs(SITE.logo),
      contentUrl: abs(SITE.logo),
      width: 512,
      height: 512,
      caption: SITE.name,
    },
    image: { '@id': ids.logo },
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Daerah Istimewa Yogyakarta' },
    knowsAbout: ['Yogyakarta', ...CATEGORIES.map((c) => `${c.name} Yogyakarta`)],
    publishingPrinciples: abs('/pedoman-media-siber/'),
    correctionsPolicy: abs('/redaksi/'),
    masthead: abs('/redaksi/'),
    ...(SITE.social.length > 0 ? { sameAs: SITE.social.map((s) => s.url) } : {}),
  };
}

export function website(): Node {
  return {
    '@type': 'WebSite',
    '@id': ids.website,
    url: `${SITE.url}/`,
    name: SITE.name,
    description: SITE.description,
    inLanguage: SITE.locale,
    publisher: { '@id': ids.organization },
    ...(CREDIT.url || CREDIT.linkedin
      ? {
          creator: {
            '@type': 'Person',
            name: CREDIT.name,
            url: CREDIT.url || CREDIT.linkedin,
            ...(CREDIT.linkedin ? { sameAs: [CREDIT.linkedin] } : {}),
          },
        }
      : {}),
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/cari/?q={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function breadcrumbList(path: string, crumbs: Crumb[]): Node {
  return {
    '@type': 'BreadcrumbList',
    '@id': ids.breadcrumb(path),
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      // Item terakhir = halaman ini.
      item: abs(i === crumbs.length - 1 ? path : (c.href ?? path)),
    })),
  };
}

export type PageType = 'WebPage' | 'CollectionPage' | 'AboutPage' | 'ContactPage' | 'ProfilePage' | 'SearchResultsPage';

export function webPage(opts: {
  path: string;
  name: string;
  description: string;
  type?: PageType;
  hasBreadcrumb?: boolean;
  primaryImage?: string;
  extra?: Node;
}): Node {
  const { path, name, description, type = 'WebPage', hasBreadcrumb, primaryImage, extra } = opts;
  return {
    '@type': type,
    '@id': ids.webpage(path),
    url: abs(path),
    name,
    description,
    inLanguage: SITE.locale,
    isPartOf: { '@id': ids.website },
    ...(path === '/' ? { about: { '@id': ids.organization } } : {}),
    ...(hasBreadcrumb ? { breadcrumb: { '@id': ids.breadcrumb(path) } } : {}),
    ...(primaryImage ? { primaryImageOfPage: { '@id': ids.primaryImage(path) } } : {}),
    ...extra,
  };
}

export function authorNode(author: CollectionEntry<'penulis'>): Node {
  const { name, role, bio, type, sameAs } = author.data;
  return {
    '@type': type,
    '@id': ids.author(author.id),
    name,
    url: abs(`/penulis/${author.id}/`),
    description: bio,
    ...(type === 'Person' ? { jobTitle: role, worksFor: { '@id': ids.organization } } : { parentOrganization: { '@id': ids.organization } }),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function itemList(path: string, urls: { url: string; name: string }[]): Node {
  return {
    '@type': 'ItemList',
    '@id': `${abs(path)}#itemlist`,
    numberOfItems: urls.length,
    itemListElement: urls.map((u, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(u.url), name: u.name })),
  };
}

export function newsArticle(opts: {
  path: string;
  headline: string;
  description: string;
  images: { url: string; width: number; height: number }[];
  imageAlt: string;
  datePublished: Date;
  dateModified?: Date;
  authorId: string;
  section: string;
  keywords: string[];
  wordCount: number;
  location?: string;
}): Node[] {
  const { path, images } = opts;
  const imageNodes = images.map((img, i) => ({
    '@type': 'ImageObject',
    ...(i === 0 ? { '@id': ids.primaryImage(path) } : {}),
    url: abs(img.url),
    contentUrl: abs(img.url),
    width: img.width,
    height: img.height,
    caption: opts.imageAlt,
  }));
  return [
    {
      '@type': 'NewsArticle',
      '@id': ids.article(path),
      headline: opts.headline,
      description: opts.description,
      url: abs(path),
      mainEntityOfPage: { '@id': ids.webpage(path) },
      isPartOf: { '@id': ids.webpage(path) },
      image: imageNodes,
      thumbnailUrl: abs(images[0].url),
      datePublished: opts.datePublished.toISOString(),
      dateModified: (opts.dateModified ?? opts.datePublished).toISOString(),
      author: [{ '@id': ids.author(opts.authorId) }],
      publisher: { '@id': ids.organization },
      articleSection: opts.section,
      keywords: opts.keywords.join(', '),
      wordCount: opts.wordCount,
      inLanguage: SITE.locale,
      isAccessibleForFree: true,
      copyrightHolder: { '@id': ids.organization },
      copyrightYear: opts.datePublished.getFullYear(),
      ...(opts.location ? { contentLocation: { '@type': 'Place', name: `${opts.location}, ${SITE.address.region}` } } : {}),
      // Bagian yang paling layak dibacakan/dikutip asisten suara.
      speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.article-title', '.article-lead'] },
    },
  ];
}

/** Gabungkan node menjadi satu dokumen JSON-LD. */
export function graph(nodes: Node[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
