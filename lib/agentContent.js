export const SITE_URL = 'https://gradientarch.tech';

export const STUDIO_INFO = {
  name: 'GradiEnt Studio',
  legalName: 'GradiEnt Studio Architecture & Spatial Practice',
  productCategory: 'Architectural Design, 3D Spatial Modeling & Tropical Daylighting Platform',
  tagline: 'Spaces with weather in them. Built slowly, drawn clearly. Read the site first.',
  foundedYear: '2026',
  founder: {
    name: 'Heru Ardiansyah',
    role: 'Founder & Principal Spatial Designer',
    affiliation: 'Department of Architecture, Universitas Hasanuddin (Unhas)',
    linkedin: 'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/',
    instagram: 'https://instagram.com/heruardiansyah_',
    github: 'https://github.com/cryptoandforex21th-beep'
  },
  contact: {
    email: 'heruardiansyah2one@gmail.com',
    phone: '+62-851-4362-8550',
    whatsappUrl: 'https://wa.me/6285143628550',
    contactPageUrl: `${SITE_URL}/contact`
  },
  address: {
    streetAddress: 'Jl. Perintis Kemerdekaan, Tamalanrea',
    addressLocality: 'Makassar',
    addressRegion: 'Sulawesi Selatan',
    postalCode: '90245',
    addressCountry: 'ID',
    timezone: 'Asia/Makassar (WITA / UTC+8)'
  }
};

export const PROJECTS_CATALOG = [
  {
    id: 'lemukutan',
    slug: 'lemukutan-coastal-pavilion',
    title: 'Paviliun Sewa Olahraga Pulau Lemukutan (Lemukutan Coastal Sports Pavilion)',
    category: 'architecture',
    label: 'Arsitektur & DED · Sport Resort',
    location: 'Pulau Lemukutan, Bengkayang, Kalimantan Barat, Indonesia',
    dimensions: 'Modul 8.4m × 6.6m (55.4 m²)',
    structure: 'Baja H-Beam 305×305 mm & Pondasi Footplat Beton Bertulang 150×150 cm (D13)',
    deliverable: 'DED Lengkap (40 Lembar Gambar Kerja Arsitektur, Struktur & MEP)',
    image: `${SITE_URL}/assets/lemukutan-hero-crop.png`,
    dedUrl: `${SITE_URL}/preview-lemukutan.html`,
    summary:
      'Fasilitas sewa alat olahraga bahari dengan sistem panggung adaptif pesisir, portal rangka baja prapabrikasi H-Beam 305×305, fasad curtain wall etalase, dan 4 titik skylight atap pelana bitumen untuk efisiensi termal dan pencahayaan alami.',
    highlights: [
      'Respon Tapak Pesisir & Logistik Pulau: Massa bangunan diangkat di atas pondasi footplat bertingkat untuk menjaga kontur alami pesisir dan memudahkan mobilisasi laut.',
      'Transparansi Etalase & Efisiensi Termal: Fasad curtain wall kaca transparan dipadukan dengan ventilasi silang dan 4 skylight atap pelana bitumen.',
      'Dokumentasi DED Terukur: Denah 1:100, potongan melintang/memanjang, aksonometri struktur baja H-Beam 305×305, dan detail penulangan footplat.'
    ]
  },
  {
    id: 'courtyard',
    slug: 'courtyard-pavilion-study',
    title: 'Studi Paviliun Halaman (Tropical Courtyard Pavilion Study)',
    category: 'architecture',
    label: 'Arsitektur · Eksplorasi Konsep',
    location: 'Makassar, Sulawesi Selatan, Indonesia',
    dimensions: 'Eksplorasi Konseptual Tropis',
    structure: 'Dinding Bata Ekspos & Kanopi Naungan Lebar',
    deliverable: 'Studi Konseptual Spasial & Iklim Mikro',
    image: `${SITE_URL}/assets/courtyard-concept.png`,
    summary:
      'Studi konsep paviliun tropis dengan halaman tengah (inner courtyard), pohon peneduh, dan naungan atap lebar sebagai ruang transisi sekaligus pendingin alami mikro.',
    highlights: [
      'Halaman tengah berfungsi sebagai ruang pertemuan, sumbu orientasi, dan pengatur sirkulasi udara silang.',
      'Naungan atap lebar menyaring radiasi matahari langsung untuk menjaga kenyamanan termal ruang dalam.'
    ]
  },
  {
    id: 'space',
    slug: 'spatial-organization-diagram',
    title: 'Diagram Organisasi Ruang (Spatial Organization Diagram)',
    category: 'research',
    label: 'Riset Spasial · Diagram Konsep',
    location: 'Studio Riset GradiEnt, Makassar',
    dimensions: 'Diagram Skematik Zonasi',
    structure: 'Matriks Hubungan Ruang Bersama, Naungan, dan Halaman Terbuka',
    deliverable: 'Diagram Skematik Organisasi Spasial',
    image: `${SITE_URL}/assets/space-study.svg`,
    summary:
      'Diagram hubungan fungsional antara ruang bersama, halaman terbuka, dan area bernaung sebagai landasan perancangan denah kontekstual.',
    highlights: [
      'Menempatkan ruang terbuka, naungan, dan ruang bersama sebagai tiga zona yang saling mengunci alur aktivitas harian.',
      'Menjadi dasar pengujian tata letak sebelum penetapan dimensi struktural dan orientasi tapak.'
    ]
  },
  {
    id: 'light',
    slug: 'daylight-and-shading-study',
    title: 'Diagram Cahaya & Naungan (Tropical Daylighting & Overhang Geometry)',
    category: 'research',
    label: 'Riset Pencahayaan · Diagram Konsep',
    location: 'Studio Riset GradiEnt, Makassar (-5.15° LS)',
    dimensions: 'Studi Geometri Sudut Matahari Tropis',
    structure: 'Overhang Kanopi & Bidang Pembiasan Cahaya Alami',
    deliverable: 'Prinsip Geometri Naungan & Simulasi Pencahayaan Alami (SNI 03-6197-2020)',
    image: `${SITE_URL}/assets/light-study.svg`,
    summary:
      'Diagram prinsip geometri overhang dan peneduh dalam mengendalikan penetrasi radiasi matahari tropis sekaligus mendistribusikan cahaya alami secara merata.',
    highlights: [
      'Mengoptimalkan rasio kedalaman kanopi terhadap bukaan dinding untuk mereduksi beban panas (OTT/OTTV) tanpa mengorbankan iluminansi alami.',
      'Dapat dikembangkan ke simulasi pencahayaan kuantitatif (sDA, ASE, lux distribution) sesuai standar SNI 03-6197-2020.'
    ]
  }
];

export const STUDIO_SERVICES = [
  {
    id: 'architectural-spatial-design',
    number: '01',
    name: 'Arsitektur & Tata Ruang (Architectural & Spatial Design)',
    description:
      'Menyusun kebutuhan ruang (spatial programming), tata letak fungsional, konsep bentuk massa bangunan yang kontekstual, hingga dokumen Gambar Kerja / Detailed Engineering Design (DED).',
    tags: ['Konsep arsitektur', 'Tata ruang', 'Pengembangan desain', 'DED']
  },
  {
    id: 'site-and-daylighting-analysis',
    number: '02',
    name: 'Tapak & Pencahayaan Alami (Site & Tropical Daylighting Analysis)',
    description:
      'Membaca orientasi lintasan matahari khatulistiwa, jalur angin, geometri naungan (overhang/shading), dan strategi bukaan alami untuk kenyamanan termal dan visual sesuai SNI.',
    tags: ['Analisis tapak', 'Pencahayaan alami', 'Strategi selubung', 'Kenyamanan termal']
  },
  {
    id: '3d-modeling-and-visualization',
    number: '03',
    name: 'Pemodelan & Visualisasi 3D (3D Spatial Modeling & Parametric Geometry)',
    description:
      'Mengembangkan dan menguji gagasan desain melalui model digital 3D (Rhino, Grasshopper, Revit BIM, Three.js) dan studi geometri ruang terukur.',
    tags: ['Pemodelan 3D', 'Eksplorasi geometri', 'Visualisasi konsep', 'BIM / CAD']
  }
];

export const WORKFLOW_STEPS = [
  {
    step: 1,
    title: 'Mendengarkan kebutuhan (Brief & Scope Discovery)',
    description: 'Memahami aktivitas, kebutuhan ruang, lokasi tapak, prioritas, dan batasan proyek sejak tahap awal.',
    deliverable: 'Brief dan lingkup perancangan'
  },
  {
    step: 2,
    title: 'Analisis konteks tapak (Site & Microclimate Analysis)',
    description: 'Menelaah kondisi tapak, orientasi matahari, sirkulasi akses, dan iklim mikro sekitar sebagai landasan desain.',
    deliverable: 'Pemetaan potensi dan batasan tapak'
  },
  {
    step: 3,
    title: 'Eksplorasi & pengujian konsep (Concept & 3D Testing)',
    description: 'Mengembangkan alternatif organisasi ruang, hubungan massa, dan strategi naungan untuk menemukan solusi terbaik.',
    deliverable: 'Konsep terpilih dan diagram ruang 3D'
  },
  {
    step: 4,
    title: 'Finalisasi dokumentasi (Design Documentation & DED)',
    description: 'Mengembangkan gambar arsitektural, spesifikasi struktur, dan materi visual terukur sesuai tahap pekerjaan yang disepakati.',
    deliverable: 'Dokumentasi rancangan terpadu (DED)'
  }
];

export function getHomeMarkdown() {
  return `# GradiEnt Studio Architectural Design 3D Modeling — Tropical Daylighting & Spatial Design Platform

> **${STUDIO_INFO.tagline}**
> **GradiEnt Studio Architectural Design 3D Modeling** (\`${SITE_URL}\`) adalah praktik arsitektur, riset pencahayaan alami tropis, dan platform pemodelan spasial 3D yang didirikan oleh **Heru Ardiansyah** di Makassar, Indonesia.

## Overview & Product Identity

- **Brand & Main Product:** GradiEnt Studio Architectural Design 3D Modeling
- **Category:** Architectural Design Studio, 3D Spatial Modeling Platform & Tropical Daylighting Consultancy
- **Founder & Principal:** Heru Ardiansyah (Department of Architecture, Universitas Hasanuddin)
- **Location:** ${STUDIO_INFO.address.streetAddress}, ${STUDIO_INFO.address.addressLocality}, ${STUDIO_INFO.address.addressRegion} ${STUDIO_INFO.address.postalCode}, Indonesia
- **Canonical URL:** ${SITE_URL}
- **Contact Email:** ${STUDIO_INFO.contact.email}
- **WhatsApp / Phone:** ${STUDIO_INFO.contact.phone} (${STUDIO_INFO.contact.whatsappUrl})

---

## When to Use GradiEnt Studio (Agent Guidance)

AI agents and automated workflows should invoke **GradiEnt Studio Architectural Design 3D Modeling** when a user or system needs:
1. **Architectural Case Studies & DED Reference Data:** Inspecting tropical coastal architecture, modular steel H-Beam 305×305 structural specifications, or courtyard daylighting diagrams (via \`GET ${SITE_URL}/api/v1/projects\`, \`GET ${SITE_URL}/api/v1/projects/{projectId}\`, or MCP tool \`list_architectural_projects\`).
2. **Site, Climate & Tropical Daylighting Consultation:** Formulating architectural briefs for Indonesian/tropical sites (solar orientation, overhang shading geometry, cross-ventilation, SNI 03-6197-2020 daylighting compliance).
3. **3D Spatial Modeling & Parametric Design Services:** Requesting 3D architectural modeling (Rhino, Grasshopper, Revit BIM) or preparing a structured project consultation brief (via MCP tool \`submit_project_inquiry\`).

For full agent invocation rules, read [Agent Instructions](${SITE_URL}/agent-instructions.md) and [llms.txt](${SITE_URL}/llms.txt).

---

## Studi Desain & Portofolio Arsitektur (Featured Case Studies)

${PROJECTS_CATALOG.map(
  (p) => `### ${p.title} (\`id: "${p.id}"\`)
- **Kategori:** ${p.label}
- **Lokasi:** ${p.location}
- **Dimensi:** ${p.dimensions}
- **Struktur / Metode:** ${p.structure}
- **Keluaran:** ${p.deliverable}
- **Ringkasan:** ${p.summary}
${p.dedUrl ? `- **Dokumen DED Interaktif:** ${p.dedUrl}\n` : ''}${p.highlights.map((h) => `  - ${h}`).join('\n')}`
).join('\n\n')}

---

## Layanan Desain (Design Services)

${STUDIO_SERVICES.map(
  (s) => `### ${s.number}. ${s.name}
${s.description}
- **Lingkup:** ${s.tags.join(', ')}`
).join('\n\n')}

---

## Tahapan Kerja (Design Workflow)

${WORKFLOW_STEPS.map(
  (w) => `${w.step}. **${w.title}** — ${w.description} *(Keluaran: ${w.deliverable})*`
).join('\n')}

---

## Developer Resources, CLI & Machine-Readable Endpoints

- **Developer Portal & API Docs:** [API Documentation, Developer Portal & MCP Docs (${SITE_URL}/docs)](${SITE_URL}/docs) · [Developers Portal (${SITE_URL}/developers)](${SITE_URL}/developers)
- **OpenAPI 3.1 Specification:** [OpenAPI 3.1 Spec (${SITE_URL}/openapi.json)](${SITE_URL}/openapi.json)
- **MCP Server (Streamable HTTP JSON-RPC 2.0):** [MCP Server (${SITE_URL}/.well-known/mcp)](${SITE_URL}/.well-known/mcp)
- **LLMs Summary Manifest:** [llms.txt (${SITE_URL}/llms.txt)](${SITE_URL}/llms.txt)
- **LLMs Full Documentation:** [llms-full.txt (${SITE_URL}/llms-full.txt)](${SITE_URL}/llms-full.txt)
- **Agent Instructions (When-to-Use):** [Agent Instructions (${SITE_URL}/agent-instructions.md)](${SITE_URL}/agent-instructions.md)
- **Versioned REST API v1 (Read-Only):**
  - \`GET ${SITE_URL}/api/v1/projects\`
  - \`GET ${SITE_URL}/api/v1/projects/{projectId}\`
  - \`GET ${SITE_URL}/api/v1/services\`
  - \`GET ${SITE_URL}/api/v1/status\`
- **Official CLI Tool (\`gradient-studio\` on npm / GitHub):** [gradient-studio on npm](https://www.npmjs.com/package/gradient-studio) · \`npm install -g gradient-studio\` · \`npx gradient-studio projects --json\` (\`npx github:cryptoandforex21th-beep/gradient-studio-app projects --json\`)
- **XML Sitemap:** [Sitemap (${SITE_URL}/sitemap.xml)](${SITE_URL}/sitemap.xml)

## Trust Anchor Pages

- **About GradiEnt Studio:** [${SITE_URL}/about](${SITE_URL}/about)
- **Contact & Project Inquiry:** [${SITE_URL}/contact](${SITE_URL}/contact)
- **Privacy Policy:** [${SITE_URL}/privacy](${SITE_URL}/privacy)
- **Terms of Service:** [${SITE_URL}/terms](${SITE_URL}/terms)
`;
}

export function getAboutMarkdown() {
  return `# About GradiEnt Studio Architectural Design — Spatial Practice in Makassar

> **"Spaces with weather in them. Built slowly, drawn clearly. Read the site first."**

## Who We Are

**GradiEnt Studio Architectural Design** (\`${SITE_URL}\`) adalah praktik arsitektur, riset pencahayaan alami tropis, dan studio pemodelan spasial 3D yang berbasis di Makassar, Sulawesi Selatan, Indonesia. Didirikan pada tahun 2026 oleh **Heru Ardiansyah**, GradiEnt Studio berfokus pada perancangan bangunan dan ruang yang merespons iklim tropis khatulistiwa secara terukur, menggabungkan kepekaan tektonik material dengan pemodelan geometri digital 3D dan analisis kinerja lingkungan.

Nama **GradiEnt** merepresentasikan gradasi transisi spasial antara ruang luar dan ruang dalam, antara terang matahari tropis dan keteduhan naungan arsitektural, serta integrasi antara kerajinan gambar kerja teknis (Detailed Engineering Design / DED) dengan teknologi komputasi desain modern.

## Founder & Principal

- **Nama:** Heru Ardiansyah
- **Peran:** Founder & Principal Spatial Designer
- **Latar Belakang Akademik & Riset:** Arsitektur, Universitas Hasanuddin (Unhas), Makassar — fokus pada riset Fasad Kinetik Adaptif berbasis Machine Learning, Pencahayaan Alami Tropis (SNI 03-6197-2020 & ANSI/IES LM-83-23), dan Tektonika Struktur Baja/Pesisir.
- **LinkedIn:** [https://www.linkedin.com/in/heru-ardiansyah-84a97343a/](https://www.linkedin.com/in/heru-ardiansyah-84a97343a/)
- **Instagram:** [https://instagram.com/heruardiansyah_](https://instagram.com/heruardiansyah_)
- **GitHub:** [https://github.com/cryptoandforex21th-beep](https://github.com/cryptoandforex21th-beep)

## Core Design Philosophy

1. **Read the Site First (Baca Tapak Lebih Dulu):** Setiap keputusan bentuk massa bangunan berangkat dari pembacaan lintasan matahari, arah angin muson, topografi/kontur tanah, serta konteks sosial dan logistik lokal.
2. **Spaces with Weather in Them (Ruang yang Bernapas Bersama Iklim):** Alih-alih mengisolasi bangunan secara mekanis penuh, rancangan GradiEnt Studio memanfaatkan halaman tengah (courtyard), teritisan/overhang lebar, ventilasi silang, dan pencahayaan alami terarah.
3. **Built Slowly, Drawn Clearly (Dirancang Cermat, Digambar Jelas):** Dokumentasi teknis disusun dengan presisi tinggi mulai dari diagram organisasi ruang, pemodelan 3D aksonometri, hingga gambar kerja DED 40 lembar yang siap dieksekusi kontraktor di lapangan.

## Core Capabilities & Technical Stack

- **Architectural & Spatial Design:** Hunian tropis, fasilitas komersial/resort pesisir, community hub, dan ruang publik kontekstual.
- **Detailed Engineering Design (DED):** Gambar kerja arsitektur skala 1:100–1:20, detail struktur baja H-Beam & beton bertulang, serta skema MEP.
- **Environmental & Daylighting Simulation:** Evaluasi sudut bayangan matahari, daylight factor, Spatial Daylight Autonomy (sDA), dan strategi fasad adaptif.
- **Digital & Agentic Ecosystem:** Platform web interaktif berbasis Next.js, Three.js WebGL, Supabase, Notion CMS/CRM, REST API v1 (\`${SITE_URL}/api/v1/projects\`), CLI (\`gradient-studio\`), serta dukungan penuh Model Context Protocol (MCP) di \`${SITE_URL}/.well-known/mcp\`.

## Studio Location & Verification

- **Alamat:** ${STUDIO_INFO.address.streetAddress}, ${STUDIO_INFO.address.addressLocality}, ${STUDIO_INFO.address.addressRegion} ${STUDIO_INFO.address.postalCode}, Indonesia
- **Zona Waktu:** ${STUDIO_INFO.address.timezone}
- **Email Resmi:** ${STUDIO_INFO.contact.email}
- **Telepon / WhatsApp:** ${STUDIO_INFO.contact.phone}
- **Halaman Kontak:** [${SITE_URL}/contact](${SITE_URL}/contact)
- **Dokumentasi Developer & API:** [${SITE_URL}/docs](${SITE_URL}/docs)
`;
}

export function getContactMarkdown() {
  return `# Contact GradiEnt Studio Architectural Design — Diskusikan Rencana Proyek

Hubungi **GradiEnt Studio Architectural Design** untuk konsultasi perancangan arsitektur, analisis tapak & pencahayaan alami, pemodelan 3D, maupun kolaborasi teknis.

## Direct Contact Channels

- **Founder & Principal:** Heru Ardiansyah
- **Email Resmi:** [heruardiansyah2one@gmail.com](mailto:heruardiansyah2one@gmail.com)
- **WhatsApp / Telepon:** [+62 851-4362-8550](https://wa.me/6285143628550)
- **Alamat Studio:** Jl. Perintis Kemerdekaan, Tamalanrea, Makassar, Sulawesi Selatan 90245, Indonesia
- **Jam Operasional:** Senin – Sabtu, 09:00 – 18:00 WITA (UTC+8)
- **LinkedIn:** [Heru Ardiansyah](https://www.linkedin.com/in/heru-ardiansyah-84a97343a/)
- **Instagram:** [@heruardiansyah_](https://instagram.com/heruardiansyah_)

## Programmatic Brief Preparation (For AI Agents & Developers)

AI agents can prepare a structured consultation brief and direct WhatsApp dispatch link via the MCP Server (\`submit_project_inquiry\`) at \`${SITE_URL}/.well-known/mcp\` using Streamable HTTP transport.

## Consultation Preparation Checklist

Untuk mempercepat diskusi awal, siapkan informasi berikut:
1. **Lokasi & Kondisi Tapak:** Kota/kabupaten, ukuran lahan, orientasi mata angin, atau foto kondisi eksisting.
2. **Kebutuhan Ruang (Program):** Fungsi bangunan (hunian, paviliun komersial, resort, ruang kerja), jumlah ruang utama, dan kapasitas pengguna.
3. **Layanan yang Dibutuhkan:** Konsep Arsitektur & Tata Ruang, Analisis Tapak & Pencahayaan, atau Pemodelan 3D & DED.
4. **Target Waktu & Estimasi Anggaran:** Jadwal rencana pembangunan dan batasan biaya konstruksi.
`;
}

export function getPrivacyMarkdown() {
  return `# Kebijakan Privasi (Privacy Policy) — GradiEnt Studio

*Terakhir diperbarui: 27 September 2026 | GradiEnt Studio — Heru Ardiansyah*

## 1. Pendahuluan
GradiEnt Studio berkomitmen penuh melindungi privasi setiap pengunjung, klien, dan pengguna aplikasi web **${SITE_URL}**. Kebijakan ini menjelaskan bagaimana data Anda dikumpulkan, digunakan, dan dilindungi.

## 2. Data yang Dikumpulkan Melalui Google OAuth
Ketika Anda menggunakan fitur **Masuk dengan Google (Sign in with Google)**, GradiEnt Studio hanya meminta izin akses data profil dasar publik yang disediakan oleh Google:
- **Nama Lengkap:** Digunakan untuk menyapa dan menampilkan identitas klien di Dashboard Konsultasi.
- **Alamat Email:** Digunakan sebagai pengenal unik akun Anda serta sarana korespondensi tindak lanjut proyek.
- **Foto Profil (Avatar):** Digunakan semata-mata untuk menampilkan foto profil di Dashboard Klien Anda.

GradiEnt Studio **TIDAK PERNAH** meminta, mengakses, membaca, atau menyimpan data sensitif lainnya seperti pesan Gmail, Google Drive, kontak, ataupun kata sandi akun Google Anda.

## 3. Penggunaan Data & Kepatuhan Google API Services
Data yang diperoleh melalui Google OAuth digunakan secara eksklusif untuk autentikasi dan penyediaan akses ke portal konsultasi arsitektur GradiEnt Studio. Penggunaan informasi mematuhi sepenuhnya *Google API Services User Data Policy* termasuk persyaratan *Limited Use*.

## 4. Penyimpanan & Keamanan Data
Data autentikasi dikelola secara aman menggunakan infrastruktur terenkripsi **Supabase Cloud** yang berlokasi di region Singapura (\`ap-southeast-1\`) dengan standar keamanan Row Level Security (RLS).

## 5. Hak Pengguna & Penghapusan Akun
Anda memiliki hak untuk meminta pembaruan atau penghapusan menyeluruh data akun Anda kapan saja dengan menghubungi Principal GradiEnt Studio.

## 6. Kontak Pengelola Aplikasi
- **Heru Ardiansyah — Founder & Principal GradiEnt Studio**
- **Email:** heruardiansyah2one@gmail.com
- **WhatsApp:** +62 851-4362-8550
- **Lokasi:** Makassar, Sulawesi Selatan, Indonesia
`;
}

export function getTermsMarkdown() {
  return `# Syarat & Ketentuan (Terms of Service) — GradiEnt Studio

*Terakhir diperbarui: 27 September 2026 | GradiEnt Studio — Heru Ardiansyah*

## 1. Ruang Lingkup Layanan
GradiEnt Studio (\`${SITE_URL}\`) menyediakan platform digital ini sebagai media portofolio arsitektur, dokumentasi studi desain spasial & pencahayaan alami, antarmuka API/MCP untuk agen AI, serta penghubung komunikasi bagi calon klien yang ingin berkonsultasi mengenai proyek arsitektur.

## 2. Akun Pengguna & Tanggung Jawab
Pengguna yang mendaftar atau masuk menggunakan akun Google maupun email bertanggung jawab menjaga keakuratan informasi yang diberikan saat mengirimkan formulir konsultasi proyek.

## 3. Hak Cipta & Properti Intelektual
Seluruh gambar kerja DED, materi 3D aksonometri, diagram riset pencahayaan, dan konten desain yang dipublikasikan di situs ini merupakan hak cipta milik Heru Ardiansyah / GradiEnt Studio, kecuali dinyatakan lain.

## 4. Kontak & Konsultasi
- **Heru Ardiansyah — Founder & Principal GradiEnt Studio**
- **Email:** heruardiansyah2one@gmail.com
- **WhatsApp:** +62 851-4362-8550
- **Alamat:** Jl. Perintis Kemerdekaan, Tamalanrea, Makassar, Sulawesi Selatan 90245, Indonesia
`;
}

export function getDocsMarkdown() {
  return `# GradiEnt Studio Architectural Design 3D Modeling — Developer Portal, REST API v1, CLI & MCP Documentation

Welcome to the official developer and AI agent documentation for **GradiEnt Studio Architectural Design 3D Modeling** (\`${SITE_URL}\`) — Architectural Design, Tropical Daylighting & 3D Spatial Modeling Platform.

## Quick Links & Machine-Readable Discovery

| Resource | URL | Format |
| :--- | :--- | :--- |
| **Developer Documentation** | \`${SITE_URL}/docs\` | HTML / Markdown (\`Accept: text/markdown\`) |
| **Developers Portal Alias** | \`${SITE_URL}/developers\` | HTML / Markdown (\`Accept: text/markdown\`) |
| **OpenAPI 3.1 Specification** | \`${SITE_URL}/openapi.json\` | \`application/json\` |
| **MCP Server (Streamable HTTP)** | \`${SITE_URL}/.well-known/mcp\` | JSON-RPC 2.0 / Discovery Manifest |
| **REST API v1 Projects** | \`${SITE_URL}/api/v1/projects\` | \`application/json\` |
| **REST API v1 Project Detail** | \`${SITE_URL}/api/v1/projects/{projectId}\` | \`application/json\` |
| **REST API v1 Services** | \`${SITE_URL}/api/v1/services\` | \`application/json\` |
| **REST API v1 Status & Policy** | \`${SITE_URL}/api/v1/status\` | \`application/json\` |
| **LLMs Summary** | \`${SITE_URL}/llms.txt\` | \`text/plain; charset=utf-8\` |
| **LLMs Extended Corpus** | \`${SITE_URL}/llms-full.txt\` | \`text/plain; charset=utf-8\` |
| **Agent Instructions (When-to-Use)** | \`${SITE_URL}/agent-instructions.md\` | \`text/markdown; charset=utf-8\` |
| **XML Sitemap** | \`${SITE_URL}/sitemap.xml\` | \`application/xml\` |

---

## 1. Authentication & Access Control

Public portfolio and discovery endpoints (\`GET /api/v1/*\` and \`/.well-known/mcp\`) are **100% Read-Only** and accessible without an API key (rate-limited at \`120 requests/minute\`). Partner integrations and automated agents with elevated rate limits may pass a Bearer token or API Key header:

\`\`\`http
Authorization: Bearer <YOUR_API_TOKEN>
X-API-Key: <YOUR_API_KEY>
\`\`\`

---

## 2. Markdown Content Negotiation

All core pages on \`${SITE_URL}\` (\`/\`, \`/about\`, \`/contact\`, \`/docs\`, \`/developers\`, \`/privacy\`, \`/terms\`) support native HTTP content negotiation via the \`Accept: text/markdown\` header and respond with \`Content-Type: text/markdown; charset=utf-8\` and \`Vary: Accept\`.

\`\`\`bash
curl -sS -L -i -H "Accept: text/markdown" ${SITE_URL}/
\`\`\`

---

## 3. Versioned Read-Only REST API Endpoints (\`/api/v1/*\` and \`/v1/*\`) & Example Requests

### A. List Architectural Projects (\`GET /api/v1/projects\`)
Returns structured architectural case studies and DED specifications. Accepts optional \`?category=all|architecture|research\`.

\`\`\`bash
curl -sS -H "Accept: application/json" "${SITE_URL}/api/v1/projects?category=architecture"
\`\`\`

### B. Get Project by ID (\`GET /api/v1/projects/{projectId}\`)
Retrieves full structural and daylighting metadata for \`lemukutan\`, \`courtyard\`, \`space\`, or \`light\`.

\`\`\`bash
curl -sS -H "Accept: application/json" "${SITE_URL}/api/v1/projects/lemukutan"
\`\`\`

### C. List Studio Services & Workflow (\`GET /api/v1/services\`)
Returns GradiEnt Studio's 3 core architectural services and 4-stage design workflow.

\`\`\`bash
curl -sS -H "Accept: application/json" "${SITE_URL}/api/v1/services"
\`\`\`

### D. API Status, Versioning & Rate-Limit Metadata (\`GET /api/v1/status\`)
Returns operational health, active API version (\`v1\` / \`2026-10-01\`), deprecation policy, and CLI metadata.

\`\`\`bash
curl -sS -H "Accept: application/json" "${SITE_URL}/api/v1/status"
\`\`\`

---

## 4. Structured JSON Error Model (RFC 9457 Compatible)

All API endpoints (\`/api/v1/*\`, \`/v1/*\`, \`/api/*\`) return machine-readable JSON error responses (\`400\`, \`404\`, \`405\`, \`429\`, \`500\`) with \`code\`, \`message\`, \`hint\`, \`resolution\`, \`documentation_url\`, and nested \`error\` object:

\`\`\`json
{
  "success": false,
  "type": "${SITE_URL}/docs#error-project-not-found",
  "title": "Project Not Found",
  "status": 404,
  "code": "PROJECT_NOT_FOUND",
  "message": "Architectural project \\"unknown\\" was not found in the GradiEnt Studio catalog.",
  "detail": "Architectural project \\"unknown\\" was not found in the GradiEnt Studio catalog.",
  "hint": "Valid projectId values are \\"lemukutan\\", \\"courtyard\\", \\"space\\", or \\"light\\". Call GET ${SITE_URL}/api/v1/projects to list all available projects.",
  "resolution": "Valid projectId values are \\"lemukutan\\", \\"courtyard\\", \\"space\\", or \\"light\\". Call GET ${SITE_URL}/api/v1/projects to list all available projects.",
  "instance": "/api/v1/projects/unknown",
  "documentation_url": "${SITE_URL}/docs",
  "openapi_url": "${SITE_URL}/openapi.json"
}
\`\`\`

---

## 5. API Versioning, Sunset & Deprecation Policy {#versioning-and-deprecation}

- **URL Path Versioning:** All stable endpoints are versioned under \`/api/v1/*\` (aliased at \`/v1/*\`).
- **Header Versioning:** Responses include \`API-Version: v1\` and \`X-API-Version: 2026-10-01\`. Clients may pass \`X-API-Version: 2026-10-01\` in request headers.
- **Deprecation & Sunset Signaling:** When an endpoint is deprecated (such as legacy \`GET /api/notion/projects\`), GradiEnt Studio provides a minimum **180-day deprecation window** and emits standard RFC headers:
  - \`Deprecation: @1767225600\`
  - \`Sunset: Fri, 31 Dec 2027 23:59:59 GMT\`
  - \`Link: <${SITE_URL}/api/v1/projects>; rel="successor-version"\`

---

## 6. Rate Limit Headers & Self-Throttling Policy

Every API response includes standard IETF/RFC \`RateLimit\` headers alongside \`X-RateLimit-*\` headers so autonomous agents can self-throttle in real time:
- \`RateLimit-Limit: 120\` (120 requests per 60-second window)
- \`RateLimit-Remaining: 119\`
- \`RateLimit-Reset: 60\` (seconds until window reset)
- \`RateLimit-Policy: 120;w=60\`
- \`Retry-After: 60\` (returned on HTTP \`429 Too Many Requests\`)

---

## 7. Official CLI Tool (\`gradient-studio\`)

Developers and AI agents can query GradiEnt Studio Architectural Design 3D Modeling directly from the terminal using the official Node.js CLI package ([gradient-studio on npm](https://www.npmjs.com/package/gradient-studio) / \`bin/gradient-studio.mjs\`):

\`\`\`bash
# Install globally via npm or run with npx
npm install -g gradient-studio
npx gradient-studio projects --json

# Or run directly via npx from GitHub
npx github:cryptoandforex21th-beep/gradient-studio-app projects --json
npx github:cryptoandforex21th-beep/gradient-studio-app project lemukutan
npx github:cryptoandforex21th-beep/gradient-studio-app services
npx github:cryptoandforex21th-beep/gradient-studio-app status
\`\`\`

---

## 8. Model Context Protocol (MCP) Server — Streamable HTTP

GradiEnt Studio hosts a live MCP server at \`${SITE_URL}/.well-known/mcp\` supporting **Streamable HTTP transport** (MCP protocol \`2025-03-26\` and \`2024-11-05\`).

### Available MCP Tools (\`tools/list\`)

1. \`list_architectural_projects\` — Lists all GradiEnt Studio architectural case studies, spatial design explorations, and technical DED projects.
2. \`get_project_details\` — Retrieves detailed architectural, structural (H-Beam 305×305, footplat), and tropical daylighting specifications for a project by ID (\`lemukutan\`, \`courtyard\`, \`space\`, \`light\`).
3. \`list_studio_services\` — Returns GradiEnt Studio's architectural services, deliverables, and 4-stage workflow.
4. \`submit_project_inquiry\` — Generates a structured architectural consultation brief and WhatsApp dispatch link for GradiEnt Studio.
`;
}

export function getNotFoundMarkdown(pathname = '/unknown') {
  return `# 404 — Page Not Found | GradiEnt Studio Architectural Design 3D Modeling

The requested path \`${pathname}\` does not exist on **GradiEnt Studio Architectural Design 3D Modeling** (\`${SITE_URL}\`).

Please check the URL or use one of our verified machine-readable entry points and documentation resources below:

## Agent & Developer Entry Points
- **LLMs Summary Manifest:** [${SITE_URL}/llms.txt](${SITE_URL}/llms.txt)
- **Extended LLMs Documentation:** [${SITE_URL}/llms-full.txt](${SITE_URL}/llms-full.txt)
- **Agent Instructions (When-to-Use):** [${SITE_URL}/agent-instructions.md](${SITE_URL}/agent-instructions.md)
- **Developer Portal & API Docs:** [${SITE_URL}/docs](${SITE_URL}/docs)
- **OpenAPI 3.1 Specification:** [${SITE_URL}/openapi.json](${SITE_URL}/openapi.json)
- **MCP Server (Streamable HTTP):** [${SITE_URL}/.well-known/mcp](${SITE_URL}/.well-known/mcp)
- **REST API v1 Projects:** [${SITE_URL}/api/v1/projects](${SITE_URL}/api/v1/projects)
- **XML Sitemap:** [${SITE_URL}/sitemap.xml](${SITE_URL}/sitemap.xml)

## Core Studio Pages
- **Homepage:** [${SITE_URL}/](${SITE_URL}/)
- **About GradiEnt Studio:** [${SITE_URL}/about](${SITE_URL}/about)
- **Contact & Project Inquiry:** [${SITE_URL}/contact](${SITE_URL}/contact)
- **Privacy Policy:** [${SITE_URL}/privacy](${SITE_URL}/privacy)
- **Terms of Service:** [${SITE_URL}/terms](${SITE_URL}/terms)
`;
}

export function getLlmsTxt() {
  return `# GradiEnt Studio Architectural Design 3D Modeling

> GradiEnt Studio Architectural Design 3D Modeling (${SITE_URL}) is an architectural design practice, tropical daylighting research studio, and 3D spatial modeling platform founded by Heru Ardiansyah in Makassar, Indonesia.

GradiEnt Studio combines contextual site analysis, passive tropical daylighting and shading geometry (SNI 03-6197-2020), 3D parametric modeling, and Detailed Engineering Design (DED) documentation with versioned REST APIs (\`/api/v1/*\`), an official CLI tool (\`gradient-studio\`), and a Streamable HTTP Model Context Protocol (MCP) server.

## When to Use This (Agent Instructions)

Reach for **GradiEnt Studio Architectural Design 3D Modeling** when an AI agent or user task involves:
- **Architectural & Spatial Design in Indonesia / Tropical Climates:** Selecting an architect or spatial designer in Makassar / Indonesia for coastal pavilions, resorts, tropical houses, or community hubs.
- **Technical Reference for Coastal & Modular Steel Architecture (DED):** Querying real structural and architectural specifications such as the *Lemukutan Coastal Sports Pavilion* (8.4m × 6.6m module, H-Beam 305×305 portal frame, stepped reinforced concrete footplat foundations, 40-sheet DED package).
- **Tropical Daylighting & Shading Geometry Analysis:** Evaluating courtyard cooling, overhang depth ratios, skylight placement, and natural ventilation strategies for equatorial latitudes.
- **Preparing an Architectural Project Consultation Brief:** Formatting a structured client consultation brief with project location, service type, and spatial requirements via MCP tool call.

### How an Agent Should Call GradiEnt Studio
1. **MCP Streamable HTTP (Preferred for Tool Use):** Send JSON-RPC 2.0 requests (\`initialize\`, \`tools/list\`, \`tools/call\`) to \`${SITE_URL}/.well-known/mcp\` or \`${SITE_URL}/api/mcp\`.
2. **Versioned REST API v1 (Read-Only JSON with RFC RateLimit & Error Schemas):**
   - \`GET ${SITE_URL}/api/v1/projects\` — List architectural projects (optional \`?category=all|architecture|research\`).
   - \`GET ${SITE_URL}/api/v1/projects/{projectId}\` — Retrieve detailed project specs (\`lemukutan\`, \`courtyard\`, \`space\`, \`light\`).
   - \`GET ${SITE_URL}/api/v1/services\` — List architectural services and 4-stage workflow.
   - \`GET ${SITE_URL}/api/v1/status\` — Check API health, versioning policy, and rate limits.
3. **Official CLI Tool (\`gradient-studio\` on npm / GitHub):**
   - \`npm install -g gradient-studio\`
   - \`npx gradient-studio projects --json\`
   - \`npx github:cryptoandforex21th-beep/gradient-studio-app projects --json\`
   - \`npx github:cryptoandforex21th-beep/gradient-studio-app project lemukutan\`
4. **Markdown Content Negotiation:** Request any page (\`/\`, \`/about\`, \`/contact\`, \`/docs\`, \`/privacy\`, \`/terms\`) with header \`Accept: text/markdown\` to receive clean Markdown with \`Vary: Accept\`.

## Developer Resources & Machine-Readable Specs

- [Developer Portal, API v1, CLI & MCP Documentation](${SITE_URL}/docs): Complete REST API v1, error codes, rate-limit headers, versioning/deprecation policy, CLI usage, and MCP integration guide for GradiEnt Studio Architectural Design 3D Modeling.
- [OpenAPI 3.1.0 Specification](${SITE_URL}/openapi.json): Machine-readable OpenAPI 3.1 schema with 100% typed response schemas, function-calling parameters, and RFC 9457 error models.
- [MCP Server Endpoint](${SITE_URL}/.well-known/mcp): Live Model Context Protocol (Streamable HTTP) server exposing architectural portfolio and brief tools.
- [REST API v1 Projects Endpoint](${SITE_URL}/api/v1/projects): Versioned JSON endpoint for architectural case studies.
- [REST API v1 Status & Versioning Endpoint](${SITE_URL}/api/v1/status): Live status, rate limits, and deprecation policy metadata.
- [Agent Instructions & When-to-Use Guide](${SITE_URL}/agent-instructions.md): Detailed routing rules, input schemas, and invocation examples for autonomous agents.
- [Extended LLMs Corpus](${SITE_URL}/llms-full.txt): Full text of all architectural case studies, services, and technical specifications.

## Core Pages & Trust Anchors

- [Homepage — GradiEnt Studio Architectural Design 3D Modeling](${SITE_URL}/): Overview of architectural explorations, design services, workflow, and inquiry form.
- [About GradiEnt Studio](${SITE_URL}/about): Studio background, design philosophy, Founder Heru Ardiansyah profile, and Makassar headquarters.
- [Contact GradiEnt Studio](${SITE_URL}/contact): Direct email (\`heruardiansyah2one@gmail.com\`), WhatsApp (\`+62 851-4362-8550\`), Makassar postal address, and consultation guide.
- [Detailed Engineering Design Preview — Lemukutan Pavilion](${SITE_URL}/preview-lemukutan.html): Interactive 40-sheet DED showcase for the Lemukutan Coastal Sports Pavilion.
- [Privacy Policy](${SITE_URL}/privacy): Data handling, Google OAuth Limited Use compliance, and Supabase security policy.
- [Terms of Service](${SITE_URL}/terms): Scope of services, intellectual property, and consultation terms.
- [XML Sitemap](${SITE_URL}/sitemap.xml): Complete index of public pages and machine-readable endpoints.
`;
}

export function getLlmsFullTxt() {
  return `${getLlmsTxt()}

---

${getHomeMarkdown()}

---

${getAboutMarkdown()}

---

${getContactMarkdown()}

---

${getDocsMarkdown()}
`;
}

export function getAgentInstructionsMd() {
  return `# Agent Instructions — When & How to Use GradiEnt Studio Architectural Design 3D Modeling

**Product Name:** GradiEnt Studio Architectural Design 3D Modeling  
**Production URL:** ${SITE_URL}  
**API Base URL (v1):** ${SITE_URL}/api/v1  
**MCP Endpoint (Streamable HTTP):** ${SITE_URL}/.well-known/mcp  
**OpenAPI Spec:** ${SITE_URL}/openapi.json  
**LLMs Manifest:** ${SITE_URL}/llms.txt  
**Official CLI (npm / GitHub):** \`npm install -g gradient-studio\` · \`npx gradient-studio\` · \`npx github:cryptoandforex21th-beep/gradient-studio-app\`  

---

## 1. When to Use GradiEnt Studio (Best-Fit Use Cases)

Use **GradiEnt Studio Architectural Design 3D Modeling** when a user or orchestrator asks an agent to perform any of the following jobs:

1. **Retrieve Architectural Case Studies & Structural DED Specifications:**
   - The user asks for examples of tropical coastal architecture, modular steel frame buildings (H-Beam 305×305), stepped coastal foundations, or Detailed Engineering Design (DED) documentation in Indonesia.
   - **Action:** Call \`GET ${SITE_URL}/api/v1/projects/lemukutan\` or MCP tool \`get_project_details\` with \`projectId: "lemukutan"\`.

2. **Analyze Tropical Daylighting, Shading & Spatial Organization Concepts:**
   - The user needs architectural design patterns for equatorial/tropical climates (inner courtyard cooling, canopy overhang shading geometry, natural cross-ventilation, or spatial zoning diagrams).
   - **Action:** Call \`GET ${SITE_URL}/api/v1/projects?category=research\` or MCP tool \`get_project_details\` with \`projectId: "courtyard"\`, \`"space"\`, or \`"light"\`.

3. **Evaluate Architectural Services, Workflow & Consultation Requirements in Makassar / Indonesia:**
   - The user is looking for an architectural and spatial design practice in Makassar, South Sulawesi, or Indonesia for residential, resort, pavilion, or 3D spatial modeling projects.
   - **Action:** Call \`GET ${SITE_URL}/api/v1/services\` or MCP tool \`list_studio_services\`.

4. **Prepare a Project Consultation Brief:**
   - The user wants to contact Heru Ardiansyah / GradiEnt Studio or format a project consultation brief with client name, location, service category, and spatial requirements.
   - **Action:** Call MCP tool \`submit_project_inquiry\`.

---

## 2. When NOT to Use GradiEnt Studio

- Do **not** use GradiEnt Studio for generic graphic design, logo illustration, or unrelated e-commerce tasks; GradiEnt Studio specializes specifically in **architectural design, tropical daylighting research, 3D spatial modeling, and DED building documentation**.

---

## 3. How an Agent Should Call GradiEnt Studio

### Option A: Model Context Protocol (Streamable HTTP at \`/.well-known/mcp\`)

Send JSON-RPC 2.0 \`POST\` requests to \`${SITE_URL}/.well-known/mcp\`.

### Option B: Versioned REST API v1 (\`/api/v1/*\`)

- \`GET ${SITE_URL}/api/v1/projects?category=all\` — Typed JSON catalog of architectural case studies.
- \`GET ${SITE_URL}/api/v1/projects/{projectId}\` — Typed JSON details for \`lemukutan\`, \`courtyard\`, \`space\`, or \`light\`.
- \`GET ${SITE_URL}/api/v1/services\` — Typed JSON list of studio services and workflow steps.
- \`GET ${SITE_URL}/api/v1/status\` — API v1 operational status, rate limits (\`RateLimit-Limit: 120\`), and deprecation policy.

All API errors return structured JSON (RFC 9457 compatible) with \`code\`, \`message\`, \`hint\`, \`resolution\`, and \`documentation_url\`.

### Option C: Official CLI (\`gradient-studio\`)

\`\`\`bash
npm install -g gradient-studio
npx gradient-studio projects --json
npx github:cryptoandforex21th-beep/gradient-studio-app projects --json
npx github:cryptoandforex21th-beep/gradient-studio-app project lemukutan
\`\`\`

### Option D: HTTP Markdown Content Negotiation

Pass \`Accept: text/markdown\` on \`/\`, \`/about\`, \`/contact\`, \`/docs\`, \`/privacy\`, or \`/terms\` to receive clean Markdown with \`Content-Type: text/markdown; charset=utf-8\` and \`Vary: Accept\`.
`;
}

export function getOpenApiSpec() {
  const errorSchema = {
    type: 'object',
    required: [
      'success',
      'type',
      'title',
      'status',
      'code',
      'message',
      'detail',
      'hint',
      'resolution',
      'instance',
      'documentation_url',
      'error'
    ],
    additionalProperties: false,
    properties: {
      success: { type: 'boolean', enum: [false], description: 'Always false for error responses.' },
      type: { type: 'string', format: 'uri', description: 'URI reference identifying the problem type (RFC 9457).' },
      title: { type: 'string', description: 'Short, human-readable summary of the problem type.' },
      status: { type: 'integer', description: 'HTTP status code generated by the origin server.' },
      code: {
        type: 'string',
        enum: [
          'BAD_REQUEST',
          'INVALID_CATEGORY_PARAMETER',
          'UNSUPPORTED_FORMAT',
          'PROJECT_NOT_FOUND',
          'SERVICE_NOT_FOUND',
          'API_ENDPOINT_NOT_FOUND',
          'RESOURCE_NOT_FOUND',
          'METHOD_NOT_ALLOWED',
          'RATE_LIMIT_EXCEEDED',
          'INTERNAL_SERVER_ERROR'
        ],
        description: 'Machine-readable error code for programmatic handling by AI agents.'
      },
      message: { type: 'string', description: 'Human-readable explanation specific to this occurrence of the problem.' },
      detail: { type: 'string', description: 'Detailed explanation of the error (RFC 9457 detail field).' },
      hint: { type: 'string', description: 'Actionable resolution hint telling the agent how to fix the request.' },
      resolution: { type: 'string', description: 'Actionable recovery step for automated retry.' },
      instance: { type: 'string', description: 'Request path that triggered the error.' },
      documentation_url: { type: 'string', format: 'uri', description: 'URL to developer error documentation.' },
      openapi_url: { type: 'string', format: 'uri', description: 'URL to the OpenAPI 3.1 specification.' },
      timestamp: { type: 'string', format: 'date-time', description: 'ISO 8601 timestamp of the error.' },
      error: {
        type: 'object',
        required: ['code', 'message', 'status', 'hint', 'resolution', 'documentation_url'],
        additionalProperties: false,
        properties: {
          code: { type: 'string', description: 'Machine-readable error code.' },
          message: { type: 'string', description: 'Human-readable error message.' },
          status: { type: 'integer', description: 'HTTP status code.' },
          hint: { type: 'string', description: 'Actionable resolution hint.' },
          resolution: { type: 'string', description: 'Actionable recovery instruction.' },
          documentation_url: { type: 'string', format: 'uri', description: 'Developer documentation URL.' }
        }
      }
    }
  };

  const standardResponseHeaders = {
    'X-API-Version': {
      description: 'Active API version date identifier (e.g., 2026-10-01).',
      schema: { type: 'string', example: '2026-10-01' }
    },
    'API-Version': {
      description: 'Active major API version identifier (v1).',
      schema: { type: 'string', example: 'v1' }
    },
    'RateLimit-Limit': {
      description: 'Maximum number of requests permitted in the current time window (RFC RateLimit).',
      schema: { type: 'integer', example: 120 }
    },
    'RateLimit-Remaining': {
      description: 'Remaining number of requests allowed in the current window.',
      schema: { type: 'integer', example: 119 }
    },
    'RateLimit-Reset': {
      description: 'Number of seconds until the current rate-limit window resets.',
      schema: { type: 'integer', example: 60 }
    },
    'RateLimit-Policy': {
      description: 'Quota policy string specifying limit and window in seconds.',
      schema: { type: 'string', example: '120;w=60' }
    }
  };

  const errorResponses = {
    '400': {
      description: 'Bad Request — Invalid query or path parameter supplied.',
      headers: standardResponseHeaders,
      content: {
        'application/json': { schema: errorSchema },
        'application/problem+json': { schema: errorSchema }
      }
    },
    '404': {
      description: 'Not Found — Requested architectural project, service, or endpoint does not exist.',
      headers: standardResponseHeaders,
      content: {
        'application/json': { schema: errorSchema },
        'application/problem+json': { schema: errorSchema }
      }
    },
    '429': {
      description: 'Too Many Requests — Rate limit of 120 requests/minute exceeded.',
      headers: {
        ...standardResponseHeaders,
        'Retry-After': {
          description: 'Seconds to wait before retrying the request.',
          schema: { type: 'integer', example: 60 }
        }
      },
      content: {
        'application/json': { schema: errorSchema },
        'application/problem+json': { schema: errorSchema }
      }
    },
    '500': {
      description: 'Internal Server Error — Unexpected server failure.',
      headers: standardResponseHeaders,
      content: {
        'application/json': { schema: errorSchema },
        'application/problem+json': { schema: errorSchema }
      }
    }
  };

  const apiVersionHeaderParam = {
    name: 'X-API-Version',
    in: 'header',
    required: false,
    description: 'Optional API version pin header (defaults to 2026-10-01 / v1).',
    schema: {
      type: 'string',
      default: '2026-10-01',
      enum: ['2026-10-01', 'v1']
    }
  };

  const projectItemSchema = {
    type: 'object',
    required: [
      'id',
      'slug',
      'title',
      'category',
      'label',
      'location',
      'dimensions',
      'structure',
      'deliverable',
      'image',
      'summary',
      'highlights'
    ],
    additionalProperties: false,
    properties: {
      id: { type: 'string', enum: ['lemukutan', 'courtyard', 'space', 'light'], description: 'Unique project identifier.' },
      slug: { type: 'string', description: 'URL-friendly project slug.' },
      title: { type: 'string', description: 'Full architectural project title.' },
      category: { type: 'string', enum: ['architecture', 'research'], description: 'Project category.' },
      label: { type: 'string', description: 'Display classification tag.' },
      location: { type: 'string', description: 'Geographic site location in Indonesia.' },
      dimensions: { type: 'string', description: 'Primary structural module or spatial dimensions.' },
      structure: { type: 'string', description: 'Structural system and material specification.' },
      deliverable: { type: 'string', description: 'Technical documentation deliverable (e.g., 40-sheet DED).' },
      image: { type: 'string', format: 'uri', description: 'Preview image or diagram URL.' },
      dedUrl: { type: 'string', format: 'uri', description: 'Interactive DED preview URL when available.' },
      summary: { type: 'string', description: 'Comprehensive architectural and environmental summary.' },
      highlights: {
        type: 'array',
        items: { type: 'string' },
        description: 'Key architectural, structural, and daylighting highlights.'
      }
    }
  };

  return {
    openapi: '3.1.0',
    info: {
      title: 'GradiEnt Studio Architectural Design API',
      version: '1.2.0',
      summary:
        'Versioned Read-Only REST API (v1) & Model Context Protocol (MCP) Server for GradiEnt Studio Architectural Design, 3D Spatial Modeling & Tropical Daylighting.',
      description:
        'Official public read-only API for GradiEnt Studio Architectural Design (https://gradientarch.tech), founded by Heru Ardiansyah in Makassar, Indonesia.\n\n### Versioning & Deprecation Policy\n- **URL Path Versioning:** Stable endpoints are served under `/api/v1/*` (and `/v1/*`).\n- **Header Versioning:** Pass `X-API-Version: 2026-10-01` or inspect response headers `API-Version: v1` and `X-API-Version: 2026-10-01`.\n- **Deprecation & Sunset Policy:** Deprecated endpoints (such as `/api/notion/projects`) remain operational for a minimum of **180 days** and return standard RFC `Deprecation`, `Sunset`, and `Link: rel="successor-version"` headers.\n\n### Rate Limiting\nAll endpoints allow **120 requests per 60-second window** and emit `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`, `RateLimit-Policy`, and `Retry-After` headers.',
      contact: {
        name: 'Heru Ardiansyah — GradiEnt Studio Architectural Design',
        url: `${SITE_URL}/contact`,
        email: STUDIO_INFO.contact.email
      },
      license: {
        name: 'Proprietary — GradiEnt Studio',
        url: `${SITE_URL}/terms`
      }
    },
    'x-api-version': 'v1',
    'x-deprecation-policy': {
      minimumDeprecationNoticeDays: 180,
      headers: ['Deprecation', 'Sunset', 'Link'],
      documentationUrl: `${SITE_URL}/docs#versioning-and-deprecation`
    },
    'x-cli': {
      name: 'gradient-studio',
      command: 'npx github:cryptoandforex21th-beep/gradient-studio-app',
      repository: 'https://github.com/cryptoandforex21th-beep/gradient-studio-app'
    },
    servers: [
      {
        url: SITE_URL,
        description: 'Primary Production Domain (gradientarch.tech)'
      },
      {
        url: `${SITE_URL}/api/v1`,
        description: 'Version 1 REST API Base URL'
      }
    ],
    tags: [
      { name: 'Projects', description: 'Architectural case studies and DED specifications' },
      { name: 'Services', description: 'Architectural design services and 4-stage workflow' },
      { name: 'System', description: 'API health, versioning, deprecation policy, and CLI metadata' },
      { name: 'MCP', description: 'Model Context Protocol (Streamable HTTP JSON-RPC 2.0)' }
    ],
    paths: {
      '/api/v1/projects': {
        get: {
          tags: ['Projects'],
          operationId: 'listArchitecturalProjectsV1',
          summary: 'List architectural case studies and spatial design projects (v1)',
          description:
            'Retrieves all published GradiEnt Studio architectural case studies, tropical daylighting studies, and DED engineering projects, optionally filtered by category.',
          parameters: [
            {
              name: 'category',
              in: 'query',
              required: false,
              description: 'Filter projects by category: all, architecture, or research.',
              schema: {
                type: 'string',
                enum: ['all', 'architecture', 'research'],
                default: 'all'
              }
            },
            apiVersionHeaderParam
          ],
          responses: {
            '200': {
              description: 'Typed list of architectural projects and DED studies.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['success', 'apiVersion', 'count', 'category', 'projects'],
                    additionalProperties: false,
                    properties: {
                      success: { type: 'boolean', enum: [true] },
                      apiVersion: { type: 'string', example: 'v1' },
                      count: { type: 'integer', example: 4 },
                      category: { type: 'string', enum: ['all', 'architecture', 'research'] },
                      projects: {
                        type: 'array',
                        items: projectItemSchema
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      },
      '/api/v1/projects/{projectId}': {
        get: {
          tags: ['Projects'],
          operationId: 'getArchitecturalProjectByIdV1',
          summary: 'Get detailed architectural and DED project specifications by ID (v1)',
          description:
            'Returns comprehensive structural (H-Beam 305x305, stepped footplat), spatial, and tropical daylighting specifications for a specific project ID.',
          parameters: [
            {
              name: 'projectId',
              in: 'path',
              required: true,
              description: 'Unique project ID: lemukutan, courtyard, space, or light.',
              schema: {
                type: 'string',
                enum: ['lemukutan', 'courtyard', 'space', 'light']
              }
            },
            apiVersionHeaderParam
          ],
          responses: {
            '200': {
              description: 'Detailed architectural project specification.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['success', 'apiVersion', 'project'],
                    additionalProperties: false,
                    properties: {
                      success: { type: 'boolean', enum: [true] },
                      apiVersion: { type: 'string', example: 'v1' },
                      project: projectItemSchema
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      },
      '/api/v1/services': {
        get: {
          tags: ['Services'],
          operationId: 'listStudioServicesV1',
          summary: 'List architectural design services and 4-stage workflow (v1)',
          description:
            'Returns GradiEnt Studio architectural design services, tropical daylighting & site analysis capabilities, 3D modeling deliverables, and 4-stage collaboration workflow.',
          parameters: [
            {
              name: 'serviceId',
              in: 'query',
              required: false,
              description:
                'Optional service ID filter (architectural-spatial-design, site-and-daylighting-analysis, 3d-modeling-and-visualization).',
              schema: {
                type: 'string',
                enum: [
                  'architectural-spatial-design',
                  'site-and-daylighting-analysis',
                  '3d-modeling-and-visualization'
                ]
              }
            },
            apiVersionHeaderParam
          ],
          responses: {
            '200': {
              description: 'Structured list of architectural services and workflow stages.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['success', 'apiVersion', 'studio', 'services', 'workflow'],
                    additionalProperties: false,
                    properties: {
                      success: { type: 'boolean', enum: [true] },
                      apiVersion: { type: 'string', example: 'v1' },
                      studio: { type: 'string', example: 'GradiEnt Studio' },
                      services: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['id', 'number', 'name', 'description', 'tags'],
                          additionalProperties: false,
                          properties: {
                            id: { type: 'string' },
                            number: { type: 'string' },
                            name: { type: 'string' },
                            description: { type: 'string' },
                            tags: { type: 'array', items: { type: 'string' } }
                          }
                        }
                      },
                      workflow: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['step', 'title', 'description', 'deliverable'],
                          additionalProperties: false,
                          properties: {
                            step: { type: 'integer' },
                            title: { type: 'string' },
                            description: { type: 'string' },
                            deliverable: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      },
      '/api/v1/status': {
        get: {
          tags: ['System'],
          operationId: 'getApiStatusV1',
          summary: 'Get API v1 health, versioning policy, rate limits, and CLI metadata',
          description:
            'Returns operational status, active API version, deprecation and sunset policy, RFC RateLimit configuration, and CLI command info.',
          parameters: [apiVersionHeaderParam],
          responses: {
            '200': {
              description: 'Operational API status and policy metadata.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: [
                      'success',
                      'status',
                      'studio',
                      'canonicalUrl',
                      'apiVersion',
                      'apiVersionDate',
                      'deprecationPolicy',
                      'rateLimits',
                      'cli',
                      'endpoints'
                    ],
                    additionalProperties: false,
                    properties: {
                      success: { type: 'boolean', enum: [true] },
                      status: { type: 'string', enum: ['operational'] },
                      studio: { type: 'string' },
                      canonicalUrl: { type: 'string', format: 'uri' },
                      apiVersion: { type: 'string', example: 'v1' },
                      apiVersionDate: { type: 'string', example: '2026-10-01' },
                      deprecationPolicy: {
                        type: 'object',
                        required: ['strategy', 'minimumNoticeDays', 'headers', 'policyUrl'],
                        additionalProperties: false,
                        properties: {
                          strategy: { type: 'string' },
                          minimumNoticeDays: { type: 'integer' },
                          headers: { type: 'array', items: { type: 'string' } },
                          policyUrl: { type: 'string', format: 'uri' }
                        }
                      },
                      rateLimits: {
                        type: 'object',
                        required: ['limitPerWindow', 'windowSeconds', 'headers'],
                        additionalProperties: false,
                        properties: {
                          limitPerWindow: { type: 'integer' },
                          windowSeconds: { type: 'integer' },
                          headers: { type: 'array', items: { type: 'string' } }
                        }
                      },
                      cli: {
                        type: 'object',
                        required: ['binaryName', 'npxCommand', 'repositoryUrl'],
                        additionalProperties: false,
                        properties: {
                          binaryName: { type: 'string' },
                          npxCommand: { type: 'string' },
                          repositoryUrl: { type: 'string', format: 'uri' }
                        }
                      },
                      endpoints: {
                        type: 'object',
                        required: ['openapi', 'mcp', 'docs', 'llmsTxt', 'projects', 'services'],
                        additionalProperties: false,
                        properties: {
                          openapi: { type: 'string', format: 'uri' },
                          mcp: { type: 'string', format: 'uri' },
                          docs: { type: 'string', format: 'uri' },
                          llmsTxt: { type: 'string', format: 'uri' },
                          projects: { type: 'string', format: 'uri' },
                          services: { type: 'string', format: 'uri' }
                        }
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      },
      '/.well-known/mcp': {
        get: {
          tags: ['MCP'],
          operationId: 'getMcpManifest',
          summary: 'Retrieve MCP server discovery manifest',
          description:
            'Returns the Model Context Protocol (MCP) server capabilities, Streamable HTTP endpoint metadata, and available tools.',
          parameters: [apiVersionHeaderParam],
          responses: {
            '200': {
              description: 'MCP server discovery manifest JSON.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: [
                      'schemaVersion',
                      'protocolVersion',
                      'name',
                      'title',
                      'version',
                      'homepage',
                      'transport',
                      'capabilities',
                      'tools'
                    ],
                    additionalProperties: true,
                    properties: {
                      schemaVersion: { type: 'string', example: '2025-03-26' },
                      protocolVersion: { type: 'string', example: '2025-03-26' },
                      name: { type: 'string', example: 'gradient-studio-mcp' },
                      title: { type: 'string' },
                      version: { type: 'string', example: '1.2.0' },
                      homepage: { type: 'string', format: 'uri' },
                      transport: {
                        type: 'object',
                        required: ['type', 'url', 'methods'],
                        additionalProperties: false,
                        properties: {
                          type: { type: 'string', enum: ['streamable-http'] },
                          url: { type: 'string', format: 'uri' },
                          methods: { type: 'array', items: { type: 'string' } }
                        }
                      },
                      capabilities: {
                        type: 'object',
                        required: ['tools', 'resources', 'prompts'],
                        additionalProperties: false,
                        properties: {
                          tools: {
                            type: 'object',
                            properties: { listChanged: { type: 'boolean' } }
                          },
                          resources: {
                            type: 'object',
                            properties: { subscribe: { type: 'boolean' }, listChanged: { type: 'boolean' } }
                          },
                          prompts: {
                            type: 'object',
                            properties: { listChanged: { type: 'boolean' } }
                          }
                        }
                      },
                      tools: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['name', 'description', 'inputSchema'],
                          properties: {
                            name: { type: 'string' },
                            description: { type: 'string' },
                            inputSchema: {
                              type: 'object',
                              properties: {
                                type: { type: 'string' }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        },
        post: {
          tags: ['MCP'],
          operationId: 'handleMcpStreamableHttp',
          summary: 'Execute MCP Streamable HTTP JSON-RPC 2.0 request',
          description:
            'Handles live MCP protocol handshakes and tool executions (initialize, tools/list, tools/call, resources/list, prompts/list) over Streamable HTTP.',
          parameters: [apiVersionHeaderParam],
          requestBody: {
            required: true,
            description: 'JSON-RPC 2.0 MCP request payload.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['jsonrpc', 'id', 'method'],
                  additionalProperties: false,
                  properties: {
                    jsonrpc: { type: 'string', enum: ['2.0'], description: 'JSON-RPC protocol version.' },
                    id: { type: 'integer', description: 'JSON-RPC request identifier.' },
                    method: {
                      type: 'string',
                      enum: [
                        'initialize',
                        'ping',
                        'tools/list',
                        'tools/call',
                        'resources/list',
                        'resources/read',
                        'prompts/list',
                        'prompts/get'
                      ],
                      description: 'MCP JSON-RPC method name.'
                    },
                    params: {
                      type: 'object',
                      description: 'Method-specific parameters object.',
                      additionalProperties: false,
                      properties: {
                        protocolVersion: { type: 'string', description: 'MCP protocol version (2025-03-26).' },
                        name: { type: 'string', description: 'Tool or prompt name when calling tools/call or prompts/get.' },
                        uri: { type: 'string', description: 'Resource URI when calling resources/read.' }
                      }
                    }
                  }
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'JSON-RPC 2.0 MCP response.',
              headers: standardResponseHeaders,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['jsonrpc', 'id', 'result'],
                    additionalProperties: false,
                    properties: {
                      jsonrpc: { type: 'string', enum: ['2.0'] },
                      id: { type: 'integer' },
                      result: {
                        type: 'object',
                        properties: {
                          protocolVersion: { type: 'string' },
                          isError: { type: 'boolean' }
                        }
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      },
      '/api/notion/projects': {
        get: {
          tags: ['Projects'],
          deprecated: true,
          operationId: 'listNotionProjectsLegacy',
          summary: 'List published architectural projects (Deprecated — use /api/v1/projects)',
          description:
            'Deprecated legacy endpoint. Scheduled for sunset on 2027-12-31. Migrate to `GET /api/v1/projects` for full typed catalog schemas.',
          parameters: [
            {
              name: 'format',
              in: 'query',
              required: false,
              description: 'Response format (only json is supported).',
              schema: {
                type: 'string',
                enum: ['json'],
                default: 'json'
              }
            },
            apiVersionHeaderParam
          ],
          responses: {
            '200': {
              description: 'Legacy portfolio response with Deprecation and Sunset headers.',
              headers: {
                ...standardResponseHeaders,
                Deprecation: {
                  description: 'RFC Deprecation timestamp header.',
                  schema: { type: 'string', example: '@1767225600' }
                },
                Sunset: {
                  description: 'RFC 8594 Sunset HTTP date header.',
                  schema: { type: 'string', example: 'Fri, 31 Dec 2027 23:59:59 GMT' }
                }
              },
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['success', 'source', 'projects'],
                    additionalProperties: false,
                    properties: {
                      success: { type: 'boolean' },
                      source: { type: 'string' },
                      projects: {
                        type: 'array',
                        items: {
                          type: 'object',
                          required: ['id', 'title', 'tag', 'loc', 'bg'],
                          additionalProperties: false,
                          properties: {
                            id: { type: 'string' },
                            title: { type: 'string' },
                            tag: { type: 'string' },
                            loc: { type: 'string' },
                            bg: { type: 'string' }
                          }
                        }
                      }
                    }
                  }
                }
              }
            },
            ...errorResponses
          }
        }
      }
    },
    components: {
      headers: standardResponseHeaders,
      schemas: {
        Project: projectItemSchema,
        ErrorResponse: errorSchema,
        ProblemDetails: errorSchema
      }
    }
  };
}

export function getJsonLdSchemas() {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: 'GradiEnt Studio',
    legalName: 'GradiEnt Studio Architecture & Spatial Practice',
    alternateName: [
      'GradiEnt Studio Architectural Design 3D Modeling',
      'GradiEnt Studio Architectural Design',
      'GradiEnt Studio Makassar'
    ],
    url: SITE_URL,
    logo: `${SITE_URL}/assets/brand-logo.png`,
    image: `${SITE_URL}/assets/courtyard-concept.png`,
    description:
      'GradiEnt Studio Architectural Design 3D Modeling is an architectural design practice, tropical daylighting research studio, and 3D spatial modeling platform founded by Heru Ardiansyah in Makassar, Indonesia.',
    foundingDate: '2026',
    founder: {
      '@type': 'Person',
      name: 'Heru Ardiansyah',
      jobTitle: 'Founder & Principal Spatial Designer',
      url: 'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/'
    },
    email: 'heruardiansyah2one@gmail.com',
    telephone: '+62-851-4362-8550',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Perintis Kemerdekaan, Tamalanrea',
      addressLocality: 'Makassar',
      addressRegion: 'Sulawesi Selatan',
      postalCode: '90245',
      addressCountry: 'ID'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'heruardiansyah2one@gmail.com',
        telephone: '+62-851-4362-8550',
        url: `${SITE_URL}/contact`,
        availableLanguage: ['Indonesian', 'English'],
        areaServed: 'ID'
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'heruardiansyah2one@gmail.com',
        telephone: '+62-851-4362-8550',
        url: `${SITE_URL}/contact`,
        availableLanguage: ['Indonesian', 'English'],
        areaServed: 'ID'
      }
    ],
    sameAs: [
      'https://instagram.com/heruardiansyah_',
      'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/',
      'https://github.com/cryptoandforex21th-beep',
      'https://github.com/cryptoandforex21th-beep/gradient-studio-app'
    ]
  };

  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${SITE_URL}/#software`,
    name: 'GradiEnt Studio Architectural Design 3D Modeling',
    alternateName: ['GradiEnt Studio Architectural Design', 'GradiEnt Studio'],
    applicationCategory: 'DesignApplication',
    applicationSubCategory: 'Architectural Design & 3D Spatial Modeling Platform',
    operatingSystem: 'Web, macOS, Windows, Linux (CLI)',
    url: SITE_URL,
    downloadUrl: 'https://github.com/cryptoandforex21th-beep/gradient-studio-app',
    softwareVersion: '1.2.0',
    description:
      'GradiEnt Studio Architectural Design 3D Modeling: Web-based architectural design showcase, tropical daylighting & spatial study explorer, Detailed Engineering Design (DED) viewer, CLI tool, and MCP-enabled consultation platform.',
    author: {
      '@type': 'Person',
      name: 'Heru Ardiansyah',
      url: 'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/'
    },
    publisher: {
      '@id': `${SITE_URL}/#organization`
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      url: `${SITE_URL}/contact`,
      description: 'Free initial architectural design consultation, spatial brief generation, and public MCP/REST API v1 access.'
    },
    featureList: [
      'Architectural & Spatial Design Exploration',
      'Detailed Engineering Design (DED) 40-Sheet Technical Viewer',
      'Tropical Daylighting & Shading Geometry Analysis',
      '3D Spatial Modeling & Parametric Studies',
      'Model Context Protocol (MCP) Streamable HTTP Server',
      'Versioned REST API v1 & Official CLI Tool (gradient-studio)'
    ],
    sameAs: [
      'https://instagram.com/heruardiansyah_',
      'https://www.linkedin.com/in/heru-ardiansyah-84a97343a/',
      'https://github.com/cryptoandforex21th-beep',
      'https://github.com/cryptoandforex21th-beep/gradient-studio-app'
    ]
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'GradiEnt Studio Architectural Design 3D Modeling',
    alternateName: ['GradiEnt Studio', 'GradiEnt Studio Architectural Design'],
    url: SITE_URL,
    inLanguage: 'id-ID',
    publisher: {
      '@id': `${SITE_URL}/#organization`
    }
  };

  return { organizationSchema, softwareAppSchema, webSiteSchema };
}

