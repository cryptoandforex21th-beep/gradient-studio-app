import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import {
  SITE_URL,
  getHomeMarkdown,
  getAboutMarkdown,
  getContactMarkdown,
  getPrivacyMarkdown,
  getDocsMarkdown,
  getNotFoundMarkdown,
  getLlmsTxt,
  getLlmsFullTxt,
  getAgentInstructionsMd,
  getOpenApiSpec,
  getJsonLdSchemas
} from '../lib/agentContent.js';

import {
  getMcpDiscoveryManifest,
  handleMcpGet,
  handleMcpPost
} from '../lib/mcpServer.js';

import { buildErrorPayload, getStandardApiHeaders } from '../lib/apiHelpers.js';

test('1. Agent-friendly 404 Markdown body has >20 chars and links to docs, sitemap, and llms.txt', () => {
  const md = getNotFoundMarkdown('/__ora-404-probe-1q7nsysh');
  assert.ok(md.length >= 200, '404 Markdown body should be substantive (>200 chars)');
  assert.match(md, /404/);
  assert.match(md, /\/llms\.txt/);
  assert.match(md, /\/docs/);
  assert.match(md, /\/sitemap\.xml/);
});

test('2. Homepage and core page Markdown representations include exact brand + product phrase', () => {
  const homeMd = getHomeMarkdown();
  assert.ok(homeMd.startsWith('# GradiEnt Studio Architectural Design'));
  assert.ok(homeMd.length > 1000);
  assert.match(homeMd, /When to Use GradiEnt Studio/);
  assert.match(homeMd, /\/docs/);
  assert.match(homeMd, /\/openapi\.json/);
  assert.match(homeMd, /\/\.well-known\/mcp/);
  assert.match(homeMd, /\/api\/v1\/projects/);
});

test('3. OpenAPI 3.1 spec has 100% response schema coverage, typed error models, versioning/deprecation, and function-calling compatibility', () => {
  const spec = getOpenApiSpec();
  assert.equal(spec.openapi, '3.1.0');
  assert.equal(spec.info.title, 'GradiEnt Studio Architectural Design API');
  assert.equal(spec['x-api-version'], 'v1');
  assert.ok(spec['x-deprecation-policy']);
  assert.ok(spec['x-cli']);
  assert.ok(spec.paths['/api/v1/projects']);
  assert.ok(spec.paths['/api/v1/projects/{projectId}']);
  assert.ok(spec.paths['/api/v1/services']);
  assert.ok(spec.paths['/api/v1/status']);
  assert.ok(spec.paths['/.well-known/mcp']);
  assert.ok(spec.paths['/api/notion/projects'].get.deprecated);
  assert.ok(spec.components.schemas.ErrorResponse);
  assert.ok(spec.components.schemas.ProblemDetails);

  // Verify 100% of operations have operationId, typed input schema (parameters or requestBody),
  // 200 application/json response schema, and 4xx/5xx typed error schemas
  const operationIds = new Set();
  let totalOps = 0;
  for (const [, pathItem] of Object.entries(spec.paths)) {
    for (const [method, op] of Object.entries(pathItem)) {
      if (!['get', 'post', 'put', 'delete', 'patch'].includes(method)) continue;
      totalOps++;
      assert.ok(op.operationId, `Missing operationId on ${method}`);
      assert.ok(!operationIds.has(op.operationId), `Duplicate operationId ${op.operationId}`);
      operationIds.add(op.operationId);
      assert.ok(op.description && op.description.length > 15);

      const hasTypedParams = Array.isArray(op.parameters) && op.parameters.length > 0 && op.parameters.every((p) => p.schema && p.schema.type);
      const hasTypedBody = Boolean(op.requestBody?.content?.['application/json']?.schema?.type);
      assert.ok(hasTypedParams || hasTypedBody, `Operation ${op.operationId} must have typed parameters or requestBody`);

      const res200Schema = op.responses?.['200']?.content?.['application/json']?.schema;
      assert.ok(res200Schema && res200Schema.type === 'object', `Operation ${op.operationId} must have typed 200 JSON schema`);

      for (const errCode of ['400', '404', '429', '500']) {
        const errResp = op.responses?.[errCode];
        assert.ok(errResp, `Operation ${op.operationId} missing ${errCode} error response`);
        assert.ok(errResp.content?.['application/json']?.schema, `Operation ${op.operationId} missing ${errCode} JSON error schema`);
        assert.ok(errResp.content?.['application/problem+json']?.schema, `Operation ${op.operationId} missing ${errCode} ProblemDetails schema`);
      }
    }
  }
  assert.ok(totalOps >= 6);
});

test('4 & 5 & 7. JSON-LD structured data includes SoftwareApplication and complete Organization schema', () => {
  const { organizationSchema, softwareAppSchema, webSiteSchema } = getJsonLdSchemas();

  assert.equal(organizationSchema['@type'], 'Organization');
  assert.equal(organizationSchema.name, 'GradiEnt Studio');
  assert.ok(organizationSchema.alternateName.includes('GradiEnt Studio Architectural Design'));
  assert.equal(organizationSchema.url, SITE_URL);
  assert.equal(organizationSchema.address['@type'], 'PostalAddress');
  assert.ok(organizationSchema.address.streetAddress);
  assert.equal(organizationSchema.address.addressLocality, 'Makassar');
  assert.equal(organizationSchema.address.addressCountry, 'ID');
  assert.ok(Array.isArray(organizationSchema.contactPoint));
  assert.ok(organizationSchema.contactPoint.length >= 1);
  assert.ok(organizationSchema.contactPoint[0].email);
  assert.ok(organizationSchema.contactPoint[0].telephone);
  assert.ok(organizationSchema.contactPoint[0].contactType);

  assert.equal(softwareAppSchema['@type'], 'SoftwareApplication');
  assert.equal(softwareAppSchema.name, 'GradiEnt Studio Architectural Design 3D Modeling');
  assert.equal(softwareAppSchema.url, SITE_URL);
  assert.ok(softwareAppSchema.description);
  assert.ok(softwareAppSchema.offers);
  assert.ok(softwareAppSchema.author);
  assert.ok(Array.isArray(softwareAppSchema.sameAs));

  assert.equal(webSiteSchema['@type'], 'WebSite');
});

test('6. Agent instructions, CLI tool, and RateLimit / JSON Error helpers work accurately', () => {
  const llms = getLlmsTxt();
  assert.match(llms, /## When to Use This/i);
  assert.match(llms, /How an Agent Should Call GradiEnt Studio/i);
  assert.match(llms, /\/api\/v1\/projects/);
  assert.match(llms, /gradient-studio/);
  assert.ok(getLlmsFullTxt().length > llms.length);

  const agentInst = getAgentInstructionsMd();
  assert.match(agentInst, /When to Use GradiEnt Studio/i);
  assert.match(agentInst, /When NOT to Use GradiEnt Studio/i);
  assert.match(agentInst, /How an Agent Should Call GradiEnt Studio/i);

  // Verify structured JSON error payload & RateLimit headers
  const errPayload = buildErrorPayload({
    status: 404,
    code: 'PROJECT_NOT_FOUND',
    title: 'Project Not Found',
    message: 'Project does not exist',
    instance: '/api/v1/projects/invalid'
  });
  assert.equal(errPayload.success, false);
  assert.equal(errPayload.status, 404);
  assert.equal(errPayload.code, 'PROJECT_NOT_FOUND');
  assert.ok(errPayload.hint.length > 10);
  assert.ok(errPayload.resolution.length > 10);
  assert.equal(errPayload.error.code, 'PROJECT_NOT_FOUND');

  const headers = getStandardApiHeaders();
  assert.equal(headers['RateLimit-Limit'], '120');
  assert.equal(headers['RateLimit-Remaining'], '119');
  assert.equal(headers['RateLimit-Reset'], '60');
  assert.equal(headers['RateLimit-Policy'], '120;w=60');
  assert.equal(headers['X-API-Version'], '2026-10-01');

  // Verify CLI tool binary
  const cliPath = path.resolve(process.cwd(), 'bin/gradient-studio.mjs');
  const cliVersion = execFileSync(process.execPath, [cliPath, '--version'], { encoding: 'utf8' }).trim();
  assert.equal(cliVersion, '1.2.0');
  const cliHelp = execFileSync(process.execPath, [cliPath, '--help'], { encoding: 'utf8' });
  assert.match(cliHelp, /GradiEnt Studio CLI/);
});

test('8 & 9. Trust anchor pages (/about, /contact, /privacy) exist and exceed 500 characters each', () => {
  assert.ok(getAboutMarkdown().length > 500);
  assert.ok(getContactMarkdown().length > 500);
  assert.ok(getPrivacyMarkdown().length > 500);
  assert.ok(getDocsMarkdown().length > 500);

  const rootDir = path.resolve(process.cwd());
  const aboutFile = fs.readFileSync(path.join(rootDir, 'app/about/page.js'), 'utf8');
  const contactFile = fs.readFileSync(path.join(rootDir, 'app/contact/page.js'), 'utf8');
  const privacyFile = fs.readFileSync(path.join(rootDir, 'app/privacy/page.js'), 'utf8');
  const docsFile = fs.readFileSync(path.join(rootDir, 'app/docs/page.js'), 'utf8');

  assert.ok(aboutFile.length > 1500);
  assert.ok(contactFile.length > 1500);
  assert.ok(privacyFile.length > 1500);
  assert.ok(docsFile.length > 1500);
});

test('10. MCP Server supports GET discovery manifest and POST Streamable HTTP JSON-RPC 2.0 handshake', async () => {
  const manifest = getMcpDiscoveryManifest();
  assert.equal(manifest.transport.type, 'streamable-http');
  assert.equal(manifest.transport.url, `${SITE_URL}/.well-known/mcp`);
  assert.ok(manifest.tools.length >= 4);

  const getReq = new Request(`${SITE_URL}/.well-known/mcp`, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  const getRes = await handleMcpGet(getReq);
  assert.equal(getRes.status, 200);
  assert.equal(getRes.headers.get('ratelimit-limit'), '120');
  const getBody = await getRes.json();
  assert.equal(getBody.name, 'gradient-studio-mcp');

  const initReq = new Request(`${SITE_URL}/.well-known/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'initialize',
      params: {
        protocolVersion: '2025-03-26',
        capabilities: {},
        clientInfo: { name: 'ora-agent-probe', version: '1.0.0' }
      }
    })
  });
  const initRes = await handleMcpPost(initReq);
  assert.equal(initRes.status, 200);
  const initJson = await initRes.json();
  assert.equal(initJson.result.serverInfo.name, 'gradient-studio-mcp');
});

test('11. Live Next.js HTTP Server end-to-end verification (Markdown, JSON Errors, RateLimit, Versioning, MCP)', async () => {
  const { spawn } = await import('node:child_process');
  const port = 3292;
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = path.resolve(process.cwd(), 'node_modules/next/dist/bin/next');

  const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => reject(new Error('Server start timeout')), 15000);
      server.stdout.on('data', (chunk) => {
        const text = chunk.toString();
        if (text.includes('Ready in') || text.includes(String(port))) {
          clearTimeout(timeout);
          resolve();
        }
      });
      server.on('error', (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    // 1. Homepage Markdown content negotiation + RateLimit headers
    const homeMdRes = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/markdown' }
    });
    assert.equal(homeMdRes.status, 200);
    assert.match(homeMdRes.headers.get('content-type') || '', /text\/markdown/i);
    assert.match(homeMdRes.headers.get('vary') || '', /accept/i);
    assert.equal(homeMdRes.headers.get('ratelimit-limit'), '120');
    const homeMdBody = await homeMdRes.text();
    assert.ok(homeMdBody.startsWith('# GradiEnt Studio Architectural Design'));

    // 2. Homepage HTML response + Metadata + JSON-LD + Canonical URL
    const homeHtmlRes = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/html' }
    });
    assert.equal(homeHtmlRes.status, 200);
    assert.match(homeHtmlRes.headers.get('content-type') || '', /text\/html/i);
    const homeHtmlBody = await homeHtmlRes.text();
    assert.match(homeHtmlBody, /<html[^>]*lang="id"/i);
    assert.match(homeHtmlBody, /rel="canonical"[^>]*href="https:\/\/gradientarch\.tech\/?"/i);
    assert.match(homeHtmlBody, /GradiEnt Studio Architectural Design 3D Modeling/i);
    assert.match(homeHtmlBody, /<a[^>]*href="\/docs"[^>]*>API Docs<\/a>/i);

    // 2b. Verify /docs and /developers include Authentication, Endpoints, and Example Requests
    const docsHtmlRes = await fetch(`${baseUrl}/docs`, {
      headers: { Accept: 'text/html' }
    });
    assert.equal(docsHtmlRes.status, 200);
    const docsHtmlBody = await docsHtmlRes.text();
    assert.match(docsHtmlBody, /Authentication/i);
    assert.match(docsHtmlBody, /Example Requests/i);
    assert.match(docsHtmlBody, /curl -sS/i);
    assert.match(docsHtmlBody, /npmjs\.com\/package\/gradient-studio/i);

    const devsHtmlRes = await fetch(`${baseUrl}/developers`, {
      headers: { Accept: 'text/html' }
    });
    assert.equal(devsHtmlRes.status, 200);

    // 3. Agent-friendly 404 with Accept: text/markdown
    const notFoundMdRes = await fetch(`${baseUrl}/__ora-404-probe-1q7nsysh`, {
      headers: { Accept: 'text/markdown' }
    });
    assert.equal(notFoundMdRes.status, 404);
    assert.match(notFoundMdRes.headers.get('content-type') || '', /text\/markdown/i);

    // 4. Versioned REST API v1 (/api/v1/projects, /api/v1/projects/lemukutan, /api/v1/services, /api/v1/status)
    const v1ProjectsRes = await fetch(`${baseUrl}/api/v1/projects`);
    assert.equal(v1ProjectsRes.status, 200);
    assert.equal(v1ProjectsRes.headers.get('ratelimit-limit'), '120');
    assert.equal(v1ProjectsRes.headers.get('ratelimit-remaining'), '119');
    assert.equal(v1ProjectsRes.headers.get('ratelimit-reset'), '60');
    assert.equal(v1ProjectsRes.headers.get('x-api-version'), '2026-10-01');
    const v1ProjectsJson = await v1ProjectsRes.json();
    assert.equal(v1ProjectsJson.success, true);
    assert.equal(v1ProjectsJson.apiVersion, 'v1');
    assert.equal(v1ProjectsJson.count, 4);

    // 5. Structured JSON Error Responses (400 invalid param, 404 unknown project, 404 unknown API endpoint, 405 wrong method, 429 rate limit)
    const badParamRes = await fetch(`${baseUrl}/api/v1/projects?category=invalid`);
    assert.equal(badParamRes.status, 400);
    assert.match(badParamRes.headers.get('content-type') || '', /application\/json/i);
    const badParamJson = await badParamRes.json();
    assert.equal(badParamJson.code, 'INVALID_CATEGORY_PARAMETER');
    assert.ok(badParamJson.hint);
    assert.ok(badParamJson.error.code);

    const notFoundProjRes = await fetch(`${baseUrl}/api/v1/projects/nonexistent-project`);
    assert.equal(notFoundProjRes.status, 404);
    const notFoundProjJson = await notFoundProjRes.json();
    assert.equal(notFoundProjJson.code, 'PROJECT_NOT_FOUND');
    assert.ok(notFoundProjJson.resolution);

    const unknownApiRes = await fetch(`${baseUrl}/api/nonexistent-endpoint`);
    assert.equal(unknownApiRes.status, 404);
    assert.match(unknownApiRes.headers.get('content-type') || '', /application\/json/i);
    const unknownApiJson = await unknownApiRes.json();
    assert.equal(unknownApiJson.code, 'API_ENDPOINT_NOT_FOUND');
    assert.ok(unknownApiJson.hint);

    const rateLimitRes = await fetch(`${baseUrl}/api/v1/projects?simulate_rate_limit=1`);
    assert.equal(rateLimitRes.status, 429);
    assert.equal(rateLimitRes.headers.get('retry-after'), '60');
    const rateLimitJson = await rateLimitRes.json();
    assert.equal(rateLimitJson.code, 'RATE_LIMIT_EXCEEDED');

    // 6. Legacy endpoint Deprecation & Sunset headers
    const legacyRes = await fetch(`${baseUrl}/api/notion/projects`);
    assert.equal(legacyRes.status, 200);
    assert.ok(legacyRes.headers.get('deprecation'));
    assert.ok(legacyRes.headers.get('sunset'));
  } finally {
    server.kill();
  }
});
