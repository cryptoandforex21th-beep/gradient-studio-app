import { NextResponse } from 'next/server';
import {
  SITE_URL,
  getHomeMarkdown,
  getAboutMarkdown,
  getContactMarkdown,
  getPrivacyMarkdown,
  getTermsMarkdown,
  getDocsMarkdown,
  getNotFoundMarkdown,
  getLlmsTxt,
  getLlmsFullTxt,
  getAgentInstructionsMd
} from './lib/agentContent.js';
import { buildErrorPayload, getStandardApiHeaders } from './lib/apiHelpers.js';

const MARKDOWN_ROUTES = {
  '/': getHomeMarkdown,
  '/index.html': getHomeMarkdown,
  '/index.md': getHomeMarkdown,
  '/about': getAboutMarkdown,
  '/about.md': getAboutMarkdown,
  '/contact': getContactMarkdown,
  '/contact.md': getContactMarkdown,
  '/privacy': getPrivacyMarkdown,
  '/privacy.md': getPrivacyMarkdown,
  '/terms': getTermsMarkdown,
  '/terms.md': getTermsMarkdown,
  '/docs': getDocsMarkdown,
  '/docs.md': getDocsMarkdown,
  '/developers': getDocsMarkdown,
  '/llms.txt': getLlmsTxt,
  '/llms-full.txt': getLlmsFullTxt,
  '/agent-instructions.md': getAgentInstructionsMd,
  '/.well-known/agent-instructions.md': getAgentInstructionsMd,
  '/agents.md': getAgentInstructionsMd
};

const PORTAL_ROUTES = new Set(['/login', '/register', '/dashboard', '/admin', '/jarvis']);

const PASSTHROUGH_EXACT = new Set([
  '/openapi.json',
  '/api/openapi.json',
  '/v1/openapi.json',
  '/.well-known/mcp',
  '/.well-known/mcp.json',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.ico',
  '/icon.png',
  '/logo.png',
  '/brand-logo.png',
  '/brand-logo-transparent.png',
  '/gradient_studio_logo.jpg',
  '/styles.css',
  '/preview-lemukutan.html',
  '/google7102d1f81dd26d5b.html'
]);

const KNOWN_API_PREFIXES = [
  '/api/v1/projects',
  '/api/v1/services',
  '/api/v1/status',
  '/api/notion/projects',
  '/api/notion/inquiry',
  '/api/mcp',
  '/api/jarvis/command',
  '/api/jarvis/graph',
  '/api/jarvis/status',
  '/api/telegram-webhook'
];

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function isKnownApiRoute(normPath) {
  for (const prefix of KNOWN_API_PREFIXES) {
    if (normPath === prefix || normPath.startsWith(`${prefix}/`)) {
      return true;
    }
  }
  return false;
}

function isStaticOrApiAsset(pathname) {
  if (PASSTHROUGH_EXACT.has(pathname)) return true;
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/v1/') ||
    pathname.startsWith('/assets/') ||
    pathname.startsWith('/renders/') ||
    pathname.startsWith('/backgrounds/')
  ) {
    return true;
  }
  return false;
}

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const normPath = normalizePath(pathname);
  const accept = (request.headers.get('accept') || '').toLowerCase();
  const wantsMarkdown =
    accept.includes('text/markdown') ||
    accept.includes('text/x-markdown') ||
    accept.includes('application/markdown');
  const wantsJsonOnly =
    (accept.includes('application/json') || accept.includes('application/problem+json')) &&
    !accept.includes('text/html') &&
    !wantsMarkdown;

  // Rewrite MCP well-known aliases directly to /api/mcp
  if (normPath === '/.well-known/mcp' || normPath === '/.well-known/mcp.json') {
    const url = request.nextUrl.clone();
    url.pathname = '/api/mcp';
    return NextResponse.rewrite(url);
  }

  // Rewrite /v1/* aliases to /api/v1/*
  if (normPath === '/v1' || normPath.startsWith('/v1/')) {
    if (normPath === '/v1/openapi.json') {
      const url = request.nextUrl.clone();
      url.pathname = '/openapi.json';
      return NextResponse.rewrite(url);
    }
    const rewrittenApiPath = normPath === '/v1' ? '/api/v1/status' : `/api${normPath}`;
    if (!isKnownApiRoute(rewrittenApiPath)) {
      const payload = buildErrorPayload({
        status: 404,
        code: 'API_ENDPOINT_NOT_FOUND',
        title: 'API Endpoint Not Found',
        message: `The requested API endpoint "${pathname}" does not exist on GradiEnt Studio (${SITE_URL}).`,
        hint: `Available v1 endpoints: GET ${SITE_URL}/api/v1/projects, GET ${SITE_URL}/api/v1/projects/{projectId}, GET ${SITE_URL}/api/v1/services, GET ${SITE_URL}/api/v1/status. Full schema at ${SITE_URL}/openapi.json.`,
        instance: pathname
      });
      return new NextResponse(JSON.stringify(payload, null, 2), {
        status: 404,
        headers: getStandardApiHeaders({ 'Cache-Control': 'no-store' })
      });
    }
    const url = request.nextUrl.clone();
    url.pathname = rewrittenApiPath;
    return NextResponse.rewrite(url);
  }

  // Handle unknown /api/* routes directly with structured JSON 404 error
  if (normPath === '/api' || (normPath.startsWith('/api/') && normPath !== '/api/openapi.json')) {
    if (!isKnownApiRoute(normPath)) {
      const payload = buildErrorPayload({
        status: 404,
        code: 'API_ENDPOINT_NOT_FOUND',
        title: 'API Endpoint Not Found',
        message: `The requested API endpoint "${pathname}" does not exist on GradiEnt Studio (${SITE_URL}).`,
        hint: `Available v1 endpoints: GET ${SITE_URL}/api/v1/projects, GET ${SITE_URL}/api/v1/projects/{projectId}, GET ${SITE_URL}/api/v1/services, GET ${SITE_URL}/api/v1/status. Full schema at ${SITE_URL}/openapi.json.`,
        instance: pathname
      });
      return new NextResponse(JSON.stringify(payload, null, 2), {
        status: 404,
        headers: getStandardApiHeaders({ 'Cache-Control': 'no-store' })
      });
    }
  }

  // Serve dedicated agent-instructions aliases
  if (normPath === '/.well-known/agent-instructions.md' || normPath === '/agents.md') {
    return new NextResponse(getAgentInstructionsMd(), {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'RateLimit-Limit': '120',
        'RateLimit-Remaining': '119',
        'RateLimit-Reset': '60',
        'RateLimit-Policy': '120;w=60'
      }
    });
  }

  // Explicit .md URL suffix requests
  if (normPath.endsWith('.md') && MARKDOWN_ROUTES[normPath]) {
    return new NextResponse(MARKDOWN_ROUTES[normPath](), {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'public, max-age=0, must-revalidate',
        'RateLimit-Limit': '120',
        'RateLimit-Remaining': '119',
        'RateLimit-Reset': '60',
        'RateLimit-Policy': '120;w=60'
      }
    });
  }

  // Content negotiation when Accept: text/markdown is requested
  if (wantsMarkdown) {
    if (MARKDOWN_ROUTES[normPath]) {
      return new NextResponse(MARKDOWN_ROUTES[normPath](), {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'Cache-Control': 'public, max-age=0, must-revalidate',
          'RateLimit-Limit': '120',
          'RateLimit-Remaining': '119',
          'RateLimit-Reset': '60',
          'RateLimit-Policy': '120;w=60'
        }
      });
    }

    if (PORTAL_ROUTES.has(normPath)) {
      const portalMd = `# GradiEnt Studio Client & Admin Portal (${normPath})\n\nThis interactive authentication and project management route on **GradiEnt Studio** (\`${SITE_URL}${normPath}\`) uses Supabase Auth.\n\n- **Homepage:** [${SITE_URL}/](${SITE_URL}/)\n- **Developer & API Docs:** [${SITE_URL}/docs](${SITE_URL}/docs)\n- **LLMs Manifest:** [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt)\n- **Contact Studio:** [${SITE_URL}/contact](${SITE_URL}/contact)\n`;
      return new NextResponse(portalMd, {
        status: 200,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'Cache-Control': 'no-store'
        }
      });
    }

    if (!isStaticOrApiAsset(normPath)) {
      return new NextResponse(getNotFoundMarkdown(pathname), {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown; charset=utf-8',
          Vary: 'Accept',
          'Cache-Control': 'no-store',
          'RateLimit-Limit': '120',
          'RateLimit-Remaining': '119',
          'RateLimit-Reset': '60',
          'RateLimit-Policy': '120;w=60'
        }
      });
    }
  }

  // When an API client requests a nonexistent route with Accept: application/json
  if (wantsJsonOnly && !MARKDOWN_ROUTES[normPath] && !PORTAL_ROUTES.has(normPath) && !isStaticOrApiAsset(normPath)) {
    const payload = buildErrorPayload({
      status: 404,
      code: 'RESOURCE_NOT_FOUND',
      title: 'Resource Not Found',
      message: `The requested path "${pathname}" does not exist on GradiEnt Studio (${SITE_URL}).`,
      hint: `Check ${SITE_URL}/openapi.json for valid API endpoints or ${SITE_URL}/llms.txt for documentation.`,
      instance: pathname
    });
    return new NextResponse(JSON.stringify(payload, null, 2), {
      status: 404,
      headers: getStandardApiHeaders({ Vary: 'Accept', 'Cache-Control': 'no-store' })
    });
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept, rsc, next-router-state-tree, next-router-prefetch');
  response.headers.set('RateLimit-Limit', '120');
  response.headers.set('RateLimit-Remaining', '119');
  response.headers.set('RateLimit-Reset', '60');
  response.headers.set('RateLimit-Policy', '120;w=60');
  response.headers.set('X-RateLimit-Limit', '120');
  response.headers.set('X-RateLimit-Remaining', '119');
  response.headers.set('X-RateLimit-Reset', '60');
  response.headers.set('X-API-Version', '2026-10-01');
  response.headers.set('API-Version', 'v1');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
