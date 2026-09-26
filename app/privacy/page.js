import Link from 'next/link';

export const metadata = {
  title: 'Kebijakan Privasi / Privacy Policy — GradiEnt Studio',
  description: 'Kebijakan Privasi resmi GradiEnt Studio terkait penggunaan data akun Google dan layanan konsultasi arsitektur.'
};

export default function PrivacyPage() {
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
        Kebijakan Privasi (Privacy Policy)
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
            1. Pendahuluan
          </h2>
          <p>
            GradiEnt Studio ("kami", "studio") berkomitmen penuh melindungi privasi setiap pengunjung, klien, dan pengguna aplikasi web <strong>https://gradientstudioapp.vercel.app</strong>. Kebijakan ini menjelaskan bagaimana data Anda dikumpulkan, digunakan, dan dilindungi.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            2. Data yang Dikumpulkan Melalui Google OAuth
          </h2>
          <p>
            Ketika Anda menggunakan fitur <strong>Masuk dengan Google (Sign in with Google)</strong>, kami hanya meminta izin akses data profil dasar publik yang disediakan oleh Google:
          </p>
          <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
            <li><strong>Nama Lengkap:</strong> Digunakan untuk menyapa dan menampilkan identitas klien di Dashboard Konsultasi.</li>
            <li><strong>Alamat Email:</strong> Digunakan sebagai pengenal unik akun Anda serta sarana korespondensi tindak lanjut proyek.</li>
            <li><strong>Foto Profil (Avatar):</strong> Digunakan semata-mata untuk menampilkan foto profil di Dashboard Klien Anda.</li>
          </ul>
          <p style={{ marginTop: '8px' }}>
            Kami <strong>TIDAK PERNAH</strong> meminta, mengakses, membaca, atau menyimpan data sensitif lainnya seperti pesan Gmail, Google Drive, kontak, ataupun kata sandi akun Google Anda.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            3. Penggunaan Data & Kepatuhan Google API Services
          </h2>
          <p>
            Data yang diperoleh melalui Google OAuth digunakan secara eksklusif untuk autentikasi dan penyediaan akses ke portal konsultasi arsitektur GradiEnt Studio.
          </p>
          <p style={{ marginTop: '8px' }}>
            Penggunaan dan transfer informasi yang diterima dari Google APIs oleh GradiEnt Studio mematuhi sepenuhnya <em>Google API Services User Data Policy</em>, termasuk persyaratan <em>Limited Use</em>. Kami <strong>tidak menjual</strong>, membagikan, atau menyewakan data pengguna Anda kepada pihak ketiga mana pun untuk tujuan iklan atau pemasaran.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            4. Penyimpanan & Keamanan Data
          </h2>
          <p>
            Data autentikasi dikelola secara aman menggunakan infrastruktur terenkripsi <strong>Supabase Cloud</strong> yang berlokasi di region Singapura (ap-southeast-1) dengan standar keamanan industri dan Row Level Security (RLS).
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            5. Hak Pengguna & Penghapusan Akun
          </h2>
          <p>
            Anda memiliki hak untuk meminta pembaruan data atau penghapusan menyeluruh data akun Anda dari database kami kapan saja. Untuk mengajukan permintaan penghapusan data, silakan hubungi Principal kami melalui kontak di bawah.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '12px' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '8px' }}>
            6. Kontak Pengelola Aplikasi
          </h2>
          <p>
            Jika Anda memiliki pertanyaan terkait Kebijakan Privasi ini, silakan hubungi:<br />
            <strong>Heru Ardiansyah — Founder & Principal GradiEnt Studio</strong><br />
            Email: <a href="mailto:heruardiansyah2one@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>heruardiansyah2one@gmail.com</a><br />
            WhatsApp: <a href="https://wa.me/6285143628550" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>+62 851-4362-8550</a><br />
            Lokasi: Makassar, Indonesia
          </p>
        </section>
      </div>
    </div>
  );
}
