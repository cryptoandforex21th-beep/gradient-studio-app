import { PROJECTS_CATALOG, SITE_URL } from '../../../../lib/agentContent.js';
import {
  API_VERSION,
  createApiErrorResponse,
  createApiSuccessResponse,
  getStandardApiHeaders
} from '../../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

const VALID_CATEGORIES = new Set(['all', 'architecture', 'research']);

export async function GET(request) {
  const url = new URL(request.url);
  const category = (url.searchParams.get('category') || 'all').toLowerCase();

  if (url.searchParams.get('simulate_rate_limit') === '1') {
    return createApiErrorResponse({
      status: 429,
      code: 'RATE_LIMIT_EXCEEDED',
      title: 'Too Many Requests',
      message: 'Rate limit of 120 requests per minute exceeded.',
      hint: 'Wait for the duration specified in the Retry-After header (60 seconds) before retrying.',
      instance: url.pathname
    });
  }

  if (!VALID_CATEGORIES.has(category)) {
    return createApiErrorResponse({
      status: 400,
      code: 'INVALID_CATEGORY_PARAMETER',
      title: 'Invalid Query Parameter',
      message: `Invalid category "${category}". Allowed values are: all, architecture, research.`,
      hint: `Retry with ?category=all, ?category=architecture, or ?category=research. See ${SITE_URL}/openapi.json for full schema.`,
      instance: url.pathname
    });
  }

  const projects =
    category === 'all'
      ? PROJECTS_CATALOG
      : PROJECTS_CATALOG.filter((p) => p.category === category);

  return createApiSuccessResponse({
    success: true,
    apiVersion: API_VERSION,
    count: projects.length,
    category,
    projects
  });
}

function methodNotAllowed(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    title: 'Method Not Allowed',
    message: `HTTP method ${request.method} is not supported on ${url.pathname}. This endpoint is strictly read-only.`,
    hint: `Use GET ${SITE_URL}/api/v1/projects to list architectural projects.`,
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

export async function PATCH(request) {
  return methodNotAllowed(request);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getStandardApiHeaders({ Allow: 'GET, OPTIONS' })
  });
}
