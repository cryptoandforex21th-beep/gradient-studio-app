/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Vary',
            value: 'Accept'
          },
          {
            key: 'Link',
            value: '</llms.txt>; rel="llms-txt", </openapi.json>; rel="service-desc", </.well-known/mcp>; rel="mcp", </docs>; rel="service-doc"'
          },
          {
            key: 'X-API-Version',
            value: '2026-10-01'
          },
          {
            key: 'API-Version',
            value: 'v1'
          },
          {
            key: 'RateLimit-Limit',
            value: '120'
          },
          {
            key: 'RateLimit-Remaining',
            value: '119'
          },
          {
            key: 'RateLimit-Reset',
            value: '60'
          },
          {
            key: 'RateLimit-Policy',
            value: '120;w=60'
          },
          {
            key: 'X-RateLimit-Limit',
            value: '120'
          },
          {
            key: 'X-RateLimit-Remaining',
            value: '119'
          },
          {
            key: 'X-RateLimit-Reset',
            value: '60'
          }
        ]
      }
    ];
  },
  async rewrites() {
    return [
      {
        source: '/.well-known/mcp',
        destination: '/api/mcp'
      },
      {
        source: '/.well-known/mcp.json',
        destination: '/api/mcp'
      },
      {
        source: '/.well-known/agent-instructions.md',
        destination: '/agent-instructions.md'
      },
      {
        source: '/agents.md',
        destination: '/agent-instructions.md'
      },
      {
        source: '/api/openapi.json',
        destination: '/openapi.json'
      },
      {
        source: '/v1/openapi.json',
        destination: '/openapi.json'
      },
      {
        source: '/v1/:path*',
        destination: '/api/v1/:path*'
      },
      {
        source: '/developers',
        destination: '/docs'
      }
    ];
  }
};

export default nextConfig;
