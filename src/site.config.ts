export const SITE = {
  name: 'Jogja Terkini',
  tagline: 'Berita Terkini Yogyakarta',
  description:
    'Jogja Terkini menyajikan berita terkini dari Yogyakarta: peristiwa, pemerintahan, ekonomi, wisata, budaya, dan pendidikan di Kota Yogyakarta, Sleman, Bantul, Kulon Progo, dan Gunungkidul.',
  url: 'https://jogjaterkini.net',
  lang: 'id',
  locale: 'id-ID',
  ogLocale: 'id_ID',
  timeZone: 'Asia/Jakarta',
  email: 'redaksi@jogjaterkini.net',
  foundingYear: 2026,
  address: {
    locality: 'Yogyakarta',
    region: 'Daerah Istimewa Yogyakarta',
    country: 'ID',
  },
  // Isi dengan URL profil media sosial resmi (dipakai di footer & schema sameAs).
  social: [] as { name: string; url: string }[],
  postsPerPage: 12,
  defaultOgImage: '/og-default.png',
  logo: '/logo.png',
} as const;

export const CATEGORIES = [
  { slug: 'peristiwa', name: 'Peristiwa', description: 'Kabar peristiwa dan kejadian terkini di wilayah Daerah Istimewa Yogyakarta.' },
  { slug: 'pemerintahan', name: 'Pemerintahan', description: 'Kebijakan, layanan publik, dan kabar pemerintahan Pemda DIY serta kabupaten/kota.' },
  { slug: 'ekonomi', name: 'Ekonomi', description: 'Ekonomi, UMKM, harga, dan dunia usaha di Yogyakarta.' },
  { slug: 'wisata', name: 'Wisata', description: 'Destinasi, panduan, dan kabar pariwisata di Jogja.' },
  { slug: 'budaya', name: 'Budaya', description: 'Tradisi, seni, dan warisan budaya Keraton dan masyarakat Yogyakarta.' },
  { slug: 'pendidikan', name: 'Pendidikan', description: 'Kabar sekolah, kampus, dan dunia pendidikan di Kota Pelajar.' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];

/**
 * Kredit pengembang. Link yang dikosongkan ('') tidak ditampilkan.
 * Isi url/linkedin/github dengan alamat asli sebelum situs tayang.
 */
export const CREDIT = {
  name: 'Yuda Prima Jasa',
  path: '/kredit/',
  url: '',
  linkedin: '',
  github: '',
};

export const FOOTER_LINKS = [
  { href: '/tentang/', label: 'Tentang Kami' },
  { href: '/redaksi/', label: 'Redaksi' },
  { href: '/pedoman-media-siber/', label: 'Pedoman Media Siber' },
  { href: '/kebijakan-privasi/', label: 'Kebijakan Privasi' },
  { href: '/kontak/', label: 'Kontak' },
];
