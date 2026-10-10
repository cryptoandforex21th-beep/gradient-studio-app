import { getOpenApiSpec } from '../../lib/agentContent.js';
import { getStandardApiHeaders } from '../../lib/apiHelpers.js';

export async function GET() {
  return new Response(JSON.stringify(getOpenApiSpec(), null, 2), {
    status: 200,
    headers: getStandardApiHeaders({
      Vary: 'Accept'
    })
  });
}
