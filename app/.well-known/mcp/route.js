import {
  handleMcpGet,
  handleMcpPost,
  handleMcpDelete,
  handleMcpOptions
} from '../../../lib/mcpServer';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  return handleMcpGet(request);
}

export async function POST(request) {
  return handleMcpPost(request);
}

export async function DELETE(request) {
  return handleMcpDelete(request);
}

export async function OPTIONS(request) {
  return handleMcpOptions(request);
}
