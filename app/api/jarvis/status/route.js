import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const telemetry = {
    system: {
      name: "J.A.R.V.I.S. // SECOND BRAIN OS",
      version: "4.2.0-CYBER",
      uptime: "99.98%",
      cloud_status: "CONNECTED [SUPABASE SERVERLESS]",
      gateway_status: "ACTIVE [OMNIROUTE :20128]",
      latency_ms: 21,
      total_nodes: 25,
      total_edges: 24,
      last_sync: new Date().toISOString()
    },
    agents: [
      {
        id: "luna",
        name: "Prof. LUNA",
        subordinate: "Kutu & Crayon",
        division: "Divisi 01 — Akademik & Skripsi",
        color: "#00f0ff",
        status: "ACTIVE",
        pulse: "HIGH",
        directive: "Stanford-Unhas Rigor & Scopus Q1 Falsification",
        current_task: "Pemeriksaan rasio lux lubang cahaya tubular (Solar Tube) vs SNI 03-6197",
        last_action: "Sitasi Al-Marwaee & Carter (2013) terverifikasi valid.",
        health: "100%"
      },
      {
        id: "mochi",
        name: "Mochi",
        subordinate: "Piksel",
        division: "Divisi 02 — Software & 3D Web",
        color: "#a855f7",
        status: "LIVE_SYNC",
        pulse: "OPTIMAL",
        directive: "Awwwards-Grade 3D WebGL & Cult-UI Tactility",
        current_task: "Shader Holographic HUD 60 FPS & Force Graph Canvas Rendering",
        last_action: "Subpage /jarvis live sync mounted via Next.js App Router.",
        health: "100%"
      },
      {
        id: "kaktus",
        name: "Kaktus",
        subordinate: "Tabrak & Cuan",
        division: "Divisi 03 — BIM & Konstruksi",
        color: "#f59e0b",
        status: "STANDBY",
        pulse: "NORMAL",
        directive: "ISO 19650 Compliance & Zero Clash Detection",
        current_task: "Audit model Dynamo Fasad & Estimasi volume bahan AHSP Makassar",
        last_action: "Revit 2027 clash scan: 0 collision detected.",
        health: "98%"
      },
      {
        id: "mas_amba",
        name: "MasAmba",
        subordinate: "Lilin & Rem",
        division: "Divisi 04 — Trading Kuantitatif",
        color: "#00ff9d",
        status: "MONITORING",
        pulse: "HIGH",
        directive: "Order Block Detection & Strict 1.5% Stop-Loss Gating",
        current_task: "Scanning likuiditas BTC/USDT & XAU/USD 4H Fair Value Gap",
        last_action: "Risk gating verified: batas risiko 1.5% modal aktif.",
        health: "100%"
      }
    ],
    logs: [
      { time: "22:31:04", agent: "SYS", text: "OmniRoute Copilot CLI v1.0.91 bridge online (port 20128)." },
      { time: "22:31:45", agent: "LUNA", text: "Sitasi SNI 03-6197 terkunci. Target minimum iluminansi ruang kuliah: 250 lux." },
      { time: "22:32:12", agent: "MOCHI", text: "Subpage /jarvis canvas force graph pipeline diinisialisasi." },
      { time: "22:32:50", agent: "KAKTUS", text: "Koordinat menara fasad parametrik sinkron dengan model fisik." },
      { time: "22:33:10", agent: "MAS_AMBA", text: "Liquidity pool 4H terpantau stabil. Tidak ada anomali makro." }
    ]
  };

  return NextResponse.json(telemetry);
}
