import Link from 'next/link';
import { SITE_URL, MCP_TOOLS } from '../../lib/mcpServer';

export const metadata = {
  title: 'Developer Portal, API & MCP Server Documentation — GradiEnt Studio (Vercel)',
  description:
    'Official developer resources for GradiEnt Studio on Vercel: REST API endpoints, OpenAPI 3.1 specification, Model Context Protocol (MCP) Streamable HTTP server, authentication, and Markdown content negotiation.',
  alternates: {
    canonical: 'https://gradientarch.tech/docs'
  }
};

export default function DocsPage() {
  return (
    <div style={{
      maxWidth: '880px',
      margin: '60px auto 100px',
      padding: '40px clamp(20px, 4vw, 48px)',
      background: 'var(--paper-deep)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
      lineHeight: 1.75
    }}>
      <Link href="/" style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '24px'
      }}>
        ← Kembali ke Beranda
      </Link>

      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(32px, 4vw, 46px)',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-.03em',
        marginBottom: '12px'
      }}>
        GradiEnt Studio Developer Portal, API & MCP Docs
      </h1>

      <p style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        color: 'var(--ink-soft)',
        letterSpacing: '.06em',
        marginBottom: '32px',
        borderBottom: '1px solid var(--line)',
        paddingBottom: '16px'
      }}>
        GradiEnt Studio Platform · Hosted on Vercel (gradientarch.tech) · OpenAPI 3.1 & MCP Streamable HTTP
      </p>

      <div style={{ display: 'grid', gap: '32px', fontSize: '15px' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            1. Machine-Readable Discovery Index
          </h2>
          <p>
            GradiEnt Studio exposes standardized machine-readable endpoints for AI agents, LLM crawlers, and developer integrations deployed on Vercel:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'grid', gap: '8px' }}>
            <li>
              <strong>LLMs Summary & When-to-Use:</strong>{' '}
              <a href="/llms.txt" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/llms.txt</a>
            </li>
            <li>
              <strong>LLMs Full Corpus:</strong>{' '}
              <a href="/llms-full.txt" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/llms-full.txt</a>
            </li>
            <li>
              <strong>Agent Instructions (When-to-Use Guide):</strong>{' '}
              <a href="/agent-instructions.md" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/agent-instructions.md</a>
            </li>
            <li>
              <strong>OpenAPI 3.1.0 Specification:</strong>{' '}
              <a href="/openapi.json" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/openapi.json</a>
            </li>
            <li>
              <strong>MCP Server (Streamable HTTP & Discovery):</strong>{' '}
              <a href="/.well-known/mcp" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/.well-known/mcp</a>
            </li>
            <li>
              <strong>MCP API Endpoint:</strong>{' '}
              <a href="/api/mcp" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/api/mcp</a>
            </li>
            <li>
              <strong>XML Sitemap:</strong>{' '}
              <a href="/sitemap.xml" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/sitemap.xml</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            2. Model Context Protocol (MCP) Server — Streamable HTTP
          </h2>
          <p>
            GradiEnt Studio provides a native Model Context Protocol (MCP) server supporting <strong>Streamable HTTP transport</strong> (protocol versions <code>2025-03-26</code> and <code>2024-11-05</code>) at <code>https://gradientarch.tech/.well-known/mcp</code>. Claude, ChatGPT, Cursor, and custom AI agents can connect directly without API keys for public tools.
          </p>
          <pre style={{
            background: '#172126',
            color: '#e7e3d8',
            padding: '16px',
            overflowX: 'auto',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            marginTop: '12px'
          }}>
{`curl -sS -X POST https://gradientarch.tech/.well-known/mcp \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json, text/event-stream" \\
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "initialize",
    "params": {
      "protocolVersion": "2025-03-26",
      "capabilities": {},
      "clientInfo": { "name": "agent-client", "version": "1.0.0" }
    }
  }'`}
          </pre>

          <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '18px', marginBottom: '8px' }}>
            Exposed MCP Tools ({MCP_TOOLS.length})
          </h3>
          <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px' }}>
            {MCP_TOOLS.map((tool) => (
              <li key={tool.name}>
                <code>{tool.name}</code> — {tool.description}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            3. Read-Only Public API & Security Boundary
          </h2>
          <p>
            Seluruh endpoint agen publik bersifat <strong>100% Read-Only (Hanya-Baca)</strong> dan hanya menyajikan data katalog portofolio arsitektur serta spesifikasi publik studio tanpa mengekspos database internal maupun kredensial. Portal Klien dan Admin (<code>/login</code>, <code>/dashboard</code>, <code>/admin</code>) dilindungi sepenuhnya oleh <strong>Supabase Auth</strong> (OAuth 2.0 & Row Level Security).
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'grid', gap: '8px' }}>
            <li>
              <code>GET /api/notion/projects</code> — Mengambil daftar proyek portofolio arsitektur dan studi spasial yang dipublikasikan (Read-Only JSON).
            </li>
            <li>
              <code>GET /openapi.json</code> — Spesifikasi skema OpenAPI 3.1.0 untuk integrasi agen.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            4. Markdown Content Negotiation (acceptmarkdown.com)
          </h2>
          <p>
            Every public route on <code>https://gradientarch.tech</code> supports HTTP content negotiation. Send <code>Accept: text/markdown</code> to receive clean Markdown with <code>Content-Type: text/markdown; charset=utf-8</code> and <code>Vary: Accept</code>, including agent-friendly Markdown 404 responses on nonexistent routes.
          </p>
          <pre style={{
            background: '#172126',
            color: '#e7e3d8',
            padding: '16px',
            overflowX: 'auto',
            fontSize: '12px',
            fontFamily: 'var(--mono)',
            marginTop: '12px'
          }}>
{`curl -sS -L -i -H "Accept: text/markdown" https://gradientarch.tech/
curl -sS -L -i -H "Accept: text/markdown" https://gradientarch.tech/nonexistent-path`}
          </pre>
        </section>
      </div>
    </div>
  );
}
