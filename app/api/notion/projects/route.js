import { SITE_URL } from '../../../../lib/agentContent.js';
import {
  createApiErrorResponse,
  createApiSuccessResponse,
  getStandardApiHeaders
} from '../../../../lib/apiHelpers.js';

export const dynamic = 'force-dynamic';

const DEFAULT_PROJECTS = [
  { id: '01', title: 'House for\nthe Long View', tag: 'Built', loc: 'Makassar, ID / 2025', bg: '#172326' },
  { id: '02', title: 'Salt\nLibrary', tag: 'In Progress', loc: 'South Sulawesi, ID / 2025', bg: '#2b3b3e' },
  { id: '03', title: 'Parametric\nCanopy', tag: 'Research', loc: 'Rhino & Grasshopper / 2024', bg: '#223035' },
  { id: '04', title: 'The Quiet\nWorkshop', tag: 'Built', loc: 'Gowa, ID / 2024', bg: '#172326' },
];

const DEPRECATION_HEADERS = {
  Deprecation: '@1767225600',
  Sunset: 'Fri, 31 Dec 2027 23:59:59 GMT',
  Link: `<${SITE_URL}/api/v1/projects>; rel="successor-version", <${SITE_URL}/docs#versioning-and-deprecation>; rel="deprecation"`
};

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const format = url.searchParams.get('format');
    if (format && format !== 'json') {
      return createApiErrorResponse({
        status: 400,
        code: 'UNSUPPORTED_FORMAT',
        title: 'Unsupported Format Parameter',
        message: `Format "${format}" is not supported on this endpoint. Only "json" is supported.`,
        hint: `Omit the format parameter or use ?format=json, or upgrade to GET ${SITE_URL}/api/v1/projects.`,
        instance: url.pathname,
        extraHeaders: DEPRECATION_HEADERS
      });
    }

    const token = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_PROJECTS_DB_ID;

    if (!token || !databaseId) {
      return createApiSuccessResponse(
        { success: true, projects: DEFAULT_PROJECTS, source: 'fallback_no_config' },
        DEPRECATION_HEADERS
      );
    }

    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        filter: {
          property: 'Published',
          checkbox: {
            equals: true,
          },
        },
        sorts: [
          {
            property: 'Order',
            direction: 'ascending',
          },
        ],
      }),
      cache: 'no-store'
    });

    if (!res.ok) {
      console.warn('Notion API query error, using fallback:', res.status);
      return createApiSuccessResponse(
        { success: true, projects: DEFAULT_PROJECTS, source: 'fallback' },
        DEPRECATION_HEADERS
      );
    }

    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      return createApiSuccessResponse(
        { success: true, projects: DEFAULT_PROJECTS, source: 'fallback_empty' },
        DEPRECATION_HEADERS
      );
    }

    const projects = results.map((page, idx) => {
      const props = page.properties;
      const title = props['Title']?.title[0]?.plain_text || 'Untitled Project';
      const pid = props['Project ID']?.rich_text[0]?.plain_text || String(idx + 1).padStart(2, '0');
      const tag = props['Status / Tag']?.select?.name || 'Built';
      const loc = props['Location / Year']?.rich_text[0]?.plain_text || '';
      const bg = props['Background Color']?.rich_text[0]?.plain_text || '#172326';

      return {
        id: pid,
        title,
        tag,
        loc,
        bg,
      };
    });

    return createApiSuccessResponse(
      {
        success: true,
        projects,
        source: 'notion',
      },
      DEPRECATION_HEADERS
    );
  } catch (error) {
    console.error('Notion fetch projects error:', error);
    return createApiSuccessResponse(
      {
        success: true,
        projects: DEFAULT_PROJECTS,
        source: 'fallback',
        error: error.message,
      },
      DEPRECATION_HEADERS
    );
  }
}

function methodNotAllowed(request) {
  const url = new URL(request.url);
  return createApiErrorResponse({
    status: 405,
    code: 'METHOD_NOT_ALLOWED',
    title: 'Method Not Allowed',
    message: `HTTP method ${request.method} is not supported on ${url.pathname}.`,
    hint: `Use GET ${SITE_URL}/api/v1/projects (preferred) or GET ${SITE_URL}/api/notion/projects.`,
    instance: url.pathname,
    extraHeaders: { Allow: 'GET, OPTIONS', ...DEPRECATION_HEADERS }
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
    headers: getStandardApiHeaders({ Allow: 'GET, OPTIONS', ...DEPRECATION_HEADERS })
  });
}
