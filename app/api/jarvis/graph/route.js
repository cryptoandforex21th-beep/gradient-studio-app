import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const graphData = {
  "nodes": [
    {
      "id": "sb_core",
      "label": "SecondBrain Core",
      "category": "core",
      "val": 24,
      "status": "ONLINE",
      "desc": "Sistem sentral manajemen memori, otomasi, dan kecerdasan personal Heru Ardiansyah."
    },
    {
      "id": "profile",
      "label": "Master Profile",
      "category": "core",
      "val": 16,
      "status": "LOCKED",
      "desc": "Identitas, preferensi desain, ritme kerja, dan batasan personal Heru (PROFILE.md)."
    },
    {
      "id": "prof_luna",
      "label": "Prof. LUNA",
      "category": "academic",
      "val": 22,
      "status": "ACTIVE",
      "desc": "Dosen Pembimbing Killer Stanford-Unhas. Objektif, anti-sycophancy, pengawal rigoritas metodologi skripsi."
    },
    {
      "id": "mochi",
      "label": "Mochi (Creative Dev)",
      "category": "studio",
      "val": 22,
      "status": "ACTIVE",
      "desc": "Lead Web Architect & Creative Developer GradiEnt Studio. Ahli Next.js dan 3D WebGL."
    },
    {
      "id": "kaktus",
      "label": "Kaktus (BIM Lead)",
      "category": "bim",
      "val": 22,
      "status": "ACTIVE",
      "desc": "Koordinator BIM & Konstruksi. Mengawasi pemodelan Revit 2027, Dynamo, dan standar ISO 19650."
    },
    {
      "id": "mas_amba",
      "label": "MasAmba (Quant Lead)",
      "category": "trading",
      "val": 22,
      "status": "ACTIVE",
      "desc": "Koordinator Analisis Kuantitatif & Likuiditas Pasar Crypto, Forex, dan Emas."
    },
    {
      "id": "readme",
      "label": "Readme",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\archives\\README.md"
    },
    {
      "id": "skill",
      "label": "Skill",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\archives\\desktop_bridge_legacy\\SKILL.md"
    },
    {
      "id": "sample_quick_note",
      "label": "Sample Quick Note",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\inbox\\sample_quick_note.md"
    },
    {
      "id": "project_cloud_secondbrain",
      "label": "Project Cloud Secondbrain",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\project_cloud_secondbrain.md"
    },
    {
      "id": "project_kaktus_towers_ml",
      "label": "Project Kaktus Towers Ml",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\project_kaktus_towers_ml.md"
    },
    {
      "id": "project_samata_pavilion_bim",
      "label": "Project Samata Pavilion Bim",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\project_samata_pavilion_bim.md"
    },
    {
      "id": "bab_1_pendahuluan",
      "label": "Bab 1 Pendahuluan",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\bab_1_pendahuluan.md"
    },
    {
      "id": "bab_2_metode_perancangan",
      "label": "Bab 2 Metode Perancangan",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\bab_2_metode_perancangan.md"
    },
    {
      "id": "bab_3_analisis_data",
      "label": "Bab 3 Analisis Data",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\bab_3_analisis_data.md"
    },
    {
      "id": "bab_4_konsep_perancangan",
      "label": "Bab 4 Konsep Perancangan",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\bab_4_konsep_perancangan.md"
    },
    {
      "id": "bab_5_penutup",
      "label": "Bab 5 Penutup",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\bab_5_penutup.md"
    },
    {
      "id": "daftar_pustaka",
      "label": "Daftar Pustaka",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\daftar_pustaka.md"
    },
    {
      "id": "draft_skripsi_lengkap",
      "label": "Draft Skripsi Lengkap",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\draft_skripsi_lengkap.md"
    },
    {
      "id": "00_brain_state_prof_luna",
      "label": "00 Brain State Prof Luna",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\NOTEBOOKLM_SOURCES\\00_BRAIN_STATE_PROF_LUNA.md"
    },
    {
      "id": "00_panduan_riset_akademik_prof_luna",
      "label": "00 Panduan Riset Akademik Pr",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\NOTEBOOKLM_SOURCES\\00_PANDUAN_RISET_AKADEMIK_PROF_LUNA.md"
    },
    {
      "id": "02_draft_skripsi_facade_collector_modular",
      "label": "02 Draft Skripsi Facade Coll",
      "category": "studio",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\projects\\skripsi_facade_collector_unhas\\NOTEBOOKLM_SOURCES\\02_DRAFT_SKRIPSI_FACADE_COLLECTOR_MODULAR.md"
    },
    {
      "id": "aec_ai_master_toolkit",
      "label": "Aec Ai Master Toolkit",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\AEC_AI_MASTER_TOOLKIT.md"
    },
    {
      "id": "ai_projects_registry",
      "label": "Ai Projects Registry",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\ai_projects_registry.md"
    },
    {
      "id": "archaiflow_tools_catalog",
      "label": "Archaiflow Tools Catalog",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\archaiflow_tools_catalog.md"
    },
    {
      "id": "architecture_ai_starter_kit",
      "label": "Architecture Ai Starter Kit",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\architecture_ai_starter_kit.md"
    },
    {
      "id": "kurikulum_kuliah_ai_drizzle",
      "label": "Kurikulum Kuliah Ai Drizzle",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\kurikulum_kuliah_ai_drizzle.md"
    },
    {
      "id": "metaprinsip_evolusi_otonom_2x_4x",
      "label": "Metaprinsip Evolusi Otonom 2",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\metaprinsip_evolusi_otonom_2x_4x.md"
    },
    {
      "id": "panduan_arena_skill_token_shield",
      "label": "Panduan Arena Skill Token Sh",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_arena_skill_token_shield.md"
    },
    {
      "id": "panduan_arsitektur_agent_world_class",
      "label": "Panduan Arsitektur Agent Wor",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_arsitektur_agent_world_class.md"
    },
    {
      "id": "panduan_arsitektur_layer5_management_plane",
      "label": "Panduan Arsitektur Layer5 Ma",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_arsitektur_layer5_management_plane.md"
    },
    {
      "id": "panduan_integrasi_rhino_revit_mcp",
      "label": "Panduan Integrasi Rhino Revi",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_integrasi_rhino_revit_mcp.md"
    },
    {
      "id": "panduan_otomasi_desktop_gui",
      "label": "Panduan Otomasi Desktop Gui",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_otomasi_desktop_gui.md"
    },
    {
      "id": "panduan_pyrevit_threading_external_event",
      "label": "Panduan Pyrevit Threading Ex",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_pyrevit_threading_external_event.md"
    },
    {
      "id": "panduan_riset_akademik_prof_luna",
      "label": "Panduan Riset Akademik Prof ",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_riset_akademik_prof_luna.md"
    },
    {
      "id": "panduan_setup_revit_mcp",
      "label": "Panduan Setup Revit Mcp",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_setup_revit_mcp.md"
    },
    {
      "id": "panduan_setup_rhino_mcp",
      "label": "Panduan Setup Rhino Mcp",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\panduan_setup_rhino_mcp.md"
    },
    {
      "id": "referensi_ui_cult_design_engineers",
      "label": "Referensi Ui Cult Design Eng",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\referensi_ui_cult_design_engineers.md"
    },
    {
      "id": "revit_guide",
      "label": "Revit Guide",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\revit_guide.md"
    },
    {
      "id": "rhino_guide",
      "label": "Rhino Guide",
      "category": "academic",
      "val": 12,
      "status": "SYNCED",
      "desc": "Dokumen SecondBrain di 01_knowledge\\resources\\rhino_guide.md"
    }
  ],
  "links": [
    {
      "source": "sb_core",
      "target": "profile",
      "strength": 1.0
    },
    {
      "source": "sb_core",
      "target": "prof_luna",
      "strength": 1.0
    },
    {
      "source": "sb_core",
      "target": "mochi",
      "strength": 1.0
    },
    {
      "source": "sb_core",
      "target": "kaktus",
      "strength": 1.0
    },
    {
      "source": "sb_core",
      "target": "mas_amba",
      "strength": 1.0
    },
    {
      "source": "prof_luna",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "skill",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "sample_quick_note",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "project_cloud_secondbrain",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "project_kaktus_towers_ml",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "project_samata_pavilion_bim",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_1_pendahuluan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_2_metode_perancangan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_3_analisis_data",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_4_konsep_perancangan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_5_penutup",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "daftar_pustaka",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "draft_skripsi_lengkap",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "00_brain_state_prof_luna",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "00_panduan_riset_akademik_prof_luna",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "02_draft_skripsi_facade_collector_modular",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_1_pendahuluan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_2_metode_perancangan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_3_analisis_data",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_4_konsep_perancangan",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "bab_5_penutup",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "daftar_pustaka",
      "strength": 0.7
    },
    {
      "source": "mochi",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "aec_ai_master_toolkit",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "ai_projects_registry",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "archaiflow_tools_catalog",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "architecture_ai_starter_kit",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "kurikulum_kuliah_ai_drizzle",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "metaprinsip_evolusi_otonom_2x_4x",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_arena_skill_token_shield",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_arsitektur_agent_world_class",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_arsitektur_layer5_management_plane",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_integrasi_rhino_revit_mcp",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_otomasi_desktop_gui",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_pyrevit_threading_external_event",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_riset_akademik_prof_luna",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_setup_revit_mcp",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "panduan_setup_rhino_mcp",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "referensi_ui_cult_design_engineers",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "revit_guide",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "rhino_guide",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "sakana_v2_academic_reviewer_blueprint",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "changelog",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "known_limitations",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "manifest",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "readme",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "skill",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "test_cases",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "chinese_text_ai_risk",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "detection_principles",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "qualitative_authorship_restoration",
      "strength": 0.7
    },
    {
      "source": "prof_luna",
      "target": "rewrite_methods",
      "strength": 0.7
    }
  ]
};
  return NextResponse.json(graphData);
}
