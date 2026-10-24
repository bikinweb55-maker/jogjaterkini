import { defineMdastPlugin } from 'satteri';

/**
 * Membuang komentar HTML (<!-- ... -->) dari isi berita saat build,
 * supaya catatan editor di file .md tidak ikut tampil di sumber halaman.
 */
export default defineMdastPlugin({
  name: 'strip-html-comments',
  html(node, ctx) {
    if (/^\s*<!--[\s\S]*-->\s*$/.test(node.value ?? '')) ctx.removeNode(node);
  },
});
