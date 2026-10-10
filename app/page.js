'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const CONCEPTS = {
  lemukutan: {
    title: 'Paviliun Sewa Olahraga Pulau Lemukutan',
    label: 'Arsitektur & DED · Sport Resort',
    image: '/assets/lemukutan-hero-crop.png',
    alt: 'Perspektif 3D Paviliun Sewa Olahraga Pulau Lemukutan Kalimantan Barat',
    description: 'Fasilitas sewa alat olahraga bahari dengan sistem panggung adaptif pesisir dan portal rangka baja prapabrikasi.',
    facts: [
      ['Lokasi', 'Pulau Lemukutan, Kalbar'],
      ['Dimensi', 'Modul 8.4m × 6.6m (55.4 m²)'],
      ['Struktur', 'Baja H-Beam 305×305 & Footplat'],
      ['Keluaran', 'DED Lengkap (40 Lembar)']
    ],
    sections: [
      [
        'Respon Tapak Pesisir & Logistik Pulau',
        'Dirancang untuk kondisi pulau terpencil dengan mengangkat massa bangunan di atas pondasi footplat bertingkat untuk menjaga kontur tanah alami pesisir. Modul struktur baja prapabrikasi memudahkan mobilisasi laut dan perakitan cepat di tapak.'
      ],
      [
        'Transparansi Etalase & Efisiensi Termal',
        'Fasad depan curtain wall kaca transparan berfungsi ganda sebagai etalase peralatan olahraga air dan penangkap cahaya alami. Bukaan ventilasi silang dipadukan dengan 4 titik skylight pada atap pelana bitumen untuk mengalirkan panas ke atas dan memaksimalkan penerangan.'
      ],
      [
        'Gambar Kerja Lengkap & Spesifikasi Teknis',
        'Dokumentasi teknis terinci mencakup denah arsitektur 1:100, potongan melintang/memanjang, isometri 3D rangka baja H-Beam 305×305, hingga detail pembesian footplat beton 150×150 cm bertulang D13.'
      ]
    ]
  },
  courtyard: {
    title: 'Studi Paviliun Halaman',
    label: 'Arsitektur · Eksplorasi Konsep',
    image: '/assets/courtyard-concept.png',
    alt: 'Ilustrasi konsep paviliun tropis dengan halaman tengah dan naungan lebar',
    description: 'Studi konsep paviliun dengan halaman tengah, pohon peneduh, dan naungan atap lebar.',
    facts: [
      ['Status', 'Konsep eksploratif'],
      ['Media', 'Visual konseptual AI'],
      ['Fokus', 'Halaman & naungan']
    ],
    sections: [
      [
        'Eksplorasi Halaman Tengah',
        'Halaman tengah berfungsi sebagai ruang transisi sekaligus pendingin alami mikro. Bukaan naungan lebar dirancang untuk menangkap sirkulasi udara dan menyaring sinar matahari langsung.'
      ],
      [
        'Catatan Batasan Teknis',
        'Materi ini merupakan studi visual konseptual tahap awal GradiEnt Studio. Detail struktural terinci, spesifikasi material, dan simulasi iklim komprehensif dikembangkan pada tahap perancangan lanjutan.'
      ]
    ]
  },
  space: {
    title: 'Diagram Organisasi Ruang',
    label: 'Riset Spasial · Diagram Konsep',
    image: '/assets/space-study.svg?v=3',
    alt: 'Diagram konseptual hubungan ruang terbuka, naungan, dan ruang bersama',
    description: 'Diagram hubungan fungsional antara ruang bersama, halaman terbuka, dan area bernaung.',
    facts: [
      ['Status', 'Diagram konsep'],
      ['Skala', 'Diagram skematik'],
      ['Fokus', 'Hubungan antarruang']
    ],
    sections: [
      [
        'Hubungan Fungsional',
        'Diagram menempatkan ruang terbuka, naungan, dan ruang bersama sebagai tiga bagian yang saling terhubung untuk mengatur alur aktivitas harian.'
      ],
      [
        'Dasar Rancangan Denah',
        'Susunan skematik ini menjadi landasan sebelum menentukan dimensi fisik, aksesibilitas, dan orientasi tapak secara mendalam.'
      ]
    ]
  },
  light: {
    title: 'Diagram Cahaya & Naungan',
    label: 'Riset Pencahayaan · Diagram Konsep',
    image: '/assets/light-study.svg?v=3',
    alt: 'Diagram prinsip overhang menyaring sinar matahari tropis',
    description: 'Diagram prinsip overhang dan peneduh dalam mengatur penetrasi cahaya alami.',
    facts: [
      ['Status', 'Diagram prinsip'],
      ['Metode', 'Geometri naungan'],
      ['Fokus', 'Bukaan & pembiasan']
    ],
    sections: [
      [
        'Pengendalian Radiasi Matahari',
        'Diagram menggambarkan interaksi antara kedalaman kanopi dan bidang bukaan dinding untuk meminimalkan panas radiasi tanpa mengurangi terang alami.'
      ],
      [
        'Pengembangan Simulasi Lanjutan',
        'Diagram ini menyajikan prinsip geometri dasar. Analisis kuantitatif lux dan faktor daylighting mendalam dilakukan menggunakan simulasi digital sesuai data tapak spesifik.'
      ]
    ]
  }
};

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('coastal');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [contactAfterClose, setContactAfterClose] = useState(false);

  // Form state
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    location: '',
    service: 'Arsitektur & tata ruang',
    brief: ''
  });
  const [messageModalOpen, setMessageModalOpen] = useState(false);
  const [messagePreview, setMessagePreview] = useState('');
  const [copyStatus, setCopyStatus] = useState('');
  const [copied, setCopied] = useState(false);

  const clientNameRef = useRef(null);
  const projectDialogRef = useRef(null);
  const messageDialogRef = useRef(null);

  // Handle body lock when dialog or menu is open
  useEffect(() => {
    if (menuOpen || selectedProject || messageModalOpen) {
      document.body.classList.add('dialog-open');
    } else {
      document.body.classList.remove('dialog-open');
    }
  }, [menuOpen, selectedProject, messageModalOpen]);

  // Sync native dialog state
  useEffect(() => {
    if (selectedProject && projectDialogRef.current) {
      if (!projectDialogRef.current.open) {
        projectDialogRef.current.showModal();
        projectDialogRef.current.scrollTop = 0;
      }
    } else if (!selectedProject && projectDialogRef.current?.open) {
      projectDialogRef.current.close();
    }
  }, [selectedProject]);

  useEffect(() => {
    if (messageModalOpen && messageDialogRef.current) {
      if (!messageDialogRef.current.open) {
        messageDialogRef.current.showModal();
        messageDialogRef.current.scrollTop = 0;
      }
    } else if (!messageModalOpen && messageDialogRef.current?.open) {
      messageDialogRef.current.close();
    }
  }, [messageModalOpen]);

  const closeProjectDialog = () => {
    setSelectedProject(null);
    if (contactAfterClose) {
      setContactAfterClose(false);
      setTimeout(() => {
        clientNameRef.current?.focus({ preventScroll: true });
        const contactSection = document.getElementById('contact');
        contactSection?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  const handleServiceSelect = (serviceName) => {
    setInquiryForm((prev) => ({ ...prev, service: serviceName }));
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { name, location, service, brief } = inquiryForm;
    if (!name.trim() || !location.trim() || !brief.trim()) return;

    const formattedMessage = `Halo GradiEnt Studio, saya ingin berdiskusi mengenai rencana proyek.\n\nNama: ${name}\nLokasi: ${location}\nLayanan: ${service}\n\nKebutuhan:\n${brief}\n\nTerima kasih.`;
    setMessagePreview(formattedMessage);
    setCopied(false);
    setCopyStatus('');
    setMessageModalOpen(true);
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(messagePreview);
      setCopied(true);
      setCopyStatus('Pesan berhasil disalin ke clipboard.');
    } catch {
      setCopyStatus('Pilih teks pesan, lalu salin melalui perangkat Anda.');
    }
  };

  // Keyboard navigation for tabs
  const handleTabKeyDown = (e, currentTab) => {
    const tabsList = ['coastal', 'atmosphere', 'space', 'light'];
    const idx = tabsList.indexOf(currentTab);
    let nextTab;
    if (e.key === 'ArrowRight') nextTab = tabsList[(idx + 1) % tabsList.length];
    else if (e.key === 'ArrowLeft') nextTab = tabsList[(idx - 1 + tabsList.length) % tabsList.length];
    else if (e.key === 'Home') nextTab = tabsList[0];
    else if (e.key === 'End') nextTab = tabsList[tabsList.length - 1];

    if (nextTab) {
      e.preventDefault();
      setActiveTab(nextTab);
      document.getElementById(`tab-${nextTab}`)?.focus();
    }
  };

  // Filter study cards count
  const studyCards = [
    { id: 'lemukutan', category: 'architecture', title: 'Paviliun Lemukutan', desc: 'Fasilitas sewa olahraga bahari resort pesisir Kalimantan Barat.', badge: 'Arsitektur & DED', img: '/assets/lemukutan-hero-crop.png' },
    { id: 'courtyard', category: 'architecture', title: 'Ruang sela', desc: 'Studi paviliun halaman dan naungan lebar.', badge: 'Konsep · Visual AI', img: '/assets/courtyard-concept.png' },
    { id: 'space', category: 'research', title: 'Susunan ruang', desc: 'Diagram hubungan ruang bersama dan ruang terbuka.', badge: 'Diagram konsep', img: '/assets/space-study.svg?v=3' },
    { id: 'light', category: 'research', title: 'Lapisan cahaya', desc: 'Diagram orientasi bukaan dan pembiasan cahaya.', badge: 'Diagram konsep', img: '/assets/light-study.svg?v=3' }
  ];

  const visibleStudies = studyCards.filter(
    (card) => activeFilter === 'all' || card.category === activeFilter
  );

  const activeConceptData = selectedProject ? CONCEPTS[selectedProject] : null;

  return (
    <>
      <a className="skip-link" href="#main">Langsung ke konten</a>

      <div className="topline">
        <span>Praktik Arsitektur & Desain Spasial · GradiEnt Studio Architectural Design 3D Modeling</span>
        <span>Makassar, Indonesia</span>
      </div>

      <header className="header">
        <Link href="/" className="brand" aria-label="GradiEnt Studio — beranda">
          <img src="/assets/brand-logo.png" alt="" width="40" height="40" />
          <span>GradiEnt<span className="brand-studio">STUDIO</span></span>
        </Link>

        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#explorations">Studi Desain</a>
          <a href="#services">Layanan</a>
          <a href="#process">Tahapan Kerja</a>
          <Link href="/about">Tentang Studio</Link>
          <Link href="/contact">Kontak</Link>
        </nav>

        <div className="header-actions">
          <Link className="account" href="/login">Masuk</Link>
          <a className="button button-dark compact" href="#contact">Bicarakan proyek</a>
          <button
            id="menu-button"
            className="menu-button"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-controls="mobile-nav"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <nav id="mobile-nav" className="mobile-nav" aria-label="Navigasi ponsel" hidden={!menuOpen}>
        <a href="#explorations" onClick={() => setMenuOpen(false)}>Studi Desain</a>
        <a href="#services" onClick={() => setMenuOpen(false)}>Layanan</a>
        <a href="#process" onClick={() => setMenuOpen(false)}>Tahapan Kerja</a>
        <Link href="/about" onClick={() => setMenuOpen(false)}>Tentang Studio</Link>
        <Link href="/contact" onClick={() => setMenuOpen(false)}>Kontak</Link>
        <Link href="/login" onClick={() => setMenuOpen(false)}>Masuk ke akun</Link>
        <a href="#contact" onClick={() => setMenuOpen(false)}>Bicarakan proyek</a>
      </nav>

      <main id="main">
        {/* HERO SECTION */}
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <h1 id="hero-title">
              <span>GradiEnt Studio — Arsitektur & desain spasial</span><br />
              di Makassar.
            </h1>
            <p className="hero-description">
              GradiEnt Studio (GradiEnt Studio Architectural Design 3D Modeling) adalah praktik arsitektur, analisis pencahayaan alami tropis, dan platform pemodelan 3D spasial oleh Heru Ardiansyah untuk konsep ruang kontekstual serta dokumentasi DED terukur.
            </p>
            <div className="hero-actions">
              <a href="#explorations" className="button button-dark">Lihat studi desain</a>
              <a href="#contact" className="button button-outline">Bicarakan proyek</a>
            </div>
          </div>
        </section>

        {/* SHOWCASE SECTION */}
        <section className="showcase wrap" id="explorations" aria-labelledby="showcase-title">
          <div className="section-caption">
            <h2 id="showcase-title">Studi desain</h2>
          </div>

          <div className="showcase-frame">
            <div className="showcase-tabs" role="tablist" aria-label="Sudut pandang eksplorasi">
              <button
                id="tab-coastal"
                role="tab"
                aria-selected={activeTab === 'coastal'}
                aria-controls="panel-coastal"
                tabIndex={activeTab === 'coastal' ? 0 : -1}
                onClick={() => setActiveTab('coastal')}
                onKeyDown={(e) => handleTabKeyDown(e, 'coastal')}
              >
                Paviliun pesisir
              </button>
              <button
                id="tab-atmosphere"
                role="tab"
                aria-selected={activeTab === 'atmosphere'}
                aria-controls="panel-atmosphere"
                tabIndex={activeTab === 'atmosphere' ? 0 : -1}
                onClick={() => setActiveTab('atmosphere')}
                onKeyDown={(e) => handleTabKeyDown(e, 'atmosphere')}
              >
                Atmosfer ruang
              </button>
              <button
                id="tab-space"
                role="tab"
                aria-selected={activeTab === 'space'}
                aria-controls="panel-space"
                tabIndex={activeTab === 'space' ? 0 : -1}
                onClick={() => setActiveTab('space')}
                onKeyDown={(e) => handleTabKeyDown(e, 'space')}
              >
                Susunan ruang
              </button>
              <button
                id="tab-light"
                role="tab"
                aria-selected={activeTab === 'light'}
                aria-controls="panel-light"
                tabIndex={activeTab === 'light' ? 0 : -1}
                onClick={() => setActiveTab('light')}
                onKeyDown={(e) => handleTabKeyDown(e, 'light')}
              >
                Cahaya & naungan
              </button>
            </div>

            {/* PANEL COASTAL */}
            <div
              id="panel-coastal"
              className="showcase-panel"
              role="tabpanel"
              aria-labelledby="tab-coastal"
              hidden={activeTab !== 'coastal'}
            >
              <div className="showcase-media">
                <img
                  className="showcase-image"
                  src="/assets/lemukutan-hero-crop.png"
                  alt="Perspektif 3D Paviliun Sewa Olahraga Pulau Lemukutan Kalimantan Barat"
                  fetchPriority="high"
                  width="1667"
                  height="1179"
                />
                <span className="media-label" style={{ background: '#cf6b42', color: '#fff', border: 'none' }}>Arsitektur & DED</span>
              </div>
              <div className="showcase-info-bar">
                <div className="info-text">
                  <span className="micro">DED & TEKTONIK PESISIR</span>
                  <h3>Paviliun Lemukutan</h3>
                  <p>Fasilitas sewa olahraga bahari dengan sistem panggung adaptif pesisir dan portal baja H-Beam.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="/preview-lemukutan.html"
                    className="button button-outline compact"
                  >
                    Buka DED lengkap ↗
                  </a>
                  <button
                    type="button"
                    className="button button-dark compact"
                    onClick={() => setSelectedProject('lemukutan')}
                  >
                    Lihat detail
                  </button>
                </div>
              </div>
            </div>

            {/* PANEL ATMOSPHERE */}
            <div
              id="panel-atmosphere"
              className="showcase-panel"
              role="tabpanel"
              aria-labelledby="tab-atmosphere"
              hidden={activeTab !== 'atmosphere'}
            >
              <div className="showcase-media">
                <img
                  className="showcase-image"
                  src="/assets/courtyard-concept.png"
                  alt="Ilustrasi konsep paviliun tropis dengan halaman, pohon, dinding bata, dan naungan lebar"
                  fetchPriority="high"
                  width="1672"
                  height="941"
                />
                <span className="media-label">Visual konseptual · AI</span>
              </div>
              <div className="showcase-info-bar">
                <div className="info-text">
                  <span className="micro">STUDI KONSEP</span>
                  <h3>Ruang sela</h3>
                  <p>Halaman tengah sebagai ruang pertemuan dan sirkulasi alami.</p>
                </div>
                <button
                  type="button"
                  className="button button-dark compact"
                  onClick={() => setSelectedProject('courtyard')}
                >
                  Lihat detail
                </button>
              </div>
            </div>

            {/* PANEL SPACE */}
            <div
              id="panel-space"
              className="showcase-panel"
              role="tabpanel"
              aria-labelledby="tab-space"
              hidden={activeTab !== 'space'}
            >
              <div className="showcase-media">
                <img
                  className="showcase-image"
                  src="/assets/space-study.svg?v=3"
                  alt="Diagram konseptual hubungan ruang terbuka, naungan dan ruang bersama"
                  width="1440"
                  height="900"
                />
                <span className="media-label">Diagram konsep</span>
              </div>
              <div className="showcase-info-bar">
                <div className="info-text">
                  <span className="micro">ORGANISASI RUANG</span>
                  <h3>Susunan ruang</h3>
                  <p>Diagram hubungan fungsional antara ruang bersama, halaman terbuka, dan area bernaung.</p>
                </div>
                <button
                  type="button"
                  className="button button-dark compact"
                  onClick={() => setSelectedProject('space')}
                >
                  Buka eksplorasi
                </button>
              </div>
            </div>

            {/* PANEL LIGHT */}
            <div
              id="panel-light"
              className="showcase-panel"
              role="tabpanel"
              aria-labelledby="tab-light"
              hidden={activeTab !== 'light'}
            >
              <div className="showcase-media">
                <img
                  className="showcase-image"
                  src="/assets/light-study.svg?v=3"
                  alt="Ilustrasi prinsip overhang menyaring cahaya pada ruang di bawah naungan"
                  width="1440"
                  height="900"
                />
                <span className="media-label">Diagram konsep</span>
              </div>
              <div className="showcase-info-bar">
                <div className="info-text">
                  <span className="micro">CAHAYA & NAUNGAN</span>
                  <h3>Lapisan cahaya</h3>
                  <p>Diagram prinsip overhang dan peneduh dalam mengatur penetrasi cahaya alami.</p>
                </div>
                <button
                  type="button"
                  className="button button-dark compact"
                  onClick={() => setSelectedProject('light')}
                >
                  Buka eksplorasi
                </button>
              </div>
            </div>
          </div>

          <div className="showcase-meta">
            <span>Konsep dan diagram eksploratif</span>
            <p>Eksplorasi awal hubungan geometri ruang dengan pencahayaan dan lingkungan.</p>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="services section wrap" id="services" aria-labelledby="services-title">
          <div className="section-heading">
            <div>
              <h2 id="services-title">Layanan desain</h2>
            </div>
            <p className="section-intro">
              Setiap proyek berangkat dari konteks yang unik. Lingkup kerja disesuaikan mulai dari eksplorasi awal hingga dokumentasi rancangan.
            </p>
          </div>

          <div className="service-list">
            <article className="service-row">
              <span className="service-number">01</span>
              <div>
                <h3>Arsitektur & tata ruang</h3>
                <p>Menyusun kebutuhan ruang, tata letak fungsional, dan bentuk massa bangunan yang kontekstual.</p>
                <div className="tags">
                  <span>Konsep arsitektur</span>
                  <span>Tata ruang</span>
                  <span>Pengembangan desain</span>
                </div>
              </div>
              <button
                type="button"
                className="service-link"
                onClick={() => handleServiceSelect('Arsitektur & tata ruang')}
              >
                Diskusikan
              </button>
            </article>

            <article className="service-row">
              <span className="service-number">02</span>
              <div>
                <h3>Tapak & pencahayaan</h3>
                <p>Membaca orientasi matahari, jalur angin, dan strategi bukaan alami untuk kenyamanan termal dan visual.</p>
                <div className="tags">
                  <span>Analisis tapak</span>
                  <span>Pencahayaan alami</span>
                  <span>Strategi selubung</span>
                </div>
              </div>
              <button
                type="button"
                className="service-link"
                onClick={() => handleServiceSelect('Tapak & pencahayaan')}
              >
                Diskusikan
              </button>
            </article>

            <article className="service-row">
              <span className="service-number">03</span>
              <div>
                <h3>Pemodelan & visualisasi 3D</h3>
                <p>Mengembangkan dan menguji gagasan desain melalui model digital 3D dan studi geometri ruang terukur.</p>
                <div className="tags">
                  <span>Pemodelan 3D</span>
                  <span>Eksplorasi geometri</span>
                  <span>Visualisasi konsep</span>
                </div>
              </div>
              <button
                type="button"
                className="service-link"
                onClick={() => handleServiceSelect('Pemodelan & visualisasi 3D')}
              >
                Diskusikan
              </button>
            </article>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="process-section" id="process" aria-labelledby="process-title">
          <div className="wrap process-layout">
            <div className="process-intro">
              <h2 id="process-title">Tahapan kerja</h2>
              <p className="section-intro">
                Alur kolaborasi yang terstruktur untuk memastikan setiap keputusan rancangan memiliki dasar yang jelas.
              </p>
              <a href="#contact" className="text-link">Mulai percakapan</a>
            </div>

            <div className="process-steps">
              <details open>
                <summary>
                  <h3>Mendengarkan kebutuhan</h3>
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="step-body">
                  <p>Memahami aktivitas, kebutuhan ruang, lokasi tapak, prioritas, dan batasan proyek sejak tahap awal.</p>
                  <span className="micro">Keluaran: Brief dan lingkup perancangan</span>
                </div>
              </details>

              <details>
                <summary>
                  <h3>Analisis konteks tapak</h3>
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="step-body">
                  <p>Menelaah kondisi tapak, orientasi matahari, sirkulasi akses, dan iklim mikro sekitar sebagai landasan desain.</p>
                  <span className="micro">Keluaran: Pemetaan potensi dan batasan</span>
                </div>
              </details>

              <details>
                <summary>
                  <h3>Eksplorasi & pengujian konsep</h3>
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="step-body">
                  <p>Mengembangkan alternatif organisasi ruang, hubungan massa, dan strategi naungan untuk menemukan solusi terbaik.</p>
                  <span className="micro">Keluaran: Konsep terpilih dan diagram ruang</span>
                </div>
              </details>

              <details>
                <summary>
                  <h3>Finalisasi dokumentasi</h3>
                  <span className="plus" aria-hidden="true"></span>
                </summary>
                <div className="step-body">
                  <p>Mengembangkan gambar arsitektural dan materi visual terukur sesuai tahap pekerjaan yang disepakati.</p>
                  <span className="micro">Keluaran: Dokumentasi rancangan terpadu</span>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* STUDIES / GALLERY SECTION */}
        <section className="section wrap studies" aria-labelledby="studies-title">
          <div className="section-heading compact-heading">
            <div>
              <h2 id="studies-title">Konsep dan diagram</h2>
            </div>
            <div className="filters" role="group" aria-label="Filter eksplorasi">
              <button
                type="button"
                className={activeFilter === 'all' ? 'active' : ''}
                aria-pressed={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
              >
                Semua
              </button>
              <button
                type="button"
                className={activeFilter === 'architecture' ? 'active' : ''}
                aria-pressed={activeFilter === 'architecture'}
                onClick={() => setActiveFilter('architecture')}
              >
                Arsitektur
              </button>
              <button
                type="button"
                className={activeFilter === 'research' ? 'active' : ''}
                aria-pressed={activeFilter === 'research'}
                onClick={() => setActiveFilter('research')}
              >
                Riset ruang
              </button>
            </div>
          </div>

          <div className="study-grid" id="study-grid">
            {visibleStudies.map((card) => (
              <article key={card.id} className="study-card" data-category={card.category}>
                <button
                  type="button"
                  className="study-image"
                  aria-label={`Buka ${card.title}`}
                  onClick={() => setSelectedProject(card.id)}
                >
                  <img src={card.img} alt={card.desc} loading="lazy" width="1440" height="900" />
                  <span className="study-badge">{card.badge}</span>
                </button>
                <div className="study-info">
                  <div>
                    <h3>
                      <button
                        type="button"
                        className="title-button"
                        onClick={() => setSelectedProject(card.id)}
                      >
                        {card.title}
                      </button>
                    </h3>
                    <p>{card.desc}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="gallery-status" id="gallery-status" aria-live="polite">
            {visibleStudies.length} eksplorasi
            {activeFilter !== 'all' ? ` · ${activeFilter === 'architecture' ? 'Arsitektur' : 'Riset ruang'}` : ''}
          </p>
        </section>

        {/* STUDIO SECTION */}
        <section className="studio-section wrap" id="studio" aria-labelledby="studio-title">
          <div className="studio-label">
            <span className="micro">PROFIL STUDIO</span>
            <span className="studio-city">Makassar, Indonesia</span>
          </div>

          <div className="studio-copy">
            <h2 id="studio-title">Tentang GradiEnt</h2>
            <p>
              GradiEnt Studio adalah praktik arsitektur dan desain spasial yang dirintis Heru Ardiansyah di Makassar. Fokus studio tertumpu pada eksplorasi ruang yang kontekstual, optimalisasi pencahayaan alami, dan respons adaptif terhadap iklim tropis.
            </p>
            <p>
              Pendekatan desain mengombinasikan studi tapak cermat dengan pemodelan 3D untuk menguji alternatif ruang secara terukur dan komunikatif.
            </p>
            <div className="founder">
              <span className="founder-monogram">HA</span>
              <div>
                <strong>Heru Ardiansyah</strong>
                <span>Founder · Spatial Designer</span>
              </div>
              <a
                href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/"
                target="_blank"
                rel="noopener noreferrer"
                className="founder-link"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="faq-section wrap" aria-labelledby="faq-title">
          <h2 id="faq-title">Pertanyaan umum</h2>
          <div className="faq-list">
            <details>
              <summary>Apa yang perlu disiapkan untuk konsultasi?<span className="plus" aria-hidden="true"></span></summary>
              <p>Gambaran kebutuhan, lokasi tapak, dan perkiraan luas jika sudah tersedia. Foto lokasi, referensi rancangan, serta kisaran anggaran akan mempermudah diskusi awal.</p>
            </details>
            <details>
              <summary>Apakah bisa mulai dari tahap konsep awal saja?<span className="plus" aria-hidden="true"></span></summary>
              <p>Bisa. Tahapan, keluaran dokumen, dan batas pekerjaan disepakati di awal sesuai kebutuhan dan skala proyek Anda.</p>
            </details>
            <details>
              <summary>Bagaimana estimasi biaya dan waktu pengerjaannya?<span className="plus" aria-hidden="true"></span></summary>
              <p>Penawaran kerja dan jadwal disusun setelah lingkup, kompleksitas ruang, dan materi awal dipahami bersama sebelum pengerjaan dimulai.</p>
            </details>
            <details>
              <summary>Apakah visual di situs merupakan bangunan terbangun?<span className="plus" aria-hidden="true"></span></summary>
              <p>Materi yang ditampilkan saat ini merupakan eksplorasi konsep awal dan diagram ruang. Setiap visual diberi keterangan transparan sesuai status pengembangannya.</p>
            </details>
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="wrap contact-layout">
            <div className="contact-intro">
              <h2 id="contact-title">
                Diskusikan rencana<br />
                <span>proyek Anda.</span>
              </h2>
              <p className="contact-description">
                Ceritakan kebutuhan ruang atau rencana pembangunan Anda.<br />
                GradiEnt Studio siap membantu merumuskan arah perancangan yang tepat.
              </p>
              <div className="contact-links">
                <a href="mailto:heruardiansyah2one@gmail.com">Email studio</a>
                <a href="https://wa.me/6285143628550" target="_blank" rel="noopener noreferrer">WhatsApp studio</a>
              </div>
            </div>

            <form id="inquiry-form" className="inquiry-form" onSubmit={handleFormSubmit}>
              <div className="form-top">
                <span className="form-title">Formulir Diskusi Proyek</span>
              </div>

              <div className="form-row">
                <label htmlFor="client-name">
                  Nama Anda
                  <input
                    id="client-name"
                    ref={clientNameRef}
                    name="name"
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    required
                    maxLength={100}
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                  />
                </label>
                <label htmlFor="project-location">
                  Lokasi proyek
                  <input
                    id="project-location"
                    name="location"
                    placeholder="Kota / kabupaten"
                    required
                    maxLength={120}
                    value={inquiryForm.location}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, location: e.target.value })}
                  />
                </label>
              </div>

              <label htmlFor="service-select">
                Layanan yang ingin didiskusikan
                <select
                  id="service-select"
                  name="service"
                  value={inquiryForm.service}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, service: e.target.value })}
                >
                  <option value="Arsitektur & tata ruang">Arsitektur & tata ruang</option>
                  <option value="Tapak & pencahayaan">Tapak & pencahayaan</option>
                  <option value="Pemodelan & visualisasi 3D">Pemodelan & visualisasi 3D</option>
                  <option value="Belum tahu, ingin berdiskusi">Belum tahu, ingin berdiskusi</option>
                </select>
              </label>

              <label htmlFor="project-brief">
                Ceritakan tentang rencana Anda
                <textarea
                  id="project-brief"
                  name="brief"
                  rows={3}
                  placeholder="Kebutuhan ruang, kondisi tapak, atau hal yang ingin ditanyakan…"
                  required
                  maxLength={2000}
                  value={inquiryForm.brief}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, brief: e.target.value })}
                />
              </label>

              <button className="button button-dark" type="submit">
                Siapkan pesan WhatsApp
              </button>
              <p className="form-note">
                Pesan dapat Anda periksa dan edit sebelum dibuka di aplikasi WhatsApp. Formulir ini tidak menyimpan data pribadi Anda di server.
              </p>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer wrap">
        <div className="footer-top">
          <Link href="/" className="brand">
            <img src="/assets/brand-logo.png" alt="Logo GradiEnt" width="40" height="40" />
            <span>GradiEnt<span className="brand-studio">STUDIO</span></span>
          </Link>
          <button
            type="button"
            className="back-top"
            aria-label="Kembali ke atas"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Ke atas
          </button>
        </div>

        <div className="footer-links">
          <div>
            <span className="footer-heading">JELAJAHI</span>
            <a href="#explorations">Studi Desain</a>
            <a href="#services">Layanan</a>
            <Link href="/about">Tentang Studio</Link>
            <Link href="/contact">Kontak</Link>
          </div>

          <div>
            <span className="footer-heading">DOKUMENTASI & DED</span>
            <a href="/preview-lemukutan.html">DED Paviliun Lemukutan</a>
            <a href="#process">Tahapan Perancangan</a>
            <Link href="/docs">Dokumentasi & API Docs</Link>
            <a href="https://instagram.com/heruardiansyah_" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.linkedin.com/in/heru-ardiansyah-84a97343a/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>

          <div>
            <span className="footer-heading">PORTAL KLIEN</span>
            <Link href="/login">Masuk Akun</Link>
            <Link href="/register">Registrasi</Link>
            <Link href="/dashboard">Dashboard Konsultasi</Link>
          </div>

          <div className="footer-address">
            <span className="footer-heading">LOKASI</span>
            <p>
              Jl. Perintis Kemerdekaan, Tamalanrea<br />
              Makassar, Sulawesi Selatan 90245 · WITA
            </p>
            <a href="mailto:heruardiansyah2one@gmail.com">heruardiansyah2one@gmail.com</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 GradiEnt Studio. Seluruh hak cipta dilindungi.</span>
          <div>
            <Link href="/about">Tentang</Link>
            <Link href="/contact">Kontak</Link>
            <Link href="/docs">API Docs</Link>
            <Link href="/privacy">Kebijakan Privasi</Link>
            <Link href="/terms">Ketentuan Layanan</Link>
          </div>
        </div>
      </footer>

      {/* PROJECT DETAILS DIALOG */}
      <dialog
        id="project-dialog"
        ref={projectDialogRef}
        className="project-dialog"
        aria-labelledby="project-dialog-title"
        onCancel={closeProjectDialog}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Tutup detail konsep"
          onClick={closeProjectDialog}
        >
          ×
        </button>
        {activeConceptData && (
          <>
            <img
              id="project-dialog-image"
              src={activeConceptData.image}
              alt={activeConceptData.alt}
            />
            <div className="project-dialog-body">
              <p className="dialog-category" id="project-dialog-label">{activeConceptData.label}</p>
              <h2 id="project-dialog-title">{activeConceptData.title}</h2>
              <p className="dialog-lead" id="project-dialog-description">{activeConceptData.description}</p>
              <dl id="project-dialog-facts">
                {activeConceptData.facts.map(([term, value], idx) => (
                  <div key={idx}>
                    <dt>{term}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <div id="project-dialog-notes">
                {activeConceptData.sections.map(([heading, copy], idx) => (
                  <div key={idx} style={{ marginBottom: '16px' }}>
                    <h3>{heading}</h3>
                    <p>{copy}</p>
                  </div>
                ))}
              </div>
              {selectedProject === 'lemukutan' && (
                <div style={{ marginTop: '16px', marginBottom: '14px' }}>
                  <a
                    href="/preview-lemukutan.html"
                    className="button button-outline compact"
                    style={{ display: 'inline-flex' }}
                  >
                    Buka Gambar Kerja & Analisis Lengkap ↗
                  </a>
                </div>
              )}
              <button
                type="button"
                className="button button-dark dialog-contact"
                onClick={() => {
                  setContactAfterClose(true);
                  closeProjectDialog();
                }}
              >
                Diskusikan gagasan serupa
              </button>
            </div>
          </>
        )}
      </dialog>

      {/* MESSAGE CONFIRMATION DIALOG */}
      <dialog
        id="message-dialog"
        ref={messageDialogRef}
        className="message-dialog"
        aria-labelledby="message-title"
        onCancel={() => setMessageModalOpen(false)}
      >
        <button
          type="button"
          className="dialog-close"
          aria-label="Tutup pratinjau pesan"
          onClick={() => setMessageModalOpen(false)}
        >
          ×
        </button>
        <p className="dialog-category">Konfirmasi Pesan</p>
        <h2 id="message-title">Pesan Anda siap dikirim</h2>
        <p>Pesan belum terkirim secara otomatis. Anda dapat meninjau atau mengubah isi teks sebelum membuka WhatsApp.</p>
        <textarea
          id="message-preview"
          aria-label="Pesan WhatsApp yang dapat diedit"
          rows={10}
          value={messagePreview}
          onChange={(e) => setMessagePreview(e.target.value)}
        />
        <div className="message-actions">
          <button
            type="button"
            className="button button-outline"
            id="copy-message"
            onClick={handleCopyMessage}
          >
            {copied ? 'Tersalin ✓' : 'Salin pesan'}
          </button>
          <a
            href={`https://wa.me/6285143628550?text=${encodeURIComponent(messagePreview)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-dark"
            id="whatsapp-link"
          >
            Buka WhatsApp
          </a>
        </div>
        {copyStatus && (
          <p id="copy-status" className="form-note" aria-live="polite">
            {copyStatus}
          </p>
        )}
      </dialog>
    </>
  );
}
