#!/usr/bin/env node

/**
 * GradiEnt Studio Official CLI (`gradient-studio`)
 * Architectural Design, Tropical Daylighting & 3D Spatial Modeling Platform
 * Canonical Endpoint: https://gradientarch.tech
 */

const BASE_URL = process.env.GRADIENT_STUDIO_URL || 'https://gradientarch.tech';

const HELP_TEXT = `
GradiEnt Studio CLI v1.2.0 — Architectural Design & 3D Spatial Modeling (https://gradientarch.tech)

Usage:
  gradient-studio <command> [options]

Commands:
  projects [--category <all|architecture|research>]   List architectural case studies & DED projects
  project <projectId>                                 Get detailed specs for a project (lemukutan, courtyard, space, light)
  services                                            List studio services and 4-stage design workflow
  status                                              Check API v1 health, rate limits, and deprecation policy
  mcp                                                 Inspect the Streamable HTTP MCP server manifest
  help                                                Show this help message

Options:
  --json                                              Output raw JSON for agent / script pipelines
  --version, -v                                       Print CLI version
  --help, -h                                          Show help
`;

async function fetchJson(pathname) {
  const res = await fetch(`${BASE_URL}${pathname}`, {
    headers: {
      Accept: 'application/json',
      'X-API-Version': '2026-10-01',
      'User-Agent': 'gradient-studio-cli/1.2.0'
    }
  });
  const data = await res.json();
  if (!res.ok) {
    console.error(JSON.stringify(data, null, 2));
    process.exit(1);
  }
  return data;
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0] || 'help';
  const jsonFlag = args.includes('--json');

  if (cmd === '--version' || cmd === '-v' || cmd === 'version') {
    console.log('1.2.0');
    return;
  }

  if (cmd === '--help' || cmd === '-h' || cmd === 'help') {
    console.log(HELP_TEXT.trim());
    return;
  }

  if (cmd === 'projects') {
    const catIdx = args.indexOf('--category');
    const category = catIdx !== -1 && args[catIdx + 1] ? args[catIdx + 1] : 'all';
    const data = await fetchJson(`/api/v1/projects?category=${encodeURIComponent(category)}`);
    if (jsonFlag) {
      console.log(JSON.stringify(data, null, 2));
    } else {
      console.log(`GradiEnt Studio Projects (${data.count}):`);
      for (const p of data.projects || []) {
        console.log(`  - [${p.id}] ${p.title} (${p.location}) — ${p.deliverable}`);
      }
    }
    return;
  }

  if (cmd === 'project') {
    const projectId = args[1];
    if (!projectId || projectId.startsWith('-')) {
      console.error('Error: Missing <projectId>. Valid IDs: lemukutan, courtyard, space, light');
      process.exit(1);
    }
    const data = await fetchJson(`/api/v1/projects/${encodeURIComponent(projectId)}`);
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'services') {
    const data = await fetchJson('/api/v1/services');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'status') {
    const data = await fetchJson('/api/v1/status');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  if (cmd === 'mcp') {
    const data = await fetchJson('/.well-known/mcp');
    console.log(JSON.stringify(data, null, 2));
    return;
  }

  console.error(`Unknown command: "${cmd}". Run "gradient-studio --help" for usage.`);
  process.exit(1);
}

main().catch((err) => {
  console.error(
    JSON.stringify(
      {
        success: false,
        code: 'CLI_EXECUTION_ERROR',
        message: err.message,
        hint: 'Check network connectivity to https://gradientarch.tech or run gradient-studio --help'
      },
      null,
      2
    )
  );
  process.exit(1);
});
