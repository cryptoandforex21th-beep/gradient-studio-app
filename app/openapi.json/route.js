import { getOpenApiSpec } from '../../lib/agentContent';

export async function GET() {
  return new Response(JSON.stringify(getOpenApiSpec(), null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
}
