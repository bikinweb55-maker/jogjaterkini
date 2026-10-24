// @ts-check
import { defineConfig } from 'astro/config';
import { satteri } from '@astrojs/markdown-satteri';
import stripComments from './src/lib/remark-strip-comments.mjs';

export default defineConfig({
  site: 'https://jogjaterkini.net',
  trailingSlash: 'always',
  // Astro 7 default 'jsx' membuang spasi antar elemen inline; pakai perilaku lama agar teks aman.
  compressHTML: true,
  markdown: {
    processor: satteri({ mdastPlugins: [stripComments] }),
  },
  build: {
    format: 'directory',
  },
});
