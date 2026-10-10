import { PROJECTS_CATALOG, SITE_URL } from '../../../../../lib/agentContent.js';
import {
  API_VERSION,
  createApiErrorResponse,
  createApiSuccessResponse,
  getStandardApiHeaders
} from '../../../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const url = new URL(request.url);
  const projectId = String(params?.projectId || '').toLowerCase();

  const project = PROJECTS_CATALOG.find(
    (p) => p.id === projectId || p.slug === projectId
  );

  if (!project) {
    return createApiErrorResponse({
      status: 404,
      code: 'PROJECT_NOT_FOUND',
      title: 'Project Not Found',
      message: `Architectural project "${params?.projectId}" was not found in the GradiEnt Studio catalog.`,
      hint: `Valid projectId values are "lemukutan", "courtyard", "space", or "light". Call GET ${SITE_URL}/api/v1/projects to list all available projects.`,
      instance: url.pathname
    });
  }

  return createApiSuccessResponse({
    success: true,
    apiVersion: API_VERSION,
    project
  });
}

function methodNotAllowed(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    title: 'Method Not Allowed',
    message: `HTTP method ${request.method} is not supported on ${url.pathname}. This endpoint is strictly read-only.`,
    hint: `Use GET ${SITE_URL}${url.pathname} to retrieve project details.`,
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
