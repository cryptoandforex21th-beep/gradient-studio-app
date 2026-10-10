import Link from 'next/link';
import { MCP_TOOLS } from '../../lib/mcpServer';

export const metadata = {
  title: 'GradiEnt Studio Architectural Design 3D Modeling — Developer Portal, REST API v1, CLI & MCP Docs',
  description:
    'Official developer resources for GradiEnt Studio Architectural Design 3D Modeling (https://gradientarch.tech): Versioned REST API v1, OpenAPI 3.1 specification, RFC 9457 typed JSON error models, RateLimit headers, CLI tool, and MCP Streamable HTTP server.',
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
        GradiEnt Studio Architectural Design 3D Modeling — Developer Portal, API v1, CLI & MCP Docs
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
        GradiEnt Studio Architectural Design 3D Modeling · Canonical Domain: gradientarch.tech · REST API v1, OpenAPI 3.1, CLI & MCP Streamable HTTP
      </p>

      <div style={{ display: 'grid', gap: '32px', fontSize: '15px' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            1. Machine-Readable Discovery Index
          </h2>
          <p>
            GradiEnt Studio Architectural Design exposes standardized machine-readable endpoints for AI agents, LLM crawlers, and developer integrations on <code>https://gradientarch.tech</code>:
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
              <strong>Versioned REST API v1 Projects:</strong>{' '}
              <a href="/api/v1/projects" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/api/v1/projects</a>
            </li>
            <li>
              <strong>Versioned REST API v1 Services:</strong>{' '}
              <a href="/api/v1/services" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/api/v1/services</a>
            </li>
            <li>
              <strong>Versioned REST API v1 Status & Policy:</strong>{' '}
              <a href="/api/v1/status" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/api/v1/status</a>
            </li>
            <li>
              <strong>XML Sitemap:</strong>{' '}
              <a href="/sitemap.xml" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>https://gradientarch.tech/sitemap.xml</a>
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            2. Versioned Read-Only REST API (v1) & Typed JSON Error Model
          </h2>
          <p>
            All public REST API endpoints are strictly <strong>100% Read-Only</strong>, versioned under <code>/api/v1/*</code> (aliased at <code>/v1/*</code>), and include full typed schemas in <a href="/openapi.json" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>/openapi.json</a>:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '10px', display: 'grid', gap: '8px' }}>
            <li>
              <code>GET /api/v1/projects?category=all|architecture|research</code> — Lists architectural case studies and DED specifications.
            </li>
            <li>
              <code>GET /api/v1/projects/&#123;projectId&#125;</code> — Retrieves detailed structural and daylighting metadata for <code>lemukutan</code>, <code>courtyard</code>, <code>space</code>, or <code>light</code>.
            </li>
            <li>
              <code>GET /api/v1/services</code> — Lists studio services and the 4-stage collaboration workflow.
            </li>
            <li>
              <code>GET /api/v1/status</code> — Returns operational status, active version (<code>v1</code> / <code>2026-10-01</code>), deprecation timeline, and rate-limit configuration.
            </li>
          </ul>
          <p style={{ marginTop: '12px' }}>
            <strong>Structured JSON Error Responses (RFC 9457):</strong> Invalid parameters or nonexistent resources return structured JSON errors (<code>400</code>, <code>404</code>, <code>405</code>, <code>429</code>) with machine-readable <code>code</code>, <code>message</code>, <code>hint</code>, <code>resolution</code>, and <code>documentation_url</code> fields.
          </p>
        </section>

        <section id="versioning-and-deprecation">
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            3. Versioning, Deprecation & Rate-Limit Headers
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px' }}>
            <li>
              <strong>API Versioning:</strong> URL path versioning (<code>/api/v1/*</code>) paired with response headers <code>API-Version: v1</code> and <code>X-API-Version: 2026-10-01</code>.
            </li>
            <li>
              <strong>Deprecation & Sunset Policy:</strong> Deprecated endpoints (such as legacy <code>GET /api/notion/projects</code>) carry a minimum <strong>180-day notice period</strong> and emit RFC headers <code>Deprecation: @1767225600</code>, <code>Sunset: Fri, 31 Dec 2027 23:59:59 GMT</code>, and <code>Link: rel=&quot;successor-version&quot;</code>.
            </li>
            <li>
              <strong>Rate-Limit Headers:</strong> Every API response returns <code>RateLimit-Limit: 120</code>, <code>RateLimit-Remaining: 119</code>, <code>RateLimit-Reset: 60</code>, <code>RateLimit-Policy: 120;w=60</code>, and <code>Retry-After: 60</code> on HTTP <code>429</code>.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            4. Official CLI Tool (gradient-studio)
          </h2>
          <p>
            Agents and developers can script interactions from the command line using the official Node.js CLI package (<code>gradient-studio</code> / <code>bin/gradient-studio.mjs</code>):
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
{`npm install -g gradient-studio
npx gradient-studio projects --json
npx github:cryptoandforex21th-beep/gradient-studio-app projects --json
npx github:cryptoandforex21th-beep/gradient-studio-app project lemukutan
npx github:cryptoandforex21th-beep/gradient-studio-app services
npx github:cryptoandforex21th-beep/gradient-studio-app status`}
          </pre>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            5. Model Context Protocol (MCP) Server — Streamable HTTP
          </h2>
          <p>
            GradiEnt Studio provides a native Model Context Protocol (MCP) server supporting <strong>Streamable HTTP transport</strong> (protocol versions <code>2025-03-26</code> and <code>2024-11-05</code>) at <code>https://gradientarch.tech/.well-known/mcp</code>.
          </p>
          <h3 style={{ fontSize: '16px', fontWeight: 600, marginTop: '14px', marginBottom: '8px' }}>
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
      </div>
    </div>
  );
}
