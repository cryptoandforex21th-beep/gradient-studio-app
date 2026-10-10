import { SITE_URL } from '../../../lib/agentContent.js';
import { createApiErrorResponse, getStandardApiHeaders } from '../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

function handleNotFound(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 404,
    code: 'API_ENDPOINT_NOT_FOUND',
    title: 'API Endpoint Not Found',
    message: `The requested API endpoint "${url.pathname}" does not exist on GradiEnt Studio (${SITE_URL}).`,
    hint: `Available v1 endpoints: GET ${SITE_URL}/api/v1/projects, GET ${SITE_URL}/api/v1/projects/{projectId}, GET ${SITE_URL}/api/v1/services, GET ${SITE_URL}/api/v1/status, or POST ${SITE_URL}/.well-known/mcp. See ${SITE_URL}/openapi.json for the complete OpenAPI 3.1 specification.`,
    instance: url.pathname
  });
}

export async function GET(request) {
  return handleNotFound(request);
}

export async function POST(request) {
  return handleNotFound(request);
}

export async function PUT(request) {
  return handleNotFound(request);
}

export async function DELETE(request) {
  return handleNotFound(request);
}

export async function PATCH(request) {
  return handleNotFound(request);
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: getStandardApiHeaders()
  });
}
