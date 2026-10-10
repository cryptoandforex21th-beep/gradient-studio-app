import Link from 'next/link';

export const metadata = {
  title: 'Tentang Kami / About — GradiEnt Studio Architectural & 3D Spatial Design Makassar',
  description:
    'Profil resmi GradiEnt Studio, praktik arsitektur, riset pencahayaan alami tropis, dan pemodelan spasial 3D yang didirikan oleh Heru Ardiansyah di Makassar, Indonesia.',
  alternates: {
    canonical: 'https://gradientarch.tech/about'
  }
};

export default function AboutPage() {
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
        Tentang GradiEnt Studio (About Us)
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
        GradiEnt Studio Architecture & Spatial Practice · Didirikan 2026 di Makassar, Sulawesi Selatan, Indonesia
      </p>

      <div style={{ display: 'grid', gap: '28px', fontSize: '15px' }}>
        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            1. Identitas & Misi Praktik Arsitektur
          </h2>
          <p>
            <strong>GradiEnt Studio</strong> (<code>https://gradientarch.tech</code>) adalah praktik arsitektur, riset pencahayaan alami tropis, dan platform pemodelan spasial 3D yang dirintis oleh <strong>Heru Ardiansyah</strong> di Makassar, Indonesia. Kami merancang bangunan dan ruang yang merespons iklim khatulistiwa secara terukur—menggabungkan kepekaan tektonik material dengan analisis lingkungan berbasis simulasi dan pemodelan digital 3D.
          </p>
          <p style={{ marginTop: '12px' }}>
            Nama <em>GradiEnt</em> mencerminkan fokus studio pada gradasi ruang transisi: pertemuan antara ruang terbuka dan ruang bernaung, penyaringan radiasi matahari tropis menjadi cahaya alami yang teduh, serta kesinambungan antara eksplorasi konsep spasial dan gambar kerja teknis (Detailed Engineering Design / DED) yang siap dibangun di lapangan.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            2. Prinsip Perancangan (Studio Philosophy)
          </h2>
          <ul style={{ paddingLeft: '20px', display: 'grid', gap: '10px' }}>
            <li>
              <strong>Read the Site First (Baca Tapak Lebih Dulu):</strong> Setiap rancangan dimulai dari pembacaan cermat terhadap lintasan matahari, arah angin muson, topografi tanah, aksesibilitas logistik lokal, dan karakter lingkungan sekitar sebelum menetapkan bentuk massa bangunan.
            </li>
            <li>
              <strong>Spaces with Weather in Them (Ruang yang Bernapas Bersama Iklim):</strong> Kami memprioritaskan strategi desain pasif—seperti halaman tengah (<em>inner courtyard</em>), teritisan/overhang lebar, ventilasi silang, dan skylight terarah—untuk menjaga kenyamanan termal dan visual sesuai standar SNI 03-6197-2020.
            </li>
            <li>
              <strong>Built Slowly, Drawn Clearly (Dirancang Cermat, Digambar Jelas):</strong> Setiap gagasan diuji melalui diagram organisasi ruang, model 3D terukur, hingga dokumen gambar kerja DED lengkap (meliputi denah, potongan, detail struktur baja H-Beam, dan pondasi footplat beton bertulang).
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            3. Pendiri & Principal (Founder Profile)
          </h2>
          <p>
            <strong>Heru Ardiansyah</strong> adalah Founder dan Principal Spatial Designer di GradiEnt Studio. Berbasis di Makassar dengan latar belakang pendidikan Arsitektur di Universitas Hasanuddin (Unhas), Heru memfokuskan praktik dan risetnya pada arsitektur kontekstual tropis, sistem selubung/fasad adaptif, simulasi pencahayaan alami (daylighting), serta integrasi alur kerja BIM/CAD (Rhino, Grasshopper, Autodesk Revit) dengan teknologi web modern.
          </p>
          <p style={{ marginTop: '10px' }}>
            Karya studi terbarunya meliputi <em>Paviliun Sewa Olahraga Pulau Lemukutan</em> (Kalimantan Barat) dengan sistem panggung pesisir adaptif dan struktur baja H-Beam 305×305 (40 lembar DED), serta eksplorasi tipologi paviliun halaman tropis dan riset pencahayaan di Makassar.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            4. Layanan Utama & Infrastruktur Digital Terbuka
          </h2>
          <p>
            GradiEnt Studio melayani klien perorangan, pengembang kawasan wisata/resort, dan institusi melalui tiga lingkup utama: (1) <strong>Arsitektur & Tata Ruang</strong>, (2) <strong>Analisis Tapak & Pencahayaan Alami</strong>, serta (3) <strong>Pemodelan & Visualisasi 3D</strong>. Selain portal konsultasi klien berbasis web, GradiEnt Studio menyediakan dokumentasi API terbuka dan server <strong>Model Context Protocol (MCP)</strong> agar agen AI dapat menelusuri portofolio dan mengirimkan brief konsultasi secara terprogram.
          </p>
        </section>

        <section style={{ borderTop: '1px solid var(--line)', paddingTop: '20px', marginTop: '8px' }}>
          <h2 style={{ fontFamily: 'var(--mono)', fontSize: '13px', textTransform: 'uppercase', color: 'var(--accent)', letterSpacing: '.08em', marginBottom: '10px' }}>
            5. Informasi Kantor & Verifikasi Bisnis
          </h2>
          <p>
            <strong>Nama Resmi:</strong> GradiEnt Studio Architecture & Spatial Practice<br />
            <strong>Alamat Studio:</strong> Jl. Perintis Kemerdekaan, Tamalanrea, Makassar, Sulawesi Selatan 90245, Indonesia<br />
            <strong>Email Resmi:</strong> <a href="mailto:heruardiansyah2one@gmail.com" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>heruardiansyah2one@gmail.com</a><br />
            <strong>Telepon / WhatsApp:</strong> <a href="https://wa.me/6285143628550" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>+62 851-4362-8550</a><br />
            <strong>LinkedIn Principal:</strong> <a href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', textDecoration: 'underline' }}>Heru Ardiansyah</a>
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '16px' }}>
            <Link href="/contact" className="button button-dark compact">
              Hubungi Studio →
            </Link>
            <Link href="/docs" className="button button-outline compact">
              Dokumentasi Developer & MCP
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
