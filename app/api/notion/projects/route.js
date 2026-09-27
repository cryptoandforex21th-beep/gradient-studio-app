export const dynamic = 'force-dynamic';

const DEFAULT_PROJECTS = [
  { id: '01', title: 'House for\nthe Long View', tag: 'Built', loc: 'Makassar, ID / 2025', bg: '#172326' },
  { id: '02', title: 'Salt\nLibrary', tag: 'In Progress', loc: 'South Sulawesi, ID / 2025', bg: '#2b3b3e' },
  { id: '03', title: 'Parametric\nCanopy', tag: 'Research', loc: 'Rhino & Grasshopper / 2024', bg: '#223035' },
  { id: '04', title: 'The Quiet\nWorkshop', tag: 'Built', loc: 'Gowa, ID / 2024', bg: '#172326' },
];

export async function GET() {
  try {
    const token = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_PROJECTS_DB_ID;

    if (!token || !databaseId) {
      return Response.json({ success: true, projects: DEFAULT_PROJECTS, source: 'fallback_no_config' });
    }

    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
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
      return Response.json({ success: true, projects: DEFAULT_PROJECTS, source: 'fallback' });
    }

    const data = await res.json();
    const results = data.results || [];

    if (results.length === 0) {
      return Response.json({ success: true, projects: DEFAULT_PROJECTS, source: 'fallback_empty' });
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

    return Response.json({
      success: true,
      projects,
      source: 'notion',
    });
  } catch (error) {
    console.error('Notion fetch projects error:', error);
    return Response.json({
      success: true,
      projects: DEFAULT_PROJECTS,
      source: 'fallback',
      error: error.message,
    });
  }
}
