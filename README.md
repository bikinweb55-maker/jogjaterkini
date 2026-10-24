# Jogja Terkini — jogjaterkini.net

Blog berita Yogyakarta berbasis Astro 7 (static site): SEO friendly, responsif, dengan schema JSON-LD, sitemap, dan robots.txt.

## Perintah

```bash
npm install        # pasang dependency
npm run dev        # server lokal http://localhost:4321
npm run build      # build ke ./dist
npm run preview    # pratinjau hasil build
npm run check      # type-check
```

## Struktur

```
src/
├── site.config.ts        # nama situs, domain, kategori, link footer  ← mulai dari sini
├── content.config.ts     # skema artikel & penulis
├── content/berita/*.md   # artikel (1 file = 1 berita)
├── data/penulis.json     # daftar penulis
├── assets/berita/        # gambar cover (dioptimasi otomatis)
├── components/           # Header, Footer, ArticleCard, Breadcrumb, dll
├── layouts/              # BaseLayout, ArchiveLayout, PageLayout
├── lib/                  # helper berita, schema JSON-LD, sitemap
├── styles/global.css     # design tokens & gaya dasar
└── pages/                # rute halaman + endpoint sitemap/robots/rss
```

## Menambah Berita

Buat file `src/content/berita/judul-berita.md` (nama file = slug URL):

```markdown
---
title: "Judul berita maksimal 110 karakter"
description: "Ringkasan 50–170 karakter, dipakai untuk meta description & lead."
pubDate: 2026-10-14T09:00:00+07:00
updatedDate: 2026-10-14T12:00:00+07:00   # opsional
category: wisata          # peristiwa | pemerintahan | ekonomi | wisata | budaya | pendidikan
tags: ["Malioboro", "Wisata Jogja"]
author: redaksi           # id dari src/data/penulis.json
location: Sleman          # opsional, tampil sebagai dateline
cover: ../../assets/berita/judul-berita.jpg   # opsional
coverAlt: "Deskripsi gambar"                 # opsional, isi kalau pakai cover
coverCaption: "Foto: Nama Fotografer"   # opsional
featured: false           # true = jadi headline beranda
draft: false
---

Isi berita dalam Markdown...
```

Gunakan cover minimal **1600×900 px**. Kalau belum punya foto, hapus saja baris `cover`, `coverAlt`, dan `coverCaption`: berita otomatis memakai gambar default bertuliskan Jogja Terkini (`src/assets/cover-default.jpg`). Setelah menambah berita, build ulang dan deploy agar sitemap dan RSS ikut diperbarui.


## Lisensi

MIT. Bebas dipakai, diubah, dan disebarkan, termasuk untuk keperluan komersial. Lihat [LICENSE](LICENSE).

## Deploy

Langkah lengkap dari awal ada di [catatan-deploy.md](catatan-deploy.md).

Hosting di Vercel. Hubungkan ke repo GitHub baru, lalu atur domain `jogjaterkini.net`.

- Push ke `main` → otomatis build & deploy **production**.
- Push ke branch lain → **preview** deployment (otomatis `noindex`).
- Pastikan `git config user.email` dan SSH key sudah memakai akun yang benar sebelum commit.
