import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const graphData = {
    nodes: [
      // CORE / SYSTEM
      { id: 'sb_core', label: 'SecondBrain Core', category: 'core', val: 24, status: 'ONLINE', desc: 'Sistem sentral manajemen memori, otomasi, dan kecerdasan personal Heru Ardiansyah.' },
      { id: 'profile', label: 'Master Profile', category: 'core', val: 16, status: 'LOCKED', desc: 'Identitas, preferensi desain, ritme kerja, dan batasan personal Heru (PROFILE.md).' },
      { id: 'omniroute', label: 'OmniRoute Gateway', category: 'core', val: 18, status: 'ONLINE', desc: 'Router API multi-provider lokal di port 20128 dengan auto-fallback dan token pooling.' },
      { id: 'supabase_cloud', label: 'Supabase Cloud 24/7', category: 'core', val: 18, status: 'ONLINE', desc: 'Database relasional, auth, dan edge functions serverless untuk Bot Telegram Ai & Luna.' },
      { id: 'desktop_cli', label: 'Desktop Action CLI', category: 'core', val: 14, status: 'READY', desc: 'Otomasi fisik Session 1: app_launcher.py (0.2s launch) & whatsapp_cli.py.' },

      // DIVISI 01: AKADEMIK & SKRIPSI UNHAS
      { id: 'prof_luna', label: 'Prof. LUNA', category: 'academic', val: 22, status: 'ACTIVE', desc: 'Dosen Pembimbing Killer Stanford-Unhas. Objektif, anti-sycophancy, pengawal rigoritas metodologi skripsi.' },
      { id: 'kutu', label: 'Kutu (Validator)', category: 'academic', val: 14, status: 'ACTIVE', desc: 'Spesialis penyisir dan verifikator rujukan jurnal internasional Scopus Q1 & pasal resmi SNI.' },
      { id: 'crayon', label: 'Crayon (Diagram)', category: 'academic', val: 12, status: 'STANDBY', desc: 'Perancang kurva distribusi lux dan diagram metodologi 600 DPI publikasi.' },
      { id: 'skripsi_unhas', label: 'Skripsi Arsitektur Unhas', category: 'academic', val: 20, status: 'IN_PROGRESS', desc: 'Penelitian performa selubung dan pencahayaan alami ruang kuliah kampus Samata Unhas.' },
      { id: 'solar_tube', label: 'Sistem Solar Tube', category: 'academic', val: 16, status: 'VERIFIED', desc: 'Penyalur daylight pasif tubular untuk mereduksi beban energi lampu artifisial.' },
      { id: 'sni_03_6197', label: 'SNI 03-6197-2020', category: 'academic', val: 14, status: 'STANDARD', desc: 'Standar nasional konservasi energi pada sistem pencahayaan bangunan gedung (target 250 lux ruang kuliah).' },
      { id: 'al_marwaee', label: 'Al-Marwaee & Carter', category: 'academic', val: 14, status: 'SCOPUS_Q1', desc: 'Rujukan utama transmisi cahaya tubular daylight guide pada sudut elevasi matahari tinggi.' },
      { id: 'mayhoub', label: 'Mayhoub (2014)', category: 'academic', val: 12, status: 'SCOPUS_Q1', desc: 'Klasifikasi sistem pandu cahaya inovatif dan indeks efisiensi illuminansi bidang kerja.' },

      // DIVISI 02: SOFTWARE & 3D STUDIO
      { id: 'mochi', label: 'Mochi (Creative Dev)', category: 'studio', val: 22, status: 'ACTIVE', desc: 'Lead Web Architect & Creative Developer GradiEnt Studio. Ahli Next.js dan 3D WebGL.' },
      { id: 'piksel', label: 'Piksel (UI/UX)', category: 'studio', val: 14, status: 'ACTIVE', desc: 'Perancang antarmuka taktil, layout responsif, dan interaktivitas Cult-UI.' },
      { id: 'gradient_app', label: 'GradiEnt Studio Web', category: 'studio', val: 20, status: 'ONLINE', desc: 'Portal arsitektur resmi di https://gradientstudioapp.vercel.app.' },
      { id: 'modular_cabin_3d', label: '3D Modular Cabin', category: 'studio', val: 16, status: 'RENDERED', desc: 'Pengalaman interaktif Awwwards-grade California Modulars di Three.js.' },
      { id: 'notion_crm', label: 'Notion CMS & CRM', category: 'studio', val: 14, status: 'SYNCED', desc: 'Integrasi headless CMS untuk proyek terpilih dan leads konsultasi klien.' },

      // DIVISI 03: BIM & REKAYASA KONSTRUKSI
      { id: 'kaktus', label: 'Kaktus (BIM Lead)', category: 'bim', val: 22, status: 'ACTIVE', desc: 'Koordinator BIM & Konstruksi. Mengawasi pemodelan Revit 2027, Dynamo, dan standar ISO 19650.' },
      { id: 'tabrak', label: 'Tabrak (Clash Detective)', category: 'bim', val: 14, status: 'STANDBY', desc: 'Penyisir potensi benturan geometri pipa MEP vs balok/kolom struktur (Zero Clash Tolerance).' },
      { id: 'cuan', label: 'Cuan (QTO & RAB)', category: 'bim', val: 14, status: 'STANDBY', desc: 'Ekstraktor volume material akurat dan kalkulator estimasi biaya standar AHSP Makassar.' },
      { id: 'menara_dynamo', label: 'Menara Dynamo BIM', category: 'bim', val: 18, status: 'PARAMETRIC', desc: 'Studi komputasi fasad parametrik dan optimasi radiasi matahari di Autodesk Revit.' },

      // DIVISI 04: TRADING & KUANTITATIF
      { id: 'mas_amba', label: 'MasAmba (Quant Lead)', category: 'trading', val: 22, status: 'ACTIVE', desc: 'Koordinator Analisis Kuantitatif & Likuiditas Pasar Crypto, Forex, dan Emas.' },
      { id: 'lilin', label: 'Lilin (Chartist)', category: 'trading', val: 14, status: 'ACTIVE', desc: 'Pembaca struktur candle SMC, Order Block (OB), dan Fair Value Gap (FVG).' },
      { id: 'rem', label: 'Rem (Risk Officer)', category: 'trading', val: 14, status: 'ARMED', desc: 'Pengawal batas toleransi risiko mutlak 1% - 2% modal per posisi.' },
      { id: 'crypto_forex', label: 'Crypto & Forex Engine', category: 'trading', val: 18, status: 'SCANNING', desc: 'Algoritma screening likuiditas pasar dan peringatan anomali orderbook.' }
    ],
    links: [
      // Core Links
      { source: 'sb_core', target: 'profile', strength: 1 },
      { source: 'sb_core', target: 'omniroute', strength: 0.8 },
      { source: 'sb_core', target: 'supabase_cloud', strength: 0.9 },
      { source: 'sb_core', target: 'desktop_cli', strength: 0.7 },
      { source: 'sb_core', target: 'prof_luna', strength: 1 },
      { source: 'sb_core', target: 'mochi', strength: 1 },
      { source: 'sb_core', target: 'kaktus', strength: 1 },
      { source: 'sb_core', target: 'mas_amba', strength: 1 },

      // Divisi 01
      { source: 'prof_luna', target: 'kutu', strength: 0.9 },
      { source: 'prof_luna', target: 'crayon', strength: 0.7 },
      { source: 'prof_luna', target: 'skripsi_unhas', strength: 1 },
      { source: 'skripsi_unhas', target: 'solar_tube', strength: 0.9 },
      { source: 'skripsi_unhas', target: 'sni_03_6197', strength: 0.8 },
      { source: 'kutu', target: 'al_marwaee', strength: 0.85 },
      { source: 'kutu', target: 'mayhoub', strength: 0.8 },
      { source: 'solar_tube', target: 'al_marwaee', strength: 0.75 },

      // Divisi 02
      { source: 'mochi', target: 'piksel', strength: 0.9 },
      { source: 'mochi', target: 'gradient_app', strength: 1 },
      { source: 'gradient_app', target: 'modular_cabin_3d', strength: 0.9 },
      { source: 'gradient_app', target: 'notion_crm', strength: 0.8 },
      { source: 'gradient_app', target: 'supabase_cloud', strength: 0.9 },

      // Divisi 03
      { source: 'kaktus', target: 'tabrak', strength: 0.85 },
      { source: 'kaktus', target: 'cuan', strength: 0.85 },
      { source: 'kaktus', target: 'menara_dynamo', strength: 1 },
      { source: 'menara_dynamo', target: 'skripsi_unhas', strength: 0.6 }, // cross link BIM & Skripsi!

      // Divisi 04
      { source: 'mas_amba', target: 'lilin', strength: 0.9 },
      { source: 'mas_amba', target: 'rem', strength: 0.95 },
      { source: 'mas_amba', target: 'crypto_forex', strength: 1 }
    ]
  };

  return NextResponse.json(graphData);
}
