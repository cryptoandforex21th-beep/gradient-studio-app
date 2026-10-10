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
            value: '</llms.txt>; rel="llms-txt", </openapi.json>; rel="service-desc", </.well-known/mcp>; rel="mcp"'
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
        source: '/developers',
        destination: '/docs'
      }
    ];
  }
};

export default nextConfig;
