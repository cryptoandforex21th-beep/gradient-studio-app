import Link from 'next/link';

export const metadata = {
  title: 'Kontak & Konsultasi Proyek / Contact — GradiEnt Studio Makassar',
  description:
    'Hubungi GradiEnt Studio di Makassar untuk konsultasi perancangan arsitektur, analisis tapak & pencahayaan alami, serta pemodelan spasial 3D bersama Heru Ardiansyah.',
  alternates: {
    canonical: 'https://gradientarch.tech/contact'
  }
};

export default function ContactPage() {
  return (
    <div style={{
      maxWidth: '820px',
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
        Kontak & Konsultasi Proyek (Contact Us)
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
        GradiEnt Studio · Makassar, Sulawesi Selatan, Indonesia · WITA (UTC+8)
      </p>

      <div style={{ display: 'grid', gap: '28px', fontSize: '15px' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            1. Saluran Komunikasi Langsung (Direct Contact Channels)
          </h2>
          <p>
            GradiEnt Studio menerima diskusi proyek baru untuk perancangan arsitektur kontekstual, studi iklim mikro & pencahayaan alami, pemodelan 3D, serta penyusunan dokumen gambar kerja (DED) di seluruh Indonesia. Hubungi kami langsung melalui saluran resmi berikut:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '12px', display: 'grid', gap: '8px' }}>
            <li>
              <strong>Founder & Principal:</strong> Heru Ardiansyah
            </li>
            <li>
              <strong>Email Studio:</strong>{' '}
              <a href="mailto:heruardiansyah2one@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                heruardiansyah2one@gmail.com
              </a>
            </li>
            <li>
              <strong>WhatsApp & Telepon:</strong>{' '}
              <a href="https://wa.me/6285143628550" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>
                +62 851-4362-8550
              </a>
            </li>
            <li>
              <strong>Alamat Studio (Postal Address):</strong> Jl. Perintis Kemerdekaan, Tamalanrea, Kota Makassar, Sulawesi Selatan 90245, Indonesia
            </li>
            <li>
              <strong>Jam Operasional:</strong> Senin – Sabtu, 09:00 – 18:00 WITA (UTC+8)
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            2. Panduan Persiapan Konsultasi Awal
          </h2>
          <p>
            Agar sesi diskusi perdana berjalan efektif dan terarah, calon klien disarankan menyiapkan informasi dasar berikut:
          </p>
          <ol style={{ paddingLeft: '20px', marginTop: '10px', display: 'grid', gap: '8px' }}>
            <li>
              <strong>Lokasi & Ukuran Tapak:</strong> Kota/kabupaten, dimensi lahan, kondisi kontur atau lingkungan sekitar, serta foto tapak jika sudah tersedia.
            </li>
            <li>
              <strong>Kebutuhan Fungsi & Ruang:</strong> Jenis bangunan yang direncanakan (hunian pribadi, villa/paviliun resort pesisir, ruang komersial, atau fasilitas publik) beserta daftar ruang utama.
            </li>
            <li>
              <strong>Lingkup Layanan yang Diharapkan:</strong> Apakah dimulai dari eksplorasi konsep awal, analisis tapak & pencahayaan alami, pemodelan 3D, atau paket gambar kerja DED menyeluruh.
            </li>
            <li>
              <strong>Target Jadwal & Estimasi Anggaran:</strong> Perkiraan waktu dimulainya pembangunan agar solusi material dan struktur yang diusulkan tepat guna.
            </li>
          </ol>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            3. Pengiriman Brief via Formulir Web, REST API & MCP
          </h2>
          <p>
            Anda dapat menggunakan formulir interaktif di beranda kami untuk menyusun pesan konsultasi WhatsApp otomatis, atau bagi agen AI dan sistem terintegrasi, mengirimkan data konsultasi melalui endpoint <code>POST /api/notion/inquiry</code> maupun tool <code>submit_project_inquiry</code> pada server MCP kami di <code>/.well-known/mcp</code>.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '18px' }}>
            <Link href="/#contact" className="button button-dark compact">
              Buka Formulir Diskusi Proyek
            </Link>
            <a href="https://wa.me/6285143628550" target="_blank" rel="noopener noreferrer" className="button button-outline compact">
              Chat via WhatsApp (+62 851-4362-8550)
            </a>
            <Link href="/docs" className="button button-outline compact">
              Lihat Dokumentasi API Inquiry
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
