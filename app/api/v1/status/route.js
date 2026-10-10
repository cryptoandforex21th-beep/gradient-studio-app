import { SITE_URL, STUDIO_INFO } from '../../../../lib/agentContent.js';
import {
  API_VERSION,
  API_VERSION_DATE,
  RATE_LIMIT_CONFIG,
  createApiErrorResponse,
  createApiSuccessResponse,
  getStandardApiHeaders
} from '../../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  return createApiSuccessResponse({
    success: true,
    status: 'operational',
    studio: STUDIO_INFO.name,
    canonicalUrl: SITE_URL,
    apiVersion: API_VERSION,
    apiVersionDate: API_VERSION_DATE,
    deprecationPolicy: {
      strategy: 'URL path versioning (/api/v1/*) and X-API-Version header (2026-10-01)',
      minimumNoticeDays: 180,
      headers: ['Deprecation', 'Sunset', 'Link'],
      policyUrl: `${SITE_URL}/docs#versioning-and-deprecation`
    },
    rateLimits: {
      limitPerWindow: RATE_LIMIT_CONFIG.limit,
      windowSeconds: RATE_LIMIT_CONFIG.windowSeconds,
      headers: ['RateLimit-Limit', 'RateLimit-Remaining', 'RateLimit-Reset', 'RateLimit-Policy', 'Retry-After']
    },
    cli: {
      binaryName: 'gradient-studio',
      npxCommand: 'npx github:cryptoandforex21th-beep/gradient-studio-app',
      repositoryUrl: 'https://github.com/cryptoandforex21th-beep/gradient-studio-app'
    },
    endpoints: {
      openapi: `${SITE_URL}/openapi.json`,
      mcp: `${SITE_URL}/.well-known/mcp`,
      docs: `${SITE_URL}/docs`,
      llmsTxt: `${SITE_URL}/llms.txt`,
      projects: `${SITE_URL}/api/v1/projects`,
      services: `${SITE_URL}/api/v1/services`
    }
  });
}

function methodNotAllowed(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    title: 'Method Not Allowed',
    message: `HTTP method ${request.method} is not supported on ${url.pathname}.`,
    hint: `Use GET ${SITE_URL}/api/v1/status to check API health and versioning metadata.`,
    instance: url.pathname,
    extraHeaders: { Allow: 'GET, OPTIONS' }
  });
}

export async function POST(request) {
  return methodNotAllowed(request);
}

export async function PUT(request) {
  return methodNotAllowed(request);
}

export async function DELETE(request) {
  return methodNotAllowed(request);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getStandardApiHeaders({ Allow: 'GET, OPTIONS' })
  });
}
