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
} from './lib/agentContent';

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

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

function isStaticOrApiAsset(pathname) {
  if (PASSTHROUGH_EXACT.has(pathname)) return true;
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
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

  // Rewrite MCP well-known aliases directly to /api/mcp
  if (normPath === '/.well-known/mcp' || normPath === '/.well-known/mcp.json') {
    const url = request.nextUrl.clone();
    url.pathname = '/api/mcp';
    return NextResponse.rewrite(url);
  }

  // Serve dedicated agent-instructions aliases
  if (normPath === '/.well-known/agent-instructions.md' || normPath === '/agents.md') {
    return new NextResponse(getAgentInstructionsMd(), {
      status: 200,
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        Vary: 'Accept',
        'Cache-Control': 'public, max-age=0, must-revalidate'
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
        'Cache-Control': 'public, max-age=0, must-revalidate'
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
          'Cache-Control': 'public, max-age=0, must-revalidate'
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
          'Cache-Control': 'no-store'
        }
      });
    }
  }

  const response = NextResponse.next();
  response.headers.set('Vary', 'Accept, rsc, next-router-state-tree, next-router-prefetch');
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};
