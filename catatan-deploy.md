# Catatan Deploy — Jogja Terkini

Cara menayangkan situs ini di Vercel. Ikuti urut dari atas.

Yang perlu disiapkan:
- Git terpasang di komputer
- Akun GitHub
- Akun Vercel (daftar pakai akun GitHub supaya gampang)
- Akses ke pengaturan domain `jogjaterkini.net`

---

## 1. Upload ke GitHub

**Buat repo kosong dulu.** Di GitHub klik **New repository**, beri nama `jogjaterkini`, jangan centang apa-apa (README dan lainnya biarkan kosong), lalu **Create repository**. Salin alamat repo yang muncul.

**Buka terminal di folder proyek ini**, lalu jalankan satu per satu:

```bash
git init -b main
git config user.name "Nama Kamu"
git config user.email "email-akun-github-kamu@contoh.com"
git add .
git commit -m "Awal"
git remote add origin ALAMAT_REPO
git push -u origin main
```

Ganti `Nama Kamu` dan `email-akun-github-kamu@contoh.com` dengan nama dan email akun GitHub kamu, dan `ALAMAT_REPO` dengan alamat repo tadi. Kalau diminta login GitHub, ikuti saja.

## 2. Tayangkan di Vercel

1. Buka vercel.com, klik **Add New → Project**.
2. Pilih repo `jogjaterkini`.
3. Langsung klik **Deploy**. Pengaturan lain tidak perlu diubah.
4. Tunggu 1–2 menit sampai muncul tulisan selamat. Situs sudah tayang di alamat sementara dari Vercel (berakhiran `.vercel.app`).

## 3. Pasang domain

1. Di Vercel buka project-nya, pilih **Settings → Domains**.
2. Ketik `jogjaterkini.net`, lalu klik **Add**.
3. Vercel akan menampilkan data yang harus dipasang di DNS domain. Buka tempat kamu membeli domain, masuk ke pengaturan DNS, lalu salin data itu persis seperti yang tertulis.
4. Tunggu. Bisa beberapa menit, kadang sampai beberapa jam. Kalau sudah benar, status di Vercel berubah hijau dan situs bisa dibuka di `https://jogjaterkini.net`.

Kalau Vercel menawarkan untuk menambah `www.jogjaterkini.net` juga, terima saja.

---

## Kalau gagal

- **Build gagal dan ada tulisan soal Node:** di Vercel buka **Settings → General → Node.js Version**, pilih **22.x** atau **24.x**, lalu deploy ulang dari tab **Deployments**.
- **Domain belum bisa dibuka:** tunggu dulu, lalu cek data DNS-nya sudah sama persis dengan yang tertulis di Vercel.
- **Gagal saat `git push`:** pastikan login GitHub-nya memakai akun pemilik repo.

---

## Isi contoh yang nanti diganti

Beberapa isi di situs ini masih contoh, supaya kelihatan seperti apa kalau sudah terisi. Ganti kapan saja setelah tayang, lalu push lagi seperti biasa.

- **Susunan redaksi:** nama penerbit, pemimpin redaksi, redaktur, reporter, dan alamat ada di `src/pages/redaksi.astro`.
- **Berita dan gambar:** 7 berita contoh ada di `src/content/berita/`, gambarnya di `src/assets/berita/`. Hapus atau timpa dengan berita sendiri.
