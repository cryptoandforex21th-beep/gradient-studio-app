export async function POST(request) {
  try {
    const { name, contact, type, notes } = await request.json();

    if (!name || !contact) {
      return Response.json(
        { error: 'Nama dan kontak wajib diisi' },
        { status: 400 }
      );
    }

    const token = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_INQUIRIES_DB_ID;

    if (!token || !databaseId) {
      console.warn('Notion credentials not configured in environment.');
      return Response.json(
        { success: false, error: 'Notion configuration missing' },
        { status: 500 }
      );
    }

    const payload = {
      parent: { database_id: databaseId },
      properties: {
        'Client Name': {
          title: [{ text: { content: name } }],
        },
        'WhatsApp / Contact': {
          rich_text: [{ text: { content: contact } }],
        },
        'Project Category': {
          select: { name: type || 'Lainnya' },
        },
        'Notes / Details': {
          rich_text: [{ text: { content: notes || '-' } }],
        },
        'Status': {
          select: { name: '⏳ New Inquiry' },
        },
        'Date': {
          date: { start: new Date().toISOString() },
        },
      },
    };

    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error('Notion API error response:', data);
      return Response.json({ success: false, error: data.message || 'Gagal menyimpan ke Notion' }, { status: res.status });
    }

    return Response.json({ success: true, id: data.id });
  } catch (error) {
    console.error('Notion inquiry sync error:', error);
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
