// Membuat gambar placeholder (cover berita, OG default, logo). Ganti dengan foto asli sebelum produksi.
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const covers = [
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

function svg(w, h, label, c1, c2, sub = 'jogjaterkini.net') {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
  <pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="2"/></pattern></defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#p)"/>
  <text x="50%" y="30%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(w / 14)}" font-weight="700" fill="#fff">${esc(label)}</text>
  <text x="50%" y="38%" text-anchor="middle" font-family="Arial, sans-serif" font-size="${Math.round(w / 40)}" fill="#fff" fill-opacity=".8">${esc(sub)}</text>
</svg>`);
}

mkdirSync('src/assets/berita', { recursive: true });
for (const [slug, label, c1, c2] of covers) {
  await sharp(svg(1600, 900, label, c1, c2)).jpeg({ quality: 82 }).toFile(`src/assets/berita/${slug}.jpg`);
}

// Cover default: dipakai otomatis saat berita tidak mengisi `cover`.
// Teks ditaruh di tengah dan bertumpuk supaya tetap utuh saat dipotong 1:1, 4:5, atau 21:9.
function defaultCoverSvg(w = 1600, h = 900) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#10231c"/><stop offset="1" stop-color="#1f4a3d"/></linearGradient>
  <pattern id="p" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M24 4 L44 24 L24 44 L4 24 Z" fill="none" stroke="#fff" stroke-opacity=".07" stroke-width="2"/></pattern></defs>
  <rect width="100%" height="100%" fill="url(#g)"/><rect width="100%" height="100%" fill="url(#p)"/>
  <g text-anchor="middle" fill="#f3efe6" font-family="Georgia, 'DejaVu Serif', serif" font-weight="700" font-size="136">
    <text x="${w / 2}" y="${h / 2 - 65}">Jogja</text>
    <text x="${w / 2}" y="${h / 2 + 75}" font-style="italic" fill="#e3c474">Terkini</text>
  </g>
  <rect x="${w / 2 - 60}" y="${h / 2 + 115}" width="120" height="3" fill="#b8923a"/>
  <text x="${w / 2}" y="${h / 2 + 171}" text-anchor="middle" font-family="Arial, 'DejaVu Sans', sans-serif" font-size="30" letter-spacing="6" fill="#f3efe6" fill-opacity=".8">BERITA TERKINI YOGYAKARTA</text>
</svg>`);
}
mkdirSync('src/assets', { recursive: true });
await sharp(defaultCoverSvg()).jpeg({ quality: 85 }).toFile('src/assets/cover-default.jpg');

await sharp(svg(1200, 630, 'Jogja Terkini', '#10231c', '#1f4a3d', 'Berita Terkini Yogyakarta')).png().toFile('public/og-default.png');

const mark = (size) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="8" fill="#10231c"/><rect x="4" y="4" width="56" height="56" rx="5" fill="none" stroke="#b8923a" stroke-width="1.5"/>
  <text x="32" y="43" text-anchor="middle" font-family="Georgia, serif" font-size="30" font-style="italic" font-weight="700" fill="#f3efe6">JT</text></svg>`);
await sharp(mark(512)).png().toFile('public/logo.png');
await sharp(mark(180)).png().toFile('public/apple-touch-icon.png');
console.log('Placeholder selesai dibuat.');
