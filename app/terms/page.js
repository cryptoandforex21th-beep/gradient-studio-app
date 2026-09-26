import Link from 'next/link';

export const metadata = {
  title: 'Syarat & Ketentuan / Terms of Service — GradiEnt Studio',
  description: 'Syarat dan Ketentuan layanan konsultasi arsitektur dan portal web GradiEnt Studio.'
};

export default function TermsPage() {
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
        fontSize: 'clamp(32px, 4vw, 44px)',
        fontWeight: 600,
        lineHeight: 1.1,
        letterSpacing: '-.03em',
        marginBottom: '12px'
      }}>
        Syarat & Ketentuan (Terms of Service)
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
        Terakhir diperbarui: 27 September 2026 / GradiEnt Studio — Heru Ardiansyah
      </p>

      <div style={{ display: 'grid', gap: '24px', fontSize: '14px' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            1. Ruang Lingkup Layanan
          </h2>
          <p>
            GradiEnt Studio menyediakan platform digital ini sebagai media portofolio arsitektur, eksibisi desain parametrik, dan penghubung komunikasi awal bagi calon klien yang ingin berkonsultasi mengenai proyek spasial.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            2. Akun Pengguna & Tanggung Jawab
          </h2>
          <p>
            Pengguna yang mendaftar atau masuk menggunakan akun Google bertanggung jawab untuk menjaga integritas informasi yang diberikan saat mengirimkan formulir konsultasi.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            3. Hak Cipta & Properti Intelektual
          </h2>
          <p>
            Seluruh gambar, materi 3D axonometri, sketsa, dan konten desain yang dipublikasikan di situs ini merupakan hak cipta milik Heru Ardiansyah / GradiEnt Studio, kecuali dinyatakan lain.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '12px' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            4. Kontak & Konsultasi
          </h2>
          <p>
            Untuk pertanyaan terkait syarat layanan atau penjadwalan konsultasi:<br />
            <strong>Heru Ardiansyah</strong> — <a href="mailto:heruardiansyah2one@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>heruardiansyah2one@gmail.com</a>
          </p>
        </section>
      </div>
    </div>
  );
}
