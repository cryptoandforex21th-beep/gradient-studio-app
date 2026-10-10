import { getAgentInstructionsMd } from '../../lib/agentContent';

export async function GET() {
  return new Response(getAgentInstructionsMd(), {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate'
    }
  });
}
