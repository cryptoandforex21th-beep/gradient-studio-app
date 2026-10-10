import {
  STUDIO_INFO,
  STUDIO_SERVICES,
  WORKFLOW_STEPS,
  SITE_URL
} from '../../../../lib/agentContent.js';
import {
  API_VERSION,
  createApiErrorResponse,
  createApiSuccessResponse,
  getStandardApiHeaders
} from '../../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const url = new URL(request.url);
  const serviceId = url.searchParams.get('serviceId');

  if (serviceId) {
    const found = STUDIO_SERVICES.find(
      (s) => s.id === serviceId || s.number === serviceId
    );
    if (!found) {
      return createApiErrorResponse({
        status: 404,
        code: 'SERVICE_NOT_FOUND',
        title: 'Service Not Found',
        message: `Service "${serviceId}" does not exist in GradiEnt Studio.`,
        hint: `Valid serviceId values are: ${STUDIO_SERVICES.map((s) => s.id).join(', ')}. Omit serviceId to list all services.`,
        instance: url.pathname
      });
    }
    return createApiSuccessResponse({
      success: true,
      apiVersion: API_VERSION,
      studio: STUDIO_INFO.name,
      services: [found],
      workflow: WORKFLOW_STEPS
    });
  }

  return createApiSuccessResponse({
    success: true,
    apiVersion: API_VERSION,
    studio: STUDIO_INFO.name,
    services: STUDIO_SERVICES,
    workflow: WORKFLOW_STEPS
  });
}

function methodNotAllowed(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    title: 'Method Not Allowed',
    message: `HTTP method ${request.method} is not supported on ${url.pathname}. This endpoint is strictly read-only.`,
    hint: `Use GET ${SITE_URL}/api/v1/services to retrieve studio services and workflow.`,
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
