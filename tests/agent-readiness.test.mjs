import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

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

test('1. Agent-friendly 404 Markdown body has >20 chars and links to docs, sitemap, and llms.txt', () => {
  const md = getNotFoundMarkdown('/__ora-404-probe-1q7nsysh');
  assert.ok(md.length >= 200, '404 Markdown body should be substantive (>200 chars)');
  assert.match(md, /404/);
  assert.match(md, /\/llms\.txt/);
  assert.match(md, /\/docs/);
  assert.match(md, /\/sitemap\.xml/);
});

test('2. Homepage and core page Markdown representations are non-empty and structured', () => {
  const homeMd = getHomeMarkdown();
  assert.ok(homeMd.startsWith('# GradiEnt Studio'));
  assert.ok(homeMd.length > 1000);
  assert.match(homeMd, /When to Use GradiEnt Studio/);
  assert.match(homeMd, /\/docs/);
  assert.match(homeMd, /\/openapi\.json/);
  assert.match(homeMd, /\/\.well-known\/mcp/);
});

test('3. Developer resource discoverability: OpenAPI 3.1 spec and /docs content are complete', () => {
  const spec = getOpenApiSpec();
  assert.equal(spec.openapi, '3.1.0');
  assert.equal(spec.info.title, 'GradiEnt Studio Architecture & Spatial Design API');
  assert.ok(spec.paths['/api/notion/projects']);
  assert.ok(spec.paths['/api/notion/inquiry']);
  assert.ok(spec.paths['/.well-known/mcp']);

  const docsMd = getDocsMarkdown();
  assert.match(docsMd, /GradiEnt Studio/);
  assert.match(docsMd, /Vercel/);
  assert.match(docsMd, /OpenAPI/);
  assert.match(docsMd, /Streamable HTTP/);
});

test('4 & 5 & 7. JSON-LD structured data includes SoftwareApplication and complete Organization schema', () => {
  const { organizationSchema, softwareAppSchema, webSiteSchema } = getJsonLdSchemas();

  // Organization schema completeness (#7)
  assert.equal(organizationSchema['@type'], 'Organization');
  assert.equal(organizationSchema.name, 'GradiEnt Studio');
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

  // SoftwareApplication schema (#5)
  assert.equal(softwareAppSchema['@type'], 'SoftwareApplication');
  assert.equal(softwareAppSchema.name, 'GradiEnt Studio');
  assert.equal(softwareAppSchema.url, SITE_URL);
  assert.ok(softwareAppSchema.description);
  assert.ok(softwareAppSchema.offers);
  assert.ok(softwareAppSchema.author);
  assert.ok(Array.isArray(softwareAppSchema.sameAs));

  // WebSite schema
  assert.equal(webSiteSchema['@type'], 'WebSite');
});

test('6. Agent instructions / when-to-use guidance is present in llms.txt and agent-instructions.md', () => {
  const llms = getLlmsTxt();
  assert.match(llms, /## When to Use This/i);
  assert.match(llms, /How an Agent Should Call GradiEnt Studio/i);
  assert.ok(getLlmsFullTxt().length > llms.length);

  const agentInst = getAgentInstructionsMd();
  assert.match(agentInst, /When to Use GradiEnt Studio/i);
  assert.match(agentInst, /When NOT to Use GradiEnt Studio/i);
  assert.match(agentInst, /How an Agent Should Call GradiEnt Studio/i);
});

test('8 & 9. Trust anchor pages (/about, /contact, /privacy) exist and exceed 500 characters each', () => {
  assert.ok(getAboutMarkdown().length > 500);
  assert.ok(getContactMarkdown().length > 500);
  assert.ok(getPrivacyMarkdown().length > 500);

  const rootDir = path.resolve(process.cwd());
  const aboutFile = fs.readFileSync(path.join(rootDir, 'app/about/page.js'), 'utf8');
  const contactFile = fs.readFileSync(path.join(rootDir, 'app/contact/page.js'), 'utf8');
  const privacyFile = fs.readFileSync(path.join(rootDir, 'app/privacy/page.js'), 'utf8');
  const docsFile = fs.readFileSync(path.join(rootDir, 'app/docs/page.js'), 'utf8');

  assert.ok(aboutFile.length > 1500, '/about page source should have >500 chars of content');
  assert.ok(contactFile.length > 1500, '/contact page source should have >500 chars of content');
  assert.ok(privacyFile.length > 1500, '/privacy page source should have >500 chars of content');
  assert.ok(docsFile.length > 1500, '/docs page source should have >500 chars of content');
});

test('10. MCP Server supports GET discovery manifest and POST Streamable HTTP JSON-RPC 2.0 handshake', async () => {
  const manifest = getMcpDiscoveryManifest();
  assert.equal(manifest.transport.type, 'streamable-http');
  assert.equal(manifest.transport.url, `${SITE_URL}/.well-known/mcp`);
  assert.ok(manifest.tools.length >= 4);

  // Test GET /.well-known/mcp
  const getReq = new Request(`${SITE_URL}/.well-known/mcp`, {
    method: 'GET',
    headers: { Accept: 'application/json' }
  });
  const getRes = await handleMcpGet(getReq);
  assert.equal(getRes.status, 200);
  assert.match(getRes.headers.get('content-type'), /application\/json/);
  const getBody = await getRes.json();
  assert.equal(getBody.name, 'gradient-studio-mcp');

  // Test POST initialize handshake
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
  assert.equal(initJson.jsonrpc, '2.0');
  assert.equal(initJson.id, 1);
  assert.equal(initJson.result.protocolVersion, '2025-03-26');
  assert.equal(initJson.result.serverInfo.name, 'gradient-studio-mcp');
  assert.ok(initJson.result.capabilities.tools);

  // Test POST tools/list
  const listReq = new Request(`${SITE_URL}/.well-known/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/list',
      params: {}
    })
  });
  const listRes = await handleMcpPost(listReq);
  assert.equal(listRes.status, 200);
  const listJson = await listRes.json();
  assert.equal(listJson.result.tools.length, 4);

  // Test POST tools/call
  const callReq = new Request(`${SITE_URL}/.well-known/mcp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'get_project_details',
        arguments: { projectId: 'lemukutan' }
      }
    })
  });
  const callRes = await handleMcpPost(callReq);
  assert.equal(callRes.status, 200);
  const callJson = await callRes.json();
  assert.equal(callJson.result.isError, false);
  assert.match(callJson.result.content[0].text, /Lemukutan/);
});

test('11. Live Next.js HTTP Server end-to-end verification (Markdown negotiation, 404s, HTML metadata, JSON-LD, MCP)', async () => {
  const { spawn } = await import('node:child_process');
  const port = 3291;
  const baseUrl = `http://127.0.0.1:${port}`;
  const nextBin = path.resolve(process.cwd(), 'node_modules/next/dist/bin/next');

  const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe']
  });

  try {
    // Wait for server to be ready
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

    // 1. Homepage Markdown content negotiation (Accept: text/markdown)
    const homeMdRes = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/markdown' }
    });
    assert.equal(homeMdRes.status, 200);
    assert.match(homeMdRes.headers.get('content-type') || '', /text\/markdown/i);
    assert.match(homeMdRes.headers.get('vary') || '', /accept/i);
    const homeMdBody = await homeMdRes.text();
    assert.ok(homeMdBody.startsWith('# GradiEnt Studio'));

    // 2. Homepage HTML response (Accept: text/html) + Metadata + JSON-LD + Vary: Accept
    const homeHtmlRes = await fetch(`${baseUrl}/`, {
      headers: { Accept: 'text/html' }
    });
    assert.equal(homeHtmlRes.status, 200);
    assert.match(homeHtmlRes.headers.get('content-type') || '', /text\/html/i);
    assert.match(homeHtmlRes.headers.get('vary') || '', /accept/i);
    const homeHtmlBody = await homeHtmlRes.text();
    assert.match(homeHtmlBody, /<html[^>]*lang="id"/i);
    assert.match(homeHtmlBody, /rel="canonical"[^>]*href="https:\/\/gradientstudioapp\.vercel\.app\/?"/i);
    assert.match(homeHtmlBody, /property="og:image"/i);
    assert.match(homeHtmlBody, /property="og:type"[^>]*content="website"/i);
    assert.match(homeHtmlBody, /application\/ld\+json/i);
    assert.match(homeHtmlBody, /"@type":"Organization"/i);
    assert.match(homeHtmlBody, /"@type":"PostalAddress"/i);
    assert.match(homeHtmlBody, /"@type":"ContactPoint"/i);
    assert.match(homeHtmlBody, /"@type":"SoftwareApplication"/i);

    // 3. Agent-friendly 404 with Accept: text/markdown
    const notFoundMdRes = await fetch(`${baseUrl}/__ora-404-probe-1q7nsysh`, {
      headers: { Accept: 'text/markdown' }
    });
    assert.equal(notFoundMdRes.status, 404);
    assert.match(notFoundMdRes.headers.get('content-type') || '', /text\/markdown/i);
    assert.match(notFoundMdRes.headers.get('vary') || '', /accept/i);
    const notFoundMdBody = await notFoundMdRes.text();
    assert.ok(notFoundMdBody.length >= 100);
    assert.match(notFoundMdBody, /llms\.txt/);
    assert.match(notFoundMdBody, /sitemap\.xml/);
    assert.match(notFoundMdBody, /\/docs/);

    // 4. Trust Anchor Pages (/about, /contact, /privacy) & Developer Docs (/docs)
    for (const route of ['/about', '/contact', '/privacy', '/docs']) {
      const htmlRes = await fetch(`${baseUrl}${route}`, { headers: { Accept: 'text/html' } });
      assert.equal(htmlRes.status, 200, `Expected 200 for HTML ${route}`);
      const htmlText = await htmlRes.text();
      assert.ok(htmlText.length > 500, `Expected >500 chars for ${route}`);

      const mdRes = await fetch(`${baseUrl}${route}`, { headers: { Accept: 'text/markdown' } });
      assert.equal(mdRes.status, 200, `Expected 200 for Markdown ${route}`);
      assert.match(mdRes.headers.get('content-type') || '', /text\/markdown/i);
      const mdText = await mdRes.text();
      assert.ok(mdText.length > 500, `Expected >500 chars Markdown for ${route}`);
    }

    // 5. Machine-readable files (/llms.txt, /llms-full.txt, /agent-instructions.md, /openapi.json, /sitemap.xml, /robots.txt)
    for (const endpoint of ['/llms.txt', '/llms-full.txt', '/agent-instructions.md', '/openapi.json', '/sitemap.xml', '/robots.txt']) {
      const res = await fetch(`${baseUrl}${endpoint}`);
      assert.equal(res.status, 200, `Expected 200 for ${endpoint}`);
      const body = await res.text();
      assert.ok(body.length > 100, `Expected non-empty body for ${endpoint}`);
    }

    // 6. Live MCP Server protocol handshake on /.well-known/mcp
    const mcpGet = await fetch(`${baseUrl}/.well-known/mcp`);
    assert.equal(mcpGet.status, 200);
    const mcpManifest = await mcpGet.json();
    assert.equal(mcpManifest.transport.type, 'streamable-http');

    const mcpPost = await fetch(`${baseUrl}/.well-known/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 10,
        method: 'initialize',
        params: {
          protocolVersion: '2025-03-26',
          capabilities: {},
          clientInfo: { name: 'e2e-verifier', version: '1.0.0' }
        }
      })
    });
    assert.equal(mcpPost.status, 200);
    const mcpHandshake = await mcpPost.json();
    assert.equal(mcpHandshake.result.serverInfo.name, 'gradient-studio-mcp');
  } finally {
    server.kill();
  }
});
