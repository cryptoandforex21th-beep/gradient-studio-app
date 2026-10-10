import Link from 'next/link';

export const metadata = {
  title: '404 — Halaman Tidak Ditemukan (Page Not Found) | GradiEnt Studio',
  description: 'Halaman yang Anda cari tidak ditemukan di GradiEnt Studio. Akses beranda, dokumentasi API/MCP, llms.txt, atau peta situs.'
};

export default function NotFound() {
  return (
    <div style={{
      maxWidth: '760px',
      margin: '60px auto 100px',
      padding: '40px clamp(20px, 4vw, 48px)',
      background: 'var(--paper-deep)',
      border: '1px solid var(--line)',
      color: 'var(--ink)',
      lineHeight: 1.7
    }}>
      <span style={{
        fontFamily: 'var(--mono)',
        fontSize: '11px',
        letterSpacing: '.12em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        display: 'block',
        marginBottom: '12px'
      }}>
        HTTP 404 · NOT FOUND
      </span>

      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(32px, 4vw, 44px)',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-.03em',
        marginBottom: '16px'
      }}>
        Halaman Tidak Ditemukan (404 Page Not Found)
      </h1>

      <p style={{ marginBottom: '24px', color: 'var(--ink-soft)' }}>
        Maaf, alamat URL yang Anda minta tidak tersedia di <strong>GradiEnt Studio</strong> (<code>https://gradientarch.tech</code>). Bagi agen AI dan pengembang, kirim header <code>Accept: text/markdown</code> untuk menerima respons galat dalam format Markdown, atau gunakan tautan dokumentasi di bawah ini.
      </p>

      <div style={{
        display: 'grid',
        gap: '16px',
        padding: '20px',
        background: 'var(--paper)',
        border: '1px solid var(--line)',
        marginBottom: '28px',
        fontSize: '14px'
      }}>
        <strong style={{ fontFamily: 'var(--mono)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--accent)' }}>
          Tautan Navigasi & Sumber Daya Agen (Agent & Developer Resources)
        </strong>
        <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', margin: 0 }}>
          <li><Link href="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Beranda GradiEnt Studio (/)</Link></li>
          <li><Link href="/about" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Tentang Studio (/about)</Link></li>
          <li><Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Kontak & Konsultasi Proyek (/contact)</Link></li>
          <li><Link href="/docs" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Dokumentasi Developer, REST API & MCP (/docs)</Link></li>
          <li><a href="/llms.txt" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>LLMs Manifest & When-to-Use (/llms.txt)</a></li>
          <li><a href="/agent-instructions.md" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Panduan Instruksi Agen (/agent-instructions.md)</a></li>
          <li><a href="/openapi.json" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Spesifikasi OpenAPI 3.1 (/openapi.json)</a></li>
          <li><a href="/.well-known/mcp" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>MCP Server Streamable HTTP (/.well-known/mcp)</a></li>
          <li><a href="/sitemap.xml" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Peta Situs XML (/sitemap.xml)</a></li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/" className="button button-dark compact">
          ← Kembali ke Beranda
        </Link>
        <Link href="/docs" className="button button-outline compact">
          Buka Dokumentasi API & MCP
        </Link>
      </div>
    </div>
  );
}
