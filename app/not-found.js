import Link from 'next/link';

export const metadata = {
  title: '404 — Halaman Tidak Ditemukan | GradiEnt Studio Architectural Design',
  description: 'Halaman yang Anda cari tidak ditemukan di GradiEnt Studio Architectural Design (https://gradientarch.tech).'
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
        HTTP 404 · HALAMAN TIDAK DITEMUKAN
      </span>

      <h1 style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(32px, 4vw, 44px)',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-.03em',
        marginBottom: '16px'
      }}>
        Halaman Tidak Ditemukan
      </h1>

      <p style={{ marginBottom: '24px', color: 'var(--ink-soft)' }}>
        Maaf, alamat halaman yang Anda tuju tidak tersedia atau telah dipindahkan di <strong>GradiEnt Studio</strong> (<code>https://gradientarch.tech</code>). Silakan kembali ke beranda atau jelajahi halaman utama studio di bawah ini.
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
          Navigasi Utama GradiEnt Studio
        </strong>
        <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px', margin: 0 }}>
          <li><Link href="/" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Beranda & Studi Desain (/)</Link></li>
          <li><Link href="/about" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Tentang GradiEnt Studio (/about)</Link></li>
          <li><Link href="/contact" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Kontak & Konsultasi Proyek (/contact)</Link></li>
          <li><a href="/preview-lemukutan.html" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Pratinjau DED Paviliun Pulau Lemukutan</a></li>
        </ul>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <Link href="/" className="button button-dark compact">
          ← Kembali ke Beranda
        </Link>
        <Link href="/contact" className="button button-outline compact">
          Diskusikan Proyek
        </Link>
      </div>
    </div>
  );
}
