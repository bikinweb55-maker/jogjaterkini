import type { APIRoute } from 'astro';
import { SITE } from '@/site.config';

export const GET: APIRoute = () => {
  const body = `# robots.txt — ${SITE.name}
User-agent: *
Allow: /
Disallow: /cari/?

Sitemap: ${SITE.url}/sitemap.xml
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
