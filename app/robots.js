export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/about',
          '/contact',
          '/docs',
          '/privacy',
          '/terms',
          '/llms.txt',
          '/llms-full.txt',
          '/agent-instructions.md',
          '/openapi.json',
          '/.well-known/mcp'
        ],
        disallow: ['/admin', '/dashboard'],
      },
    ],
    host: 'https://gradientarch.tech',
    sitemap: 'https://gradientarch.tech/sitemap.xml',
  };
}
