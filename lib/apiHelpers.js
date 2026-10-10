import { SITE_URL } from './agentContent.js';

export const API_VERSION = 'v1';
export const API_VERSION_DATE = '2026-10-01';

export const RATE_LIMIT_CONFIG = {
  limit: 120,
  remaining: 119,
  resetSeconds: 60,
  windowSeconds: 60
};

/**
 * Generates standard RFC RateLimit headers + X-RateLimit headers + API version headers.
 */
export function getStandardApiHeaders(extraHeaders = {}) {
  const { limit, remaining, resetSeconds, windowSeconds } = RATE_LIMIT_CONFIG;
  return {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'X-API-Version': API_VERSION_DATE,
    'API-Version': API_VERSION,
    'RateLimit-Limit': String(limit),
    'RateLimit-Remaining': String(remaining),
    'RateLimit-Reset': String(resetSeconds),
    'RateLimit-Policy': `${limit};w=${windowSeconds}`,
    'X-RateLimit-Limit': String(limit),
    'X-RateLimit-Remaining': String(remaining),
    'X-RateLimit-Reset': String(resetSeconds),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, X-API-Version',
    'Access-Control-Expose-Headers':
      'RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, RateLimit-Policy, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, Retry-After, X-API-Version, API-Version, Deprecation, Sunset',
    ...extraHeaders
  };
}

/**
 * Builds a structured JSON error payload and HTTP Response compatible with both
 * RFC 9457 Problem Details and standard LLM/Agent JSON error conventions.
 */
export function buildErrorPayload({
  status = 400,
  code = 'BAD_REQUEST',
  title = 'Bad Request',
  message = 'The request could not be processed.',
  hint = `Review the OpenAPI 3.1 specification at ${SITE_URL}/openapi.json and developer docs at ${SITE_URL}/docs.`,
  instance = '/api/v1'
}) {
  return {
    success: false,
    type: `${SITE_URL}/docs#error-${code.toLowerCase().replace(/_/g, '-')}`,
    title,
    status,
    code,
    message,
    detail: message,
    hint,
    resolution: hint,
    instance,
    documentation_url: `${SITE_URL}/docs`,
    openapi_url: `${SITE_URL}/openapi.json`,
    timestamp: new Date().toISOString(),
    error: {
      code,
      message,
      status,
      hint,
      resolution: hint,
      documentation_url: `${SITE_URL}/docs`
    }
  };
}

export function createApiErrorResponse({
  status = 400,
  code = 'BAD_REQUEST',
  title = 'Bad Request',
  message = 'The request could not be processed.',
  hint,
  instance = '/api/v1',
  extraHeaders = {}
}) {
  const payload = buildErrorPayload({ status, code, title, message, hint, instance });
  const headers = getStandardApiHeaders({
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...(status === 429 ? { 'Retry-After': String(RATE_LIMIT_CONFIG.resetSeconds) } : {}),
    ...extraHeaders
  });

  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers
  });
}

export function createApiSuccessResponse(data, extraHeaders = {}, status = 200) {
  const headers = getStandardApiHeaders(extraHeaders);
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers
  });
}
