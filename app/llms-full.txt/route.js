import { getLlmsFullTxt } from '../../lib/agentContent';

export async function GET(request) {
  const accept = (request.headers.get('accept') || '').toLowerCase();
  const contentType = accept.includes('text/markdown')
    ? 'text/markdown; charset=utf-8'
    : 'text/plain; charset=utf-8';

  return new Response(getLlmsFullTxt(), {
    status: 200,
    headers: {
      'Content-Type': contentType,
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
}
